const routes = {
  // Public
  root: "/",

  // Only guest
  auth: {
    root: "/auth",
    login: "/auth/login",
  },

  // Only logged in
  admin: {
    tasks: {
      list: "/admin",
      create: "/admin/tasks/create",
      edit: (id: string) => `/admin/tasks/edit/${id}`,
    },
    profile: {
      root: "/admin/profile",
    },
  },
};

export default routes;
