
let EmailProvider = require('./emailprovider');
const fetch = require("node-fetch");

class MailGunProvider extends EmailProvider {
    constructor() {
        super();
    }

    send(email) {
        // Call validate(email) before using this to check we have valid input
        console.log(`sends an email via mailgun`);

        let formData = new URLSearchParams();

        if (email.from)
        {
            formData.append('from', email.from);
        }

        if (email.body)
        {
            formData.append('text', email.body);
        }

        if (email.subject)
        {
            formData.append('subject', email.subject);
        }

        if (email.to)
        {
            email.to.forEach(element => {
                formData.append('to', element);
            })
        }

        if (email.cc)
        {
            email.cc.forEach(element => {
                formData.append('cc', element);
            })
        }

        if (email.bcc)
        {
            email.bcc.forEach(element => {
                formData.append('bcc', element);
            })
        }

        var emailOptions = {
            method: 'POST',
            headers: {
                Authorization : "Bearer " + process.env.MAILGUN_API_KEY,
            },
            body:formData
        }

        console.log(emailOptions);

        return fetch(process.env.MAILGUN_URL, emailOptions );
    }
}

module.exports = MailGunProvider;