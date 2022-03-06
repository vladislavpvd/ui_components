$(document).on('input change', 'input[type="range"]', function() {
    let currentValue = $(this).val();
    $('.rangeLabel').removeClass('active');
    // добавляем класс к label с value == currentValue
    $('.rangeLabel[value="'+currentValue+'"]').addClass('active');
  });
  
  $('label.rangeLabel').click( function(){
    $('.rangeLabel').removeClass('active')
    $(this).addClass("active");
    label = $(this);
    value = label.html();
    let rng = document.getElementById('performance'); //rng - это ползунок
    rng.value = value;
  });