<template>
  <AppLayout :subtitle="sekolahStore.nama" :footer-text="sekolahStore.nama">
    <PageLoading v-if="loading" />
    <template v-else>
      <section class="landing gap-4 lg:gap-6 overflow-x-hidden">
      <!-- HERO -->
      <div class="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_12px_32px_rgba(47,99,244,0.06)] p-5 sm:p-6 relative z-10">
        <div class="flex flex-col gap-1.5 lg:gap-2">
          <div class="inline-flex items-center gap-1.5 w-fit px-2.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[var(--primary)] text-[7px] sm:text-[9px] font-black tracking-[0.12em] uppercase">
            <ShieldCheck :size="9" />
            Portal Verifikasi Peserta Didik
          </div>

          <h1 class="font-black leading-[1] tracking-normal text-[var(--text-strong)]">
            <div class="text-[clamp(18px,2.8vw,28px)] pt-1 mb-2">Verifikasi & Validasi</div>
            <div class="text-[clamp(26px,4vw,44px)] bg-gradient-to-r from-[var(--primary)] via-[#0ea5e9] to-[#6366f1] bg-clip-text text-transparent">Data Peserta Didik</div>
        </h1>

          <div class="grid grid-cols-3 gap-2">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] hover:shadow-[0_4px_16px_rgba(47,99,244,0.08)] hover:-translate-y-0.5 transition-all duration-250">
              <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] text-white shadow-[0_3px_10px_rgba(47,99,244,0.2)] sm:shadow-[0_4px_14px_rgba(47,99,244,0.24)]">
                <Users :size="14" />
              </div>
              <div class="flex flex-col items-center sm:items-start">
                <strong class="text-[20px] font-black leading-none text-[var(--text-strong)]">{{ totalSiswa }}</strong>
                <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Peserta Didik</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] hover:shadow-[0_4px_16px_rgba(47,99,244,0.08)] hover:-translate-y-0.5 transition-all duration-250">
              <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white shadow-[0_3px_10px_rgba(37,99,235,0.2)] sm:shadow-[0_4px_14px_rgba(37,99,235,0.24)]">
                <Mars :size="14" />
              </div>
              <div class="flex flex-col items-center sm:items-start">
                <strong class="text-[20px] font-black leading-none text-[var(--text-strong)]">{{ totalLaki }}</strong>
                <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Laki-laki</span>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] hover:shadow-[0_4px_16px_rgba(47,99,244,0.08)] hover:-translate-y-0.5 transition-all duration-250">
              <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-gradient-to-br from-[#db2777] to-[#ec4899] text-white shadow-[0_3px_10px_rgba(219,39,119,0.2)] sm:shadow-[0_4px_14px_rgba(219,39,119,0.24)]">
                <Venus :size="14" />
              </div>
              <div class="flex flex-col items-center sm:items-start">
                <strong class="text-[20px] font-black leading-none text-[var(--text-strong)]">{{ totalPerempuan }}</strong>
                <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Perempuan</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- SEARCH -->
      <div id="search-card" class="w-full max-w-full lg:max-w-[520px] lg:ml-auto">
        <div v-if="networkError" class="rounded-2xl border border-[rgba(232,33,42,0.2)] bg-[rgba(232,33,42,0.06)] backdrop-blur-sm p-4 sm:p-6">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-xl grid place-items-center bg-[rgba(232,33,42,0.12)] text-[var(--danger)] flex-shrink-0"><X :size="20" /></div>
            <div class="flex-1 min-w-0">
              <strong class="block text-[14px] font-black text-[var(--text-strong)]">Koneksi Terputus</strong>
              <small class="block text-[12px] text-[var(--muted)] mt-0.5">Tidak dapat menghubungi server.</small>
            </div>
            <button type="button" class="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-[var(--danger)] text-white text-[12px] font-black whitespace-nowrap hover:brightness-110 transition-all" @click="retryLoad"><RotateCcw :size="14" /> Coba Lagi</button>
          </div>
        </div>

        <div v-else class="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_32px_80px_rgba(47,99,244,0.15),0_0_0_1px_rgba(47,99,244,0.08)] p-5 sm:p-7">
          <div v-if="loading" class="flex items-center justify-center gap-3 min-h-[120px] rounded-xl bg-[var(--surface-2)] text-[var(--muted)] text-[14px] font-bold">
            <div class="w-9 h-9 rounded-xl bg-[var(--primary-soft)] grid place-items-center text-[var(--primary)]"><LoaderCircle class="animate-spin" :size="18" /></div>
            <span>Memuat data siswa...</span>
          </div>

          <div v-else class="flex flex-col gap-4">
            <div class="flex items-center gap-3 pb-2 border-b border-[var(--border)]">
              <div class="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] text-white shadow-[0_8px_22px_rgba(47,99,244,0.3)] flex-shrink-0"><SearchCheck :size="22" /></div>
              <div class="min-w-0">
                <h2 class="m-0 text-[16px] font-black text-[var(--text-strong)] leading-none">Cari Data Siswa</h2>
                <p class="m-0 text-[10px] text-[var(--muted)] leading-tight mt-1.5">{{ sekolahStore.nama }}</p>
              </div>
            </div>

            <div class="relative">
              <div class="flex items-center gap-3 h-[48px] sm:h-[54px] px-3 sm:px-4 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface-2)] transition-all duration-250 has-[:focus]:border-[var(--primary)] has-[:focus]:bg-[var(--card)] has-[:focus]:shadow-[0_0_0_4px_var(--primary-soft),0_8px_24px_rgba(47,99,244,0.1)]">
                <Search :size="18" class="text-[var(--muted)] shrink-0" />
                <input
                  v-model="keyword"
                  type="text"
                  placeholder="Ketik minimal 3 huruf nama peserta didik..."
                  autocomplete="off"
                  class="flex-1 min-w-0 bg-transparent border-0 outline-none shadow-none text-[14px] text-[var(--text-strong)] placeholder:text-[var(--muted)] py-3"
                  @input="onSearchInput"
                  @focus="searchFocused = true; searchSiswa()"
                  @blur="searchFocused = false"
                />
                <button v-if="keyword" type="button" class="w-9 h-9 rounded-xl grid place-items-center bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:scale-105 transition-all shrink-0" @click="resetSearch" aria-label="Reset pencarian"><X :size="15" /></button>
              </div>

              <Transition name="dropdown">
                <div v-if="showResultBox" class="absolute left-0 right-0 top-full mt-2 z-[9999] max-h-[260px] overflow-y-auto p-2 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_12px_40px_rgba(15,23,42,0.15),0_0_0_1px_rgba(47,99,244,0.08)]">
                  <button v-for="(item, idx) in suggestions" :key="item._key" type="button" class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border-0 bg-transparent text-left text-[var(--text-strong)] hover:bg-[var(--primary-soft)] hover:translate-x-1 transition-all duration-180" :style="{ animationDelay: `${idx * 40}ms` }" @click="openVerifyModal(item)">
                    <span class="w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] text-white text-[12px] font-black shrink-0">{{ getInitial(item.nama) }}</span>
                    <span class="flex-1 min-w-0 grid gap-0.5">
                      <strong class="block text-[13px] font-black text-[var(--text-strong)] truncate">{{ item.nama }}</strong>
                      <small class="inline-flex items-center gap-1 text-[11.5px] text-[var(--muted)]"><BookOpen :size="11" /> {{ item.nama_rombel || "Belum ada rombel" }}</small>
                    </span>
                    <span class="w-7 h-7 rounded-lg grid place-items-center bg-[var(--primary-soft)] text-[var(--primary)] shrink-0"><ChevronRight :size="15" /></span>
                  </button>
                  <p v-if="searchMessage" class="flex items-center gap-2 px-3.5 py-3 rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] text-[13px] font-bold"><Info :size="15" /> {{ searchMessage }}</p>
                </div>
              </Transition>
            </div>

            <!-- STEPS -->
            <div class="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[var(--border)]">
              <div class="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[11.5px] font-black text-[var(--text)]">
                <span class="text-[var(--primary)] text-[9px] font-black tracking-[0.05em]">01</span>
                <Search :size="10" /><span>Cari Nama</span>
              </div>
              <span class="text-[var(--muted)] text-xs">→</span>
              <div class="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[11.5px] font-black text-[var(--text)]">
                <span class="text-[var(--primary)] text-[9px] font-black tracking-[0.05em]">02</span>
                <BadgeCheck :size="10" /><span>Verifikasi NISN</span>
              </div>
              <span class="text-[var(--muted)] text-xs">→</span>
              <div class="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[11.5px] font-black text-[var(--text)]">
                <span class="text-[var(--primary)] text-[9px] font-black tracking-[0.05em]">03</span>
                <FileText :size="10" /><span>Lihat Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LINKS -->
    <section class="w-full max-w-4xl mx-auto px-5 sm:px-8 pb-4 sm:pb-6 overflow-x-hidden">
      <div class="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_12px_32px_rgba(47,99,244,0.06)] p-6 sm:p-8 relative z-10">
        <div class="flex items-center justify-center gap-2.5 mb-5 pb-4 border-b border-[var(--border)]">
          <GraduationCap :size="14" class="text-[var(--primary)]" />
          <span class="text-[10px] font-black tracking-[0.1em] uppercase text-[var(--muted)]">Aplikasi Lainnya</span>
        </div>

        <div ref="trackRef" class="flex gap-3 overflow-x-auto" style="scrollbar-width: none; -ms-overflow-style: none;" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <a v-for="(link, i) in [...links, ...links, ...links]" :key="i" :href="link.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 h-[42px] px-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-[13px] font-black hover:bg-[var(--primary-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:-translate-y-0.5 transition-all duration-250 shrink-0">
            <span class="text-[var(--muted)] w-5 h-5 grid place-items-center">
              <School v-if="link.icon === 'school'" :size="16" />
              <ClipboardCheck v-else-if="link.icon === 'clipboard'" :size="16" />
              <svg v-else-if="link.icon === 'instagram'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </span>
            <span>{{ link.label }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- VERIFY MODAL -->
    <Transition name="modal-fade">
      <div v-if="showModal" class="fixed inset-0 z-[99999] grid place-items-center p-4 bg-[rgba(7,11,22,0.75)] backdrop-blur-sm" @click.self="closeVerifyModal">
        <div class="relative w-full max-w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_32px_80px_rgba(0,0,0,0.35)] p-6 sm:p-7">
          <button type="button" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] grid place-items-center cursor-pointer transition-all duration-200 hover:bg-[rgba(47,99,244,0.1)] hover:text-[var(--primary)] hover:border-[rgba(47,99,244,0.3)] hover:rotate-90" @click="closeVerifyModal"><X :size="16" /></button>

          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border)]">
            <div class="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] text-white shadow-[0_8px_22px_rgba(47,99,244,0.28)]"><LockKeyhole :size="22" /></div>
            <div>
              <p class="m-0 text-[9.5px] font-black tracking-[0.12em] uppercase text-[var(--primary)]">VervalPD App</p>
              <h3 class="m-0 text-[var(--text-strong)] text-[17px] font-black leading-tight" style="margin-top: 2px">Verifikasi Siswa</h3>
            </div>
          </div>

          <form class="grid gap-4" @submit.prevent="verifyStudent">
            <div class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
              <span class="w-9 h-9 flex-none rounded-lg grid place-items-center bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] text-white text-[12px] font-black shadow-[0_3px_10px_rgba(47,99,244,0.2)]">{{ getInitial(selectedSiswa?.nama || "") }}</span>
              <div class="flex-1 min-w-0">
                <strong class="block text-[var(--text-strong)] text-[13px] font-black leading-tight truncate">{{ selectedSiswa?.nama }}</strong>
                <small class="block text-[var(--muted)] text-[11px]">{{ selectedSiswa?.nama_rombel || "Belum ada rombel" }}</small>
              </div>
            </div>

            <div class="grid gap-1.5">
              <label class="inline-flex items-center gap-1.5 text-[var(--text)] text-[12.5px] font-black"><IdCard :size="14" /> NISN Siswa</label>
              <input v-model="nisnInput" type="text" placeholder="Masukkan NISN" autocomplete="off" class="w-full h-11 px-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-strong)] text-[13.5px] placeholder:text-[12px] outline-none transition-all duration-200 box-border focus:border-[var(--primary)] focus:bg-[var(--card)] focus:shadow-[0_0_0_4px_var(--primary-soft)]" />
            </div>

            <div class="grid gap-1.5">
              <label class="inline-flex items-center gap-1.5 text-[var(--text)] text-[12.5px] font-black"><ShieldQuestion :size="14" /> Captcha: berapa {{ captcha?.a }} + {{ captcha?.b }}?</label>
              <input v-model.number="captchaInput" type="number" placeholder="Tulis jawaban di sini" max="100" autocomplete="off" class="w-full h-11 px-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-strong)] text-[13.5px] placeholder:text-[12px] outline-none transition-all duration-200 box-border focus:border-[var(--primary)] focus:bg-[var(--card)] focus:shadow-[0_0_0_4px_var(--primary-soft)]" />
            </div>

            <Transition name="fade">
              <div v-if="verifyError" class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[rgba(232,33,42,0.1)] border border-[rgba(232,33,42,0.25)] text-[var(--danger)] text-[12.5px] font-bold"><CircleAlert :size="15" /> <span>{{ verifyError }}</span></div>
            </Transition>

            <button type="submit" class="w-full h-[46px] rounded-xl border-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[#0ea5e9] text-white text-[14px] font-black cursor-pointer shadow-[0_8px_24px_rgba(37,99,235,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(37,99,235,0.38)] active:translate-y-0"><UnlockKeyhole :size="17" class="vm-btn-icon" /> Buka Data Verval</button>
          </form>
        </div>
      </div>
    </Transition>
    </template>
  </AppLayout>
