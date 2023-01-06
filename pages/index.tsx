import { DashboardResource } from "@data/consts/resource";
import { NextRouteComponent } from "@pankod/refine-nextjs-router";
import { checkAuthSSR } from "@utils/check-auth-ssr";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { isAuthenticated, redirect } = await checkAuthSSR(context);
  if (!isAuthenticated && redirect) {
    return { redirect };
  }

  return { props: {} };
};

export default NextRouteComponent.bind({
  initialRoute: DashboardResource.pricing,
});
