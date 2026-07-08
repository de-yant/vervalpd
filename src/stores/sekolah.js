import { defineStore } from "pinia";
import { getSekolahAktif } from "@/services/sekolahService";

const TTL = 7 * 24 * 60 * 60 * 1000;

export const useSekolahStore = defineStore("sekolah", {
  state: () => ({
    nama: "Nama Sekolah",
    npsn: "-",
    bentuk_pendidikan: "",
    loaded: false,
    lastFetched: null,
  }),

  actions: {
    async fetchSekolah(force = false) {
      const expired = this.lastFetched && Date.now() - this.lastFetched > TTL;

      if (this.loaded && !force && !expired) return;

      try {
        const data = await getSekolahAktif();

        this.nama =
          data?.nama ||
          data?.school_name ||
          data?.nama_sekolah ||
          "Nama Sekolah";

        this.npsn = data?.npsn || "-";
        this.bentuk_pendidikan = data?.bentuk_pendidikan || "";
        this.loaded = true;
        this.lastFetched = Date.now();
      } catch {
        this.nama = "Nama Sekolah";
      }
    },
  },
});
