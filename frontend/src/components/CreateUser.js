import React, { useState } from 'react';
import { createUser } from '../api/api';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast

function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                contactnumber: contactNumber,
                password,
            };

            await createUser(newUser);
            toast.success('User created successfully!'); // Success toast
            setFirstName('');
            setLastName('');
            setEmail('');
            setContactNumber('');
            setPassword('');

            // Redirect to home after 2 seconds
                navigate('/'); 
        } catch (error) {
            toast.error('Error creating user. Please check your input and try again.'); // Error toast
        }
    };

    return (
        <div className="create-user-container">
            <h1>Create a New User</h1>
            <div>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleCreateUser}>Create User</button>
            </div>
        </div>
    );
}

export default CreateUser;
