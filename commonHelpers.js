import{a as y,i as p,S as B}from"./assets/vendor-09d7c26e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();y.defaults.baseURL="https://pixabay.com";const L=async(e,{pageCounter:a,per_page:s})=>{const t=await y("/api/",{params:{key:"20858658-55430aeeed6a37ac1f56d3c0c",q:e,page:a,per_page:s,image_type:"photo",orientation:"horizontal",safesearch:"true"}});if(t.status==="error")throw new Error(t.code);return t.data},h=document.querySelector(".load-more-button"),C=document.querySelector(".gallery-list");function d(e){p.settings({timeout:5e3,titleColor:"#fff",position:"topRight",messageColor:"#fff",icon:"",close:!1}),p.error({message:e,class:"error-notification",timeout:5e3,iconUrl:"./img/octagon.svg",titleColor:"#fff",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",progressBarColor:"#B51B1B",close:!0})}function b(e){return e.map(({webformatURL:a,largeImageURL:s,tags:i,likes:t,views:o,comments:l,downloads:v})=>`<li class="image-card">
              <a href="${s}" class="image-card-link"><img src="${a}" width="360" height="200" class="image-card-thumb" alt="${i}">
                <ul class="image-card-details-list">
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Likes</p>
                      <p class="image-card-details-text">${t}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Views</p>
                      <p class="image-card-details-text">${o}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Comments</p>
                      <p class="image-card-details-text">${l}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Downloads</p>
                      <p class="image-card-details-text">${v}</p>
                  </li>
                </ul>
              </a>
          </li>`).join("")}function M(e){e.length<=0&&d("Sorry, there are no images matching your search query. Please try again!"),C.insertAdjacentHTML("afterbegin",b(e))}function n(e,a){const s='<div class="loader"></div>';e&&!document.querySelector(".loader")?a.insertAdjacentHTML("afterend",s):document.querySelector(".loader").remove()}function m(e){e?h.classList.remove("is-hidden"):h.classList.add("is-hidden")}const r={searchForm:document.querySelector(".search-bar-form"),searchInput:document.querySelector("#search-bar"),searchButton:document.querySelector("button"),loadMoreButton:document.querySelector(".load-more-button"),galleryList:document.querySelector(".gallery-list")},S=new B(".image-card-link",{caption:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250,captionPosition:"bottom"});let u="";const c={pageCounter:1,per_page:15};let g=0;r.searchForm.addEventListener("submit",w);r.loadMoreButton.addEventListener("click",f);r.searchInput.addEventListener("change",q);function q(e){e.target.value.trim()!==""?r.searchButton.classList.remove("is-disable"):r.searchButton.classList.add("is-disable")}async function w(e){e.preventDefault();const a=e.currentTarget;if(c.pageCounter=1,r.galleryList.innerHTML="",u=e.target.elements.searchQuery.value.trim(),u===""){d("Search query can not be empty!");return}try{n(!0,r.searchForm);const{hits:s,totalHits:i}=await L(u,c);g=Math.ceil(i/c.per_page),c.pageCounter>=g?(m(!1),r.loadMoreButton.removeEventListener("click",f)):m(!0),M(s),n(!1,r.searchForm),S.refresh()}catch(s){d(s.message),n(!1,r.searchForm)}r.searchButton.classList.add("is-disable"),a.reset()}async function f(){n(!0,r.loadMoreButton);try{c.pageCounter+=1;const a=(await L(u,c)).hits;r.galleryList.insertAdjacentHTML("beforeend",b(a)),S.refresh(),c.pageCounter>=g&&(m(!1),r.loadMoreButton.removeEventListener("click",f),d("We're sorry, but you've reached the end of search results.")),P(),n(!1,r.loadMoreButton)}catch(e){d(e.message)}}function P(){const e=r.galleryList.querySelector(".image-card-details-list-item"),s=e.getBoundingClientRect().height*20;console.log(s),e&&window.scrollBy({top:s,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
