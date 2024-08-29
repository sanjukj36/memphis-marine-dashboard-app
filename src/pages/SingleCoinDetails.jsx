import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCryptoPrices } from '../services/apiService';
import { Container, Image, Spinner, Table } from 'react-bootstrap';
import NavBar from '../components/NavBar';

function SingleCoinDetails() {
    const { coinId } = useParams();
    const [coinDetails, setCoinDetails] = useState(null);

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const cryptoResponse = await getCryptoPrices();
                const selectedCoin = cryptoResponse.data.find(coin => coin.id === coinId);
                setCoinDetails(selectedCoin);
            } catch (error) {
                console.error('Error fetching coin details', error);
            }
        };

        fetchCoinDetails();
    }, [coinId]);

    return (
        <>
            <NavBar />
            <Container className="my-4 coin-details-container">
                {coinDetails ? (
                    <>
                        <div className="text-center mb-4">
                            <h1 className="display-4">{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</h1>
                            <Image 
                                src={coinDetails.image} 
                                alt={coinDetails.name} 
                                rounded 
                                fluid 
                                className="my-4" 
                            />
                        </div>
                        <Table striped bordered hover responsive="md" >
                            <tbody>
                                <tr>
                                    <td><strong>Current Price</strong></td>
                                    <td>${coinDetails.current_price}</td>
                                </tr>
                                <tr>
                                    <td><strong>Market Cap</strong></td>
                                    <td>${coinDetails.market_cap.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Market Cap Rank</strong></td>
                                    <td>{coinDetails.market_cap_rank}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fully Diluted Valuation</strong></td>
                                    <td>${coinDetails.fully_diluted_valuation?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Volume</strong></td>
                                    <td>${coinDetails.total_volume.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>24h High</strong></td>
                                    <td>${coinDetails.high_24h}</td>
                                </tr>
                                <tr>
                                    <td><strong>24h Low</strong></td>
                                    <td>${coinDetails.low_24h}</td>
                                </tr>
                                <tr>
                                    <td><strong>Price Change (24h)</strong></td>
                                    <td>${coinDetails.price_change_24h.toFixed(2)} ({coinDetails.price_change_percentage_24h.toFixed(2)}%)</td>
                                </tr>
                                <tr>
                                    <td><strong>Market Cap Change (24h)</strong></td>
                                    <td>${coinDetails.market_cap_change_24h.toLocaleString()} ({coinDetails.market_cap_change_percentage_24h.toFixed(2)}%)</td>
                                </tr>
                                <tr>
                                    <td><strong>Circulating Supply</strong></td>
                                    <td>{coinDetails.circulating_supply.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Supply</strong></td>
                                    <td>{coinDetails.total_supply?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Max Supply</strong></td>
                                    <td>{coinDetails.max_supply?.toLocaleString() || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time High</strong></td>
                                    <td>${coinDetails.ath} ({coinDetails.ath_change_percentage.toFixed(2)}%) on {new Date(coinDetails.ath_date).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time Low</strong></td>
                                    <td>${coinDetails.atl} ({coinDetails.atl_change_percentage.toFixed(2)}%) on {new Date(coinDetails.atl_date).toLocaleDateString()}</td>
                                </tr>
                                {coinDetails.roi && (
                                    <tr>
                                        <td><strong>ROI</strong></td>
                                        <td>{coinDetails.roi.times.toFixed(2)} times ({coinDetails.roi.percentage.toFixed(2)}%)</td>
                                    </tr>
                                )}
                                <tr>
                                    <td><strong>Last Updated</strong></td>
                                    <td>{new Date(coinDetails.last_updated).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </Container>
        </>
    );
}

export default SingleCoinDetails;
