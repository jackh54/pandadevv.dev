document.addEventListener("DOMContentLoaded", function() {
    // Typing animation
    const text = "PandaDev (aka Jack)";
    const typingTextElement = document.getElementById("typing-text");
    let index = 0;
    let pauseAfter = "PandaDev".length;
    
    function type() {
        if (index < text.length) {
            typingTextElement.textContent += text.charAt(index);
            index++;
            
            if (index === pauseAfter) {
                setTimeout(type, 1000);
            } else if (index > pauseAfter) {
                setTimeout(type, 50);
            } else {
                setTimeout(type, 100);
            }
        }
    }

    type();

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('section > div').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }
        
        lastScroll = currentScroll;
    });

    // Contact form handling with enhanced feedback
    const contactForm = document.getElementById("contact-form");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const modalClose = document.getElementById("modal-close");

    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        try {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;

            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                modalMessage.innerHTML = '<i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i><br>Message sent successfully!<br>I\'ll be in touch soon.';
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            modalMessage.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i><br>Oops! There was a problem sending your message.<br>Please try again later.';
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            modal.classList.add("show");
            modal.style.display = "flex";
        }
    });

    modalClose.addEventListener("click", function() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    });

    // Close modal when clicking outside
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modalClose.click();
        }
    });
});
