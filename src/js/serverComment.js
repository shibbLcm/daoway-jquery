
$(function () {
  $.get('http://localhost:3000/item',(data) => {
    console.log(data,'data')
    $('.ccWrap').append(template('ccWrap',{data:data}))
    $('.infoTop').append(template('infoTop',{data:data}))
    $('#jianjie').append(template('jianjieInfo',{data:data}))
  });

  let comments= [];
  let currentComments = [];
  $.get('http://localhost:3000/comment',(data) => {
    comments = data;
    currentComments = comments.slice(0,10);
    console.log(currentComments)
    $('#comments').append(template('comment',{data:currentComments}))
  });

  /*描点链接添加过渡*/
  $(".navBar a").click(function () {
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -20+ "px"}, 500);
    return false;//不要这句会有点卡顿
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

  /*导航*/
  $('.navBar ul li a').click(function () {
    $(this).parent().addClass('active').siblings().removeClass('active');
  })

  /*分页器*/
  $('.fenye .showPage .num').click(function () {
    let pageNum = this.textContent;
    currentComments = comments.slice(pageNum * 10 - 10, pageNum * 10);
    $('#comments').empty().append(template('comment', { data: currentComments }));
    $(this).addClass('acv').siblings().removeClass('acv');
  })

})