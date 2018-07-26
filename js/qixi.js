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
alert(window.innerHeight)
var flipview_wrapper = document.querySelector('#flipview_wrapper');

flipview_wrapper.addEventListener('changed', function () {
  var visible = this.querySelector('li.visible');
  visible && visible.classList.remove('visible');
  this.querySelectorAll('.container > li')[this.index].classList.add('visible');
});
