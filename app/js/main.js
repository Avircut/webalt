let acc = document.querySelectorAll(".stages__item");

acc.forEach( el => {
  el.addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("stages__item_active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.lastChild.previousSibling;
    console.log(panel);
    if (panel.style.maxHeight) {
      panel.style.maxHeight= null;
    } else {
      panel.style.maxHeight = panel.scrollHeight +"px";
    }
  });
})
$('.clients__slider-container').slick({
  arrows:true,
  autoplay:false,
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
