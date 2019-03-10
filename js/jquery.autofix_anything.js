/* ===========================================================
 * jquery.autofix_anything.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Fix position of anything on your website automatically
 * with one js call
 *
 * https://github.com/peachananr/autofix_anything
 *
 * ========================================================== */
/*setInterval(function(){
                    var marginTop = -1 * ($(".header").height());
                    //var marginBottom = $(".header").css('margin-bottom');
                    $(".header").css('margin-bottom', marginTop) ;
                },10)*/
!function($){

  var defaults = {
    customOffset: false,
    manual: false,
    onlyInContainer: true
    };

  $.fn.autofix_anything = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        curpos = el.position(),
        offset = settings.customOffset,
        pos = el.offset();

    el.addClass("autofix_sb")

    $.fn.manualfix = function() {
      var el = $(this),
          pos = el.offset();
      if (el.hasClass("fixed")) {
        el.removeClass("fixed")
      } else {
        el.addClass("fixed").css({
          top: 0,
          left: pos.left,
          right: "auto",
          bottom: "auto"
        });
      }

    }

    fixAll = function(el, settings, curpos, pos){
      if (settings.customOffset == false) offset =  el.parent().offset().top
      if($(document).scrollTop() > offset && $(document).scrollTop() <= (el.parent().height() + (offset - $(window).height())))  {
          el.removeClass("bottom").addClass("fixed").css({
            top: 0,
            left: pos.left,
            right: "auto",
            bottom: "auto"
          });
          /*var marginTop = $(".header").height();
          $( "body" ).css('padding-top',marginTop);*/
      } else {
        if($(document).scrollTop() > offset) {
          if (settings.onlyInContainer == true ) {
            if($(document).scrollTop() > (el.parent().height() - $(window).height())) {
              el.addClass("bottom fixed").removeAttr( 'style' ).css({
                left: curpos.left
              });
            }else {
              el.removeClass("bottom fixed").removeAttr( 'style' );
              $("body").removeClass("bottom fixed").removeAttr( 'style' );
            }
          }
        } else {
          el.removeClass("bottom fixed").removeAttr( 'style' );
          //$(".owl-carousel").css("margin-top","0");
        }
      }

    }
    if (settings.manual == false) {
      $(window).scroll(function() {
        fixAll(el, settings, curpos, pos)
      });
    }


  }
}(window.jQuery);

