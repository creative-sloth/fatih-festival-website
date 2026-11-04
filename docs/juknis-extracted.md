# Facts extracted from the Juknis documents

Two sources, both from the committee:

1. **"Juknis Fatih festival 3.0.pdf"** (33-page booklet, 3 Nov 2026). Verbatim text: [`juknis-extracted.txt`](./juknis-extracted.txt).
2. **The per-competition Drive folder** (supplied 4 Nov 2026), which supersedes the booklet for the competitions it covers. Every fee and PIC below is the one printed there.

Every value below is copied from a committee document. Page numbers refer to the booklet's PDF page footer. Where a document is silent it is marked **GAP** and left out of `content/`. Nothing is inferred.

---

## 1. Festival-wide facts (now resolved)

| Item | Value | PDF page |
|---|---|---|
| Name | Fatih Festival 3.0 | 1 |
| Tagline | Two Decades of Learning, A Lifetime of Impact | 1 |
| Host | Fatih Bilingual School, Banda Aceh | 13 |
| Venue | Fatih Bilingual School, Jl. Sultan Malikul Saleh No. 103, Bandaraya, Lamlagang, Banda Raya, Kota Banda Aceh 23122 | 7 |
| Registration site | fatih.sch.id/fatih-festival | 1 |
| Level tiers | TK, SD/MI, SMP/MTs, SMA/MA, plus SMP & SMA combined | 2 |
| Number of competitions | 16 | 2 |
| Closing / Awarding | Jumat, 13 November 2026 | 26, 27, 28 |
| Bank account | BSI **2828-0000-63** a/n Fatih Bilingual School (main) and BSI **2828-0000-52** a/n Fatih Bilingual School (second) | 4, 7, 23, 32 |

### CONFLICT 1 — closing date
Pages 26, 27 and 28 say Closing and Awarding is **13 November 2026**. Page 7 says the SD Olimpiade runs **11–14 November 2026** and winners are announced **14 November 2026**. So the festival end date is either 13 or 14 November. Needs one answer from the committee before `festival.endDate` is filled.

### CONFLICT 2 — two different bank accounts
Both accounts are titled "Fatih Bilingual School" but are used inconsistently:

- account ending **63**: Mewarnai, Vokal Solo SD, Spelling Bee, Vokal Solo SMP, Baca Puisi, Basket, Cerdas Cermat
- account ending **52**: Olimpiade MIPA SD, English Debate, STEM Expo

If one account is a typo, participants will transfer to the wrong number. Needs committee confirmation, per competition.

### GAP 1 — no festival-level contact person
The document gives per-competition PICs only. Three competitions say "Narahubung akan diinformasikan oleh panitia" (pages 8, 11, 28, 33). There is **no** festival-wide narahubung, so `festival.contacts` stays `null`.

---

## 2. The 16 competitions

Folder: `drive.google.com/drive/folders/1VNVZn00g0nIWg1TeDHQqrwj3D6dBu1yA` — 12 subfolders plus 4 loose files, 15 documents in total. All are Google Docs or `.docx`, all publicly readable. Cross-checked against the booklet:

| Competition | Change vs booklet | Source |
|---|---|---|
| **Futsal (SD)** | **Now documented in full.** Rp 350.000/tim, PIC Mr. Surya 0853 7192 8827, max 12 people (10 pemain + 2 official), knockout, 2×10 min (2×15 min from semifinals), BSI `2828-0000-63`. The booklet omitted it entirely. | PETUNJUK TEKNIS - LOMBA FUTSAL SD/MI |
| **Cerdas Cermat (SMA)** | Same as booklet: Rp 200.000/tim, BSI 63. Its "Narahubung" heading is present but **no name or number is filled in**. | JUKNIS LOMBA CERDAS CERMAT SMA/SEDERAJAT |
| **English Debate (SMA)** | Same as booklet. Still **no PIC** printed. | Juknis English Debate-2 |
| **STEM Expo** | Confirmed name "STEM EXPO", Rp 150.000, BSI `2828-0000-52`. Still **no PIC**. | STEM EXPO - JUKNIS |
| **Culture Vlog (SMA)** | PIC Mr. Surya 0853 7192 8827. Fee not printed in this file; booklet says Rp 50.000. | Juknis_Culture_Vlog |
| **Olimpiade SD** | Fee Rp 50.000, BSI `2828-0000-52`. CP line is a **placeholder**: "CP: Siswa (08-)". | PETUNJUK TEKNIS - Olimpiade IPA dan Matematika Tingkat SD |
| **Spelling Bee SD** | Fee Rp 40.000, BSI `2828-0000-63`. CP is a **placeholder**: "CP: Siswa ….". | Juknis Spelling bee SD |
| **All others** | Fee and PICs match the booklet exactly. | the 8 remaining files |

