import Notiflix from 'notiflix';
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
    newsApi.feachImage().then(image => renderphotoCard(image).trim(),clearGallery()).catch(feachError);
refs.loadMore.classList.remove('visually-hidden');
}

function onLoadMore() {
newsApi.feachImage().then(image =>renderphotoCard(image))

}



function renderphotoCard(image) {
    const images = image.data.hits;
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


}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function feachError(error) {
     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

}

