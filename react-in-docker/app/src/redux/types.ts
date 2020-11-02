export interface Error {
  status: string | number,
  message: string
}

export interface AsyncRequest {
  fetching: boolean,
  fetched: boolean,
  error: Error | null | false
}
