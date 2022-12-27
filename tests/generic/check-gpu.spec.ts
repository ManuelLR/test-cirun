import { test } from '@playwright/test'

test.use({ trace: 'on' })

test('Record gpu status on browser', async ({ page, browserName }) => {
  await page.goto('https://get.webgl.org/')
  await page.waitForTimeout(1*1000)
  await page.goto('https://webglreport.com/?v=1')
  await page.waitForTimeout(1*1000)
  await page.goto('https://webglreport.com/?v=2')
  await page.waitForTimeout(1*1000)
  switch (browserName) {
    case 'chromium':
      await page.goto('chrome://gpu/')
      await page.mouse.wheel(0, 1000)
      break
    case 'firefox':
      await page.goto('about:support#graphics', { waitUntil: 'networkidle' })
      await page.waitForTimeout(1*1000)
      await page.goto('about:support#graphics-gpu-1-tbody', { waitUntil: 'networkidle' })
      await page.waitForTimeout(1*1000)
      await page.goto('about:support#graphics-diagnostics-tbody', { waitUntil: 'networkidle' })
      await page.waitForTimeout(1*1000)
      await page.goto('about:support#graphics-decisions-tbody', { waitUntil: 'networkidle' })
      break
    default:
      test.skip(true, `We don't know how to obtain gpu status of ${browserName} browser`)
  }
  await page.waitForTimeout(10*1000)

})
