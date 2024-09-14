document.addEventListener("DOMContentLoaded", function() {
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


const exploreButton = document.getElementById("explore-button");
exploreButton.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth"
    });
});

const navbarLinks = document.querySelectorAll("nav a");
navbarLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth"
        });
    });
});

const contactForm = document.getElementById("contact-form");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            modalMessage.textContent = "I'll be in touch soon!";
            contactForm.reset();
        } else {
            modalMessage.textContent = "Oops! There was a problem submitting your form.";
        }
        modal.classList.add("show");
    }).catch(error => {
        modalMessage.textContent = "Oops! There was a problem submitting your form.";
        modal.classList.add("show");
    });
});

modalClose.addEventListener("click", function() {
    modal.classList.remove("show");
});
});
