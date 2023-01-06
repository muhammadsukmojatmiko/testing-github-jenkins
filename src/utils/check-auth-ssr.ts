import { getAuthProvider } from "@data/refine-providers/auth-provider";
import { checkAuthentication } from "@pankod/refine-nextjs-router";
import { GetServerSideProps, GetServerSidePropsResult, Redirect } from "next";

export const checkAuthSSR = async (
  context: Parameters<GetServerSideProps>[0],
) => {
  const authProvider = getAuthProvider();
  const { isAuthenticated, ...props } = await checkAuthentication(
    authProvider,
    context,
  );

  let redirect: Redirect | null = null;

  if ("redirect" in props) {
    redirect = props.redirect;
  }

  return { isAuthenticated, redirect };
};
