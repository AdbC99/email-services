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
        // An automatic json validator would have been preferred; however jsonschema
        // doesn't validate email addresses and so I would have had to validate in
        // multiple different ways and so manual validation was used 
        //
        // In a production system I would have customised a json validator to do the job
        // or spent more time researching a better validator
        console.log("validating email: " + JSON.stringify(email));

        if (!email.from)
            throw "Must have a from email address";
        if (!email.subject)
            throw "Must have a subject";
        if (!email.body)
            throw "Must have a body";
        if (!email.to)
            throw "Must have to email address(s)";

        if (!this.validEmail(email.from))
            throw email.from + " is not a valid email address";

        if (typeof email.to !== typeof [])
            throw "Email to must be an array";

        email.to.forEach(element => {
            if (!this.validEmail(element))
                throw element + " is not a valid email address";    
        });

        if (email.cc)
        {
            if (typeof email.cc !== typeof [])
                throw "Email cc must be an array";

            email.cc.forEach(element => {
                if (!this.validEmail(element))
                    throw element + " is not a valid email address";    
            });
        }

        if (email.bcc)
        {
            if (typeof email.bcc !== typeof [])
                throw "Email bcc must be an array";
            
            email.bcc.forEach(element => {
                if (!validEmail(element))
                    throw element + " is not a valid email address";    
            });
        }

        if (typeof email.subject !== typeof "")
            throw "Subject must be a string";
            
        if (typeof email.body !== typeof "")
            throw "Body must be a string";
    }

    send(email) {
        console.log(`${this.name} sends an email`);
    }
}

module.exports = EmailProvider;