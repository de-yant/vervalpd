import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },

  {
    path: "/detail/:id",
    name: "DetailSiswa",
    component: () => import("@/views/DetailPage.vue"),
    props: true,
    meta: { requiresStudentAccess: true },
  },

  {
    path: "/error",
    name: "Error",
    component: () => import("@/views/error/ErrorPage.vue"),
    props: (route) => ({
      code: route.query.code || "500",
      title: route.query.title || "Terjadi Kesalahan",
      description: route.query.description || "Maaf, terjadi kesalahan pada server. Silakan coba kembali beberapa saat lagi.",
    }),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (to.meta.requiresStudentAccess) {
    const allowedId =
      localStorage.getItem("detail_siswa_id") ||
      sessionStorage.getItem("detail_siswa_id");

    const allowedNisn =
      localStorage.getItem("detail_siswa_nisn") ||
      sessionStorage.getItem("detail_siswa_nisn");

    if (!allowedId || !allowedNisn) {
      return "/";
    }

    if (String(allowedId) !== String(to.params.id)) {
      return "/";
    }
  }

  return true;
});

export default router;
