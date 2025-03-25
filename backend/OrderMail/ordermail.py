import aiosmtplib
from email.mime.text import MIMEText

# Email Configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = "nacht.system@gmail.com"
SMTP_PASSWORD = "nngl cwvj bapf zixr"

async def send_order_email(order):
    order_details = "\n".join([f"{item} x{qty}" for item, qty in order.items.items()])
    
    if order.order_type == "deliver":
        message_body = f"""
        Hi {order.name},

        Your delivery order has been placed!

        Order Details:
        {order_details}

        Total: ₱{order.total_price}

        📍 Delivery Address: {order.address}
        📞 Contact Number: {order.phone}

        Thank you for ordering!
        """
    else:
        message_body = f"""
        Hi {order.name},

        Your pick-up order has been placed!

        Order Details:
        {order_details}

        Total: ₱{order.total_price}

        📍 Pick Up Location: Tagoloan
        🚶‍♂️ Please pick up your order at the designated location.

        Thank you for ordering!
        """

    email_content = f"Subject: Order Confirmation - Your Order is Placed!\n\n{message_body}"

    msg = MIMEText(email_content)
    msg["From"] = SMTP_EMAIL
    msg["To"] = order.email
    msg["Subject"] = "Order Confirmation"

    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_SERVER,
            port=SMTP_PORT,
            username=SMTP_EMAIL,
            password=SMTP_PASSWORD,
            use_tls=False,
            start_tls=True
        )
    except Exception as e:
        print("Email sending failed:", e)
