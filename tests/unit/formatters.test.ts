import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../../app/utils/formatters'

describe('formatCurrency', () => {
  it('formats a whole number', () => {
    expect(formatCurrency(1000)).toBe('10,00 €')
  })

  it('formats a decimal number', () => {
    expect(formatCurrency(1550)).toBe('15,50 €')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('0,00 €')
  })
})
