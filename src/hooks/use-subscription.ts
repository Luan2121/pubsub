import { useMutation } from "react-query"
import { useClient } from "./use-client";

type MutateSubscripcionParams = {
    subscriptionName : string,
    topic: string
}

const useSubscription = () => {
    const client = useClient();
    return useMutation(
        async ( { subscriptionName, topic } : MutateSubscripcionParams ) => {
            await client(`/api/topics/${topic}/subscribe`, {
                method: 'POST',
                data: {
                    subscriptionName
                }
            });
            localStorage.setItem("subscriptionName",subscriptionName);
        }
    );
}

export { useSubscription };