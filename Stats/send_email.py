from email.message import EmailMessage
import os
from reprlib import recursive_repr
import smtplib
from set_env_vars import set_vars

set_vars()

EMAIL_ADDRESS = os.environ['EMAIL_ADDRESS']
EMAIL_PASSWORD = os.environ['EMAIL_PASSWORD']

with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
	smtp.ehlo()
	smtp.starttls()
	smtp.ehlo()

	smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)


	msg = EmailMessage()
	msg['Subject'] = 'AppSave - Monthly Report'
	msg['From'] = EMAIL_ADDRESS
	msg['To'] = 'milosvuk99@gmail.com'
	msg.set_content(" Improve Your Finances ")

	files = ['sankey.html']
	for file in files:
		with open(file, 'rb') as f:
			file_data = f.read()
			file_name = f.name

		msg.add_attachment(file_data, maintype='application', subtype='octet-stream', filename=file_name)
	smtp.send_message(msg)