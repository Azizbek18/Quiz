let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt"
let supaBaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co"
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

let orin = document.getElementById('nechinchi')
let birTitle =document.getElementById('bir-title')
let ikkiTitle =document.getElementById('ikki-title')
let uchTitle =document.getElementById('uch-title')
let birBall= document.getElementById('bir-ball')
let ikkiBall= document.getElementById('ikki-ball')
let uchBall= document.getElementById('uch-ball')
let bir = document.getElementById('bir')
let ikki = document.getElementById('ikki')
let uch= document.getElementById('uch')
let topUchlik = []


async function Olish() {
    const {data , error } = await _supabase
    .from('odamlar')
    .select("*")
    if(error){
        alert("Ma'lumotlar kelmadi")
    }
    else{
        let tartibData = data.sort((a,b)=>b.ball-a.ball)
        console.log(tartibData);
        topUchlik = data.slice(0,3)
        console.log(topUchlik);
        // Ismlar
        birTitle.innerText = topUchlik[0].ism
        ikkiTitle.innerText = topUchlik[1].ism
        uchTitle.innerText = topUchlik[2].ism
        // ballar
        birBall.innerText = topUchlik[0].ball 
        ikkiBall.innerText = topUchlik[1].ball 
        uchBall.innerText = topUchlik[2].ball 
                
        let jadval = document.getElementById('tbody')
        let html = ""
        let index = 0

        tartibData.forEach(element => {
            html += `
                    <tr class="hover:bg-blue-50 transition-colors duration-200">
                        <td class="px-6 text-center py-4 text-sm text-gray-900 border-r border-gray-200 font-medium">${index+1}</td>
                        <td class="px-6 text-center py-4 text-sm text-gray-700 border-r border-gray-200">${element.ism}</td>
                        <td class="px-6 text-center py-4 text-sm text-gray-700 border-r border-gray-200">${element.ball}</td>
                        <td class="px-6 text-center py-4 text-sm text-gray-700 border-r border-gray-200">${element.testlar}</td>
                        <td class="px-6 text-center py-4 text-sm font-bold text-green-600 border-r border-gray-200">${element.streak}</td>
                        <td class="px-6 text-center py-4 text-sm text-gray-700 font-mono"> ${element.uzgarish}</td>
                    </tr>
            `
            index++
        });
        jadval.innerHTML = html

        orin.innerText = `Siz ${tartibData.length} o'quvchidan 3-o'rindasiz`
        
    }
}
Olish()

// sort
// Barcha filter elementlarini tanlab olamiz
const filterItems = document.querySelectorAll('.filter-item');

filterItems.forEach(item => {
  item.addEventListener('click', function() {
    // 1. Avvalgi aktiv elementdan 'active' klassini olib tashlaymiz
    document.querySelector('.filter-item.active').classList.remove('active');
    
    // 2. Bosilgan elementga 'active' klassini qo'shamiz
    this.classList.add('active');

    // 3. Qaysi biri bosilganiga qarab biror amal bajarish (ixtiyoriy)
    const tanlandi = this.textContent;
    console.log(tanlandi + " tanlandi");
  });
});

