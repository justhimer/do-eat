const controllerName = "file";

interface Photo {
    filepath: string;  // filename.jpeg
    webviewPath?: string;  // base64 format
}

interface UploadedPhoto {
    filenName: string,
    accessPath: string
}

export async function uploadPhoto(photo: Photo) {

    if (photo) {

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/${controllerName}/photo`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ file: photo })
        })

        const result: UploadedPhoto = await res.json();
        if (res.ok) {
            return result;
        }
        else {
            throw new Error;
        }

    }
}
