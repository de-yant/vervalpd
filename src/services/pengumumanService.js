// src/services/pengumumanService.js
import api from "./api";

// PUBLIC - ambil pengumuman aktif untuk popup (target: verval)
export async function getPublicPengumuman(target = "verval", limit = 5) {
  const res = await api.get("/api/pengumuman/public", {
    params: {
      target_app: target,
      limit,
      _t: Date.now(), // cache-buster agar selalu data terbaru
    },
  });

  return res.data;
}
