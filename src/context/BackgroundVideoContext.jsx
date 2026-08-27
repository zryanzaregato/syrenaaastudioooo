import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const BackgroundVideoContext = createContext({
  videoRef: { current: null },
  isLoaded: false,
  isPlaying: true,
  isMuted: true,
  progress: 0,
  currentTime: 0,
  duration: 0,
  togglePlay: () => {},
  toggleMute: () => {},
  setVideoRef: () => {},
});

export const useBackgroundVideo = () => useContext(BackgroundVideoContext);

export function BackgroundVideoProvider({ children }) {
  const [videoElement, setVideoElement] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const setVideoRef = useCallback((el) => {
    videoRef.current = el;
    setVideoElement(el);
  }, []);

  useEffect(() => {
    const video = videoElement;
    if (!video) return;

    // Default to muted for seamless browser autoplay policy
    video.muted = isMuted;

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (video.duration) {
        setDuration(video.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    // Initial check
    if (video.readyState >= 2) {
      setIsLoaded(true);
      if (video.duration) setDuration(video.duration);
    }
    setIsPlaying(!video.paused);
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoElement]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Play error:', err);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  return (
    <BackgroundVideoContext.Provider
      value={{
        videoRef,
        isLoaded,
        isPlaying,
        isMuted,
        progress,
        currentTime,
        duration,
        togglePlay,
        toggleMute,
        setVideoRef,
      }}
    >
      {children}
    </BackgroundVideoContext.Provider>
  );
}

export default BackgroundVideoProvider;
