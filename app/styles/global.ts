'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    line-height: 1.5;
    font-family: presicav, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    overscroll-behavior: none;
    height: auto;
    overflow-y: visible;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    cursor: none;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  address {
    font-style: normal;
  }
  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
    cursor: none;
  }
  button {
    appearance: none;
    padding: 0;
    background: 0 0;
    border: none;
    color: inherit;
    outline: 0;
    cursor: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1023px) {
    a { cursor: pointer; }
    button { cursor: pointer; }
  }
`;

export default GlobalStyles;
