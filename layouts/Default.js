import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Banner from "./components/Banner";

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
