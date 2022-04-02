const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
window.addEventListener("scroll", () => {
  // 控制顶部导航栏样式变化
  let height = headerEl.getBoundingClientRect().height;
  if(window.pageYOffset - height > 680) {
    if(!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 控制返回顶部按钮显隐
  if(window.pageYOffset > 800) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }

})


const glide = new Glide(".glide");
const captionEls = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
  const caption = captionEls[glide.index]; // 获取当前轮播图
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0]
  });
});
glide.on('run.before', () => {
  document.querySelectorAll(".slider-caption > *").forEach(el => {
    el.style.opacity = 0
  })
});
glide.mount();


const scroll = new SmoothScroll("nav a[href*='#'], .scrollToTop a[href*='#']", {
  header: "header",
  offset: 0
});

document.addEventListener("scroll", () => {
  if(headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

const exploreMoreBtns = document.querySelectorAll(".explore-more");
exploreMoreBtns.forEach(exploreMoreBtn => {
  exploreMoreBtn.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});