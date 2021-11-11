// the cart router
import { Router } from 'express';
import Id from '../modules/id'
var axios = require('axios');
const router = Router();
import makeMockShop from '../data-access';
// make the UserDb specific to this service
import { sendNotification } from '../modules/notify/send-mail'
const UserDb = makeMockShop({ modelName: 'User' });
const EventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
const EventDb = makeMockShop({ modelName: 'Event' });
const appWalletDB = makeMockShop({ modelName: 'appWallet' });
const appWalletTransactionDb = makeMockShop({ modelName: 'appWalletTransaction' });
// auth middleware
import {  authMiddleware } from '../middlewares';
// the make express callback
import makeCallBack from '../express-callback';



router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'This is PAyment service' },
  });
});
// the Banks endpoint
router.get('/banks', makeCallBack(async (_req) => {
  try {
    const sec_key = process.env.SEC_KEY
    const base = process.env.BASE_API_URL_PAYSTACK
    var options = {
      'method': 'GET',
      'url': `${base}/banks/NG`,
      'headers': {
        'Authorization': `Bearer ${sec_key}`
      }
    };
    const response = await axios(options);
    const body = response.data
    if (body.status >= 300) {
      return res({ status: 'error', data: null }, 400)
    }
    return res({ status: 'success', data: body.data })
  } catch (error) {
    console.log(error.message)
    return res({ status: 'error', data: error.message }, 500)
  }
}));


// Resolve account details
router.post('/resolve-banks', makeCallBack(async(req) => {
  try {
    const body = req.body

    if (!body.account_number) {
      return res({ status: 'error', data: "You must provide the account number" }, 400)
    }
    if (!body.account_bank) {
      return res({ status: 'error', data: 'You must provide the bank code' }, 400)
    }

    const sec_key = process.env.SEC_KEY_TEMP
    const base = process.env.BASE_API_URL_PAYSTACK
    var options = {
      'method': 'POST',
      'url': `${base}/accounts/resolve`,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sec_key}`
      },
      data: {"account_number":body.account_number,"account_bank":body.account_bank}
    };
    const response = await axios(options);
    const body_ = response.data

    if (response.status >= 300) {
      return res({ status: 'error', data: null }, 400)
    }

    return res({ status: 'success', data: body_.data })
  } catch (error) {
    return res({ status: 'error', data: error.message }, 500)
  }
}));


// Resolve account details
router.post('/add-bank', authMiddleware, makeCallBack(async(req) => {
  try {
    const body = req.body
    const userId = req.authObject.userId;

    if (!userId) {
      return res({ status: 'error', data: "You must provide the User Id" }, 400)
    }
    if (!body.account_number) {
      return res({ status: 'error', data: "You must provide the account number" }, 400)
    }
    if (!body.account_bank) {
      return res({ status: 'error', data: 'You must provide the bank code' }, 400)
    }

    if (!body.account_name) {
      return res({ status: 'error', data: 'You must provide the bank account name' }, 400)
    }

    const user = await UserDb.findById(userId);
    if (!user) {
      return res({ status: 'error', data: 'User does not exit' }, 400)
    }


    const account_details = {account_number: body.account_number, account_name: body.account_name, account_bank: body.account_bank}
    await UserDb.update({ id: userId, account_details })
    // TODO: send email notification
    return res({ status: 'success', data: "Successfully added you Account details" })
  } catch (error) {
    return res({ status: 'error', data: error.message }, 500)
  }
}));



// Resolve account details
router.get('/payout/:evenId', authMiddleware, makeCallBack(async(req) => {
  try {
    const userId = req.authObject.userId;
    const evenId = req.params.evenId;

    if (!userId) {
      return res({ status: 'error', data: "You must provide the User Id" }, 400)
    }

    const user = await UserDb.findById(userId);
    if (!user) {
      return res({ status: 'error', data: 'User does not exit' }, 400)
    }

    let totalPrice = 0
    const paymentSuccessStatus = 'SUCCESS'
    if (user.email !== 'appiplace.help@gmail.com') {
      const [event] = await EventDb.find({_id: evenId, paid: true});      
      if (!event) {
        throw new Error("Event does not exist")
      }
      const eventAtten = await EventAttendanceDb.find({ eventId: evenId, claimed: false, paid: true, status: paymentSuccessStatus})
      eventAtten.forEach(element => {
        if (element) {
          totalPrice += element.metaDate.price
        }
      });
    }

    const rate = 0.045
    const interest = (totalPrice * rate)
    const amount = totalPrice - interest

    //TODO; fund appl wallet
    if (user.email !== 'appiplace.help@gmail.com') {
      const [currentWallet] = await appWalletDB.find({}) 
      if (currentWallet !== undefined) {
        appInterest = interest * 0.2 
        currentWallet.balance += appInterest
        await appWalletDB.update({ id: currentWallet.id, balance: currentWallet.balance }) 
      }  else {
        await appWalletDB.insert({balance: 0})
      }
    } else {
      const [currentWallet] = await appWalletDB.find({}) 
      if (currentWallet !== undefined) {
        amount = currentWallet.balance
      }
    }

    if (amount < 200) {
     throw new Error('You can only Withdrawal about #100')     
    }

    const sec_key = process.env.SEC_KEY
    const base = process.env.BASE_API_URL_PAYSTACK
    const reference = Id.makeId()
    var options = {
      'method': 'POST',
      'url': `${base}/transfers`,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sec_key}`
      },
      data: {
        "account_bank": user.account_details.account_bank,
        "account_number": user.account_details.account_number,
        "amount": amount,
        "narration": "Appiplace Payout " + reference,
        "currency": "NGN",
        "reference": reference,
        "debit_currency": "NGN"
      }
    };
    console.log('Payout', options)
    const response = await axios(options);
    const body = response.data
    console.log(body)

    if (response.status >= 300) {
      return res({ status: 'error', data: null }, 400)
    }

    await EventAttendanceDb.updateMany({eventId: evenId},{ claimed: true})
    if (user.email == 'appiplace.help@gmail.com') {
      const [currentWallet] = await appWalletDB.find({}) 
      if (currentWallet !== undefined) {
        await appWalletDB.update({id: currentWallet.id, balance: 0})
        await appWalletTransactionDb.insert({ date: new Date(), amount: currentWallet.balance })
      }
    }
    // TODO: send email notification
    return res({ status: 'success', data: "Pay out Imitated For You, Your account will be credited within 24hrs" })
  } catch (error) {
    console.log(error)
    return res({ status: 'error', data: error.message }, 500)
  }
}));



