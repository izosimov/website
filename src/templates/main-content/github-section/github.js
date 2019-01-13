(function() {
    const url = 'https://api.github.com';
    const options = {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        }
    };

    const artem = "izosimov";
    const user = artem;
    const reposAmount = 4;
    const spinner = document.getElementById('spinner');
    const githubSection = document.getElementById('github-section');
    let amountPages = null;
    let currentPageNum = 1;

    // Создание самого DOM-элемента - репозитория с информацией о нём
    const createRepoItem = data => {

        const repoItem = document.createElement('div');
        repoItem.classList.add('github__repository-item');
        repoItem.innerHTML = `
            <a href="${data.url}" target="_blank" class="github__repository-item-name">${data.name}</a>
            <div class="github__item-description">
                <div style="background-color: ${data.color}" class="github__language-color"></div>
                <p class="github__language">${data.lang}</p>
                ${data.stars ? '<p class="github__stars">' + data.stars + '</p>' : ''}
                ${data.forks ? '<p class="github__forks">' + data.forks + '</p>' : ''}
                <p class="github__last-update">Updated on ${getCustomDate(data.updated)}</p>
            </div>`
        return repoItem;
    };

    // Преобразование даты в необходимый формат
    const getCustomDate = date => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newDate = new Date(date);
        return `${newDate.getDate()} ${months[newDate.getMonth()]} ${1900 + newDate.getYear()}`
    };

    // Создание '...' в нумерации страниц (когда больше 3 страниц)
    const createEmptyPageElem = () => {
        const emptyPageElem = document.createElement('span');
        emptyPageElem.classList.add('pagination-list__item');
        emptyPageElem.innerHTML = '&hellip;';
        return emptyPageElem;
    }

    // Создание элемента, нумерующего страницу
    const createPageElem = num => {
        const pageElem = document.createElement('a');
        pageElem.classList.add('pagination-list__item');
        pageElem.innerHTML = `${num}`;
        pageElem.addEventListener('click', (e) => {
            const allPreviousReposItems = document.querySelectorAll('.github__repository-item');
            allPreviousReposItems.forEach(elem => elem.remove());
        })

        if (num == currentPageNum) {
            pageElem.classList.add('pagination-list__item_active');
        }

        pageElem.addEventListener('click', paginationClickHandler);
        return pageElem;
    }

   // Получение репозиториев на конкретной странице
        const getNewGithubPage = pageNum => {
            spinner.style.display = 'block';

            fetch(`${url}/users/${user}/repos?page=${pageNum}&per_page=${reposAmount}`, options)
                .then(response => {

                    if (!response.ok) {
                        throw {
                            status: response.status,
                            statusText: response.statusText
                        };
                    }

                    spinner.style.display = 'none';
                    return response.json();

                }).then(res => {
                    const pagination = document.querySelector('.pagination-list');
                    const arr = [];

                    res.forEach(elem => {
                        arr.push({
                            name: elem.name,
                            forks: elem.forks,
                            lang: elem.language,
                            updated: elem.updated_at,
                            stars: elem.stargazers_count,
                            color: colors[elem.language],
                            url: elem.html_url
                        })
                    })

                    arr.forEach((elem, i) => {
                        gitHubReposList.insertBefore(createRepoItem(elem), pagination);
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        };

    // Получение количества страниц в зависимости от общего числа репозиториев
    fetch(`${url}/users/${user}`, options).then(response => {
        return response.json();
    }).then(res => {
        amountPages = Math.ceil(res.public_repos / reposAmount);
        setPagination(currentPageNum, amountPages);
    });

   // Обработка клика по номеру страницы (удаление старого блока со страницами)
    const paginationClickHandler = event => {
        currentPageNum = event.target.innerHTML;
        const gitHubReposList = document.getElementById('gitHubReposList');
        const paginationBlock = document.querySelector('.pagination-list');
        const allPreviousPages = document.querySelectorAll('.pagination-list__item');

        const options = {
            top: githubSection.offsetTop,
            left: 0,
            behavior: 'smooth'
        }
        window.scroll(options);

        allPreviousPages.forEach(elem => elem.remove());
        paginationBlock.remove();

        setPagination(currentPageNum, amountPages);
    }

    // Создание нового блока со страницами
    const setPagination = (currentPageNum, amountPages) => {
        const gitHubReposList = document.getElementById('gitHubReposList');
        const paginationBlock = document.createElement('div');
        paginationBlock.classList.add('pagination-list');

        if (amountPages === 1) {
            paginationBlock.appendChild(createPageElem(1));
        } else if (amountPages < 4) {
            for (let i = 1; i <= amountPages; i++) {
                paginationBlock.appendChild(createPageElem(i));
            }
        } else {
            if (+currentPageNum-1 == 0) {
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+currentPageNum+1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum-1 == 1) {
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+currentPageNum+1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum-2 == 1) {
                paginationBlock.appendChild(createPageElem(1));
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+currentPageNum+1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum+1 == +amountPages) {
                paginationBlock.appendChild(createPageElem(1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum+2 == +amountPages) {
                paginationBlock.appendChild(createPageElem(1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+currentPageNum+1));
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum-1 != 1 && +currentPageNum+1 != +amountPages && +currentPageNum+2 != +amountPages && +currentPageNum != +amountPages) {
                paginationBlock.appendChild(createPageElem(1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
                paginationBlock.appendChild(createPageElem(+currentPageNum+1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+amountPages));
            } else if (+currentPageNum == +amountPages) {
                paginationBlock.appendChild(createPageElem(1));
                paginationBlock.appendChild(createEmptyPageElem());
                paginationBlock.appendChild(createPageElem(+currentPageNum-1));
                paginationBlock.appendChild(createPageElem(+currentPageNum));
            }
        }
        gitHubReposList.appendChild(paginationBlock);
        getNewGithubPage(currentPageNum);
    }
}());
