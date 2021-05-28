const username = new URLSearchParams(window.location.search).get('username')

dayjs.extend(window.dayjs_plugin_relativeTime)

fetch('https://api.github.com/graphql', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + config.GITHUB_TOKEN,
    },
    body: JSON.stringify({
        query: `
          {
            user(login: "${username}") {
              avatarUrl
              bio
              name
              url
              repositories(first: 20, orderBy: {direction: DESC, field: UPDATED_AT}, privacy: PUBLIC) {
                totalCount
                nodes {
                  forkCount
                  description
                  languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                    nodes {
                      color
                      name
                    }
                  }
                  name
                  updatedAt
                  url
                  stargazerCount
                  licenseInfo {
                    name
                  }
                }
              }
            }
          }
        `
    })
})
.then(res => res.json())
.then(data => {
    let user = data.data.user
    document.title = user.name ? `${username} (${user.name}) / Repositories` : `${username} / Repositories`
    document.querySelector('.header__loading__bar').style.display = 'none'
    document.querySelector('.body__main').style.display = 'block'
    document.querySelector('.footer__ctn').style.display = 'flex'
    document.querySelector('.body__profile__link').href = user.avatarUrl
    document.querySelector('#banner__profile__link').href = user.url
    document.querySelector('#nav__profile__1').href = user.url
    document.querySelector('#nav__profile__2').href = `${user.url}?tab=repositories`
    document.querySelector('#nav__profile__3').href = `${user.url}?tab=projects`
    document.querySelector('#nav__profile__4').href = `${user.url}?tab=stars`
    document.querySelector('#nav__toggle__1').href = user.url
    document.querySelector('#nav__toggle__3').href = `${user.url}?tab=projects`
    document.querySelector('#nav__toggle__4').href = `${user.url}?tab=packages`
    document.querySelector('#profile__image__large').src = user.avatarUrl
    document.querySelector('#profile__image__large__sc').src = user.avatarUrl
    document.querySelector('#profile__image__small').src = user.avatarUrl
    document.querySelector('#nav__profile__img').src = user.avatarUrl
    document.querySelector('.header__sm__img').src = user.avatarUrl
    document.querySelector('.profile__fullname__sm').innerHTML = user.name 
    document.querySelector('.profile__fullname').innerHTML = user.name
    document.querySelector('#banner__profile__name').innerHTML = username
    document.querySelector('.profile__username').innerHTML = username
    document.querySelector('#profile__sm__username').innerHTML = username
    document.querySelector('.profile__username__sm').innerHTML = username
    document.querySelector('.profile__username__sm').innerHTML = username
    document.querySelector('.body__profile__bio').innerHTML = user.bio
    document.querySelector('.body__profile__bio__sm').innerHTML = user.bio
    document.querySelector('.body__tab__repo__count').innerHTML = user.repositories.totalCount
    document.querySelector('#body__repo__count').innerHTML = user.repositories.totalCount
    document.querySelector('#body__repo__count').title = `${user.repositories.totalCount}`

    if(user.repositories.nodes.length < 1) {
      document.querySelector('.body__public__repo__count').style.display = 'none'
      document.querySelector('.body__repositories__info__ctn').style.display = 'block'
      document.querySelector('.body__repositories__info').innerHTML = `${username} doesn't have any repository yet`
    }

    user.repositories.nodes.map((repo) => {
        const repository =
        `
        <div class="repository">
            <div class="repository__left">
                <h3 class="repository__title">
                    <a href=${repo.url}>
                        ${repo.name}
                    </a>
                </h3>
                <p class="repository__summary" style="display: ${repo.description !== null ? '' : 'none'}">
                    ${repo.description}
                </p>
                <div class="repository__info">
                    <span style="display: ${repo.languages.nodes.length > 0 ? '' : 'none'}">
                        <span style="background-color: ${repo.languages.nodes[0]?.color};" class="repo__language__color repository__icon"></span>
                        <span>${repo.languages.nodes[0]?.name}</span>
                    </span>
                    <span class="cursor__pointer" style="display: ${repo.stargazerCount > 0 ? '' : 'none'}">
                      <a href="${user.url}/${repo.name}/stargazers">
                        <svg class="repository__icon" viewBox="0 0 16 16" width="16" height="16">
                            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>
                        ${repo.stargazerCount}
                      </a>
                    </span>
                    <span class="cursor__pointer" style="display: ${repo.forkCount > 0 ? '' : 'none'}">
                      <a href="${user.url}/${repo.name}/network/members">
                        <svg class="repository__icon" viewBox="0 0 16 16" width="16" height="16">
                            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                            </path>
                        </svg>
                        ${repo.forkCount}
                      </a>
                    </span>
                    <span  style="display: ${repo.licenseInfo !== null ? '' : 'none'}">
                        <svg class="repository__icon" viewBox="0 0 16 16" width="16" height="16">
                            <path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z">
                            </path>
                        </svg>
                        ${repo.licenseInfo !== null ? repo.licenseInfo.name : ''}
                    </span>
                    <span>Updated <time class="repo__update__time">${dayjs(repo.updatedAt).fromNow()}</time></span>
                </div>
            </div>
            <div class="repository__right">
                <button title="Star ${username}/${repo.name}" class="repository__star__btn" 
                  onclick="this.querySelector('.repo__unstar__icon').classList.toggle('repo__btn__toggle');this.querySelector('.repo__unstar__word').classList.toggle('repo__btn__toggle');this.querySelector('.repo__star__word').classList.toggle('repo__btn__toggle');">
                    <svg class="repo__btn__icon" viewBox="0 0 16 16" width="16" height="16">
                      <path class="repo__star__icon" fill-rule="nonzero" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                      </path>
                      <path class="repo__unstar__icon repo__btn__toggle" fill-rule="nonzero" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z">
                      </path>
                    </svg>
                    <span class="repo__star__word">Star</span>
                    <span class="repo__unstar__word repo__btn__toggle">Unstar</span>
                </button>
            </div>
        </div>
        `
        return document.querySelector('.repositories__ctn').innerHTML += repository
    })
})
.catch(err => {
  document.querySelector('.header__loading__bar').style.display = 'none'
  document.querySelector('.footer__ctn').style.display = 'flex'
  document.querySelector('.body__error__msg__ctn').style.display = 'block'
  console.log(err)
});
