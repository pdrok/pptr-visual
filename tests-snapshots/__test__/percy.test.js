const puppeteer = require('puppeteer')
const percySnapshot  = require('@percy/puppeteer')

describe('Percy Visual Test', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Percy Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForTimeout(1000)
		await percySnapshot(page, 'Example Page')
	})
})
