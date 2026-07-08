<template>
  <main class="detail-page">
    <!-- ── BACK ── -->
    <button class="back-btn" type="button" @click="goBack">
      <ArrowLeft :size="15" />
      <span>Kembali</span>
    </button>

    <!-- ── LOADING ── -->
    <div v-if="loading" class="state-card">
      <div class="state-icon state-icon--loading">
        <LoaderCircle class="spin" :size="24" />
      </div>
      <div>
        <h2>Memuat data siswa…</h2>
        <p>Mohon tunggu sebentar.</p>
      </div>
    </div>

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
      <div class="page-header">
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
            v-if="verificationStatus === 'tidak_sesuai' && !isLockedSubmit"
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
                <div
                  class="upload-box"
                  :class="{ 'upload-box--filled': form[doc.key] }"
                >
                  <Upload :size="14" />
                  <span>
                    {{
                      form[doc.key]
                        ? form[doc.key].name
                        : form[`_${doc.key}_name`]
                          ? `⚠ Pilih ulang: ${form[`_${doc.key}_name`]}`
                          : "Pilih file…"
                    }}
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    @change="setFile($event, doc.key)"
                  />
                </div>
              </div>
            </div>

            <div class="form-note">
              <Info :size="13" />
              <span
                >Format: JPG, PNG, atau PDF. Minimal 1 dokumen wajib
                dilampirkan.</span
              >
            </div>
          </div>
        </Transition>

        <!-- Actions -->
        <div v-if="!isLockedSubmit" class="verify-actions">
          <button
            class="action-btn action-btn--ghost"
            type="button"
            :disabled="submitting"
            @click="resetPilihan"
          >
            <RotateCcw :size="14" /> Reset
          </button>

          <button
            v-if="verificationStatus === 'sesuai'"
            class="action-btn action-btn--success"
            type="button"
            :disabled="submitting"
            @click="submitSesuai"
          >
            <LoaderCircle v-if="submitting" class="spin" :size="14" />
            <CheckCircle2 v-else :size="14" />
            Data Sesuai &amp; Selesai
          </button>

          <button
            v-else
            class="action-btn action-btn--primary"
            type="button"
            :disabled="submitting || !canSubmitPerbaikan"
            @click="submitPerbaikan"
          >
            <LoaderCircle v-if="submitting" class="spin" :size="14" />
            <Send v-else :size="14" />
            Kirim Pengajuan Perbaikan
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
  </main>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
defineOptions({ name: "DetailSiswa" })
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
} from "@/components/Icons.js";
import api from "@/services/api";
import { getPublicDetailSiswa } from "@/services/siswaService";

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

const loading = ref(true);
const submitting = ref(false);
const error = ref("");
const siswa = ref(null);
const verificationStatus = ref("sesuai");
const submitLock = ref({ type: "", expiredAt: null });

const form = ref({
  pesan: "",
  kk: null,
  _kk_name: null,
  ijazah_smp: null,
  _ijazah_smp_name: null,
  akta: null,
  _akta_name: null,
  pendukung: null,
  _pendukung_name: null,
});

const uploadDocs = [
  { key: "kk", label: "Kartu Keluarga" },
  { key: "ijazah_smp", label: "Ijazah SMP" },
  { key: "akta", label: "Akta Kelahiran" },
  { key: "pendukung", label: "Data Pendukung Lain" },
];

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
        kk_name: form.value._kk_name || null,
        ijazah_smp_name: form.value._ijazah_smp_name || null,
        akta_name: form.value._akta_name || null,
        pendukung_name: form.value._pendukung_name || null,
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
    form.value._kk_name = data.kk_name || null;
    form.value._ijazah_smp_name = data.ijazah_smp_name || null;
    form.value._akta_name = data.akta_name || null;
    form.value._pendukung_name = data.pendukung_name || null;
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
const canSubmitPerbaikan = computed(
  () =>
    verificationStatus.value === "tidak_sesuai" &&
    form.value.pesan.length >= 5 &&
    (form.value.kk ||
      form.value.ijazah_smp ||
      form.value.akta ||
      form.value.pendukung),
);
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
  await loadSiswa();
  loadFormFromLocal();
});

window.addEventListener("beforeunload", (e) => {
  if (form.value.pesan || form.value.kk || form.value.ijazah_smp || form.value.akta || form.value.pendukung) {
    e.preventDefault();
    e.returnValue = "";
  }
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

function setFile(event, key) {
  const file = event.target.files?.[0];
  if (file) {
    form.value[key] = file;
    form.value[`_${key}_name`] = file.name;
    saveFormToLocal();
  }
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
    clearForm();
    showModal(
      "success",
      "Data Berhasil Dikonfirmasi",
      "Terima kasih. Data peserta didik sudah dinyatakan sesuai.",
    );
    setTimeout(() => router.replace("/"), 1500);
  } catch (err) {
    const msg =
      err.response?.data?.message || "Gagal mengirim konfirmasi data.";
    showModal(
      "error",
      err.response?.status === 409 ? "Data Sudah Diisi" : "Gagal Konfirmasi",
      msg,
    );
  } finally {
    submitting.value = false;
  }
}

async function submitPerbaikan() {
  if (!siswa.value || !canSubmitPerbaikan.value || isLockedSubmit.value) return;
  try {
    submitting.value = true;
    const payload = new FormData();
    payload.append("siswa_id", siswa.value.id || "");
    payload.append("nisn", siswa.value.nisn || "");
    payload.append("tipe", "PERBAIKAN");
    payload.append("pesan", form.value.pesan || "");
    if (form.value.kk) payload.append("kk", form.value.kk);
    if (form.value.ijazah_smp)
      payload.append("ijazah_smp", form.value.ijazah_smp);
    if (form.value.akta) payload.append("akta", form.value.akta);
    if (form.value.pendukung) payload.append("pendukung", form.value.pendukung);
    await api.post("/api/pengajuan-verval/public", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    lockSubmitFor30Days("PERBAIKAN");
    clearForm();
    showModal(
      "success",
      "Pengajuan Berhasil Dikirim",
      "Pengajuan perbaikan data berhasil dikirim dan akan diproses oleh admin.",
    );
    setTimeout(() => router.replace("/"), 1500);
  } catch (err) {
    const msg =
      err.response?.data?.message || "Pengajuan perbaikan gagal dikirim.";
    showModal(
      "error",
      err.response?.status === 409
        ? "Data Sudah Diisi"
        : "Gagal Mengirim Pengajuan",
      msg,
    );
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
    kk: null,
    _kk_name: null,
    ijazah_smp: null,
    _ijazah_smp_name: null,
    akta: null,
    _akta_name: null,
    pendukung: null,
    _pendukung_name: null,
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