### General contact persons (new, committee-supplied)

| | |
|---|---|
| Contact Person Umum 1 | **Ms Nabila · 0823 6418 0206** |
| Contact Person Umum 2 | **Mr Saddam · 0821 6506 9163** |

These now fill `festival.contacts` and are also the fallback shown on any competition whose own juknis prints no PIC (Debate, STEM Expo; and the two placeholder-only files above).

---

## 1c. The booklet's 16, as originally transcribed

Still accurate for anything the folder did not restate. Numbering is the document's own (page 2). `slug` is the repo slug.

### TK

**01 · Lomba Mewarnai** — `tk-mewarnai` *(new, not in repo)*
- Peserta: siswa/i TK sederajat, perwakilan sekolah (surat keterangan)
- Biaya: Rp 30.000 per peserta, BSI 2828-0000-63
- Tema: comic · paling lama 2 jam · media crayon
- Narahubung: Ms. Wardah 0852 6062 6123 · Ms. Maula 0822 4691 6727
- Grup WhatsApp: https://chat.whatsapp.com/KWAuisJuc7g3Yj52g25fSM
- Wajib hadir 20 menit sebelum lomba, membawa meja dan alat mewarnai sendiri
- Penilaian: Kreativitas 60%, Keindahan 20%, Kerapian 20%
- **GAP**: no registration window, no competition date, no form URL
- PDF page 3–4

### SD/MI

**02 · Lomba Bercerita** — `sd-bercerita`
- Biaya: Rp 40.000 per peserta
- **GAP**: page 6 states the juknis "belum tersedia pada saat buku panduan disusun". No rules, no date, no contact.

**03 · Tari Kreasi Group** — `sd-tari-kreasi`
- Biaya: Rp 120.000 per peserta *(note: the document says "per peserta" for a group event, which reads like an error)*
- **GAP**: juknis "belum tersedia" (page 6). No rules, no date, no contact.

**04 · Olimpiade Matematika & IPA** — `sd-olimpiade-mipa`
- Peserta: kelas IV, V, VI SD/MI, perorangan, se-Aceh
- Batas: maksimal 5 siswa per kategori per sekolah; one participant joins **one** category only (IPA *or* Matematika)
- Biaya: Rp 50.000 per peserta, BSI 2828-0000-52
- Pendaftaran: 15 Oktober – 6 November 2026
- Pelaksanaan: 11 – 14 November 2026
- Registrasi ulang: 07.30 – 08.45 WIB
- Olimpiade IPA: 09.30 WIB, 120 menit, ruang **D11**
- Olimpiade Matematika: 09.30 WIB, 120 menit, ruang **D12**
- Satu babak, pilihan ganda, silabus OSN SD
- Penilaian: benar +4, salah −1, kosong 0
- Pengumuman: 14 November 2026
- Hadiah: sertifikat keikutsertaan untuk semua; pemenang dapat sertifikat + medali/plakat (**no prize money stated**)
- Narahubung: "akan diinformasikan oleh panitia melalui WhatsApp"
- PDF page 7–8
- **Answers the open question:** one competition, two separate exam rooms/categories. Not two separate competitions.

**05 · Vokal Solo** — `sd-vocal-solo`
- Peserta: kelas 5 / 6, perwakilan sekolah (surat keterangan atau KTS), maksimal 2 peserta per sekolah
- Biaya: Rp 50.000, BSI 2828-0000-63
- Narahubung: Ms. Desi 0823 1039 9310 · Ms. Ratu 0823 2677 8902
- Dua lagu: satu wajib dari daftar, satu bebas
- Lagu wajib: Prince Poetiray & Quinn Salman "Selalu Ada di Nadimu"; Sal Priadi "Gala Bunga Matahari"; Sherina "Lihatlah Lebih Dekat"; Virgoun "Saat Kau Telah Mengerti"; Idgitaf "Satu-satu"; Ada Band "Yang Terbaik Bagimu"; Gempi "Ajaib"; Sindentosca "Kepompong"; Quinn Salman "Tiba-Tiba"; Sherina Munaf "Andai Aku Besar Nanti"
- Wajib ikut Technical Meeting, bawa file musik di flashdisk
- Penilaian: Materi suara 20%, Teknik 30%, Penghayatan 40%, Penampilan 10%
- **GAP**: no TM date, no competition date, no form URL
- PDF page 9–10

