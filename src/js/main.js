"use strict";

// TEXT ANIMATION

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var phrases = ['скорочтение 2.0', 'скорочтение 2.0', 'скрчт 2.0'];

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      if (newText) {
        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function (resolve) {
          return _this.resolve = resolve;
        });
        this.queue = [];

        for (var i = 0; i < length; i++) {
          var from = oldText[i] || '';
          var to = newText[i] || '';
          var start = Math.floor(Math.random() * 40);
          var end = start + Math.floor(Math.random() * 40);
          this.queue.push({
            from: from,
            to: to,
            start: start,
            end: end
          });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var output = '';
      var complete = 0;

      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _queue$i = this.queue[i];
        var from = _queue$i.from;
        var to = _queue$i.to;
        var start = _queue$i.start;
        var end = _queue$i.end;
        var char = _queue$i.char;


        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }

          output += '<span class="dud">' + char + '</span>';
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }, {
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

var el = document.querySelector('.skr4t-information__subtitle');
var fx = new TextScramble(el);
var counter = 0;

var next = function next() {
  if (phrases[counter]) {
    fx.setText(phrases[counter]).then(function () {
      setTimeout(next, 1000);
      if (counter === phrases.length) {
        document.querySelector('.skr4t-start').style.opacity = '1';
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  counter++;
};

next();

// MODE

function mode() {
  const navigationElements = document.querySelector('.header-navigation');
  const modeElements = document.querySelectorAll('.mode');
  modeElements.forEach(element => {
    if (element.classList.contains('light-mode')) {
      element.classList.remove('light-mode');
    }
    if (element.classList.contains('dark-mode')) {
      element.classList.remove('dark-mode');
      element.classList.add('light-mode');
    } else {
      element.classList.add('dark-mode');
    }
  })
}

let clickEvent = 0;
function scrollToElement(element) {
  if (element === '.main' && clickEvent === 0) {
    clickEvent = 1;
    document.querySelectorAll('.video-clip')[0].play()
    document.querySelector('.main').setAttribute(
      'style',
      'position: relative; height: auto; overflow: auto;');
    // INIT SWIPER JS
    swiperInit();
  }
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
}





// SWIPER INIT
function swiperInit() {
  const reviewsTitle = document.querySelector('.reviews__title');
  document.querySelector('.swiper-3').style.marginLeft = `${reviewsTitle.getBoundingClientRect().x}px`;
  const videoSwiper = new Swiper('.swiper-1', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 'auto',
    resistance: true,
    resistanceRatio: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        autoHeight: true
      },
      768: {
        autoHeight: false
      },
    }
  })
  videoSwiper.on('transitionStart', function (event) {
    const videoElement = document.querySelectorAll('.video-clip');
    videoElement.forEach(el => {
      el.pause();
      el.currentTime = 0;
    })
    videoElement[event.snapIndex].play();
  });
  new Swiper('.swiper-2', {
    effect: 'flip',
    direction: 'vertical',
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  new Swiper('.swiper-3', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
}
swiperInit();
window.addEventListener('resize', () => {
  const reviewsTitle = document.querySelector('.reviews__title');
  document.querySelector('.swiper-3').style.marginLeft = `${reviewsTitle.getBoundingClientRect().x}px`;
});

// HEADER NAVIGATION
window.addEventListener('scroll', (event) => {
  if (this.scrollY > document.querySelector('.header').offsetHeight) {
    document.querySelector('.header-navigation').style.transform = 'translateY(0)'
  } else {
    document.querySelector('.header-navigation').style.transform = 'translateY(-100%)'
  }
})
// PROBLEMS VIDEO
// document.querySelector('.problems-video').offsetHeight
const problemsSection = document.querySelector('.problems-video');
const problemsVideoWrappers = document.querySelectorAll('.problems-video-wrapper');
const problemsVideoClips = document.querySelectorAll('.problems-video-wrapper .video-clip');
const problemsVideoContent = document.querySelectorAll('.problems-video-item');
problemsVideoClips[0].play();

function resizeSection() {
  problemsSection.style.height = `${problemsVideoWrappers[0].offsetHeight}px`;
  problemsSection.style.paddingBottom = `${problemsSection.offsetHeight - problemsVideoWrappers[0].offsetHeight}px`;
}
resizeSection();

problemsSection.addEventListener('scroll', (e) => {
  document.querySelector('.problems-video .container').style.top = `${e.target.scrollTop}px`;
  problemsVideoWrappers.forEach((element, index) => {
    const offsetElement = element.getBoundingClientRect().top - problemsSection.getBoundingClientRect().top;
    if (Math.abs(offsetElement) <= element.offsetHeight / 2 || offsetElement === 0) {
      problemsVideoContent[index].style.opacity = '1';
      problemsVideoClips[index].play();
    } else {
      move(index);
    }
  })
})

function move(index) {
  problemsVideoContent[index].style.opacity = '0';
  problemsVideoClips[index].pause();
}