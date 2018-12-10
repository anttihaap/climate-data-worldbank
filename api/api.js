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

    const emissionData = await climateData.fetchEmissionData(countryCode)
    res.json(emissionData)
  })
)

apiRouter.get(
  '/emissions-and-gdp/all/year/:year',
  asyncHandler(async (req, res) => {
    const year = req.params.year
    const emissionAndGdpData = await climateData.allEmissionsAndGdbForYear(year)
    res.json(emissionAndGdpData)
  })
)

module.exports = apiRouter
