export { NextRouteComponent as default } from "@pankod/refine-nextjs-router";
import { checkAuthSSR } from "@utils/check-auth-ssr";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, redirect } = await checkAuthSSR(context);
  if (!isAuthenticated && redirect) {
    return { redirect };
  }

  return { props: {} };
};
