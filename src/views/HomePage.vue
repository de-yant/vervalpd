<template>
  <AppLayout :subtitle="sekolahStore.nama" :footer-text="sekolahStore.nama">
    <PageLoading v-if="loading" />
    <template v-else>
      <section class="landing gap-4 lg:gap-6 overflow-x-hidden">
      <!-- NETWORK ERROR FULL WIDTH -->
      <div v-if="networkError" class="col-span-full w-full rounded-2xl border border-[var(--danger)] bg-[var(--danger-soft)] p-6 sm:p-8">
        <div class="flex flex-col items-center justify-center gap-4 text-center">
          <div class="w-14 h-14 rounded-2xl grid place-items-center bg-[var(--danger)] text-white"><WifiOff :size="26" /></div>
          <div>
            <h2 class="m-0 text-[16px] font-black text-[var(--text-strong)]">Koneksi Terputus</h2>
            <p class="m-0 text-[13px] text-[var(--muted)] mt-1">Tidak dapat menghubungi server. Periksa koneksi internet Anda lalu coba lagi.</p>
          </div>
          <button type="button" class="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[var(--danger)] text-white text-[13px] font-black hover:brightness-110 transition-all" @click="retryLoad"><RotateCcw :size="15" /> Coba Lagi</button>
        </div>
      </div>

      <!-- ALUR (KIRI) + TITLE/COUNT & SEARCH (KANAN) -->
      <div class="w-full grid gap-4 md:gap-6 md:grid-cols-2 items-stretch col-span-full">
        <!-- ALUR VERVAL -->
        <div class="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-7 relative z-10 flex flex-col order-last md:order-none">
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-[var(--border)] mb-4">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-12 h-12 rounded-xl grid place-items-center bg-[var(--primary)] text-white flex-shrink-0 will-change-transform"><ClipboardCheck :size="22" /></div>
                <div>
                  <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[var(--primary)] text-[7px] font-black tracking-[0.12em] uppercase mb-1">
                    <ShieldCheck :size="7" />
                    Panduan
                  </div>
                  <h2 class="m-0 text-[16px] font-black text-[var(--text-strong)] leading-none">Alur Verval</h2>
                </div>
              </div>
              <span class="w-9 h-9 rounded-xl grid place-items-center bg-[var(--surface-2)] text-[var(--muted)] shrink-0"><ChevronRight :size="15" /></span>
            </div>
          <div class="flex-1 flex flex-col">
            <div v-for="(step, i) in alurSteps" :key="i" class="flex flex-col items-center">
              <div class="w-full flex items-center gap-2 p-2 rounded-xl lg:gap-2.5 lg:p-2.5 border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md cursor-pointer" :class="{ 'step-item--active': activeStep === i }" @mouseenter="onStepEnter(i)" @mouseleave="onStepLeave" @click="onStepClick(i)">
                <span class="w-7 h-7 rounded-full grid place-items-center bg-[var(--primary)] text-white text-[11px] font-black shrink-0 lg:w-6 lg:h-6 lg:text-[10px]">{{ i + 1 }}</span>
                <span class="alur-step-label flex-1 min-w-0 text-[12.5px] font-bold text-[var(--text)] leading-snug lg:text-[12px]">{{ step }}</span>
              </div>
              <div v-if="i < alurSteps.length - 1" class="my-0.5 text-[var(--primary)]" :class="{ 'step-indicator--active': activeStep === i }">
                <ChevronDown :size="16" class="mx-auto" />
              </div>
            </div>
          </div>
        </div>

        <!-- KANAN: TITLE + COUNT + SEARCH -->
        <div class="flex flex-col gap-4 md:gap-6 min-w-0">
          <!-- SEARCH -->
          <div id="search-card" class="w-full flex flex-col">
        <div class="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7 search-card-inner">
          <div v-if="loading" class="flex items-center justify-center gap-3 min-h-[120px] rounded-xl bg-[var(--surface-2)] text-[var(--muted)] text-[14px] font-bold">
            <div class="w-9 h-9 rounded-xl bg-[var(--primary-soft)] grid place-items-center text-[var(--primary)]"><LoaderCircle class="animate-spin" :size="18" /></div>
            <span>Memuat data murid...</span>
          </div>

          <div v-else class="flex flex-col justify-center gap-4">
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-[var(--border)]">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-12 h-12 rounded-xl grid place-items-center bg-[var(--primary)] text-white flex-shrink-0 will-change-transform"><SearchCheck :size="22" /></div>
                <div class="min-w-0">
                  <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[var(--primary)] text-[7px] font-black tracking-[0.12em] uppercase mb-1">
                    <ShieldCheck :size="7" />
                    VervalPD
                  </div>
                  <h2 class="m-0 text-[16px] font-black text-[var(--text-strong)] leading-none">Cari Data Murid</h2>
                </div>
              </div>
              <span class="w-9 h-9 rounded-xl grid place-items-center bg-[var(--surface-2)] text-[var(--muted)] shrink-0"><IdCard :size="15" /></span>
            </div>

            <div class="relative">
              <div class="relative flex items-center h-[48px] sm:h-[54px] rounded-2xl border-2 border-[var(--border)] bg-[var(--surface-2)] transition-all duration-250 focus-within:border-[var(--primary)] focus-within:bg-[var(--card)] focus-within:shadow-lg" :class="{ 'opacity-50 cursor-not-allowed': searchDisabled }" @click="onSearchBoxClick">
                <input
                  ref="inputRef"
                  v-model="keyword"
                  type="text"
                  autocomplete="off"
                  :disabled="searchDisabled"
                  class="w-full bg-transparent border-0 outline-none shadow-none text-[13px] sm:text-[14px] text-[var(--text-strong)] placeholder:text-[var(--muted)] py-3 transition-all duration-400 disabled:cursor-not-allowed disabled:pointer-events-none"
                  :class="inputPadClass"
                  @input="onSearchInput"
                  @focus="searchFocused = true; searchSiswa()"
                  @blur="searchFocused = false"
                />
                <button v-if="keyword" type="button" class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl grid place-items-center bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:scale-105 transition-all shrink-0" @mousedown.prevent @click.stop="resetSearch" aria-label="Reset pencarian"><X :size="15" /></button>
                <button
                  type="button"
                  :class="searchActive
                    ? (keyword ? 'right-14' : 'right-2') + ' w-9 h-9 rounded-xl grid place-items-center bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:scale-105 transition-all shrink-0 absolute top-1/2 -translate-y-1/2'
                    : 'right-[calc(100%-30px)] text-[var(--primary)] shrink-0 bg-transparent border-0 p-0 absolute top-1/2 -translate-y-1/2 transition-all duration-400'"
                  :aria-label="searchActive ? 'Cari murid' : 'Cari'"
                  @mousedown.prevent
                  @click.stop="onSearchIconClick"
                ><Search :size="18" /></button>
              </div>

              <Transition name="dropdown">
                <div v-if="showResultBox" class="absolute left-0 right-0 top-full mt-2 z-[9999] max-h-[260px] overflow-y-auto p-2 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl">
                  <button v-for="(item, idx) in suggestions" :key="item._key" type="button" class="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border-0 bg-transparent text-left text-[var(--text-strong)] hover:bg-[var(--primary-soft)] hover:translate-x-1 transition-all duration-180" :style="{ animationDelay: `${idx * 40}ms` }" @click="openVerifyModal(item)">
                    <span class="w-10 h-10 rounded-xl grid place-items-center bg-[var(--primary)] text-white text-[12px] font-black shrink-0">{{ getInitial(item.nama) }}</span>
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

            <!-- TAHUN AJARAN -->
            <div class="grid grid-cols-2 gap-1.5 pt-3 border-t border-[var(--border)] sm:flex sm:items-center sm:justify-center">
              <div v-if="tahunAjaran" class="flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-xl sm:rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[11px] sm:text-[11.5px] font-black text-[var(--primary)] min-w-0 text-center">
                <span class="hidden sm:grid w-4 h-4 place-items-center shrink-0"><GraduationCap :size="12" /></span>
                <span>Tahun Ajaran {{ tahunAjaran }}</span>
              </div>
              <div v-if="semester" class="flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-3 rounded-xl sm:rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[11px] sm:text-[11.5px] font-black text-[var(--primary)] min-w-0 text-center">
                <span class="hidden sm:grid w-4 h-4 place-items-center shrink-0"><BookOpen :size="12" /></span>
                <span>Semester {{ semester }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
          <!-- TITLE + COUNT -->
          <div class="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7 flex flex-col">
            <div class="flex items-center justify-between gap-3 pb-2 border-b border-[var(--border)] mb-4">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-12 h-12 rounded-xl grid place-items-center bg-[var(--primary)] text-white flex-shrink-0 will-change-transform"><Users :size="22" /></div>
                <div>
                  <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--primary-soft)] text-[var(--primary)] text-[7px] font-black tracking-[0.12em] uppercase mb-1">
                    <ShieldCheck :size="7" />
                    Statistik
                  </div>
                  <h2 class="m-0 text-[16px] font-black text-[var(--text-strong)] leading-none">Data Peserta Didik</h2>
                </div>
              </div>
              <span class="w-9 h-9 rounded-xl grid place-items-center bg-[var(--surface-2)] text-[var(--muted)] shrink-0"><Hash :size="15" /></span>
            </div>

            <div class="grid grid-cols-3 stats-grid gap-2">
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[var(--primary)] text-white stat-icon-wrap">
                  <Users :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalSiswa }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Peserta Didik</span>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[#2563eb] text-white stat-icon-wrap">
                  <Mars :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalLaki }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Laki-laki</span>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[#db2777] text-white stat-icon-wrap">
                  <Venus :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalPerempuan }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Perempuan</span>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[#16a34a] text-white stat-icon-wrap">
                  <GraduationCap :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalKelasX }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Kelas X</span>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[#eab308] text-white stat-icon-wrap">
                  <GraduationCap :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalKelasXI }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Kelas XI</span>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-1.5 lg:gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] transition-transform duration-250 hover:-translate-y-0.5 hover:shadow-md stat-card">
                <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl grid place-items-center bg-[#dc2626] text-white stat-icon-wrap">
                  <GraduationCap :size="14" />
                </div>
                <div class="flex flex-col items-center lg:items-start justify-center gap-0.5 flex-1 min-w-0 text-center lg:text-left">
                  <strong class="text-[20px] font-black leading-none tabular-nums text-[var(--text-strong)]">{{ totalKelasXII }}</strong>
                  <span class="text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--muted)]">Kelas XII</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>

    <!-- LINKS -->
    <section class="links-section w-full max-w-4xl mx-auto overflow-x-hidden">
      <div class="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 links-card-inner relative z-10">
        <div class="flex items-center justify-center gap-2.5 mb-5 pb-4 border-b border-[var(--border)]">
          <GraduationCap :size="14" class="text-[var(--primary)]" />
          <span class="text-[10px] font-black tracking-[0.1em] uppercase text-[var(--muted)]">Aplikasi Lainnya</span>
        </div>

        <div ref="trackRef" class="flex gap-3 overflow-x-auto" style="scrollbar-width: none; -ms-overflow-style: none;" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
          <a v-for="(link, i) in [...links, ...links, ...links]" :key="i" :href="link.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 h-[42px] px-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-[13px] font-black hover:bg-[var(--primary-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-250 shrink-0">
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
      <div v-if="showModal" class="fixed inset-0 z-[99999] grid place-items-center p-4" style="background: rgba(0, 0, 0, 0.75)" @click.self="closeVerifyModal">
        <div class="relative w-full max-w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-7">
          <button type="button" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] grid place-items-center cursor-pointer transition-all duration-200 hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:rotate-90" @click="closeVerifyModal"><X :size="16" /></button>

          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--border)]">
            <div class="w-12 h-12 rounded-2xl grid place-items-center bg-[var(--primary)] text-white"><LockKeyhole :size="22" /></div>
            <div>
              <p class="m-0 text-[9.5px] font-black tracking-[0.12em] uppercase text-[var(--primary)]">VervalPD App</p>
              <h3 class="m-0 text-[var(--text-strong)] text-[17px] font-black leading-tight" style="margin-top: 2px">Verifikasi Murid</h3>
            </div>
          </div>

          <form class="grid gap-4" @submit.prevent="verifyStudent">
            <div class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]">
              <span class="w-9 h-9 flex-none rounded-lg grid place-items-center bg-[var(--primary)] text-white text-[12px] font-black">{{ getInitial(selectedSiswa?.nama || "") }}</span>
              <div class="flex-1 min-w-0">
                <strong class="block text-[var(--text-strong)] text-[13px] font-black leading-tight truncate">{{ selectedSiswa?.nama }}</strong>
                <small class="block text-[var(--muted)] text-[11px]">{{ selectedSiswa?.nama_rombel || "Belum ada rombel" }}</small>
              </div>
            </div>

            <div class="grid gap-1.5">
              <label class="inline-flex items-center gap-1.5 text-[var(--text)] text-[12.5px] font-black"><IdCard :size="14" /> NISN Murid</label>
              <input v-model="nisnInput" type="text" placeholder="Masukkan NISN" autocomplete="off" class="w-full h-11 px-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-strong)] text-[13.5px] placeholder:text-[12px] outline-none transition-all duration-200 box-border focus:border-[var(--primary)] focus:bg-[var(--card)]" />
            </div>

            <div class="grid gap-1.5">
              <label class="inline-flex items-center gap-1.5 text-[var(--text)] text-[12.5px] font-black"><ShieldQuestion :size="14" /> Captcha: berapa {{ captcha?.a }} + {{ captcha?.b }}?</label>
              <input v-model="captchaInput" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Tulis jawaban di sini" autocomplete="off" class="w-full h-11 px-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-strong)] text-[13.5px] placeholder:text-[12px] outline-none transition-all duration-200 box-border focus:border-[var(--primary)] focus:bg-[var(--card)]" />
            </div>

            <Transition name="fade">
              <div v-if="verifyError" class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[var(--danger-soft)] border border-[var(--danger)] text-[var(--danger)] text-[12.5px] font-bold"><CircleAlert :size="15" /> <span>{{ verifyError }}</span></div>
            </Transition>

            <button type="submit" class="w-full h-[46px] rounded-xl border-0 inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-white text-[14px] font-black cursor-pointer active:translate-y-0"><UnlockKeyhole :size="17" class="vm-btn-icon" /> Buka Data Verval</button>
          </form>
        </div>
      </div>
    </Transition>
    </template>
  </AppLayout>
