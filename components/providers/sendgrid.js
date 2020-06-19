let EmailProvider = require('./emailprovider');
const fetch = require("node-fetch");

class SendGridProvider extends EmailProvider {
    constructor() {
        super();
    }

    send(email) {
        // Call validate(email) before using this to check we have valid input
        console.log(`Email: sending an email via sendgrid`);

        let emailBody = {
            "personalizations": 
                [
                    {

                    }
                ],
            "content": [{"type": "text/plain", "value": ""}],
            "subject": "",
            "from": {}
        }

        if (email.from)
        {
            emailBody.from = {"email": email.from}
        }

        if (email.body)
        {
            emailBody.content[0].value = email.body;
        }

        if (email.subject)
        {
            emailBody.subject = email.subject;
        }

        if (email.to)
        {
            emailBody.personalizations[0].to = [];
            email.to.forEach(element => {
                emailBody.personalizations[0].to.push({"email":element});
            })
        }

        if (email.cc)
        {
            emailBody.personalizations[0].cc = [];
            email.cc.forEach(element => {
                emailBody.personalizations[0].cc.push({"email":element});
            })
        }

        if (email.bcc)
        {
            emailBody.personalizations[0].bcc = [];
            email.bcc.forEach(element => {
                emailBody.personalizations[0].bcc.push({"email":element});
            })
        }

        return fetch(process.env.SENDGRID_URL, {
            method: 'POST',
            headers: {
                Authorization : "Bearer " + process.env.SENDGRID_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailBody)
        });
    }
}

module.exports = SendGridProvider;