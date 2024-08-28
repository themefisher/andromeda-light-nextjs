"use client";

import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { gsap } from "@lib/gsap";
import { useEffect, useRef } from "react";
import "../styles/style.scss";

export default function RootLayout({ children }) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const main = useRef();

  //gsap fade animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      //fade
      const fadeElements = document.querySelectorAll(".fade");
      fadeElements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scrollTrigger: el,
          duration: 0.3,
        });
      });

      //gsap animation
      const elements = document.querySelectorAll(".animate");
      elements.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            // markers: true,
          },
        });

        if (el.classList.contains("from-left")) {
          tl.from(el, {
            opacity: 0,
            x: -100,
          });
        } else if (el.classList.contains("from-right")) {
          tl.from(el, {
            opacity: 0,
            x: 100,
          });
        } else {
          tl.from(el, {
            opacity: 0,
            y: 100,
          });
        }
      });

      //background animation
      const animatedBgs = document.querySelectorAll(".bg-theme");
      animatedBgs.forEach((bg) => {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            toggleClass: "bg-animate",
            once: true,
          },
        });
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        />

        {/* theme meta */}
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Header />
        <main ref={main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
