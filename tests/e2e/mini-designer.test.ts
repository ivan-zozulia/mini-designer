import { describe, it } from 'vitest'
import { expect } from '@playwright/test'
import { createPage, setup, url } from '@nuxt/test-utils/e2e'

describe('Mini Designer', { timeout: 30_000 }, async () => {
  await setup({ browser: true })

  describe('Navigation', () => {
    it('navigates from design to about and back, preserving designer state', async () => {
      const page = await createPage(url('/'))

      await page.getByRole('option').nth(1).click()
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

      await page.getByRole('option').nth(1).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      const totalText = await page.getByText('Total:').textContent()

      await page.getByRole('link', { name: 'Back' }).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()

      await expect(page.getByText('Total:')).toHaveText(totalText!)

      await page.close()
    })

    it('navigates from checkout to about and back, preserving checkout state', async () => {
      const page = await createPage(url('/'))

      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      await expect(page).toHaveURL(/\/checkout$/)

      await page.getByLabel('Name').fill('Erika')
      const totalText = await page.getByText('Total:').textContent()

      await page.getByRole('link', { name: 'About this project' }).click()
      await expect(page).toHaveURL(/\/about$/)

      await page.getByRole('button', { name: 'Back' }).click()
      await expect(page).toHaveURL(/\/checkout$/)

      await expect(page.getByLabel('Name')).toHaveValue('Erika')
      await expect(page.getByText('Total:')).toHaveText(totalText!)

      await page.close()
    })

    it('navigates from success to design via "Design another product"', async () => {
      const page = await createPage(url('/'))

      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      await page.getByLabel('Name').fill('Erika')
      await page.getByLabel('Address').fill('Goethestraße 10')
      await page.getByRole('button', { name: 'Buy' }).click()
      await expect(page).toHaveURL(/\/success$/)

      await page
        .getByRole('button', { name: 'Design another product' })
        .click()
      await expect(page).toHaveURL(url('/'))

      await page.close()
    })
  })

  describe('Design page', () => {
    it('shows designer with pickers and total price on initial load', async () => {
      const page = await createPage(url('/'))

      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design your Shirt')

      await expect(page.getByRole('option').first()).toBeVisible()
      await expect(page.getByText('€')).toBeVisible()

      await page.close()
    })

    it('updates price when changing selections', async () => {
      const page = await createPage(url('/'))

      await page.route('**/api/colors', (route) => {
        route.fulfill({
          json: [
            { name: 'Red', color: '#ff0000', price: 10 },
            { name: 'Blue', color: '#0000ff', price: 20 },
          ],
        })
      })

      await page.route('**/api/motives', (route) => {
        route.fulfill({
          json: [
            { name: 'Cat', img: 'https://example.com/cat.png', price: 5 },
          ],
        })
      })

      await page.reload()

      const initialPrice = await page.getByText('€').textContent()

      await page.getByRole('option').nth(1).click()
      const priceAfterFirstPick = await page.getByText('€').textContent()

      expect(priceAfterFirstPick).not.toBe(initialPrice)

      await page.getByRole('option').first().click()
      const priceAfterReset = await page.getByText('€').textContent()

      expect(priceAfterReset).toBe(initialPrice)

      await page.close()
    })
  })

  describe('Checkout page', () => {
    it('submits order and shows success page', async () => {
      const page = await createPage(url('/'))

      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      await expect(page).toHaveURL(/\/checkout$/)
      await expect(page.getByText('Total:')).toBeVisible()

      await page.getByLabel('Name').fill('Lea Mustermann')
      await page.getByLabel('Address').fill('Goethestraße 10')
      await page.getByRole('button', { name: 'Buy' }).click()

      await expect(page).toHaveURL(/\/success$/)
      await expect(page.getByText('Thank you for your order.')).toBeVisible()

      await page.close()
    })

    it('shows form error message and field errors on invalid submit', async () => {
      const page = await createPage(url('/'))
      await page.getByRole('link', { name: 'Go to Checkout' }).click()

      await page.getByRole('button', { name: 'Buy' }).click()

      await expect(page.getByText('The given data was invalid.')).toBeVisible()
      await expect(page.getByText('The name field is required.')).toBeVisible()
      await expect(page.getByText('The address field is required.')).toBeVisible()

      await expect(page).toHaveURL(/\/checkout$/)

      await page.close()
    })
  })

  describe('Order success page', () => {
    it('resets selection after "Design another product"', async () => {
      const page = await createPage(url('/'))
      const initialPrice = await page.getByText('€').textContent()

      await page.getByRole('option').nth(1).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      await page.getByLabel('Name').fill('Erika')
      await page.getByLabel('Address').fill('Goethestraße 10')
      await page.getByRole('button', { name: 'Buy' }).click()
      await page.getByRole('button', { name: 'Design another product' }).click()

      await expect(page.getByText(initialPrice).first()).toBeVisible()

      await page.close()
    })

    it('resets selection after Back button', async () => {
      const page = await createPage(url('/'))
      const initialPrice = await page.getByText('€').textContent()

      await page.getByRole('option').nth(1).click()
      await page.getByRole('link', { name: 'Go to Checkout' }).click()
      await page.getByLabel('Name').fill('Erika')
      await page.getByLabel('Address').fill('Goethestraße 10')
      await page.getByRole('button', { name: 'Buy' }).click()
      await page.getByRole('button', { name: 'Back' }).click()

      await expect(page.getByText(initialPrice).first()).toBeVisible()

      await page.close()
    })
  })
})
