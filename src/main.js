import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery } from "./js/render-functions";
import { fetchFotos } from "./js/pixabay-api";

const form = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const loader = document.querySelector(".loader")
const loadMoreBtn = document.querySelector(".load-more-btn")
let page = 1;
let inputValue = "";

const lightBox = new SimpleLightbox('.gallery a');
form.addEventListener("submit", onSearchForm);
loadMoreBtn.addEventListener("click", onLoadMore);
function onSearchForm(event) {
    event.preventDefault();
    inputValue = form.elements.query.value.trim();
    if (inputValue === "") {
        iziToast.warning({message:"enter something for search"})
        return
    }

    page = 1;
    galleryList.innerHTML = "";
    loader.classList.remove("hidden");
    fetchFotos(inputValue, page).then(data => {
        console.log(data);
        if (data.hits.length === 0) {
            iziToast.warning({message:"Sorry, there are no images matching your search query. Please try again!"})
            return 
        }
        const markup = createGallery(data.hits)
        galleryList.insertAdjacentHTML("beforeend", markup)
        lightBox.refresh();
        if (data.totalHits > 15) {
            loadMoreBtn.classList.remove("hidden");
        } else {
            loadMoreBtn.classList.add("hidden");
        }
    }).catch(error => {
        console.log(error)
        iziToast.error({message:"Oops, something went wrong!"});
    }).finally(() => {
        loader.classList.add("hidden")
        form.reset()
    })
}

async function onLoadMore() {
    page += 1;
    loader.classList.remove("hidden");
    try {
        const data = await fetchFotos(inputValue, page);
        const markup = createGallery(data.hits);
        galleryList.insertAdjacentHTML("beforeend", markup);
        lightBox.refresh();
        scroll();
        if (Math.ceil(data.totalHits / 15) >page) {
            loadMoreBtn.classList.remove("hidden");
        } else {
            loadMoreBtn.classList.add("hidden");
            iziToast.info({message:"We're sorry, but you've reached the end of search results."})
        }
    } catch (error) {
        console.log(error)
        iziToast.error({message:"Oops, something went wrong!"});
    }
    finally {
        loader.classList.add("hidden");
    }
}
function scroll() {
    const cardHeigth = document.querySelector(".item").getBoundingClientRect().height
    window.scrollBy({
    top: cardHeigth * 2,
    behavior: "smooth",
});

}