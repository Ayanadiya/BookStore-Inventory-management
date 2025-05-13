const express= require('express');

const app=express();

app.use('/book')
app.use('/user')
app.use('/cart')
app.use('/order')