import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { nanoid } from "nanoid";
import { getFileExtension, getFullS3Uri } from "~/utils/utils";
import { toast } from "react-toastify";
import AWS from "aws-sdk";
// uploader
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const s3 = new AWS.S3();

const VideoUploader = ({
  uploading, // State to set uploading status of parent element
  setUploading,
  sendVideoURL, // This state is passed to parent and sent at there.
}: {
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  sendVideoURL: (data: string) => void;
}) => {
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [videoKey, setVideoKey] = useState<number>(0);

  async function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const video = event.target.files?.[0];
    if (video) {
      setUploading(true);
      const fileName = `${nanoid()}.${getFileExtension(video.name)}`;
      const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        Key: `intro_video/${fileName}`,
        Body: video,
        ContentType: video.type,
      };
      console.log(uploadParams);
      try {
        const uploadResponse = await s3.upload(uploadParams).promise();
        setVideoFile(video);
        setVideoKey(videoKey + 1);
        sendVideoURL(uploadResponse.Location);
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  }

  return (
    <>
      <Box className="my-4">
        <input
          type="file"
          accept="video/mp4, video/webm"
          hidden
          ref={videoInputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            changeHandler(e);
          }}
        />
        <LoadingButton
          className="mx-auto flex"
          onClick={() => videoInputRef.current?.click()}
          loading={uploading}
          loadingPosition="start"
          startIcon={<CloudUploadIcon />}
          variant="outlined"
          size="large"
        >
          {uploading || !videoFile ? (
            uploading ? (
              <span>Uploading</span>
            ) : (
              <span>Upload Video</span>
            )
          ) : (
            <span>Change Video</span>
          )}
        </LoadingButton>
        <div className="w-full p-8" hidden={!videoFile}>
          <video key={videoKey} controls className="h-auto w-full">
            {videoFile && (
              <source
                src={URL.createObjectURL(videoFile)}
                type={videoFile?.type}
              />
            )}
          </video>
        </div>
      </Box>
    </>
  );
};

export default VideoUploader;
