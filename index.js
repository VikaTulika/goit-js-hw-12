import{a as d,S as m,i as a}from"./assets/vendor-BzajH6aU.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function p(n){return n.map(({webformatURL:r,largeImageURL:o,tags:s,likes:e,views:t,comments:i,downloads:f})=>`
    <li class="item">
        <a href="${o}">
          <img src="${r}" alt="${s}"/>
          <div>
            <p>Likes ${e}</p>
            <p>Views ${t}</p>
            <p>Comments ${i}</p>
            <p>Downloads ${f}</p>
          </div>
        </a>
      </li>`).join("")}async function h(n){return await d(`https://pixabay.com/api/?key=47091591-3a0c1be132fb67c8f1fe23cd9&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`)}const c=document.querySelector(".search-form"),l=document.querySelector(".gallery"),u=document.querySelector(".loader"),g=new m(".gallery a");c.addEventListener("submit",y);function y(n){n.preventDefault();const r=c.elements.query.value.trim();if(r===""){a.warning({message:"enter something for search"});return}l.innerHTML="",u.classList.remove("hidden"),h(r).then(o=>{if(o.hits.length===0){a.warning({message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=p(o.hits);l.insertAdjacentHTML("beforeend",s),g.refresh()}).catch(o=>{console.log(o),a.error({message:"Oops, something went wrong!"})}).finally(()=>{u.classList.add("hidden"),c.reset()})}
//# sourceMappingURL=index.js.map
