import { useMutation } from "react-query";
import { useClient } from "./use-client";

type PublishMutationParams = {
    title: string,
    description: string,
    topic: string,
    images: string[]
}

const usePublish = () => {
    const client = useClient();
    return useMutation(
        ({ title, description, topic, images } : PublishMutationParams ) => {
            return client(`/api/topics/${topic}/publish`, {
                method: 'POST',
                data: {
                    title,
                    description,
                    images,
                    topic
                }
            });
        }
    )
}

export { usePublish };