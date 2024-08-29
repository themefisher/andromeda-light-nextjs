"use client";

import shortcodes from "@shortcodes/all";
import dynamic from "next/dynamic";
import Banner from "./components/Banner";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  {
    ssr: false,
  }
);

const Default = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container mt-10">
        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default Default;
