import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usn: '',
    branch: '',
    section: '',
    email: '',
    phone: ''
  });

  const branches = ['Biotechnology','Civil Engineering','Construction Technology and Management',
    'Computer Science and Engineering','Computer Science and Engineering(AI & ML)',
    'Computer Science and Business System','Electronics and Communication Engineering',
    'Information Science and Engineering','Mechanical Engineering','Bachelor of Computer Applications',
    'Bachelor of Business Administration','other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
  e.preventDefault();

  // Regex to match 10 digits OR 12 digits starting with 91
  const phoneRegex = /^(91)?[0-9]{10}$/;

  if (!phoneRegex.test(formData.phone)) {
    alert('Please enter a valid 10-digit or 12-digit phone number (starting with 91).');
    return; // Stop the submission if the phone number is invalid
  }

  // Basic validation for other fields
  if (Object.values(formData).some(value => value.trim() === '')) {
    alert('Please fill in all fields');
    return;
  }
  
  onLogin(formData);
};

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Student Portal</h1>
         
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>USN</label>
              <input
                type="text"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                placeholder="University Seat Number"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Section (e.g., A, B, C)"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@gmail.com"
                required
              />
            </div>
          </div>


          <div className="form-group full-width">
  <label>Phone Number</label>
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    placeholder="10-digit or 12-digit (with 91) number"
    required
    pattern="^(91)?[0-9]{10}$" // ✅ Add this for instant validation
    title="Please enter a valid 10 or 12-digit number" // ✅ Add this for a helpful message
  />
</div>

          <button type="submit" className="btn btn-primary login-btn">
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;