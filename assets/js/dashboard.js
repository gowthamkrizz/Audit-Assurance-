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

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar nav link active state toggling
    const navLinks = document.querySelectorAll('.dash-nav-link:not(.logout-link)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Handle SPA section switching
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                document.querySelectorAll('.dash-section').forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active-section');
                    // Reset bar charts if any
                    const bars = section.querySelectorAll('.bar-fill');
                    bars.forEach(bar => { bar.style.height = '0'; });
                });
                
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    targetSection.style.opacity = 0;
                    
                    // Re-trigger CSS animations by forcing a reflow
                    const animatedElements = targetSection.querySelectorAll('.animate-fade-up');
                    animatedElements.forEach(el => {
                        el.style.animation = 'none';
                        void el.offsetWidth; // trigger reflow
                        el.style.animation = ''; 
                    });

                    setTimeout(() => targetSection.style.opacity = 1, 10);
                    targetSection.classList.add('active-section');
                    
                    // Re-trigger bar chart animations in this section
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
                
                // On mobile, close sidebar after clicking a link
                if (window.innerWidth <= 768) {
                    document.getElementById('dashSidebar').classList.remove('mobile-open');
                    document.body.style.overflow = '';
                    document.body.classList.remove('menu-open');
                }
            }
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
});
