import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { gsap } from "@lib/gsap";
import { useRouter } from "next/router";
const Banner = ({ title }) => {
  const banner = useRef(null);

  //banner animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = document.querySelector(".header");
      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-regular-title",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        }
      ).fromTo(
        ".breadcrumb",
        {
          y: 20,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        },
        ">-.3"
      );
      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner.current,
          start: () => `top ${header.clientHeight}`,
          end: () => `+=${banner.current.offsetHeight}`,
          scrub: true,
        },
      });

      const position = banner.current.offsetHeight * 0.15;
      parallaxTl.fromTo(
        ".banner-single .circle",
        {
          y: 0,
        },
        {
          y: position,
        },
        "<"
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="banner banner-single relative" ref={banner}>
      <div className="container text-center">
        {markdownify(title, "h1", "mb-8 banner-regular-title opacity-0")}
        <ul className="breadcrumb flex items-center justify-center opacity-0">
          <li>
            <Link className="text-primary" href="/">
              Home
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="capitalize">{title}</li>
        </ul>
      </div>
      <div className="bg-theme banner-bg col-12 absolute top-0 left-0 bg-theme-light before:hidden after:hidden">
        <ImageFallback
          priority={true}
          fill={true}
          src="/images/vectors/single-banner-wave-1.svg"
          sizes="100vw"
          alt=""
        />
        <ImageFallback
          priority={true}
          fill={true}
          src="/images/vectors/single-banner-wave-2.svg"
          sizes="100vw"
          alt=""
        />
        <Circle
          className="circle left-[20%] top-[5%]"
          width={32}
          height={32}
          fill={false}
        />
        <Circle
          className="circle left-[5%] bottom-[28%]"
          width={85}
          height={85}
        />
        <Circle
          className="circle left-[41%] bottom-[27%]"
          width={20}
          height={20}
        />
        <Circle
          className="circle left-[24%] bottom-[35%]"
          width={47}
          height={47}
          fill={false}
        />
        <Circle
          className="circle left-[35%] top-[3%]"
          width={62}
          height={62}
          fill={false}
        />
        <Circle
          className="circle right-[25%] top-[5%]"
          width={20}
          height={20}
          fill={false}
        />
        <Circle
          className="circle right-[2%] bottom-[18%]"
          width={73}
          height={73}
          fill={false}
        />
        <Circle
          className="circle right-[40%] bottom-[50%]"
          width={20}
          height={20}
          fill={false}
        />
        <Circle
          className="circle right-[11%] top-[24%]"
          width={20}
          height={20}
        />
        <Circle
          className="circle right-[16%] bottom-[28%]"
          width={65}
          height={65}
        />
        <Circle
          className="circle right-[35%] bottom-[15%]"
          width={37}
          height={37}
          fill={false}
        />
      </div>
    </div>
  );
};

export default Banner;
