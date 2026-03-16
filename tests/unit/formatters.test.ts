import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../../app/utils/formatters'

describe('formatCurrency', () => {
  it('formats whole euro amount', () => {
    expect(formatCurrency(1000)).toBe('10,00 €')
  })

  it('formats amount with cents', () => {
    expect(formatCurrency(1550)).toBe('15,50 €')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('0,00 €')
  })
})
