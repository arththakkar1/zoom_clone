import React, { ReactNode } from "react";
import StreamVideoProvider from "../../../providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aloom",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
}

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  );
}

export default RootLayout;
