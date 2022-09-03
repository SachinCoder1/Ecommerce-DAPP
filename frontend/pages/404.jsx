import React from "react";
import ErrorPage from "../components/404-page/ErrorPage";

export default function WrongPage() {
  return (
    <ErrorPage
      title="You seem to be lost!"
      description="The page you're looking for isn't available."
      image="/images/404-image.webp"
      alt="404 error"
    />
  );
}