**06 · Spelling Bee** — `sd-spelling-bee`
- Peserta: kelas 5 – 6, perwakilan sekolah (surat keterangan atau KTS)
- Biaya: Rp 40.000 per peserta, BSI 2828-0000-63
- Kehadiran: 15 menit sebelum acara
- Babak: penyisihan dan final
- Waktu mengeja: 10 detik berpikir + 50 detik mengeja
- Narahubung: "akan diinformasikan oleh panitia"
- **GAP**: no quota per school stated, no date, no form URL
- PDF page 11

### SMP/MTs

**07 · Olimpiade Matematika & IPA** — `smp-olimpiade-mipa`
- Peserta: kelas VII, VIII, IX SMP/MTs, perorangan, **tanpa batasan jumlah per sekolah**
- Biaya: Rp 50.000 per peserta *(account not stated on this page)*
- Narahubung: Mr. Dwiki 0813 1850 6606 · Mr. Farisi 0852 8268 8976
- Format: 40 soal / 120 menit tanpa istirahat. Bagian A soal 1–30 pilihan ganda; Bagian B soal 31–40 isian singkat
- Materi Matematika: bilangan dan teori bilangan, aljabar, geometri, statistika dan peluang, kombinatorika
- Materi IPA: Biologi 20 soal (sel, keanekaragaman hayati, ekosistem, sistem organ, genetika) dan Fisika
- Penilaian: A benar +4 / salah −1 / kosong 0, maks 120; B benar +10, maks 100; total 220
- Hadiah: Juara I–III uang pembinaan + sertifikat + piala; semua peserta e-sertifikat
- **GAP**: "Tautan dan batas akhir pendaftaran akan diumumkan oleh panitia" — no reg window, no form URL, no competition date
- PDF page 13–15

**08 · Vokal Solo** — `smp-vocal-solo`
- Peserta: SMP/MTs sederajat, perwakilan sekolah (surat keterangan aktif atau KTS), maksimal 2 peserta per sekolah
- Biaya: Rp 65.000, rekening 2828-0000-63
- Bonus: voucher potongan biaya masuk FBS Rp 10.000.000 untuk setiap pendaftar (tidak dapat diuangkan)
- Narahubung: Mr. Eko 0852 7710 0192
- Dua lagu: satu wajib, satu bebas. File musik diserahkan saat TM
- Lagu wajib putri: Shabrina Leanor "Pendampingmu"; Gloria Jessica "Terbelah Jadi Dua"; Lyodra "Teganya Kau"; Ghea Indrawari "1000x"; Mahalini "Bawa Dia Kembali"; Salma Salsabil "Bunga Hati"; Nabila Taqiyyah "Ku Ingin Pisah"; Tiara Andini "Janji Setia"
- Lagu wajib putra: Tulus "Teh Hijau"; Raim Laode "Komang"; Ifan Seventeen "Jangan Paksa Rindu"; Rony Parulian "Wals Akhir Zaman"; Nadhif Basalamah "Kota Ini Tak Sama Tanpamu"; Rizky Febian "Hingga Tua Bersama"; Adrian Khalif "2001x"; NPD "Sempurnanya Aku"
- Penilaian: Materi suara 20%, Teknik 30%, Penghayatan 40%, Penampilan 10%
- **GAP**: no TM date, no competition date, no form URL
- PDF page 16–17

