import React from "react";

const VideoPlayer: React.FC = () => {
  return (
    <>
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="rounded-lg"
        controls
      ></video>
    </>
  );
};

export default VideoPlayer;
