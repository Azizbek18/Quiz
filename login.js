let supabaseKey = "sb_publishable_MFumWWURDMHmoCrOZcUrHg_yL8QFJu6";
let supaBaseUrl = "https://jtnugbdhpmtgplcymboe.supabase.co";

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);

const xabarCon = document.querySelector(".xabar-con");
function xabarnoma(xabar, turi = "info") {
  let xabarDiv = document.createElement("div");
  xabarDiv.classList.add("xabar", turi);

  let icon =
    turi === "success"
      ? "fa-check-circle"
      : turi === "error"
        ? "fa-exclamation-triangle"
        : "fa-info-circle";

  xabarDiv.innerHTML = `
        <i class="fas ${icon}" style="font-size: 20px;"></i>
        <div class="xabar-matn">${xabar}</div>
        <div class="progress">
            <div class="progress-ichki"></div>
        </div>
    `;

  xabarCon.appendChild(xabarDiv);

  setTimeout(() => {
    xabarDiv.style.animation = "toastChiqish 0.6s ease forwards";
    setTimeout(() => {
      xabarDiv.remove();
    }, 600);
  }, 4000);
}

let email = document.getElementById("email");
let parol = document.getElementById("parol");
// ... Supabase va xabarnoma funksiyasi o'zgarishsiz qoladi ...

async function yaratish() {
  const ismInput = document.getElementById("ism"); // HTMLda ism id bo'lishi kerak
  const emailInput = document.getElementById("email");
  const parolInput = document.getElementById("parol");
  const termsInput = document.getElementById("terms"); // Checkbox

  // 1. Maydonlar bo'shligini tekshirish
  if (!emailInput.value || !parolInput.value || !ismInput.value) {
    xabarnoma("Iltimos, barcha maydonlarni to'ldiring", "info");
    return;
  }

  // 2. Bazada bu email bor-yo'qligini tekshirish
  const { data: mavjudFoydalanuvchi, error: tekshiruvXatosi } = await _supabase
    .from("login")
    .select("email")
    .eq("email", emailInput.value);

  if (tekshiruvXatosi) {
    xabarnoma("Bazaga ulanishda xato: " + tekshiruvXatosi.message, "error");
    return;
  }

  // 3. Agar foydalanuvchi allaqachon mavjud bo'lsa
  if (mavjudFoydalanuvchi.length > 0) {
    xabarnoma("Bu email bilan allaqachon ro'yxatdan o'tilgan!", "error");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
    return;
  }

  // 4. Foydalanuvchi yangi bo'lsa - MA'LUMOT QO'SHISH (Insert)
  const { error: insertError } = await _supabase.from("login").insert([
    {
      ism: ismInput.value,
      email: emailInput.value,
      parol: parolInput.value,
    },
  ]);

  if (insertError) {
    xabarnoma("Ro'yxatdan o'tishda xatolik: " + insertError.message, "error");
  } else {
    xabarnoma("Muvaffaqiyatli ro'yxatdan o'tdingiz!", "success");

    // Ismni localStorage ga saqlaymiz (keyinchalik profil uchun)
    localStorage.setItem("user_name", ismInput.value);

    // 2 soniyadan keyin asosiy sahifaga o'tkazish
    setTimeout(() => {
      window.location.href = "indexteslar.html";
    }, 2000);
  }
}
