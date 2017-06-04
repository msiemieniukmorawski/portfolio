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
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}
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
