import React, { useContext, useEffect, useState } from 'react';
// import { useAuth } from '../components/context/AuthContext';
import axios from 'axios';
import { Context } from '../main';
import toast from 'react-hot-toast';

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'tailwindcss/tailwind.css';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaGlobe } from 'react-icons/fa';

const Profile = () => {
  // const { token } = useAuth();

  const {isAuthroized,user}=useContext(Context);

 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const [bio, setBio] = useState({
    jobTitle: 'Full Stack Developer',
    location: 'Bay Area, San Francisco, CA',
    avatar: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp',

  });
  const [links, setLinks] = useState({
    website: 'https://mdbootstrap.com',
    github: ' upload github Link',
    twitter: 'upload Twitter Link',
    instagram: 'upload instaGram Link',
    facebook: 'upload faceBook Link'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const id = user._id;
  //console.log(id);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/profile/${id}`);
      setProfile(response.data);
      console.log(response.data);
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

const handleChange = (e) => {
  const { name, value } = e.target;
  setLinks(prevLinks => ({
    ...prevLinks,
    [name]: value
  }));
};

const handleSave = () => {
  try {
    localStorage.setItem('socialMediaLinks', JSON.stringify(links));
    toast.success('Changes saved successfully!');
    setIsEditing(false); // Exit edit mode after saving
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const handleEdit = () => {
  setIsEditing(true);
};
  return (
    <section className="bg-custom-gray-light">
    <div className="container mx-auto py-5">
      <div className="mb-4">
        <nav className="bg-custom-white rounded-3 p-3">
          <ol className="flex flex-col space-y-2">
            <li className="text-custom-gray-dark">{profile.firstName} {profile.lastName} Profile</li>
          </ol>
        </nav>
      </div>

      <div className="w-full">
      <div className="vh-100 bg-custom-gray-light">
      <div className="container py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full lg:w-1/3">
            <div className="bg-custom-white shadow rounded-lg overflow-hidden mb-4">
              <div className="text-center p-4">
                <div className="mt-3 mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-full"
                    style={{ width: '100px' }}
                    alt="Profile Avatar"
                  />
                </div>
                <h4 className="text-custom-gray-dark">Julie L. Arsenault</h4>
                <p className="text-custom-gray mb-4">
                  @Programmer <span className="mx-2">|</span> <a href="#!" className="text-custom-blue-dark">{profile.email}</a>
                </p>
                <div className="mb-4 pb-2 flex justify-center space-x-2">
                  <button className="border border-custom-gray-dark rounded-full p-2">
                    <i className="fab fa-facebook text-custom-blue-dark"></i>
                  </button>
                  <button className="border border-custom-gray-dark rounded-full p-2">
                    <i className="fab fa-twitter text-custom-blue-dark"></i>
                  </button>
                  <button className="border border-custom-gray-dark rounded-full p-2">
                    <i className="fab fa-skype text-custom-blue-dark"></i>
                  </button>
                </div>
                <button className="bg-custom-blue text-white rounded-lg py-2 px-4">
                  Message now
                </button>
                <div className="flex justify-between text-center mt-5 mb-2">
                  <div>
                    <p className="text-xl text-custom-gray-dark">Full Name</p>
                    <p className="text-sm text-custom-gray">{profile.firstName} {profile.lastName}</p>
                  </div>
                  <div className="px-3">
                    <p className="text-xl text-custom-gray-dark">eMail</p>
                    <p className="text-sm text-custom-gray">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-xl text-custom-gray-dark">UserNaMe</p>
                    <p className="text-sm text-custom-gray">{profile.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div className="bg-custom-white shadow rounded-lg overflow-hidden mb-4">
      <ul className="divide-y divide-custom-gray">
        <li className="flex justify-between items-center p-4">
          <FaGlobe className="text-custom-yellow" />
          {isEditing ? (
            <input
              type="text"
              name="website"
              value={links.website}
              onChange={handleChange}
              className="text-custom-gray-dark bg-transparent border-none"
            />
          ) : (
            
            <span className="text-custom-gray-dark">{links.website}</span>
          )}
        </li>
        <li className="flex justify-between items-center p-4">
          <FaGithub className="text-custom-gray-dark" />
          {isEditing ? (
            <input
              type="text"
              name="github"
              value={links.github}
              onChange={handleChange}
              className="text-custom-gray-dark bg-transparent border-none"
            />
          ) : (
            <span className="text-custom-gray-dark">{links.github}</span>
          )}
        </li>
        <li className="flex justify-between items-center p-4">
          <FaTwitter className="text-custom-blue" />
          {isEditing ? (
            <input
              type="text"
              name="twitter"
              value={links.twitter}
              onChange={handleChange}
              className="text-custom-gray-dark bg-transparent border-none"
            />
          ) : (
            <span className="text-custom-gray-dark">{links.twitter}</span>
          )}
        </li>
        <li className="flex justify-between items-center p-4">
          <FaInstagram className="text-custom-pink" />
          {isEditing ? (
            <input
              type="text"
              name="instagram"
              value={links.instagram}
              onChange={handleChange}
              className="text-custom-gray-dark bg-transparent border-none"
            />
          ) : (
            <span className="text-custom-gray-dark">{links.instagram}</span>
          )}
        </li>
        <li className="flex justify-between items-center p-4">
          <FaFacebook className="text-custom-blue-dark" />
          {isEditing ? (
            <input
              type="text"
              name="facebook"
              value={links.facebook}
              onChange={handleChange}
              className="text-custom-gray-dark bg-transparent border-none"
            />
          ) : (
            <span className="text-custom-gray-dark">{links.facebook}</span>
          )}
        </li>
      </ul>
      <div className="p-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-custom-blue text-white px-4 py-2 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-custom-gray-light text-custom-gray-dark px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-custom-blue text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>

       
      </div>
    </div>
  </section>
  );
};

export default Profile;




{/* <section className="vh-200 bg-gray">
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full lg:w-1/2 mb-4">
            <div className="bg-wht shadow rounded-lg overflow-hidden mb-3">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-400 to-blue text-wht text-center p-5 rounded-l-lg">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" 
                    alt="Avatar" className="my-5 w-20 mx-auto rounded-full" />
                  <h5 className="text-xl font-semibold">Marie Horwitz</h5>
                  <p className="mb-5">Web Designer</p>
                  <FaEdit className="mb-5" />
                </div>
                <div className="w-full md:w-2/3 p-4">
                  <h6 className="text-xl font-semibold">Information</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="flex flex-wrap pt-1">
                    <div className="w-full sm:w-1/2 mb-3">
                      <h6 className="text-lg font-medium">Email</h6>
                      <p className="text-gray">info@example.com</p>
                    </div>
                    <div className="w-full sm:w-1/2 mb-3">
                      <h6 className="text-lg font-medium">Phone</h6>
                      <p className="text-gray">123 456 789</p>
                    </div>
                  </div>
                  <h6 className="text-xl font-semibold">Information</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="flex flex-wrap pt-1">
                    <div className="w-full sm:w-1/2 mb-3">
                      <h6 className="text-lg font-medium">Email</h6>
                      <p className="text-gray-600">info@example.com</p>
                    </div>
                    <div className="w-full sm:w-1/2 mb-3">
                      <h6 className="text-lg font-medium">Phone</h6>
                      <p className="text-gray">123 456 789</p>
                    </div>
                  </div>
                  <div className="flex justify-start mt-4">
                    <a href="#!" className="text-dark-blue text-lg mr-3"><FaFacebook /></a>
                    <a href="#!" className="text-blue text-lg mr-3"><FaTwitter /></a>
                    <a href="#!" className="text-pink text-lg mr-3"><FaInstagram /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
