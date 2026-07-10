<template>
  <AppLayout :subtitle="sekolahStore.nama" :footer-text="sekolahStore.nama" page-class="detail-page">
    <!-- ── LOADING ── -->
    <PageLoading v-if="loading" />

    <!-- ── ERROR ── -->
    <div v-else-if="error" class="state-card state-card--error">
      <div class="state-icon state-icon--error">
        <CircleAlert :size="24" />
      </div>
      <div>
        <h2>{{ error }}</h2>
        <p>Data tidak ditemukan atau gagal dimuat.</p>
      </div>
    </div>

    <!-- ── CONTENT ── -->
    <template v-else-if="siswa">
      <!-- PAGE HEADER — konsisten dengan admin -->
      <div class="page-header mt-4">
        <div class="page-header-left">
          <div class="page-header-icon">
            <UserRound :size="20" />
          </div>
          <div class="page-header-text">
            <p class="page-eyebrow">Detail Peserta Didik</p>
            <h1>{{ display(getField("nama")) }}</h1>
            <div class="page-sub-row">
              <span class="page-sub-chip">
                <Hash :size="11" />
                {{ display(getField("nisn")) }}
              </span>
              <span
                v-if="getField('nama_rombel') !== '-'"
                class="page-sub-chip"
              >
                {{ getField("nama_rombel") }}
              </span>
            </div>
          </div>
        </div>
        <button class="back-btn self-center mt-2" type="button" @click="goBack">
          <ArrowLeft :size="15" />
          <span>Kembali</span>
        </button>
      </div>

      <!-- QUICK META -->
      <div class="quick-meta">
        <div class="meta-chip">
          <span>NISN</span>
          <strong>{{ display(getField("nisn")) }}</strong>
        </div>
        <div class="meta-chip">
          <span>NIS</span>
          <strong>{{ display(getField("nipd")) }}</strong>
        </div>
        <div class="meta-chip">
          <span>Kelas</span>
          <strong>{{ display(getField("nama_rombel")) }}</strong>
        </div>
        <div class="meta-chip">
          <span>Jenis Kelamin</span>
          <strong>{{ jenisKelamin }}</strong>
        </div>
      </div>

      <!-- INFO SECTIONS -->
      <div class="sections">
        <!-- Identitas -->
        <div class="info-card">
          <div class="card-head">
            <div class="card-head-icon"><UserRound :size="15" /></div>
            <div>
              <h3>Identitas Siswa</h3>
              <p>Data utama peserta didik.</p>
            </div>
          </div>
          <div class="info-rows">
            <InfoRow label="Nama Lengkap" :value="getField('nama')" />
            <InfoRow label="NIS" :value="getField('nipd')" />
            <InfoRow label="NISN" :value="getField('nisn')" />
            <InfoRow label="NIK" :value="getField('nik')" />
            <InfoRow label="Jenis Kelamin" :value="jenisKelamin" />
            <InfoRow label="Tempat Lahir" :value="getField('tempat_lahir')" />
            <InfoRow
              label="Tanggal Lahir"
              :value="formatTanggal(getField('tanggal_lahir'))"
            />
            <InfoRow label="Agama" :value="getField('agama', 'agama_id_str')" />
            <InfoRow
              label="Kebutuhan Khusus"
              :value="getField('kebutuhan_khusus')"
            />
          </div>
        </div>

        <!-- Data Sekolah -->
        <div class="info-card">
          <div class="card-head">
            <div class="card-head-icon"><School :size="15" /></div>
            <div>
              <h3>Data Sekolah</h3>
              <p>Informasi rombongan belajar.</p>
            </div>
          </div>
          <div class="info-rows">
            <InfoRow
              label="Jenis Pendaftaran"
              :value="getField('jenis_pendaftaran', 'jenis_pendaftaran_id_str')"
            />
            <InfoRow
              label="Tanggal Masuk"
              :value="formatTanggal(getField('tanggal_masuk_sekolah'))"
            />
            <InfoRow label="Sekolah Asal" :value="getField('sekolah_asal')" />
            <InfoRow label="Semester" :value="getField('semester_id')" />
            <InfoRow label="Tingkat" :value="tingkatKelas" />
            <InfoRow label="Rombel" :value="getField('nama_rombel')" />
            <InfoRow
              label="Kurikulum"
              :value="getField('kurikulum', 'kurikulum_id_str')"
            />
          </div>
        </div>

        <!-- Orang Tua -->
        <div class="info-card info-card--full">
          <div class="card-head">
            <div class="card-head-icon"><HeartHandshake :size="15" /></div>
            <div>
              <h3>Data Orang Tua / Wali</h3>
              <p>Informasi keluarga peserta didik.</p>
            </div>
          </div>
          <div class="info-rows info-rows--2col">
            <InfoRow label="Nama Ayah" :value="getField('nama_ayah')" />
            <InfoRow
              label="Pekerjaan Ayah"
              :value="getField('pekerjaan_ayah', 'pekerjaan_ayah_id_str')"
            />
            <InfoRow label="Nama Ibu" :value="getField('nama_ibu')" />
            <InfoRow
              label="Pekerjaan Ibu"
              :value="getField('pekerjaan_ibu', 'pekerjaan_ibu_id_str')"
            />
            <InfoRow label="Nama Wali" :value="getField('nama_wali')" />
            <InfoRow
              label="Pekerjaan Wali"
              :value="getField('pekerjaan_wali', 'pekerjaan_wali_id_str')"
            />
          </div>
        </div>

        <!-- Kontak, Fisik & Alamat -->
        <div class="info-card info-card--full">
          <div class="card-head">
            <div class="card-head-icon"><Phone :size="15" /></div>
            <div>
              <h3>Kontak, Fisik &amp; Alamat</h3>
              <p>Data tambahan dan domisili peserta didik.</p>
            </div>
          </div>
          <div class="info-rows info-rows--2col">
            <InfoRow
              label="Telepon Rumah"
              :value="getField('nomor_telepon_rumah')"
            />
            <InfoRow
              label="No. Seluler"
              :value="getField('nomor_telepon_seluler')"
            />
            <InfoRow label="Email" :value="getField('email')" />
            <InfoRow label="Anak Ke" :value="getField('anak_keberapa')" />
            <InfoRow label="Tinggi Badan" :value="tinggiBadan" />
            <InfoRow label="Berat Badan" :value="beratBadan" />
            <InfoRow label="Alamat" :value="getField('alamat_jalan')" />
            <InfoRow label="RT / RW" :value="rtRw" />
            <InfoRow
              label="Desa / Kelurahan"
              :value="getField('desa_kelurahan')"
            />
            <InfoRow label="Kecamatan" :value="getField('kecamatan')" />
            <InfoRow
              label="Kabupaten / Kota"
              :value="getField('kabupaten_kota')"
            />
            <InfoRow label="Provinsi" :value="getField('provinsi')" />
          </div>
        </div>
      </div>

      <!-- ── KONFIRMASI DATA ── -->
      <div class="verify-card">
        <div class="verify-head">
          <div class="card-head-icon card-head-icon--lg">
            <ClipboardCheck :size="18" />
          </div>
          <div>
            <h3>Konfirmasi Data</h3>
            <p>
              Periksa data di atas sebelum menyelesaikan atau mengajukan
              perbaikan.
            </p>
          </div>
        </div>

        <!-- Locked state -->
        <div v-if="isLockedSubmit" class="lock-banner">
          <ShieldCheck :size="16" />
          <span>
            {{
              submitLock.type === "KONFIRMASI"
                ? "Data sudah dikonfirmasi"
                : "Pengajuan sedang diproses"
            }}
            — terkunci sampai <strong>{{ lockMessage }}</strong
            >.
          </span>
        </div>

        <!-- Submission status -->
        <div v-else-if="submissionStatus" class="status-banner" :class="`status-banner--${submissionStatus.type}`">
          <div class="status-icon">
            <CheckCircle2 v-if="submissionStatus.type === 'success'" :size="18" />
            <CircleAlert v-else :size="18" />
          </div>
          <span>{{ submissionStatus.message }}</span>
        </div>

        <!-- Choice -->
        <div v-else class="choice-grid">
          <label
            class="choice-item"
            :class="{ 'choice-item--success': verificationStatus === 'sesuai' }"
          >
            <input v-model="verificationStatus" type="radio" value="sesuai" />
            <div class="choice-icon choice-icon--success">
              <CheckCircle2 :size="18" />
            </div>
            <div class="choice-text">
              <strong>Data sudah sesuai</strong>
              <small>Saya menyatakan data ini sesuai dan selesai.</small>
            </div>
          </label>

          <label
            class="choice-item"
            :class="{
              'choice-item--warning': verificationStatus === 'tidak_sesuai',
            }"
          >
            <input
              v-model="verificationStatus"
              type="radio"
              value="tidak_sesuai"
            />
            <div class="choice-icon choice-icon--warning">
              <FileWarning :size="18" />
            </div>
            <div class="choice-text">
              <strong>Data tidak sesuai</strong>
              <small>Ajukan perbaikan dengan dokumen pendukung.</small>
            </div>
          </label>
        </div>

        <!-- Correction form -->
        <Transition name="slide-down">
          <div
            v-if="verificationStatus === 'tidak_sesuai' && !isLockedSubmit && !submissionStatus"
            class="correction-form"
          >
            <div class="form-field">
              <label><Info :size="13" /> Pesan / Keterangan Perbaikan</label>
              <textarea
                v-model.trim="form.pesan"
                rows="3"
                placeholder="Contoh: Nama ibu salah, tanggal lahir belum sesuai…"
              ></textarea>
            </div>

