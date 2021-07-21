// the cart router
import { Router } from 'express';
var axios = require('axios');
const router = Router();
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
    const sec_key = process.env.SEC_KEY
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