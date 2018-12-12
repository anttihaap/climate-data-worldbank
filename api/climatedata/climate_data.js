const memoizee = require('memoizee')
const memoizeeMaxAge = 60 * 60 * 24 * 1000
const L = require('partial.lenses')
const R = require('ramda')
const { numberWithCommas } = require('../utils/numberFormatter')

const dataFetcher = require('./world_bank_api_fetcher')

const database = {}
const databaseTimeStamps = {}

const saveToDataBase = (key, data) => {
  database[key] = data
  databaseTimeStamps[key] = new Date()
}

const fetchData = async (key, fetchFunc, parseFunc) => {
  const timeStamp = databaseTimeStamps[key]

  const fetchedData = await fetchFunc(timeStamp)

  if (fetchedData.status === 'notModified') {
    return { status: 'success', data: database[key] }
  }

  if (fetchedData.status !== 'success') {
    return fetchedData
  }

  const parsedData = parseFunc(fetchedData.data)
  saveToDataBase(key, parsedData)
  return { status: 'success', data: parsedData }
}

const fetchCountryCodes = memoizee(
  async () => {
    const fetchedCountryCodes = await dataFetcher.fetchCountryCodes()
    return fetchedCountryCodes.data.reduce((acc, countryCode) => {
      return { ...acc, [countryCode.name]: countryCode.iso3 }
    }, {})
  },
  { maxAge: memoizeeMaxAge, promise: true }
)

const fetchEmissionData = memoizee(
  async countryCode => {
    const fetchFunc = async timestamp =>
      await dataFetcher.fetchEmissionsData(countryCode, timestamp)

    const parseFunc = data =>
      Object.keys(data).reduce((acc, year) => {
        const dataForYear = data[year]

        const emissions = dataForYear.filter(
          data => data.indicator.id == 'EN.ATM.CO2E.KT'
        )

        const emissionsPerCapita = dataForYear.filter(
          data => data.indicator.id === 'EN.ATM.CO2E.PC'
        )
        return {
          ...acc,
          [year]: {
            emissions: emissions[0].value,
            emissionsPerCapita: emissionsPerCapita[0].value
          }
        }
      }, {})
    return fetchData('emissionData&' + countryCode, fetchFunc, parseFunc)
  },
  { maxAge: memoizeeMaxAge, promise: true }
)

const allEmissionsAndGdbForYear = memoizee(
  async year => {
    const fetchFunc = async timestamp =>
      await dataFetcher.fetchAllEmissionsAndGDBforYear(year, timestamp)

    const parseFunc = data =>
      Object.keys(data).reduce((acc, countryCode) => {
        const countrysData = data[countryCode]

        const convertUsdToMillionsWithCommas = usdValue => {
          const millionUsd = Math.round(usdValue / 1000000 + 'e+2')

          return numberWithCommas(millionUsd)
        }

        const emissions = countrysData.filter(
          data => data.indicator.id == 'EN.ATM.CO2E.KT'
        )

        const emissionsPerCapita = countrysData.filter(
          data => data.indicator.id === 'EN.ATM.CO2E.PC'
        )

        const gdp = countrysData.filter(
          data => data.indicator.id === 'NY.GDP.MKTP.CD'
        )

        return [
          ...acc,
          {
            countryName: countrysData[0].country.value,
            countryCode,
            emissions: emissions[0].value,
            emissionsPerCapita: emissionsPerCapita[0].value,
            gdp: gdp[0].value
          }
        ]
      }, [])

    const key = 'allEmissionsAndGdbForYear&' + year
    return fetchData(key, fetchFunc, parseFunc)
  },
  { maxAge: memoizeeMaxAge, promise: true }
)

module.exports = {
  fetchEmissionData,
  fetchCountryCodes,
  allEmissionsAndGdbForYear
}
