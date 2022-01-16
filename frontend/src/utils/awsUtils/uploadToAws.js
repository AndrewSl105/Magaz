import { ACCESS_KEY, REGION, S3_BUCKET, SECRET_ACCESS_KEY } from "src/constants/awsConstants";
import { uploadFile }  from 'react-s3';

 const config = {
        bucketName: S3_BUCKET,
        region: REGION,
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    }

export const uploadToAws = async (file) => {

    return await uploadFile(file, config).then(result => result) || null;
}