</template>

<script setup>
import { computed, ref, shallowRef, onMounted, onUnmounted } from "vue";
import { BadgeCheck, BookOpen, ChevronRight, CircleAlert, FileText, GraduationCap, IdCard, Info, LoaderCircle, LockKeyhole, Mars, RotateCcw, Search, SearchCheck, ShieldCheck, ShieldQuestion, UnlockKeyhole, Users, Venus, X, School, ClipboardCheck } from "@/components/Icons.js";
import { useUiStore } from "@/stores/ui";
import { useSekolahStore } from "@/stores/sekolah";
import { getPublicSiswa } from "@/services/siswaService";
import AppLayout from "@/layouts/AppLayout.vue";
import PageLoading from "@/components/PageLoading.vue";

const ui = useUiStore();
const sekolahStore = useSekolahStore();

const loading = ref(false);
const networkError = ref(false);
const keyword = ref("");
const suggestions = shallowRef([]);
const searchMessage = ref("");
const searchFocused = ref(false);

const showModal = ref(false);
const selectedSiswa = ref(null);
const nisnInput = ref("");
const captchaInput = ref("");
const verifyError = ref("");
const captcha = ref({ a: 0, b: 0 });

let searchTimer = null;

const siswaRaw = ref([]);

const dataSiswa = computed(() =>
  siswaRaw.value.map((item, index) => ({
    ...item,
    _key: item.nisn || item.id || item.nipd || index,
    _searchText: `${item.nama || ""} ${item.nipd || ""} ${item.nisn || ""}`.toLowerCase(),
  })),
);

