let savollar = [];
let hozirgiIndex = 0;
let foydalanuvchiJavobi = null;

let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
let supabaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 1. Ma'lumotni olish va ishga tushirish
async function olish() {
    const { data, error } = await _supabase
        .from("testlar")
        .select("*");

    if (error) {
        alert("Xatolik yuz berdi: " + error.message);
    } else {
        savollar = data;
        ekrangaChiqar(); // Ma'lumot kelgandan keyin birinchi savolni chiqarish
    }
}
olish();

// 2. Ekranga chiqarish funksiyasi
function ekrangaChiqar() {
    if (savollar.length === 0 || hozirgiIndex >= savollar.length) {
        alert("Test tugadi!");
        return;
    }

    const savolMatni = document.getElementById('savolMatni');
    const barchaLi = document.querySelector('#tanlash');
    
    // Hozirgi savol matnini yangilash
    savolMatni.innerText = savollar[hozirgiIndex].savol; 

    // Variantlarni shakllantirish
    const joriySavol = savollar[hozirgiIndex];
    const variantlar = [
        { v: "A", j: joriySavol.a },
        { v: "B", j: joriySavol.b },
        { v: "C", j: joriySavol.c },
        { v: "D", j: joriySavol.d }
    ];

    let html = "";
    variantlar.forEach(qator => {
        html += `
            <li class="variant shadow-xl w-[400px] p-[10px] rounded-xl cursor-pointer border border-gray-200 bg-white" 
                onclick="tanlash(this, '${qator.j}')">
                <span class="font-bold">${qator.v})</span>
                <span>${qator.j}</span>
            </li>
        `;
    });
    barchaLi.innerHTML = html;
}

// 3. Keyingi savolga o'tish
let keyingi = document.getElementById('keyingi');
keyingi.addEventListener('click', () => {
        if (hozirgiIndex < savollar.length - 1) {
            hozirgiIndex++;
            ekrangaChiqar();
    } else {
        alert("Bu oxirgi savol!");
    }
});

// Tanlash funksiyasi (oldingi suhbatdagi kabi)
function tanlash(element, javob) {
    foydalanuvchiJavobi = javob;
    document.querySelectorAll('#tanlash li').forEach(el => {
        el.classList.remove('bg-indigo-50', 'border-indigo-600', 'ring-1', 'ring-indigo-600');
        el.classList.add('bg-white', 'border-gray-200');
    });
    element.classList.add('bg-indigo-50', 'border-indigo-600', 'ring-1', 'ring-indigo-600');
} 
