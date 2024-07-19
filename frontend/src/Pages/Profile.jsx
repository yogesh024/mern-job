import React, { useContext, useEffect, useState } from 'react';
// import { useAuth } from '../components/context/AuthContext';
import axios from 'axios';
import { Context } from '../main';

const Profile = () => {
  // const { token } = useAuth();

  const {isAuthroized,user}=useContext(Context);

 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const id = user._id;
  console.log(id);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/profile/${id}`);
      setProfile(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchProfile();
}, [id]);

if (error) {
  return <div className="text-red-500">Error: {error}</div>;
}

if (!profile) {
  return <div className="text-gray-500">Loading...</div>;
}


  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Hello</h1>
        {/* <h2 className="text-xl mb-2">{user.email}</h2>
        <h3 className="text-lg mb-4">This is: {id}</h3> */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Profile Data:</h4>
          <div className="space-y-4">
            <h1 className="text-xl font-semibold">Welcome, {profile.firstName} {profile.lastName}</h1>
            <p className="text-lg">Your email is: <span className="font-medium">{profile.email}</span></p>
            <p className="text-lg">Username: <span className="font-medium">{profile.userName}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
