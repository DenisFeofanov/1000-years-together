export interface Act {
  slug: string;
  title: string;
}

export const sharedSlug = "act";

export const ACTS: Act[] = [
  { slug: "prologue", title: "Пролог" },
  { slug: "beginning", title: "Завязка" },
  { slug: "middle", title: "Кульминация" },
  { slug: "end", title: "Развязка" },
  { slug: "epilogue", title: "Эпилог" },
];
