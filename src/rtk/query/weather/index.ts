import { api } from "@/rtk/query";
import type { GetWeatherReq, GetWeatherRes } from "./types";

export const weatherApis = api.injectEndpoints({
    endpoints: (builder) => ({
        getWeather: builder.query<GetWeatherRes, GetWeatherReq>({
            query: ({ city }) => ({
                url: `https://wttr.in/${city}?format=j1`,
                credentials: "omit",
            }),
        }),
    }),
    overrideExisting: false,
});