**09 · Lomba Baca Puisi** — `smp-baca-puisi`
- Peserta: siswa/siswi aktif SMP/MTs, maksimal 2 peserta per sekolah
- Biaya: Rp 40.000, rekening 2828-0000-63
- Durasi tampil: 5 – 7 menit
- Narahubung: Ms. Afrileni 0813 6040 4988
- Teks wajib diperdengarkan tanpa teleprompter/gawai; wajib bawa kartu pelajar atau surat keterangan
- Puisi pilihan: "Sajak Pertemuan Mahasiswa" (W.S. Rendra); "Membaca Tanda-Tanda" (Taufiq Ismail); "Janji Terang Bulan" (Armijn Pane); "Aku, Sahaya" (Aoh K. Hadimadja); "Dalam Doaku" (Sapardi Djoko Damono)
- Penilaian: Penghayatan dan ekspresi 30%, Vokal/artikulasi/intonasi/volume 30%, Penguasaan dan interpretasi 30%, Gestur 10%
- **GAP**: no competition date, no form URL
- PDF page 18–19

**10 · Lomba Basket** — `smp-basket`
- Biaya: Rp 300.000 per tim, BSI 2828-0000-63
- Tim: maksimal 12 pemain + official (2 official di bench)
- Peraturan: FIBA 2023
- Sistem: gugur; 4 × 10 menit waktu kotor, 2 menit terakhir kuarter 4 waktu bersih; shot clock 24 detik
- Timeout: kuarter 1–2 dua kali, kuarter 3–4 tiga kali
- Toleransi terlambat 10 menit (jadwal) / 15 menit = Walk Out
- Jersey: tim pertama (tuan rumah) warna terang, tim kedua gelap
- Syarat: KTS + biodata rapor, pemain wajib terdaftar BPJS Ketenagakerjaan
- Narahubung: Mr. Anis 0813 9684 2987
- **GAP**: no competition date, no draw/bracket, no form URL
- PDF page 20–21


### SMA/MA

**11 · English Debate** — `sma-debate`
- Peserta: siswa/i aktif SMA/MA/sederajat (KTS atau surat keterangan aktif), 3 pendebat per tim, maksimal 2 tim per sekolah
- Pendaftaran: **19 September – 7 November 2026**
- Technical Meeting: **9 November 2026**, luring, di Fatih Bilingual School
- Perlombaan: **11 – 13 November 2026**
- Biaya: Rp 300.000 per tim, rekening 2828-0000-52
- Format: Asian Parliamentary (3 on 3), kuota 10 tim; team kedua dari sekolah yang sama masuk waiting list
- Mosi impromptu; babak penyisihan + eliminasi
- Case building: 20 menit penyisihan, 30 menit final
- Constructive speech 7'20", reply speech 4'20", POI menit 1–6
- Hadiah: Juara 1–3 trofi + sertifikat + uang pembinaan; Best Speaker trofi + sertifikat
- **Answers the open question:** the competition is in **English**
- **GAP**: no narahubung, no form URL, no elimination bracket
- PDF page 23–24

**12 · Lomba Essay** — `sma-essay`
- Peserta: pelajar aktif SMA/MA/SMK/sederajat, individu, satu karya per peserta
- Pelaksanaan: **daring**
- Biaya: Rp 40.000 per peserta (lewat formulir pendaftaran/gform)
- Narahubung: Ms. Nabila 0823 6418 0206 (WhatsApp)
- Batas pendaftaran: **Selasa, 10 November 2026**
- Batas unggah karya: **Rabu, 11 November 2026, pukul 14.00 WIB**
- Pengumuman: **Jumat, 13 November 2026** saat Closing dan Awarding
- Tanpa Technical Meeting
- Minimal 5 peserta terverifikasi atau cabang ditutup
- Tema (pilih satu): SDGs/Indonesia Emas 2045; inovasi dan mitigasi kebencanaan; literasi digital dan kecerdasan artifisial
- Format: 1.000–1.500 kata, A4, Times New Roman 12 pt, spasi 1,5, margin 4-4-3-3, PDF bernama `ESSAY_NAMA_SEKOLAH.pdf`
- Penilaian: Kesesuaian tema 15, Orisinalitas 20, Kedalaman analisis 25, Gagasan dan solusi 20, Sistematika 10, Bahasa 10
- Hadiah: Juara 1–3 trofi + sertifikat + uang pembinaan; semua peserta e-sertifikat
- Disqualified: plagiat > 20%, karya AI/joki, sudah dipublikasikan, terlambat, format salah
- **GAP**: no Google Form URL, no upload link
- PDF page 25–26

