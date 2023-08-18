import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { nanoid } from "nanoid";
import { getFileExtension, getFullS3Uri } from "~/utils/utils";
import { toast } from "react-toastify";
// uploader
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const S3_Client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: "AKIA3WFV2SULDNNESNDC",
    secretAccessKey: "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",
  },
});

const VideoUploader = ({
  uploading, // State to set uploading status of parent element
  setUploading,
  sendVideoName, // This state is passed to parent and sent at there.
}: {
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  sendVideoName: (data: string) => void;
}) => {
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [videoKey, setVideoKey] = useState<number>(0);
  const [videoName, setVideoName] = useState<string>("");

  function getVideo() {
    videoInputRef.current?.click();
  }

  function uploadNewVideo(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("newVideo");
    const video = event.target.files?.[0];
    if (video) {
      const fileName = `${nanoid()}.${getFileExtension(video.name)}`;
      setUploading(true);
      const command = new PutObjectCommand({
        Bucket: "mentorey",
        Key: `intro_video/${fileName}`,
        Body: video,
      });

      S3_Client.send(command)
        .then(() => {
          setVideoFile(video);
          setVideoKey(videoKey + 1);
          setVideoName(fileName);
          sendVideoName(`intro_video/${fileName}`);
          toast.success("Video is uploaded successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((err) => {
          console.error("uploadError: ", err);
          toast.error("Something went wrong. Please try again", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .finally(() => setUploading(false));
    }
  }

  function updateOriginalVideo(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("update");
    const command = new DeleteObjectCommand({
      Bucket: "mentorey",
      Key: `intro_video/${videoName}`,
    });
    S3_Client.send(command)
      .then((res) => {
        console.log(res);
        uploadNewVideo(event);
      })
      .catch((err) => console.error("Delete Error : ", err));
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    videoName ? updateOriginalVideo(event) : uploadNewVideo(event);
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
          onClick={getVideo}
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
