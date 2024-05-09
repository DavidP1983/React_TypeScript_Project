import { useState, useCallback } from "react";

 type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE";
 export type TStatusOptions = "idle" | "loading" | "error";

 interface HTTPHeaders {
    [content:string]: string;
 }
// type HTTPHeaders = Record<string, string>

 export interface RequestConfig {
    url: string;
    method?: HTTPRequestMethods;
    body?: string | null;
    headers?: HTTPHeaders;
 };

export const useHttp = () => {

    const [process, setProcess] = useState<TStatusOptions>("idle");

    const request = useCallback(async ({url, method = "GET", body = null, headers={'Content-Type': 'application/json'}}: RequestConfig) => {
        setProcess("loading");


        try {
            const response = await fetch(url, {method, body, headers});
            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            setProcess("idle");
            return data;
        }catch(e) {
            if(e instanceof Error) {
                setProcess("error");
                throw e;
            }
        }

    }, []);

        // const clearError = useCallback(() => {
        //     setProcess("loading");
        // },[])

        return {process, request, setProcess}
        // return [process, request] as const;
}

