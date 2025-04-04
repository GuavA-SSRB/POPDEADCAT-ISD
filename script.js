$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audioNormal = $(".pop"); // 普通音效
    const $audioSpecial10 = $(".special-pop"); // 10 的倍數音效
    const $audioSpecial50 = $(".special-pop-50"); // 50 的倍數音效
    // **✅ 音效播放前先 pause() + currentTime = 0**
    const playAudio = (audioElement) => {
        audioElement.pause(); // 停止上一個播放
        audioElement.currentTime = 0; // 重置到開頭
        audioElement.play();
    };

    // ✅ 預載圖片（避免初次點擊延遲）
    $("<img />").attr("src", "img/segu1.webp");
    $("<img />").attr("src", "img/segu2.webp");

    // 按下滑鼠：張嘴、累計次數、播放音效
    $image.mousedown(function () {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);

        // 如果次數大於 0，顯示 .times
        if (countTimes > 0) {
            $times.css("display", "block");
        }

        // ✅ 加上微延遲，避免圖片切換反應太慢
        setTimeout(() => {
            $(this).attr("src", "img/segu2.webp"); // 換成張嘴的圖片
        }, 10);

        // 點擊時數字放大 + 跳動特效
        // **✅ 使用 .stop(true, true) 清除舊動畫再執行新動畫**
        $times.stop(true, true).css("font-size", "55px").animate({
            fontSize: "60px",
            marginTop: "-5px"
        }, 100).animate({
            fontSize: "55px",
            marginTop: "0px"
        }, 100);

        // **字體顏色動畫**
        if (countTimes % 1000 === 0) {
            animateColor($times, "#ff0000"); // 1000 的倍數變紅色
        } else if (countTimes % 100 === 0) {
            animateColor($times, "#ff8800"); // 100 的倍數變橘色
        } else if (countTimes % 50 === 0) {
            animateColor($times, "#ffff00"); // 50 的倍數變黃色
        }

        // 音效邏輯檢查
        if (countTimes % 50 === 0) {
            playAudio($audioSpecial50[0]);
        } else if (countTimes % 10 === 0) {
            playAudio($audioSpecial10[0]);
        } else {
            playAudio($audioNormal[0]);
        }
        
    });

    // 鬆開滑鼠：閉嘴
    $image.mouseup(function () {
        // ✅ 也加上延遲，避免 DOM 重繪卡頓
        setTimeout(() => {
            $(this).attr("src", "img/segu1.webp"); // 換回閉嘴的圖片
        }, 10);
        // 放開滑鼠時恢復原始樣式
        $times.css({
            fontSize: "",
        });
    });

    // **字體顏色變化動畫函數**
    function animateColor(element, color) {
        element.animate({ color: color }, 300).animate({ color: "#ffffff" }, 500);
    }
});
