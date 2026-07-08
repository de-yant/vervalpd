<template>
  <main class="home-page">
    <!-- Animated background -->
    <div class="bg-mesh" aria-hidden="true">
      <div class="mesh-orb orb-a"></div>
      <div class="mesh-orb orb-b"></div>
      <div class="mesh-orb orb-c"></div>
      <div class="grid-lines"></div>
    </div>

    <!-- HEADER -->
    <header class="site-header">
      <button type="button" class="brand" @click="goHome">
        <span class="brand-logo">
          <GraduationCap :size="22" />
        </span>
        <span class="brand-text">
          <strong>VervalPD</strong>
          <small>{{ namaSekolah }}</small>
        </span>
      </button>

      <nav class="header-right">
      </nav>
    </header>

    <!-- HERO -->
    <section class="landing">
      <!-- LEFT -->
      <div class="left-content">
        <p class="badge">
          <ShieldCheck :size="14" />
          Aplikasi Verval Peserta Didik
        </p>

        <h1 class="hero-title">
          Cek Data
          <span class="gradient-text">Peserta Didik</span>
          Lebih Mudah
        </h1>

        <p class="subtitle hero-subtitle">
          Cari nama siswa, verifikasi menggunakan NISN dan captcha, lalu buka
          halaman detail verval peserta didik secara aman dan mudah.
        </p>

        <!-- STATS -->
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-icon">
              <Users :size="20" />
            </div>
            <div class="stat-body">
              <strong class="stat-number">{{ totalSiswa }}</strong>
              <span class="stat-label">Total Siswa</span>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="stat-item">
            <div class="stat-icon stat-icon--male">
              <Mars :size="20" />
            </div>
            <div class="stat-body">
              <strong class="stat-number">{{ totalLaki }}</strong>
              <span class="stat-label">Laki-laki</span>
            </div>
          </div>

          <div class="stat-divider"></div>

          <div class="stat-item">
            <div class="stat-icon stat-icon--female">
              <Venus :size="20" />
            </div>
            <div class="stat-body">
              <strong class="stat-number">{{ totalPerempuan }}</strong>
              <span class="stat-label">Perempuan</span>
            </div>
          </div>
        </div>

        <!-- STEPS -->
        <div class="steps-inline">
          <div class="step-pill">
            <span class="step-num">01</span>
            <Search :size="13" />
            <span>Cari Nama</span>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-pill">
            <span class="step-num">02</span>
            <BadgeCheck :size="13" />
            <span>Verifikasi</span>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-pill">
            <span class="step-num">03</span>
            <FileText :size="13" />
            <span>Buka Data</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: SEARCH CARD -->
      <div class="right-content">
        <div class="search-card card">
          <!-- Card Header -->
          <div class="card-header">
            <div class="card-logo">
              <SearchCheck :size="26" />
            </div>
            <div class="card-meta">
              <p class="eyebrow">Portal Siswa</p>
              <h2>Cari Data Siswa</h2>
              <p class="school-name">{{ namaSekolah }}</p>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="loading-box">
            <div class="loading-spinner">
              <LoaderCircle class="spin" :size="20" />
            </div>
            <span>Memuat data siswa...</span>
          </div>

          <!-- Search Area -->
          <div v-else class="search-area">
            <div class="search-wrapper">
              <div class="search-box" :class="{ 'is-focused': searchFocused }">
                <Search :size="18" class="search-icon" />
                <input
                  v-model="keyword"
                  type="text"
                  placeholder="Ketik minimal 3 huruf nama siswa..."
                  autocomplete="off"
                  @input="onSearchInput"
                  @focus="onSearchFocus"
                  @blur="searchFocused = false"
                />
                <button
                  v-if="keyword"
                  type="button"
                  class="reset-btn"
                  @click="resetSearch"
                  aria-label="Reset pencarian"
                >
                  <X :size="16" />
                </button>
              </div>

              <Transition name="dropdown">
                <div v-if="showResultBox" class="suggestion-card">
                  <button
                    v-for="(item, idx) in suggestions"
                    :key="item._key"
                    type="button"
                    class="suggestion-item"
                    :style="{ animationDelay: `${idx * 40}ms` }"
                    @click="openVerifyModal(item)"
                  >
                    <span class="student-avatar">
                      {{ getInitial(item.nama) }}
                    </span>
                    <span class="student-info">
                      <strong>{{ item.nama }}</strong>
                      <small>
                        <BookOpen :size="12" />
                        {{ item.nama_rombel || "Belum ada rombel" }}
                      </small>
                    </span>
                    <span class="suggestion-action">
                      <ChevronRight :size="16" />
                    </span>
                  </button>

                  <p v-if="searchMessage" class="suggestion-message">
                    <Info :size="16" />
                    {{ searchMessage }}
                  </p>
                </div>
              </Transition>
            </div>

            <p class="search-hint">
              <ShieldCheck :size="13" />
              Data dilindungi dengan verifikasi NISN
            </p>
          </div>
        </div>

        <!-- Feature Pills -->
        <div class="feature-pills">
          <div class="pill">
            <LockKeyhole :size="14" />
            <span>Aman &amp; Terenkripsi</span>
          </div>
          <div class="pill">
            <Users :size="14" />
            <span>Data Real-time</span>
          </div>
          <div class="pill">
            <BadgeCheck :size="14" />
            <span>Terverifikasi</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <small>© {{ currentYear }} {{ namaSekolah }}</small>
      <span class="footer-credit">
        Dikembangkan oleh <strong>HaryantoLabs</strong>
      </span>
    </footer>

    <!-- MODAL VERIFIKASI -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="modal-backdrop"
        @click.self="closeVerifyModal"
      >
        <div class="verify-modal card">
          <button type="button" class="modal-close" @click="closeVerifyModal">
            <X :size="18" />
          </button>

          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-icon">
              <LockKeyhole :size="24" />
            </div>
            <div>
              <p class="eyebrow">VervalPD App</p>
              <h3>Verifikasi Siswa</h3>
            </div>
          </div>

          <p class="modal-desc">
            Masukkan NISN dan jawab captcha untuk membuka detail verval siswa.
          </p>

          <!-- Selected Student -->
          <div class="selected-student">
            <span class="selected-avatar">
              {{ getInitial(selectedSiswa?.nama || "") }}
            </span>
            <div class="selected-info">
              <strong>{{ selectedSiswa?.nama }}</strong>
              <small>{{
                selectedSiswa?.nama_rombel || "Belum ada rombel"
              }}</small>
            </div>
          </div>

          <!-- Form -->
          <form class="modal-form" @submit.prevent="verifyStudent">
            <div class="form-field">
              <label>
                <IdCard :size="15" />
                NISN Siswa
              </label>
              <input
                v-model.trim="nisnInput"
                type="text"
                placeholder="Masukkan NISN"
                autocomplete="off"
              />
            </div>

            <div class="form-field">
              <label>
                <ShieldQuestion :size="15" />
                Captcha: berapa {{ captcha.a }} + {{ captcha.b }}?
              </label>
              <input
                v-model.trim="captchaInput"
                type="number"
                placeholder="Tulis jawaban di sini"
                autocomplete="off"
              />
            </div>

            <Transition name="fade">
              <div v-if="verifyError" class="alert-error">
                <CircleAlert :size="16" />
                <span>{{ verifyError }}</span>
              </div>
            </Transition>

            <button type="submit" class="submit-btn">
              <UnlockKeyhole :size="17" />
              Buka Data Verval
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { computed, ref, shallowRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  BadgeCheck,
  BookOpen,
  ChevronRight,
  CircleAlert,
  FileText,
  GraduationCap,
  IdCard,
  Info,
  LoaderCircle,
  LockKeyhole,
  Mars,
  Search,
  SearchCheck,
  ShieldCheck,
  ShieldQuestion,
  UnlockKeyhole,
  UserRound,
  Users,
  Venus,
  X,
} from "@/components/Icons.js";

