'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { useCursorContext } from '../../context/cursor';

const StyledCursor = styled.div<{ $color?: string; $bordered?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border: 18px solid ${({ theme }) => theme.colors.red};
  border-radius: 100%;
  transform: translate3d(-100%, -100%, 0);
  transition: all 0.1s ease-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};

  ${({ $color }) =>
    $color &&
    css`
      border: 18px solid ${$color};
    `}

  ${({ $bordered, $color, theme }) =>
    $bordered &&
    css`
      width: 64px;
      height: 64px;
      margin: -32px 0 0 -32px;
      border-width: 5px;
      border-color: ${$color || theme.colors.red};
    `}

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

const Cursor = () => {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [{ cursorStyle, position }] = useCursorContext();

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      const x = position ? position.x : event.clientX;
      const y = position ? position.y : event.clientY;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [position]);

  return (
    <StyledCursor
      ref={cursorRef}
      $color={cursorStyle.color}
      $bordered={cursorStyle.bordered}
    />
  );
};

export default React.memo(Cursor);
