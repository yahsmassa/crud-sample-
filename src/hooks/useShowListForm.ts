import { useState } from "react";

export default function useShowListForm() {
  const [visible, setVisivel] = useState<"list" | "form">("list");

  const showList = () => setVisivel("list");
  const showForm = () => setVisivel("form");

  return {
    formVisible: visible === "form",
    listVisible: visible === "list",
    showList,
    showForm,
  };
}
