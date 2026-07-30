// JavaScript Interactive Logic for Nur Aida Umaese 23rd Birthday Web App

document.addEventListener('DOMContentLoaded', () => {
    initParticlesCanvas();
    setupAudioSynth();
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

            // Draw Heart Shape
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
 * 2. Romantic Audio Melody Synthesizer (Web Audio API)
 * ------------------------------------------------------------- */
let audioCtx = null;
let isPlayingMusic = false;
let musicInterval = null;

function setupAudioSynth() {
    const musicBtn = document.getElementById('musicToggleBtn');
    const musicText = document.getElementById('musicText');

    musicBtn.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (isPlayingMusic) {
            stopMusic();
            musicText.innerText = "Putar Musik Romantic";
            musicBtn.classList.remove('active');
        } else {
            startRomanticTune();
            musicText.innerText = "Hentikan Musik 🎵";
            musicBtn.classList.add('active');
        }
    });
}

function startRomanticTune() {
    isPlayingMusic = true;

    // Gentle chord frequencies for romantic ambient (C major 7th / F major 7th vibes)
    const notes = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [293.66, 349.23, 440.00, 523.25], // Dm7
        [392.00, 493.88, 587.33, 698.46]  // G7
    ];

    let chordIdx = 0;

    function playChord() {
        if (!isPlayingMusic || !audioCtx) return;

        const currentNotes = notes[chordIdx % notes.length];
        chordIdx++;

        currentNotes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            // Soft envelope
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(audioCtx.currentTime + idx * 0.15);
            osc.stop(audioCtx.currentTime + 3.0);
        });
    }

    playChord();
    musicInterval = setInterval(playChord, 3000);
}

function stopMusic() {
    isPlayingMusic = false;
    if (musicInterval) {
        clearInterval(musicInterval);
    }
}

/* -------------------------------------------------------------
 * 3. Envelope Modal Functions
 * ------------------------------------------------------------- */
function openEnvelope() {
    const modal = document.getElementById('envelope-section');
    modal.classList.remove('hidden');
}

function closeEnvelope() {
    const modal = document.getElementById('envelope-section');
    modal.classList.add('hidden');
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
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Lilin ke-23 Telah Ditiup! ✨';
    btn.classList.remove('pulse-btn');
    btn.style.opacity = '0.8';

    // Show wish message
    const wishMsg = document.getElementById('wishMessage');
    wishMsg.classList.remove('hidden');

    // Typewriter effect for wish
    const textElement = document.getElementById('typedWishText');
    const fullText = "Bismillah... Semoga di usia ke-23 ini, Nur Aida Umaese selalu dilimpahi keberkahan, kebahagiaan sejati, kesehatan, dan dilancarkan jalan menuju pernikahan kita. Aamiin! 🤲💖";
    
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

    // Close all
    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

    // Toggle selected
    if (!isActive) {
        item.classList.add('active');
    }
}

/* -------------------------------------------------------------
 * 6. Tabs Switcher
 * ------------------------------------------------------------- */
function switchTab(index) {
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-content').forEach((content, idx) => {
        if (idx === index) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

/* -------------------------------------------------------------
 * 7. Copy Text & Toast Notification
 * ------------------------------------------------------------- */
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Teks ucapan berhasil disalin! 📋");
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
