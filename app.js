const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID =
	''
const CLIENT_SECRET = ''
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN =
	''

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI,
)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail() {
	try {
		const accessToken = await oAuth2Client.getAccessToken()

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'thesupertett@gmail.com',
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		})

		const mailOptions = {
			from: 'SuperTett 🥸 <thesupertett@gmail.com>',
			to: 'stetreault@larouchemc.com',
			subject: 'Think it worked dude',
			text: 'Allo mon ptit tabarnouche',
			html: '<h1>Allo mon ptit tabarnouche</h1>',
		}

		const result = await transport.sendMail(mailOptions)
		return result
	} catch (error) {
		return error
	}
}

sendMail()
	.then(result => console.log('Email sent...', result))
	.catch(error => console.log(error.message))
