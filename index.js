
const OPENWEATHERMAP_API_KEY = 'c9d1365328877e9e48ba62eb757569ec';
const axios = require('axios');
const express = require('express');
const PORT = 5555;
const app = express();


app.get('/weather', (req, res) => {
    const city = req.query.text;
    const WEATHER_URL_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?q=${
        city
        }&units=imperial&appid=${OPENWEATHERMAP_API_KEY}`;

    axios
        .get(WEATHER_URL_ENDPOINT)
        .then(response => {
            const weatherData = response.data;
            res.json({
                response_type: 'in_channel',
                text: `The weather currently in ${weatherData.name} (${
                    weatherData.sys.country
                    })`,
                attachments: [
                    {
                        title: weatherData.weather[0].description,
                        text: `Current temperature: ${weatherData.main.temp} (High: ${
                            weatherData.main.temp_max
                            } Low: ${weatherData.main.temp_min})`,
                        thumb_url: `http://openweathermap.org/img/w/${
                            weatherData.weather[0].icon
                            }.png`
                    }
                ]
            });
        })
        .catch(error => {
            res.json({ text: error.response.data.message });
        });
});

// start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
