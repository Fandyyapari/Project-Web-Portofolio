// script.js - File ini di-load di semua halaman
document.addEventListener('DOMContentLoaded', function () {
    halamanutama();
    initializeContactForm();
});

// Highlight menu sesuai halaman aktif
function halamanutama() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.style.color = '#d08d10'; // Warna kuning/orange
            link.style.fontWeight = 'bold';
        }
    });
}

// Typing effect untuk hero section
function initTypingEffect() {
    const texts = ['front-end web development.', 'UI/UX design.', 'creative solutions.'];
    let count = 0;
    let index = 0;
    let currentText = '';

    function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];

        document.querySelector('.hero-subtitle').textContent = currentText.substring(0, index);
        index++;

        if (index > currentText.length) {
            index = 0;
            count++;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    type();
}

// Panggil di home page saja
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    initTypingEffect();
}

// Counter animation untuk stats
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 10;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger ketika halaman About dimuat
if (window.location.pathname.includes('about.html')) {
    document.addEventListener('DOMContentLoaded', initCounterAnimation);
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById("contact-form")

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault()

        // Get form data
        const formData = new FormData(this)
        const name = formData.get("name")
        const email = formData.get("email")
        const subject = formData.get("subject")
        const message = formData.get("message")

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification("Please fill in all fields.", "error")
            return
        }

        if (!isValidEmail(email)) {
            showNotification("Please enter a valid email address.", "error")
            return
        }

        // Simulate form submission
        const submitButton = this.querySelector(".submit-button")
        const originalText = submitButton.textContent

        submitButton.textContent = "Sending..."
        submitButton.disabled = true

        setTimeout(() => {
            showNotification("Thank you! Your message has been sent successfully.", "success")
            contactForm.reset()
            submitButton.textContent = originalText
            submitButton.disabled = false
        }, 2000)
    })
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === "success" ? "#28a745" : "#dc3545"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
        notification.style.transform = "translateX(0)"
    }, 100)

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => {
            document.body.removeChild(notification)
        }, 300)
    }, 5000)
}
