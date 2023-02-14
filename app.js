const wrapper = document.querySelector('.wrapper')
const inp = document.querySelector('.inp')
const formEl = document.querySelector("form")

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(`https://api.github.com/search/users?q=${inp.value}`
    );
    if (response.ok) {
        wrapper.innerHTML = '';
        const data = await response.json();
        data.items.forEach((el) => {
            wrapper.appendChild(createProfileEl(el))
        });
        inp.value = '';
    } else {
        alert('users not found')
    }
});


function createProfileEl(profileData) {
    const element = document.createElement('div')
    element.classList.add('profile')
    element.innerHTML = `
           <div class="profile">
               <img class="search-image" src=${profileData.avatar_url}>
           </div>
           <div class="search-info">
               <p class="search-text"><span>логин:${profileData.name || profileData.login}</span></p>
               <a href="${profileData.html_url}"
                target="_blank" class="search-link">Github page</a>
                 <a href="/detail#=${profileData.login}"
                  target="_blank" class="search-link">More info</a>
           </div>
`;
    return element;
}