import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import DetailPage from "@/views/DetailPage.vue";
import NotFoundPage from "@/views/error/NotFoundPage.vue";
import ErrorPage from "@/views/error/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/detail/:id",
    name: "DetailSiswa",
    component: DetailPage,
    props: true,
    meta: { requiresStudentAccess: true },
  },

  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
    props: (route) => ({
      code: route.query.code || "500",
      title: route.query.title || "Terjadi Kesalahan",
      description: route.query.description || "Maaf, terjadi kesalahan pada server. Silakan coba kembali beberapa saat lagi.",
    }),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
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
