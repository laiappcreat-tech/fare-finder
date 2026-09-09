import { useEffect } from "react";

// Lightweight replacement for TanStack Start's head() meta management.
// Sets the document title and meta description on mount for each page.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description !== undefined) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
