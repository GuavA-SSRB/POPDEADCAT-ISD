$(document).ready(function () {
    const $image = $(".image img");
    const $times = $(".times");
    const $audioNormal = $(".pop"); // 普通音效
    const $audioSpecial = $(".special-pop"); // 特別音效

    // 按下滑鼠：張嘴、累計次數、播放音效
    $image.mousedown(function () {
        let countTimes = Number($times.text());
        countTimes++;
        $times.text(countTimes);
        
        $(this).attr("src", "img/segu2.png"); // 換成張嘴的圖片
        
        // 檢查是否為 10 的倍數，選擇音效
        if (countTimes % 10 === 0) {  // 嚴格相等
            $audioSpecial[0].currentTime = 0;
            $audioSpecial[0].play(); // 播放特殊音效
        } else {
            $audioNormal[0].currentTime = 0;
            $audioNormal[0].play(); // 播放普通音效
        }
    });

    // 鬆開滑鼠：閉嘴
    $image.mouseup(function () {
        $(this).attr("src", "img/segu1.png"); // 換回閉嘴的圖片
    });
});
