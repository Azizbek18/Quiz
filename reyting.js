const supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
const supaBaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);

// DOM elementlari
const ui = {
    titles: [document.getElementById('bir-title'), document.getElementById('ikki-title'), document.getElementById('uch-title')],
    balls: [document.getElementById('bir-ball'), document.getElementById('ikki-ball'), document.getElementById('uch-ball')],
    orinText: document.getElementById('nechinchi'),
    tbody: document.getElementById('tbody'),
    filterItems: document.querySelectorAll('.filter-item'),
    nextLevel: document.getElementById('next-level-text')
};

// Asosiy ma'lumotlarni olish funksiyasi
async function yuklash(period = 'haftalik') {
    ui.tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Yuklanmoqda...</td></tr>";
    
    let query = _supabase.from('odamlar').select("*");

    // Vaqt bo'yicha filtrlash mantiqi
    if (period !== 'umumiy') {
        const bugun = new Date();
        let boshlanishSanasi = new Date();

        if (period === 'haftalik') {
            boshlanishSanasi.setDate(bugun.getDate() - 7);
        } else if (period === 'oylik') {
            boshlanishSanasi.setMonth(bugun.getMonth() - 1);
        }
        
        // created_at ustuni orqali filtrlash
        query = query.gte('created_at', boshlanishSanasi.toISOString());
    }

    // Ballar bo'yicha kamayish tartibida saralash
    const { data, error } = await query.order('ball', { ascending: false });

    if (error) {
        console.error("Xatolik:", error);
        alert("Ma'lumotlarni olishda xatolik yuz berdi");
        return;
    }

    yangilashUI(data);
}

function yangilashUI(data) {
    if (!data || data.length === 0) {
        ui.tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Ma'lumot topilmadi</td></tr>";
        return;
    }

    // 1. Top 3 ni yangilash
    for (let i = 0; i < 3; i++) {
        if (data[i]) {
            ui.titles[i].innerText = data[i].ism;
            ui.balls[i].innerText = `${data[i].ball} ball`;
        } else {
            ui.titles[i].innerText = "---";
            ui.balls[i].innerText = "0 ball";
        }
    }

    // 2. Jadvalni to'ldirish
    let html = "";
    data.forEach((user, index) => {
        const isMe = user.ism.includes("Kamol Y."); // O'zingizni aniqlash
        const highlight = isMe ? "style='background-color: #EEF2FF; font-weight: bold;'" : "";

        html += `
            <tr ${highlight}>
                <td style="text-align:center; padding:15px; border-right: 1px solid #e5e7eb;">${index + 1}</td>
                <td style="padding:15px; border-right: 1px solid #e5e7eb;">${user.ism} ${isMe ? "(Siz)" : ""}</td>
                <td style="text-align:center; padding:15px; color:#494BD6; font-weight:bold; border-right: 1px solid #e5e7eb;">${user.ball}</td>
                <td style="text-align:center; padding:15px; border-right: 1px solid #e5e7eb;">${user.testlar || 0}</td>
                <td style="text-align:center; padding:15px; color:#10B981; font-weight:bold; border-right: 1px solid #e5e7eb;">🔥 ${user.streak || 0}</td>
                <td style="text-align:center; padding:15px;">${user.uzgarish || '--'}</td>
            </tr>
        `;
    });
    ui.tbody.innerHTML = html;

    // 3. Foydalanuvchi o'rni
    const myIndex = data.findIndex(u => u.ism.includes("Kamol Y."));
    if (myIndex !== -1) {
        ui.orinText.innerText = `Siz ${data.length} o'quvchidan ${myIndex + 1}-o'rindasiz`;
        
        // 4. "Keyingi daraja" mantiqi
        if (myIndex > 0) {
            const oldindagiUser = data[myIndex - 1];
            const farq = oldindagiUser.ball - data[myIndex].ball;
            ui.nextLevel.innerText = `Siz ${oldindagiUser.ism} bilan farqingizni ${farq} ballga qisqartirishingiz kerak. Olg'a!`;
        } else {
            ui.nextLevel.innerText = `Tabriklaymiz! Siz reytingda peshqadamsiz!`;
        }
    } else {
        ui.orinText.innerText = `Siz hali ro'yxatda yo'qsiz.`;
    }
}

// Filtr tugmalarini boshqarish
ui.filterItems.forEach(item => {
    item.addEventListener('click', function() {
        // Klasslarni o'zgartirish
        document.querySelector('.filter-item.active').classList.remove('active');
        this.classList.add('active');

        // Ma'lumotlarni qayta yuklash
        const period = this.getAttribute('data-period');
        yuklash(period);
    });
});

// Sahifa yuklanganda birinchi marta chaqirish
yuklash('haftalik');