/**
 * DATA JADWAL PELAJARAN — KELAS 4C
 * -----------------------------------------------------------------------
 * File ini murni DATA (tidak ada logic tampilan di sini).
 * Untuk membuat jadwal kelas lain, copy file ini,
 * ganti isinya, lalu ganti nama variabel TETAP "SCHEDULE_DATA",
 * dan arahkan <script src="..."> di index.html ke file barumu.
 *
 * Struktur ini mengikuti apa adanya format JSON asli.
 * -----------------------------------------------------------------------
 */
const SCHEDULE_DATA = {
  "informasi_sekolah": {
    "judul": "JADWAL PELAJARAN KELAS 4C",
    "nama_sekolah": "SD Tarakanita Citra Raya Wilayah Tangerang",
    "tahun_ajaran": "2026/2027"
  },
  "jadwal": [
    {
      "no": 1,
      "waktu": "07.15 - 07.30",
      "senin": "Senam/Upacara (07.15-08.25)",
      "selasa": "Literasi",
      "rabu": "Literasi",
      "kamis": "Senam",
      "jumat": "Literasi"
    },
    {
      "no": 2,
      "waktu": "07.30 - 08.05",
      "senin": "Senam/Upacara (07.15-08.25)",
      "selasa": "Matematika",
      "rabu": "IPAS",
      "kamis": "PJOK",
      "jumat": "B.Indonesia"
    },
    {
      "no": 3,
      "waktu": "08.05 - 08.40",
      "senin": "Literasi (08.25-08.40)",
      "selasa": "Matematika",
      "rabu": "IPAS",
      "kamis": "PJOK",
      "jumat": "B.Indonesia"
    },
    {
      "no": 4,
      "waktu": "08.40 - 09.15",
      "senin": "B.Inggris",
      "selasa": "B.Indonesia",
      "rabu": "Matematika",
      "kamis": "Pancasila",
      "jumat": "PKT"
    },
    {
      "no": "-",
      "waktu": "09.15 - 09.30",
      "keterangan": "ISTIRAHAT"
    },
    {
      "no": 5,
      "waktu": "09.30 - 10.05",
      "senin": "B.Inggris",
      "selasa": "B.Indonesia",
      "rabu": "Matematika",
      "kamis": "Seni Musik",
      "jumat": "PKT"
    },
    {
      "no": 6,
      "waktu": "10.05 - 10.40",
      "senin": "IPAS",
      "selasa": "Agama",
      "rabu": "B.Indonesia",
      "kamis": "IPAS",
      "jumat": "PBP"
    },
    {
      "no": 7,
      "waktu": "10.40 - 11.15",
      "senin": "Matematika",
      "selasa": "Agama",
      "rabu": "B.Indonesia",
      "kamis": "IPAS",
      "jumat": "PBP"
    },
    {
      "no": "-",
      "waktu": "11.15 - 11.30",
      "keterangan": "ISTIRAHAT"
    },
    {
      "no": 8,
      "waktu": "11.30 - 12.05",
      "senin": "AKM",
      "selasa": "Native",
      "rabu": "Pancasila",
      "kamis": "Komputer 1",
      "jumat": "Seni Tari"
    },
    {
      "no": 9,
      "waktu": "12.05 - 12.40",
      "senin": "PJOK",
      "selasa": "Seni Rupa",
      "rabu": "Pancasila",
      "kamis": "Komputer 1",
      "jumat": "Refleksi (12.05-12.20)"
    },
    {
      "no": 10,
      "waktu": "12.40 - 12.50",
      "senin": "Refleksi (12.40-12.50)",
      "selasa": "Refleksi (12.40-12.50)",
      "rabu": "Refleksi (12.40-12.50)",
      "kamis": "Refleksi (12.40-12.50)",
      "jumat": ""
    }
  ],
  "pengesahan": {
    "kepala_sekolah": {
      "status": "Mengetahui",
      "nama": "Paulina Dwi Yunita Widiyarti, S.Pd"
    },
    "wali_kelas": {
      "status": "Wali Kelas",
      "nama": "Stefanus Bayu Nugroho, S.Pd"
    }
  }
};