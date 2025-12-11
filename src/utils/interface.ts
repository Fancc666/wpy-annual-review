export interface LoginParams {
  uname: string,
  upwd: string
}
export interface LoginApi {
  permission: string,
  token: string,
  username: string
}
export interface RegistParams {
  uname: string,
  upwd: string,
  uemail: string
}
export interface ResponseData<T = unknown> {
  code: number,
  msg: string,
  data: T
}
export interface Book {
  page: number,
  price: number,
  bookId: number,
  author: string,
  bookName: string
}
export interface Order {
  quantity: number,
  id: number,
  userName?: string | null,
  bookId: number
}
export interface Detail {
  bookId: number,
  quantity: number,
  total: number,
  price: number
}
export interface OrderDetail {
  id: number,
  username: string,
  total: number,
  entertime: string,
  list: Detail[]
}
