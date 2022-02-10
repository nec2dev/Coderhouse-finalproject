var $addQuantity = $('.btn-quantity.plus'),
    $minusQuantity = $('.btn-quantity.minus'),
    $removeItem = $('.btn-remove');

$addQuantity.on('click',function(e){
  e.preventDefault();
  var $item = $(this).parents('.item'),
      $quantityField = $item.find('.quantity_field'),
      currentQuantity = $quantityField.val(),
      nextQuantity = parseFloat(currentQuantity)+1;
  
  $item.find('.current_quantity').html(nextQuantity);
  $quantityField.val(nextQuantity);
  
  calculateTotal();
  
});

$minusQuantity.on('click',function(e){
  e.preventDefault();
  var $item = $(this).parents('.item'),
      $quantityField = $item.find('.quantity_field'),
      currentQuantity = $quantityField.val();
  var prevQuantity = (currentQuantity <= 1) ? 0 : parseFloat(currentQuantity)-1;
  
  $item.find('.current_quantity').html(prevQuantity);
  $quantityField.val(prevQuantity);
  
  calculateTotal();
  
});

$removeItem.on('click',function(){
  var $item = $(this).parents('.item');
  $item.remove();
  
  calculateTotal();
});

var calculateTotal = function(  ) {
  var newSubTotal = 0;
  $('.quantity_field').each(function(){
    var quantity = $(this).val(),
        price = $(this).data('price');
    
    newSubTotal += parseFloat(quantity*price);
    
  });
  
  $('.sub-total .amount').html('$'+newSubTotal);
  
  var withTax = newSubTotal*1.05;

  var newTotal = withTax+20;
  
  $('.total .amount').html('$'+newTotal);
  
};


/*
 * Image Slide
 * I actually had a lot more fun building this image changer function that I did the rest of the cart I think. It's a pretty straight forward. Please help me improve it if you see any issues. 
 */

var imageSlide = {
  init: function(element){
    imageSlide.$imageList = $(element);
    imageSlide.images = this.$imageList.data('images');
    imageSlide.currentSlide = 0;
    imageSlide.$imageList.each(function(){
      $(this).find('li').removeClass('active').eq(0).addClass('active');
    });
    
    imageSlide.$imageList.hover(
      function(){
        imageSlide.$imageList = $(this)
        imageSlide.start();  
      },
      function(){
        imageSlide.stop();
      });
    
  },
  changeSlide: function(){       
    imageSlide.$imageList.find('li').removeClass('active').eq(imageSlide.currentSlide).addClass('active');
    
    if(imageSlide.currentSlide >= imageSlide.images.length -1) {
      imageSlide.currentSlide = 0;
    }
    else {
      imageSlide.currentSlide++;
    }
  },
  start: function(){
    imageSlide.changeSlide();
    imageSlide.timer = setInterval(imageSlide.changeSlide,300);
  },
  stop: function() {
    clearInterval(imageSlide.timer);
    imageSlide.$imageList.find('li').removeClass('active').eq(0).addClass('active');
  }
};

imageSlide.init('.images');

calculateTotal();