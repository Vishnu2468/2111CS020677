const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;



app.get('/categories/:categoryname/products/:productname', async(req, res) => {
    let data = JSON.stringify({
        "companyName": "goMart",
        "clientID": "1ff97367-7cf5-4034-b121-5efef4adcdef",
        "clientSecret": "MHVRCrabgyeGsWhJ",
        "ownerName": "Chandupatla Vishnuvardhan Reddy",
        "ownerEmail": "vishnuvvr2903@gmail.com",
        "rollNo": "2111CS020677"
    }); 
    const auther_token = await axios({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://20.244.56.144/test/auth',
        headers: { 
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzODgxMTM4LCJpYXQiOjE3MjM4ODA4MzgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFmZjk3MzY3LTdjZjUtNDAzNC1iMTIxLTVlZmVmNGFkY2RlZiIsInN1YiI6InZpc2hudXZ2cjI5MDNAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIxZmY5NzM2Ny03Y2Y1LTQwMzQtYjEyMS01ZWZlZjRhZGNkZWYiLCJjbGllbnRTZWNyZXQiOiJNSFZSQ3JhYmd5ZUdzV2hKIiwib3duZXJOYW1lIjoiQ2hhbmR1cGF0bGEgVmlzaG51dmFyZGhhbiBSZWRkeSIsIm93bmVyRW1haWwiOiJ2aXNobnV2dnIyOTAzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMTFDUzAyMDY3NyJ9.46Av_hYeT2nMgDXgCqUFYq03znJ_lYypYFUp66-WXAU'
        },
        data : data
    })
    const AutherizationKey = 'Bearer ' + auther_token.data.access_token;
    const category_name = req.params.categoryname;
    const product_name  = req.params.productname;
    const getUrl = 'http://20.244.56.144/test/companies/' + category_name +'/categories/' + product_name + '/products?top=10&minPrice=1&maxPrice=10000'
    const ServerResponce = await axios({
        method:'get',
        maxBodyLength: Infinity,
        url: getUrl,
        headers: { 
          Authorization : AutherizationKey
        }
    })
    console.log(ServerResponce.data)
    res.json(ServerResponce.data);
})


app.listen(port, () => {
    console.log('App listening on port 3000!');
});