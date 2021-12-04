var cols;

if (window.innerWidth < 768 )
    cols = 2;
else
    cols = 3;

const main = document.getElementById('main');
let parts = [];

let images = [
    "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/368685/pexels-photo-368685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2672&q=80"
];

let par = [
    "مرحبا بك في موقع تيييت سويت, موقع يهتم بشرح مستجدات الذكاء الإصطناعي و آخر تقنيات التحول الرقمي",
    "para2",
    "para3",
    "para4"
];
let current = 0;
let playing = false;
let index = 0;
for (let i in images) {
    new Image().src = images[i];
}

for (let col = 0; col < cols; col++) {
    let part = document.createElement('div');
    part.className = 'part';
    let el = document.createElement('div');
    el.className = "section";
    let img = document.createElement('img');
    img.src = images[current];
    el.appendChild(img);
    part.style.setProperty('--x', -100/cols*col+'vw');
    part.appendChild(el);
    main.appendChild(part);
    parts.push(part);
}

let animOptions = {
    duration: 1,
    ease: Power4.easeInOut
};

function go(dir) {
    if (!playing) {
        playing = true;
        if (current + dir < 0) current = images.length - 1;
        else if (current + dir >= images.length) current = 0;
        else current += dir;

        function up(part, next) {
            part.appendChild(next);
            gsap.to(part, {...animOptions, y: - window.innerHeight}).then(function () {
                part.children[0].remove();
                gsap.to(part, {duration: 0, y: 0});
            })
        }

        function down(part, next) {
            part.prepend(next);
            gsap.to(part, {duration: 0, y: -window.innerHeight});
            gsap.to(part, {...animOptions, y: 0}).then(function () {
                part.children[1].remove();
                playing = false;
            })
        }

        for (let p in parts) {
            let part = parts[p];
            let next = document.createElement('div');
            next.className = 'section';
            let img = document.createElement('img');
            img.src = images[current];
            if (index > 3) index = 0;
            if (index < 0) index = 3;
            //gsap.from("#p-content", {duration: 1, opacity:0, delay: 2})
            //document.getElementById('p-content').innerHTML = par[index];
            //gsap.to("#p-content", {duration: 1, opacity:1, delay: 2})
            if (dir == -1) index--;
            else index++;
            next.appendChild(img);

            if ((p - Math.max(0, dir)) % 2) {
                down(part, next);
            } else {
                up(part, next);
            }
        }
    }
}

window.addEventListener('keydown', function(e) {
    if (['ArrowRight'].includes(e.key)) {
    go(1);
}

else if (['ArrowLeft'].includes(e.key)) {
    go(-1);
    }
});

function lerp(start, end, amount) {
    return (1-amount)*start+amount*end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size+'px');
cursorF.style.setProperty('--size', sizeF+'px');

window.addEventListener('mousemove', function(e) {
    pageX = e.clientX;
    pageY = e.clientY;
    cursor.style.left = e.clientX-size/2+'px';
    cursor.style.top = e.clientY-size/2+'px';
});

function loop() {
    cursorX = lerp(cursorX, pageX, followSpeed);
    cursorY = lerp(cursorY, pageY, followSpeed);
    cursorF.style.top = cursorY - sizeF/2 + 'px';
    cursorF.style.left = cursorX - sizeF/2 + 'px';
    requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
    gsap.to(cursor, {scale: 4.5});
    gsap.to(cursorF, {scale: .4});

    clicked = true;
    startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
    gsap.to(cursor, {scale: 1});
    gsap.to(cursorF, {scale: 1});

    endY = e.clientY || endY;
    if (clicked && startY && Math.abs(startY - endY) >= 40) {
        go(!Math.min(0, startY - endY)?1:-1);
        clicked = false;
        startY = null;
        endY = null;
    }
}
window.addEventListener('mousedown', mousedown, false);

window.addEventListener('mouseup', mouseup, false);

let scrollTimeout;
function wheel(e) {
    clearTimeout(scrollTimeout);
    setTimeout(function() {
    if (e.deltaY < -40) {
    go(-1);
    }
    else if (e.deltaY >= 40) {
    go(1);
    }
    })
}


const menu = document.getElementById("menu");
const body = document.getElementById("body");
const close = document.getElementById("close");

menu.addEventListener('click', () => {
    body.style.overflow = "hidden";
    document.getElementById("mobile-menu").style.display= "block"
    gsap.from(".mobile-item", {duration: 1, opacity:0, delay: .5})
    gsap.to(".mobile-item", {duration: 1, opacity:1, delay: .5})
    gsap.from(".mobile-item", {duration: 1, y: '100%', delay: .3, ease: 'power2.out'})

    gsap.from(".media-item", {duration: 1, opacity:0, delay: .5})
    gsap.to(".media-item", {duration: 1, opacity:1, delay: .5})
    gsap.from(".media-item", {duration: 1, y: '100%', delay: .3, ease: 'power2.out'})

    gsap.from("#close", {duration: 1, opacity:0, delay: .5})
    gsap.to("#close", {duration: 1, opacity:1, delay: .5})
    gsap.from("#close", {duration: 1, y: '100%', delay: .3, ease: 'power2.out'})

    gsap.from(".logo-mobile", {duration: 1, opacity:0, delay: .5})
    gsap.to(".logo-mobile", {duration: 1, opacity:1, delay: .5})
    gsap.from(".logo-mobile", {duration: 1, y: '100%', delay: .3, ease: 'power2.out'})

    gsap.from(".mobile-menu", {duration: 1, opacity:0, delay: .1})
    gsap.to(".mobile-menu", {duration: 1, opacity:1, delay: .2})
    
})

close.addEventListener('click', () => {
    body.style.overflow = "auto";
    document.getElementById("mobile-menu").style.display= "none"
})
