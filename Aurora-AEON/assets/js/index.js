// 声音开启按钮
let soundButton = document.querySelector(".sound");

// 声音关闭按钮
let muteButton = document.querySelector(".mute");

// 视频标签
let video = document.getElementById('video');

// 开启声音
muteButton.addEventListener("click", () => {
    video.muted = false;
    video.play();

    muteButton.style.display = 'none';
    soundButton.style.display = 'block';
});

// 关闭声音
soundButton.addEventListener("click", () => {
    video.muted = true;

    soundButton.style.display = 'none';
    muteButton.style.display = 'block';
});

// 作者图片
let authorImg = document.querySelector(".author");

authorImg.addEventListener('click', () => {
    window.location.href = "https://space.bilibili.com/51110915";
});

// 进入图片
let inImg = document.querySelector(".in");

inImg.addEventListener('click', () => {
    window.location.href = "./music.html";
});

// 项目信息图片
let textImg = document.querySelector(".text");
textImg.addEventListener('click', () => {
    window.location.href = "https://github.com/baobaoJK/Aurora-AEON";
});