import { getPublicSiswa } from "@/services/siswaService";
import { getSekolahAktif } from "@/services/sekolahService";

const router = useRouter();

const loading = ref(false);
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

const currentYear = new Date().getFullYear();
const namaSekolah = ref("Nama Sekolah");
const siswaRaw = ref([]);

const dataSiswa = computed(() =>
  siswaRaw.value.map((item, index) => ({
    ...item,
    _key: item.nisn || item.id || item.nipd || index,
    _searchText:
      `${item.nama || ""} ${item.nipd || ""} ${item.nisn || ""}`.toLowerCase(),
  })),
);

const totalSiswa = ref(0);
const totalLaki = ref(0);
const totalPerempuan = ref(0);

function animateValue(targetRef, endValue, duration = 5000) {
  let startValue = 0;
  const increment = Math.ceil(endValue / (duration / 16));
  const timer = setInterval(() => {
    startValue += increment;
    if (startValue >= endValue) {
      targetRef.value = endValue;
      clearInterval(timer);
    } else {
      targetRef.value = startValue;
    }
  }, 16);
}

const showResultBox = computed(
  () => suggestions.value.length > 0 || !!searchMessage.value,
);

async function loadDataAwal() {
  loading.value = true;
  searchMessage.value = "";
  try {
    const res = await getPublicSiswa();

    siswaRaw.value = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
        ? res
        : [];

    animateValue(totalSiswa, res?.totalItems || 0);
    animateValue(totalLaki, res?.totalLaki || 0);
    animateValue(totalPerempuan, res?.totalPerempuan || 0);
  } catch (err) {
    console.error("Gagal mengambil data siswa:", err);
    siswaRaw.value = [];
    searchMessage.value = "Gagal mengambil data siswa.";
  }
  try {
    const sekolahData = await getSekolahAktif();
    namaSekolah.value =
      sekolahData?.nama ||
      sekolahData?.school_name ||
      sekolahData?.nama_sekolah ||
      "Nama Sekolah";
  } catch (err) {
    console.error("Gagal mengambil data sekolah:", err);
    namaSekolah.value = "Nama Sekolah";
  } finally {
    loading.value = false;
  }
}

