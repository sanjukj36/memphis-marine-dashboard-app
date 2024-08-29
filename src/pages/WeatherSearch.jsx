import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { getWeatherData } from '../services/apiService';

function WeatherSearch() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const state = document.getElementById("locationInput").value;
            const response = await getWeatherData(state);
            setWeatherData(response.data);
        } catch (err) {
            setError('Error fetching weather data');
            console.error(err);
        }
    };

    const renderWeatherInfo = () => {
        if (weatherData) {
            const {
                coord, weather, main, name, sys, wind, rain, clouds, visibility, timezone
            } = weatherData;

            const { temp, feels_like, pressure, humidity, temp_min, temp_max } = main;
            const { description, icon } = weather[0];

            const localTime = new Date(Date.now() + timezone * 1000);
            const formattedTime = localTime.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            });

            return (
                <div className="text-center mt-3 mb-4">
                    <h6 className="display-4 mb-0 font-weight-bold text-primary">{temp}°C</h6>
                    <span className="text-dark"><strong>{name}</strong></span>
                    <div>
                        <img 
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
                            alt={description} 
                            style={{ width: '50', height: '50' }} // Make image smaller
                        />
                    </div>
                    <span className="text-muted">{description}</span>

                    <Row className="mt-3">
                        <Col md={6} className="text-left">
                            
                            <div><i className="fas fa-thermometer-half"></i> Feels like: <strong>{feels_like}°C</strong></div>
                            <div><i className="fas fa-tint"></i> Humidity: <strong>{humidity}%</strong></div>
                            <div><i className="fas fa-temperature-low"></i> Min Temp: <strong>{temp_min}°C</strong></div>
                            <div><i className="fas fa-temperature-high"></i> Max Temp: <strong>{temp_max}°C</strong></div>
                        </Col>
                        <Col md={6} className="text-right">
                           
                            <div><i className="fas fa-wind"></i> Wind: <strong>{wind.speed} m/s, {wind.deg}°</strong></div>
                            {rain && <div><i className="fas fa-cloud-rain"></i> Rain (last 1h): <strong>{rain["1h"]} mm</strong></div>}
                            <div><i className="fas fa-cloud"></i> Cloudiness: <strong>{clouds.all}%</strong></div>
                            <div><i className="fas fa-eye"></i> Visibility: <strong>{visibility} m</strong></div>
                            <div><i className="fas fa-tachometer-alt"></i> Pressure: <strong>{pressure} hPa</strong></div>
                        </Col>
                    </Row>
                    <div><i className="fas fa-map-marker-alt "></i> Coordinates: <strong>{coord.lat}, {coord.lon}</strong></div>
                    <div className="mt-2 text-dark"><i className="far fa-clock"></i> <strong>{formattedTime}</strong></div>
                </div>
            );
        } else if (error) {
            return <div className="text-danger text-center">{error}</div>;
        } else {
            return null;
        }
    };

    return (
        <div>
            <NavBar />
            <div className='Weather-container'>
                <Container >
                    <Row className="justify-content-center mt-4">
                        <Col md={6}>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    id="locationInput"
                                    type="text"
                                    placeholder="Enter location"
                                    aria-label="Location"
                                />
                                <Button onClick={handleSearch} variant="primary">
                                    Get Weather
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div id="result">{renderWeatherInfo()}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default WeatherSearch;
