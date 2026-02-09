import styled from "styled-components";
import { Container } from "../../components/common/Container";
import { StyledSvg } from "../../components/common/StyledSVG";
import instagram from "../../assets/social-media-icons/instagram.svg";
import youtube from "../../assets/social-media-icons/youtube.svg";
import discord from "../../assets/social-media-icons/discord.svg";

const StaffContainer = styled.div`
  min-height: calc(100vh - 70px);
  background-color: #000000;
  padding: 64px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 32px 0;
  }
`;

const Section = styled.section`
  margin-bottom: 80px;
  padding: 0 64px;

  @media (max-width: 1024px) {
    padding: 0 32px;
  }

  @media (max-width: 768px) {
    margin-bottom: 48px;
    padding: 0 16px;
  }
`;

const SectionTitle = styled.h2`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 48px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.div<{ featured?: boolean }>`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: ${({ featured }) => featured ? "2px solid #fabf4a" : "1px solid rgba(255, 255, 255, 0.1)"};
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(250, 191, 74, 0.1) 0%, rgba(250, 191, 74, 0.05) 100%);
    border: 1px solid rgba(250, 191, 74, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(250, 191, 74, 0.2);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background-color: #fabf4a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000000;
  font-size: 18px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #222222;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const ProfileImagePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #222222;
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.h3`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  margin: 0;
  text-align: center;
`;

const Role = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #fabf4a;
  margin: 0;
  text-align: center;
`;

const Platform = styled.a`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #fabf4a;
  text-decoration: none;
  text-align: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fabf4a;
  margin: 8px 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const TextLink = styled.a`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;

  &:hover {
    color: #fabf4a;
  }
`;

const ThanksSection = styled(Section)`
  text-align: left;
  padding: 0 64px;

  @media (max-width: 1024px) {
    padding: 0 32px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const ThanksTitle = styled.h2`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #fabf4a;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ThanksText = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const HighlightedText = styled.span`
  color: #fabf4a;
`;

const JoinSection = styled(Section)`
  padding: 0 64px;

  @media (max-width: 1024px) {
    padding: 0 32px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const JoinCard = styled.div`
  background: linear-gradient(135deg, rgba(250, 191, 74, 0.1) 0%, rgba(250, 191, 74, 0.05) 100%);
  border: 1px solid rgba(250, 191, 74, 0.3);
  border-radius: 16px;
  padding: 48px;
  max-width: 800px;
  margin: 0;
  text-align: left;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const JoinTitle = styled.h2`
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const JoinText = styled.p`
  font-family: "Rethink Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #fabf4a;
  color: #000000;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.2s;
  margin-left: auto;
  margin-right: 0;
  margin-top: auto;

  &:hover {
    background-color: #f5b041;
    transform: translateY(-2px);
  }
`;

// Streamers data
const streamers = [
  {
    name: "iluleh",
    platform: "twitch.tv/iluleh",
    platformUrl: "https://www.twitch.tv/iluleh",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/luleh.recap", handle: "@luleh.recap" },
      { type: "tiktok", url: "https://www.tiktok.com/@soyluleh", handle: "@soyluleh" },
      { type: "youtube", url: "https://www.youtube.com/@Imluleh", handle: "@Imluleh" },
    ],
    featured: false,
  },
  {
    name: "El AleSsi",
    platform: "twitch.tv/elalessipah",
    platformUrl: "https://www.twitch.tv/elalessipah",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/alexisramirez", handle: "@alexisramirez" },
      { type: "steam", url: "#", handle: "El AleSsi™" },
    ],
    featured: false,
  },
  {
    name: "Worlock",
    platform: "kick.com/w0rlock",
    platformUrl: "https://kick.com/w0rlock",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/worlock1", handle: "@worlock1" },
    ],
    featured: false,
  },
  {
    name: "Sandevistan",
    platform: "twitch.tv/sandevistanr",
    platformUrl: "https://www.twitch.tv/sandevistanr",
    image: null,
    socials: [
      { type: "twitch", url: "https://www.twitch.tv/sandevistanr", handle: "twitch.tv/sandevistanr" },
    ],
    featured: false,
  },
  {
    name: "dgN",
    platform: "twitch.tv/dgndota",
    platformUrl: "https://www.twitch.tv/dgndota",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/dgn.dota", handle: "@dgn.dota" },
    ],
    featured: false,
  },
  {
    name: "3mpty",
    platform: "twitch.tv/3mpty_dota",
    platformUrl: "https://www.twitch.tv/3mpty_dota",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/soff.sch", handle: "@soff.sch" },
      { type: "steam", url: "#", handle: "3mpty" },
    ],
    featured: false,
  },
  {
    name: "FeliPapá",
    platform: "twitch.tv/felipadre",
    platformUrl: "https://www.twitch.tv/felipadre",
    image: null,
    socials: [
      { type: "twitch", url: "https://www.twitch.tv/felipadre", handle: "twitch.tv/felipadre" },
    ],
    featured: false,
  },
  {
    name: "ChariLive",
    platform: "twitch.tv/ChariLive",
    platformUrl: "https://www.twitch.tv/charlive",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/augustochiarito", handle: "@augustochiarito" },
      { type: "twitter", url: "https://twitter.com/augustochiarito", handle: "@augustochiarito" },
    ],
    featured: false,
  },
  {
    name: "Soka",
    platform: "kick.com/sokademon",
    platformUrl: "https://kick.com/sokademon",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/sokademon", handle: "@SokaDemon" },
      { type: "twitter", url: "https://twitter.com/sokademon", handle: "@SokaDemon" },
    ],
    featured: false,
  },
  {
    name: "S4TVRNO",
    platform: "twitch.tv/satvrnoff",
    platformUrl: "https://www.twitch.tv/satvrnoff",
    image: null,
    socials: [
      { type: "kick", url: "https://kick.com/satvrnoff", handle: "kick.com/satvrnoff" },
      { type: "instagram", url: "https://www.instagram.com/satvrnoff", handle: "@satvrnoff" },
      { type: "youtube", url: "https://www.youtube.com/@spacecreatedfromspace", handle: "@spacecreatedfromspace" },
      { type: "steam", url: "#", handle: "S4TVRNO" },
    ],
    featured: false,
  },
  {
    name: "OvoIde",
    platform: "twitch.tv/ovolde",
    platformUrl: "https://www.twitch.tv/ovolde",
    image: null,
    socials: [
      { type: "instagram", url: "https://www.instagram.com/ovolde", handle: "@ovolde" },
    ],
    featured: false,
  },
];

