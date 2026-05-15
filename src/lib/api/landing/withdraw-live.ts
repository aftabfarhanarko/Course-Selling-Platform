import { baseApi } from "../baseApi";

export type LandingWithdrawLiveResponse = Record<string, unknown>;

export const landingWithdrawLiveApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    landingWithdrawLive: build.query<LandingWithdrawLiveResponse, void>({
      query: () => ({
        url: "/withdraw/live",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLandingWithdrawLiveQuery, useLazyLandingWithdrawLiveQuery } =
  landingWithdrawLiveApi;