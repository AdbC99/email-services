var emailValidator = require("email-validator");

class EmailProvider { 
    constructor() {

    }

    validEmail(address)
    {
        if (address.indexOf("<") > -1)
        {
            // This isn't watertight but the validator I chose doesn't accept email addresses in this format
            // so I've added in this exception for now
            if (address.indexOf("@") < 0)
                return false;
            if (address.indexOf(".") < 0)
                return false;
        }
        else
            return emailValidator.validate(address);

        return true;
    }

    validate(email) {

        if (!email.from)
            throw new Error("Must have a from email address");
        if (!email.subject)
            throw new Error("Must have a subject");
        if (!email.body)
            throw new Error("Must have a body");
        if (!email.to)
            throw new Error("Must have to email address(s)");

        if (!this.validEmail(email.from))
            throw new Error(email.from + " is not a valid email address");

        if (typeof email.to !== typeof [])
            throw new Error("Email to must be an array");

        email.to.forEach(element => {
            if (!this.validEmail(element))
                throw new Error(element + " is not a valid email address");    
        });

        if (email.cc)
        {
            if (typeof email.cc !== typeof [])
                throw new Error("Email cc must be an array");

            email.cc.forEach(element => {
                if (!this.validEmail(element))
                    throw new Error(element + " is not a valid email address");    
            });
        }

        if (email.bcc)
        {
            if (typeof email.bcc !== typeof [])
                throw new Error("Email bcc must be an array");
            
            email.bcc.forEach(element => {
                if (!this.validEmail(element))
                    throw new Error(element + " is not a valid email address");    
            });
        }

        if (typeof email.subject !== typeof "")
            throw new Error("Subject must be a string");
            
        if (typeof email.body !== typeof "")
            throw new Error("Body must be a string");
    }

    send(email) {
        console.log(`${this.name} sends an email`);
    }
}

module.exports = EmailProvider;