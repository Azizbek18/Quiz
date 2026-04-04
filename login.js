let supabaseKey = 'sb_publishable_sIjNcBDMfR8Wk97_PecyOQ_RVgA2-I2'
let supaBaseUrl = 'https://fyzhblwiumysyehembfh.supabase.co'


const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

let email = document.getElementById('email')
let parol = document.getElementById('Parol')
async function Tekshirish() {
  if (email.value == "" && parol.value == "") {
    alert("Maydonlarni to'ldiring")
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
