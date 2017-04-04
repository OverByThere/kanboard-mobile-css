function resizeBoard() {
  if($('#board-container').length>1) { $('#board-container').css({'min-height':($(window).height()-$('#board-container').offset().top)-10}); }
}
$(document).ready(function() {
  if($(window).width()<767) {

    var timeoutId = 0;
    //$('.task-board').on('taphold', function() {
    //  alert('test');
    //});
    $('body').on('mousedown click','#board-container .task-board', function(e) {
      $(this).attr('data-state','mousedown').css({'opacity':0.5});
      var currentTask = $(this);
      timeoutId = setTimeout(function displayContext() {
        $('body').append('<div id="dropdown"><ul class="dropdown-submenu-open"><li><strong>Move to:</strong></li></ul></div>');
        $('#dropdown .dropdown-submenu-open').css({'top':e.pageX+'px','left':'5%','width':'90%','position':'absolute'});
        $('.board-column-title').each(function() {
          if($('a.dropdown-menu',this).text().length>0) { $('#dropdown ul').append('<li data-column-id="'+$(this).closest('.board-column-header').attr('data-column-id')+'">'+$('a.dropdown-menu',this).text()+'</li>'); }
        })
        $('body').on('click','#dropdown ul li',function(e) {
          $.ajax({
            method:"POST",
            contentType : 'application/json',
            url:"?controller=BoardAjaxController&action=save&project_id="+$('#board').attr('data-project-id'),
            data: JSON.stringify({"task_id":$(currentTask).attr('data-task-id'),"src_column_id":$(currentTask).attr('data-column-id'),"dst_column_id":$(this).attr('data-column-id'),"swimlane_id":"1","position":1})
          });
          e.preventDefault();
          $('#dropdown').remove();
          return false;
        });
      }, 500);
      e.preventDefault();
      return false;
    }).on('mouseup mousemove mouseleave', '#board-container .task-board', function(e) {
        clearTimeout(timeoutId);
        if(e.type=='mousemove') { if($(this).attr('data-state')=='mouseup') { $('#dropdown').remove(); } }
        else { $(this).attr('data-state','mouseup'); }
        $(this).css({'opacity':1});

    });

    $('.task-board').on('click',function(e) {
      if($(this).attr('data-state')=='mousedown') { e.preventDefault(); return false; }
    });
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
