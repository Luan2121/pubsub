import { QueryClient } from "react-query";

export const queryClientOptions = {
    defaultOptions: {
        queries: {
            keepPreviousData: true
        }
    }    
}

export const queryClient = new QueryClient({
    ...queryClientOptions
});