<div class="upload-grid">
              <div
                class="upload-field"
                v-for="doc in uploadDocs"
                :key="doc.key"
              >
                <label>{{ doc.label }}</label>
                <div class="upload-box" :class="{ 'upload-box--filled': form[doc.key]?.length }">
                  <Upload :size="14" />
                  <span>Pilih file…</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    @change="setFile($event, doc.key)"
                  />
                </div>
                <div v-if="form[doc.key]?.length" class="file-list">
                  <div class="file-item">
                    <span class="file-name">{{ form[doc.key][0].name }}</span>
                    <button
                      type="button"
                      class="file-remove"
                      @click="removeFile(doc.key)"
                    >
                      <X :size="12" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-note">
              <Info :size="13" />
              <span
                >Format: JPG, PNG, atau PDF. Maksimal 5 file total. Minimal 1
                dokumen wajib dilampirkan.</span
              >
            </div>
          </div>
        </Transition>

<!-- Actions -->
        <div v-if="!isLockedSubmit" class="verify-actions">
          <div v-if="submitting && uploadProgress > 0" class="upload-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
            </div>
            <span class="progress-text">Mengirim... {{ uploadProgress }}%</span>
          </div>

          <button
            class="action-btn action-btn--ghost"
            type="button"
            :disabled="submitting || submissionStatus"
            @click="resetPilihan"
          >
            <RotateCcw :size="14" /> Reset
          </button>

          <button
            v-if="verificationStatus === 'sesuai'"
            class="action-btn action-btn--success"
            type="button"
            :disabled="submitting || submissionStatus"
            @click="submitSesuai"
          >
            <LoaderCircle v-if="submitting" class="spin" :size="14" />
            <CheckCircle2 v-else :size="14" />
            Data Sesuai & Selesai
          </button>

          <button
            v-else
            class="action-btn action-btn--primary"
            type="button"
            :disabled="submitting || submissionStatus || !canSubmitPerbaikan"
            @click="submitPerbaikan"
          >
            <LoaderCircle v-if="submitting && uploadProgress === 0" class="spin" :size="14" />
            <CheckCircle2 v-else-if="!submitting" :size="14" />
            <span v-if="submitting && uploadProgress > 0">{{ uploadProgress }}%</span>
            <Send v-else-if="!submitting" :size="14" />
            {{ submitting ? "Mengirim..." : "Kirim Pengajuan Perbaikan" }}
          </button>
        </div>
      </div>
    </template>

    <!-- ── MODAL ── -->
    <Transition name="modal-fade">
      <div v-if="modal.show" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-box">
          <div class="modal-icon" :class="`modal-icon--${modal.type}`">
            <CheckCircle2 v-if="modal.type === 'success'" :size="26" />
            <CircleAlert v-else :size="26" />
          </div>
          <h3>{{ modal.title }}</h3>
          <p>{{ modal.message }}</p>
          <button class="modal-btn" type="button" @click="closeModal">
            Mengerti
          </button>
        </div>
      </div>
    </Transition>
  </AppLayout>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
