const menu = document.getElementById("menu");
const body = document.getElementById("body");
const close = document.getElementById("close");

menu.addEventListener('click', () => {
    body.style.overflow = "hidden";
    document.getElementById("mobile-menu").style.display= "block"
})

close.addEventListener('click', () => {
    body.style.overflow = "auto";
    document.getElementById("mobile-menu").style.display= "none"
})