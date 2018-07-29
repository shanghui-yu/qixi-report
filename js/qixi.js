var swiper = new Swiper('#part', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  prevButton: '.button-prev',
  nextButton: '.button-next',
  onSlideChangeEnd: function (swiper) {
    var section = document.querySelector('#tow_section .visible')
    section && section.classList.remove('visible')
    document.querySelector('[data-id="' + swiper.activeIndex + '"]').classList.add('visible')
  }
});
var flipview_wrapper = document.querySelector('#flipview_wrapper');

if (window.innerHeight < 1182) {
  flipview_wrapper && flipview_wrapper.classList.add('smail-polify')
}
flipview_wrapper && flipview_wrapper.addEventListener('changed', function () {
  var visible = this.querySelector('li.visible');
  visible && visible.classList.remove('visible');
  this.querySelectorAll('.container > li')[this.index].classList.add('visible');
});


function GetSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var dx = endX - startX;
  var result = 0;
  //如果滑动距离太短
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result;
  }
  var angle = GetSlideAngle(dx, dy);
  if (angle >= -45 && angle < 45) {
    result = 4;
  } else if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  }
  return result;
}
var truntable = document.querySelector('#truntable');

//滑动处理
if (truntable){
  function down(select) {
    select.previousElementSibling.classList.add('select')
    select && select.classList.remove('select')
    s = document.querySelector('.no-trs');
    s && s.classList.remove("no-trs")
    var rotate = parseInt(truntable.dataset['rotate']) - 28
    truntable.style.transform = "rotate(" + rotate + "deg)"
    truntable.dataset['rotate'] = rotate
    truntable.dataset['level'] = 'level-' + select.previousElementSibling.dataset['id']
  }

  function upper(select) {
    select.nextElementSibling.classList.add('select')
    select && select.classList.remove('select')
    s = document.querySelector('.no-trs');
    s && s.classList.remove("no-trs")
    var rotate = parseInt(truntable.dataset['rotate']) + 28
    truntable.style.transform = "rotate(" + rotate + "deg)"
    truntable.dataset['rotate'] = rotate
    truntable.dataset['level'] = 'level-' + select.nextElementSibling.dataset['id']
  }
  // 自动旋转
   var isUp = 0,time =null;
   function loopAuto () {
    time = setInterval(function () {
      var select = document.querySelector('.select')
      if (select.previousElementSibling && !isUp) {
        down(select)
      } else {
        if (!select.nextElementSibling) {
          this.isUp = 0
          down(select)
        } else {
          this.isUp = 1
          upper(select)
        }
      }
    }, 2e3);
   }
   loopAuto()

  var startX, startY;
  truntable.addEventListener('touchstart', function (ev) {
    ev.preventDefault();
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
    time && clearInterval(time)
  }, false);

  truntable.addEventListener('touchend', function (ev) {
    var endX, endY;
    ev.preventDefault();
    loopAuto()
    endX = ev.changedTouches[0].pageX;
    endY = ev.changedTouches[0].pageY;
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
      case 0:
        console.log("没滑动");
        break;
      case 1:
        var select = document.querySelector('.select')
        if (select.nextElementSibling) {
         upper(select)
        }
        break;
      case 2:
        var select = document.querySelector('.select')
        if (select.previousElementSibling) {
          down(select)
        }
        break;
      case 3:
        console.log("向左");
        break;
      case 4:
        console.log("向右");
        break;
      default:
    }

  }, false);
 
}
