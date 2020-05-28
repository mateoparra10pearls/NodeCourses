export interface IResponseApp {
  result: any,
  errorList: IErrorObj[];
}

export interface IErrorObj {
  code: number,
  message: string
}
