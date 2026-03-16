export interface Color {
  name: string
  color: string
  price: number
}

export interface Design {
  name: string
  img: string
  price: number
}

export interface CheckoutForm {
  name: string
  address: string
}

export type OrderErrors = Partial<Record<keyof CheckoutForm, string[]>>

export interface OrderErrorResponse {
  message: string
  statusText: string
  errors: OrderErrors
}
