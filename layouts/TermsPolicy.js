import React from "react";
import Banner from "./components/Banner";
import { MDXRemote } from "next-mdx-remote";
import shortcodes from "./shortcodes/all";

function Terms({ data }) {
  const { title, last_edit, description } = data.frontmatter;
  const { mdxContent } = data;
  return (
    <div className="section pt-0">
      <Banner title={title} />
      <div className="container">
        <div className="row mt-16 justify-center">
          <div className="lg:col-10">
            <p className="font-medium text-primary">Last-edit: {last_edit}</p>
            <p className="mt-4 text-2xl uppercase">{description}</p>
            <div className="content mt-12">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
