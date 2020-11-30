import axios from "axios";

export const postImage = async (path,imgFile) => {
    let data = new FormData();
    data.append("file", imgFile)

    return await axios({
            method: "POST",
            url: `/api/imageupload/${path}`,
            data: data,
            config: {headers: {"Content-Type": "multipart/form-data"}}
        }
    )
}