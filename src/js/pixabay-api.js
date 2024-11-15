import axios from "axios";

export async function fetchFotos(query) {
    const BASEURL = "https://pixabay.com/api/";
    const API_KEY = "47091591-3a0c1be132fb67c8f1fe23cd9";
  return await axios(`${BASEURL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
    }