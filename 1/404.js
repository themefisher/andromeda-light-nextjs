import NotFound from "@layouts/404";
import { getRegularPage } from "@lib/contentParser";

const notFound = ({ data }) => {
  return <NotFound data={data} />;
};

// get 404 page data
export const getStaticProps = async () => {
  const notFoundData = await getRegularPage("404");
  return {
    props: {
      data: notFoundData,
    },
  };
};

export default notFound;