**13 · Cerdas Cermat** — `sma-cerdas-cermat`
- Peserta: siswa/i aktif SMA/MA/sederajat kelas 10–12, perwakilan resmi sekolah
- Tim: 3 orang, maksimal 2 tim per sekolah (tim kedua waiting list)
- Materi: **Matematika, Biologi, Fisika, Kimia**
- Biaya: Rp 200.000 per tim, BSI 2828-0000-63
- Batas pendaftaran: **Selasa, 10 November 2026**
- Pengumuman: **Jumat, 13 November 2026** saat Closing dan Awarding
- Minimal 5 tim terverifikasi atau cabang ditutup
- Setiap sekolah wajib/dapat membawa 1 Pengamat (guru pendamping atau siswa)
- Mekanisme: babak pemerataan (amplop soal, wajib + lemparan), lalu babak rebutan
- Poin: wajib benar 100, benar sebagian 50, salah 0; lemparan benar +50 / salah −25; rebutan benar +100 / salah −100
- Waktu jawab: soal hitungan 30 detik, non-hitungan 15 detik, wajib satuan SI
- Hadiah: Juara 1–3 trofi/medali + sertifikat + uang pembinaan; semua peserta e-sertifikat
- Narahubung: "akan diinformasikan oleh panitia"
- **Answers the open question:** repo name says "(Math, Eng, Sains)" but the juknis lists Matematika, Biologi, Fisika, Kimia — **no English**. Repo name is wrong.
- **GAP**: no form URL, no TM date, no venue room
- PDF page 27–28

**14 · Culture Vlog Competition** — `sma-culture-vlog`
- Tema: "Culture in Every Lesson: Belajar dari Budaya, Bertumbuh dengan Pendidikan"
- Durasi video 3 – 5 menit, format vertikal 9:16, minimal 720p
- Biaya: Rp 50.000 per peserta
- Narahubung (PIC): Mr. Surya 0853 7192 8827
- Unggah video di Instagram peserta + tagar wajib `#VlogCompetitionFatihFestival3` dan `#FatihFestival3`
- Video orisinal, bebas SARA/kekerasan/perundungan, materi tidak melanggar hak cipta
- **GAP**: "kanal/tautan yang akan diinformasikan" — no submission link, no deadline, no dates, no prize info. Peserta rule is vague ("sesuai ketentuan panitia")
- PDF page 29

### SMP & SMA

**15 · Desain Grafis – Komik** — `smp-sma-desain-grafis`
- Tema: "Culture in Every Lesson: Belajar dari Budaya, Bertumbuh dengan Pendidikan"
- Peserta: SMP/MTs dan SMA/MA
- Biaya: Rp 40.000 per peserta
- Kanvas: 2480 × 3508 px (A4), 300 dpi, maksimal 7–8 panel per halaman
- Format berkas: `.JPG` atau `.PNG`
- Narahubung: Arief Al 0812 6545 4182
- Larangan: Generative AI, clip art, template instan, tracing foto
- Penilaian: Kesesuaian tema, Narasi & alur, Teknis & estetika, Kreativitas
- **Answers the open question:** official name is **"Desain Grafis"** (not "Design Grafis")
- **GAP**: no dates, no submission link, no prizes
- PDF page 31

**16 · STEM Expo** — `smp-sma-steam-project` *(repo slug and name are wrong)*
- Nama resmi: **STEM Expo** — Project Competition, SMP/MTs & SMA/MA
- Peserta: SMP/MTs kelas 7–9 dan SMA/MA kelas 10–12, perwakilan sekolah (surat keterangan atau KTS)
- Tim: **2 orang per tim, maksimal 1 tim per sekolah**
- Biaya: Rp 150.000, BSI 2828-0000-52
- Kategori: Science and Environmental Project · Technology · Invensi Produk
- Tahapan: seleksi proposal → presentasi hasil project → penilaian poster dan eksibisi
- Penilaian: Full Paper (Bab 1–5) 50%, Presentasi 20%, Poster 10%, Eksibisi 20%
- Hadiah: pemenang Best Project per kategori; semua finalis e-sertifikat
- **CONFLICT**: poster and repo say "STEAM Project (Ide, Karya, Prototype Business)"; the juknis says "STEM Expo". Needs one official name.
- **GAP**: entire timeline is "Diumumkan panitia" — no dates at all. No email for paper submission, no form URL, no narahubung
- PDF page 32–33

### Not in the document

