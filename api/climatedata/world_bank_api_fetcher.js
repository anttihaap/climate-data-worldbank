const axios = require('axios')
const R = require('ramda')

const countryCodesUrl =
  'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/'

const emissionsApiUrl = (countryCode, page) => {
  return `http://api.worldbank.org/v2/country/${countryCode}/indicator/EN.ATM.CO2E.KT;EN.ATM.CO2E.PC?source=2&format=json&page=${page}`
}

const allEmissionsAndGDPForYearApiUrl = (year, page) => {
  return `http://api.worldbank.org/v2/country/ALL/indicator/EN.ATM.CO2E.KT;EN.ATM.CO2E.PC;NY.GDP.MKTP.CD?source=2&date=${year}&format=json&page=${page}`
}

const fetch = async url => {
  try {
    return await axios.get(url)
  } catch (err) {
    throw new Error('failed to fetch data from worldbank, fetch failed')
  }
}

const fetchAllPages = async (apiUrl, currentLastUpdatedDate) => {
  let fetchedData = []
  let currentPage = 1
  while (true) {
    const res = await fetch(apiUrl(currentPage))

    if (
      !res.data ||
      !res.data[0] ||
      res.data[1] === undefined ||
      res.data[0].lastupdated === undefined
    ) {
      throw new Error(
        'fetch to fetch data from worldbank, unexpected response for request'
      )
    }

    const resData = res.data[1]
    const resInfo = res.data[0]
    if (res.data[1] === null) {
      return { status: 'notFound', data: [] }
    }

    if (
      currentLastUpdatedDate &&
      new Date(resInfo.lastupdated).getTime() < currentLastUpdatedDate.getTime()
    ) {
      return { status: 'notModified', data: [] }
    }
    fetchedData = fetchedData.concat(resData)
    if (currentPage === resInfo.pages) {
      break
    }
    currentPage++
  }
  return { status: 'success', data: fetchedData }
}

const fetchCountryCodes = async () => {
  const res = await axios.get(countryCodesUrl)
  if (res.status !== 200) {
    return { status: 'error', data: [] }
  }
  return {
    status: 'success',
    data: res.data.map(resCountry => {
      return { name: resCountry.name, iso3: resCountry.iso3 }
    })
  }
}

const fetchEmissionsData = async (countryCode, currentLastUpdatedDate) => {
  const fetchRes = await fetchAllPages(
    page => emissionsApiUrl(countryCode, page),
    currentLastUpdatedDate
  )

  if (fetchRes.status !== 'success') {
    return fetchRes
  }

  return {
    status: fetchRes.status,
    data: R.groupBy(a => a.date, fetchRes.data)
  }
}

const fetchAllEmissionsAndGDBforYear = async (year, currentLastUpdatedDate) => {
  const fetchRes = await fetchAllPages(
    page => allEmissionsAndGDPForYearApiUrl(year, page),
    currentLastUpdatedDate
  )

  if (fetchRes.status !== 'success') {
    return fetchRes
  }

  return {
    status: fetchRes.status,
    data: R.groupBy(a => a.countryiso3code, fetchRes.data)
  }
}

module.exports = {
  fetchCountryCodes,
  fetchEmissionsData,
  fetchAllEmissionsAndGDBforYear
}
