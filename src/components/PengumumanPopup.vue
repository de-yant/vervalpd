<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible && pengumuman" class="peng-overlay" @click.self="close">
        <div class="peng-card">
          <div class="peng-head">
            <div class="peng-icon"><Megaphone :size="26" /></div>
            <h3>{{ pengumuman.judul }}</h3>
            <span class="peng-badge">Pengumuman</span>
          </div>

          <div class="peng-body" v-html="renderedIsi"></div>

          <div class="peng-foot">
            <label class="peng-skip">
              <input type="checkbox" v-model="skipFuture" />
              <span>Jangan tampilkan lagi</span>
            </label>
            <button type="button" class="peng-btn" @click="close">
              <Check :size="15" /> Saya mengerti
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Megaphone, Check } from "lucide-vue-next";
import { getPublicPengumuman } from "@/services/pengumumanService";

const emit = defineEmits(["close"]);

const visible = ref(false);
const pengumuman = ref(null);
const skipFuture = ref(false);

// Simpan ID pengumuman yang di-dismiss user di localStorage.
// Popup tidak muncul lagi untuk pengumuman yang sama sampai admin
// membuat/memperbarui pengumuman (ID berubah).
const SKIP_KEY = "verval_pengumuman_dismissed";

// Filter: hanya yang hari ini berada dalam rentang tanggal tampil
function isWithinRange(p) {
  if (!p.tanggal_mulai || !p.tanggal_selesai) return true;
  const fmt = (d) => {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  };
  const today = fmt(new Date());
  return today >= fmt(p.tanggal_mulai) && today <= fmt(p.tanggal_selesai);
}

async function load() {
  try {
    const res = await getPublicPengumuman("verval");
    const list = Array.isArray(res?.data) ? res.data : [];
    // Tampilkan yang pertama masih aktif & dalam rentang tanggal & belum di-dismiss
    const dismissed = JSON.parse(localStorage.getItem(SKIP_KEY) || "[]");
    pengumuman.value =
      list.find(
        (p) => p.status !== false && isWithinRange(p) && !dismissed.includes(p.id)
      ) || null;
    if (pengumuman.value) visible.value = true;
  } catch {}
}

function close() {
  // Jika user centang "jangan tampilkan lagi", simpan ID-nya
  if (skipFuture.value && pengumuman.value) {
    try {
      const dismissed = JSON.parse(localStorage.getItem(SKIP_KEY) || "[]");
      dismissed.push(pengumuman.value.id);
      localStorage.setItem(SKIP_KEY, JSON.stringify(dismissed.slice(-20)));
    } catch {}
  }
  visible.value = false;
  emit("close");
}

onMounted(load);

const renderedIsi = computed(() => pengumuman.value?.isi || "");
</script>

<style scoped>
.peng-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
}

.peng-card {
  background: var(--color-card, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: min(420px, 100%);
  max-height: 85vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.peng-head {
  text-align: center;
  padding: 22px 20px 12px;
}

.peng-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 10px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--color-primary, #2f63f4) 0%, #0ea5e9 100%);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.28);
}

.peng-head h3 {
  margin: 0 0 6px;
  color: var(--color-text-strong, #111827);
  font-size: 17px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.peng-badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.14);
  color: #2563eb;
  font-size: 11px;
  font-weight: 800;
}

.peng-body {
  padding: 4px 22px 8px;
  color: var(--color-text-strong, #1f2937);
  font-size: 13.5px;
  line-height: 1.65;
}
.peng-body :deep(b),
.peng-body :deep(strong) { color: var(--color-text-strong, #111827); }
.peng-body :deep(ul),
.peng-body :deep(ol) { margin: 6px 0; padding-left: 20px; }

.peng-foot {
  padding: 8px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.peng-skip {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  color: var(--color-muted, #6b7280);
  user-select: none;
}

.peng-skip input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  aspect-ratio: 1 / 1;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.peng-skip input:hover {
  border-color: #93c5fd;
}

.peng-skip input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(47, 99, 246, 0.35);
}

.peng-skip input:checked {
  border-color: #2f63f4;
  background-color: #2f63f4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-size: 10px 10px;
  background-position: center;
  background-repeat: no-repeat;
}

.peng-skip input:hover {
  border-color: #93c5fd;
}

.peng-skip input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(47, 99, 246, 0.4);
}

.peng-skip span {
  font-size: 12px;
  color: #6b7280;
  user-select: none;
}

.peng-btn {
  width: 100%;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-primary, #2f63f4) 0%, #0ea5e9 100%);
  color: #fff;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
}
.peng-btn:hover { opacity: 0.92; transform: translateY(-1px); }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
