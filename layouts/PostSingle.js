"use client";

import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { DiscussionEmbed } from "disqus-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Post from "./partials/Post";
import SeoMeta from "./partials/SeoMeta";
const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((elem) => elem.MDXRemote),
  {
    ssr: false,
  }
);

const PostSingle = ({ frontmatter, content, mdxContent, recentPosts }) => {
  let { description, title, date, image, author } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { disqus } = config;

  return (
    <>
      <SeoMeta title={title} description={description} image={image} />
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center">
              <div className="lg:col-10">
                {image && (
                  <Image
                    src={image}
                    height="700"
                    width="1120"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg "
                  />
                )}
              </div>
              <div className="lg:col-8">
                {markdownify(title, "h1", "h2 mt-6")}
                <div className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
                    <ImageFallback
                      src={author.avatar}
                      width={50}
                      height={50}
                      alt="author"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-medium text-dark">{author.name}</p>
                    <p>
                      {dateFormat(date)} - {readingTime(content)}
                    </p>
                  </div>
                </div>
                <div className="content mb-16 mt-16 text-left">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
              </div>
              {disqus.enable && (
                <div className="fade row justify-center ">
                  <div className="lg:col-8">
                    <DiscussionEmbed
                      shortname={disqus.shortname}
                      config={disqus.settings}
                    />
                  </div>
                </div>
              )}
            </div>
          </article>

          <div className="section mt-16">
            <h2 className="section-title text-center">Recent Articles</h2>
            <div className="row justify-center">
              {recentPosts.slice(0, 2).map((post, index) => (
                <div key={"post-" + index} className="animate mt-16 lg:col-5">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
};

export default PostSingle;
