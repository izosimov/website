(function() {
    const showMoreWorks = document.getElementsByClassName('recent-works__show-more')[0];
    const recentWorksRows = document.getElementsByClassName('recent-works__row');
    const worksSection = document.getElementById('works-section');

    showMoreWorks.dataset.isOpen = false;

    for (let i = 1; i < recentWorksRows.length; i++) {
        recentWorksRows[i].style.display = 'none';
    }

    showMoreWorks.addEventListener('click', (e) => {
        if (showMoreWorks.dataset.isOpen === 'false') {
            for (let i = 1; i < recentWorksRows.length; i++) {
                recentWorksRows[i].style.display = 'flex';
            }

            showMoreWorks.dataset.isOpen = true;
            showMoreWorks.innerHTML = 'Скрыть';

        } else {
            for (let i = 1; i < recentWorksRows.length; i++) {
                recentWorksRows[i].style.display = 'none';
            }

            window.scroll({
                top: worksSection.offsetTop,
                behavior: 'smooth'
            })

            showMoreWorks.dataset.isOpen = false;
            showMoreWorks.innerHTML = 'Смотреть ещё';
        }
    });
}());
