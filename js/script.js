gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('#scroll-container'),
  smooth: true,
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#scroll-container', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },

  pinType: document.querySelector('#scroll-container').style.transform ? 'transform' : 'fixed',
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

ScrollTrigger.refresh();

// DATE FUNCTION

const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD/MM')}`;
};
setInterval(showTime, 1000);

// GSAP ANIMATIONS

const titleH1 = document.querySelector('.title-line1');
const titleH2 = document.querySelector('.title-line2');
const titleH3 = document.querySelector('.title-line3');
const titleAnimationContainer = document.querySelector('.title-animation-container');

let titleH1Width;
let titleH2Width;
let titleH3Width;
let titleSumWidth;
let titleH3WidthInPercent;

titleH1Width = titleH1.offsetWidth;
titleH2Width = titleH2.offsetWidth;
titleH3Width = titleH3.offsetWidth;

titleSumWidth = titleH1Width + titleH2Width + titleH3Width;

titleH3WidthInPercent = (titleSumWidth / window.innerWidth) * 100;

document.querySelector('.title-animation-container').style.width = titleH3WidthInPercent + '%';

window.addEventListener('resize', () => {
  titleH1Width = titleH1.offsetWidth;
  titleH2Width = titleH2.offsetWidth;
  titleH3Width = titleH3.offsetWidth;

  titleSumWidth = titleH1Width + titleH2Width + titleH3Width;

  titleH3WidthInPercent = (titleSumWidth / window.innerWidth) * 100;

  console.log(titleH3WidthInPercent);

  titleAnimationContainer.style.width = titleH3WidthInPercent + '%';

  document.querySelector('.title-animation-container').style.width = titleH3WidthInPercent + '%';
});

ScrollTrigger.matchMedia({
  '(max-width: 992px)': function () {
    gsap.to('.header-flex-container', {
      scrollTrigger: {
        trigger: '.header',
        scroller: '#scroll-container',
        start: 'bottom 100px',
        toggleActions: 'play none none reverse',
        markers: true,
      },
      color: 'black',
      ease: 'power3.out',
    });
  },

  '(min-width: 993px)': function () {
    // let headerMenuTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.header',
    //     scroller: '#scroll-container',
    //     start: 'bottom 54px',
    //     toggleActions: 'play none none reverse',
    //   },
    // });

    // headerMenuTl.to('.header-flex-container', {
    //   color: 'black',
    //   duration: 0.2,
    //   y: 200,
    //   ease: 'power3.out',
    // });

    gsap.to('.header-flex-container', {
      scrollTrigger: {
        trigger: '.header',
        scroller: '#scroll-container',
        start: 'bottom 54px',
        toggleActions: 'play none none reverse',
      },
      color: 'black',
      duration: 0.2,
      ease: 'power3.out',
    });

    gsap.to('.title-animation-container', {
      scrollTrigger: {
        trigger: '.header',
        scroller: '#scroll-container',
        start: 'top top',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse',
        markers: true,
        scrub: true,
      },
      width: '98%',
      y: '60vh',
      color: 'black',
      duration: 0.2,
      ease: 'power3.out',
    });
  },
});
