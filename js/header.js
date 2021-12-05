const open = document.getElementById("open");
const menu = document.getElementById("menu");
const close = document.getElementById("close");

const tl = new TimelineLite({paused: true})
open.addEventListener('click', () => {
    menu.style.display = "block";

    
    tl
    .from("#close", 1, {
        rotation: -90,
        transformOrigin: "center center",
        esae: Expo.easeOut
    })
    .from(".test-list", 1, {autoAlpha:0, y:50}, '-=1')

    tl.play();
});

close.addEventListener('click', () => {
    menu.style.display = "none";
});

