// ===================================
// Configuration
// ===================================

// ** IMPORTANT: Replace this with your Google Apps Script Web App URL **
// Follow the README.md instructions to set up Google Sheets integration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxMXFjAj_qRYHelLiyQg7D124p_I9tDSAYkr9CdRKwOTWGQfbfcx0GWVm61aDij_bIg/exec';

// Wedding date (November 23, 2025, 8:00 PM)
const WEDDING_DATE = new Date('2025-11-23T20:00:00').getTime();

// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Navigation Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Countdown Timer
// ===================================
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2>We\'re Married! 🎉</h2>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Gallery Modal
// ===================================
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'block';
        const img = this.querySelector('img');
        modalImg.src = img.src;
        modalCaption.innerHTML = img.alt;
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ===================================
// RSVP Form Submission
// ===================================
const rsvpForm = document.getElementById('rsvp-form');
const formMessage = document.getElementById('form-message');

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const submitBtn = rsvpForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Hide previous messages
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';

    try {
        // Collect form data
        const formData = new FormData(rsvpForm);
        
        // Get selected events
        const selectedEvents = [];
        document.querySelectorAll('input[name="events"]:checked').forEach(checkbox => {
            selectedEvents.push(checkbox.value);
        });

        // Validate at least one event is selected
        if (selectedEvents.length === 0) {
            throw new Error('Please select at least one event to attend.');
        }

        // Prepare data object
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            guests: formData.get('guests'),
            events: selectedEvents.join(', '),
            dietary: formData.get('dietary') || 'None',
            message: formData.get('message') || 'No message',
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            // For testing purposes - show success message
            console.log('RSVP Data:', data);
            
            formMessage.textContent = '✓ Thank you for your RSVP! We\'re excited to celebrate with you! (Demo mode - configure Google Sheets to save responses)';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            rsvpForm.reset();
        } else {
            // Send data to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Note: With 'no-cors' mode, we can't read the response
            // So we assume success if no error is thrown
            formMessage.textContent = '✓ Thank you for your RSVP! We\'re excited to celebrate with you!';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            // Reset form
            rsvpForm.reset();
        }

    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = '✗ ' + (error.message || 'Oops! Something went wrong. Please try again or contact us directly.');
        formMessage.classList.add('error');
        formMessage.style.display = 'block';
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// ===================================
// Form Validation
// ===================================
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Email validation
emailInput.addEventListener('blur', function() {
    const email = this.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailPattern.test(email)) {
        this.style.borderColor = '#e74c3c';
    } else {
        this.style.borderColor = '';
    }
});

// Phone validation (Indian format)
phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    
    // Allow international format
    if (value.startsWith('91') && value.length > 10) {
        value = value.substring(0, 12);
    } else if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    this.value = value;
});

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Parallax Effect (Hero Section)
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Console Message
// ===================================
console.log(`
%c💑 Kartik & Palak's Wedding 💑
%cThank you for visiting our wedding website!
We're so excited to celebrate with you! 🎉

#kapal
`, 
'font-size: 20px; font-weight: bold; color: #d4af37;',
'font-size: 14px; color: #666;'
);

// ===================================
// Disable Right Click on Images (Optional)
// ===================================
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Image protection enabled!');
    });
});
*/

// ===================================
// Add to Calendar Function (Optional)
// ===================================
function addToCalendar() {
    const event = {
        title: "Kartik & Palak's Wedding",
        description: "Join us in celebrating our special day!",
        location: "Samar Grand, Faridabad",
        startDate: "20251123T200000",
        endDate: "20251124T000000"
    };

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, '_blank');
}

// Add event listener to a button if you want to add this feature
// document.getElementById('add-to-calendar-btn').addEventListener('click', addToCalendar);

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===================================
// Service Worker Registration (for PWA - Optional)
// ===================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/

