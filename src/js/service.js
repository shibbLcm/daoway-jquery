$(function () {
  $.get('http://localhost:3000/service',(data) => {
    $('.tabUl').append(template('tabLi',{data:data}))
  })
  //点击云家政调进入商家详情
  console.log($('.tabUl li'),'000000')
  $('.tabUl li').eq(0).click(function () {
    console.log(111111)
    $(window).attr('location','serverComment.html')
  })

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