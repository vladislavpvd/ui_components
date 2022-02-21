let $item = $('.item');
let $window = $(window);

function viewedItem() {
  let scrollTop = $window.scrollTop();

  let scrollBottom = scrollTop + $window.height();

  $item.each((index, item) => {
    let $currentItem = $(item);

    let itemOffsetTop = $currentItem.offset().top;

    let itemOffsetBottom = itemOffsetTop + $currentItem.height();

    if (scrollTop < itemOffsetBottom && scrollBottom > itemOffsetTop && !$currentItem.attr('data-viewed')) {
      let color = $currentItem.attr('data-color');
      $currentItem.css('background-color', color);
      $currentItem.attr('data-viewed', true);
    }
  });
}

viewedItem();

$(window).scroll(() => {
  viewedItem();
});