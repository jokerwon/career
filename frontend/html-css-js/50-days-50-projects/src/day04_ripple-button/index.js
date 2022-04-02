const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', function onButtonClick(e) {
        // 鼠标位置
        const x = e.clientX;
        const y = e.clientY;
        // 按钮位置
        const buttonTop = e.target.offsetTop;
        const buttonLeft = e.target.offsetLeft;

        // 波纹位置
        const ripperLeft = x - buttonLeft;
        const ripperTop = y - buttonTop;

        const ripperEle = document.createElement('span');
        ripperEle.classList.add('ripper');
        ripperEle.style.top = `${ripperTop}px`;
        ripperEle.style.left = `${ripperLeft}px`;

        this.appendChild(ripperEle);

        setTimeout(() => {
            ripperEle.remove();
        }, 500);
    });
});
