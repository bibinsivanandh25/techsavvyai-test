import { useState } from 'react';
import { MdOutlineZoomInMap, MdOutlineZoomOutMap } from 'react-icons/md';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to request fullscreen mode
  const requestFullscreen = () => {
    const docElement = document.documentElement;

    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if (docElement.mozRequestFullScreen) {
      // Firefox
      docElement.mozRequestFullScreen();
    } else if (docElement.webkitRequestFullscreen) {
      // Chrome, Safari
      docElement.webkitRequestFullscreen();
    } else if (docElement.msRequestFullscreen) {
      // IE/Edge
      docElement.msRequestFullscreen();
    }

    setIsFullscreen(true);
  };

  // Function to exit fullscreen mode
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }

    setIsFullscreen(false);
  };

  // Toggle between entering and exiting fullscreen based on current state
  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
  };

  return (
    <button onClick={toggleFullscreen}>
      {isFullscreen ? (
        <MdOutlineZoomInMap className="text-[#3E4D66] text-xl" />
      ) : (
        <MdOutlineZoomOutMap className="text-[#3E4D66] text-xl" />
      )}
    </button>
  );
};

export default FullscreenButton;
