const API_KEY = "1fcf720714c943319e9c08e80341952b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);

}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsimg = cardClone.querySelector(`#news-img`);
    const newstitle = cardClone.querySelector(`#news-title`);
    const newssource = cardClone.querySelector(`#news-source`);
    const newsdesc = cardClone.querySelector(`#news-desc`);

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/jakarta",
    });

    newssource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}
 function reload(){
    window.location.reload();
 }



let curselectedNav = null;
function navitem(id){
    fetchNews(id);
    const navItems = document.getElementById(id);
    curselectedNav?.classList.remove('active');
    curselectedNav = navItems;
    curselectedNav.classList.add('active');
}
const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');

searchbutton.addEventListener("click",() => {
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curselectedNav?.classList.remove('active');
})
 src="http://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate">

    function loadGoogleTranslate(){
        new google.translate.TranslateElement ("google_element");
    }