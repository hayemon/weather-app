import React, {
    useState,
    useEffect
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import enTranslations from '@shopify/polaris/locales/en.json'
import {
    AppProvider,
    Page,
    Card,
    Button,
    TextField
} from '@shopify/polaris'

import {
    getCurrentGeo,
    getWeather,
    addFeatured,
    getFeatured
} from '../actions/weather'

const Weather = ({
    getCurrentGeo,
    getWeather,
    addFeatured,
    getFeatured,

    currentGeo,
    weather,
    featured
}) => {
    useEffect(() => {
        getCurrentGeo()
        getFeatured()
    }, [])

    useEffect(() => {
        currentGeo &&
            currentGeo.location &&
            currentGeo.location.region &&
            getWeather(currentGeo.location.region)
    }, [currentGeo])

    const [value, setValue] = useState('')

    const handleChange = cityName => {
        setValue(cityName)
        getWeather(cityName)
    }

    return (
        <AppProvider i18n={enTranslations}>
            <Page title="Example Weather">
                <TextField label="Store name" value={value} onChange={handleChange} />
                <br />
                {weather && weather.weather && <Card title={weather.name} sectioned>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '32px' }}>
                            {weather.weather &&
                                weather.weather.map(((weatherItem, weatherItemIndex) =>
                                    <div key={weatherItem.id}>
                                        <h5 style={{ textTransform: 'capitalize' }}>
                                            {weatherItem.description.toString() + ((!weather.weather.length - 1 == weatherItemIndex) ? ', ' : '')}
                                        </h5>
                                        <img src={`http://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`} />
                                    </div>
                                ))}
                        </div>

                        <div>
                            Temperature: {weather.main.temp}°C ({weather.main.temp_min}-{weather.main.temp_max})
                            <br />
                            Feels like: {weather.main.feels_like} °C
                            <br />
                            Humidity: {weather.main.humidity}%
                            <br />
                            Wind speed: {weather.wind.speed} m/s
                        </div>
                    </div>
                    <br />
                    <Button onClick={() => addFeatured(weather)}>Add to featured</Button>
                </Card>}
                <br />
                {featured.map((item, index) => (
                    <Button key={index}>
                        {item.name}
                    </Button>
                ))}
            </Page>
        </AppProvider>
    )
}

Weather.propTypes = {
    getCurrentGeo: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired,
    addFeatured: PropTypes.func.isRequired,
    getFeatured: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    weather: state.weather.weather,
    currentGeo: state.weather.currentGeo,
    featured: state.weather.featured
})

export default connect(
    mapStateToProps,
    {
        getCurrentGeo,
        getWeather,
        addFeatured,
        getFeatured
    }
)(Weather)