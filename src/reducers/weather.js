import {
  GET_CURRENT_GEO,
  GET_WEATHER,
  GET_FEATURED,
  ADD_FEATURED
} from '../actions/types'

const initialState = {
  currentGeo: null,
  weather: null,
  featured: []
}

export default function (state = initialState, action) {
  const { type, data } = action

  switch (type) {
    case GET_CURRENT_GEO:
      return {
        ...state,
        currentGeo: data
      }
    case GET_WEATHER:
      return {
        ...state,
        weather: data
      }
    case GET_FEATURED:
      return {
        ...state,
        featured: data
      }
    case ADD_FEATURED:
      return {
        ...state,
        featured: data
      }
    default:
      return state
  }
}
