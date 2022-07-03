const nodemailer = require('nodemailer');
const config = require("../config/config.json");
// Create transporter to nodemailer
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: config.email.AUTH_EMAIL,
		pass: config.email.AUTH_PASS
	}
})
// Verify the transporter
transporter.verify((error,success) => {
	if(error) throw error;
	console.log("Nodemailer email status:"+success);
})

module.exports = transporter;