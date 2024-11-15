export function createGallery(images) {
    return images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
    <li class="item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}"/>
          <div>
            <p>Likes ${likes}</p>
            <p>Views ${views}</p>
            <p>Comments ${comments}</p>
            <p>Downloads ${downloads}</p>
          </div>
        </a>
      </li>`).join("")
}