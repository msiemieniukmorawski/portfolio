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
        nav:false,
        dots:true,
    });
    $('.owl__html').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        loop: true,
        nav:false,
        dots:true,
    })
$('.owl__email').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        items: 1,
        loop: true,
        nav:false,
        dots:true,
    })


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
            const start = Math.floor(Math.random() * 50)
            const end = start + Math.floor(Math.random() * 200)
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
