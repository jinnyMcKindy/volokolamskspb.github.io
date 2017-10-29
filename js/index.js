'use strict';

var progress_circle = document.getElementById("progress-circle");
var errors = document.getElementsByClassName("errors")[0];
var animation = Animation();
var hidden = Hidden();

window.randomize = function() {
    progress_circle.setAttribute('data-progress', 50);    
};
setTimeout(window.randomize, 200);

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function checkboc_click(element){ 
    if(hasClass(element, "animate")){ 
        if(element.checked){ animation.animate();  } else { animation.stop(); }
    }
    if(hasClass(element, "hide")){
        hidden.hide();
    }
    element.parentElement.classList.toggle("active");
}

function Animation(){
    var obj = {};
    obj.animate = function(){
        progress_circle.classList.add("animated");
        function recursion(){   
            if(hasClass(progress_circle, "animated")){
                obj.computeRotation();
                setTimeout(recursion, 1000);
            }  
        }
        setTimeout(recursion, 1000);
    };
    obj.stop = function(){
       progress_circle.classList.remove("animated");
    };   
    obj.computeRotation = function(){
        var st = window.getComputedStyle(progress_circle, null);
        var tr = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform") ||
         "FAIL";
         
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        var new_angle = angle + 30;
        progress_circle.style['-webkit-transform'] = 'rotate('+new_angle+'deg)';
        progress_circle.style['-o-transform'] = 'rotate('+new_angle+'deg)';
        progress_circle.style['-moz-transform'] = 'rotate('+new_angle+'deg)';
        progress_circle.style['transform'] = 'rotate('+new_angle+'deg)';
    };
    return obj;
}


function Hidden(){
    var obj = {};
    obj.hide = function(){
        progress_circle.classList.toggle("hidden");
    };
    return obj;
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function text_change(element){
    var num = element.value;
    if((num > 100 || num < 0) || !isNumber(num)){
        errors.classList.remove("error-hide");   
        return false;
    }
    errors.classList.add("error-hide");
    progress_circle.setAttribute('data-progress', num); 
}

const node = document.getElementById("number");
node.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        text_change(node);
    }
});
