import { Link } from "react-router-dom";
import Typed from 'react-typed';
import Navbar2 from '../components/Navbar2';

const NotFound = () => {
    return (
        <>
            <Navbar2 />
            <div className="h-[70vh] flex items-center justify-center flex-col">
                <h2 className="md:text-5xl sm:text-4xl text-lg font-bold text-grey-400 md:pl-4 pl-2 my-10">Oops!</h2>
                <Typed
                    className='md:text-5xl sm:text-4xl text-lg font-bold text-red-400 md:pl-4 pl-2'
                    strings={['404 Not Found']}
                    typeSpeed={70}
                    backSpeed={70}
                    loop
                />
                <Link to='/'>
                    <button className='w-[200px] rounded-md font-medium my-10 mx-auto py-3 text-white border bg-black hover:bg-white hover:text-black hover:border-black '>
                        Back Home
                    </button>
                </Link>
            </div>
        </>
    );
};

export default NotFound;