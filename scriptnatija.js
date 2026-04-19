/**
 * QuizHub - Natijalar Sahifasi Logikasi
 * 1. 3D Card Tilt Effect
 * 2. 3D Glassmorphism Toast System
 * 3. Page Load Animations
 * 4. Filter & Load More Simulations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SAHIFA YUKLANGANDA ANIMATSIYA ---
    const animateElements = () => {
        const items = document.querySelectorAll('.stat-card, .result-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    };
    animateElements();

    // --- 2. 3D TILT EFFEKTI (KARTALAR UCHUN) ---
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Sichqoncha X koordinatasi
            const y = e.clientY - rect.top;  // Sichqoncha Y koordinatasi
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Egilish burchagini hisoblash
            const rotateX = (y - centerY) / 10; 
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(99, 102, 241, 0.2)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.02)';
        });
    });

    // --- 3. KREATIV 3D TOAST SISTEMASI ---
    window.showToast = function(title, message, type = 'info', duration = 4000) {
        let container = document.getElementById('toast-container');
        
        // Agar konteyner bo'lmasa, yaratish
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.style.setProperty('--duration', `${duration}ms`);

        // Ikonkalar turlari
        const icons = {
            success: '<i class="fa-solid fa-circle-check" style="color: #10b981"></i>',
            error: '<i class="fa-solid fa-circle-xmark" style="color: #ef4444"></i>',
            info: '<i class="fa-solid fa-circle-info" style="color: #6366f1"></i>'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        container.appendChild(toast);

        // Avtomatik o'chirish
        const autoHide = setTimeout(() => {
            removeToast(toast);
        }, duration);

        // Click orqali o'chirish
        toast.onclick = () => {
            clearTimeout(autoHide);
            removeToast(toast);
        };
    };

    function removeToast(toast) {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }

    // --- 4. TUGMALAR VA FILTRLAR UCHUN EVENTLAR ---

    // Ko'proq yuklash tugmasi
    const loadBtn = document.querySelector('.load-more-btn');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            loadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuklanmoqda...';
            loadBtn.disabled = true;

            setTimeout(() => {
                showToast('Muvaffaqiyatli', 'Yangi natijalar yuklandi!', 'success');
                loadBtn.innerHTML = "Ko'proq yuklash";
                loadBtn.disabled = false;
            }, 1500);
        });
    }

    // Natija elementlari ("Batafsil" linki)
    const detailLinks = document.querySelectorAll('.details-link');
    detailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = link.closest('.result-item').querySelector('h3').innerText;
            showToast(subject, 'Ushbu fan bo\'yicha to\'liq tahlil tayyorlanmoqda...', 'info');
        });
    });

    // Filtrlar (Select o'zgarganda)
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            if(e.target.value !== 'Mavzu') {
                showToast('Filtrlandi', `${e.target.value} bo'yicha natijalar saralandi.`, 'info', 2500);
            }
        });
    }
});