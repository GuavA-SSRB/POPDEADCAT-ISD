$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audioNormal = $(".pop");
    const $audioSpecial10 = $(".special-pop");
    const $audioSpecial50 = $(".special-pop-50");

    const playAudio = (audioElement) => {
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
    };

    // 預載圖片
    $("<img />").attr("src", "img/segu1.webp");
    $("<img />").attr("src", "img/segu2.webp");

    // 點擊處理函數（給 click + touchstart 用）
    function handleClick() {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);

        if (countTimes > 0) {
            $times.css("display", "block");
        }

        setTimeout(() => {
            $image.attr("src", "img/segu2.webp");
        }, 10);

        // 放大特效
        $times.stop(true, true).css("font-size", "55px").animate({
            fontSize: "60px",
            marginTop: "-5px"
        }, 100).animate({
            fontSize: "55px",
            marginTop: "0px"
        }, 100);

        // 字體顏色變化動畫
        if (countTimes % 1000 === 0) {
            animateColor($times, "color-red");
        } else if (countTimes % 100 === 0) {
            animateColor($times, "color-orange");
        } else if (countTimes % 50 === 0) {
            animateColor($times, "color-yellow");
        }        

        // 音效
        if (countTimes % 50 === 0) {
            playAudio($audioSpecial50[0]);
        } else if (countTimes % 10 === 0) {
            playAudio($audioSpecial10[0]);
        } else {
            playAudio($audioNormal[0]);
        }
    }

    // 滑鼠點擊 & 手機觸控事件
    $image.on("mousedown touchstart", function (e) {
        e.preventDefault(); // 防止手機雙擊放大
        handleClick();
    });

    // 滑鼠放開 & 手機結束觸控：閉嘴
    $image.on("mouseup touchend", function () {
        setTimeout(() => {
            $(this).attr("src", "img/segu1.webp");
        }, 10);
        $times.css({ fontSize: "" });
    });

    // 顏色動畫函數（確保特效被清除並重啟）
    function animateColor(element, className) {
        element.removeClass("color-red color-orange color-yellow"); // 先移除所有顏色類別
        element.addClass(className); // 加上對應顏色
        clearTimeout(element.data("colorTimeout")); // 清除舊 timeout
    
        const timeout = setTimeout(() => {
            element.removeClass(className); // 動畫後移除顏色
        }, 500); // 顏色維持時間
    
        element.data("colorTimeout", timeout); // 保存 timeout ID
    }    
});
