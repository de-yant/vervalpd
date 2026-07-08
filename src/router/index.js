import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import DetailPage from "@/views/DetailPage.vue";

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
    path: "/:pathMatch(.*)*",
    redirect: "/",
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
