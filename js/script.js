gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('#scroll-container'),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#scroll-container', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector('#scroll-container').style.transform ? 'transform' : 'fixed',
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// date functions

const clockSpan = document.getElementById('time');
const dateSpan = document.getElementById('date');

showTime = () => {
  clockSpan.innerHTML = `${moment().format('h:mm')}`;
  dateSpan.innerHTML = `${moment().format('DD/MM')}`;
};
setInterval(showTime, 1000);

const wielkosc = '100px';

// GSAP animations

// window.addEventListener('resize', () => {

// var tl_footer = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.header',
//     start: 'bottom 100px',
//     toggleActions: 'play none none reverse',
//     markers: true,
//   },
// });

// tl_footer.to('.header-flex-container', {
//   color: 'black',
//   duration: 0.2,
//   ease: 'power3.out',
// });

// }
// });

document.addEventListener('DOMContentLoaded', () => {
  //   if (width > 992) {
  //     console.log('222');
  //   } else {
  var tl_footer = gsap.timeline({
    scrollTrigger: {
      trigger: '.header',
      scroller: '#scroll-container',
      start: 'bottom 100px',
      toggleActions: 'play none none reverse',
      markers: true,
    },
  });

  tl_footer.to('.header-flex-container', {
    color: 'black',
    duration: 0.2,
    ease: 'power3.out',
  });
  //   }
});
window.addEventListener('resize', () => {
  let width = window.innerWidth;
  if (width > 992) {
    console.log('222');
  } else {
    var tl_footer = gsap.timeline({
      scrollTrigger: {
        trigger: '.header',
        start: 'bottom 100px',
        toggleActions: 'play none none reverse',
        markers: true,
      },
    });

    tl_footer.to('.header-flex-container', {
      color: 'black',
      duration: 0.2,
      ease: 'power3.out',
    });
  }
});
