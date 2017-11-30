export const run = (element, acceleration, part) => {
    let timer;
    let current = window.pageYOffset;
    let to;
    if (typeof element === 'object') {
        to = element.getBoundingClientRect().top + current;
        if ((current < to)){
            to = !part ? to : to + element.getBoundingClientRect().height;
        } else {
            to = to - 30
        }

    } else {
        to = 0;
    }
    return function(animation) { //boolean
        let point;
        let clear;
        if (animation) return window.scrollTo(0, to); // without animation;

        if (current < to) {
            point = acceleration || 5;
            clear = function(from, to) {
                if (from > to) {
                    clearTimeout(timer)
                }
            }
        } else {
            point = -acceleration || -5;
            clear = function(from, to) {
                if (from < to) {
                    clearTimeout(timer)
                }
            }
        }

        timer = setInterval(function() {
            current += point;
            window.scrollTo(0, current);
            clear(current, to)
        }, 5);
    }
};
