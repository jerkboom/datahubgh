const axios = require('axios');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const secretKeyMatch = env.match(/KORAPAY_SECRET_KEY=(.*)/);
const secretKey = secretKeyMatch ? secretKeyMatch[1].trim() : '';
const baseUrlMatch = env.match(/KORAPAY_BASE_URL=(.*)/);
const baseUrl = baseUrlMatch ? baseUrlMatch[1].trim() : 'https://api.korapay.com';

axios.post(`${baseUrl}/merchant/api/v1/charges/initialize`, {
  reference: 'TEST-' + Date.now(),
  amount: 25.00,
  currency: 'GHS',
  customer: {
    email: 'customer@datahub.gh',
    name: 'Customer'
  },
  redirect_url: 'http://localhost:3000/success'
}, {
  headers: {
    Authorization: 'Bearer ' + secretKey
  }
}).then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.log('ERROR:', JSON.stringify(err.response?.data, null, 2)));