const totalSiswa = ref(0);
const totalLaki = ref(0);
const totalPerempuan = ref(0);

const showResultBox = computed(() => suggestions.value.length > 0 || !!searchMessage.value);

function animateValue(targetRef, endValue, duration = 5000) {
  let startValue = 0;
  const increment = Math.ceil(endValue / (duration / 16));
  const timer = setInterval(() => {
    startValue += increment;
    if (startValue >= endValue) { targetRef.value = endValue; clearInterval(timer); }
    else { targetRef.value = startValue; }
  }, 16);
}

async function loadDataAwal() {
  loading.value = true;
  networkError.value = false;
  searchMessage.value = "";
  let siswaFailed = false;
  try {
    const res = await getPublicSiswa();
    siswaRaw.value = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    animateValue(totalSiswa, res?.totalItems || 0);
    animateValue(totalLaki, res?.totalLaki || 0);
    animateValue(totalPerempuan, res?.totalPerempuan || 0);
  } catch (err) {
    console.error("Gagal mengambil data siswa:", err);
    siswaRaw.value = [];
    siswaFailed = true;
  } finally {
    loading.value = false;
    if (siswaFailed) {
      networkError.value = true;
      ui.alert({ type: "error", title: "Server Error", message: "Server sedang mengalami gangguan. Silakan coba kembali beberapa saat lagi." });
    }
  }
}

