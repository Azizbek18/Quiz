let supabaseKey = 'sb_publishable_sIjNcBDMfR8Wk97_PecyOQ_RVgA2-I2'
let supaBaseUrl = 'https://fyzhblwiumysyehembfh.supabase.co'

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

const xabarCon = document.querySelector(".xabar-con")
function xabarnoma(xabar, turi) {
    let xabarMatn = document.createElement('div');
    xabarMatn.classList.add("xabar", turi)
    console.log(xabarMatn);

    xabarMatn.innerText = xabar;

    setTimeout(() => {
        xabarMatn.remove();
    }, 4000);

    xabarCon.appendChild(xabarMatn)
}


async function yaratish() {
    let ism = document.getElementById('ism')
    let parol = document.getElementById('parol')
    let email = document.getElementById('email')

    if(ism.value == "" && parol.value == ""){   
        alert("Maydonlarni to'ldiring")
        return
    }

    const {data:foydalanuvchi , error:xatolik} = await _supabase
    .from('login')
    .select('*')
    .eq('ism',ism.value)
    .eq('parol', parol.value)
    if(xatolik){
        alert("Xatolik yuz berdi" + error.message)
        return
    }
    if(foydalanuvchi.length > 0){
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "login.html"
    }
    else{
        const {error} = await _supabase 
        .from('login')
        .insert([
            {
                ism : ism.value,
                parol : parol.value,
                email : email.value
            }
        ])
        if(error){
            alert("Xatolik yuz berdi" + error.message)
        }
        else{
            ism.value = ""
            parol.value = ""
            email.value = ""
            alert("Siz ro'yhatdan o'tdingiz tabriklaymiz!!!")
            window.location.href = 'indexteslar.html'
        }
    }

}
