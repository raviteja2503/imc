const nodemailer = require('nodemailer');
const config = require('../../libs/config');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.get('smtpConfig:auth:user'),
		pass: config.get('smtpConfig:auth:pass')
	}
});

function sendMail(mailData, callback) {
	var mailOptions = {
		from: config.get('smtpConfig:from'),
		to: mailData.toAddress,
		subject: mailData.subject,
		html: mailData.message
	};
	transporter.sendMail(mailOptions, function(error, info)	{
		if (error) {
			callback({
				status: mailData.errorStatus,
				error: error
			});
			return;
		} else {
			callback({
				status: mailData.successStatus,
				result: mailData.successMessage
			});
		}
	});		
}

module.exports.sendMail = sendMail;