</template>

<script setup>
import { computed, ref, shallowRef, onMounted, onUnmounted, nextTick, watch } from "vue";
import { BookOpen, ChevronDown, ChevronRight, CircleAlert, GraduationCap, Hash, IdCard, Info, LoaderCircle, LockKeyhole, Mars, RotateCcw, Search, SearchCheck, ShieldCheck, ShieldQuestion, UnlockKeyhole, Users, Venus, WifiOff, X, School, ClipboardCheck } from "@/components/Icons.js";
import { useUiStore } from "@/stores/ui";
import { useSekolahStore } from "@/stores/sekolah";
import { getPublicSiswa } from "@/services/siswaService";
import AppLayout from "@/layouts/AppLayout.vue";
import PageLoading from "@/components/PageLoading.vue";

const ui = useUiStore();
const sekolahStore = useSekolahStore();

const alurSteps = [
  "Cari nama peserta didik pada kolom pencarian.",
  "Pilih murid yang sesuai dari hasil pencarian.",
  "Verifikasi dengan memasukkan NISN dan jawaban captcha.",
  "Periksa kembali seluruh data peserta didik.",
  'Klik "Data Sesuai" untuk konfirmasi.',
  "Jika ada data keliru, ajukan perbaikan dengan lampiran dokumen.",
];

