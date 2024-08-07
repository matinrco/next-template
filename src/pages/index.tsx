import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/rtk/store";
import { api } from "@/rtk/query";
import { actions } from "@/rtk/slices/shared";
import { Root } from "@/containers/Root";

export default Root;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            /**
             * here is sample state and api hydration
             */

            const city = "tehran";
            const { updateCity } = actions;
            store.dispatch(updateCity(city));

            try {
                const data = await store
                    .dispatch(
                        api.endpoints.getWeather.initiate({
                            city,
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
                        "root",
                    ])),
                },
            };
        },
);
