import {
  GET_CURRENT_GEO,
  GET_WEATHER,
  GET_FEATURED,
  ADD_FEATURED
} from '../actions/types'

export const getCurrentGeo = () => async dispatch => {
  const url = 'https://geo.ipify.org/api/v1?apiKey=at_7zJcEqdxdtMtFl2HXdyueYHsatM4s'
  fetch(url).
    then(res => res.json()).then(json => {
      dispatch({
        type: GET_CURRENT_GEO,
        data: json
      })
    })
}

export const getWeather = cityName => async dispatch => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=a09bf49436c24e2e69446a41cb478494`

  fetch(url).
    then(res => res.json()).then(json => {
      dispatch({
        type: GET_WEATHER,
        data: json
      })
    })
}

export const addFeatured = weatherItem => async dispatch => {
  let featuredItems = localStorage.getItem('featured') ? JSON.parse(localStorage.getItem('featured')) : []
  featuredItems.push(weatherItem)
  localStorage.setItem('featured', JSON.stringify(featuredItems))

  dispatch({
    type: ADD_FEATURED,
    data: featuredItems
  })
}

export const getFeatured = () => async dispatch => {
  dispatch({
    type: GET_FEATURED,
    data: JSON.parse(localStorage.getItem('featured'))
  })
}