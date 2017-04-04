function resizeBoard() {
  if($('#board-container').length>1) { $('#board-container').css({'min-height':($(window).height()-$('#board-container').offset().top)-10}); }
}
function displayPopupMenu(e,currentTask) {
  console.log(currentTask);
  $('body').append('<div id="dropdown" style="top:0; position:absolute; width:100%; "><ul class="dropdown-submenu-open"><li><strong>Move to:</strong></li></ul></div>');
  $('#dropdown .dropdown-submenu-open').css({'top':e.pageY+'px','width':'100%','position':'absolute'});
  $('#dropdown').attr('data-task-id',$(currentTask).attr('data-task-id'));
  $('#dropdown').attr('data-column-id',$(currentTask).attr('data-column-id'));
  $('.board-column-title').each(function() {
    if($('a.dropdown-menu',this).text().length>0) {
      if($(this).closest('.board-column-header').attr('data-column-id')!=$(currentTask).attr('data-column-id')) {
        $('#dropdown ul').append('<li data-column-id="'+$(this).closest('.board-column-header').attr('data-column-id')+'">'+$('a.dropdown-menu',this).text()+'</li>');
      }
    }
  });
}
$(document).ready(function() {
  if($(window).width()<767) {
    var timeoutId = 0;
    $('body').on('contextmenu','#board-container .task-board', function(e) {
      //$('body').addClass('contextMenuOpen');
      e.preventDefault();
      displayPopupMenu(e,$(this));
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    });
    $('body').on('mousedown','#board-container .task-board', function(e) {
      $(this).attr('data-state','mousedown').css({'opacity':0.5});
      timeoutId = setTimeout(function displayContext() { displayPopupMenu(e,$(this)); }, 500);
      e.preventDefault();
      return false;
    }).on('mouseup mousemove mouseleave', '#board-container .task-board', function(e) {
        clearTimeout(timeoutId);
        $(this).css({'opacity':1});
    });


    $('body').on('click','#dropdown ul li',function(e) {
      $.ajax({
        method:"POST",
        contentType : 'application/json',
        url:"?controller=BoardAjaxController&action=save&project_id="+$('#board').attr('data-project-id'),
        data: JSON.stringify({"task_id":$('#dropdown').attr('data-task-id'),"src_column_id":$('#dropdown').attr('data-column-id'),"dst_column_id":$(this).attr('data-column-id'),"swimlane_id":"1",'position':1})
      })
      .done(function(data) {
        $('#board-container').replaceWith(data);
        $('body').removeClass('contextMenuOpen');
      });
      e.preventDefault();
      $('#dropdown').remove();
      return false;
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
