import path from 'path'
import express from 'express'
import multer from 'multer'
import AWS from 'aws-sdk'

const uploadImages = (async (req, res) => {
  console.log(true)
})

const router = express.Router()

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
});

const multipleUpload = multer({ storage: storage }).array('file');
const upload = multer({ storage: storage }).single('file');

const BUCKET_NAME = 'shopimagescommerce';
const IAM_USER_KEY = 'AKIASET7NWTOSZKCTFGF';
const IAM_USER_SECRET = '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';


router.post('/upload').post(uploadImages)

export default router
