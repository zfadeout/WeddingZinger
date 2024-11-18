document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navigation functionality
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

    // Populate pricing tables
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
            if (i > 5) price = Math.round(price * 0.9);
            const row = `<tr>
                <td>Up to ${people} people w/ mailing</td>
                <td>$${price} per year</td>
            </tr>`;
            tbody.innerHTML += row;
        }
    }

    populateSingleTable();
    populateUnlimitedTable();

    // Language switcher functionality
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageDropdown) {
        languageDropdown.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            this.options[this.selectedIndex].text = this.options[this.selectedIndex].text;
        });
    }

    // Carousel functionality
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

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        startSlideShow();
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = toggle.classList.contains('active');
            
            document.querySelectorAll('.faq-toggle.active').forEach(activeToggle => {
                if (activeToggle !== toggle) {
                    activeToggle.classList.remove('active');
                    activeToggle.parentElement.nextElementSibling.classList.remove('active');
                }
            });

            toggle.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Add Contacts functionality
    function initializeAddContacts() {
        const addContactsBtn = document.querySelector('.add-contacts-btn');
        const contactsPopup = document.getElementById('contactsPopup');
        const closePopupBtn = document.querySelector('.close-popup');

        function openPopup() {
            contactsPopup.classList.add('active');
        }

        function closePopup() {
            contactsPopup.classList.remove('active');
        }

        // Function to create email/phone fields
        function createContactInfoFields() {
            return `
                <div class="contact-info-fields">
                    <div class="form-group">
                        <div class="input-field">
                            <label class="input-label">Email</label>
                            <input type="email" class="input-control">
                        </div>
                        <div class="input-field">
                            <label class="input-label">Phone</label>
                            <input type="tel" class="input-control">
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to update additional people fields
        function updateAdditionalPeople(size) {
            const additionalPeopleContainer = document.querySelector('.additional-people');
            if (!additionalPeopleContainer) return;
            
            additionalPeopleContainer.innerHTML = '';

            for (let i = 2; i <= size; i++) {
                const personHTML = `
                    <div class="additional-person">
                        <div class="person-header">
                            <h3>Person ${i}</h3>
                            <a href="#" class="remove-person">Remove</a>
                        </div>
                        <div class="form-group">
                            <div class="input-field">
                                <label class="input-label">First Name</label>
                                <input type="text" class="input-control">
                            </div>
                            <div class="input-field">
                                <label class="input-label">Last Name</label>
                                <input type="text" class="input-control">
                            </div>
                        </div>
                        <div class="contact-info-container">
                            ${createContactInfoFields()}
                        </div>
                        <a href="#" class="add-contact-info">+ Additional Email/Phone</a>
                    </div>
                `;
                additionalPeopleContainer.innerHTML += personHTML;
            }

            // Add event listeners for remove buttons
            const removeButtons = additionalPeopleContainer.querySelectorAll('.remove-person');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const person = button.closest('.additional-person');
                    person.remove();
                    
                    // Update group size select
                    const currentSize = additionalPeopleContainer.querySelectorAll('.additional-person').length + 1;
                    const groupSizeSelect = document.querySelector('.group-size-select');
                    if (groupSizeSelect) {
                        groupSizeSelect.value = currentSize.toString();
                    }
                });
            });

            // Add event listeners for "Additional Email/Phone" buttons
            const addContactInfoButtons = additionalPeopleContainer.querySelectorAll('.add-contact-info');
            addContactInfoButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const contactInfoContainer = button.previousElementSibling;
                    const newFields = createContactInfoFields();
                    // Create a wrapper div for the new fields
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = newFields;
                    // Add remove button for additional contact info
                    const removeButton = document.createElement('a');
                    removeButton.href = '#';
                    removeButton.className = 'remove-contact-info';
                    removeButton.textContent = 'Remove';
                    wrapper.querySelector('.contact-info-fields').appendChild(removeButton);
                    
                    contactInfoContainer.appendChild(wrapper);

                    // Add event listener for the remove button
                    removeButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        wrapper.remove();
                    });
                });
            });
        }

        if (addContactsBtn && closePopupBtn) {
            addContactsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openPopup();
            });

            closePopupBtn.addEventListener('click', closePopup);

            document.addEventListener('click', (e) => {
                if (!contactsPopup.contains(e.target) && e.target !== addContactsBtn) {
                    closePopup();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closePopup();
                }
            });

            // New Contact Form Creation
            const newContactOption = contactsPopup.querySelector('.popup-content li:first-child');
            const overlay = document.createElement('div');
            overlay.className = 'contact-form-overlay';
            
            const formHTML = `
                <div class="contact-form-popup">
                    <button class="close-form">&times;</button>
                    
                    <div class="contact-form-header">
                        <h2 class="contact-form-title">Add a New Contact</h2>
                        <a href="#" class="show-advanced">Show Advanced</a>
                    </div>
                    
                    <div class="contact-type-selector">
                        <label class="type-option">
                            <input type="radio" name="contact-type" value="individual" checked>
                            <span>Individual - A single person</span>
                        </label>
                        <label class="type-option">
                            <input type="radio" name="contact-type" value="couple">
                            <span>Couple or Family - Multiple people tied to a contact</span>
                            <span class="help-icon" title="Add multiple people under one contact">?</span>
                        </label>
                    </div>

                    <div class="couple-family-fields">
                        <div class="group-size-field">
                            <label class="group-size-label">Group Size</label>
                            <select class="group-size-select">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        
                        <div class="greeting-field">
                            <label class="greeting-label">Couple/Family Greeting</label>
                            <textarea class="greeting-textarea" placeholder="Enter greeting..."></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="input-field">
                            <label class="input-label">First Name</label>
                            <input type="text" class="input-control">
                        </div>
                        <div class="input-field">
                            <label class="input-label">Last Name</label>
                            <input type="text" class="input-control">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="input-field">
                            <label class="input-label">Email</label>
                            <input type="email" class="input-control">
                        </div>
                        <div class="input-field">
                            <label class="input-label">Phone</label>
                            <input type="tel" class="input-control">
                        </div>
                    </div>

                    <div class="additional-people"></div>
                    
                    <div class="form-footer">
                        <button class="btn btn-secondary">Save and Add Another</button>
                        <button class="btn btn-primary">Add Contact</button>
                    </div>
                </div>
            `;
            
            overlay.innerHTML = formHTML;
            document.body.appendChild(overlay);
            
            // New Contact Form Event Handlers
            newContactOption.addEventListener('click', () => {
                closePopup();
                overlay.classList.add('active');
            });
            
            const closeFormBtn = overlay.querySelector('.close-form');
            closeFormBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
            });
            
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });

            // Contact type change handler
            const contactTypeInputs = overlay.querySelectorAll('input[name="contact-type"]');
            contactTypeInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const coupleFamilyFields = overlay.querySelector('.couple-family-fields');
                    if (e.target.value === 'couple') {
                        coupleFamilyFields.classList.add('active');
                        updateAdditionalPeople(2); // Initialize with 2 people
                    } else {
                        coupleFamilyFields.classList.remove('active');
                        const additionalPeopleContainer = overlay.querySelector('.additional-people');
                        if (additionalPeopleContainer) {
                            additionalPeopleContainer.innerHTML = '';
                        }
                    }
                });
            });

            // Group size change handler
            const groupSizeSelect = overlay.querySelector('.group-size-select');
            if (groupSizeSelect) {
                groupSizeSelect.addEventListener('change', (e) => {
                    const size = parseInt(e.target.value);
                    updateAdditionalPeople(size);
                });
            }

            // Show Advanced handler
            const showAdvancedLink = overlay.querySelector('.show-advanced');
            if (showAdvancedLink) {
                showAdvancedLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Show advanced options clicked');
                    // Add your show advanced functionality here
                });
            }
        }
    }

    // Initialize Add Contacts functionality
    initializeAddContacts();
});