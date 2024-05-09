import {useNavigate} from "react-router-dom";
import Page404NotFound from "../../components/error/404";

import "./404.scss";

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div style={{marginTop: 110, position: "relative"}}>
            <Page404NotFound/>
            <div style={{position: "absolute", inset: "246px 0px"}}>
                <p style={{textAlign: "center", fontWeight: "bold", fontSize: 24,}}>Page doesn't exist</p>
                {/* <Link to="/" style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 30}}>Back to main page</Link> */}
                <button onClick={() => navigate(-1)} className="btn">Back to main page</button>
            </div>
        </div>
    )
};

export default Page404;