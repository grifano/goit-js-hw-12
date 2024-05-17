import{a as h,S as w,i as f}from"./assets/vendor-09d7c26e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();h.defaults.baseURL="https://pixabay.com";const y=async(e,{pageCounter:r,per_page:o})=>{const t=await h("/api/",{params:{key:"20858658-55430aeeed6a37ac1f56d3c0c",q:e,page:r,per_page:o,image_type:"photo",orientation:"horizontal",safesearch:"true"}});if(t.status==="error")throw new Error(t.code);return t.data},d=document.querySelector("button"),g=document.querySelector(".load-more-button"),p=document.querySelector(".gallery-list");function b(){new w(".image-card-link",{caption:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250,captionPosition:"bottom"}).refresh()}function u(e){f.settings({timeout:5e3,titleColor:"#fff",position:"topRight",messageColor:"#fff",icon:"",close:!1}),f.error({message:e,class:"error-notification",timeout:5e3,iconUrl:"/img/octagon.svg",titleColor:"#fff",position:"topRight",backgroundColor:"#EF4040",messageColor:"#fff",progressBarColor:"#B51B1B",close:!0})}function L(e){return e.map(({webformatURL:r,largeImageURL:o,tags:i,likes:t,views:a,comments:l,downloads:q})=>`<li class="image-card">
              <a href="${o}" class="image-card-link"><img src="${r}" width="360" height="200" class="image-card-thumb" alt="${i}">
                <ul class="image-card-details-list">
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Likes</p>
                      <p class="image-card-details-text">${t}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Views</p>
                      <p class="image-card-details-text">${a}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Comments</p>
                      <p class="image-card-details-text">${l}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Downloads</p>
                      <p class="image-card-details-text">${q}</p>
                  </li>
                </ul>
              </a>
          </li>`).join("")}function C(e){e.length<=0&&u("Sorry, there are no images matching your search query. Please try again!"),p.innerHTML="",p.insertAdjacentHTML("afterbegin",L(e)),b()}function B(e){const r=e.target.value;if(r&&r.trim().length>0)return d.classList.remove("is-disable"),d.removeAttribute("disabled",""),r;d.classList.add("is-disable"),d.setAttribute("disabled","")}function n(e,r){const o='<div class="loader"></div>';e&&!document.querySelector(".loader")?r.insertAdjacentHTML("afterend",o):document.querySelector(".loader").remove()}function S(e){e?g.classList.remove("is-hidden"):g.classList.add("is-hidden")}const s={searchForm:document.querySelector(".search-bar-form"),searchInput:document.querySelector("#search-bar"),searchButton:document.querySelector("button"),loadMoreButton:document.querySelector(".load-more-button"),galleryList:document.querySelector(".gallery-list")};let m="";const c={pageCounter:1,per_page:15};let v=0;const x=()=>{s.galleryList.querySelector(".image-card-details-list-item")&&window.scrollTo({top:s.galleryList.offsetTop-20,left:0,behavior:"smooth"}),console.log(s.galleryList.offsetTop)};s.searchInput.addEventListener("input",e=>{m=B(e)});async function P(e){e.preventDefault();const r=e.currentTarget;c.pageCounter=1;try{n(!0,s.searchForm);const o=await y(m,c),i=o.hits,t=o.totalHits;v=Math.ceil(t/c.per_page),C(i),n(!1,s.searchForm),S(!0)}catch(o){u(o.message),n(!1,s.searchForm)}r.reset()}async function M(){n(!0,s.loadMoreButton);try{c.pageCounter+=1;const r=(await y(m,c)).hits;s.galleryList.insertAdjacentHTML("afterbegin",L(r)),b(),c.pageCounter>=v&&(S(!1),loadMoreButton.removeEventListener("click",M)),x(),n(!1,s.loadMoreButton)}catch(e){u(e.message)}}s.searchForm.addEventListener("submit",P);s.loadMoreButton.addEventListener("click",M);
//# sourceMappingURL=commonHelpers.js.map