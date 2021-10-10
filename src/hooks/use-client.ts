import { useCallback } from "react";
import { client, ClientConfig } from "../api";

const useClient = () => {
    return useCallback(
        (endpoint : string,config : ClientConfig  ) => client(endpoint, { ...config }),
        []
    );
}

export { useClient }