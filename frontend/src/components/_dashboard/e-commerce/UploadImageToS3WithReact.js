import React , {useState} from 'react';
import { uploadFile } from 'react-s3';


const S3_BUCKET ='shopimagescommerce';
const REGION ='EU (Frankfurt) eu-central-1';
const ACCESS_KEY ='AKIASET7NWTOSZKCTFGF';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const useUploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>React S3 File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default useUploadImageToS3WithReactS3;