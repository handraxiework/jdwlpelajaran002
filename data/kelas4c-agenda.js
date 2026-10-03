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
{
  "mapel": {
    "B.Indonesia": [
      {
        "jenis": "materi",
        "keterangan": "Teks Deskripsi"
      }
    ],
    "B.Inggris": [
      {
        "jenis": "latihan",
        "keterangan": "LK - Telling times"
      }
    ],
    "Matematika": [
      {
        "jenis": "materi",
        "keterangan": "Operasi Bilangan Cacah"
      }
    ],
    "IPAS": [
      {
        "jenis": "materi",
        "keterangan": "Perubahan Wujud Benda"
      }
    ],
    "PJOK": [
      {
        "jenis": "materi",
        "keterangan": "Permainan tradisional"
      }
    ],
    "Seni Rupa": [
      {
        "jenis": "materi",
        "keterangan": "Membuat tempat pensil dari sedotan"
      }
    ],
    "Pancasila": [
      {
        "jenis": "materi",
        "keterangan": "Hak dan kewajiban anak di rumah"
      }
    ],
    "Komputer 1": [
      {
        "jenis": "sumatif",
        "keterangan": "ATS Komputer"
      }
    ],
    "Agama": [
      {
        "jenis": "materi",
        "keterangan": "Bangsa Israel Memasuki Tanah Terjanji"
      }
    ],
    "PBP": [
      {
        "jenis": "materi",
        "keterangan": "Board Game"
      }
    ],
    "AKM": [
      {
        "jenis": "materi",
        "keterangan": "Numerasi"
      }
    ],
    "PKT": [
      {
        "jenis": "materi",
        "keterangan": "Berperilaku Disiplin Di Lingkungan Sekitarnya Sebagai Suatu Kebiasaan"
      }
    ]
  }
}  
};
