import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { useBackgroundVideo } from '../../context/BackgroundVideoContext';
import styles from './BackgroundVideo.module.css';

export default function BackgroundVideo({
  src = '/364463.mp4',
  poster = '',
  showControls = true,
}) {
  const internalRef = useRef(null);
  const {
    isLoaded,
    isPlaying,
    isMuted,
    progress,
    togglePlay,
    toggleMute,
    setVideoRef,
  } = useBackgroundVideo();

  useEffect(() => {
    const video = internalRef.current;
    if (!video) return;

    setVideoRef(video);

    // Initial autoplay attempt
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay waiting for interaction:', err);
      });
    }
  }, [src, setVideoRef]);

  return (
    <>
      <div className={styles.videoWrapper} aria-hidden="true">
        {/* Ambient Fixed Background Video */}
        <video
          ref={internalRef}
          className={`${styles.video} ${isLoaded ? styles.videoLoaded : ''}`}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
        />

        {/* Cinematic Vignette & Deep Atmospheric Color Overlays */}
        <div className={styles.vignetteOverlay} />
        <div className={styles.ambientGlow} />
        <div className={styles.meshOverlay} />
        <div className={styles.shimmerEffect} />
      </div>

      {/* Discreet Luxury Video Controls */}
      {showControls && (
        <aside aria-label="Background Video Controls" className={styles.videoControls}>
          <div className={styles.controlsLeft}>
            <span className={`${styles.statusDot} ${isPlaying ? styles.statusActive : ''}`} />
            <span className={styles.controlLabel}>
              <Sparkles size={11} className={styles.sparkleIcon} />
              <span>Syrena 3D Reel</span>
            </span>
          </div>

          <div className={styles.controlProgressTrack}>
            <div
              className={styles.controlProgressFill}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>

          <div className={styles.controlsRight}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={togglePlay}
              title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
              aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
              data-hover
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={toggleMute}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              data-hover
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
