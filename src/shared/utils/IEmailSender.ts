export interface IEmailSender {
  sendMultipleEmail(
    receivers: string[],
    subject: string,
    content: string,
    html: string,
    hideReceiversFromEachOther: boolean
  ): Promise<any>;
  sendEmail(
    receiver: string,
    subject: string,
    content: string,
    html: string
  ): Promise<any>;
}
