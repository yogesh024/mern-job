import React, { useContext, useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { Context } from '../main';

export const Apply = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [resume, setResume] = useState(null);

    const { token, isLoggedIn } = useAuth();
    const {isAuthroized,user}=useContext(Context);
    const navigateTo = useNavigate();

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };
    const {id}=useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('coverLetter', coverLetter);
        formData.append('resume', resume);
        formData.append('phone', phone);
        formData.append('jobId', id); // Example jobId, replace with actual jobId

        try {
            const { data } = await axios.post("http://localhost:3002/api/apply/jobseeker/post", formData, {
                withCredentials: true,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            });

            setName('');
            setEmail('');
            setPhone('');
            setCoverLetter('');
            setAddress('');
            setResume(null);
            toast.success(data.message);
            navigateTo('/');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit application");
        }
    };


    if (!isAuthroized || (user && user.isRecurter === true)) {
        navigateTo('');
    }

    return (
        <section className='application bg-cover bg-center flex justify-center items-center shadow-lg'>
            <div className='container'>
                <h4 className='text-3xl mb-4'>Application Form</h4>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <HiOutlineMail className='inline-block mr-2' />
                            Your email
                        </label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <HiOutlineUser className='inline-block mr-2' />
                            Your Name
                        </label>
                        <input
                            type='text'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <HiOutlinePhone className='inline-block mr-2' />
                            Your Phone Number
                        </label>
                        <input
                            type='text'
                            placeholder='Enter your phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <HiOutlineLocationMarker className='inline-block mr-2' />
                             Your Address
                        </label>
                        <input
                            type='text'
                            placeholder='Enter your phone number'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <label htmlFor="coverLetter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Cover Letter
                    </label>
                    <textarea
                        name='coverLetter'
                        placeholder='Write your cover letter'
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    ></textarea>
                    <div className='mb-4'>
                        <label className='block text-lg mb-1'>
                            Select Resume
                        </label>
                        <input
                            type='file'
                            accept='.jpg, .png, .webp'
                            onChange={handleFileChange}
                            className='input-field'
                        />
                    </div>
                    <button
                        type="submit"
                        className='text-sm bg-dark-blue text-wht font-semibold px-8 py-2 ml-2 rounded-md md:rounded-l-md md:rounded-r-md'
                    >
                        Send Application
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Apply;
