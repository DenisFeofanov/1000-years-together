import { Act } from "@/interfaces/Act";

export function findAdjacentActSlugs(element: string, array: Act[]) {
  const slugs = array.map(act => act.slug);
  const index = slugs.indexOf(element);

  if (index === -1) {
    throw new Error("Given element is not found in the array");
  }

  let previousSlug = slugs[index - 1] || null;
  let nextSlug = slugs[index + 1] || null;

  return {
    previousSlug,
    nextSlug,
  };
}
