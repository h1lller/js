import 'regenerator-runtime/runtime'

const API_KEY = 'gbWOcrpqjX0v4Jravw_iWLsGcVaeu2sIkfP_MRJrGNM';
const imagesContainer = document.querySelector('.js-images')
const loader = document.querySelector('.js-loader')

let initialImagesCount = 2;
let initialPageLoad = true;
let fetchUrl = `https://api.unsplash.com/photos/random?count=${initialImagesCount}&client_id=${API_KEY}`;

let fetchedPhotos = [];
let readyToLoadMore = false;
let imagesLoadedCount = 0;
let totalImagesCount = 0;

// helper function for adding initial attributes to images
function setImageAttributes(element, obj) {
    for (const key in obj) {
        element.setAttribute(key, obj[key])
    }
}

function imagesLoading() {
    imagesLoadedCount++;
    if (imagesLoadedCount === totalImagesCount) {
        setTimeout(()=>{
            loader.hidden = true;
        }, 1000)
        readyToLoadMore = true;
        // check if page is loaded
        if (initialPageLoad) {
            initialPageLoad = false
            initialImagesCount = 10;
            fetchUrl = `https://api.unsplash.com/photos/random?count=${initialImagesCount}&client_id=${API_KEY}`;
        }
    }
}

function displayPhotos() {
    imagesLoadedCount = 0;
    totalImagesCount = fetchedPhotos.length;
    fetchedPhotos.forEach(photo => {
        const image = document.createElement('img');
        setImageAttributes(image, {
            'alt': photo.alt_description,
            'src': photo.urls.regular
        })
        imagesContainer.appendChild(image)
        image.addEventListener('load', ()=>{
            imagesLoading();
        })
    })

}

async function getPhotos() {
    try {
        const response = await fetch(fetchUrl);
        fetchedPhotos = await response.json();
        displayPhotos();
    } catch (e) {
        console.log(e)
    }
}

function checkScrolledArea() {
    let scrollArea = window.innerHeight + window.scrollY;
    if(scrollArea > (document.body.offsetHeight - 500) && readyToLoadMore) {
        readyToLoadMore = false;
        getPhotos();
    }
}

window.addEventListener('scroll', checkScrolledArea)

getPhotos();