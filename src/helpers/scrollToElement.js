export const run = element => {
    console.log(element);
    let timer;
    let current = window.pageYOffset;
    let to;
    if (typeof element === 'object') {
        to = element.getBoundingClientRect().top + element.getBoundingClientRect().height + current;
    } else {
        to = 0;
    }
    return function() {
        var point;
        var clear;

        if (current < to) {
            point = 5
            clear = function(from, to) {
                if (from > to) {
                    clearTimeout(timer)
                }
            }
        } else {
            point = -5;
            clear = function(from, to) {
                if (from < to) {
                    clearTimeout(timer)
                }
            }
        }
        timer = setInterval(function() {
            console.log('current', current)
            console.log('to', to)
            console.log('point', point)
            current += point;
            window.scrollTo(0, current);
            clear(current, to)
        }, 5);
    }
};
