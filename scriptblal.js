let supabaseKey = "sb_publishable_41BrMM_XEn-g0kMQjJZ9jw_L4FpfEGt";
let supabaseUrl = "https://rfbilwqahnzjmnrmyhng.supabase.co";
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let notugri = document.getElementById('notogri')
let tugri = document.querySelector('.on')
let vaqtq = document.getElementById('vaqt')


let id = 2
async function Olish(id) {
    const {data , error} = await _supabase
      .from('testnatija')
      .select('*')
      .eq('id', id)
    if(error){
      console.log("Xatolik yuz berdi");
    }
    else{
      console.log(data);
      tugri.innerText = data[0].togrijavob
      notugri.innerText=data[0].notogrijavob
      vaqtq.innerText=data[0].vaqt
      
    }
}         

Olish(id)
