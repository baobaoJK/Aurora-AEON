// 音乐列表
var list = [
    {
        "name": "music.mp3",
        "time": "04:04"
    },
];

// 音乐播放序号
var currentIndex = 0;

// 加载信息
function render(data) {
    getMusicInfo(data);

    musicImg.style = "animation-play-state: running";

    playButton.style.display = "none";
    pauseButton.style.display = "block";
};

// 加载音乐列表信息
function renderMusicList(list) {
    document.querySelector(".music-list .num").innerHTML = list.length;

    for (let i = 0; i < list.length; i++) {
        // 地址信息
        const host = "http://localhost";
        const port = "393";
        const url = host + ":" + port + "/assets/audio/" + list[i].name;

        jsmediatags.read(url, {
            onSuccess: function (tag) {
                const listItem = document.createElement("div");
                listItem.classList.add("list-item");
                const nameItem = document.createElement("p");
                nameItem.classList.add("name");
                nameItem.innerHTML = tag.tags.title;
                const authorItem = document.createElement("p");
                authorItem.classList.add("author");
                authorItem.innerHTML = tag.tags.artist;
                const timeItem = document.createElement("p");
                timeItem.classList.add("time");
                timeItem.innerHTML = list[i].time;

                listItem.appendChild(nameItem);
                listItem.appendChild(authorItem);
                listItem.appendChild(timeItem);
                document.querySelector(".music-list").appendChild(listItem);
            },
            onError: function (error) {
                console.log(":(", error.type, error.info);
            }
        });
    }
};

// 加载音乐列表信息
renderMusicList(list);

// 音乐标签
const music = document.querySelector("audio");

// 音乐是否循环播放
let isMusicLoop = false;

// 音乐列表是否显示
let showMusicList = false;

// 静音前的音量
let mutedVolume = 0;

// 音乐胶片图片
const musicImg = document.querySelector(".music-img .img");

// 音乐播放完毕事件
music.addEventListener("ended", function () {

    // 修改按钮样式
    if (!isMusicLoop) {
        currentIndex = (currentIndex + 1) % list.length;
        render(list[currentIndex]);
        music.play();
    }
});

// 音乐加载完毕后事件
music.onloadeddata = function () {
    // 设置进度条 max 为 音乐时间时长
    timeBar.max = music.duration;

    // 时间转换
    var s = parseInt(music.duration % 60);
    var m = parseInt((music.duration / 60) % 60);
    s = conversionTime(s);
    m = conversionTime(m);

    endTime.innerHTML = m + ':' + s;
}

// 音乐播放更新事件
music.ontimeupdate = function () {
    // 设置进度条的值为当前播放的时间，实现进度条随着音乐播放而更新
    timeBar.value = music.currentTime;
}

// 音乐的播放时间更新事件
music.addEventListener('timeupdate', function () {
    // 时间转换
    var s = parseInt(music.currentTime % 60);
    var m = parseInt((music.currentTime / 60) % 60);
    s = conversionTime(s);
    m = conversionTime(m);

    startTime.innerHTML = m + ':' + s
}, false);

// 侧边栏按钮
const asideButton = document.querySelectorAll(".music-aside div");

// 侧边栏按钮事件
asideButton.forEach((button) => {
    button.addEventListener("click", () => {
        changeView(button.getAttribute("data-name"));
    });
});

// 底部栏图片
const footerImgButton = document.querySelector(".music-footer .music-img");

// 底部栏图片事件
footerImgButton.addEventListener("click", () => {
    changeView("play");
});

// 更改视图函数
function changeView(view) {
    document.querySelectorAll(".music-main>div").forEach((view) => {
        view.style = "display:none";
    });
    document.querySelector(".music-main ." + view).style = "display:flex";
}

// 上一首按钮
const prevButton = document.querySelector(".prev");

// 上一首事件
prevButton.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : list.length - 1;
    render(list[currentIndex]);
    music.play();
});

// 播放
const playButton = document.querySelector("#play");

// 播放音乐事件
playButton.addEventListener("click", () => {
    music.play();
    musicImg.style = "animation-play-state: running";
    playButton.style.display = "none";
    pauseButton.style.display = "block";
});

