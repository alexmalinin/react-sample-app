export const run = element => {
    console.log(element);
    let timer;
    let current = window.pageYOffset;
    let to = element.getBoundingClientRect().top + element.getBoundingClientRect().height + current;
    return function() {
        timer = setInterval(function() {
            current += 5;
            console.log('current', current);
            console.log('to', to);
            window.scrollTo(0, current);
            if (current > to) {
                clearTimeout(timer)
            }
        }, 5);
    }
};