function retryLoad() { loadDataAwal(); }

function onSearchInput() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(searchSiswa, 250);
}

function searchSiswa() {
  const key = keyword.value.trim().toLowerCase();
  suggestions.value = [];
  searchMessage.value = "";
  if (!key || key.length < 2) return;
  const result = [];
  for (const item of dataSiswa.value) {
    if (item._searchText.includes(key)) { result.push(item); if (result.length >= 6) break; }
  }
  suggestions.value = result;
  if (!result.length) searchMessage.value = "Data siswa tidak ditemukan.";
}

function resetSearch() {
  keyword.value = "";
  suggestions.value = [];
  searchMessage.value = "";
}

function makeCaptcha() {
  captcha.value = { a: Math.floor(Math.random() * 50) + 1, b: Math.floor(Math.random() * 50) + 1 };
}

function openVerifyModal(item) {
  selectedSiswa.value = item;
  nisnInput.value = "";
  captchaInput.value = "";
  verifyError.value = "";
  suggestions.value = [];
  searchMessage.value = "";
  makeCaptcha();
  showModal.value = true;
  document.body.classList.add("modal-open");
}

function closeVerifyModal() {
  showModal.value = false;
  selectedSiswa.value = null;
  nisnInput.value = "";
  captchaInput.value = "";
  verifyError.value = "";
  document.body.classList.remove("modal-open");
}

