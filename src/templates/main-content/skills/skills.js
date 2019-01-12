(function() {
    const showMoreSkills = document.getElementsByClassName('skills__show-more')[0];
    const allSkills = document.getElementsByClassName('skills__skills-item');
    const skillsItemTitles = document.getElementsByClassName('skills__item-title');
    const skillsSection = document.getElementById('skills-section');

    const onMoreSkillsClickHandler = (btn, skills, section) => {
        if (btn.dataset.isOpen === 'false') {
            for (let i = skills.length-1; i >= 4; i--) {
                skills[i].style.display = 'flex';
            }

            btn.dataset.isOpen = true;
            btn.innerHTML = 'Скрыть';

        } else {
            for (let i = skills.length-1; i >= 4; i--) {
                skills[i].style.display = 'none';
            }

            btn.dataset.isOpen = false;
            btn.innerHTML = 'Смотреть ещё';

            window.scroll({
                top: section.offsetTop,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const controlResize = () => {
        onMoreSkillsClickHandler(showMoreSkills, allSkills, skillsSection);
    }

    let heightBeforeResize = window.screen.height;
    let weightBeforeResize = document.body.clientWidth;
    const checkWindowSize = () => {
        if (Math.abs(window.screen.height - heightBeforeResize) > 80 || Math.abs(document.body.clientWidth - weightBeforeResize) > 10) {
            heightBeforeResize = window.screen.height;
            weightBeforeResize = document.body.clientWidth;

            if (document.body.clientWidth <= 767) {
                showMoreSkills.dataset.isOpen = false;
                showMoreSkills.innerHTML = 'Смотреть ещё';

                for (let i = allSkills.length-1; i >= 4; i--) {
                    allSkills[i].style.display = 'none';
                }

            } else {
                for (let i = allSkills.length-1; i >= 4; i--) {
                    allSkills[i].style.display = 'flex';
                }
                showMoreSkills.dataset.isOpen = true;
                showMoreSkills.innerHTML = 'Скрыть';
            }
        }
    }

    if (document.body.clientWidth <= 767) {
        showMoreSkills.dataset.isOpen = false;
        showMoreSkills.innerHTML = 'Смотреть ещё';

        for (let i = allSkills.length-1; i >= 4; i--) {
            allSkills[i].style.display = 'none';
        }

    } else {
        showMoreSkills.dataset.isOpen = true;
    }

    showMoreSkills.addEventListener('click', controlResize);

    // В зависимости от размера окна бразуера, скрываем или разворачиваем skill's items
    window.addEventListener('resize', checkWindowSize);

    // нумерация навыков при мобильном экране
    for (var i = 0; i < skillsItemTitles.length; i++) {
        skillsItemTitles[i].dataset.skillsNum = `0${i+1}`
    }
}());