// Resolve account details
router.post('/web-hook', makeCallBack(async(req) => {
  try {
    const { event, data} = req.body
    console.log("webhook event:", event, " ===== webhook-data", data)
    if (event == 'charge.completed') {
      console.log("Fluter wave ====> ", data)
      const { tx_ref, status } = data
      const eventAttendance =await EventAttendanceDb.findById(tx_ref)
      if (!eventAttendance) {
        return res({ status: 'success', data: null })
      }
      if (status !== 'successful') {
        await EventAttendanceDb.update({ id: tx_ref, status: "FAILED" })
      }
      if (eventAttendance.status !== 'PENDING') {
        return res({ status: 'success', data: null })
      }
      await EventAttendanceDb.update({ id: tx_ref, status: "SUCCESS" })
      const evt = eventAttendance.metaDate.event
      sendNotification({ event: "EVENT_REGISTRATION", data: { email: eventAttendance.email, email2: evt.email, name: eventAttendance.firstName, event: { id: eventAttendance.id, event_name: evt.event_name, description: evt.description, category: evt.category, paid: eventAttendance.paid, venue: evt.venue, date: evt.date.toLocaleString(), ticket_name: eventAttendance.ticket_type || 'Free', ticket_price:  `N${eventAttendance.metaDate.price}` || 'Free', ticket_count: evt.ticket_count}} })
    }
    return res({ status: 'success', data: null })
  } catch (error) {
    console.log("Web-hook Error", error)
    return res({ status: 'error', data: error.message }, 500)
  }
}));


export default router;



function res(body, status = 200) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: status,
    body
  }
}