const hostname = window.location.hostname;

export const APP_CONFIG = {
  API_URL:
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://localhost:3001"
      : "https://apivervalpd.developerin.my.id",

  PB_URL:
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "http://localhost:8091"
      : "https://database.developerin.my.id",

  LICENSE_API: "https://lisense.developerin.my.id/api/license",
};

export default APP_CONFIG;
