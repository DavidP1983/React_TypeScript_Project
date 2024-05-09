import { useState, useLayoutEffect, ReactNode } from "react";
import {createPortal} from 'react-dom';

interface IPortal {
    children: ReactNode;
    wrapperId?: string;
}

function createWrapperAndAppendToBody(wrapperId: string) {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", wrapperId);
    document.body.appendChild(newElement);

    return newElement;
}

const Portal = ({children, wrapperId = "portal-wrapper"}: IPortal) => {

    const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {

        let element = document.getElementById(wrapperId);
        let created = false;

        if(!element) {
            created = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }

        setWrapper(element);

        return () => {
            if(created) {
                element?.remove();
            }
        }
    
    },[wrapperId]);

    if(wrapper === null) return null;

    return createPortal(children, wrapper);
}

export default Portal;