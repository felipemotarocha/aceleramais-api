export interface HttpRequest {
  body?: any
  params?: { [key: string]: string }
  query?: { [key: string]: string }
}

export interface HttpResponse {
  status: number
  body: any
}
