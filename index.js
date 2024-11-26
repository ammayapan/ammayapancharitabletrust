window.onload = function () {
    document.body.classList.add("remove-scrolling");
}

setTimeout(() => {
    $('.splash').fadeOut('fast');
    document.body.classList.remove("remove-scrolling");
}, 1500);

function clampAndScale(value, originalMin, originalMax, targetMin, targetMax) {
    // Ensure the value is within the original range
    if (value < originalMin) value = originalMin;
    if (value > originalMax) value = originalMax;

    // Scale the value from the original range to the target range
    const scaledValue = (value - originalMin) / (originalMax - originalMin) * (targetMax - targetMin) + targetMin;
    
    return scaledValue;
}

var compassion_img_src = "resources/icons/Compassion.svg";
var inclusivity_img_src = "resources/icons/Inclusivity.svg";
var respect_img_src = "resources/icons/Respect.svg";
var intergrity_img_src = "resources/icons/Integrity.svg";

window.onload = function () {
    var screen_height = window.screen.height
    var page_height = document.body.offsetHeight
    const progressBar = document.querySelector('section .progress_bar');
    const footer = document.querySelector('footer');
    const progressSlider = document.getElementById("dot")

    window.onresize = function(){
        screen_height = window.screen.height
        page_height = document.body.offsetHeight

        var progress_value = (1696 - progressBar.style.strokeDashoffset)
        var slider_value = clampAndScale(progress_value, 0, 1696, 0, 360)
        progressSlider.style.transform = `rotate(${slider_value}deg)`
    }
    
    document.documentElement.scrollHeight - document.documentElement.clientHeight;

    window.addEventListener('scroll', () => {
        const scrollTop =
            document.body.scrollTop || document.documentElement.scrollTop;
        var progress_bar_offset = progressBar.getBoundingClientRect();

        if (((screen_height/2) - screen_height*0.01) > progress_bar_offset.top)
        {
            var progress_value = 1696 - (clampAndScale(scrollTop, screen_height*1.05, page_height - (footer.offsetHeight + screen_height), 0, 1696))
            progressBar.style.strokeDashoffset = `${progress_value}`;
        }

        // console.log(((screen_height/2) - screen_height*0.5), progress_bar_offset.top, screen_height)
    });
}

$(window).scroll(function() {
    var windowpos = $(window).scrollTop();
    const progressBar = document.querySelector('section .progress_bar');
    const progressSlider = document.getElementById("dot")

    console.log(progressBar.style.strokeDashoffset)
    
    var progress_value = (1696 - progressBar.style.strokeDashoffset)
    var slider_value = clampAndScale(progress_value, 0, 1696, 0, 360)
    progressSlider.style.transform = `rotate(${slider_value}deg)`

    if (progress_value < 424 && progress_value > 0)
    {
        $(".core_icon").attr("src", compassion_img_src);
    }

    if (progress_value < 424*2 && progress_value > 424)
    {
        $(".core_icon").attr("src", inclusivity_img_src);
    }

    if (progress_value < 424*3 && progress_value > 424*2)
    {
        $(".core_icon").attr("src", respect_img_src);
    }

    if (progress_value < 424*4 && progress_value > 424*3)
    {
        $(".core_icon").attr("src", intergrity_img_src);
    }
});