import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";
import { TStatusOptions } from "../hooks/http.hook";

const setContent = (process: TStatusOptions, component: JSX.Element[]) => {
    switch(process) {
        case "loading":
            return <Spinner/>
        case "idle":
            return component
        case "error":
            return <Error/>
        default:
           throw new ReferenceError(`Unexpected process state`);
    }

}

export default setContent;