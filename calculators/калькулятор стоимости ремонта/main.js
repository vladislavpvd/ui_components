var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

document.querySelector("#prevBtn").addEventListener('click', () => {
    nextPrev(-1);
});

document.querySelector("#nextBtn").addEventListener('click', () => {
    nextPrev(1);
});

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Посчитать";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далее";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab += n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("calcForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    if (currentTab != 5) {
      document.getElementsByClassName("listep")[currentTab].className += " finish";
    }
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i, x = document.getElementsByClassName("listep");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  if (n != 5) {
    x[n].className += " active";
  }

  let progressCount = document.getElementById("progress_count");
  let innerProgress = document.getElementById("inner_progress");
  if (!progressCount.classList.contains("finish")) {
    let pc = parseInt(n) + 1;
    pc = pc.toString();
    progressCount.innerHTML = "0" + pc;

    mn = parseInt(n) + 1;
    wp = 16.7 * mn;
    wp = wp.toString() + '%';
    innerProgress.style.width = wp;

    // let input = document.querySelector('input[name="Тип_жилья"]:checked')
    // document.querySelector('#type_life').textContent = input.innerHTML;

    $('#type_life').text($('input[name="Тип_жилья"]:checked').val());
    $('#area').text($('input[name="Площадь_квартиры"]').val());
    $('#number_rooms').text($('input[name="Количество_комнат"]:checked').val());
    $('#decoration').text($('input[name="Отделка"]:checked').val());
    $('#style').text($('input[name="Стиль"]:checked').val());
  } else {
    innerProgress.style.width = "100%"
    progressCount.innerHTML = "06";
  }
}
 
