import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { getUsersAPI } from '../services/allAPI';

function UserList() {
    const [adminUsers, setAdminUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { users, count } = await getUsersAPI();

                const admins = users.filter(user => user.userType === "admin");
                const regulars = users.filter(user => user.userType !== "admin");

                setAdminUsers(admins);
                setRegularUsers(regulars);
                setTotalAdmins(admins.length);
                setTotalUsers(regulars.length);
                setTotalCount(count);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <NavBar />
            <section className="user-list-container">
                <Container>
                    <Row className="text-center my-4">
                        <Col>
                            <h1 className='text-primary'><i class="fa-solid fa-people-group fa-fade">&nbsp; User List</i> </h1>

                            <p><strong>Total Users:</strong> {totalCount}</p>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className='d-flex justify-content-between'>
                                <h5>Admins</h5>
                                <p><strong>Total Admins:</strong> {totalAdmins}</p>
                            </div>
                            <Table striped bordered hover responsive className="mb-4">
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
                        </Col>
                        <Col md={6}>
                           <div className='d-flex justify-content-between'>
                                <h5>Users</h5>
                                <p><strong>Total Regular Users:</strong> {totalUsers}</p>
                                </div>
                            <Table striped bordered hover responsive>
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
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default UserList;