defineOptions({ name: "DetailSiswa" })
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  FileWarning,
  Hash,
  HeartHandshake,
  Info,
  LoaderCircle,
  Phone,
  RotateCcw,
  School,
  Send,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "@/components/Icons.js";
import api from "@/services/api";
import { getPublicDetailSiswa } from "@/services/siswaService";
import { useSekolahStore } from "@/stores/sekolah";
import AppLayout from "@/layouts/AppLayout.vue";
import PageLoading from "@/components/PageLoading.vue";

/* ── InfoRow ── */
const InfoRow = defineComponent({
  name: "InfoRow",
  props: { label: String, value: [String, Number] },
  setup(props) {
    return () =>
      h("div", { class: "info-row" }, [
        h("span", props.label),
        h("strong", display(props.value)),
      ]);
  },
});

const router = useRouter();
const route = useRoute();
const sekolahStore = useSekolahStore();

const loading = ref(true);
const submitting = ref(false);
const uploadProgress = ref(0);
const error = ref("");
const siswa = ref(null);
const verificationStatus = ref("sesuai");
const submitLock = ref({ type: "", expiredAt: null });
const submissionStatus = ref(null);

const form = ref({
  pesan: "",
  kk: [],
  ijazah_smp: [],
  akta: [],
  pendukung: [],
});

