// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

// Create a success message element
function showFormMessage(message, isSuccess) {
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 12px;
        margin-top: 10px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        background-color: ${isSuccess ? '#d4edda' : '#f8d7da'};
        color: ${isSuccess ? '#155724' : '#721c24'};
        border: 1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    contactForm.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (name && email && message) {
        // Display success message
        showFormMessage('Thank you for your message! We will get back to you soon.', true);
        
        // Reset form
        contactForm.reset();
    } else {
        showFormMessage('Please fill in all fields.', false);
    }
});

// Add active class to nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll-to-top functionality
let scrollTopBtn = null;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #3498db;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            scrollTopBtn.addEventListener('mouseenter', () => {
                scrollTopBtn.style.transform = 'scale(1.1)';
            });
            scrollTopBtn.addEventListener('mouseleave', () => {
                scrollTopBtn.style.transform = 'scale(1)';
            });
            document.body.appendChild(scrollTopBtn);
        }
    } else if (scrollTopBtn) {
        scrollTopBtn.remove();
        scrollTopBtn = null;
    }
});

console.log('Common All Website loaded successfully!');
