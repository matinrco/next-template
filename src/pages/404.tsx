import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/rtk/store";
import { Error404 } from "@/containers/Error404";

export default Error404;

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
