$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audioNormal = $(".pop"); // 普通音效
    const $audioSpecial10 = $(".special-pop"); // 10 的倍數音效
    const $audioSpecial50 = $(".special-pop-50"); // 50 的倍數音效

    // ✅ 預載圖片（避免初次點擊延遲）
    $("<img />").attr("src", "img/segu1_2.png");
    $("<img />").attr("src", "img/segu2_2.png");

    // 按下滑鼠：張嘴、累計次數、播放音效
    $image.mousedown(function () {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);
        
        // ✅ 加上微延遲，避免圖片切換反應太慢
        setTimeout(() => {
            $(this).attr("src", "img/segu2_2.png"); // 換成張嘴的圖片
        }, 10);

        // 點擊時數字放大 + 跳動特效
        $times.css("font-size", "55px").animate({
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
            $audioSpecial50[0].currentTime = 0;
            $audioSpecial50[0].play(); // 播放 50 的倍數音效
        } else if (countTimes % 10 === 0) {
            $audioSpecial10[0].currentTime = 0;
            $audioSpecial10[0].play(); // 播放 10 的倍數音效
        } else {
            $audioNormal[0].currentTime = 0;
            $audioNormal[0].play(); // 播放普通音效
        }
    });

    // 鬆開滑鼠：閉嘴
    $image.mouseup(function () {
        // ✅ 也加上延遲，避免 DOM 重繪卡頓
        setTimeout(() => {
            $(this).attr("src", "img/segu1_2.png"); // 換回閉嘴的圖片
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