async function verifyStudent() {
  verifyError.value = "";
  if (!selectedSiswa.value) { verifyError.value = "Siswa belum dipilih."; return; }
  const nisnInputClean = String(nisnInput.value || "").trim();
  const nisnSiswaClean = String(selectedSiswa.value.nisn || "").trim();
  if (!nisnInputClean) { verifyError.value = "NISN wajib diisi."; return; }
  if (!nisnSiswaClean) { verifyError.value = "Data siswa ini belum memiliki NISN."; return; }
  if (nisnInputClean !== nisnSiswaClean) { verifyError.value = "NISN tidak sesuai."; return; }
  if (Number(captchaInput.value) !== captcha.value.a + captcha.value.b) { verifyError.value = "Jawaban captcha salah."; makeCaptcha(); captchaInput.value = ""; return; }
  const siswaId = selectedSiswa.value.id || selectedSiswa.value.nisn || selectedSiswa.value._key;
  if (!siswaId) { verifyError.value = "ID siswa tidak ditemukan."; return; }
  const idClean = String(siswaId);
  localStorage.setItem("detail_siswa_id", idClean);
  localStorage.setItem("detail_siswa_nisn", nisnSiswaClean);
  localStorage.setItem("detail_siswa_access_time", String(Date.now()));
  sessionStorage.setItem("detail_siswa_id", idClean);
  sessionStorage.setItem("detail_siswa_nisn", nisnSiswaClean);
  sessionStorage.setItem("detail_siswa_access_time", String(Date.now()));
  showModal.value = false;
  window.location.href = `/detail/${encodeURIComponent(idClean)}`;
}

function getInitial(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((i) => i[0]).join("").toUpperCase();
}

// LINKS SLIDER
const links = [
  { label: "Website Sekolah", url: "https://smk2lppmri.sch.id", icon: "school" },
  { label: "Absensi Online", url: "https://absensi.smk2lppmri.sch.id", icon: "clipboard" },
  { label: "Instagram", url: "https://www.instagram.com/smk2lppmrimajalaya?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: "instagram" },
];

const trackRef = ref(null);
let animId = null;

function scrollStep() {
  const el = trackRef.value;
  if (!el) return;
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) return;
  el.scrollLeft += 0.5;
  if (el.scrollLeft >= maxScroll) el.scrollLeft = 0;
  animId = requestAnimationFrame(scrollStep);
}

function pauseScroll() { if (animId) cancelAnimationFrame(animId); }
function resumeScroll() { animId = requestAnimationFrame(scrollStep); }

onMounted(() => {
  sekolahStore.fetchSekolah();
  loadDataAwal();
  animId = requestAnimationFrame(scrollStep);
});

onUnmounted(() => { if (animId) cancelAnimationFrame(animId); });

</script>
