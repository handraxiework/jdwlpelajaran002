/**
 * DATA AGENDA MINGGUAN — KELAS 4C
 * -----------------------------------------------------------------------
 * Di-update setiap hari Jumat. Setiap mata pelajaran berisi ARRAY agenda
 * (bisa lebih dari satu item kalau perlu), dengan format tiap item:
 *
 *   {
 *     "hari": "rabu",        // OPSIONAL. Isi kalau agenda ini hanya berlaku
 *                             // di sesi hari tsb (mis. sumatif tanggal pasti).
 *                             // Kosongkan / hapus baris ini kalau agenda
 *                             // berlaku untuk SEMUA sesi mapel itu minggu ini.
 *     "jenis": "sumatif",     // "sumatif" | "latihan" | "materi"
 *                             // menentukan warna highlight & label badge.
 *     "keterangan": "..."     // teks detail yang tampil di tabel & kartu.
 *   }
 *
 * PENTING: kalau "hari" diisi, keterangan HANYA akan muncul & meng-highlight
 * sesi mapel tsb di hari itu saja (sesi mapel yang sama di hari lain tetap
 * polos, tidak ikut ter-highlight).
 *
 * Key mapel HARUS sama persis dengan nama yang dipakai di file jadwal
 * (kelas4c-jadwal.js).
 * -----------------------------------------------------------------------
 */
const AGENDA_DATA = {
  "mapel": {
    "B.Indonesia": [
      {
        "jenis": "sumatif",
        "keterangan": "Sumatif dan Latihan soal"
      }
    ],
    "B.Inggris": [
      {
        "jenis": "materi",
        "keterangan": "Time and Durations"
      }
    ],
    "Matematika": [
      {
        "jenis": "latihan",
        "keterangan": "Latihan soal ATS dan persiapan sumatif Bab 2"
      }
    ],
    "IPAS": [
      {
        "jenis": "materi",
        "keterangan": "Percobaan menanam biji kacang hijau, Bab 3 Perubahan wujud benda"
      }
    ],
    "PJOK": [
      {
        "jenis": "materi",
        "keterangan": "Permainan bola besar"
      }
    ],
    "Seni Rupa": [
      {
        "jenis": "materi",
        "keterangan": "Seni rupa membuat souvenir cup gelas"
      }
    ],
    "Seni Musik": [
      {
        "jenis": "materi",
        "keterangan": "Ragam jenis tari"
      }
    ],
    "Seni Tari": [
      {
        "jenis": "materi",
        "keterangan": "Ragam jenis tari"
      }
    ],
    "Pancasila": [
      {
        "jenis": "latihan",
        "keterangan": "Latihan Soal persiapan ATS dan review materi ATS"
      }
    ],
    "Komputer 1": [
      {
        "jenis": "sumatif",
        "keterangan": "Sumatif test 1, membuat tabel di Microsoft Word"
      }
    ],
    "Agama": [
      {
        "jenis": "sumatif",
        "keterangan": "Sumatif: 1. Kisah Pembebasan Bangsa Israel dan Perjalanan di Padang Gurun dan 2. Sepuluh Perintah Allah"
      }
    ],
    "PBP": [
      {
        "jenis": "materi",
        "keterangan": "Menyusun paragraf untuk membuat cerita"
      }
    ],
    "AKM": [
      {
        "jenis": "materi",
        "keterangan": "Literasi"
      }
    ],
    "PKT": [
      {
        "jenis": "materi",
        "keterangan": "Sikap Ugahari dalam Mencapai Keberhasilan"
      }
    ]
  }
};