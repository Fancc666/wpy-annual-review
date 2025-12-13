export interface ResponseData<T = unknown> {
  code: number,
  msg: string,
  data: T
}
