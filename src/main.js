import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery } from "./js/render-functions";
import { fetchFotos } from "./js/pixabay-api";

const form = document.querySelector(".search-form");
const galleryList = document.querySelector(".gallery");
const loader = document.querySelector(".loader")

const lightBox = new SimpleLightbox('.gallery a');
form.addEventListener("submit", onSearchForm);
function onSearchForm(event) {
    event.preventDefault();
    const inputValue = form.elements.query.value.trim();
    if (inputValue === "") {
        iziToast.warning({message:"enter something for search"})
        return
    }
    galleryList.innerHTML = "";
    loader.classList.remove("hidden");
    fetchFotos(inputValue).then(data => {
        if (data.hits.length === 0) {
            iziToast.warning({message:"Sorry, there are no images matching your search query. Please try again!"})
            return 
        }
        const markup = createGallery(data.hits)
        galleryList.insertAdjacentHTML("beforeend", markup)
        lightBox.refresh();
    }).catch(error => {
        console.log(error)
        iziToast.error({message:"Oops, something went wrong!"});
    }).finally(() => {
        loader.classList.add("hidden")
        form.reset()
    })
}