const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ports = process.env.PORT || 8080;
const corsOptions = {
    origin: 'http://localhost:8081'
};
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',corsOptions.origin);
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.listen(ports,()=>console.log('Server is listening in port '+ports+'...'));