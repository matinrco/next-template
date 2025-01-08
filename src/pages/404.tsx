import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/rtk/store";
import { Page as Error404Page } from "@/containers/error404/Page";

export default Error404Page;

export const getStaticProps = wrapper.getStaticProps(
    () =>
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
