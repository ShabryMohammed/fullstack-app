import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/api';
import '../styles/homestyle.css'; 
import { toast } from 'react-toastify'; // Import toast

function Home() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            let errorMessage = 'Error fetching users.';
            if (error.response) {
                errorMessage = `Error: ${error.response.status} - ${error.response.data.message || error.response.data}`;
            } else if (error.request) {
                errorMessage = 'Error: No response from server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }

            console.error('Error fetching users:', error);
            setError(errorMessage);
            toast.error(errorMessage); // Display error toast
        }
    };

    return (
        <div className="user-table-container">
            <h1>All Users</h1>
            {error && <p className="error-message">{error}</p>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.contactnumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
