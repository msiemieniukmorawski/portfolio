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
// link scroll
// ——————————————————————————————————————————————————

$('.close').click(function() {
    $('.half--about').removeClass("show-up");
    $('.half--contact').removeClass("show-down");
    $('body').removeClass("overflow--hide");
    setTimeout(function() {
        $('.container__about__contact ').removeClass("zindex");
    }, 500);

})
$('.about').click(function() {
    event.preventDefault();
    $('.half--about').addClass("show-up");
    $('.half--contact').addClass("show-down");
    $('body').addClass("overflow--hide");
    $('.container__about__contact ').addClass("zindex");

});
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        if (hasClass(this, "about") || hasClass(this, "contact")) {
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
        
    }
}

// ——————————————————————————————————————————————————
//send message
// ——————————————————————————————————————————————————

$(".form__send--message").click(function () {

    var name = $("#name").val();
    var subject = $("#subject").val();
    var email = $("#email").val();
    var message = $("#message").val();
    console.log(this.attr('data-send'));
    if($(".form__send--message").attr('data-send') == "send"){
      console.log(name+''+subject+' '+email+ ' ' +message);
      startSubmit(name, subject, email, message);
   }
   else{

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
