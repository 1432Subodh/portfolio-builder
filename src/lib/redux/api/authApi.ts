import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SessionUser {
  id: string;
  role: string;
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface UserSession {
  user?: SessionUser;
  expires?: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["authSession"],
  endpoints: (builder) => ({
    getSession: builder.query<UserSession, void>({
      query: () => ({ url: "/auth/session" }),
      providesTags: ["authSession"],
    }),
  }),
});

export const { useGetSessionQuery } = authApi;