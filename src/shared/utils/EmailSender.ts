import { IEmailSender } from "./IEmailSender";
import MailService from "@sendgrid/mail";
import ClientResponse from "@sendgrid/helpers/classes/response";
import { injectable } from "inversify";

@injectable()
class EmailSender implements IEmailSender {
  async sendMultipleEmail(
    receivers: string[],
    subject: string,
    content: string,
    html: string,
    hideReceiversFromEachOther: boolean
  ): Promise<any> {
    return await this.send(
      receivers,
      subject,
      content,
      html,
      hideReceiversFromEachOther
    );
  }

  async sendEmail(
    receiver: string,
    subject: string,
    content: string,
    html: string
  ): Promise<any> {
    return await this.send([receiver], subject, content, html, false);
  }

  private async send(
    receivers: string[],
    subject: string,
    content: string,
    html: string,
    hideReceiversFromEachOther: boolean
  ): Promise<any> {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_EMAIL_FROM) {
      MailService.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: receivers,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: subject,
        text: content
      };

      if (hideReceiversFromEachOther) {
        return await this.executeSend(MailService.sendMultiple(msg));
      } else {
        return await this.executeSend(MailService.send(msg));
      }
    } else {
      throw new Error("Sendgrid APIKEY or SenderEmail not configured");
    }
  }

  private async executeSend(fn:Promise<any>): Promise<any> {
    return await fn.then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(`Error sending email: ${JSON.stringify(error)}`);
    });
  }
}

export default EmailSender;
