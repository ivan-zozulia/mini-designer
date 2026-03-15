import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../../app/utils/formatters'

describe('formatCurrency', () => {
  it('formats a whole number', () => {
    expect(formatCurrency(10)).toBe('10,00 €')
  })

  it('formats a decimal number', () => {
    expect(formatCurrency(15.5)).toBe('15,50 €')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('0,00 €')
  })

  it('rounds to 2 decimal places', () => {
    expect(formatCurrency(9.999)).toBe('10,00 €')
  })
})
