import api from "./api";

export async function getSekolahAktif() {
  try {
    const res = await api.get("/api/sekolah/aktif");

    const payload = res?.data ?? res;

    return payload?.data || {};
  } catch (err) {
    console.error("Gagal mengambil sekolah aktif:", err);

    return {
      id: "",
      nama: "Nama Sekolah",
      npsn: "-",
      bentuk_pendidikan: "",
    };
  }
}