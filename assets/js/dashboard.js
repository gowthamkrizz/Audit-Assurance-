function toggleSidebar() {
    const sidebar = document.getElementById('dashSidebar');
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
        sidebar.classList.remove('collapsed');
        if (sidebar.classList.contains('mobile-open')) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    } else {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.remove('mobile-open');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }
}

function activateSection(targetId) {
    if (!targetId) return;
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Update nav links
    const navLinks = document.querySelectorAll('.dash-nav-link:not(.logout-link)');
    navLinks.forEach(l => {
        if (l.getAttribute('data-target') === targetId) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });

    // Hide all sections and show target
    document.querySelectorAll('.dash-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active-section');
        const bars = section.querySelectorAll('.bar-fill');
        bars.forEach(bar => { bar.style.height = '0'; });
    });

    targetSection.style.display = 'block';
    targetSection.style.opacity = 1;
    targetSection.classList.add('active-section');

    // Save active section in sessionStorage
    sessionStorage.setItem('activeDashSection', targetId);

    // Trigger chart animations if present
    setTimeout(() => {
        const bars = targetSection.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const targetHeight = bar.getAttribute('data-height');
            if (targetHeight) {
                bar.style.height = targetHeight;
            }
        });
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar nav link active state toggling
    const navLinks = document.querySelectorAll('.dash-nav-link:not(.logout-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                activateSection(targetId);

                // On mobile, close sidebar after clicking a link
                if (window.innerWidth <= 768) {
                    const sidebar = document.getElementById('dashSidebar');
                    if (sidebar) {
                        sidebar.classList.remove('mobile-open');
                        document.body.style.overflow = '';
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    });

    // Restore previous active section if returning from 404 or page reload
    function restoreActiveSection() {
        const stored = sessionStorage.getItem('activeDashSection');
        if (stored && document.getElementById(stored)) {
            activateSection(stored);
        }
    }
    restoreActiveSection();
    window.addEventListener('pageshow', restoreActiveSection);

    // Clear active section on logout
    document.querySelectorAll('.logout-link').forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.removeItem('activeDashSection');
        });
    });

    // Close mobile sidebar if clicked outside
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('dashSidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('mobile-open')) {
            if (!sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
                sidebar.classList.remove('mobile-open');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Profile Dropdown click support for mobile/touch
    const profileWidget = document.querySelector('.dropdown-container');
    if (profileWidget) {
        profileWidget.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-dropdown')) {
                profileWidget.classList.toggle('open');
            }
        });

        document.addEventListener('click', (e) => {
            if (!profileWidget.contains(e.target)) {
                profileWidget.classList.remove('open');
            }
        });
    }

    // Populate profile from localStorage
    const savedName = localStorage.getItem('dashboardName') || 'Guest User';
    const savedEmail = localStorage.getItem('dashboardEmail') || 'guest@example.com';
    
    if (savedName) {
        const nameEls = document.querySelectorAll('.profile-name');
        nameEls.forEach(el => el.textContent = savedName);
        
        const avatarEls = document.querySelectorAll('.profile-avatar');
        const initials = savedName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEls.forEach(el => el.textContent = initials || 'U');

        // Update welcome message if it exists
        const welcomeTitle = document.querySelector('.dash-page-title');
        if (welcomeTitle && welcomeTitle.textContent.includes('Welcome')) {
            const firstName = savedName.split(' ')[0];
            welcomeTitle.textContent = 'Welcome back, ' + firstName + '!';
        }
    }
    if (savedEmail) {
        const roleEls = document.querySelectorAll('.profile-role');
        roleEls.forEach(el => el.textContent = savedEmail);
    }

    // Bar chart animation
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            const targetHeight = bar.getAttribute('data-height');
            if (targetHeight) {
                bar.style.height = targetHeight;
            }
        });
    }, 300);

    // Settings Personal Information Form Save Changes Handler
    const settingsCards = document.querySelectorAll('#section-settings .dash-form-card');
    settingsCards.forEach(card => {
        const saveBtn = card.querySelector('.save-settings-btn, .btn-primary');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const inputs = card.querySelectorAll('input, select');
                let allFilled = true;

                inputs.forEach(input => {
                    if (!input.value || !input.value.trim()) {
                        allFilled = false;
                        input.style.borderColor = '#ef4444';
                    } else {
                        input.style.borderColor = '';
                    }
                });

                // Remove existing feedback message if present
                const existingMsg = card.querySelector('.settings-feedback-msg');
                if (existingMsg) existingMsg.remove();

                if (!allFilled) {
                    const msg = document.createElement('p');
                    msg.className = 'settings-feedback-msg';
                    msg.style.color = '#ef4444';
                    msg.style.fontSize = '0.85rem';
                    msg.style.marginTop = '12px';
                    msg.style.fontWeight = '500';
                    msg.textContent = 'Please fill in all details before saving changes.';
                    saveBtn.after(msg);
                } else {
                    sessionStorage.setItem('activeDashSection', 'section-settings');
                    window.location.href = '404.html';
                }
            });

            // Clear red border when user types
            card.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                    const existingMsg = card.querySelector('.settings-feedback-msg');
                    if (existingMsg) existingMsg.remove();
                });
            });
        }
    });

    // Search bar functionality
    const searchBars = document.querySelectorAll('.dash-search');
    searchBars.forEach(searchBar => {
        const input = searchBar.querySelector('input');
        const searchIcon = searchBar.querySelector('i');

        function triggerSearch() {
            if (input && input.value.trim().length > 0) {
                window.location.href = '404.html';
            } else if (input) {
                input.focus();
            }
        }

        if (searchIcon) {
            searchIcon.style.cursor = 'pointer';
            searchIcon.addEventListener('click', triggerSearch);
        }

        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    triggerSearch();
                }
            });
        }
    });
});