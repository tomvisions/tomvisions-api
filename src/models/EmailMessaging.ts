const os = require('node:os');

export class EmailMessaging
{
    static EMAIL_TYPE_CONTACT = 'contact';

    static EMAIL_TYPE_CONTACTUS = 'contact_us';
    static EMAIL_TYPE_REGISTER = 'register';
    static EMAIL_TYPE_VOLUNTEER = 'volunteer';
    static EMAIL_TYPE_SPONSOR = 'sponsor';

    static CONTACT_SUBJECT = '%s';
    static CONTACT_CONTENT_TEXT = `You have received a message from the Contact Form:\\n%s`;
    static CONTACT_CONTENT_HTML = '<p>You have received a message from the Contact Form:</p><p>%s</p>';

    static CONTACTUS_SUBJECT = 'Email From Information Page';
    static CONTACTUS_CONTENT_TEXT = `You have received a message from the Contact Us Form:\\n`;
    static CONTACTUS_CONTENT_HTML = '<p>You have received a message from the Contact Us Form:</p>';

    static REGISTER_SUBJECT = 'Email From Register Form';
    static REGISTER_CONTENT_TEXT = `You have received a submission from register form:\\n`;
    static REGISTER_CONTENT_HTML = '<p>You have received a submission from register form:</p>';

    static VOLUNTEER_SUBJECT = 'Email From Volunteer Form';
    static VOLUNTEER_CONTENT_TEXT = `You have received a message from the Volunteer Form:\\n`;
    static VOLUNTEER_CONTENT_HTML = '<p>You have received a message from the Membership Form:</p>';

    static SPONSOR_SUBJECT = 'Email From Sponsor Form';
    static SPONSOR_CONTENT_TEXT = `You have received a message from the Sponsor Form:\\n`;
    static SPONSOR_CONTENT_HTML = '<p>You have received a message from the Membership Form:</p>';

    static PARAMS_CONTENT = '<p>%s: %s</p>';
}
