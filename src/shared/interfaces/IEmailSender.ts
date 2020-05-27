export interface IEmailSender {
  sendMultipleEmail(
    receivers: string[],
    subject: string,
    html: string,
    hideReceiversFromEachOther: boolean
  ): Promise<any>;
  sendEmail(
    receiver: string,
    subject: string,
    html: string
  ): Promise<any>;
}
