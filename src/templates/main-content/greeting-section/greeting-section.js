(function() {
    const changingString = document.getElementById('changing-string');
    const arrow = document.getElementsByClassName('arrow')[0];
    const phrases = ['Junior frontend-разработчик', 'Junior Javascript-разработчик', 'HTML-верстальщик'];
    changingString.innerHTML = '';
    const worksSection = document.getElementById('works-section');

    const showPhrase = (phrases, index, speed=100, timeout=1000) => {
        return new Promise(function(resolve) {

            for (let i = 0; i < phrases[index].length; i++) {
                setTimeout(()=> {
                    changingString.innerHTML += phrases[index][i];

                    if (i === phrases[index].length-1) {
                        const currentPhrase = changingString.innerHTML;
                        resolve({phrases: phrases, index: index, speed: speed, timeout: timeout});
                    }

                }, i * speed);
            }

        }).then(res => {
            const timeout = res.timeout;
            return new Promise(function(resolve, reject) {

                setTimeout(() => {
                    const phrases = res.phrases;
                    const speed = res.speed;
                    let index = res.index;
                    let currentPhrase = phrases[index];
                    const resLength = currentPhrase.length;

                    for (let i = 0; i < resLength; i++) {
                        setTimeout(() => {
                            currentPhrase = currentPhrase.slice(0, -1);
                            changingString.innerHTML = currentPhrase;

                            if (i === resLength - 1) {
                                index = index === phrases.length - 1 ? 0 : index + 1
                                globalProm.then(res => {
                                    showPhrase(phrases, index, speed, timeout);
                                })
                                resolve();
                            }

                        }, i * speed)
                    }

                }, timeout)

            });
        })
    }

    const globalProm = showPhrase(phrases, 0, 100, 2000);

    const lol = () => {
        return new Promise(function(resolve, reject) {
            console.log("lol")
            resolve()
        });
    }

    arrow.addEventListener('click', (e) => {
        e.preventDefault();
        const worksSection = document.getElementById('works-section');

        window.scroll({
            top: worksSection.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    })
}());
