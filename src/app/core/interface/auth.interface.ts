export interface AuthResponse {
    message: string
    user: User
    token: string
}

export interface User {
  name: string
  email: string
  role: string
}

export interface ErrorResponse {
  message: string
  errors: Errors
}

export interface Errors {
  msg: string
  param: string
  location: string
}
