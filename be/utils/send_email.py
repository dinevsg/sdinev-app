import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email

def send_email_via_sendgrid(*, subject: str, content: str, to_email: str, from_email: str = None, reply_to: str = None) -> bool:
    from_email = from_email or os.environ.get("DEFAULT_FROM_EMAIL")
    
    if not from_email or not to_email:
        raise ValueError("Both from_email and to_email must be provided")

    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        plain_text_content=content
    )

    if reply_to:
        message.reply_to = Email(reply_to)

    try:
        sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        response = sg.send(message)
        return 200 <= response.status_code < 300
    except Exception as e:
        print(f"SendGrid error: {e}")
        return False