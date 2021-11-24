import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApi from './news-api-servise';

const axios = require('axios');

const refs = {
    form: document.querySelector('form'),
    gallery: document.querySelector('.gallery'),
    loadMore:document.querySelector('.load-more'),
}
const newsApi = new NewsApi()


refs.form.addEventListener("submit", searchForm);
refs.loadMore.addEventListener("click", onLoadMore)



 function searchForm(e) {
    e.preventDefault();


    newsApi.query = e.currentTarget.elements.searchQuery.value;

     newsApi.resetPage();

         newsApi.feachImage().then(renderphotoCard);
         clearGallery();
}


function onLoadMore() {
newsApi.feachImage().then(renderphotoCard)

}



function renderphotoCard(image) {

    const images = image.data.hits;

    Notiflix.Notify.info(`Hooray! We found ${image.data.totalHits} images.`);

    if (images.length === 0) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    if (newsApi.query === '') {
        Notiflix.Notify.failure(
            'The line must not be empty.'
        );
    } else {
           const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
    `<li class="photo-card">
    <a class="link_img" href="${largeImageURL}">
        <img class="img_card" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b> <b class="info-value">${likes}</b>
            </p>
            <p class="info-item">
                <b>Views</b> <b class="info-value">${views}</b>
            </p>
            <p class="info-item">
                <b>Comments</b> <b class="info-value">${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads</b> <b class="info-value">${downloads}</b>
            </p>
        </div>
    </a>
</li>`
    ).join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    }

    const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, captionPosition: 'bottom' });
     lightbox.refresh()

     const { height: cardHeight } = document
     .querySelector('.gallery')
     .firstElementChild.getBoundingClientRect();

     window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

    setTimeout(() => { refs.loadMore.classList.remove('visually-hidden'); }, 1000)

}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

// function feachError(error) {
//     if (newsApi) {
//         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//     }


// console.dir(error)
// }


