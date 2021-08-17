// the cart router
import { Router } from 'express';
var axios = require('axios');
const router = Router();
import makeMockShop from '../data-access';
// make the UserDb specific to this service
const UserDb = makeMockShop({ modelName: 'User' });
const EventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
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

    if (body.status >= 300) {
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
    const evenId = req.authObject.evenId;

    if (!userId) {
      return res({ status: 'error', data: "You must provide the User Id" }, 400)
    }

    const user = await UserDb.findById(userId);
    if (!user) {
      return res({ status: 'error', data: 'User does not exit' }, 400)
    }

    const sec_key = process.env.SEC_KEY
    const base = process.env.BASE_API_URL_PAYSTACK
    var options = {
      'method': 'POST',
      'url': `${base}/transfers`,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sec_key}`
      },
      data: {
        "account_bank": "044",
        "account_number": "0690000040",
        "amount": 5500,
        "narration": "Akhlm Pstmn Trnsfr xx007",
        "currency": "NGN",
        "reference": "akhlm-pstmnpyt-rfxx007_PMCKDU_1",
        "callback_url": "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
        "debit_currency": "NGN"
      }
    };
    // const response = await axios(options);
    // const body_ = response.data

    // if (body.status >= 300) {
    //   return res({ status: 'error', data: null }, 400)
    // }

    // const account_details = {...body_.data, account_bank: body.account_bank}
    // await UserDb.update({ id: userId, account_details })
    // TODO: send email notification
    return res({ status: 'success', data: "Pay out Imitated For You" })
  } catch (error) {
    return res({ status: 'error', data: error.message }, 500)
  }
}));



// Resolve account details
router.post('/web-hook', makeCallBack(async(req) => {
  try {
    const { event, data} = req.body
    if (event == 'charge.completed') {
      console.log("Fluter wave ====> ", data)
      const { tx_ref, status } = data
      const eventAtten =await EventAttendanceDb.findById(tx_ref)
      if (!eventAtten) {
        return res({ status: 'success', data: null })
      }
      if (status !== 'successful') {
        await EventAttendanceDb.update({ id: tx_ref, status: "FAILED" })
      }
      if (eventAtten.status !== 'PENDING') {
        return res({ status: 'success', data: null })
      }
      await EventAttendanceDb.update({ id: tx_ref, status: "SUCCESS" })
      // sendNotification({ event: "EVENT_REGISTRATION", data: { email: data.email, email2: event.email, name: data.firstName, event: { id: addEventAttend.id, event_name: event.name, description: event.description, category: event.category, paid: event.paid, venue: event.venue, date: event.date.toDateString(), ticket_name: data.ticket_type || 'Free', ticket_price:  `N${price}` || 'Free', ticket_count: data.number_of_ticket}} })
    }
    return res({ status: 'success', data: null })
  } catch (error) {
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