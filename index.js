const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "", // generated ethereal user
        pass: '', // generated ethereal password
    },
});


app.post('/sendMessage', async function (req, res) {

    let info = await transporter.sendMail({
        from: 'Portfolio message', // sender address
        to: "", // list of receivers
        subject: "Portfolio message", // Subject line
        html: "<b>Hello! Les`s start conversation</b>", // html body
    });

    res.send('Send')

});


app.listen(3010, function () {
    console.log('Example app listening on port 3000!');
});