let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt"
let supaBaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co"
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)


async function Olish() {
    const {data , error } = await _supabase
    .from('odamlar')
    .select("*")
    if(error){
        alert("Ma'lumotlar kelmadi")
    }
    else{
        
        
        let jadval = document.getElementById('tbody')
        let html = ""
        let index = 0

        data.forEach(element => {
            html += `
                    <tr class="hover:bg-blue-50 transition-colors duration-200">
                        <td class="px-6 py-4 text-sm text-gray-900 border-r border-gray-200 font-medium">${index+1}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">${element.ism}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">${element.ball}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 border-r border-gray-200">${element.testlar}</td>
                        <td class="px-6 py-4 text-sm font-bold text-green-600 border-r border-gray-200">${element.streak}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 font-mono"> ${element.uzgarish}</td>
                    </tr>
            `
            index++
        });
        jadval.innerHTML = html
        
    }
}
Olish()