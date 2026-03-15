import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { createPage, setup, url } from '@nuxt/test-utils/e2e'

describe('Mini Designer', { timeout: 30_000 }, async () => {
  await setup({ browser: true })

  describe('Navigation', () => {
    it('navigates from design to about and back, preserving designer state', async () => {
      const page = await createPage(url('/'))

      await page.getByTestId('picker-item').nth(1).click()
      const priceBeforeNav = await page.getByText('€').textContent()

      await page.getByRole('link', { name: 'About this project' }).click()
      await expect(page).toHaveURL(/\/about$/)
      await expect(page.getByText('This is a Demo Page')).toBeVisible()

      await page.getByRole('button', { name: 'Back' }).click()
      await expect(page).toHaveURL(url('/'))
      await expect(page.getByText('€')).toHaveText(priceBeforeNav!)

      await page.close()
    })

    it('preserves designer state after navigating back from checkout', async () => {
      const page = await createPage(url('/'))

      await page.getByTestId('picker-item').nth(1).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      const totalText = await page.getByText('Total:').textContent()

      await page.getByRole('link', { name: 'Back' }).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()

      await expect(page.getByText('Total:')).toHaveText(totalText!)

      await page.close()
    })
  })
})
