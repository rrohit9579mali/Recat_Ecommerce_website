import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const navLocation = () => {
        return new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
      };
      
      const latlong = await navLocation().then(res => {
        const latitude = res.coords.latitude;
        const longitude = res.coords.longitude;
        return { lat: latitude, long: longitude };
      });
      
      const response = await fetch("http://localhost:5000/api/user", { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(latlong)
      });
      
      if (!response.ok) throw new Error("Failed to fetch location");

      const { location } = await response.json();
      setAddress(location);
      setCredentials({ ...credentials, geolocation: location });
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Could not fetch location. Please check the API endpoint and your network connection.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          geolocation: credentials.geolocation
        })
      });
      
      if (!response.ok) throw new Error("Failed to register user");

      let json;
      try {
        json = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON response:", error);
        alert("Unexpected response format from server.");
        return;
      }

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate("/login");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name='address' placeholder='Click below to fetch address' value={address} readOnly />
          </div> 
          <div className="m-3"> 
            <button type="button" onClick={handleClick} className="btn btn-success">Click for current Location</button>
          </div> 
          <div className="m-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' required />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
}
