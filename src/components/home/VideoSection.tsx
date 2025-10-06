import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const VideoSectionContainer = styled.section`
  width: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const VideoWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const VideoTitle = styled.h2`
  font-family: "Outfit", sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VideoSubtitle = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-size: 1.2rem;
  color: #b8b8b8;
  text-align: center;
  margin: 0;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoOverlay = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.6)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const PlayButton = styled.button<{ isPlaying: boolean }>`
  background: ${props => props.isPlaying ? 'transparent' : 'rgba(255, 255, 255, 0.9)'};
  border: none;
  border-radius: 50%;
  width: ${props => props.isPlaying ? '0' : '80px'};
  height: ${props => props.isPlaying ? '0' : '80px'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.isPlaying ? '0' : '1'};
  pointer-events: ${props => props.isPlaying ? 'none' : 'auto'};
  
  &:hover {
    transform: scale(1.1);
    background: ${props => props.isPlaying ? 'transparent' : '#fff'};
  }
  
  @media (max-width: 768px) {
    width: ${props => props.isPlaying ? '0' : '60px'};
    height: ${props => props.isPlaying ? '0' : '60px'};
  }
`;

const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid #333;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
  
  @media (max-width: 768px) {
    border-left: 15px solid #333;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
  }
`;

const VideoControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.7);
  padding: 12px 16px;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #ff611d;
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #ff611d;
  border-radius: 2px;
  transition: width 0.1s ease;
`;

const TimeDisplay = styled.span`
  color: white;
  font-size: 14px;
  font-family: "Rethink Sans", sans-serif;
`;

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <VideoSectionContainer>
      <VideoWrapper>
        <VideoTitle>¡Mira la Acción en Vivo!</VideoTitle>
        <VideoSubtitle>
          Disfruta de los mejores momentos de la Liga Argento en este increíble video
        </VideoSubtitle>
        
        <VideoContainer
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <Video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster="/images/video-poster.jpg"
          >
            {/* Video de ejemplo - puedes reemplazar con tu propio video */}
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </Video>
          
          <VideoOverlay isPlaying={isPlaying} onClick={handlePlayPause}>
            <PlayButton isPlaying={isPlaying}>
              <PlayIcon />
            </PlayButton>
          </VideoOverlay>
          
          <VideoControls style={{ opacity: showControls ? 1 : 0 }}>
            <ControlButton onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </ControlButton>
            <ProgressBar onClick={handleProgressClick}>
              <ProgressFill progress={duration > 0 ? (currentTime / duration) * 100 : 0} />
            </ProgressBar>
            <TimeDisplay>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeDisplay>
          </VideoControls>
        </VideoContainer>
      </VideoWrapper>
    </VideoSectionContainer>
  );
};