function onSearchInput() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(searchSiswa, 250);
}

function onSearchFocus() {
  searchFocused.value = true;
  searchSiswa();
}

function searchSiswa() {
  const key = keyword.value.trim().toLowerCase();
  suggestions.value = [];
  searchMessage.value = "";
  if (!key) return;
  if (key.length < 2) return;
  const result = [];
  for (const item of dataSiswa.value) {
    if (item._searchText.includes(key)) {
      result.push(item);
      if (result.length >= 6) break;
    }
  }
  suggestions.value = result;
  if (!result.length) {
    searchMessage.value = "Data siswa tidak ditemukan.";
  }
}

function resetSearch() {
  keyword.value = "";
  suggestions.value = [];
  searchMessage.value = "";
}

function makeCaptcha() {
  captcha.value = {
    a: Math.floor(Math.random() * 20) + 1,
    b: Math.floor(Math.random() * 20) + 1,
  };
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
}

function closeVerifyModal() {
  showModal.value = false;
  selectedSiswa.value = null;
  nisnInput.value = "";
  captchaInput.value = "";
  verifyError.value = "";
}

async function verifyStudent() {
  verifyError.value = "";

  if (!selectedSiswa.value) {
    verifyError.value = "Siswa belum dipilih.";
    return;
  }

  const nisnInputClean = String(nisnInput.value || "").trim();
  const nisnSiswaClean = String(selectedSiswa.value.nisn || "").trim();

  if (!nisnInputClean) {
    verifyError.value = "NISN wajib diisi.";
    return;
  }

  if (!nisnSiswaClean) {
    verifyError.value = "Data siswa ini belum memiliki NISN.";
    return;
  }

  if (nisnInputClean !== nisnSiswaClean) {
    verifyError.value = "NISN tidak sesuai.";
    return;
  }

  if (Number(captchaInput.value) !== captcha.value.a + captcha.value.b) {
    verifyError.value = "Jawaban captcha salah.";
    makeCaptcha();
    captchaInput.value = "";
    return;
  }

  const siswaId =
    selectedSiswa.value.id ||
    selectedSiswa.value.nisn ||
    selectedSiswa.value._key;

  if (!siswaId) {
    verifyError.value = "ID siswa tidak ditemukan.";
    return;
  }

  const idClean = String(siswaId);
  const accessTime = String(Date.now());

  localStorage.setItem("detail_siswa_id", idClean);
  localStorage.setItem("detail_siswa_nisn", nisnSiswaClean);
  localStorage.setItem("detail_siswa_access_time", accessTime);

  sessionStorage.setItem("detail_siswa_id", idClean);
  sessionStorage.setItem("detail_siswa_nisn", nisnSiswaClean);
  sessionStorage.setItem("detail_siswa_access_time", accessTime);

  showModal.value = false;

  window.location.href = `/detail/${encodeURIComponent(idClean)}`;
}

function getInitial(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((i) => i[0])
    .join("")
    .toUpperCase();
}

const goHome = () => router.push("/");

onMounted(loadDataAwal);
</script>


