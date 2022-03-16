var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var total = month;

console.log('currentTime: ', currentTime);
console.log('month: ', month);
console.log('total: ', total);

var myElement = document.querySelector("#maincontent");
var textSelector = function(divId) {
  var textElement = document.getElementById(divId);
  return textElement;
}

myElement.style.backgroundRepeat = "no-repeat";
myElement.style.backgroundSize = "cover";

// Summer
if (total >= 6 && total <= 8)
{
var season = "summer.jpg";
myElement.style.backgroundImage = "url('img/summer.jpg')";
  textSelector('seasonOne').innerHTML = 'Season (Summer)';
}
// Autumn
else if (total >= 9 && total <= 11)
{
var season = "fall.jpg";
myElement.style.backgroundImage = "url('img/fall.jpg')";
  textSelector('seasonTwo').innerHTML = 'Season (Fall)';
}
// Winter
else if (total == 12 || total == 1 || total == 2)
{
var season = "winter.jpg";
  myElement.style.backgroundImage = "url('img/winter.jpg')";
  textSelector('seasonThree').innerHTML = 'Season (Winter)';
}
// Spring
else if (total >= 2 && total <= 6)
{
var season = "spring.jpg";
  myElement.style.backgroundImage = "url('img/spring.jpg')";
  textSelector('seasonThree').innerHTML = 'Season (Spring)';
}
else
{
var season = "summer.jpg";
  myElement.style.backgroundImage = "url('img/summer.jpg')";
  textSelector('seasonThree').innerHTML = 'Season (Summer)';
}