import { baseApi } from "../baseApi";

export type LandingEarningLiveResponse = any;

export const landingEarningLiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    landingEarningLive: build.query<LandingEarningLiveResponse, void>({
      query: () => ({
        url: "/withdraw/live-earning",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLandingEarningLiveQuery, useLazyLandingEarningLiveQuery } =
  landingEarningLiveApi;
