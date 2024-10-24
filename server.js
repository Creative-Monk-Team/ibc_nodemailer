require("dotenv").config();
let express = require("express");
let cors = require("cors");
let nodemailer = require("nodemailer");
let app = express();
let mongoose = require("mongoose");

let port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (request, response) => {
  response.send("Hello IBC Nodemailer");
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "team.creativemonk@gmail.com",
    pass: "nnqi lymc hgsi hudt",
  },
});

app.post("/send-email", (req, res) => {
  const { from, to, subject, text } = req.body;

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: "Email sent successfully", info });
  });
});

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