const loading = ref(false);
const networkError = ref(false);
const keyword = ref("");
const suggestions = shallowRef([]);
const searchMessage = ref("");
const searchFocused = ref(false);
const inputRef = ref(null);
const activeStep = ref(null);
const stepCanHover = typeof window !== "undefined" && !!window.matchMedia?.("(hover: hover)")?.matches;

function onStepEnter(i) {
  if (!stepCanHover) return;
  activeStep.value = i;
}
function onStepLeave() {
  if (!stepCanHover) return;
  activeStep.value = null;
}
function onStepClick(i) {
  if (stepCanHover) return;
  activeStep.value = activeStep.value === i ? null : i;
}

const placeholderText = "Cari nama kamu disini...";
let typewriterTimer = null;

function setPlaceholder(text) {
  if (inputRef.value) inputRef.value.placeholder = text;
}

function startPlaceholderTypewriter() {
  clearTimeout(typewriterTimer);
  clearInterval(typewriterTimer);
  setPlaceholder("");
  let i = 0;
  let deleting = false;

  const step = () => {
    if (!deleting) {
      i++;
      setPlaceholder(placeholderText.slice(0, i));
      if (i >= placeholderText.length) {
        clearInterval(typewriterTimer);
        deleting = true;
        typewriterTimer = setTimeout(() => {
          typewriterTimer = setInterval(step, 60);
        }, 1200);
      }
    } else {
      i--;
      setPlaceholder(placeholderText.slice(0, i));
      if (i <= 0) {
        clearInterval(typewriterTimer);
        deleting = false;
        typewriterTimer = setTimeout(() => {
          typewriterTimer = setInterval(step, 80);
        }, 400);
      }
    }
  };

  typewriterTimer = setInterval(step, 80);
}

