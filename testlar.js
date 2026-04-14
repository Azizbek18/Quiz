let savollar = [];
let hozirgiIndex = 0;
let foydalanuvchiJavobi = null;
let vaqt = 20
let taymer;
let javobBerildi = false
let tugriJavoblar = 0

let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
let supabaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
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

function avtomatikOtish() {
    if (hozirgiIndex < savollar.length - 1) {
        hozirgiIndex++;
        ekrangaChiqar();
    } else {
        alert("Vaqt tugadi va bu oxirgi savol edi!");
        natijaniSaqlash(); 
    }
}
async function olish() {
    const { data, error } = await _supabase
        .from("testlar")
        .select("*");

    if (error) {
        alert("Xatolik yuz berdi: " + error.message);
    } else {
        savollar = data;
        ekrangaChiqar(); 
    }
}
olish();

function ekrangaChiqar() {
    if (savollar.length === 0 || hozirgiIndex >= savollar.length) {
        alert("Test tugadi!");
        return;
    }
    javobBerildi = false
    
    progressYangila()

    const savolMatni = document.getElementById('savolMatni');
    const barchaLi = document.querySelector('#tanlash');
    let savolNomer = document.getElementById('savolNomer')
    savolMatni.innerText = savollar[hozirgiIndex].savol; 
    savolNomer.innerText = `${hozirgiIndex + 1} - Savol`
    const joriySavol = savollar[hozirgiIndex];
    const variantlar = [
        { v: "A", j: joriySavol.a },
        { v: "B", j: joriySavol.b },
        { v: "C", j: joriySavol.c },
        { v: "D", j: joriySavol.d }
    ];

    let html = "";
    let nomer = 0
    variantlar.forEach(qator => {
        html += `
            <li id="${nomer+1}">
                <span class="font-bold">${qator.v})</span>
                <span>${qator.j}</span>
            </li>
        `;
        nomer++
    });
    barchaLi.innerHTML = html;
    taymerniBoshlash()
}

let keyingi = document.getElementById('keyingi');
keyingi.addEventListener('click', () => {
        if (hozirgiIndex < savollar.length - 1) {
            hozirgiIndex++;
            ekrangaChiqar();
    } else {
        alert("Bu oxirgi savol!");
    }
});





let tanlash = document.getElementById('tanlash')

tanlash.addEventListener('click',(e)=>{
    let bosilganLi = e.target.closest('li')
    if (!bosilganLi || javobBerildi) return
    let ichidagiSpan = bosilganLi.querySelectorAll('span')[1].innerText
    javobBerildi = true
    console.log(ichidagiSpan)
    if(ichidagiSpan == savollar[hozirgiIndex].javob){
        bosilganLi.classList.add('yashil')
        console.log(bosilganLi.classList);
        tugriJavoblar++
    }
    else{
        bosilganLi.classList.add('red')
        const barchaVariantlar = tanlash.querySelectorAll('li');
        barchaVariantlar.forEach(li => {
            let variantMatni = li.querySelectorAll('span')[1].innerText;
            if (variantMatni == savollar[hozirgiIndex].javob) {
                li.classList.add('yashil'); 
            }
        });
    }
})
function progressYangila() {
    const bar = document.getElementById('myBar');
    let foiz = ((hozirgiIndex + 1) / savollar.length) * 100;
    bar.style.width = foiz + "%";
}