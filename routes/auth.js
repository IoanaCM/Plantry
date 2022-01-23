require('dotenv').config()
const express = require('express');
const app = express();

const { auth, requiresAuth } = require('express-openid-connect');

app.use(
  auth({
        authRequired: false,
        auth0Logout:true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
  })
);

app.get('/', (req, res)=>{
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('listening on port ${port}');
});