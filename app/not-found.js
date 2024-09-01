import NotFound from "@layouts/404";
import { getRegularPage } from "@lib/contentParser";

export default async function NotFoundPage() {
  const notFoundData = await getRegularPage("404");
  return <NotFound data={notFoundData} />;
}
