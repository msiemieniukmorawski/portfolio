'use strict';
// ——————————————————————————————————————————————————
// check has class
// ——————————————————————————————————————————————————


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}


// ——————————————————————————————————————————————————
// init owl carousel
// ——————————————————————————————————————————————————

document.addEventListener("DOMContentLoaded", function() {
    $('.owl__wordpress').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        loop: true,
        nav: false,
        dots: true,
    });
    $('.owl__html').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        loop: true,
        nav: false,
        dots: true,
    })
    $('.owl__email').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        loop: true,
        nav: false,
        dots: true,
    })

});

// ——————————————————————————————————————————————————
// open nav hamburger
// ——————————————————————————————————————————————————

 $('#hamburger').click(function () {
        $(this).toggleClass('open');
        $('.nav-links').toggleClass('open');
    });
  $('.nav-links li').click(function(){
    $('#hamburger').removeClass('open');
        $('.nav-links').removeClass('open');
  })

// ——————————————————————————————————————————————————
// link scroll
// ——————————————————————————————————————————————————

$('.close').on("click", function() {
    $('.half--about').removeClass("show-up");
    $('.half--contact').removeClass("show-down");
    $('body').removeClass("overflow--hide");
    setTimeout(function() {
        $('.container__about__contact ').removeClass("zindex");
    }, 500);

})
$('#button--about').click(function(event) {
    if($(window).width() > 768){
         event.preventDefault();
    $('.half--about').addClass("show-up");
    $('.half--contact').addClass("show-down");
    $('body').addClass("overflow--hide");
    $('.container__about__contact ').addClass("zindex");
    }
    else{
        if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[class=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
    }
   

});
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .on("click", function(event) {
        if (hasClass(this, "about") && $(window).width() > 768) {
            event.preventDefault();
            $('.half--about').addClass("show-up");
            $('.half--contact').addClass("show-down");
            $('body').addClass("overflow--hide");
            $('.container__about__contact ').addClass("zindex");
        } else if (hasClass(this, "contact") && $(window).width() > 768) {
            event.preventDefault();
            $('.half--about').addClass("show-up");
            $('.half--contact').addClass("show-down");
            $('body').addClass("overflow--hide");
            $('.container__about__contact ').addClass("zindex");
        } else {


            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[class=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        }
    });


// ——————————————————————————————————————————————————
//show button up
// ——————————————————————————————————————————————————
$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 400) {
        $('.button__top').fadeIn();
    } else {
        $('.button__top').fadeOut();
    }

});



// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 20)
            const end = start + Math.floor(Math.random() * 50)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

// ——————————————————————————————————————————————————
// init TextScramble
// ——————————————————————————————————————————————————

const phrases = [
    'Marcin'
]
const phrases2 = [
    'Siemieniuk-Morawski'
]

const el = document.querySelector('.first__name')
const fx = new TextScramble(el)

const el2 = document.querySelector('.second__name')
const fxl = new TextScramble(el2)

let counter = 0
const next = () => {
    fx.setText(phrases[counter]).then(() => next)
    fxl.setText(phrases2[counter]).then(() => next)
    counter = (counter + 1) % phrases.length
}

next();


// ——————————————————————————————————————————————————
//Form focus input and textarea
// ——————————————————————————————————————————————————


$('.contact__form input').focus(function() {
    $(this).prev('label').addClass('focus');
});
$('.contact__form input').focusout(function() {
    if (hasClass($(this)[0], "email")) {
        if (!$(this).val()) {
            $(this).addClass('empty');
            $(this).prev('label').removeClass('focus');
            $(this).removeClass('ok');
            check();
        }
    } else {
        if (!$(this).val()) {
            $(this).addClass('empty');
            $(this).prev('label').removeClass('focus');
            $(this).removeClass('ok');
            check();
        } else {
            $(this).removeClass('empty');
            $(this).addClass('ok');
            check();
        }
    }

});

$('.contact__form textarea').focus(function() {
    $(this).prev('label').addClass('focus');
});
$('.contact__form textarea').focusout(function() {
    if (!$(this).val()) {
        $(this).addClass('empty');
        $(this).prev('label').removeClass('focus');
        $(this).removeClass('ok');
        check();
    } else {
        $(this).removeClass('empty');
        $(this).addClass('ok');
        check();
    }
}).keypress(function() {
    if (!$(this).val()) {
        $(this).removeClass('ok');
        check();
    } else {
        $(this).removeClass('empty');
        $(this).addClass('ok');
        check();
    }
});

// ——————————————————————————————————————————————————
//Form vadlilate email
// ——————————————————————————————————————————————————
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate() {
    $("#result").text("");
    var email = $("#email").val();
    if (validateEmail(email)) {
        $(this).addClass('ok');
        $(".form__send").addClass("disable");
        check();
    } else {
        $(this).addClass('empty');
        $(this).removeClass('ok');
        check();
    }
    return false;
}

$("#email").focusout(validate);


// ——————————————————————————————————————————————————
//anable btn send
// ——————————————————————————————————————————————————

function check() {
    if (hasClass($('#name')[0], "ok") && hasClass($("#email")[0], "ok") && hasClass($("#email")[0], "ok") && hasClass($("#message")[0], "ok")) {
        $(".form__send").removeClass("disable");
        $(".button--mask").addClass(".form__send--message");
        $(".form__send--message").attr('data-send', true);
    } else {
        $(".button--mask").removeClass(".form__send--message");
        $(".form__send").addClass("disable");
        $(".form__send--message").attr('data-send', false);

    }
}

// ——————————————————————————————————————————————————
//send message
// ——————————————————————————————————————————————————

$(".form__send--message").on("click", function() {

    var name = $("#name").val();
    var subject = $("#subject").val();
    var email = $("#email").val();
    var message = $("#message").val();

    if ($(".form__send--message").attr('data-send') == "true") {
        console.log(name + '' + subject + ' ' + email + ' ' + message);
        startSubmit(name, subject, email, message);
    } else {

    }
});

function startSubmit(name, subject, email, message) {
    $("#status").html('wysyłam');
    $.ajax({
        url: "send.php?name=" + name + "&subject=" + subject + "&email=" + email + "&message=" + message,
        success: function(data) {
            if (data.error == 'sent') {
                stop = true;
            } else {
                $("#status").html('wystąpił jakiś błąd przepraszam');
            }
        }
    });
}
$(document).ajaxStop(function() {
    $("#status").html('Odezwę się najszybciej jak będę mógł');
});



// ——————————————————————————————————————————————————
//hover skills
// ——————————————————————————————————————————————————

var nodes  = document.querySelectorAll('.single__skill'),
    _nodes = [].slice.call(nodes, 0);

var getDirection = function (ev, obj) {
    var w = obj.offsetWidth,
        h = obj.offsetHeight,
        x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1)),
        y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1)),
        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
  
    return d;
};

var addClass = function ( ev, obj, state ) {
    var direction = getDirection( ev, obj ),
        class_suffix = "";
    
    obj.className = "";
    
    switch ( direction ) {
        case 0 : class_suffix = '-top';    break;
        case 1 : class_suffix = '-right';  break;
        case 2 : class_suffix = '-bottom'; break;
        case 3 : class_suffix = '-left';   break;
    }
    
    obj.classList.add( state + class_suffix );
};

// bind events
_nodes.forEach(function (el) {
    el.addEventListener('mouseover', function (ev) {
        addClass( ev, this, 'in' );
    }, false);

    el.addEventListener('mouseout', function (ev) {
        addClass( ev, this, 'out' );
    }, false);
});