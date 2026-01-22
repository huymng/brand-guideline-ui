// Handcrafted Style Guide - Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    initDrawingCanvas();
    initColorCopy();
    initScrollAnimations();
    initWobbleEffects();
    initStickyNotes();
    initCheckboxes();
    initPolaroid();
});

// Drawing Canvas
function initDrawingCanvas() {
    const canvas = document.getElementById('sketchCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentTool = 'pencil';
    let currentColor = '#2C1810';

    // Tool buttons
    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.tool) {
                currentTool = btn.dataset.tool;
                toolButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            if (btn.dataset.color) {
                currentColor = btn.dataset.color;
            }
        });
    });

    // Clear button
    const clearBtn = document.getElementById('clearCanvas');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    // Drawing functions
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const pos = getPosition(e);
        lastX = pos.x;
        lastY = pos.y;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();

        const pos = getPosition(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);

        // Add slight wobble for hand-drawn effect
        const wobbleX = pos.x + (Math.random() - 0.5) * 2;
        const wobbleY = pos.y + (Math.random() - 0.5) * 2;

        ctx.lineTo(wobbleX, wobbleY);

        if (currentTool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 3;
        }

        ctx.stroke();

        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
}

// Color Copy Functionality
function initColorCopy() {
    const paletteCards = document.querySelectorAll('.palette-card');
    const toast = document.getElementById('toast');

    paletteCards.forEach(card => {
        card.addEventListener('click', () => {
            const color = card.dataset.color;
            if (!color) return;

            copyToClipboard(color);
            showToast(toast, `Copied: ${color}`);

            // Animate the card
            card.style.transform = 'rotate(-5deg) scale(1.05)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function showToast(toast, message) {
    if (!toast) return;

    const messageEl = toast.querySelector('.toast-message');
    if (messageEl) {
        messageEl.textContent = message;
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.palette-card, .type-card, .postcard, .sticky-note, .notebook-card, .guideline-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = Math.random() * 200;
                const rotation = (Math.random() - 0.5) * 4;

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = `translateY(0) rotate(${rotation}deg)`;
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Wobble Effects on Hover
function initWobbleEffects() {
    const wobbleElements = document.querySelectorAll(
        '.sketch-button, .stamp-button, .sticker, .washi-strip'
    );

    wobbleElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'wobbleHover 0.3s ease';
        });

        el.addEventListener('animationend', () => {
            el.style.animation = '';
        });
    });

    // Add wobble keyframes
    if (!document.getElementById('wobble-keyframes')) {
        const style = document.createElement('style');
        style.id = 'wobble-keyframes';
        style.textContent = `
            @keyframes wobbleHover {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(-3deg); }
                50% { transform: rotate(3deg); }
                75% { transform: rotate(-2deg); }
                100% { transform: rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Sticky Notes Drag Effect
function initStickyNotes() {
    const stickyNotes = document.querySelectorAll('.sticky-note');

    stickyNotes.forEach(note => {
        let rotation = (Math.random() - 0.5) * 6;
        note.style.transform = `rotate(${rotation}deg)`;

        note.addEventListener('mouseenter', () => {
            note.style.transform = 'rotate(0deg) scale(1.02)';
            note.style.zIndex = '10';
        });

        note.addEventListener('mouseleave', () => {
            note.style.transform = `rotate(${rotation}deg) scale(1)`;
            note.style.zIndex = '';
        });
    });
}

// Custom Checkboxes Animation
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.sketch-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.animation = 'checkPop 0.3s ease';
            }
        });
    });

    // Add check pop keyframes
    if (!document.getElementById('check-keyframes')) {
        const style = document.createElement('style');
        style.id = 'check-keyframes';
        style.textContent = `
            @keyframes checkPop {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Polaroid Interactive Effect
function initPolaroid() {
    const polaroid = document.getElementById('polaroidFrame');
    if (!polaroid) return;

    polaroid.addEventListener('click', () => {
        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 10000;
            animation: flashEffect 0.3s ease;
        `;
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 300);
    });

    // Add flash keyframes
    if (!document.getElementById('flash-keyframes')) {
        const style = document.createElement('style');
        style.id = 'flash-keyframes';
        style.textContent = `
            @keyframes flashEffect {
                0% { opacity: 0; }
                20% { opacity: 0.8; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Doodle Trail on Mouse Move (subtle)
(function initDoodleTrail() {
    let lastDoodle = 0;
    const doodleInterval = 2000; // One doodle every 2 seconds max

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastDoodle < doodleInterval) return;
        if (Math.random() > 0.1) return; // Only 10% chance

        lastDoodle = now;

        const doodle = document.createElement('div');
        const shapes = ['star', 'heart', 'dot'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        let content = '';
        if (shape === 'star') content = '★';
        else if (shape === 'heart') content = '♥';
        else content = '•';

        doodle.textContent = content;
        doodle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: ${10 + Math.random() * 10}px;
            color: #D4A574;
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
            animation: doodleFade 2s ease forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;

        document.body.appendChild(doodle);
        setTimeout(() => doodle.remove(), 2000);
    });

    // Add fade keyframes
    if (!document.getElementById('doodle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'doodle-keyframes';
        style.textContent = `
            @keyframes doodleFade {
                0% { opacity: 0.3; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(0.5) rotate(180deg) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
})();

// Paper Fold Effect on Section Headers
(function initPaperFold() {
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', () => {
            const underline = header.querySelector('.underline-doodle');
            if (underline) {
                underline.style.transform = 'scaleX(1.1)';
                underline.style.transition = 'transform 0.3s ease';
            }
        });

        header.addEventListener('mouseleave', () => {
            const underline = header.querySelector('.underline-doodle');
            if (underline) {
                underline.style.transform = 'scaleX(1)';
            }
        });
    });
})();

// Tape Peel Effect
(function initTapePeel() {
    const tapeElements = document.querySelectorAll('.washi-tape, .swatch-tape, .washi-strip');

    tapeElements.forEach(tape => {
        tape.addEventListener('mouseenter', () => {
            tape.style.transform = 'rotate(-2deg) translateY(-2px)';
            tape.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)';
            tape.style.transition = 'all 0.2s ease';
        });

        tape.addEventListener('mouseleave', () => {
            tape.style.transform = '';
            tape.style.boxShadow = '';
        });
    });
})();

// Random Page Curl Animation
(function initPageCurl() {
    const cards = document.querySelectorAll('.notebook-paper, .postcard, .notebook-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '5px 5px 15px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
})();

// Button Press Effect
(function initButtonPress() {
    const buttons = document.querySelectorAll('.sketch-button, .stamp-button, .tape-button');

    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
})();

// Parallax Doodles
(function initParallaxDoodles() {
    const doodles = document.querySelectorAll('.doodle');

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / centerX;
        const moveY = (e.clientY - centerY) / centerY;

        doodles.forEach((doodle, index) => {
            const speed = (index + 1) * 5;
            const x = moveX * speed;
            const y = moveY * speed;
            doodle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
})();