function stopPlaceholderTypewriter() {
  clearTimeout(typewriterTimer);
  clearInterval(typewriterTimer);
  setPlaceholder(placeholderText);
}

watch(keyword, (val) => {
  if (val) stopPlaceholderTypewriter();
  else startPlaceholderTypewriter();
});

const noActivePeriode = computed(() => sekolahStore.loaded && !sekolahStore.periodeId);
const searchDisabled = computed(() => networkError.value || noActivePeriode.value);

function onSearchBoxClick() {
  if (noActivePeriode.value) {
    ui.warning("Belum ada periode aktif. Silakan hubungi admin sekolah untuk mengaktifkan periode.", "Periode Belum Aktif");
  } else if (networkError.value) {
    ui.warning("Tidak dapat menghubungi server. Periksa koneksi Anda lalu coba lagi.", "Koneksi Terputus");
  }
}

function onSearchIconClick() {
  if (searchDisabled.value) { onSearchBoxClick(); return; }
  if (searchActive.value) {
    searchSiswa();
  } else {
    inputRef.value?.focus();
  }
}

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
const totalKelasX = ref(0);
const totalKelasXI = ref(0);
const totalKelasXII = ref(0);

function kelasDariRombel(rombel) {
  const m = String(rombel || "").toUpperCase().match(/KELAS\s+(XII|XI|X)\b/);
  return m ? m[1] : "";
}

