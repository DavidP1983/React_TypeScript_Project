import {useNavigate} from "react-router-dom";
import Error from "../../components/error/Error";

import "./404.scss";

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Error/>
            <p style={{textAlign: "center", fontWeight: "bold", fontSize: 24,}}>Page doesn't exist</p>
            {/* <Link to="/" style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 30}}>Back to main page</Link> */}
            <button onClick={() => navigate(-1)} className="btn">Back to main page</button>

        </div>
    )
};

export default Page404;