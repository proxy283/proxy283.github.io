/* ==========================================================================
   PORTFOLIO ENGINE - TIRTH JOSHI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initializations
    initTheme();
    initTypewriter();
    initMobileNav();
    initContactForm();
    initFinaiSlideshow();
    initProjectSlideshows();
});

/* ==========================================================================
   FINAI SCREENSHOT SLIDESHOW
   ========================================================================== */
let finaiCurrentSlide = 0;

function finaiSlide(index) {
    const slides = document.querySelectorAll('#finai-slider .screenshot-slide');
    const dots = document.querySelectorAll('.finai-dot');
    if (!slides.length) return;
    slides[finaiCurrentSlide].classList.remove('active');
    if (dots[finaiCurrentSlide]) dots[finaiCurrentSlide].classList.remove('active');
    finaiCurrentSlide = index;
    slides[finaiCurrentSlide].classList.add('active');
    if (dots[finaiCurrentSlide]) dots[finaiCurrentSlide].classList.add('active');
}

function initFinaiSlideshow() {
    const slides = document.querySelectorAll('#finai-slider .screenshot-slide');
    if (!slides.length) return;
    setInterval(() => {
        finaiSlide((finaiCurrentSlide + 1) % slides.length);
    }, 3500);
}

/* ==========================================================================
   PROJECT CARD SLIDESHOWS (AngelOne, DSE, Face)
   ========================================================================== */
const projectState = { angel: 0, dse: 0, face: 0 };

function projectSlide(project, index) {
    const slides = document.querySelectorAll(`.${project}-slide`);
    const dots   = document.querySelectorAll(`.${project}-dot`);
    if (!slides.length) return;
    slides[projectState[project]].classList.remove('active');
    dots[projectState[project]].classList.remove('active');
    projectState[project] = index;
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    // Handle Before/After label for face pixelator
    if (project === 'face') {
        const beforeLabel = document.querySelector('.before-after-label:not(.after-label)');
        const afterLabel  = document.querySelector('.before-after-label.after-label');
        if (beforeLabel && afterLabel) {
            if (index === 0) {
                beforeLabel.style.display = 'block';
                afterLabel.style.display  = 'none';
            } else {
                beforeLabel.style.display = 'none';
                afterLabel.style.display  = 'block';
            }
        }
    }
}

function initProjectSlideshows() {
    // Auto-advance each project slider at different intervals
    ['angel', 'dse'].forEach((proj, i) => {
        const slides = document.querySelectorAll(`.${proj}-slide`);
        if (!slides.length) return;
        setInterval(() => {
            projectSlide(proj, (projectState[proj] + 1) % slides.length);
        }, 4000 + i * 600);
    });
    // Face: slower, 5s toggle
    const faceSlides = document.querySelectorAll('.face-slide');
    if (faceSlides.length) {
        setInterval(() => {
            projectSlide('face', (projectState['face'] + 1) % faceSlides.length);
        }, 5000);
    }
}

/* ==========================================================================
   THEME SWITCHING ENGINE
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    if (!themeToggleBtn) return;
    
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

/* ==========================================================================
   TYPEWRITER ENGINE
   ========================================================================== */
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (!textElement) return;

    const words = [
        'Full-Stack Development',
        'Artificial Intelligence',
        'Machine Learning',
        'Database Management'
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Pause at complete word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const headerNav = document.querySelector('.header-nav');

    if (!hamburger || !mobileSidebar) return;

    // Toggle menu
    hamburger.addEventListener('click', () => {
        const isOpen = mobileSidebar.classList.toggle('open');
        hamburger.style.transform = isOpen ? 'rotate(90deg)' : 'none';
        
        // Convert hamburger bars into an X
        const bars = hamburger.querySelectorAll('span');
        if (bars.length >= 3) {
            if (isOpen) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        }
    });

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('open');
            hamburger.style.transform = 'none';
            const bars = hamburger.querySelectorAll('span');
            if (bars.length >= 3) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Add scrolled class to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-msg');
    const statusMsg = document.querySelector('.form-status');
    const submitBtn = form.querySelector('.btn-primary');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validations
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const msg = msgInput.value.trim();

        if (!name || !email || !msg) {
            showStatus('Please fill in all empty fields.', 'error');
            return;
        }

        // Show sending animation
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending Message...`;

        // Send via FormSubmit AJAX to user's Gmail using FormData (extremely robust against CORS)
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Message', msg);
        formData.append('_subject', `New Portfolio Message from ${name}`);

        fetch('https://formsubmit.co/ajax/joshitirth12@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // FormSubmit returns { success: "true", message: "..." }
            // Or { success: "false", message: "This form needs Activation..." } on first submit
            const isSuccess = data.success === 'true' || data.success === true;
            const needsActivation = data.message && (data.message.includes('needs Activation') || data.message.includes('Activation'));

            if (isSuccess || needsActivation) {
                if (needsActivation) {
                    showStatus("Activation email sent! Please check your Gmail (joshitirth12@gmail.com) and click 'Activate Form' to activate.", "success");
                } else {
                    showStatus(`Thank you, ${name.split(' ')[0]}! Your message has been sent successfully. I will receive it on my Gmail.`, 'success');
                }
                // Clear inputs
                nameInput.value = '';
                emailInput.value = '';
                msgInput.value = '';
            } else {
                showStatus('Something went wrong. Please check your inputs or email me directly at joshitirth12@gmail.com.', 'error');
            }
        })
        .catch(err => {
            // Let's also support a graceful fallback: if AJAX fails, submit standard form post
            showStatus('Sending...', 'success');
            // Create an ephemeral form to submit directly
            const tempForm = document.createElement('form');
            tempForm.action = 'https://formsubmit.co/joshitirth12@gmail.com';
            tempForm.method = 'POST';
            tempForm.target = '_blank';
            
            const fields = { name, email, message: msg };
            for (const key in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                tempForm.appendChild(input);
            }
            document.body.appendChild(tempForm);
            tempForm.submit();
            document.body.removeChild(tempForm);
        })
        .finally(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });

    function showStatus(text, type) {
        statusMsg.textContent = text;
        statusMsg.className = `form-status ${type}`;
        statusMsg.style.display = 'block';

        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 8000);
    }
}
