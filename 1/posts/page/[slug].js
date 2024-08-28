import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { gsap } from "@lib/gsap";
import Post from "@partials/Post";
import { useEffect, useRef } from "react";
const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({
  postIndex,
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;
  const postsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(postsRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Base title={title}>
      <section className="section pt-0">
        <Banner title={title} />
        <div className="container">
          <div
            className="row justify-center pt-20 pb-16 opacity-0"
            ref={postsRef}
          >
            {currentPosts.map((post, i) => (
              <div key={`key-${i}`} className="mb-8 lg:col-5">
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
      {/* CTA */}
      <Cta />
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const currentPage = parseInt((params && params.slug) || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      currentPage: currentPage,
      postIndex: postIndex,
    },
  };
};
