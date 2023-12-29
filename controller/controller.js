const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env.js");
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });
  let message = {
    from: '<anantharajesh12@gmail.com>', 
    to: "ssam3194@gmail.com, baz@example.com", 
    subject: "hiiiiiiii", 
    text: "nodemailer in node js.",
    html: "<b>successfully register with us.</b>", // html body
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email from nodemailer in nodejs",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("Signup Successfully...!");
};
const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: "anantharajesh12@gmail.com",
      pass: "itaggbiljtdonwqp",
    },
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "Daily netflix",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Booking show",
            description: "A Backend application pay ur Bill",
            price: "$102",
          },
        ],
      },
      outro: "Looking forward to do more big business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "anantharajesh12@gmail.com",
    to: "ssam3194@gmail.com",
    subject: "node mailer testing in node js",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
};

module.exports = {
  signup,
  getbill,
};
