import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "src/services/store";
import { api } from "src/services/api";
import Home from "src/screens/Home";

const HomePage: NextPage = () => <Home />;

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            try {
                const data = await store
                    .dispatch(
                        api.endpoints.getWeatherANSI.initiate({
                            city: "Tehran",
                        }),
                    )
                    .unwrap();
            } catch (error) {}

            // you can use:
            // await Promise.all(
            //     store.dispatch(api.util.getRunningQueriesThunk()),
            // );
            // instead of above await...try...catch

            return {
                props: {
                    ...(await serverSideTranslations(locale || "", [
                        "common",
                        "home",
                    ])),
                },
            };
        },
);
