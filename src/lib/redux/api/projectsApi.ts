import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ProjectSection {
  id: string;
  name: string;
  type: string;
  componentSlug?: string;
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
  initialContent?: Record<string, unknown>;
  initialTheme?: Record<string, unknown>;
  visible: boolean;
  locked: boolean;
}

export interface Project {
  _id: string;
  name: string;
  slug: string;
  template?: string;
  sections?: ProjectSection[];
  settings?: Record<string, unknown>;
  published: boolean;
  publishedUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateProjectInput = Partial<
  Pick<Project, "name" | "sections" | "settings" | "published">
>;

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
    getProject: builder.query<Project, string>({
      query: (id) => ({ url: `/projects/${id}` }),
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),
    createProject: builder.mutation<{ _id: string }, { name: string; template?: string }>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation<Project, { id: string; patch: UpdateProjectInput }>({
      query: ({ id, patch }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          projectsApi.util.updateQueryData("getProjects", undefined, (draft) => {
            const p = draft.find((x) => x._id === id);
            if (p) Object.assign(p, patch);
          })
        );
        const patchOne = dispatch(
          projectsApi.util.updateQueryData("getProject", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            projectsApi.util.updateQueryData("getProject", id, () => data)
          );
          dispatch(
            projectsApi.util.updateQueryData("getProjects", undefined, (draft) => {
              const i = draft.findIndex((x) => x._id === id);
              if (i >= 0) draft[i] = data;
            })
          );
        } catch {
          patchList.undo();
          patchOne.undo();
        }
      },
    }),
    deleteProject: builder.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          projectsApi.util.updateQueryData("getProjects", undefined, (draft) => {
            const idx = draft.findIndex((p) => p._id === id);
            if (idx >= 0) draft.splice(idx, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;