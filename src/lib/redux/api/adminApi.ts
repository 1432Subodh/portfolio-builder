import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type AdminRole = "admin" | "superadmin";

export interface AdminItem {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}

export interface UpdateAdminInput {
  id: string;
  body: {
    name?: string;
    email?: string;
    password?: string;
    role?: AdminRole;
    isActive?: boolean;
  };
}

export interface ComponentCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComponentCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateComponentCategoryInput {
  id: string;
  body: {
    name?: string;
    description?: string;
    isActive?: boolean;
  };
}

export interface ComponentItem {
  id: string;
  categoryId: string;
  category?: { id: string; name: string } | null;
  name: string;
  slug: string;
  componentSlug?: string;
  type?: string;
  description?: string;
  isActive: boolean;
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComponentInput {
  categoryId: string;
  name: string;
  type?: string;
  componentSlug?: string;
  description?: string;
  isActive?: boolean;
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
}

export interface UpdateComponentInput {
  id: string;
  body: {
    categoryId?: string;
    name?: string;
    type?: string;
    componentSlug?: string;
    description?: string;
    isActive?: boolean;
    content?: Record<string, unknown>;
    theme?: Record<string, unknown>;
  };
}

function slugifyLocal(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Admin", "ComponentCategory", "Component"],
  endpoints: (builder) => ({
    getAdmins: builder.query<AdminItem[], void>({
      query: () => ({ url: "/admin" }),
      providesTags: (result = []) => [
        { type: "Admin", id: "LIST" },
        ...result.map((a) => ({ type: "Admin" as const, id: a.id })),
      ],
    }),
    createAdmin: builder.mutation<AdminItem, CreateAdminInput>({
      query: (body) => ({ url: "/admin", method: "POST", body }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        let tempId = "";
        const patch = dispatch(
          adminApi.util.updateQueryData("getAdmins", undefined, (draft) => {
            tempId = `pending-${Date.now()}`;
            draft.unshift({
              id: tempId,
              name: _body.name,
              email: _body.email,
              role: _body.role,
              isActive: true,
              lastLoginAt: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getAdmins", undefined, (draft) => {
              const idx = draft.findIndex((a) => a.id === tempId);
              if (idx >= 0) draft[idx] = data;
              else draft.unshift(data);
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    updateAdmin: builder.mutation<AdminItem, UpdateAdminInput>({
      query: ({ id, body }) => ({ url: `/admin/${id}`, method: "PATCH", body }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getAdmins", undefined, (draft) => {
            const target = draft.find((a) => a.id === id);
            if (!target) return;
            if (body.name !== undefined) target.name = body.name;
            if (body.email !== undefined) target.email = body.email;
            if (body.role !== undefined) target.role = body.role;
            if (body.isActive !== undefined) target.isActive = body.isActive;
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getAdmins", undefined, (draft) => {
              const idx = draft.findIndex((a) => a.id === id);
              if (idx >= 0) draft[idx] = data;
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    deleteAdmin: builder.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/admin/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getAdmins", undefined, (draft) => {
            const idx = draft.findIndex((a) => a.id === id);
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

    getCategories: builder.query<ComponentCategoryItem[], void>({
      query: () => ({ url: "/admin/categories" }),
      providesTags: (result = []) => [
        { type: "ComponentCategory", id: "LIST" },
        ...result.map((c) => ({ type: "ComponentCategory" as const, id: c.id })),
      ],
    }),
    createCategory: builder.mutation<ComponentCategoryItem, CreateComponentCategoryInput>({
      query: (body) => ({ url: "/admin/categories", method: "POST", body }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        let tempId = "";
        const patch = dispatch(
          adminApi.util.updateQueryData("getCategories", undefined, (draft) => {
            tempId = `pending-${Date.now()}`;
            draft.unshift({
              id: tempId,
              name: _body.name,
              slug: slugifyLocal(_body.name),
              description: _body.description ?? "",
              isActive: _body.isActive ?? true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getCategories", undefined, (draft) => {
              const idx = draft.findIndex((c) => c.id === tempId);
              if (idx >= 0) draft[idx] = data;
              else draft.unshift(data);
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    updateCategory: builder.mutation<
      ComponentCategoryItem,
      UpdateComponentCategoryInput
    >({
      query: ({ id, body }) => ({ url: `/admin/categories/${id}`, method: "PATCH", body }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getCategories", undefined, (draft) => {
            const target = draft.find((c) => c.id === id);
            if (!target) return;
            if (body.name !== undefined) {
              target.name = body.name;
              target.slug = slugifyLocal(body.name);
            }
            if (body.description !== undefined) target.description = body.description;
            if (body.isActive !== undefined) target.isActive = body.isActive;
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getCategories", undefined, (draft) => {
              const idx = draft.findIndex((c) => c.id === id);
              if (idx >= 0) draft[idx] = data;
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    deleteCategory: builder.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/admin/categories/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getCategories", undefined, (draft) => {
            const idx = draft.findIndex((c) => c.id === id);
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

    getComponents: builder.query<ComponentItem[], void>({
      query: () => ({ url: "/admin/components" }),
      providesTags: (result = []) => [
        { type: "Component", id: "LIST" },
        ...result.map((c) => ({ type: "Component" as const, id: c.id })),
      ],
    }),
    getEditorComponents: builder.query<ComponentItem[], void>({
      query: () => ({ url: "/components" }),
      providesTags: (result = []) => [
        { type: "Component", id: "LIST" },
        ...result.map((c) => ({ type: "Component" as const, id: c.id })),
      ],
    }),
    createComponent: builder.mutation<ComponentItem, CreateComponentInput>({
      query: (body) => ({ url: "/admin/components", method: "POST", body }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        let tempId = "";
        const patch = dispatch(
          adminApi.util.updateQueryData("getComponents", undefined, (draft) => {
            tempId = `pending-${Date.now()}`;
            draft.unshift({
              id: tempId,
              categoryId: _body.categoryId,
              category: null,
              name: _body.name,
              slug: slugifyLocal(_body.name),
              componentSlug:
                _body.componentSlug ?? slugifyLocal(_body.type || _body.name),
              type: _body.type ?? "",
              description: _body.description ?? "",
              isActive: _body.isActive ?? true,
              content: _body.content ?? {},
              theme: _body.theme ?? {},
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getComponents", undefined, (draft) => {
              const idx = draft.findIndex((c) => c.id === tempId);
              if (idx >= 0) draft[idx] = data;
              else draft.unshift(data);
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    updateComponent: builder.mutation<ComponentItem, UpdateComponentInput>({
      query: ({ id, body }) => ({ url: `/admin/components/${id}`, method: "PATCH", body }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getComponents", undefined, (draft) => {
            const target = draft.find((c) => c.id === id);
            if (!target) return;
            if (body.name !== undefined) {
              target.name = body.name;
              target.slug = slugifyLocal(body.name);
            }
            if (body.categoryId !== undefined) {
              target.categoryId = body.categoryId;
              target.category = null;
            }
            if (body.type !== undefined) target.type = body.type;
            if (body.componentSlug !== undefined) {
              target.componentSlug = body.componentSlug;
            }
            if (body.content !== undefined) target.content = body.content;
            if (body.theme !== undefined) target.theme = body.theme;
            if (body.description !== undefined) target.description = body.description;
            if (body.isActive !== undefined) target.isActive = body.isActive;
          })
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getComponents", undefined, (draft) => {
              const idx = draft.findIndex((c) => c.id === id);
              if (idx >= 0) draft[idx] = data;
            })
          );
        } catch {
          patch.undo();
        }
      },
    }),
    deleteComponent: builder.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/admin/components/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          adminApi.util.updateQueryData("getComponents", undefined, (draft) => {
            const idx = draft.findIndex((c) => c.id === id);
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

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetComponentsQuery,
  useGetEditorComponentsQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
} = adminApi;
