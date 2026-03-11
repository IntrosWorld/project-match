'use client';

import React from 'react';
import { Variants } from 'framer-motion';
import useMediaQuery from '../../../hooks/useMediaQuery';
import AppBar from '../AppBar';

const Footer = () => {
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet || 767}px)`,
  );

  const variants: Variants = {
    hidden: ({ isTabletView }: { isTabletView: boolean }) => ({ y: isTabletView ? -81 : -131 }),
    show: { y: 0 },
  };

  return (
    <AppBar
      key={String(isTabletView)}
      direction="up"
      renderAs="footer"
      variants={variants}
      initial={false}
      custom={{ isTabletView }}
      transition={{ duration: 0.7, ease: [0.666, 0, 0.237, 1] }}
    />
  );
};

export default React.memo(Footer);