const uploadDocs = [
  { key: "kk", label: "Kartu Keluarga" },
  { key: "ijazah_smp", label: "Ijazah SMP" },
  { key: "akta", label: "Akta Kelahiran" },
  { key: "pendukung", label: "Data Pendukung Lain" },
];

const MAX_FILES = 5;

const modal = ref({ show: false, type: "success", title: "", message: "" });

/* ── localStorage ── */
const STORAGE_KEY = computed(() => `form_perbaikan_${route.params.id}`);

function saveFormToLocal() {
  try {
    localStorage.setItem(
      STORAGE_KEY.value,
      JSON.stringify({
        verificationStatus: verificationStatus.value,
        pesan: form.value.pesan,
        kk_names: form.value.kk?.map(f => f.name) || [],
        ijazah_smp_names: form.value.ijazah_smp?.map(f => f.name) || [],
        akta_names: form.value.akta?.map(f => f.name) || [],
        pendukung_names: form.value.pendukung?.map(f => f.name) || [],
      }),
    );
  } catch {}
}

function loadFormFromLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY.value);
    if (!raw) return;
    const data = JSON.parse(raw);
    verificationStatus.value = data.verificationStatus || "sesuai";
    form.value.pesan = data.pesan || "";
    // File objects can't be stored in localStorage, only names
    // User will need to re-select files after reload
  } catch {}
}

function clearFormFromLocal() {
  try {
    localStorage.removeItem(STORAGE_KEY.value);
  } catch {}
}

/* ── Auto-save saat form berubah ── */
watch(
  () => [verificationStatus.value, form.value.pesan],
  () => saveFormToLocal(),
);

