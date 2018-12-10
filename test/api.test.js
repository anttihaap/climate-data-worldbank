const chai = require('chai')
const assert = chai.assert
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

const app = require('../server.js')
const supertest = require('supertest')

describe('test', () => {
  describe('world bank error handling', () => {
    describe('when world bank fetch fails return 500 with correct error message', async () => {
      afterEach(() => {
        mock.reset()
      })

      const expectGet500withErrorMessage = async (getUrl, errorMessage) => {
        const res = await supertest(app)
          .get(getUrl)
          .expect(500)
        assert.equal(res.body.message, errorMessage)
      }

      it('/api/emissions', async () => {
        const firstExpetedFecthUrl =
          'http://api.worldbank.org/v2/country/FIN/indicator/EN.ATM.CO2E.KT?format=json&page=1'
        mock.onGet(firstExpetedFecthUrl).reply(500, {})
        await expectGet500withErrorMessage(
          '/api/emissions/FIN',
          'failed to fetch data from worldbank, fetch failed'
        )
      })

      it('/emissions-and-gdp/all/year/201', async () => {
        const firstExpetedFecthUrl =
          'http://api.worldbank.org/v2/country/ALL/indicator/EN.ATM.CO2E.KT;EN.ATM.CO2E.PC;NY.GDP.MKTP.CD?source=2&date=2014&format=json&page=1'
        mock.onGet(firstExpetedFecthUrl).reply(500, {})
        await expectGet500withErrorMessage(
          '/api/emissions-and-gdp/all/year/2014',
          'failed to fetch data from worldbank, fetch failed'
        )
      })
    })
  })
})
