
$(function () {
  $.get('http://localhost:3000/leftNav',(data) => {
    $('.nav-items').append(template('leftNav',{data:data}))
    $('.wrap').append(template('wrapCon',{data:data}))
  })

  //轮播图
  new Swiper('.swiper-container', {
    spaceBetween: 100,
    effect: 'fade',
    loop : true,
    autoplay : true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  /*头部*/
  let $header=$('#header');
  let headerHeight=$header.outerHeight();
  let ishide=false;
  $(window).scroll( function() {
    if(document.documentElement.scrollTop>headerHeight){
      if(!ishide){
        $header.hide().slideDown('slow').addClass('header-wrap header-fixed');
        ishide=true;
      }
    }else if(document.documentElement.scrollTop<headerHeight){
      if(ishide){
        $header.removeClass('header-fixed')
        ishide=false;
      }
    }
  });
})