import { useMutation } from "react-query"
import { useClient } from "./use-client";
import { FileWithPreview } from "../types";

type UseUploadParams = {
    file: FileWithPreview
}

const useUploadPhoto = () => {
    const client = useClient();
    return useMutation(
        async ({ file } : UseUploadParams ) => {
            const form = new FormData();
            form.append("file",file);
            const data = await client("/api/images", {  
                method: 'POST',
                data: form
            });
            return data;
        }
    );
}

export { useUploadPhoto };