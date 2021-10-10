import { useMutation } from "react-query";
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

export { useMutateTopic };