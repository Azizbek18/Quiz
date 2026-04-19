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

let notugriJavoblar = 0;
let umumiySarflanganVaqt = 0;
let savolBoshlanganVaqt;



let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
let supabaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
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
    savolBoshlanganVaqt = new Date();
    javobBerildi = false
    motiv.innerText = "O'ylab javob bering"
    progressYangila()

    const savolMatni = document.getElementById('savolMatni');
    const barchaLi = document.querySelector('#tanlash');
    let savolNomer = document.getElementById('savolNomer')
    savolMatni.innerText = savollar[hozirgiIndex].savol;
    savolNomer.innerText = `${hozirgiIndex + 1} - Savol`
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

let keyingi = document.getElementById('keyingi');

keyingi.addEventListener('click', () => {
    if (!javobBerildi) return; 

    if (hozirgiIndex < savollar.length - 1) {
        hozirgiIndex++;
        ekrangaChiqar();
    } else {
        natijaniSaqlash(); 
    }
});

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

let tanlash = document.getElementById('tanlash');

tanlash.addEventListener('click', (e) => {
    let bosilganLi = e.target.closest('li');
    if (!bosilganLi || javobBerildi) return; 

    javobBerildi = true;
    clearInterval(taymer); 
    let savolTugaganVaqt = new Date();
    let sarflanganSoniya = Math.floor((savolTugaganVaqt - savolBoshlanganVaqt) / 1000);
    umumiySarflanganVaqt += sarflanganSoniya;

    let ichidagiSpan = bosilganLi.querySelectorAll('span')[1].innerText;
    
    if (ichidagiSpan == savollar[hozirgiIndex].javob) {
        bosilganLi.classList.add('yashil');
        tugriJavoblar++;
        motiv.innerText = "Tabriklaymiz";
    } else {
        bosilganLi.classList.add('red');
        notugriJavoblar++; 
        motiv.innerText = "Afsus, kayfiyatni tushirmang";
        
        // To'g'ri javobni ko'rsatish
        const barchaVariantlar = tanlash.querySelectorAll('li');
        barchaVariantlar.forEach(li => {
            let variantMatni = li.querySelectorAll('span')[1].innerText;
            if (variantMatni == savollar[hozirgiIndex].javob) {
                li.classList.add('yashil');
            }
        });
    }
});
function progressYangila() {
    const bar = document.getElementById('myBar');
    let foiz = ((hozirgiIndex + 1) / savollar.length) * 100;
    bar.style.width = foiz + "%";
}

function avtomatikOtish() {
    hozirgiIndex++;
    ekrangaChiqar();
}

async function natijaniSaqlash() {
    document.getElementById('keyingi').disabled = true; 

    const { data, error } = await _supabase
        .from("testnatija") 
        .insert([
            {
                togrijavob: tugriJavoblar, 
                notogrijavob: notugriJavoblar, 
                vaqt: umumiySarflanganVaqt 
            }
        ]);

    if (error) {
        alert("Natijani saqlashda xatolik: " + error.message);
        document.getElementById('keyingi').disabled = false;
    } else {
        alert(`Test tugadi! \nTo'g'ri: ${tugriJavoblar} \nXato: ${notugriJavoblar} \nKetgan vaqt: ${umumiySarflanganVaqt} soniya. \nMa'lumotlar bazaga saqlandi!`);
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