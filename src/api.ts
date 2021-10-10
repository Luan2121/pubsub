import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
    timeout: 30000
});

export interface ClientConfig extends AxiosRequestConfig {
    token ?: string
}   

export type TClientFunction = ( endpoint: string , config: ClientConfig  ) => Promise<any>

const client = (
    endpoint : string, 
    { data , token, headers : customHeaders, ...customConfig } : ClientConfig
) => {
    return api({
        ...customConfig,
        url: endpoint,
        data,
        headers: {
            ...customHeaders
        }
    })
    .then( async (response : any) => {
        if(response.status === 401) {
            return Promise.reject({})
        }
        const data = response.data;
        //TODO: validate response ok
        return data;
    })
}

export { client };