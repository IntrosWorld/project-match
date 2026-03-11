"use client";

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import Image from 'next/image';
import { secondaryFontStyle } from '../../styles/shared/text';
import Arrow from '../shared/icons/Arrow';

const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1] as const,
};

const CardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & h3 {
    ${secondaryFontStyle};
    color: rgba(255,255,255,0.8);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  & .meta {
    text-align: right;
    & h4 {
      ${secondaryFontStyle};
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      margin-left: 1.5rem;
      display: inline-block;
    }
  }
`;

const ProjectTitle = styled(motion.h2)`
  font-size: 1.75rem;
  line-height: 1.1;
  font-weight: 800;
  color: #fff;
  margin-top: auto;
  margin-bottom: 1rem;
  font-family: 'Geist', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  & .arrow {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    width: 40px;
    height: 24px;

    & svg path {
      fill: #fff;
    }
  }
`;

interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string | null;
  year?: string;
  category?: string;
  owner: { name: string | null };
}

export default function DiscoveryProjectCard({ project }: { project: Project }) {
  const controlsArrow = useAnimation();

  React.useEffect(() => {
    controlsArrow.start({ x: 0 });
  }, [controlsArrow]);

  return (
    <CardContainer>
      <VideoBackground>
        <Image
          src={project.imageUrl || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800`}
          alt={project.title}
          fill
          style={{ objectFit: 'cover', zIndex: -1 }}
        />
        {project.videoUrl && (
          <video
            src={project.videoUrl}
            loop
            autoPlay
            muted
            playsInline
            poster={project.imageUrl || undefined}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </VideoBackground>

      <Content>
        <ProjectHeader>
          <h3>{project.category || "Project Match"}</h3>
          <div className="meta">
            <h4>{project.owner.name || "Ayus"}</h4>
            <h4>{project.year || "2026"}</h4>
          </div>
        </ProjectHeader>

        <ProjectTitle>
          {project.title.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              {word} <br />
            </React.Fragment>
          ))}
          <span className="arrow">
            <Arrow animate={controlsArrow} transition={transition} />
          </span>
        </ProjectTitle>
      </Content>
    </CardContainer>
  );
}
