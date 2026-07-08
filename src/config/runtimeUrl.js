export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL;
}

export function getPengajuanFileUrl(id, fileName) {
  if (!id || !fileName) return "";

  return `${import.meta.env.VITE_API_URL}/api/pengajuan/${id}/file/${fileName}`;
}