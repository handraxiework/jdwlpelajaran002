/**
 * app.js — LOGIC TAMPILAN JADWAL PELAJARAN
 * -----------------------------------------------------------------------
 * File ini TIDAK berisi data mata pelajaran apa pun. Semua konten
 * diambil dari variabel/file global yang didefinisikan di folder data:
 *   - SCHEDULE_DATA          (data/xxx-jadwal.js)   -> grid jadwal harian
 *   - AGENDA_DATA             (data/xxx-agenda.js)   -> detail agenda mingguan,
 *                                                        per mapel bisa dikunci ke hari tertentu
 *   - window.PERIODE_DATA_URL (diset di index.html)  -> path ke file
 *                                                        data/xxx-periode.json
 *                                                        berisi tanggal minggu berjalan
 *
 * Supaya bisa dipakai untuk kelas lain (mis. Kelas 4), cukup buat file
 * data baru dengan struktur yang sama lalu ganti <script src> dan
 * PERIODE_DATA_URL di index.html. File ini tidak perlu diubah sama sekali.
 *
 * CATATAN: karena periode.json diambil lewat fetch(), file ini harus
 * dibuka lewat web server (mis. GitHub Pages, atau `python3 -m http.server`
 * saat testing lokal) — bukan dibuka langsung sebagai file:// di browser.
 * Kalau fetch gagal (mis. dibuka via file://), tanggal otomatis dihitung
 * dari minggu berjalan sebagai fallback.
 * -----------------------------------------------------------------------
 */

