$('.clients__slider-container').on('init', (event, slick) => {
  let items = document.querySelectorAll('.clients__item');
  items.forEach( (el) => {
    let singleItemCounter = document.createElement('span');
    singleItemCounter.classList.add('clients__item-count');
    let slickSlide = el.closest('.slick-slide');
    let slideNumber = slickSlide.dataset.slickIndex;
    slideNumber++;
    if (slideNumber<1) slideNumber += slick.slideCount;
    if (slideNumber>slick.slideCount) slideNumber -=slick.slideCount;
    if (slideNumber<10) singleItemCounter.innerHTML="0"+slideNumber;
    else singleItemCounter.innerHTML=slideNumber;
    el.append(singleItemCounter);
  });
});
$('.nav__burger-wrapper').on('click', () => {
  $list = $('.nav__menu-link');
  if($('.burger__menu:has(*)').length){
    $('.burger__menu-wrapper').toggleClass("burger__menu-wrapper_opened");
    return;
  }
  $list.each((index,el)=>{
    $clone = $(el).clone(true);
    $clone.children('*').removeClass('nav__menu-item').addClass('burger__menu-item');
    $('.burger__menu').append($clone);
  });
  $('.burger__menu-item .nav__submenu').each((index, el) => {
    $(el).removeClass('nav__submenu').addClass('burger__menu-dropdown');
  })

  $('.burger__menu-wrapper').toggleClass("burger__menu-wrapper_opened");
})
$('.clients__slider-container').slick({
  arrows:true,
  autoplay:false,
  slidesToShow:4,
  slidesToScroll:4,
  responsive:[
    {
      breakpoint:600,
      settings:{
        slidesToShow:1,
        slidesToScroll:1
      }
    },
    {
      breakpoint:800,
      settings:{
        slidesToShow:2,
        slidesToScroll:2
      }
    },
    {
      breakpoint:1200,
      settings:{
        slidesToShow:3,
        slidesToScroll:3
      }
    },
    {
      breakpoint:1600,
      settings:{
        slidesToShow:4,
        slidesToScroll:4
      }
    },
  ]
})
const mixer = mixitup('.functions', {
  load:{
    filter:'.functions__item_security'
  }
});
let acc = document.querySelectorAll(".stages__item");
acc.forEach( el => {
  el.addEventListener("click", function(e) {
    if(window.innerWidth<1200){
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("stages__item_active");

      /* Toggle between hiding and showing the active panel */
      let panel = this.lastChild.previousSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight= null;
      } else {
        panel.style.maxHeight = panel.scrollHeight +"px";
      }
    } else{
      let title = e.target.closest('.stages__item').querySelector('.stages__item-text').innerHTML;
      let description = e.target.closest('.stages__item').querySelector('.stages__item-desc').innerHTML;
      Fancybox.show([{src:`<h3 class="stages__popup-title"> ${title}</h3><p class="stages__popup-desc">${description}</p>`, type:"html"}]);
    }
  });
})
$(window).on("load resize", (e => {
  if(window.innerWidth < 900){
    mixer.filter('all');
  }
  else{
    mixer.filter('.functions__item_security');
  }
}));