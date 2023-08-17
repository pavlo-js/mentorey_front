"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { nanoid } from "nanoid";
import { getFileExtension } from "~/utils/utils";
import { toast } from "react-toastify";

const VideoUploader = ({
  uploading,
  setUploading,
  sendVideoName,
}: {
  uploading: boolean;
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;
  sendVideoName: (data: string) => void;
}) => {
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  // const [uploading, setUploading] = useState<boolean>(false);
  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);
  const [videoKey, setVideoKey] = useState<number>(0);
  const [videoName, setVideoName] = useState<string>("");

  // useEffect(() => {
  // 	console.log(videoFile && URL.createObjectURL(videoFile));
  // }, [videoFile]);

  function getVideo() {
    videoInputRef.current?.click();
  }

  function uploadVideo(event: React.ChangeEvent<HTMLInputElement>) {
    const video = event.target.files?.[0];
    if (video) {
      setUploading(true);
      // Storage.remove(videoName, { level: "public" });
      // Storage.put(nanoid() + "." + getFileExtension(video.name), video, {
      //   level: "public",
      // })
      //   .then((res) => {
      //     setVideoFile(video);
      //     setVideoKey(videoKey + 1);
      //     setUploading(false);
      //     sendVideoName(res.key);
      //     setVideoName(res.key);
      //     toast.success("Video is uploaded successfully", {
      //       position: toast.POSITION.BOTTOM_RIGHT,
      //     });
      //   })
      //   .catch((err) => {
      //     toast.error("Network error! Please try again.", {
      //       position: toast.POSITION.BOTTOM_RIGHT,
      //     });
      //     console.log(err);
      //   });
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
            uploadVideo(e);
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
