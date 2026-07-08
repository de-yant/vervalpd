// src/services/siswaService.js
import api from "./api";


// ADMIN — dibatasi untuk tabel admin + bisa filter dari global search
export async function getDataSiswa(page = 1, perPage = 10, q = "") {
  const res = await api.get("/api/siswa", {
    params: {
      page,
      perPage,
      q: q || undefined,
    },
  });

  return res.data;
}

// PUBLIC — tidak dibatasi untuk pencarian homepage
export async function getPublicSiswa() {
  const res = await api.get("/api/siswa/public");

  return res.data;
}
// ADMIN — detail satu siswa, NIK tanpa sensor
export async function getDetailSiswa(id) {
  const res = await api.get(`/api/siswa/detail/${id}`);
  return res.data?.data || null;
}

// PUBLIC — detail satu siswa, NIK tersensor
export async function getPublicDetailSiswa(id) {
  const res = await api.get(`/api/siswa/public/detail/${id}`);
  return res.data?.data || null;
}