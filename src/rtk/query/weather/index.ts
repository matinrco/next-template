import { slice } from "./slice";
import type { GetWeatherReq, GetWeatherRes } from "./types";

export const weatherApis = slice.injectEndpoints({
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