(function () {
  const DAYS = [
    { key: "senin", label: "Senin" },
    { key: "selasa", label: "Selasa" },
    { key: "rabu", label: "Rabu" },
    { key: "kamis", label: "Kamis" },
    { key: "jumat", label: "Jumat" },
  ];

  const JENIS_BADGE = {
    sumatif: { cls: "badge-sumatif", label: "Sumatif", cellCls: "cell-sumatif" },
    latihan: { cls: "badge-latihan", label: "Latihan Soal", cellCls: "cell-latihan" },
    materi: { cls: "badge-agenda", label: "Agenda", cellCls: "" },
  };

  const ICON_RULES = [
    ["indonesia", "📖"],
    ["inggris", "🔤"],
    ["matematika", "🔢"],
    ["pjok", "🏃"],
    ["sbdp", "🎨"],
    ["pancasila", "🦅"],
    ["komputer", "💻"],
    ["agama", "🙏"],
    ["akm", "📝"],
    ["pbp", "🌱"],
    ["pkt", "❤️"],
    ["literasi", "📚"],
    ["senam", "🚩"],
    ["upacara", "🚩"],
    ["refleksi", "💭"],
    ["native", "🌍"],
    ["istirahat", "🍽️"],
  ];

  function iconFor(text) {
    const t = (text || "").toLowerCase();
    for (const [key, icon] of ICON_RULES) {
      if (t.includes(key)) return icon;
    }
    return "🏫";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---- Cari agenda yang cocok untuk mapel di hari tertentu -------------
  // Prioritas:
  //   1) item dengan "hari" == dayKey (agenda spesifik untuk sesi itu saja)
  //   2) item TANPA "hari" (agenda umum, berlaku di semua sesi mapel ini)
  // Kalau ada item lain yang "hari"-nya beda (bukan dayKey) dan tidak ada
  // item umum, sesi ini tidak menampilkan apa-apa (agenda itu memang
  // khusus untuk hari lain).
  function findAgendaItem(subjectRaw, dayKey) {
    if (!subjectRaw || !AGENDA_DATA || !AGENDA_DATA.mapel) return null;
    const clean = subjectRaw.replace(/\(.*?\)/g, "").trim();
    const keys = Object.keys(AGENDA_DATA.mapel);
    const hitKey = keys.find((k) => k.trim().toLowerCase() === clean.toLowerCase());
    if (!hitKey) return null;

    const items = AGENDA_DATA.mapel[hitKey];
    if (!Array.isArray(items)) return null;

    const specific = items.find((it) => it.hari && it.hari.toLowerCase() === dayKey);
    if (specific) return specific;

    const generic = items.find((it) => !it.hari);
    return generic || null;
  }

  function badgeInfoFor(item) {
    if (!item) return null;
    const jenis = (item.jenis || "").toLowerCase();
    return JENIS_BADGE[jenis] || JENIS_BADGE.materi;
  }

  // ---- Periode / tanggal minggu berjalan --------------------------------
  function computeWeekRangeLabel() {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    const bulanID = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember",
    ];
    const sameMonth = monday.getMonth() === friday.getMonth();
    const end = `${friday.getDate()} ${bulanID[friday.getMonth()]} ${friday.getFullYear()}`;
    return sameMonth
      ? `${monday.getDate()} - ${end}`
      : `${monday.getDate()} ${bulanID[monday.getMonth()]} - ${end}`;
  }

  function computeDayDatesFallback() {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    const result = {};
    DAYS.forEach((d, i) => {
      const dt = new Date(monday);
      dt.setDate(monday.getDate() + i);
      result[d.key] = dt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
    });
    return result;
  }

  // Ambil data periode dari file JSON eksternal (data/xxx-periode.json).
  // Kalau tidak ada / gagal fetch, fallback ke perhitungan minggu berjalan.
  async function loadPeriodeData() {
    const url = window.PERIODE_DATA_URL;
    if (!url) {
      return { periode_label: computeWeekRangeLabel(), tanggal: computeDayDatesFallback() };
    }
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      return {
        periode_label: data.periode_label || computeWeekRangeLabel(),
        tanggal: Object.assign(computeDayDatesFallback(), data.tanggal || {}),
      };
    } catch (err) {
      console.warn(
        "Tidak bisa memuat file periode (" + url + "). Menggunakan tanggal minggu berjalan sebagai fallback. " +
          "Kalau kamu membuka file ini langsung via file://, jalankan lewat local web server dulu.",
        err
      );
      return { periode_label: computeWeekRangeLabel(), tanggal: computeDayDatesFallback() };
    }
  }

  function renderHeader(periode) {
    const info = SCHEDULE_DATA.informasi_sekolah || {};
    document.getElementById("pageTitle").textContent = info.judul || "JADWAL PELAJARAN";
    document.getElementById("schoolName").textContent = info.nama_sekolah || "";
    document.getElementById("schoolYear").textContent = info.tahun_ajaran
      ? `Tahun Ajaran ${info.tahun_ajaran}`
      : "";
    document.getElementById("weekRange").textContent = periode.periode_label;
    document.title = info.judul || "Jadwal Pelajaran";
  }

  function renderTableHead(periode) {
    const theadRow = document.getElementById("theadRow");
    let html = `
      <th class="col-no">No</th>
      <th class="col-waktu">Waktu</th>
    `;
    DAYS.forEach((d) => {
      html += `
        <th class="day-${d.key}">${d.label}
          <span class="day-date">${periode.tanggal[d.key] || ""}</span>
        </th>`;
    });
    theadRow.innerHTML = html;
  }

  function renderCell(subjectRaw, dayKey) {
    if (!subjectRaw) return `<td></td>`;

    const item = findAgendaItem(subjectRaw, dayKey);
    const badge = badgeInfoFor(item);
    const icon = iconFor(subjectRaw);
    const cellCls = badge && badge.cellCls ? badge.cellCls : "";

    let inner = `
      <div class="cell-subject">
        <span class="subject-name">${icon} ${escapeHtml(subjectRaw)}</span>`;
    if (item) {
      inner += `<span class="subject-desc">${escapeHtml(item.keterangan)}</span>`;
    }
    if (badge) {
      inner += `<span class="badge ${badge.cls}">${badge.label}</span>`;
    }
    inner += `</div>`;
    return `<td class="${cellCls}">${inner}</td>`;
  }

  function renderTableBody() {
    const tbody = document.getElementById("tbody");
    let html = "";

    SCHEDULE_DATA.jadwal.forEach((row) => {
      if (row.keterangan) {
        html += `
          <tr class="row-break">
            <td class="col-no">${row.no}</td>
            <td>${row.waktu}</td>
            <td colspan="${DAYS.length}">🍽️ ${escapeHtml(row.keterangan)}</td>
          </tr>`;
        return;
      }

      html += `<tr>
        <td class="col-no">${row.no}</td>
        <td class="col-waktu">${row.waktu}</td>`;
      DAYS.forEach((d) => {
        html += renderCell(row[d.key], d.key);
      });
      html += `</tr>`;
    });

    tbody.innerHTML = html;
  }

  // ---- Mobile card-view (tab hari + kartu per jam pelajaran) ----
  function renderMobileSchedule(periode) {
    const tabsEl = document.getElementById("dayTabs");
    const cardsEl = document.getElementById("dayCards");
    if (!tabsEl || !cardsEl) return;

    const jsDay = new Date().getDay(); // 0=Minggu,1=Senin,...6=Sabtu
    const todayKey = DAYS[jsDay - 1] ? DAYS[jsDay - 1].key : null;
    let activeDay = DAYS.some((d) => d.key === todayKey) ? todayKey : "senin";

    function renderTabs() {
      tabsEl.innerHTML = DAYS.map(
        (d) => `
        <button type="button"
          class="day-tab tab-${d.key} ${d.key === activeDay ? "active" : ""}"
          data-day="${d.key}">
          ${d.label}
          <span class="tab-date">${periode.tanggal[d.key] || ""}</span>
        </button>`
      ).join("");

      tabsEl.querySelectorAll(".day-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeDay = btn.dataset.day;
          renderTabs();
          renderCards();
        });
      });
    }

    function renderCards() {
      let html = "";
      SCHEDULE_DATA.jadwal.forEach((row) => {
        if (row.keterangan) {
          html += `
            <div class="sched-card is-break">
              <div class="sched-time">${row.waktu}</div>
              <div class="sched-body">🍽️ ${escapeHtml(row.keterangan)}</div>
            </div>`;
          return;
        }

        const subjectRaw = row[activeDay];
        if (!subjectRaw) return;

        const item = findAgendaItem(subjectRaw, activeDay);
        const badge = badgeInfoFor(item);
        const icon = iconFor(subjectRaw);
        const cardCls = badge && badge.cellCls ? badge.cellCls : "";

        html += `
          <div class="sched-card ${cardCls}">
            <div class="sched-time">${row.waktu}</div>
            <div class="sched-body">
              <span class="subject-name">${icon} ${escapeHtml(subjectRaw)}</span>
              ${item ? `<span class="subject-desc">${escapeHtml(item.keterangan)}</span>` : ""}
              ${badge ? `<span class="badge ${badge.cls}">${badge.label}</span>` : ""}
            </div>
          </div>`;
      });
      cardsEl.innerHTML = html || `<p class="plain-text">Tidak ada jadwal untuk hari ini.</p>`;
    }

    renderTabs();
    renderCards();
  }

  function renderAgendaDetail(periode) {
    const section = document.getElementById("agendaGrid");
    const periodEl = document.getElementById("agendaPeriod");
    if (!AGENDA_DATA || !AGENDA_DATA.mapel) {
      section.innerHTML = `<p>Belum ada data agenda minggu ini.</p>`;
      return;
    }
    periodEl.textContent = `Periode: ${periode.periode_label}`;

    const dayLabelByKey = Object.fromEntries(DAYS.map((d) => [d.key, d.label]));

    let html = "";
    Object.entries(AGENDA_DATA.mapel).forEach(([subject, items]) => {
      if (!Array.isArray(items)) return;
      const icon = iconFor(subject);
      items.forEach((item) => {
        const badge = badgeInfoFor(item);
        const hariLabel = item.hari ? dayLabelByKey[item.hari.toLowerCase()] : null;
        const tanggal = item.hari ? periode.tanggal[item.hari.toLowerCase()] : null;
        html += `
          <div class="agenda-card ${badge && badge.cellCls ? badge.cellCls : ""}">
            <div class="subject-name">${icon} ${escapeHtml(subject)}
              ${hariLabel ? `<span class="agenda-day-tag">${hariLabel}${tanggal ? " · " + tanggal : ""}</span>` : ""}
            </div>
            <p>${escapeHtml(item.keterangan)}</p>
            ${badge ? `<span class="badge ${badge.cls}">${badge.label}</span>` : ""}
          </div>`;
      });
    });
    section.innerHTML = html;
  }

  function renderAgendaPenting(periode) {
    const list = document.getElementById("agendaPentingList");
    if (!AGENDA_DATA || !AGENDA_DATA.mapel) {
      list.innerHTML = `<li>Belum ada agenda penting minggu ini.</li>`;
      return;
    }
    const dayLabelByKey = Object.fromEntries(DAYS.map((d) => [d.key, d.label]));
    const items = [];

    Object.entries(AGENDA_DATA.mapel).forEach(([subject, arr]) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((item) => {
        if ((item.jenis || "").toLowerCase() !== "sumatif") return;
        let daysText = "";
        if (item.hari) {
          const label = dayLabelByKey[item.hari.toLowerCase()];
          const tanggal = periode.tanggal[item.hari.toLowerCase()];
          daysText = label ? `${label}${tanggal ? ", " + tanggal : ""}` : "";
        } else {
          const days = [];
          SCHEDULE_DATA.jadwal.forEach((row) => {
            DAYS.forEach((d) => {
              const cell = row[d.key];
              if (cell && cell.toLowerCase().startsWith(subject.toLowerCase())) {
                if (!days.includes(d.label)) days.push(d.label);
              }
            });
          });
          daysText = days.join(", ");
        }
        items.push(`<strong>${escapeHtml(subject)}</strong>${daysText ? ` (${daysText})` : ""}`);
      });
    });

    list.innerHTML =
      items.length > 0
        ? items.map((i) => `<li>${i}</li>`).join("")
        : `<li>Tidak ada sumatif minggu ini.</li>`;
  }

  function renderSignature() {
    const p = SCHEDULE_DATA.pengesahan;
    const box = document.getElementById("signatureBox");
    if (!p) {
      box.innerHTML = "";
      return;
    }
    box.innerHTML = `
      <div class="sig-block">
        <div>${escapeHtml(p.kepala_sekolah.status)},</div>
        <div class="sig-name">${escapeHtml(p.kepala_sekolah.nama)}</div>
      </div>
      <div class="sig-block">
        <div>${escapeHtml(p.wali_kelas.status)},</div>
        <div class="sig-name">${escapeHtml(p.wali_kelas.nama)}</div>
      </div>`;
  }

  async function init() {
    const periode = await loadPeriodeData();
    renderHeader(periode);
    renderTableHead(periode);
    renderTableBody();
    renderMobileSchedule(periode);
    renderAgendaDetail(periode);
    renderAgendaPenting(periode);
    renderSignature();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
