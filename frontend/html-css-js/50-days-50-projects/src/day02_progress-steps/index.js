const circles = document.querySelectorAll('.circle');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');

let currentActive = 1;

prevBtn.onclick = function () {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1;
    }
    update();
};
nextBtn.onclick = function () {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length;
    }
    update();
};

function update() {
    // 处理圆
    circles.forEach((circle, index) => {
        if (index < currentActive) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });

    // 处理线
    // 获取线宽百分比
    const width = ((currentActive - 1) / (circles.length - 1)) * 100;
    progress.style.width = `${width}%`;

    // 处理按钮
    if (currentActive === 1) {
        prevBtn.setAttribute('disabled', 'disabled');
    } else if (currentActive === circles.length) {
        nextBtn.setAttribute('disabled', 'disabled');
    } else {
        prevBtn.removeAttribute('disabled');
        nextBtn.removeAttribute('disabled');
    }
}
