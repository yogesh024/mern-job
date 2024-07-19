import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { HiShoppingBag } from "react-icons/hi";
import { VscGitStashApply } from "react-icons/vsc";
import { Context } from '../main';
import axios from 'axios';

export const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const navigateTo=useNavigate();
    const {isAuthrozied,user}=useContext(Context);
    const handleApply = async () => {
        navigateTo('/apply')
        // const { value: url } = await Swal.fire({
        //     input: "url",
        //     inputLabel: "Resume Link",
        //     inputPlaceholder: "Enter the URL"
        // });
        // if (url) {
        //     Swal.fire(`Entered URL: ${url}`);
        // }
    }

    console.log("idddd",id);
    useEffect(() => {
       try {
        axios.get(`http://localhost:3002/api/getjobs/${id}`,{withCredentials:true})
          .then((res) => {
            setJob(res.data.job)
        });
       } catch (error) {
        console.log(error);
       }
         
      }, []);
    //   if(!isAuthrozied){
    //     navigateTo('/login')
    //   }
     
        console.log(job);
        console.log("usersfdmhf",user.isRecruiter)
        console.log("aaaaaaaaaaf",isAuthrozied)
        console.log("job details",job.description);

    

    return (
        <div className='max-w-screen-2xl container mx-auto  xl:px-24 px-4'>
            <div className='mt-10'>
            <h1 className=' text-center p-4 text-4xl text-blue'>Single Job</h1>
            <h2 className='text-center  p-4 text-xl'>Home/jobs</h2>
            </div>
            <div className='mt-10 '>
            <h1 className='text-lg font-bold'>Job id: {id}</h1>

            <h2 className='text-lg font-bold text-blue'>JobDetails: </h2>
            <p>{job.description}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque, veniam quasi molestiae nihil culpa saepe. Repellendus minima illo, atque laudantium necessitatibus cumque porro ipsa labore at nobis harum quas?</p> */}
            </div>

            <div className='mt-5'>
            <h1 className='text-blue ml-3 mb-1 text-lg flex'></h1>
            <button  className='text-sm bg-blue text-wht font-semibold px-8 py-2 ml-2 rounded-md md:rounded-l-md md:rounded-r-md mb-'> <HiShoppingBag />Job Type {job.employmentType}</button>
            <p>
                {
                     user && user.isRecruiter ? (
                        <></>
                    ) : (
                        <Link to={`/apply/${job._id}`}>
                            <button onClick={handleApply} className='text-sm bg-dark-blue text-wht font-semibold px-8 py-2 ml-2 rounded-md md:rounded-l-md md:rounded-r-md'>
                                <VscGitStashApply /> Apply now
                            </button>
                        </Link>
                    )
                }
            </p>
            
            
            </div>
           

            <div className="footer mt-20">
                <div className="w-full max-w-screen-lg text-xs">
                    <div className="w-full flex justify-between mb-12 ml-12 fLists text-blue text-sm ">
                        <ul className="list-none p-0 fList mr-10">
                            <h4 className='text-lg font-bold'>Benefits</h4>
                            <li className="fListItem">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quisquam sunt dolorum ad amet atque quasi nisi numquam vitae temporibus quibusdam officia architecto enim vero ut alias debitis, inventore accusantium!</li>
                            <li className="fListItem">Regions</li>
                            <li className="fListItem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, neque! Praesentium perferendis quos magni dolorum error vitae ipsam nemo voluptatum minus, consectetur repudiandae fugit quidem earum dolores debitis quisquam et.</li>

                        </ul>
                        <ul className="list-none p-0 fList ml-10">
                            <h4 className='text-lg font-bold'>Outline</h4>
                            <li className="fListItem">Unique Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptates sunt, asperiores doloremque magni harum cupiditate dolor illum vero vitae dolorum impedit consequatur ex laborum nobis accusamus nemo quod expedita. to stay</li>
                            <li className="fListItem">Reviews</li>
                            <li className="fListItem">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae a nulla cum ab obcaecati quidem, dolor libero voluptate praesentium labore dolorum voluptatem, minus voluptatum quo, nobis nesciunt excepturi rerum doloribus.</li>
                        </ul>
                        <ul className="list-none p-0 fList ml-12">
                            <h4 className='text-lg font-bold'>Future Growth</h4>
                            <li className="fListItem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ut. Tenetur provident quibusdam neque exercitationem quas unde libero qui minus fugit. Obcaecati, accusantium adipisci sunt rem sit nemo natus cumque!</li>
                            <li className="fListItem">Apartments</li>
                            <li className="fListItem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, dolorum? Corrupti nam ducimus sint quod maxime voluptatem rerum aut harum aperiam aliquid, alias quidem vero repudiandae molestias voluptatum ullam velit.</li>

                        </ul>
                        {/* Add more lists as needed */}
                    </div>
                    {/* <div className="w-full flex justify-between mb-12 ml-12 fLists text-blue text-sm">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, reiciendis corrupti. Sapiente, quam eius excepturi consequuntur dolorum minima magnam. Explicabo aspernatur officia, debitis adipisci eligendi rem rerum eius beatae esse.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit aut voluptatem autem doloremque laudantium earum enim animi dolorem id nostrum dolores ex, quos, doloribus corrupti ab reprehenderit, sit natus perferendis.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore magni, quis, quidem provident quasi fugiat cupiditate laudantium facere reprehenderit obcaecati fuga ad assumenda, vitae eius sed labore rem animi laboriosam.</p>
                    </div> */}
                </div>
            </div>
            
            
        </div>
      )
}
