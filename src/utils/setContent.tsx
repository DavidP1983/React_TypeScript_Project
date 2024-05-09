import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";
import { TStatusOptions } from "../hooks/http.hook";

const setContent = (process: TStatusOptions, component: JSX.Element[]) => {
    switch(process) {
        case "loading":
            return <Spinner/>
        case "idle":
            return component.length !== 0 ? component : <div style={{position: "absolute", inset: "0 18%", fontWeight: 900}}>No appointments found at this request</div>
        case "error":
            return <Error/>
        default:
           throw new ReferenceError(`Unexpected process state`);
    }

}

export default setContent;