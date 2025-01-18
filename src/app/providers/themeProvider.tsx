"use client";

import { ThemeProvider } from "@emotion/react";
import theme from "@/themes/theme";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
