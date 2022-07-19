import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "src/services/store";
import Error404 from "src/screens/Error404";

const Error404Page: NextPage = () => <Error404 />;

export default Error404Page;

export const getStaticProps = wrapper.getStaticProps(
    (store) =>
        async ({ locale }) => {
            return {
                props: {
                    ...(await serverSideTranslations(locale || "", [
                        "error404",
                        "common",
                    ])),
                },
            };
        },
);
