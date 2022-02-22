const S3 = require( "aws-sdk/clients/s3" );

const bucketName = "complect-store"
const region = "us-east-1"
const accessKeyId = "AKIA5ACQCQOIMSXR2UUY"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// UPLOAD FILE TO S3
function uploadFile( file, fileName ) {

	const uploadParams = {
    Bucket: bucketName,
    Body: file.content,
    Key: fileName,
		ContentType: file.contentType
  };

  return s3.upload( uploadParams ).promise();
}

// DOWNLOAD FILE FROM S3
function getFileStream( fileKey ) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject( downloadParams ).createReadStream();
}

module.exports = { uploadFile, getFileStream };
