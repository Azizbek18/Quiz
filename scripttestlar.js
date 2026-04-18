// 1. Foydalanuvchi ismini o'rnatish
document.addEventListener("DOMContentLoaded", () => {
    const ismBox = document.getElementById('kamol');
    const saqlanganIsm = localStorage.getItem("Ism") || "Foydalanuvchi";
    ismBox.innerHTML = `Salom, ${saqlanganIsm} 👋`;
});

const xabarCon = document.querySelector(".xabar-con");

// 2. 3D Toast funksiyasi
function xabarnoma(xabar, turi) {
    let toast = document.createElement("div");
    toast.className = `xabar ${turi}`;
    
    // Ikonka tanlash
    let icon = turi === 'success' ? '✅' : (turi === 'error' ? '❌' : 'ℹ️');
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span>${icon}</span>
            <span>${xabar}</span>
        </div>
    `;

    xabarCon.appendChild(toast);

    // 4 soniyadan keyin o'chirish
    setTimeout(() => {
        toast.style.transform = "translateX(150%)";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// 3. Testni boshlash funksiyasi
function Boshlashi() {
    xabarnoma('Tayyor turing, testlar yuklanmoqda...', 'info');
    
    // 3D bosilish effekti uchun kechikish
    setTimeout(() => {
        window.location.href = 'testlar.html'; // Fayl nomingizga qarang
    }, 2000);
}