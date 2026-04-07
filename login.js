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


let email = document.getElementById('email')
let parol = document.getElementById('Parol')
async function Tekshirish() {
  if (email.value == "" && parol.value == "") {
    xabarnoma("Maydonlarni to'ldiring","info")
    return
  }

  const { data: foydalanuvchi, error: xatolik } = await _supabase
    .from('login')
    .select('*')
    .eq('email', email.value)
    .eq('parol', parol.value)
  if (xatolik) {
    alert("Xatolik yuz berdi" + error)
    return
  }
  if (foydalanuvchi.length > 0) {
    alert("Siz oldin ro'yhatdan o'tgansiz!!!")

    window.location.href = "login.html"
  }
  else {
    alert("Xatolik siz royhatdan otmagansiz")
  }
}