**Futsal** — `sd-futsal`
- The repo has a 16th entry, `Futsal (SD, Olahraga)`, taken from the poster.
- The juknis booklet has **no futsal section**: its 16 competitions are the ones above.
- Either futsal was dropped after the poster was printed, or the booklet is incomplete. Needs one answer. Left as-is in `content/` but not confirmed.

---

## 3. Still missing after the PDF

Ranked by how much it blocks the site.

### Blocks launch

| # | Missing | Applies to | Why it blocks |
|---|---|---|---|
| 1 | **Google Form URL** | all 16 | Zero form URLs in the document. Every "Daftar" button stays disabled. `formUrl` |
| 2 | **Per-competition juknis URL** | all 16 | The booklet exists as one 33-page PDF, not as 16 shareable files. Needs a Drive link per file set to "Anyone with the link". `juknisUrl` |
| 3 | **Registration window** | 12 of 16 | Only SD Olimpiade (15 Okt–6 Nov), Debate (19 Sep–7 Nov), Essay (10 Nov), Cerdas Cermat (10 Nov) are dated. The rest have no window, so `lib/status.ts` cannot compute open/closed. `registrationOpens` / `registrationCloses` |
| 4 | **Competition date + time** | 12 of 16 | Only SD Olimpiade (11–14 Nov, 09.30), Debate (11–13 Nov), Essay (upload 11 Nov), Cerdas Cermat (13 Nov) are dated. `competitionDate` |
| 5 | **Festival-level narahubung (2 names + WhatsApp)** | footer | The booklet has per-competition PICs only. `festival.contacts` |
| 6 | **3 logo files** (Fatih, SMA Unggul Garuda Transformasi, Cambridge) | hero | Still placeholder boxes. Cambridge also needs written permission. `festival.logos[i].src` |
| 7 | **Festival end date** | hero | CONFLICT 1: 13 or 14 November. `festival.endDate` |
| 8 | **Per-competition bank account** | 16 | CONFLICT 2: two accounts in use. Must be confirmed before the site shows a transfer target. |
| 9 | **TK level support** | code | The juknis adds Lomba Mewarnai (TK). `Level` is `'SD' \| 'SMP' \| 'SMA'`; CSS has no `--level-tk`, the filter row has no TK option. Needs a code change, not just data. |

### Needed for a complete site

| Missing | Applies to | Note |
|---|---|---|
| Prize amounts | all | The document says "uang pembinaan" with no nominal anywhere. `prizes` |
| Summary (id + en) | all 16 | Site copy, 1–2 sentences each. `summary` |
| English `name` | 15 | Only "English Debate", "Culture Vlog", "Spelling Bee", "STEM Expo", "Essay" are already English. `name.en` |
| Juknis for Bercerita + Tari Kreasi | 2 | Document says "belum tersedia". These two have almost nothing |
| Narahubung | 5 | Olimpiade SD, Spelling Bee, Cerdas Cermat, STEM Expo say "akan diinformasikan"; Debate lists none |
| Culture Vlog submission link + deadline | 1 | "akan diinformasikan" |
| STEM Expo full timeline | 1 | Every row is "Diumumkan panitia" |
| Room / court allocation | most | Only D11 and D12 are named |
| Second PIC per competition | 3 | Mewarnai and Vokal Solo SD each list two PICs; `contact` holds one. Either widen the schema or pick a primary |
| Visa of the `?jenjang=` filter for TK | code | Filter list `FILTERS` is hardcoded `ALL/SD/SMP/SMA` |

### Decisions the juknis answered

- "Design Grafis" → **Desain Grafis** (page 31).
- Debate language → **English** (page 23).
- `Olimpiade Matematika & IPA` → **one** competition, two exam rooms (page 8).
- Cerdas Cermat subjects → Matematika, Biologi, Fisika, Kimia — **not** English (page 27).

### Decisions still open

- "STEAM Project" (poster/repo) vs **"STEM Expo"** (juknis, page 32).
- Futsal: dropped, or missing from the booklet?
- Closing and Awarding: 13 or 14 November?
- Which BSI account is correct per competition?
- Indonesian version of the tagline, or keep the English one in both languages?
- Step 4 of "Cara Daftar" (currently `???`): the juknis flow is Form → transfer to BSI → upload proof → join WhatsApp group → wait for confirmation. Needs one agreed wording.
- Consent policy for publishing winners' names and photos (participants are minors).
- Cambridge logo usage permission.
- Instagram / official channel links for the footer.
