import { useMutation, useQuery } from "react-query";
import { useClient } from "./use-client";

type MutateTopicParams = {
    name : string
}

const useMutateTopic = () => {
    const client = useClient();
    return useMutation(
        (data : MutateTopicParams) => client("api/topics", {
            method: 'POST',
            data
        }) 
    );
};

const useTopics = () => {
    const client = useClient();
    return useQuery("topics", async () => {
        const data = await client("/api/topics", {
            method: 'GET'
        });
        return data.topics;
    })
}

export { useMutateTopic, useTopics };