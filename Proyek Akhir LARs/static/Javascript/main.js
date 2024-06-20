const tombolPindah = document.querySelectorAll('#tombolChat1, #tombolChat2');
const tombolKembali = document.getElementById('tombolKembali');
const animasiGeser = document.getElementById('animasiGeser');

// Fungsi untuk mengarahkan ke halaman lain
function pindahKeHalamanLain(event) {
  event.preventDefault(); // Mencegah perilaku default elemen tautan
  animasiGeser.style.left = '0';
  setTimeout(function() {
    window.location.href = '/chatbot';
  }, 500);
}

// Fungsi untuk kembali ke halaman awal
function kembaliKeHalamanAwal() {
  animasiGeser.style.left = '0';
  setTimeout(function() {
    window.location.href = '/';
  }, 500);
}

// Event listener untuk tombol "Pindah ke Halaman Lain"
tombolPindah.forEach(function(tombol) {
  tombol.addEventListener('click', pindahKeHalamanLain);
});

// Event listener untuk tombol "Kembali"
if (tombolKembali) {
  tombolKembali.addEventListener('click', kembaliKeHalamanAwal);
}

//dark mode
const switchInput = document.querySelector('.switch-input');
const body = document.body;

// Fungsi untuk menyimpan preferensi mode ke localStorage
function saveMode(mode) {
  localStorage.setItem('mode', mode);
}

// Fungsi untuk mengambil preferensi mode dari localStorage
function getMode() {
  return localStorage.getItem('mode') || 'light';
}

// Fungsi untuk mengatur mode berdasarkan preferensi yang tersimpan
function setMode(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
    switchInput.checked = true;
  } else {
    body.classList.remove('dark-mode');
    switchInput.checked = false;
  }
  saveMode(mode);
}

// Event listener untuk toggle switch
switchInput.addEventListener('change', () => {
  const mode = switchInput.checked ? 'dark' : 'light';
  setMode(mode);
});

// Mengatur mode awal saat halaman dimuat
const initialMode = getMode();
setMode(initialMode);