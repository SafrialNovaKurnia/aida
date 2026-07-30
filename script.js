// JavaScript Interactive Logic for Nur Aida Umaese 24th Birthday Web App

document.addEventListener('DOMContentLoaded', () => {
    initParticlesCanvas();
    setupAudioPlayer();
});

/* -------------------------------------------------------------
 * 1. Floating Hearts Canvas Animation
 * ------------------------------------------------------------- */
function initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;

    class HeartParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 14 + 8;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.rotation = Math.random() * Math.PI;
            this.rotSpeed = (Math.random() - 0.5) * 0.02;
            this.color = ['#ff4d6d', '#ff758f', '#ffb703', '#ff9ebb', '#c9184a'][Math.floor(Math.random() * 5)];
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.y * 0.01) * 0.5;
            this.rotation += this.rotSpeed;

            if (this.y < -30) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
            ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
            ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
            ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new HeartParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* -------------------------------------------------------------
 * 2. Pamungkas - Happy Birthday To You Audio Player
 * ------------------------------------------------------------- */
let bgAudio = null;
let isPlayingAudio = false;

function setupAudioPlayer() {
    bgAudio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggleBtn');
    const musicText = document.getElementById('musicText');

    if (!bgAudio) return;

    musicBtn.addEventListener('click', () => {
        toggleMusic();
    });
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicToggleBtn');
    const musicText = document.getElementById('musicText');

    if (!bgAudio) return;

    if (isPlayingAudio) {
        bgAudio.pause();
        isPlayingAudio = false;
        musicText.innerText = "Putar Lagu Pamungkas 🎵";
        musicBtn.classList.remove('playing');
    } else {
        bgAudio.play().then(() => {
            isPlayingAudio = true;
            musicText.innerText = "Hentikan Musik 🎵";
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.warn("Audio play blocked by browser, trying user touch...", err);
            // Fallback or retry
        });
    }
}

/* -------------------------------------------------------------
 * 3. Envelope Modal Functions
 * ------------------------------------------------------------- */
function openEnvelope() {
    const modal = document.getElementById('envelope-section');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Auto-start Pamungkas song when opening envelope if not playing
    if (!isPlayingAudio && bgAudio) {
        toggleMusic();
    }
}

function closeEnvelope() {
    const modal = document.getElementById('envelope-section');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

/* -------------------------------------------------------------
 * 4. Blow Candles & Wish Logic
 * ------------------------------------------------------------- */
let isBlown = false;

function blowCandles() {
    if (isBlown) return;
    isBlown = true;

    // Extinguish flames
    document.querySelectorAll('.flame-particle').forEach(f => f.classList.add('extinguished'));

    const btn = document.getElementById('blowCandleBtn');
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Lilin ke-24 Telah Ditiup! ✨';
    btn.classList.remove('pulse-btn');
    btn.style.opacity = '0.8';

    // Auto-start Pamungkas song if not playing
    if (!isPlayingAudio && bgAudio) {
        toggleMusic();
    }

    // Show wish message
    const wishMsg = document.getElementById('wishMessage');
    wishMsg.classList.remove('hidden');

    // Typewriter effect for wish
    const textElement = document.getElementById('typedWishText');
    const fullText = "Bismillah... Semoga di usia ke-24 ini, Nur Aida Umaese selalu dilimpahi keberkahan, kebahagiaan sejati, kesehatan, dan dilancarkan jalan menuju pernikahan kita. Aamiin! 🤲💖";
    
    let i = 0;
    textElement.innerHTML = '';
    const timer = setInterval(() => {
        if (i < fullText.length) {
            textElement.innerHTML += fullText.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 35);
}

/* -------------------------------------------------------------
 * 5. Accordion Toggle
 * ------------------------------------------------------------- */
function toggleAccordion(button) {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

    if (!isActive) {
        item.classList.add('active');
    }
}

/* -------------------------------------------------------------
 * 6. Copy Single Romantic Message Logic
 * ------------------------------------------------------------- */
function copyRomanticMessage() {
    const text = document.getElementById('romantic-msg-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Ucapan romantis berhasil disalin! 📋");
    }).catch(err => {
        showToast("Gagal menyalin teks.");
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}
