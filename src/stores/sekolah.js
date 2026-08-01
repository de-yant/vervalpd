import { defineStore } from "pinia";
import { getSekolahAktif } from "@/services/sekolahService";

export const useSekolahStore = defineStore("sekolah", {
  state: () => ({
    nama: "Nama Sekolah",
    npsn: "-",
    bentuk_pendidikan: "",
    periodeId: "",
    tahunAjaran: "",
    semester: "",
    loaded: false,
  }),

  actions: {
    async fetchSekolah() {
      try {
        const data = await getSekolahAktif();

        this.nama = data?.nama || data?.school_name || data?.nama_sekolah || "Nama Sekolah";
        this.npsn = data?.npsn || "-";
        this.bentuk_pendidikan = data?.bentuk_pendidikan || "";
        this.periodeId = data?.periode?.id || "";
        this.tahunAjaran = data?.periode?.tahun_ajaran || "";
        this.semester = data?.periode?.semester || "";
        this.loaded = true;
      } catch {
        this.nama = "Nama Sekolah";
      }
    },
  },
});
