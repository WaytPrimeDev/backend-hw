import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 1,
  port: 1,
  auth: {
    user: 1,
    pass: 1,
  },
});
