const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "-----";
let smtp_password = process.env.SMTP_PASSWORD || "-----";

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  requireTLS: true,
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password, // generated ethereal password
  },
});

app.get("/", function (req, res) {
  res.send("Get");
});

app.post("/sendMessage", async function (req, res) {
  let { message, email, name } = req.body;

  let info = await transporter.sendMail({
    from: "Portfolio message", // sender address
    to: "tetiana.matviienko1@gmail.com", // list of receivers
    subject: "Portfolio message", // Subject line
    html: `<><div>${name}</div>
        <div>${email}</div>
        <div>${message}</div></>`, // html body
  });

  res.send("ok");
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
