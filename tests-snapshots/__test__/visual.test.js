const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'pixel',
			failureTreshold: 500,
		})
	})

	test('Single Element Snapshot', async function () {
		await page.goto('https://www.example.com')
		const h1 = await page.waitForSelector('h1')
		const image = await h1.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureTreshold: 0.01,
		})
	})
})
