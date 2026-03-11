'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import AnimateOnScreen from '../AnimateOnScreen';
import containerStyles from '../../../styles/shared/container';

const ContentSection = styled(motion.section)`
  ${containerStyles};
  margin-bottom: 210px;

  @media screen and (max-width: 767px) { margin-bottom: 107px; }
`;

const TextWrapper = styled.div`
  margin-left: 8.333%;
  width: calc(58.333% - 32px);

  @media screen and (max-width: 1023px) { width: 100%; margin-left: 0; }
`;

const Text = styled.h2`
  margin: 0;
  font-size: 2.625rem;
  line-height: 1.3;
  font-weight: 500;
  max-width: 640px;

  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
    line-height: 1.3;
    & br { display: none; }
  }
`;

const Content = () => (
  <AnimateOnScreen>
    <ContentSection>
      <TextWrapper>
        <Text>
          The best breakthroughs are built together—
          <br />
          we connect the visionaries with the builders to create things that
          didn&apos;t exist yesterday. Finding your perfect project match.
          Let&apos;s build something world-changing together.
        </Text>
      </TextWrapper>
    </ContentSection>
  </AnimateOnScreen>
);

export default Content;
