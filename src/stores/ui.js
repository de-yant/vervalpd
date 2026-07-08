import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    toasts: [],

    modal: {
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "Ya",
      cancelText: "Batal",
      showCancel: true,
      loading: false,
      onConfirm: null,
      onCancel: null,
    },
  }),

  actions: {
    showToast({
      type = "info",
      title = "",
      message = "",
      duration = 3000,
    } = {}) {
      const id = `${Date.now()}-${Math.random()}`;

      const toast = {
        id,
        type,
        title,
        message,
        duration,
        timer: null,
      };

      this.toasts.push(toast);

      if (type !== "loading" && duration > 0) {
        toast.timer = setTimeout(() => {
          this.hideToast(id);
        }, duration);
      }
    },

    hideToast(id) {
      if (!id) {
        this.toasts.forEach((toast) => {
          if (toast.timer) clearTimeout(toast.timer);
        });

        this.toasts = [];
        return;
      }

      const toast = this.toasts.find((item) => item.id === id);

      if (toast?.timer) {
        clearTimeout(toast.timer);
      }

      this.toasts = this.toasts.filter((item) => item.id !== id);
    },

    success(message = "Berhasil diproses.", title = "Berhasil") {
      this.showToast({
        type: "success",
        title,
        message,
      });
    },

    error(message = "Terjadi kesalahan.", title = "Gagal") {
      this.showToast({
        type: "error",
        title,
        message,
        duration: 4000,
      });
    },

    warning(message = "Periksa kembali data Anda.", title = "Peringatan") {
      this.showToast({
        type: "warning",
        title,
        message,
        duration: 3500,
      });
    },

    info(message = "Informasi terbaru tersedia.", title = "Informasi") {
      this.showToast({
        type: "info",
        title,
        message,
      });
    },

    loading(message = "Sedang memproses data...", title = "Mohon tunggu") {
      this.showToast({
        type: "loading",
        title,
        message,
        duration: 0,
      });
    },

    showModal({
      type = "info",
      title = "",
      message = "",
      confirmText = "Ya",
      cancelText = "Batal",
      showCancel = true,
      onConfirm = null,
      onCancel = null,
    } = {}) {
      this.modal.show = true;
      this.modal.type = type;
      this.modal.title = title;
      this.modal.message = message;
      this.modal.confirmText = confirmText;
      this.modal.cancelText = cancelText;
      this.modal.showCancel = showCancel;
      this.modal.loading = false;
      this.modal.onConfirm = onConfirm;
      this.modal.onCancel = onCancel;
    },

    closeModal() {
      if (typeof this.modal.onCancel === "function") {
        this.modal.onCancel();
      }

      this.resetModal();
    },

    async confirmModal() {
      if (this.modal.loading) return;

      const action = this.modal.onConfirm;

      this.resetModal();

      try {
        if (typeof action === "function") {
          await Promise.resolve(action());
        }
      } catch (err) {
        console.error("Modal Error:", err);
        this.error(err?.message || "Aksi gagal diproses.", "Terjadi Kesalahan");
      }
    },

    resetModal() {
      this.modal.show = false;
      this.modal.type = "info";
      this.modal.title = "";
      this.modal.message = "";
      this.modal.confirmText = "Ya";
      this.modal.cancelText = "Batal";
      this.modal.showCancel = true;
      this.modal.loading = false;
      this.modal.onConfirm = null;
      this.modal.onCancel = null;
    },

    confirm({
      title = "Konfirmasi",
      message = "Apakah Anda yakin?",
      confirmText = "Ya",
      cancelText = "Batal",
      onConfirm = null,
    } = {}) {
      this.showModal({
        type: "warning",
        title,
        message,
        confirmText,
        cancelText,
        showCancel: true,
        onConfirm,
      });
    },

    alert({
      type = "info",
      title = "Informasi",
      message = "",
      confirmText = "Mengerti",
    } = {}) {
      this.showModal({
        type,
        title,
        message,
        confirmText,
        showCancel: false,
      });
    },

    danger({
      title = "Hapus Data?",
      message = "Data yang dihapus tidak bisa dikembalikan.",
      confirmText = "Hapus",
      cancelText = "Batal",
      onConfirm = null,
    } = {}) {
      this.showModal({
        type: "danger",
        title,
        message,
        confirmText,
        cancelText,
        showCancel: true,
        onConfirm,
      });
    },
  },
});