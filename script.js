document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#sticky-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Pricing table functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tables = document.querySelectorAll('.table-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tables.forEach(table => table.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${tabName}-table`).classList.add('active');
        });
    });

    // Populate tables
    function populateSingleTable() {
        const tbody = document.querySelector('#single-table tbody');
        for (let i = 1; i <= 10; i++) {
            const people = i * 50;
            const price = people;
            const row = `<tr>
                <td>Up to ${people} people</td>
                <td>$${price}</td>
            </tr>`;
            tbody.innerHTML += row;
        }
    }

    function populateUnlimitedTable() {
        const tbody = document.querySelector('#unlimited-table tbody');
        for (let i = 1; i <= 10; i++) {
            const people = i * 50;
            let price = 100 * i;
            if (i > 5) price = Math.round(price * 0.9); // 10% discount for higher tiers
            const row = `<tr>
                <td>Up to ${people} people w/ mailing</td>
                <td>$${price} per year</td>
            </tr>`;
            tbody.innerHTML += row;
        }
    }

    populateSingleTable();
    populateUnlimitedTable();

    // New code for language switcher
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // Here you would implement the logic to change the website's language
            console.log(`Language changed to: ${selectedLanguage}`);
            // For demonstration purposes, we'll just update the dropdown label
            this.options[this.selectedIndex].text = this.options[this.selectedIndex].text;
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Event listeners for arrows
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Start the slideshow
    startSlideShow();
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = toggle.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-toggle.active').forEach(activeToggle => {
                if (activeToggle !== toggle) {
                    activeToggle.classList.remove('active');
                    activeToggle.parentElement.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current answer
            toggle.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
});