const showResultBox = computed(() => suggestions.value.length > 0 || !!searchMessage.value);
const searchActive = computed(() => searchFocused.value || !!keyword.value || showResultBox.value);
const inputPadClass = computed(() => {
  if (!searchActive.value) return "pl-11 pr-3";
  return keyword.value ? "pl-3 pr-[104px]" : "pl-3 pr-14";
});

const tahunAjaran = computed(() => sekolahStore.tahunAjaran);

const semester = computed(() => {
  const s = String(sekolahStore.semester || "").trim();
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
});

function animateValue(targetRef, endValue) {
  const maxValue = Math.max(endValue, 0);
  targetRef.value = 0;
  if (maxValue === 0) return;
  const duration = Math.min(10000, Math.max(1000, maxValue * 16));
  const startTime = performance.now();
  let lastPaint = 0;
  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    if (progress >= 1) {
      targetRef.value = maxValue;
      return;
    }
    if (now - lastPaint >= 33) {
      lastPaint = now;
      targetRef.value = Math.round(maxValue * progress);
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

async function loadDataAwal() {
  loading.value = true;
  networkError.value = false;
  searchMessage.value = "";
  let siswaFailed = false;
  try {
    const res = await getPublicSiswa();
    const items = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    siswaRaw.value = items;
    animateValue(totalSiswa, res?.totalItems || 0);
    animateValue(totalLaki, res?.totalLaki || 0);
    animateValue(totalPerempuan, res?.totalPerempuan || 0);

    let kx = 0, kxi = 0, kxii = 0;
    for (const s of items) {
      const k = kelasDariRombel(s?.nama_rombel);
      if (k === "X") kx++;
      else if (k === "XI") kxi++;
      else if (k === "XII") kxii++;
    }
    animateValue(totalKelasX, kx);
    animateValue(totalKelasXI, kxi);
    animateValue(totalKelasXII, kxii);
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
    nextTick(() => {
      if (animId) cancelAnimationFrame(animId);
      if (trackRef.value) animId = requestAnimationFrame(scrollStep);
    });
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
  if (!result.length) searchMessage.value = "Data murid tidak ditemukan.";
}

function resetSearch() {
  keyword.value = "";
  suggestions.value = [];
  searchMessage.value = "";
  startPlaceholderTypewriter();
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
  if (!selectedSiswa.value) { verifyError.value = "Murid belum dipilih."; return; }
  const nisnInputClean = String(nisnInput.value || "").trim();
  const nisnSiswaClean = String(selectedSiswa.value.nisn || "").trim();
  if (!nisnInputClean) { verifyError.value = "NISN wajib diisi."; return; }
  if (!nisnSiswaClean) { verifyError.value = "Data murid ini belum memiliki NISN."; return; }
  if (nisnInputClean !== nisnSiswaClean) { verifyError.value = "NISN tidak sesuai."; return; }
  if (Number(captchaInput.value) !== captcha.value.a + captcha.value.b) { verifyError.value = "Jawaban captcha salah."; makeCaptcha(); captchaInput.value = ""; return; }
  const siswaId = selectedSiswa.value.id || selectedSiswa.value.nisn || selectedSiswa.value._key;
  if (!siswaId) { verifyError.value = "ID murid tidak ditemukan."; return; }
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
  if (!el) { animId = requestAnimationFrame(scrollStep); return; }
  const oneSet = el.scrollWidth / 3;
  el.scrollLeft += 0.5;
  if (el.scrollLeft >= oneSet) el.scrollLeft = 0;
  animId = requestAnimationFrame(scrollStep);
}

function pauseScroll() { if (animId) cancelAnimationFrame(animId); }
function resumeScroll() { animId = requestAnimationFrame(scrollStep); }

onMounted(() => {
  sekolahStore.fetchSekolah();
  loadDataAwal();
  startPlaceholderTypewriter();
  animId = requestAnimationFrame(scrollStep);
});

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId);
  clearTimeout(typewriterTimer);
  clearInterval(typewriterTimer);
});

</script>
