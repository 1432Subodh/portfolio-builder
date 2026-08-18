import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  _id: string;
  name: string;
  slug: string;
  template?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => ({ url: "/projects" }),
      providesTags: (result = []) => [
        { type: "Project", id: "LIST" },
        ...result.map((p) => ({ type: "Project" as const, id: p._id })),
      ],
    }),
    deleteProject: builder.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          projectsApi.util.updateQueryData("getProjects", undefined, (draft) => {
            const idx = draft.findIndex((p) => p._id === id);
            if (idx >= 0) draft.splice(idx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const { useGetProjectsQuery, useDeleteProjectMutation } = projectsApi;
