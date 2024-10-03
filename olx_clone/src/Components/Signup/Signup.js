import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const firestore = getFirestore(); // Initialize Firestore
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    try {
      // Create user with email and password in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with the username
      await updateProfile(userCredential.user, { displayName: username });

      // After successful user creation, add user data to Firestore 'users' collection
      await addDoc(collection(firestore, 'users'), {
        userId: userCredential.user.uid,
        username,
        email,
        phone,
      });

      console.log('User created and data added to Firestore successfully');
      alert('Signup successful!');

    } catch (error) {
      console.error("Error creating user:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Signup Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
