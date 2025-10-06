import styled from 'styled-components';
import { CURRENT_SEASON_COLORS } from '../../constants/season-colors';

const VideoSectionContainer = styled.section`
  width: 100%;
  background: #000000;
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

const VideoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  max-width: 600px;
`;

const VideoListItem = styled.li`
  font-family: "Rethink Sans", sans-serif;
  font-size: 1.2rem;
  color: #b8b8b8;
  margin: 8px 0;
  position: relative;
  padding-left: 20px;
  
  &::before {
    content: "•";
    color: ${CURRENT_SEASON_COLORS.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const VideoLink = styled.a`
  color: ${CURRENT_SEASON_COLORS.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${CURRENT_SEASON_COLORS.secondary};
    text-decoration: underline;
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

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
`;


export const VideoSection = () => {
  // Convertir URL de YouTube a embed
  const youtubeUrl = "https://www.youtube.com/watch?v=9KfnffkVKGU";
  const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <VideoSectionContainer>
      <VideoWrapper>
        <VideoTitle>¡Reviví el stream de presentación!</VideoTitle>
        <VideoList>
          <VideoListItem>Una nueva season ha comenzado</VideoListItem>
          <VideoListItem>Hemos conversado con los capitanes de los equipos</VideoListItem>
          <VideoListItem>Los grupos ya han sido sorteados</VideoListItem>
            <VideoListItem>
              Inaguramos el <VideoLink href="https://docs.google.com/forms/d/e/1FAIpQLSeR1m-29vdLGlg4sbqIwN5QAzqJRTFN1szx8p2hUE21CMU4Sw/viewform" target="_blank" rel="noopener noreferrer">Fantasy L'Argento</VideoLink>
            </VideoListItem>
          <VideoListItem>
            <VideoLink href="https://www.twitch.tv/ovo1de" target="_blank" rel="noopener noreferrer">
              https://www.twitch.tv/ovo1de
            </VideoLink>
          </VideoListItem>
        </VideoList>
        
        <VideoContainer>
          <Video
            src={embedUrl}
            title="Liga Argento - Video Promocional"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>
      </VideoWrapper>
    </VideoSectionContainer>
  );
};
