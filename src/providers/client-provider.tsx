"use client";

import NextTopLoader from "nextjs-toploader";
function ClientProvider() {
  return (
    <>
      <NextTopLoader speed={100} color="#6C63FF" showSpinner={false} />
    </>
  );
}

export { ClientProvider };
