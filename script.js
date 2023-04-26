/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
    "Chị M",
    "dấu iu!",
    "Trong khả năng của mình...",
    "em không biết làm gì hơn",
    "ngoài cách",
    "gửi những lời nhắn nhủ,",
    "những mong muốn riêng tư",
    "cùng những cảm xúc chân thành",
    "qua internet",
    "nhờ nó mang đến chị...",
    "Em cũm muốn làm nhiều hơn",
    "nhưng em bất lực lắm 🤦‍♀️",
    "Bỏ qua hết những việc",
    "khum liên quan",
    "Nhân ngày sinh nhật",
    "của chị",
    "EM",
    "Chúc chị",
    "nhiều thiệt nhiều",
    "Sức Khỏe",
    "Năng Lượng",
    "Thời gian",
    "dành riêng cho mình 🙆‍♀️",
    "Chúc chị",
    "chóng tìm được bến đổ",
    "cho sự nghiệp sắp tới",
    "Và",
    "Cũm chúc chị tìm được",
    "Tình yêu xinh đẹp",
    "Tình yêu tuyệt vời",
    "viên mãn",
    "...",
    "và không quên bày tỏ",
    "sự biết ơn",
    "đã cho em",
    "gặp được mối duyên lành",
    "là chị ❤️",
    "phải thừa nhận rằng",
    "sự có mặt của chị",
    "là điều đặc biệt",
    "trong cuộc đời cô gái",
    "bé nhỏ này...",
    "...",
    "Em có ý định call",
    "để nói trực tiếp",
    "nhưng mà",
    "không biết chị rảnh/bận",
    "lúc nào",
    "nên thôi",
    "xin gửi đến chị",
    "mấy lời nhắn này",
    "còn chuyện call thì",
    "em sẽ làm sau",
    "dù gì...",
    "ngoài call em chẳng biết",
    "tương tác một cách",
    "sinh động",
    "với chị",
    "như nào nữa 😢",
    "* FROM *",
    "~ MPH ~",
    "~ TO ~",
    "~ MNTY ~",
    "~~ 26/04/2023 ~~",
    "#MEOMEO ❤",
    "#MAIIUM ❤",
    "#HAPPY BIRTHDAY ❤",
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
