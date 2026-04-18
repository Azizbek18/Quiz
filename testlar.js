/**
 * QuizHub - To'liq Test Logikasi
 * - Natijalarni hisoblash (To'g'ri, Noto'g'ri, Vaqt)
 * - Supabase integratsiyasi
 * - 3D Kreativ Glass Toast
 */

// 1. O'zgaruvchilar va Sozlamalar
let savollar = [];
let hozirgiIndex = 0;
let tugriJavoblar = 0;
let vaqt = 20;
let taymer;
let javobBerildi = false;
let testBoshlanganVaqt = Date.now(); // Test boshlangan vaqtni muhrlash

const supabaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
const supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const motiv = document.querySelector('.skip-text');
const keyingiBtn = document.getElementById('keyingi');
const tanlashKonteyner = document.getElementById('tanlash');

// --- 2. MA'LUMOTLARNI YUKLASH ---
async function olish() {
    const { data, error } = await _supabase
        .from("testlar")
        .select("*");

    if (error) {
        showToast("Xatolik", "Ma'lumot yuklanmadi", "error", 3000);
    } else {
        savollar = data;
        ekrangaChiqar();
    }
}
olish();

// --- 3. EKRANGA SAVOL CHIQARISH ---
function ekrangaChiqar() {
    if (hozirgiIndex >= savollar.length) {
        testTugadi();
        return;
    }

    javobBerildi = false;
    motiv.innerText = "O'ylab javob bering...";
    motiv.style.color = "#6c757d";
    progressYangila();

    const joriySavol = savollar[hozirgiIndex];
    document.getElementById('savolMatni').innerText = joriySavol.savol;
    document.getElementById('savolNomer').innerText = `${hozirgiIndex + 1}-savol`;

    const variantlar = [
        { v: "A", j: joriySavol.a },
        { v: "B", j: joriySavol.b },
        { v: "C", j: joriySavol.c },
        { v: "D", j: joriySavol.d }
    ];

    tanlashKonteyner.innerHTML = variantlar.map(qator => `
        <li onclick="javobniTekshirish(this, '${qator.j}')">
            <span>${qator.v})</span>
            <span>${qator.j}</span>
        </li>
    `).join('');

    taymerniBoshlash();
}

// --- 4. TAYMER VA PROGRESS ---
function taymerniBoshlash() {
    vaqt = 20;
    const vaqtElementi = document.querySelector('.timer');
    clearInterval(taymer);

    taymer = setInterval(() => {
        vaqt--;
        vaqtElementi.innerText = `00:${vaqt < 10 ? '0' + vaqt : vaqt}`;
        if (vaqt <= 0) {
            clearInterval(taymer);
            avtomatikOtish();
        }
    }, 1000);
}

function progressYangila() {
    const bar = document.getElementById('myBar');
    let foiz = ((hozirgiIndex + 1) / savollar.length) * 100;
    bar.style.width = foiz + "%";
}

// --- 5. JAVOBNI TEKSHIRISH ---
window.javobniTekshirish = function(el, tanlanganJavob) {
    if (javobBerildi) return;
    javobBerildi = true;
    clearInterval(taymer);

    const togriJavob = savollar[hozirgiIndex].javob;

    if (tanlanganJavob === togriJavob) {
        el.classList.add('yashil');
        tugriJavoblar++;
        motiv.innerText = "To'g'ri topdingiz! 🎉";
        motiv.style.color = "#10b981";
    } else {
        el.classList.add('red');
        motiv.innerText = "Xato javob! ❌";
        motiv.style.color = "#ef4444";
        
        // To'g'ri javobni ko'rsatish
        const barchaLi = document.querySelectorAll('#tanlash li');
        barchaLi.forEach(li => {
            if (li.querySelectorAll('span')[1].innerText === togriJavob) {
                li.classList.add('yashil');
            }
        });
    }
};

// --- 6. NAVIGATSIYA ---
keyingiBtn.addEventListener('click', () => {
    if (!javobBerildi) {
        showToast("Diqqat", "Iltimos, javobni belgilang!", "info", 2000);
        return;
    }
    hozirgiIndex++;
    ekrangaChiqar();
});

function avtomatikOtish() {
    hozirgiIndex++;
    ekrangaChiqar();
}

// --- 7. TESTNI YAKUNLASH VA SUPABASEGA SAQLASH ---
async function testTugadi() {
    clearInterval(taymer);
    
    // Natijalarni hisoblash
    const foiz = Math.round((tugriJavoblar / savollar.length) * 100);
    const notugriJavoblar = savollar.length - tugriJavoblar;

    // Ketgan vaqtni "MM:SS" formatiga keltirish
    const testTugaganVaqt = Date.now();
    const farqSekundda = Math.floor((testTugaganVaqt - testBoshlanganVaqt) / 1000);
    const minut = Math.floor(farqSekundda / 60);
    const sekund = farqSekundda % 60;
    const ketganVaqtText = `${minut.toString().padStart(2, '0')}:${sekund.toString().padStart(2, '0')}`;

    // 3D Toast ko'rsatish
    showToast(
        "Test Yakunlandi!", 
        `To'g'ri: ${tugriJavoblar} | Vaqt: ${ketganVaqtText}`, 
        "success", 
        4500
    );

    // Supabase ma'lumotlar bazasiga yuborish
    try {
        const { error } = await _supabase
            .from("testnatija")
            .insert([{ 
                
              togrijavob  : tugriJavoblar,
                notogrijavob: notugriJavoblar,
                vaqt: ketganVaqtText,
             
            }]);

        if (error) throw error;

        // Toast va progress bar tugagach yo'naltirish
        setTimeout(() => {
            window.location.href = "indexball.html";
        }, 5000);

    } catch (err) {
        console.error("Xatolik:", err.message);
    }
}

// --- 8. 3D GLASS TOAST FUNKSIYASI ---
function showToast(title, message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.setProperty('--duration', `${duration}ms`);

    const icon = type === 'success' ? '🏆' : 'ℹ️';

    toast.innerHTML = `
        <div style="font-size: 28px;">${icon}</div>
        <div class="toast-content">
            <h4 style="margin:0; font-weight:800; color:#1e293b;">${title}</h4>
            <p style="margin:4px 0 0; font-size:13px; color:#64748b;">${message}</p>
        </div>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;

    container.appendChild(toast);

    // Animatsiya tugagach o'chirish
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, duration);
}