// Staff data
const staff = [
  {
    name: "Juan Rettori",
    role: "Fullstack & Game Developer",
    image: null,
    contacts: [
      { type: "linkedin", url: "https://www.linkedin.com/in/juan-rettori", label: "in Juan Rettori" },
      { type: "instagram", url: "https://www.instagram.com/juanrettori", label: "@juanrettori" },
      { type: "steam", url: "https://steamcommunity.com/id/Zavilor", label: "steam/Zavilor" },
    ],
  },
  {
    name: "Soff Schneider",
    role: "Web & Graphic Designer",
    image: null,
    contacts: [
      { type: "linkedin", url: "https://www.linkedin.com/in/sofia-schneider-de-haro", label: "in Sofia Schneider de Haro" },
      { type: "website", url: "https://sofiasch.com", label: "sofiasch.com" },
    ],
  },
  {
    name: "SyndraMoon",
    role: "Discord Manager",
    image: null,
    contacts: [
      { type: "discord", url: "#", label: "syndramoon12" },
      { type: "instagram", url: "https://www.instagram.com/syndramoon", label: "@syndramoon" },
      { type: "twitch", url: "https://www.twitch.tv/syndramoon", label: "syndramoon" },
    ],
  },
  {
    name: "Jorgelina Rios",
    role: "Manager Assistant",
    image: null,
    contacts: [
      { type: "discord", url: "#", label: "sanguito" },
      { type: "instagram", url: "https://www.instagram.com/sanguito.sc", label: "@sanguito.sc" },
    ],
  },
];

// Simple SVG icons for LinkedIn, Steam, Twitter, and Kick
const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
  </svg>
);

const SteamIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#1b2838"/>
    <path d="M8.5 7.5c-1.1 0-2 .9-2 2s.9 2 2 2c.3 0 .6-.1.8-.2l1.4 1.4c.3-.4.4-.9.4-1.4 0-1.1.9-2 2-2s2 .9 2 2c0 .5-.2 1-.4 1.4l-1.4 1.4c.2.2.2.5.2.8 0 1.1-.9 2-2 2s-2-.9-2-2c0-.5.2-1 .4-1.4l-1.4-1.4c-.2.2-.5.2-.8.2-1.1 0-2-.9-2-2s.9-2 2-2z" fill="white"/>
    <circle cx="9.5" cy="9.5" r="1.5" fill="#1b2838"/>
    <circle cx="14.5" cy="12.5" r="1.1" fill="#1b2838"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
  </svg>
);

const KickIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#53fc18"/>
    <path d="M9.5 7.5h1.5v2.5l2.5-2.5h2l-2.5 3 2.5 4h-2l-2.5-3.5v3.5H9.5V7.5z" fill="#000000"/>
  </svg>
);

const TwitchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" fill="currentColor"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>
  </svg>
);

const getSocialIcon = (type: string) => {
  switch (type) {
    case "instagram":
      return instagram;
    case "youtube":
      return youtube;
    case "discord":
      return discord;
    case "linkedin":
      return "linkedin";
    case "steam":
      return "steam";
    case "twitter":
      return "twitter";
    case "kick":
      return "kick";
    case "twitch":
      return "twitch";
    case "tiktok":
      return "tiktok";
    default:
      return null;
  }
};

export const StaffPage = () => {
  return (
    <StaffContainer>
      <Container>
        {/* Staff Section */}
        <Section>
          <SectionTitle>Staff</SectionTitle>
          <CardsGrid>
            {staff.map((member, index) => (
              <Card key={index}>
                {member.image ? (
                  <ProfileImage src={member.image} alt={member.name} />
                ) : (
                  <ProfileImagePlaceholder />
                )}
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
                <Divider />
                <SocialLinks>
                  {member.contacts.map((contact, idx) => {
                    const icon = getSocialIcon(contact.type);
                    if (icon === "linkedin") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <LinkedInIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "steam") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <SteamIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "twitter") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <TwitterIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "kick") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <KickIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "twitch") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <TwitchIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "tiktok") {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                          style={{ color: "#ffffff" }}
                        >
                          <TikTokIcon />
                        </SocialLink>
                      );
                    }
                    if (icon) {
                      return (
                        <SocialLink
                          key={idx}
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={contact.label}
                        >
                          <StyledSvg src={icon} color="#ffffff" width="24px" height="24px" />
                        </SocialLink>
                      );
                    }
                    return (
                      <TextLink
                        key={idx}
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contact.label}
                      </TextLink>
                    );
                  })}
                </SocialLinks>
              </Card>
            ))}
          </CardsGrid>
        </Section>

        {/* Streamers Section */}
        <Section>
          <SectionTitle>Nuestros Streamers</SectionTitle>
          <CardsGrid>
            {streamers.map((streamer, index) => (
              <Card key={index} featured={streamer.featured}>
                {streamer.featured && <FeaturedBadge>K</FeaturedBadge>}
                {streamer.image ? (
                  <ProfileImage src={streamer.image} alt={streamer.name} />
                ) : (
                  <ProfileImagePlaceholder />
                )}
                <Name>{streamer.name}</Name>
                <Platform href={streamer.platformUrl} target="_blank" rel="noopener noreferrer">
                  {streamer.platform}
                </Platform>
                <Divider />
                <SocialLinks>
                  {streamer.socials.map((social, idx) => {
                    const icon = getSocialIcon(social.type);
                    if (icon === "linkedin") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <LinkedInIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "steam") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <SteamIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "twitter") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <TwitterIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "kick") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <KickIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "twitch") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <TwitchIcon />
                        </SocialLink>
                      );
                    }
                    if (icon === "tiktok") {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                          style={{ color: "#ffffff" }}
                        >
                          <TikTokIcon />
                        </SocialLink>
                      );
                    }
                    if (icon) {
                      return (
                        <SocialLink
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.handle}
                        >
                          <StyledSvg src={icon} color="#ffffff" width="24px" height="24px" />
                        </SocialLink>
                      );
                    }
                    return (
                      <TextLink
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.handle}
                      </TextLink>
                    );
                  })}
                </SocialLinks>
              </Card>
            ))}
          </CardsGrid>
        </Section>

        {/* Thanks Section */}
        <ThanksSection>
          <ThanksTitle>
            <span>💛</span> Gracias a quienes hacen L'Argento posible
          </ThanksTitle>
          <ThanksText>
            Este proyecto existe gracias al esfuerzo, la pasión y el tiempo que cada miembro del staff y cada streamer dedica día a día.
          </ThanksText>
          <ThanksText>
            <HighlightedText>Hecho por la comunidad, para la comunidad.</HighlightedText>
          </ThanksText>
        </ThanksSection>

        {/* Join Section */}
        <JoinSection>
          <JoinCard>
            <JoinTitle>¿Queres formar parte?</JoinTitle>
            <JoinText>
              Si te interesa formar parte de L'Argento como streamer, staff o sponsor, no dudes en contactarnos. Siempre hay lugar para nuevas ideas y aportes.
            </JoinText>
            <ContactButton href="mailto:contacto@largentoleague.com">
              Contactarme
            </ContactButton>
          </JoinCard>
        </JoinSection>
      </Container>
    </StaffContainer>
  );
};

