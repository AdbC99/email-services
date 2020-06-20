var express = require('express');
var router = express.Router();
var sendgrid = new require('../components/providers/sendgrid');
var mailgun = new require('../components/providers/mailgun');

/**
 * @typedef Email - model for an email
 * @property {string} from.required - sender email address, must be configured in provider
 * @property {string} subject.required - email subject
 * @property {string} body.required - email subject
 * @property {Array.<string>} to.required - to email addresses
 * @property {Array.<string>} cc - cc email addresses
 * @property {Array.<string>} bcc - bcc email addresses
 */

 /**
 * Send an email with failover
 * @route POST /email/send
 * @group email - Operations to send emails
 * @param {Email.model} email.body.required - the email
 * @returns {object} 200 - email was sent successfully
 * @returns {Error}  400 - failed to send email
 * @returns {Error}  default - Unexpected error
 */

router.post('/send', function(req, res, next) {
    let emailSendGrid = new sendgrid();
    let emailMailGun = new mailgun();

    let trySendEmail = (payload, provider, resolve, reject) => {
        provider.send(payload)
            .then(data => {
                if (data.status > 300)
                    reject(data.statusText);
                else
                    resolve(data.status);
            })
            .catch((error) => {
                reject(error);
            });
    }

    try
    {
        // Validate email payload and throw an exception if anything is wrong
        email.validate(req.body);

        // I looked at a couple of alternatives to nesting the method in this way
        // because I am not a big fan of nested promises. A chained promise in this case
        // resulted in less clear code as I handled exceptions and invalid status codes
        // separately, whereas a generic function that takes any email provider resulted
        // in cleaner code for me this time.
        trySendEmail(
            req.body, 
            emailSendGrid, 
            (status)=>{ // SUCCESS
                console.log('Email sent via SendGrid: Success:', status);
                res.sendStatus(200);
            }, 
            (error)=>{  // FAIL AND RETRY
                console.error('Failed to send email: Sendgrid:', error);
                console.log('Retrying email send with MailGun');
                trySendEmail(
                    req.body, 
                    emailMailGun, 
                    (status)=>{ // SUCCESS
                        console.log('Email sent via MailGun: Success:', status);
                        res.sendStatus(200);
                    }, 
                    (error)=>{ // FAIL
                        console.error('Failed to send email: MailGun:', error);
                        res.sendStatus(400);
                    }
                );
            }
        );
    }
    catch (err)
    {
        console.error(err.message)
        res.status(400).send(err.message);
    }
});

module.exports = router;