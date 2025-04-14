import info from "@/app/info/info.json";
import dynamic from "next/dynamic";

// Not Found component
const NotFound = ({ id }: { id: string }) => (
  <div>
    <h1>Page Not Found</h1>
    <p>The page with id &quot;{id}&quot; could not be found.</p>
  </div>
);

// Create a mapping of paths to dynamic imports based on info.json
// NOTE: When updating, make sure you update both this and info.json
const MDXComponents = {
  "@/md/test.mdx": dynamic(() => import("@/md/test.mdx")),
  "@/md/test2.mdx": dynamic(() => import("@/md/test2.mdx")),
  "@/md/test3.mdx": dynamic(() => import("@/md/test3.mdx")),
  "@/md/404.mdx": dynamic(() => import("@/md/404.mdx")),
};

function findMDXPage(id: string): string | null {
  // Find the page info that matches the id
  const pageInfo = info.find((item) => item.name === id);

  // Return null if no matching page is found
  if (!pageInfo) {
    return null;
  }

  // Return the path to the MDX file
  return pageInfo.path;
}

export default async function Page({ params }: { params: { id: string } }) {
  await params.id;
  // Find the MDX file path for the given id
  const mdxPath: string = findMDXPage(params.id) || "@/md/404.mdx";
  console.log("\n\nmdxPath: " + mdxPath + "\n\n");

  // Get the appropriate component from our mapping
  const MDXComponent = MDXComponents[mdxPath as keyof typeof MDXComponents];

  if (!MDXComponent) {
    console.error(`No component found for path: ${mdxPath}`);
    return <NotFound id={params.id} />;
  }

  return <MDXComponent />;
}
