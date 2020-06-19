# email-services
API providing email send email to a provider with failure handling

## Demo
The endpoints are documented on swagger page at:
https://email-services-app.herokuapp.com/api-docs

Unfortunately there is an error I didn't have time to fix, stopping the endpoints 
being run from swagger online; however they can be run locally.

There are 3 endpoints, for the coding test only the send endpoint is relevant:
https://email-services-app.herokuapp.com/v1/email/send

## Test Payloads

The access to mailgun and sendgrid is not unrestricted and so payloads are important:

The mailgun api can only send to one email address at present which is adbc@theshapeofsound.com:

curl --location --request POST 'http://email-services-app.herokuapp.com/v1/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
	"from":"alix.1999@gmail.com",
	"to":["adbc@theshapeofsound.com"],
	"subject":"subject",
	"body":"body",
	"cc":["adbc@theshapeofsound.com","adbc@theshapeofsound.com"]
}'

The sendgrid api can only send from one email adress at this time which is alix.1999@gmail.com and
must have unique email addresss in each section:

curl --location --request POST 'http://email-services-app.herokuapp.com/v1/email/send' \
--header 'Content-Type: application/json' \
--data-raw '{
	"from":"alix.1999@gmail.com",
	"to":["adbc@theshapeofsound.com"],
	"subject":"subject",
	"body":"body",
	"cc":["test@example.com","test2@example.com"]
}'

The send api will try both

## Install

To install this app clone the app from github into a suitable folder and type:

npm install

You will also need to add a .env file with the following variables set:
SENDGRID_API_KEY=
SENDGRID_URL=
MAILGUN_API_KEY=
MAILGUN_URL=

Next run the app with:

npm start

Or run the unit tests with:

npm test

## Issues

Mailgun and Sendgrid required configuration of domains to have unrestricted access.
Instead restricted free access has been obtained, the restrictions are given below:

For sendgrid the email must be sent from:
    alix.1999@gmail.com. 

For mailgun the email must be sent from: 
    Mailgun Sandbox <postmaster@sandbox82ff92d709914ad3a3db41cb1cb44f40.mailgun.org>

For mailgun the email must be sent to: 
    adbc@theshapeofsound.com

## TODO
 
   * Github has found some dependencies with security issues (constantinople and clean-css) which should be reviewed
   * Swagger tests work locally but not online, ran out of time before fixing
   * Unit tests require much better coverage but ran out of time
   * Static pages remain unchanged from standard express pages
   * Configure domain records for mailgun and sendgrid to remove mail restrictions
   * Input validation should use something like jsonschema but better to automate validation
   * Email validation is not as good as it could be when a different name to email address is unrestricted
   * Failure handling for email/send endpoint is nested to the maximum that I would do in an app, if this
   were any more complex then I would refactor the email sending code so that the provider classes take 
   on more responsibility
   * API really should have some authentication, even if it is just an API_KEY






