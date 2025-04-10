document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.getElementById("theme-toggle");
    const form = document.getElementById("contact-form");
    emailjs.init("QN86YGc9clPlk-UVT");


    // Toggle mobile nav
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Sticky navbar background
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector("nav");
        if (window.scrollY > 50) {
            navbar.style.background = "#111";
        } else {
            navbar.style.background = "transparent";
        }

        // Active nav highlighting
        const sections = document.querySelectorAll("section");
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const id = section.getAttribute("id");
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;
            const navItem = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                document.querySelectorAll(".nav-links a").forEach(link => link.classList.remove("active"));
                if (navItem) navItem.classList.add("active");
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });

            // Close mobile nav
            navLinks.classList.remove("active");
        });
    });

    // Contact form validation & EmailJS sending
    if (form) {
        const successMessage = document.createElement("div");
        successMessage.id = "success-message";
        form.appendChild(successMessage);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                alert("❌ Please fill in all fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("❌ Please enter a valid email.");
                return;
            }

            // Send the email using EmailJS
            emailjs.sendForm("service_84224mr", "template_85xhbnm", this)
                .then(() => {
                    successMessage.textContent = "✅ Thank you! Your message has been sent.";
                    successMessage.style.display = "block";
                    this.reset();

                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 4000);
                })
                .catch((error) => {
                    console.error("❌ Failed to send:", error);
                    alert("❌ Message sending failed. Please try again.");
                });
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            themeToggle.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
        });
    }
});