// 暂停
const pauseButton = document.querySelector(".pause");

// 暂停音乐事件
pauseButton.addEventListener("click", () => {
    music.pause();
    musicImg.style = "animation-play-state: paused";
    pauseButton.style.display = "none";
    playButton.style.display = "block";
});

// 下一首
const nextButton = document.querySelector(".next");

// 下一首事件
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % list.length;
    render(list[currentIndex]);
    music.play();
});

// 音乐播放时间
const startTime = document.querySelector(".start-time");

// 音乐进度条
const timeBar = document.querySelector(".time-bar .bar");

// 音乐进度条事件
timeBar.addEventListener("input", () => {
    // 设置拖动的播放时间为进度条的值，实现通过拖拽进度条控制音乐播放的进度
    music.currentTime = timeBar.value;
});

// 音乐总时间
const endTime = document.querySelector(".end-time");

// 循环
const loopButton = document.querySelector(".loop");

// 循环播放事件
loopButton.addEventListener("click", () => {
    if (isMusicLoop) {
        isMusicLoop = false;
        loopButton.style.color = "#333333";
    }
    else {
        isMusicLoop = true;
        loopButton.style.color = "#35DD71";
    }

    music.loop = isMusicLoop;
});

// 音量条按钮
const soundButton = document.querySelector(".sound");

// 音量条按钮事件
soundButton.addEventListener("click", () => {
    mutedVolume = music.volume;
    music.volume = 0;
    soundBar.value = 0;

    soundButton.style.display = "none";
    muteButton.style.display = "block";
});

// 音量静音按钮
const muteButton = document.querySelector(".mute");

// 音量静音按钮事件
muteButton.addEventListener("click", () => {
    music.volume = mutedVolume;
    soundBar.value = mutedVolume * 100;

    muteButton.style.display = "none";
    soundButton.style.display = "block";
});

// 音量控制条
const soundBar = document.querySelector(".sound-bar .bar");

// 音量控制条事件
soundBar.addEventListener('input', () => {
    music.volume = soundBar.value / 100;

    if (music.volume == 0) {
        soundButton.style.display = "none";
        muteButton.style.display = "block";
    }
    else {
        muteButton.style.display = "none";
        soundButton.style.display = "block";
    }
});

// 音乐列表按钮
const listButton = document.querySelector(".list");

// 音乐列表
const musicList = document.querySelector(".music-list");

// 音乐列表按钮事件
listButton.addEventListener("click", () => {
    if (showMusicList) {
        showMusicList = false;
        musicList.style.display = "none";
        listButton.style.color = "#333333";
    }
    else {
        showMusicList = true;
        musicList.style.display = "block";
        listButton.style.color = "#35DD71";
    }
});

getMusicInfo(list[currentIndex]);

// 时间转换函数
function conversionTime(time) {
    return time < 10 ? '0' + time : time;
}

// 获取音乐信息
function getMusicInfo(musicFile) {

    // 地址信息
    const host = "http://localhost";
    const port = "393";
    const url = host + ":" + port + "/assets/audio/" + musicFile.name;

    music.setAttribute("src", url);
    jsmediatags.read(url, {
        onSuccess: function (tag) {
            console.log(tag);

            var picture = tag.tags.picture;
            var base64String = "";
            for (var i = 0; i < picture.data.length; i++) {
                base64String += String.fromCharCode(picture.data[i]);
            }
            var imageUri = "data:" + picture.format + ";base64," + window.btoa(base64String);

            // 底部栏音乐信息
            document.querySelector('.music-info img').src = imageUri;
            document.querySelector(".music-info .name").innerHTML = tag.tags.title;
            document.querySelector(".music-info .singer").innerHTML = tag.tags.artist;

            // 界面音乐信息
            document.querySelector('.music-img #musicImg').src = imageUri;
            document.querySelector(".music-info .title").innerHTML = tag.tags.title;
            document.querySelector(".music-info .artist").innerHTML = tag.tags.artist;
        },
        onError: function (error) {
            console.log(":(", error.type, error.info);
        }
    });
}