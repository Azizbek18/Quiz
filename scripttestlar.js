
const xabarCon = document.querySelector(".xabar-con");
function xabarnoma(xabar, turi) {
  let xabarMatn = document.createElement("div");
  xabarMatn.classList.add("xabar", turi);
  console.log(xabarMatn);

  xabarMatn.innerText = xabar;

  setTimeout(() => {
    xabarMatn.remove();
  }, 4000);

  xabarCon.appendChild(xabarMatn);
}
function Boshlashi() {
  xabarnoma('Testlar tez orada boshlanmoqda','info')
  setTimeout(() => {
    window.location.href='indexteslar.html'
  }, 2500);
}
