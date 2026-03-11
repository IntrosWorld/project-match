"use client";

import React from "react";
import { ThemeProvider } from "styled-components";

// Match providers
import { ThemeContextProvider } from "./context/theme";
import { CursorContextProvider } from "./context/cursor";
import { MenuContextProvider } from "./context/menu";
import { SessionProvider } from "next-auth/react";
import GlobalStyles from "./styles/global";
import darkTheme from "./styles/themes/dark";

import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./components/shared/Cursor"), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeContextProvider>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyles />
          <MenuContextProvider>
            <CursorContextProvider>
              <Cursor />
              {children}
            </CursorContextProvider>
          </MenuContextProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </SessionProvider>
  );
}
