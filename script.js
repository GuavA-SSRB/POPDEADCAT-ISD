$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audioNormal = $(".pop"); // 普通音效
    const $audioSpecial10 = $(".special-pop"); // 10 的倍數音效
    const $audioSpecial50 = $(".special-pop-50"); // 50 的倍數音效

    // 按下滑鼠：張嘴、累計次數、播放音效
    $image.mousedown(function () {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);
        $(this).attr("src", "img/segu2.png"); // 換成張嘴的圖片

        // 點擊時數字放大 + 跳動特效
        $times.css("font-size", "55px").animate({
            fontSize: "60px",
            marginTop: "-5px"
        }, 100).animate({
            fontSize: "55px",
            marginTop: "0px"
        }, 100);

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
        $(this).attr("src", "img/segu1.png"); // 換回閉嘴的圖片
        // 放開滑鼠時恢復原始樣式
        $times.css({
            fontSize: "",
        });
    });
});
