const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT = 'contact';

    static CONTACTUS_SUBJECT = '%s';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Form:\\n%s`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Form:</p><p>%s</p>';

    static REGISTRATION_CONTENT_TEXT = `You have received a new registration from the Registration Form.`;
    static REGISTRATION_CONTENT_HTML = '<p>You have received a new registration from the Registration Form.</p>';

}
