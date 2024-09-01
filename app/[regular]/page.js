import NotFound from "@layouts/404";
import About from "@layouts/About";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getRegularPage, getSinglePage } from "@lib/contentParser";

// for all regular pages
const RegularPages = async ({ params }) => {
  const { regular } = params;
  const pageData = await getRegularPage(regular);
  const { title, meta_title, description, image, noindex, canonical, layout } =
    pageData.frontmatter;
  const { content } = pageData;

  return (
    <GSAPWrapper>
      <SeoMeta
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />

      {layout === "404" ? (
        <NotFound data={pageData} />
      ) : layout === "about" ? (
        <About data={pageData} />
      ) : layout === "contact" ? (
        <Contact data={pageData} />
      ) : (
        <Default data={pageData} />
      )}
    </GSAPWrapper>
  );
};
export default RegularPages;

export async function generateStaticParams() {
  const slugs = getSinglePage("content");
  return slugs.map((item) => ({
    regular: item.slug,
  }));
}
