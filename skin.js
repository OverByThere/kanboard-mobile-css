function resizeBoard() {
  $('#board-container').css({'min-height':($(window).height()-$('#board-container').offset().top)-10});
}
$(document).ready(function() {
  if($(window).width()<767) {
    resizeBoard();
    $('.views-switcher-component ul.views li a').each(function() {
      var icon = $('i',this).clone();
      $(this).html(icon);
    });
  }
});
$(window).on('resize',function() {
  if($(window).width()<767) {
    resizeBoard();
  }
});
