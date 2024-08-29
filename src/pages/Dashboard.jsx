import React, { useState } from 'react';
import { Card, Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';

function Dashboard() {
    const navigate = useNavigate();
    const isAdmin = useSelector(state => state.auth.isAdmin);
   
    const handleCryptoClick = () => {
        navigate('/crypto-coins');
    };

    const handleWeatherClick = () => {
        navigate('/weather');
    };
    const handleUsersList = () => {
        navigate('/user-list');
    };

    return (
        <>
            <NavBar />
            <section className="dashboard-container">
                <h1 className="dashboard-title">Welcome to the <span>{isAdmin ? "Admin" : "User"}</span> Dashboard</h1>
                <div className="dashboard-cards">
                    {isAdmin && (
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>List Of Users</Card.Title>
                                <Card.Text>
                                    View the Users List.
                                </Card.Text>
                                <Button variant="primary" onClick={handleUsersList}>Users List</Button>
                            </Card.Body>
                        </Card>
                    )}
                    <Card className="dashboard-card">
                        <Card.Body>
                            <Card.Title>Cryptocurrency Coins</Card.Title>
                            <Card.Text>
                                View the latest cryptocurrency data.
                            </Card.Text>
                            <Button variant="primary" onClick={handleCryptoClick}>Go to Cryptocurrency Coins</Button>
                        </Card.Body>
                    </Card>

                    <Card className="dashboard-card">
                        <Card.Body>
                            <Card.Title>Weather Data</Card.Title>
                            <Card.Text>
                                Check the current weather in your location.
                            </Card.Text>
                            <Button variant="primary" onClick={handleWeatherClick}>Show Weather Data</Button>
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </>
    );
}

export default Dashboard;


