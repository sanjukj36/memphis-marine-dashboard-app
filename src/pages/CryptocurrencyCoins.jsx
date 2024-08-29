import React, { useEffect, useState } from 'react';
import { getCryptoPrices } from '../services/apiService';
import { Container, Row, Col, Image, Spinner, Card, Button, Modal } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import 'chart.js/auto';
import { Pie, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function CryptocurrencyCoins() {
  const [cryptoData, setCryptoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cryptoResponse = await getCryptoPrices();
        setCryptoData(cryptoResponse.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data', error);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => setShowModal(false);

  const handleShow = (crypto) => {
    const gaugeValue = crypto.current_price / crypto.ath;

    setModalContent(
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={gaugeValue}
        textColor="#fff"
        needleColor="#e0e0e0"
      />
    );
    setShowModal(true);
  };

  const handleInfoClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  const pieData = {
    labels: cryptoData.slice(0, 15).map(crypto => crypto.name),
    datasets: [
      {
        label: 'Market Cap Distribution',
        data: cryptoData.slice(0, 15).map(crypto => crypto.market_cap),
        backgroundColor: [
          '#FF5733', '#33FF57', '#33C1FF', '#FF33A1', '#FFD700',
          '#8D33FF', '#FFCC99', '#FF3333', '#FF33FF', '#33FF83',
          '#FF8C33', '#339FFF', '#FF9933', '#FF33B5', '#00FF7F',
        ]
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF', 
        }
      },
      
    },
    
  };


  const barData = {
    labels: cryptoData.slice(0, 15).map(crypto => crypto.name),
    datasets: [
      {
        label: 'Current Price',
        data: cryptoData.slice(0, 15).map(crypto => crypto.current_price),
        backgroundColor: '#FFFFFF', 
        borderColor: '#FFFFFF', 
        borderWidth: 3,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' },
      },
      x: {
        ticks: { color: '#fff' },
      },
    }
  };

  return (
    <>
      <NavBar />
      <div className="crypto-bg">
        <Container>
          <h1 className="my-4 text-light text-center">Cryptocurrency Coins</h1>
          {cryptoData.length > 0 ? (
            <>
              <div className='container mb-5'>
                <Row className="mb-5">
                  <Col md={6} className="chart-container">
                    <h4 className='text-light mb-4 text-center'>Current Price Bar Chart</h4>
                    <Bar data={barData} options={barOptions} />
                  </Col>

                  <Col md={6} className="chart-container">

                    <h4 className='text-light mb-4 text-center'>Market Cap Pie Chart</h4>
                    <Pie data={pieData} options={pieOptions} />

                  </Col>
                </Row>
              </div>
              <Row>
                {cryptoData.slice(0, 21).map((crypto) => (
                  <Col key={crypto.id} md={6} lg={4} className="mb-4">
                    <Card className="shadow-sm rounded bg-dark text-light">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-2">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            roundedCircle
                            className="me-3"
                            style={{ width: '50px', height: '50px' }}
                          />
                          <Card.Title className="mb-0">{crypto.name}</Card.Title>
                        </div>
                        <Card.Text className="mb-3">
                          <strong>Price:</strong> ${crypto.current_price}
                        </Card.Text>
                        <div>
                          <Button
                            variant="success"
                            onClick={() => handleShow(crypto)}
                          >
                            Price Proximity to All-Time High
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleInfoClick(crypto.id)}
                          >
                            Info
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>


                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div className="text-center">
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}


          
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-dark text-light">
              <Modal.Title>Gauge Meter</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              {modalContent}
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default CryptocurrencyCoins;
