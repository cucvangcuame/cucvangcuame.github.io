/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
    "Bạn dà",
    "dấu iu!",
    "Tôi...",
    "có nhiều lời muốn gửi",
    "đến dà",
    "nhưng tôi lại vụng về",
    "không biết",
    "phải bày tỏ thế nào 🤦‍♀️",
    "duy",
    "có điều này",
    "tôi muốn thể hiện nó",
    "tại đây...",
    "Sau cuộc trò chuyện",
    "tôi thấy trong lòng mình",
    "dui dui sao ấy 😃",
    "còn thấy cảm ơn nữa",
    "VÌ",
    "dà đã tin tưởng",
    "gọi và tâm sự",
    "câu chuyện cá nhân",
    "cùng",
    "cảm xúc mà bình thường",
    "chúng ta",
    "vì lý do nào đó",
    "nên ngại thể hiện",
    "...",
    "CẢM ƠN TÌNH BẠN NÀY 🙆‍♀️",
    "SẼ CÓ MUÔN VÀN THỬ THÁCH",
    "PHẢI VƯỢT QUA",
    "NHƯNG RẤT MAY MẮN",
    "VÌ CÓ BẠN ĐỒNG HÀNH",
    " * FROM *",
    "BẠN DÀ CỦA BẠN DÀ",
    "#BOCHINDU 🙌 #BOCHINNAO",
    "~~ 01/02/2023 ~~",
    "#MAIIUBANDA ❤",
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
    // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

// Start the animation.
animate();
