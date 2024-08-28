import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import { sortByDate } from "@lib/utils/sortFunctions";
const { blog_folder } = config.settings;

// post single layout
const Article = async ({ params }) => {
  const { single } = params;
  const posts = await getSinglePage(`content/${blog_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);
  const recentPosts = sortByDate(posts).filter((post) => post.slug !== single);
  const { frontmatter, content } = post[0];

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      recentPosts={recentPosts}
    />
  );
};

// get post single slug
export async function generateStaticParams() {
  const allSlug = await getSinglePage(`content/${blog_folder}`);
  return allSlug.map((item) => ({
    single: item.slug,
  }));
}

export default Article;
