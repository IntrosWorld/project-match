'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import servicesItems from '../../../utils/constants/services-items';
import useCursorStyle from '../../../hooks/useCursorStyle';
import AnimateOnScreen from '../AnimateOnScreen';
import containerStyles from '../../../styles/shared/container';
import { secondaryFontStyle } from '../../../styles/shared/text';

const ContentSection = styled(motion.section)`
  ${containerStyles};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 200px;

  @media screen and (max-width: 1023px) { flex-direction: column; }
  @media screen and (max-width: 767px) { margin-bottom: 86px; }
`;

const TextWrapper = styled.div`
  margin-left: 8.333%;
  width: 58.333%;

  & h2 {
    margin: 0;
    margin-bottom: 44px;
    max-width: 600px;
    font-size: 2.625rem;
    line-height: 1;
    font-weight: 500;
  }

  & p {
    max-width: 448px;
    margin: 6.9px 0;
    line-height: 1.2777777778;
  }

  @media screen and (max-width: 1023px) { margin-left: 0; width: 100%; }
  @media screen and (max-width: 767px) { & h2 { font-size: 1.5rem; margin-bottom: 34px; } }
`;

const ServicesWrapper = styled.div`
  margin-left: 8.333%;
  width: 25%;
  padding-top: 15px;
  padding-left: 30px;

  & h3 { ${secondaryFontStyle}; }

  @media screen and (max-width: 1023px) { margin-left: 0; padding-left: 0; width: 100%; }
`;

const AccordionToggle = styled.button<{ 'aria-expanded': boolean }>`
  ${secondaryFontStyle};
  font-size: 0.875rem;
  position: relative;
  display: block;
  padding: 27px 0 0 35px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.red};

  &:hover:not([aria-expanded='true']) {
    color: ${({ theme }) => theme.text};
    &::before, &::after { width: 11px; transform: rotate(0deg); }
    &::before { left: 2px; }
    &::after { left: 13px; }
  }

  &::before, &::after {
    content: '';
    position: absolute;
    display: block;
    top: 50%;
    width: 18px;
    height: 4px;
    margin-top: 11.5px;
    background: ${({ theme }) => theme.colors.red};
    transition: all 0.1s ease-in-out;
  }

  &::before { left: 0; transform: rotate(45deg); }
  &::after { left: 10px; transform: rotate(-45deg); }

  &[aria-expanded='true'] {
    &::before, &::after { width: 11px; transform: rotate(0deg); }
    &::before { left: 2px; }
    &::after { left: 13px; }
  }
`;

const AccordionContent = styled(motion.div)`
  padding-left: 35px;
  font-size: 0.875rem;
  line-height: 1.0714285714;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.red};
  & p { margin: 6.1px 0 0; }
`;

const About = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();

  const handleMouseEnter = React.useCallback(
    (curr: number) => {
      if (curr === selectedItem) return;
      addCursorBorder();
    },
    [selectedItem, addCursorBorder],
  );

  const handleMouseLeave = React.useCallback(
    (curr: number) => {
      if (curr === selectedItem) return;
      removeCursorBorder();
    },
    [selectedItem, removeCursorBorder],
  );

  return (
    <AnimateOnScreen>
      <ContentSection id="how-it-works">
        <TextWrapper>
          <h2>
            Project Match is the all-in-one ecosystem for collaborative
            innovation, providing matching, team building, and project
            management tools.
          </h2>
          <p>
            Everyone has a big idea. But ideas need a team to survive. We
            bridge the gap between talent and opportunity, helping you find
            collaborators who share your passion and complement your skills.
            Whether you&apos;re starting from scratch or looking for that final
            piece of the puzzle—your match is waiting.
            We&apos;re simplifyng the way collaboration happens.
          </p>
        </TextWrapper>
        <ServicesWrapper>
          <h3>Services</h3>
          {(servicesItems as [string, string[]][]).map(([item, services], itemIndex: number) => (
            <React.Fragment key={item}>
              <AccordionToggle
                aria-expanded={itemIndex === selectedItem}
                onClick={() => setSelectedItem(itemIndex)}
                onMouseEnter={() => handleMouseEnter(itemIndex)}
                onMouseLeave={() => handleMouseLeave(itemIndex)}
              >
                {item}
              </AccordionToggle>
              <AccordionContent
                animate={{ height: itemIndex === selectedItem ? 'auto' : 0 }}
                transition={{ duration: 0.7, ease: [0, 0.7, 0.29, 0.97] as const }}
              >
                {services.map((service: string, serviceIndex: number) => (
                  <p key={`${itemIndex}_${serviceIndex}`}>{service}</p>
                ))}
              </AccordionContent>
            </React.Fragment>
          ))}
        </ServicesWrapper>
      </ContentSection>
    </AnimateOnScreen>
  );
};

export default React.memo(About);
