// import React, { useState } from 'react';
// import { Card, Button, Modal, Table } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import { useSelector } from 'react-redux';
// import { getUsersAPI } from '../services/allAPI';

// function UserDashboard() {
//     const navigate = useNavigate();
//     const isAdmin = useSelector(state => state.auth.isAdmin);
//     const [showModal, setShowModal] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [userCount, setUserCount] = useState(0);

//     const handleUsersList = async () => {
//         try {
//             const { users, count } = await getUsersAPI();

//             // Sort users: admins first, then others
//             const sortedUsers = users.sort((a, b) => {
//                 if (a.userType === "admin" && b.userType !== "admin") {
//                     return -1;
//                 } else if (a.userType !== "admin" && b.userType === "admin") {
//                     return 1;
//                 }
//                 return 0;
//             });

//             setUsers(sortedUsers);
//             setUserCount(count);
//             setShowModal(true);
//         } catch (error) {
//             console.error('Failed to fetch users:', error);
//         }
//     };

//     const handleCryptoClick = () => {
//         navigate('/crypto-coins');
//     };

//     const handleWeatherClick = () => {
//         navigate('/weather');
//     };

//     const handleClose = () => setShowModal(false);

//     return (
//         <>
//             <NavBar />
//             <section className="container mt-4">
//                 <h1>Welcome to the <span>{isAdmin ? "Admin" : "User"}</span> Dashboard</h1>
//                 <div className="d-flex justify-content-around mt-4">
//                     {isAdmin && (
//                         <Card style={{ width: '18rem' }}>
//                             <Card.Body>
//                                 <Card.Title>List Of Users</Card.Title>
//                                 <Card.Text>
//                                     View the Users List.
//                                 </Card.Text>
//                                 <Button variant="primary" onClick={handleUsersList}>Users List</Button>
//                             </Card.Body>
//                         </Card>
//                     )}
//                     <Card style={{ width: '18rem' }}>
//                         <Card.Body>
//                             <Card.Title>Cryptocurrency Coins</Card.Title>
//                             <Card.Text>
//                                 View the latest cryptocurrency data.
//                             </Card.Text>
//                             <Button variant="primary" onClick={handleCryptoClick}>Go to Cryptocurrency Coins</Button>
//                         </Card.Body>
//                     </Card>

//                     <Card style={{ width: '18rem' }}>
//                         <Card.Body>
//                             <Card.Title>Weather Data</Card.Title>
//                             <Card.Text>
//                                 Check the current weather in your location.
//                             </Card.Text>
//                             <Button variant="primary" onClick={handleWeatherClick}>Show Weather Data</Button>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             </section>

//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Users List</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Total Users: {userCount}</p>
//                     <Table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th>Username</th>
//                                 <th>User Type</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr key={index}>
//                                     <td>{user.f_userName}</td>
//                                     <td>{user.userType}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default UserDashboard;


import React, { useState } from 'react';
import { Card, Button, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import { getUsersAPI } from '../services/allAPI';
// import './UserDashboard.css';  // Add a separate CSS file for custom styling

function UserDashboard() {
    const navigate = useNavigate();
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const [showModal, setShowModal] = useState(false);
    const [adminUsers, setAdminUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const handleUsersList = async () => {
        try {
            const { users, count } = await getUsersAPI();

            const admins = users.filter(user => user.userType === "admin");
            const regulars = users.filter(user => user.userType !== "admin");

            setAdminUsers(admins);
            setRegularUsers(regulars);
            setTotalAdmins(admins.length);
            setTotalUsers(regulars.length);
            setTotalCount(count);
            setShowModal(true);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleCryptoClick = () => {
        navigate('/crypto-coins');
    };

    const handleWeatherClick = () => {
        navigate('/weather');
    };

    const handleClose = () => setShowModal(false);

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

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Users List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Total Users:</strong> {totalCount}</p>
                    <p><strong>Total Admins:</strong> {totalAdmins}</p>
                    <p><strong>Total Regular Users:</strong> {totalUsers}</p>

                    <h5>Admins</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.f_userName}</td>
                                    <td>{user.userType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h5>Users</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regularUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.f_userName}</td>
                                    <td>{user.userType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserDashboard;

