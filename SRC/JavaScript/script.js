
$(document).ready (function () {
  $('.drop-down-menu').on('change' , function(){
    $('.logo').css({
      'transform':'scale(.25)'
    });
    $('.load-gif').show();
    $('header').animate({
      height: '100px',
      margin: '0',
    });
    var $headlines = $('.headlines')
    $headlines.empty();
    var select = $('.options option:selected').filter(':selected').val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + select + ".json";
    url += '?' + $.param({
      'api-key': "39902597f9794564bab42496da94c8e5"
    });
    // Make the AJAX request
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      for (var i=0; i < result.results.length ; i++) {
        if(i<12){
          var title = result.results[i].title;
          var url = result.results[i].url;
          if (result.results[i].multimedia.length) {
            var imgUrl = result.results[i].multimedia[2].url;
          }
          else {
            continue;
          }
          var $link = $('<a></a>');
          $link.css('background-image', 'url(' + imgUrl + ')');
          $link.css('background-size', 'cover');
          $link.css('background-position-y', 'center');
          $link.css('background-position-x', 'center');
          $link.attr('href' , url);
          var $text = $('<p></p>');
          $text.text(title);
          $link.append($text);
          $headlines.append($link);
          window.onload = function(){
            document.getElementById("loading").style.display = "none" }
        }
      }
    }).fail(function(err) {
      throw err;
    });
    $('.load-gif').hide(1500);
  })
});
