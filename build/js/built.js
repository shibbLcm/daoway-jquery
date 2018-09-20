'use strict';

$(function () {

  //轮播图
  new Swiper('.swiper-container', {
    spaceBetween: 100,
    effect: 'fade',
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});