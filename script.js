
// NAMA GUEST DARI URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("to");
  if (guestName) {
    const guestElem = document.getElementById("guest-name");
    if (guestElem) {
      guestElem.textContent = decodeURIComponent(guestName);
    }
  }
});



const btnOpen = document.getElementById("btn-open");
const cover = document.getElementById("cover");
const weddingAudio = document.getElementById("wedding-audio");
const btnMusic = document.getElementById("btn-music");
const musicIcon = document.getElementById("music-icon");

function playAudio() {
  if (weddingAudio) {
    weddingAudio.play().then(() => {
      if (btnMusic) btnMusic.classList.remove("hidden");
      if (musicIcon) musicIcon.className = "fa-solid fa-compact-disc fa-spin";
    }).catch((error) => {
      console.log("Autoplay diblokir oleh browser:", error);
    });
  }
}

function pauseAudio() {
  if (weddingAudio) {
    weddingAudio.pause();
    if (musicIcon) musicIcon.className = "fa-solid fa-music";
  }
}

function toggleAudio() {
  if (weddingAudio) {
    if (weddingAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }
}

// Buka undangan
if (btnOpen) {
  btnOpen.addEventListener("click", () => {
    document.body.classList.remove("scroll-locked");
    if (cover) cover.classList.add("fade-out");
    playAudio();
  });
}

// Toggle audio
if (btnMusic) {
  btnMusic.addEventListener("click", toggleAudio);
}


// COUNTDOWN TIMER
const weddingDate = new Date("December 12, 2026 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// TOAST NOTIFICATION & SALIN REKENING
function showToast(message) {
  const toastMessage = document.getElementById("toast-message");
  const liveToast = document.getElementById("liveToast");
  toastMessage.innerText = message;
  
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
  toastBootstrap.show();
}

function copyText(elementId, message) {
  const text = document.getElementById(elementId).innerText.replace(/\s+/g, '');
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(() => {
    showToast("Gagal menyalin nomor rekening.");
  });
}

// MODAL GALERI LIGHTBOX
function showModalImage(src) {
  const modalImg = document.getElementById("modalGalleryImg");
  modalImg.src = src;
  
  const galleryModal = new bootstrap.Modal(document.getElementById("galleryModal"));
  galleryModal.show();
}

// FORM RSVP & UCAPAN
const rsvpForm = document.getElementById("rsvp-form");
const wishesList = document.getElementById("wishes-list");
const wishesCount = document.getElementById("wishes-count");

let totalWishes = 2;

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("input-nama").value.trim();
    const kehadiran = document.getElementById("input-kehadiran").value;
    const ucapan = document.getElementById("input-ucapan").value.trim();

    if (!nama || !kehadiran || !ucapan) return;

    let badgeClass = "bg-success";
    if (kehadiran === "Tidak Hadir") {
      badgeClass = "bg-warning text-dark";
    } else if (kehadiran === "Ragu-ragu") {
      badgeClass = "bg-secondary";
    }

    const newWish = document.createElement("div");
    newWish.className = "p-3 bg-light rounded-3 mb-2 shadow-xs";
    newWish.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-1">
        <strong class="text-dark">${escapeHtml(nama)}</strong>
        <span class="badge ${badgeClass}">${escapeHtml(kehadiran)}</span>
      </div>
      <p class="small text-secondary m-0">${escapeHtml(ucapan)}</p>
    `;

    wishesList.prepend(newWish);

    totalWishes++;
    wishesCount.textContent = totalWishes;

    rsvpForm.reset();
    showToast("Terima kasih! Konfirmasi dan ucapan Anda telah terkirim.");
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ANIMASI SCROLL REVEAL
const observerOptions = {
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));