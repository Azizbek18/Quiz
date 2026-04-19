let supabaseKey = 'sb_publishable_MFumWWURDMHmoCrOZcUrHg_yL8QFJu6'
let supaBaseUrl = 'https://jtnugbdhpmtgplcymboe.supabase.co'

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)
const xabarCon = document.querySelector(".xabar-con")

function xabarnoma(xabar, turi = 'info') {
    // Toast elementini yaratish
    let toast = document.createElement('div');
    toast.classList.add("xabar", turi);

    let iconClass = 'fa-info-circle';
    if(turi === 'success') iconClass = 'fa-check-circle';
    if(turi === 'error') iconClass = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <i class="fas ${iconClass}" style="font-size: 20px;"></i>
        <div style="flex: 1; font-size: 14px; font-weight: 500;">${xabar}</div>
        <div class="progress-bar">
            <div class="progress-line"></div>
        </div>
    `;

    const xabarCon = document.querySelector(".xabar-con");
    xabarCon.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "toastChiqish 0.5s ease-in forwards";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
}

async function Tekshirish() {
    const email = document.getElementById('email');
    const parol = document.getElementById('parol');

    // 1. Bo'sh maydonlarni tekshirish
    if (!email.value || !parol.value) {
        xabarnoma('Email va parolni kiriting', 'info');
        return;
    }

    // 2. Bazadan foydalanuvchini email va parol orqali qidirish
    const { data: foydalanuvchi, error: xato } = await _supabase
        .from('login')
        .select('*')
        .eq('email', email.value)
        .eq('parol', parol.value)
        .single(); // Faqat bitta foydalanuvchi qaytarishini kutamiz

    if (xato) {
        // Agar xato bo'lsa yoki bunday foydalanuvchi topilmasa
        xabarnoma('Email yoki parol noto\'g\'ri!', 'error');
        console.log(xato.message);
        return;
    }

    if (foydalanuvchi) {
        // 3. Muvaffaqiyatli kirish
        localStorage.setItem("Ism", foydalanuvchi.ism); // Bazadagi ismni saqlab qo'yamiz
        xabarnoma(`Xush kelibsiz, ${foydalanuvchi.ism}!`, 'success');

        setTimeout(() => {
            window.location.href = 'indexteslar.html';
        }, 1500);
    }
}