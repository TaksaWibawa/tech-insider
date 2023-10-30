# Tech Insider (Blog Website)

## Deskripsi Website

Tech Insider adalah sebuah website blog yang fokus pada topik-topik seputar teknologi, inovasi, dan perkembangan terkini di dunia digital. Tujuan utama dari Tech Insider adalah memberikan wawasan dan informasi terbaru seputar tren teknologi, perkembangan dalam industri IT, serta dampaknya terhadap kehidupan sehari-hari dan bisnis. Melalui artikel-artikel, ulasan, dan berita terkini, Tech Insider bertujuan untuk memberikan pemahaman yang mendalam kepada pembacanya tentang perkembangan teknologi, gadget, aplikasi, serta isu-isu penting yang terkait dengan dunia teknologi.

## Tujuan Pembuatan Website

1. Dapat menjadi media untuk berbagi informasi dan wawasan seputar teknologi.

2. Dapat menjadi sarana untuk mengasah kemampuan menulis dan berpikir kritis.

## Struktur Folder

```sh
├───apis # berisi file-file yang berhubungan dengan API (firebase)
├───assets # berisi file-file yang berhubungan dengan aset (gambar, dll)
├───components # berisi file-file komponen yang digunakan dalam website
│ ├───button
│ ├───card
│ │ └───horizontal-card
│ ├───footer
│ ├───form # berisi file-file komponen form
│ │ ├───create-article
│ │ ├───edit-article
│ │ ├───signin
│ │ └───signup
│ ├───icons # berisi file-file komponen gambar yang diubah menjadi icon
│ ├───markdown # berisi file-file komponen markdown yang digunakan pada fitur write and read article
│ │ ├───markdown-editor
│ │ └───markdown-previewer
│ ├───modal
│ │ ├───delete-modal
│ │ ├───failed-modal
│ │ └───success-modal
│ ├───navbar # berisi file-file komponen navbar
│ │ ├───dashboard
│ │ └───mobile
│ ├───pagination # berisi file-file komponen pagination yang digunakan untuk dashboard
│ ├───search-bar
│ ├───section # berisi file-file komponen section
│ │ ├───article-section
│ │ ├───dashboard-section
│ │ ├───hero-section
│ │ └───preview-section
│ ├───sidebar
│ ├───skeleton # berisi file-file komponen skeleton yang digunakan untuk loading
│ │ └───article
│ ├───spinner # berisi file-file komponen spinner yang digunakan untuk loading
│ └───tooltip
├───config # berisi file-file konfigurasi (firebase, openai, auth)
├───constant # berisi file-file static yang digunakan dalam website
├───hooks # berisikan custom hooks yang digunakan dalam website
├───layouts # berisi file-file layout yang digunakan dalam website
├───pages # berisi file-file halaman yang digunakan dalam website
├───routes # berisi file untuk private dan protected route
│ ├───private-route
│ └───protected-route
├───services # berisi file-file service yang digunakan dalam website
├───store
│ ├───articles
│ └───users
```

## Teknologi yang Digunakan

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Chakra UI](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![OpenAI](https://img.shields.io/badge/OpenAI-5A5AFF?style=for-the-badge&logo=openai&logoColor=white) ![React-Hook-Form](https://img.shields.io/badge/react--hook--form-5A5AFF?style=for-the-badge&logo=react-hook-form&logoColor=white) ![Redux-Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Fitur dan Alur Website

1. **Authentication**

   - User melakukan login dengan menggunakan email dan password.
   - Jika user belum memiliki akun, maka user dapat melakukan registrasi dengan mengisi form yang disediakan.
   - Field yang harus diisi pada form registrasi adalah:
     a. Email
     b. Password
     c. Nama Depan
     d. Nama Belakang
   - Jika user sudah memiliki akun, maka user dapat melakukan login dengan mengisi form yang disediakan.

2. **Authenticated User**

   - Setelah berhasil login, user akan diarahkan kembali ke halaman utama.
   - User yang terautentikasi dapat menulis artikel dengan mengklik tombol "Write" pada navbar.
   - User juga dapat menghapus dan mengedit artikel yang telah ditulis pada halaman dashboard.
   - User dapat melihat artikel yang ditulis oleh user lain pada halaman utama.

3. **Non-authenticated User:**
   - User hanya dapat melihat artikel yang ditulis oleh user lain pada halaman utama.
   - User tidak dapat menulis artikel, menghapus artikel, dan mengedit artikel.
