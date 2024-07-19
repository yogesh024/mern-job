import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className='page notFound flex items-center justify-center h-screen'>
      <div className='content text-center'>
        <img 
          src="/notfound1.jpg" 
          alt="notfound" 
          className='mx-auto mb-4'
        />
        <Link to='/' className='text-blue-500 hover:underline'>
          Return to Home
        </Link>
      </div>
    </section>
  );
};
