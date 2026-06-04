/* ================================================================
   script.js — Logika interaktif website portfolio
   ---------------------------------------------------------------
   Berisi:
   1. Toggle menu burger (buka/tutup di HP)
   2. Tutup menu saat link diklik (UX lebih baik di HP)
   3. Navbar berubah saat di-scroll
   4. Carousel slide (prev / next / dot)
================================================================ */


/* ================================================================
   1. MENU BURGER (Mobile Navigation)
   Saat tombol burger diklik, menu tampil atau sembunyi
================================================================ */

// Ambil elemen tombol burger dan menu navigasi dari HTML
const burgerBtn = document.getElementById('burger-btn');
const navMenu   = document.getElementById('menu');

// Tambahkan aksi saat tombol burger diklik
burgerBtn.addEventListener('click', function () {
    // .toggle() = tambahkan kelas jika belum ada, hapus jika sudah ada
    navMenu.classList.toggle('tampil');
});

// Tutup menu otomatis saat salah satu link navigasi diklik
// (Berguna di HP agar menu langsung tertutup setelah pindah seksi)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navMenu.classList.remove('tampil'); // Paksa hapus kelas tampil
    });
});


/* ================================================================
   2. NAVBAR SCROLL EFFECT
   Navbar mendapatkan bayangan saat halaman di-scroll ke bawah
================================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    // scrollY = seberapa jauh halaman sudah di-scroll (dalam pixel)
    if (window.scrollY > 50) {
        // Jika sudah scroll lebih dari 50px: tambahkan bayangan
        navbar.style.boxShadow = '0 4px 20px rgba(232, 104, 138, 0.15)';
    } else {
        // Jika masih di atas: hapus bayangan
        navbar.style.boxShadow = 'none';
    }
});


/* ================================================================
   3. CAROUSEL SLIDES
   Menggerakkan carousel ke kiri/kanan dan mengupdate dot indikator
================================================================ */

// Ambil elemen-elemen carousel dari HTML
const track   = document.getElementById('carousel-track');  // "rel" geser
const btnPrev = document.getElementById('btn-prev');          // Tombol ‹ kiri
const btnNext = document.getElementById('btn-next');          // Tombol › kanan
const dots    = document.querySelectorAll('.dot');            // Semua titik indikator

// Variabel pelacak: slide mana yang sedang aktif (mulai dari index 0)
let slideAktif = 0;

// Hitung jumlah slide secara otomatis (tidak perlu ubah manual jika tambah slide)
const totalSlide = document.querySelectorAll('.carousel-slide').length;

/* Fungsi utama: pindah ke slide tertentu berdasarkan nomor index */
function pergiKeSlide(index) {
    // Pastikan index tidak keluar batas (0 sampai totalSlide-1)
    // Jika kurang dari 0 → balik ke slide terakhir (efek melingkar)
    if (index < 0) {
        slideAktif = totalSlide - 1;
    }
    // Jika melebihi slide terakhir → balik ke slide pertama
    else if (index >= totalSlide) {
        slideAktif = 0;
    }
    // Jika normal → set index sesuai yang diminta
    else {
        slideAktif = index;
    }

    // Gerakkan track dengan CSS transform translateX
    // Rumus: geser sejauh slideAktif * 100% ke kiri (-)
    // Contoh slide ke-2 (index 1): translateX(-100%)
    track.style.transform = `translateX(-${slideAktif * 100}%)`;

    // Update tampilan titik indikator
    updateDots();
}

/* Fungsi: update titik indikator (dot) */
function updateDots() {
    // Hapus kelas 'active' dari semua titik
    dots.forEach(function (dot) {
        dot.classList.remove('active');
    });
    // Berikan kelas 'active' hanya ke titik yang sesuai slide aktif
    dots[slideAktif].classList.add('active');
}

/* Tombol SEBELUMNYA (‹) */
btnPrev.addEventListener('click', function () {
    pergiKeSlide(slideAktif - 1); // Mundur 1 slide
});

/* Tombol BERIKUTNYA (›) */
btnNext.addEventListener('click', function () {
    pergiKeSlide(slideAktif + 1); // Maju 1 slide
});

/* Klik pada titik indikator langsung ke slide yang dituju */
dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
        // Ambil angka index dari atribut data-index di HTML
        const targetIndex = parseInt(dot.getAttribute('data-index'));
        pergiKeSlide(targetIndex);
    });
});

/* ================================================================
   BONUS: Geser dengan sentuhan jari di HP (Touch Swipe)
   Saat jari digeser ke kiri → next, ke kanan → prev
================================================================ */

let posisiAwalX = 0; // Posisi jari saat pertama menyentuh layar

// Saat jari mulai menyentuh layar
track.addEventListener('touchstart', function (e) {
    posisiAwalX = e.touches[0].clientX; // Simpan posisi X awal
});

// Saat jari diangkat dari layar
track.addEventListener('touchend', function (e) {
    const posisiAkhirX = e.changedTouches[0].clientX; // Posisi X akhir
    const jarak = posisiAwalX - posisiAkhirX;          // Hitung jarak geser

    // Jika geser cukup jauh (> 50px), baru dianggap swipe
    if (Math.abs(jarak) > 50) {
        if (jarak > 0) {
            pergiKeSlide(slideAktif + 1); // Geser kiri = next
        } else {
            pergiKeSlide(slideAktif - 1); // Geser kanan = prev
        }
    }
});