/* ── Computed ── */
const jenisKelamin = computed(() => {
  const jk = getField("jenis_kelamin");
  if (jk === "L") return "Laki-laki";
  if (jk === "P") return "Perempuan";
  return display(jk);
});
const tingkatKelas = computed(() => {
  const t = getField("tingkat_pendidikan_id");
  return t !== "-" ? `Kelas ${t}` : "-";
});
const tinggiBadan = computed(() => {
  const v = getField("tinggi_badan");
  return v !== "-" ? `${v} cm` : "-";
});
const beratBadan = computed(() => {
  const v = getField("berat_badan");
  return v !== "-" ? `${v} kg` : "-";
});
const rtRw = computed(() => {
  const rt = getField("rt");
  const rw = getField("rw");
  if (rt === "-" && rw === "-") return "-";
  return `${rt} / ${rw}`;
});
const canSubmitPerbaikan = computed(() => {
  const totalFiles = (form.value.kk?.length || 0) +
    (form.value.ijazah_smp?.length || 0) +
    (form.value.akta?.length || 0) +
    (form.value.pendukung?.length || 0);
  return verificationStatus.value === "tidak_sesuai" &&
    form.value.pesan.length >= 5 &&
    totalFiles >= 1 &&
    totalFiles <= MAX_FILES;
});
const isLockedSubmit = computed(() =>
  submitLock.value.expiredAt
    ? new Date() < new Date(submitLock.value.expiredAt)
    : false,
);
const lockMessage = computed(() => {
  if (!isLockedSubmit.value) return "";
  return new Date(submitLock.value.expiredAt).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});

/* ── Lifecycle ── */
onMounted(async () => {
  if (siswa.value) return;
  sekolahStore.fetchSekolah();
  await loadSiswa();
  loadFormFromLocal();
});

let hasInteracted = false;

