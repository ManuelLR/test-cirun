import { test } from '@playwright/test'

test.use({ trace: 'on' })

test('Record gpu status on browser', async ({ page, browserName }) => {
  switch (browserName) {
    case 'chromium':
      await page.goto('chrome://gpu/')
      break
    case 'firefox':
      await page.goto('about:support')
      break
    default:
      test.skip(true, `We don't know how to obtain gpu status of ${browserName} browser`)
  }
  await page.waitForTimeout(10*1000)
  await page.mouse.wheel(0, 1000)
})
