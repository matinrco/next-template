import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/rtk/store";
import { weatherApis } from "@/rtk/query/weather";
import { slice as sharedSlice } from "@/rtk/slices/shared";
import { Page as RootPage } from "@/containers/root/Page";

export default RootPage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ locale }) => {
            /**
             * here is sample state and api hydration
             */

            const city = "tehran";
            const { updateCity } = { ...sharedSlice.actions };
            store.dispatch(updateCity(city));

            try {
                await store
                    .dispatch(
                        weatherApis.endpoints.getWeather.initiate({
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
