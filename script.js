$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audio = $(".pop");

    // 按下滑鼠：張嘴、累計次數、播放音效
    $image.mousedown(function () {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);
        
        $(this).attr("src", "img/segu2.png"); // 換成張嘴的圖片
        $audio[0].currentTime = 0;
        $audio[0].play();
    });

    // 鬆開滑鼠：閉嘴
    $image.mouseup(function () {
        $(this).attr("src", "img/segu1.png"); // 換回閉嘴的圖片
    });
});
