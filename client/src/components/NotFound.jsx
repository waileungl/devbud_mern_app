import {
    Link
} from "react-router-dom";

const NotFound = () => {
    return (
        <>
        404 not found
        <Link to={'/'}>Back to create Room Page</Link>
        </>
    );
};

export default NotFound;