const header=document.querySelector('.header');
const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Deschide meniul');menu.hidden=true;document.body.classList.remove('locked');document.querySelector('main').inert=false}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Închide meniul':'Deschide meniul');menu.hidden=!open;document.body.classList.toggle('locked',open)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>100),{passive:true});
const main=document.querySelector('main');

toggle.addEventListener('click',()=>{main.inert=!menu.hidden;if(!menu.hidden)menu.querySelector('a').focus()});
window.addEventListener('resize',()=>{if(window.innerWidth>700)closeMenu()});
document.addEventListener('keydown',e=>{if(menu.hidden||e.key!=='Tab')return;const items=[toggle,...menu.querySelectorAll('a')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
document.querySelectorAll('.service').forEach(item=>item.addEventListener('toggle',()=>{if(!item.open)return;document.querySelectorAll('.service').forEach(other=>{if(other!==item)other.open=false});const image=document.querySelector('#service-image');image.src=item.dataset.image;image.alt=item.dataset.alt;document.querySelector('#service-image-caption').textContent=item.dataset.caption}));
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const galleryItems=[...document.querySelectorAll('.gallery-item')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button))});galleryItems.forEach(item=>item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter);document.querySelector('.gallery-grid').classList.toggle('filtered',button.dataset.filter!=='all')}));
const photoButtons=[...document.querySelectorAll('.gallery-open')];
const lightbox=document.querySelector('#lightbox');
let photoIndex=0;
function showPhoto(index){photoIndex=(index+photoButtons.length)%photoButtons.length;const data=photoButtons[photoIndex].dataset;const img=document.querySelector('#lightbox-image');img.src=data.image;img.alt=photoButtons[photoIndex].querySelector('img').alt;document.querySelector('#lightbox-title').textContent=data.title;document.querySelector('#lightbox-credit').textContent=data.credit;document.querySelector('#photo-count').textContent=String(photoIndex+1).padStart(2,'0')+' / 03'}
photoButtons.forEach((b,i)=>b.addEventListener('click',()=>{showPhoto(i);lightbox.showModal();document.body.classList.add('locked')}));
document.querySelector('#photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.querySelector('#photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1)}});
const privacy=document.querySelector('#privacy-dialog');
document.querySelector('#privacy-open').addEventListener('click',()=>{privacy.showModal();document.body.classList.add('locked')});
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('locked'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}})});
const reviews=[{quote:'Profesionalism si rezultate garantate. Foarte multumita!',name:'Dia Dia',initial:'D'},{quote:'experienta a fost super placuta si relaxanta, recomand cu cel mai mare drag!',name:'Amalia Lenta',initial:'A'}];
let reviewIndex=0;
function showReview(index){reviewIndex=(index+reviews.length)%reviews.length;const review=reviews[reviewIndex];document.querySelector('#review-quote').textContent=review.quote;document.querySelector('#review-name').textContent=review.name;document.querySelector('#review-avatar').textContent=review.initial;document.querySelector('#review-count').textContent='0'+(reviewIndex+1)+' / 02'}
document.querySelector('#review-prev').addEventListener('click',()=>showReview(reviewIndex-1));
document.querySelector('#review-next').addEventListener('click',()=>showReview(reviewIndex+1));
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.studio-layout,.section-heading,.gallery-item,.reviews-layout,.faq-intro,.faq-list,.contact-layout').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});const activeObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))})},{rootMargin:'-20% 0px -55% 0px'});document.querySelectorAll('section[id]').forEach(el=>activeObserver.observe(el))}