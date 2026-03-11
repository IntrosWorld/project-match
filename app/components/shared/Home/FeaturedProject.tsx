'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useAnimation, Variants } from 'framer-motion';
import styled from 'styled-components';
import { useMenuContext } from '../../../context/menu';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useMediaQuery from '../../../hooks/useMediaQuery';
import AnimateOnScreen from '../AnimateOnScreen';
import containerStyles from '../../../styles/shared/container';
import { secondaryFontStyle } from '../../../styles/shared/text';

// --- Styles ---
const ContentSection = styled(motion.section)`
  ${containerStyles};
  position: relative;
  margin-bottom: 200px;

  @media screen and (max-width: 767px) { margin-bottom: 100px; }
`;

const ProjectAnchor = styled(motion.create(Link))`
  display: block;
  width: 100%;
  height: 480px;
  margin: -100px 0 215px;

  @media screen and (max-width: 767px) {
    height: 190px;
    margin-bottom: 208px;
    margin-top: -50px;
  }
`;

const ProjectInfo = styled(motion.div)`
  margin-left: 8.333%;
  width: 83.333%;
  position: relative;

  & h3, & .project-info {
    position: absolute;
    top: 75px;
    z-index: 1;
  }

  & h3 { ${secondaryFontStyle}; }

  & .project-info {
    right: 0;
    & h4 {
      ${secondaryFontStyle};
      display: inline-block;
      font-size: 0.875rem;
      line-height: 23px;
      margin-left: 32px;
      &:first-child { margin-left: 0; }
    }
  }

  @media screen and (max-width: 1023px) {
    margin-left: 0;
    width: 83.333%;
    & .project-info { display: none; }
  }

  @media screen and (max-width: 767px) {
    & h3 { font-size: 1.125rem; line-height: 1.2777777778; top: 17px; }
  }
`;



const VideoPreview = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 480px;
  margin: 0;
  & video { width: 100%; height: 100%; object-fit: cover; }

  @media screen and (max-width: 1023px) {
    width: calc(100% + 64px);
    margin-left: -32px;
  }

  @media screen and (max-width: 767px) { height: 190px; }
`;

const VideoOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 0 20px;

  & h2 {
    font-size: clamp(2rem, 5vw, 4.5rem);
    font-weight: 900;
    line-height: 0.9;
    margin: 0;
    letter-spacing: -0.02em;
    color: #fff;
    text-transform: uppercase;
  }

  & p {
    font-family: presicav, sans-serif;
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.red};
    margin-bottom: 1rem;
  }
`;

const VideoWatermark = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 10px;
  font-family: presicav, sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: rgba(234, 40, 30, 0.25);
  pointer-events: none;
  z-index: 5;
  text-transform: uppercase;
  white-space: nowrap;

  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
    bottom: 20px;
    left: 10px;
  }
`;

const itemTitleAnimation: Variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.9, ease: [0.6, 0.05, 0.01, 0.9] as const } },
};

const transition = { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as const };

// --- Component ---
const FeaturedProject = () => {
  const controlsInfo = useAnimation();
  const controlsArrow = useAnimation();
  const [] = useMenuContext();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet || 767}px)`,
  );

  const handleAnchorHoverStart = React.useCallback(() => {
    addCursorBorder();
    controlsInfo.start({ opacity: 1 });
    controlsArrow.start({ x: 0 });
  }, [addCursorBorder, controlsInfo, controlsArrow]);

  const handleAnchorHoverEnd = React.useCallback(() => {
    removeCursorBorder();
    controlsInfo.start({ opacity: 0 });
    controlsArrow.start({ x: isTabletView ? -25.19 : -33 });
  }, [removeCursorBorder, controlsInfo, controlsArrow, isTabletView]);

  const containerVariants = {
    initial: {},
    hover: { transition: { staggerChildren: 0.1 } }
  };

  const textVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] as const } }
  };

  return (
    <ContentSection>
      <AnimateOnScreen>
        <motion.div>
          <ProjectAnchor
            href="/projects/not-humble"
            onHoverStart={handleAnchorHoverStart}
            onHoverEnd={handleAnchorHoverEnd}
          >
            <ProjectInfo>
              <motion.div
                initial={{ opacity: 0 }}
                animate={controlsInfo}
                transition={transition}
                className="project-info"
              >
                <h4>AI Assistant</h4>
                <h4>2024</h4>
              </motion.div>
              {/* Original title removed as per request for centered overlay content */}
            </ProjectInfo>
              <VideoPreview>
                <video loop autoPlay muted playsInline src="/videos/video1.mp4" />
                <VideoWatermark
                  variants={itemTitleAnimation}
                  initial="initial"
                  animate="animate"
                >
                  MATCH                  AND                CATCH ERRORS
                </VideoWatermark>
                <VideoOverlay
                  variants={containerVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <motion.p variants={textVariants}>AI Security Interface</motion.p>
                  <motion.h2 variants={textVariants}>
                    PROTECT <br /> THE CORE
                  </motion.h2>
                </VideoOverlay>
              </VideoPreview>
          </ProjectAnchor>
        </motion.div>
      </AnimateOnScreen>
    </ContentSection>
  );
};

export default FeaturedProject;
