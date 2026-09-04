const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.nav-menu');
const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightbox-image');
const lightboxTitle=document.querySelector('#lightbox-title');

function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Buka menu');document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.setAttribute('aria-label',isOpen?'Tutup menu':'Buka menu');document.body.classList.toggle('menu-open',isOpen)});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu()});
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});

if('IntersectionObserver'in window){const observer=new IntersectionObserver((entries,currentObserver)=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');currentObserver.unobserve(entry.target)})},{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element))}else{document.querySelectorAll('.reveal').forEach(element=>element.classList.add('is-visible'))}

document.querySelectorAll('[data-lightbox]').forEach(button=>{button.addEventListener('click',()=>{lightboxImage.src=button.dataset.lightbox;lightboxImage.alt=button.dataset.title;lightboxTitle.textContent=button.dataset.title;lightbox.showModal();document.body.classList.add('modal-open')})});
function closeLightbox(){lightbox.close();document.body.classList.remove('modal-open')}
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',event=>{const bounds=lightbox.getBoundingClientRect();const outside=event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom;if(outside)closeLightbox()});
lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.querySelector('#year').textContent=new Date().getFullYear();