function enableBeforeUnload() {
  if (hasInteracted) return;
  hasInteracted = true;
  window.addEventListener("beforeunload", (e) => {
    const hasData = form.value.pesan || form.value.kk?.length || form.value.ijazah_smp?.length || form.value.akta?.length || form.value.pendukung?.length;
    if (hasData) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
}

// Call enableBeforeUnload on first user interaction
function handleInteraction() {
  enableBeforeUnload();
  // Remove after first call
  document.removeEventListener("click", handleInteraction);
  document.removeEventListener("keydown", handleInteraction);
  document.removeEventListener("change", handleInteraction);
}

onMounted(() => {
  document.addEventListener("click", handleInteraction, { once: true });
  document.addEventListener("keydown", handleInteraction, { once: true });
  document.addEventListener("change", handleInteraction, { once: true });
});

async function loadSiswa() {
  try {
    loading.value = true;
    error.value = "";
    siswa.value = null;
    const id = route.params.id;
    if (!id) {
      error.value = "ID siswa tidak ditemukan di URL.";
      return;
    }
    const data = await getPublicDetailSiswa(id);
    siswa.value = data;
    if (!siswa.value) {
      error.value = "Data siswa tidak ditemukan.";
      return;
    }
    await loadStatusPengajuan();
  } catch (err) {
    if (err.code === "ERR_NETWORK") error.value = "Server backend tidak aktif.";
    else if (err.response?.status === 404)
      error.value = "Data siswa tidak ditemukan.";
    else error.value = "Gagal memuat data siswa.";
  } finally {
    loading.value = false;
  }
}

async function loadStatusPengajuan() {
  if (!siswa.value?.id) return;
  try {
    const res = await api.get(`/api/pengajuan-verval/public/check-status?id=${siswa.value.id}`);
    const data = res.data?.data;
    if (!data || data.is_locked === false) {
      submitLock.value = { type: "", expiredAt: null };
      verificationStatus.value = "sesuai";
      return;
    }
    submitLock.value = { type: data.tipe, expiredAt: data.expired_at_lock };
    verificationStatus.value =
      data.tipe === "PERBAIKAN" ? "tidak_sesuai" : "sesuai";
  } catch {
    submitLock.value = { type: "", expiredAt: null };
  }
}

/* ── Helpers ── */
function getField(key, fallbackKey = null) {
  const main = siswa.value?.[key];
  const raw = fallbackKey
    ? siswa.value?.raw_data?.[fallbackKey]
    : siswa.value?.raw_data?.[key];
  if (main !== null && main !== undefined && main !== "") return main;
  if (raw !== null && raw !== undefined && raw !== "") return raw;
  return "-";
}

function display(value) {
  if (value === null || value === undefined || value === "") return "-";
  return value;
}

function formatTanggal(value) {
  if (!value || value === "-") return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function buatPernyataan() {
  const s = siswa.value;
  if (!s) return "";
  const now = new Date();
  const tgl = now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  const nama = getField("nama");
  const ttl = `${getField("tempat_lahir")}, ${formatTanggal(getField("tanggal_lahir"))}`;
  return `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><title>Pernyataan Kebenaran Data</title>
<style>
  @page { margin: 2cm 2.5cm; }
  body { font-family: 'Times New Roman', Times, serif; color: #111827; margin: 0; padding: 0; font-size: 12pt; line-height: 1.5; }
  h3 { text-align: center; font-size: 14pt; font-weight: bold; margin: 0 0 4px; }
  .sub { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 16px; }
  p.body-text { text-align: justify; margin-bottom: 12pt; }
  table.data { width: 100%; border: none; margin-bottom: 16px; }
  table.data td { padding: 2px 4px; border: none; vertical-align: top; }
  table.data td.lbl { width: 200px; white-space: nowrap; }
  table.data td.colon { width: 16px; text-align: center; }
  .pilihan { margin: 12px 0; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
  .pilihan label { display: inline-flex; align-items: center; gap: 6px; font-size: 12pt; }
  .check-box { display: inline-block; width: 16px; height: 16px; border: 2px solid #000; flex-shrink: 0; margin-top: 10px; }
  .catatan { margin-top: 16px; }
  .catatan p { margin: 2px 0; }
  .catatan ol { padding-left: 20px; margin: 4px 0; }
  .ttd { margin-top: 28px; }
  .ttd table { width: 100%; border: none; }
  .ttd td { text-align: center; vertical-align: top; padding: 0 20px; }
  .ttd .space { height: 60px; }
  .ttd td p:last-child { text-transform: uppercase; font-weight: bold; }
  .footer-note { margin-top: 12px; font-size: 10px; }
  .footer-print { margin-top: 12px; padding-top: 8px; border-top: 1px solid #d1d5db; font-size: 9px; color: #6b7280; text-align: center; clear: both; width: 100%; }
  hr { border: none; border-top: 1px solid #000; margin: 8px 0; }
</style></head>
<body>
  <h3>SURAT PERNYATAAN KEBENARAN DATA SISWA</h3>
  <p class="sub">UNTUK PENCETAKAN IJAZAH SMK 2 LPPM RI</p>

  <p class="body-text">
    Berdasarkan Peraturan Menteri Pendidikan Dasar dan Menengah No. 12 Tahun 2025 tentang Validasi data siswa yang telah menyelesaikan pendidikan di sekolah tingkat SMK, yang bertanda tangan di bawah ini saya :
  </p>

  <table class="data">
    <tr><td class="lbl">Nama</td><td class="colon">:</td><td style="text-transform:uppercase">${nama}</td></tr>
    <tr><td class="lbl">Tempat/Tanggal Lahir</td><td class="colon">:</td><td>${ttl}</td></tr>
    <tr><td class="lbl">NISN</td><td class="colon">:</td><td>${getField("nisn")}</td></tr>
    <tr><td class="lbl">Nama Orang Tua</td><td class="colon"></td><td></td></tr>
    <tr><td class="lbl" style="padding-left:20px;">a. Ayah</td><td class="colon">:</td><td>${getField("nama_ayah")}</td></tr>
    <tr><td class="lbl" style="padding-left:20px;">b. Ibu</td><td class="colon">:</td><td>${getField("nama_ibu")}</td></tr>
    <tr><td class="lbl">Jurusan/Program Studi</td><td class="colon">:</td><td>${getField("nama_rombel")}</td></tr>
    <tr><td class="lbl">Satuan Pendidikan</td><td class="colon">:</td><td>${sekolahStore.nama || "SMK 2 LPPM RI MAJALAYA"}</td></tr>
    <tr><td class="lbl">NPSN</td><td class="colon">:</td><td>${sekolahStore.npsn || "20228539"}</td></tr>
    <tr><td class="lbl">Provinsi</td><td class="colon">:</td><td>${getField("provinsi")}</td></tr>
    <tr><td class="lbl">Kabupaten/Kota</td><td class="colon">:</td><td>${getField("kabupaten_kota")}</td></tr>
  </table>

  <p class="body-text">Apakah Data diatas sudah Sesuai :</p>
  <div class="pilihan">
    <label><span class="check-box"></span> Sesuai</label>
    <label><span class="check-box"></span> Tidak Sesuai</label>
    <span style="font-size:10px;color:#6b7280;font-style:italic; margin-top:4px;">(Pilih salah satu dengan memberi tanda centang)</span>
  </div>

  <p class="body-text">
    <strong>*) Jika memilih Sesuai</strong><br>
    Dengan ini menyatakan bahwa data tersebut di atas telah sesuai dengan Data Pribadi saya berdasarkan Kartu Keluarga (KK), NISN, dan Akte Kelahiran. Saya menyetujui bahwa data untuk ijazah di SMK 2 LPPM RI akan disesuaikan dengan data tersebut.
  </p>

  <p class="body-text">
    <strong>*) Jika memilih Tidak Sesuai</strong><br>
    Silahkan untuk menyiapkan data-data sebagai berikut :
  </p>
  <div class="catatan">
    <p>1. Foto copy Kartu Keluarga (KK) yang sudah diperbarui (terbaru).</p>
    <p>2. Foto copy Ijazah SMP/MTs.</p>
    <p>3. Foto copy Akte Kelahiran yang dikeluarkan oleh Disdukcapil.</p>
        <p style="font-size:10px;color:#6b7280;font-style:italic;">(Seluruh data tersebut harus disiapkan dan dikirimkan ke Sekolah SMK 2 LPPM RI Majalaya (Bandung) dibawa langsung oleh siswa yang bersangkutan ke OPS Sekolah)</p>
  </div>

  <p class="body-text">
    Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa unsur paksaan dari pihak manapun. Saya bersedia bertanggung jawab atas kebenaran data tersebut dan akan mengikuti seluruh rangkaian ujian dengan penuh INTEGRITAS.
  </p>

  <div class="ttd">
    <table>
      <tr>
        <td>
          <p>Mengetahui,</p>
          <p>Orang Tua/Wali Murid</p>
          <div class="space"></div>
          <p>${getField("nama_ayah") || getField("nama_ibu") || "____________________"}</p>
        </td>
        <td>
          <p>Bandung, ${tgl}</p>
          <p>Yang Membuat Pernyataan</p>
          <div class="space"></div>
          <p>${nama}</p>
        </td>
      </tr>
    </table>
  </div>

  <div class="footer-note">
    <p>*) Jika ada kekeliruan pada identitas murid, harap menghubungi Sekolah/Madrasah untuk dilakukan perbaikan sesuai mekanisme yang telah ditetapkan</p>
    <p>**) Identitas murid pada lembar ini akan dijadikan rujukan dalam pencetakan Ijazah</p>
  </div>

</body></html>`;
}

async function downloadPernyataan() {
  const nama = getField("nama").replace(/[^a-zA-Z0-9]/g, "_");
  const nisn = getField("nisn");
  const html = buatPernyataan();
  const el = document.createElement("div");
  el.innerHTML = html;
  el.style.position = "fixed";
  el.style.left = "0";
  el.style.top = "0";
  el.style.width = "794px";
  el.style.background = "#fff";
  el.style.zIndex = "-1";
  document.body.appendChild(el);
  await new Promise(r => setTimeout(r, 300));
  try {
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, width: 794 });
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF("p", "mm", "a4");
    const mLR = 25;
    const mTB = 20;
    const pageW = pdf.internal.pageSize.getWidth() - mLR * 2;
    const imgH = (canvas.height * pageW) / canvas.width;
    const pageH = 297 - mTB * 2;
    let yOffset = 0;
    let firstPage = true;
    while (yOffset < imgH) {
      if (!firstPage) pdf.addPage();
      pdf.addImage(imgData, "JPEG", mLR, mTB - yOffset, pageW, imgH);
      yOffset += pageH;
      firstPage = false;
    }
    pdf.save(`Pernyataan_${nama}_${nisn}.pdf`);
  } catch (e) {
    console.warn("PDF error:", e);
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    } else {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Pernyataan_${nama}_${nisn}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
  document.body.removeChild(el);
}

function setFile(event, key) {
  const file = event.target.files?.[0];
  if (file) {
    form.value[key] = [file];
    saveFormToLocal();
  }
  event.target.value = "";
}

function removeFile(key) {
  form.value[key] = [];
  saveFormToLocal();
}

/* ── Submit ── */
async function submitSesuai() {
  if (!siswa.value || isLockedSubmit.value) return;
  try {
    submitting.value = true;
    await api.post("/api/pengajuan-verval/public", {
      siswa_id: siswa.value.id,
      nisn: siswa.value.nisn,
      tipe: "KONFIRMASI",
      pesan: "Saya menyatakan data ini sesuai dan selesai.",
    });
    lockSubmitFor30Days("KONFIRMASI");
    downloadPernyataan();
    clearForm();
    submissionStatus.value = { type: "success", message: "Data berhasil dikonfirmasi" };
  } catch (err) {
    const msg =
      err.response?.data?.message || "Gagal mengirim konfirmasi data.";
    submissionStatus.value = { type: "error", message: msg };
  } finally {
    submitting.value = false;
  }
}

async function submitPerbaikan() {
  if (!siswa.value || !canSubmitPerbaikan.value || isLockedSubmit.value) return;
  try {
    submitting.value = true;
    uploadProgress.value = 0;
    const payload = new FormData();
    payload.append("siswa_id", siswa.value.id || "");
    payload.append("nisn", siswa.value.nisn || "");
    payload.append("tipe", "PERBAIKAN");
    payload.append("pesan", form.value.pesan || "");
    uploadDocs.forEach(doc => {
      (form.value[doc.key] || []).forEach(file => {
        payload.append(doc.key, file);
      });
    });
    await api.post("/api/pengajuan-verval/public", payload, {
      onUploadProgress: (e) => {
        uploadProgress.value = Math.round((e.loaded / e.total) * 100);
      },
    });
    lockSubmitFor30Days("PERBAIKAN");
    clearForm();
    submissionStatus.value = { type: "success", message: "Pengajuan perbaikan berhasil dikirim" };
  } catch (err) {
    const msg =
      err.response?.data?.message || "Pengajuan perbaikan gagal dikirim.";
    submissionStatus.value = { type: "error", message: msg };
  } finally {
    submitting.value = false;
  }
}

function resetPilihan() {
  if (isLockedSubmit.value) return;
  clearForm();
}

function clearForm() {
  verificationStatus.value = "sesuai";
  form.value = {
    pesan: "",
    kk: [],
    ijazah_smp: [],
    akta: [],
    pendukung: [],
  };
  clearFormFromLocal();
}

function lockSubmitFor30Days(type) {
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 30);
  submitLock.value = { type, expiredAt: expiredAt.toISOString() };
}

function showModal(type, title, message) {
  modal.value = { show: true, type, title, message };
}

function closeModal() {
  modal.value.show = false;
  router.replace("/");
}

function goBack() {
  router.back();
}
</script>


