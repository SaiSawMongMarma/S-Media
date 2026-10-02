import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
// import { ClerkProvider } from "@clerk/nextjs";
import {
  ClerkProvider,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SMedia",
  description: "Social Media App build with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="h-full antialiased"
      >
        <body>
          {/* <ClerkProvider> */}
            <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>
            <div className=" bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
          {/* </ClerkProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
