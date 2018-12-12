const apiRouter = require('express').Router()
const climateData = require('./climatedata/climate_data.js')
const asyncHandler = require('express-async-handler')

apiRouter.get(
  '/countries',
  asyncHandler(async (req, res) => {
    const countries = await climateData.fetchCountryCodes()
    res.json(countries)
  })
)

apiRouter.get(
  '/emissions/:countryCode',
  asyncHandler(async (req, res) => {
    const countryCode = req.params.countryCode
    await handleFetch(res, () => climateData.fetchEmissionData(countryCode))
  })
)

apiRouter.get(
  '/emissions-and-gdp/all/year/:year',
  asyncHandler(async (req, res) => {
    const year = req.params.year
    await handleFetch(res, () => climateData.allEmissionsAndGdbForYear(year))
  })
)

const handleFetch = async (res, fetchFunc) => {
  const fetchRes = await fetchFunc()

  switch (fetchRes.status) {
  case 'success':
    return res.json(fetchRes.data)
  case 'notFound':
    return res.status(404).end()
  default:
    throw new Error('Unknown')
  }
}

module.exports = apiRouter
