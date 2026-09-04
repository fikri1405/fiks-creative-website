// Isi dengan nomor bisnis format internasional tanpa tanda plus, contoh 6281234567890.
const WHATSAPP_NUMBER='6285275088405';
const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>[...c.querySelectorAll(s)];
const track=(event,data={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,...data})};
const header=q('[data-header]');if(header)addEventListener('scroll',()=>header.classList.toggle('stuck',scrollY>100),{passive:true});
const menu=q('.menu'),nav=q('.header nav');if(menu&&nav){menu.onclick=()=>nav.classList.toggle('open');qa('a,button',nav).forEach(x=>x.onclick=()=>nav.classList.remove('open'))}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});qa('.reveal').forEach(x=>io.observe(x));qa('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
const processSection=q('.process-section');if(processSection)processSection.id='process';
const modal=q('#modal');let focusBefore;
function openForm(service=''){if(!modal){location.href='contact.html';return}focusBefore=document.activeElement;modal.setAttribute('aria-hidden','false');document.body.classList.add('lock');const s=q('[name=service]',modal);if(s&&service)s.value=service;q('input',modal)?.focus();track('open_form',{service})}
function closeForm(){if(!modal)return;modal.setAttribute('aria-hidden','true');document.body.classList.remove('lock');focusBefore?.focus()}
qa('[data-open]').forEach(x=>x.onclick=()=>openForm(x.dataset.service||''));qa('[data-close]').forEach(x=>x.onclick=closeForm);addEventListener('keydown',e=>{if(e.key==='Escape')closeForm()});
const waUrl=msg=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;qa('[data-wa]').forEach(x=>{x.href=waUrl('Halo FIKS Creative, saya ingin ngobrol tentang project.');x.target='_blank';x.onclick=()=>track('click_whatsapp',{source:'direct'})});
function message(d){return `Halo FIKS Creative, saya ${d.name} dari ${d.business}.\n\nSaya tertarik dengan ${d.service}.\n\nLokasi: ${d.location}\nBudget: ${d.budget}\nTarget: ${d.deadline||'Belum ditentukan'}\n\nKebutuhan:\n${d.description}`}
function save(d){const key='fiksCreativeLeads';let a=[];try{a=JSON.parse(localStorage.getItem(key)||'[]')}catch{}a.push({id:`FIKS-${Date.now()}`,timestamp:new Date().toISOString(),status:'new',...d});localStorage.setItem(key,JSON.stringify(a))}
function bind(form,success){if(!form)return;let started=false;form.oninput=()=>{if(!started){started=true;track('start_form')}};form.onsubmit=e=>{e.preventDefault();const err=q('.error',form)||document.createElement('p');if(!form.checkValidity()){err.textContent='Lengkapi semua kolom wajib dulu, ya.';form.reportValidity();return}const d=Object.fromEntries(new FormData(form));try{save(d)}catch{err.textContent='Data tidak bisa disimpan di browser ini.';return}track('submit_form',{service:d.service,budget:d.budget,location:d.location});if(success){form.hidden=true;success.hidden=false}window.open(waUrl(message(d)),'_blank','noopener')}}
bind(q('#inquiry'),q('.success'));bind(q('#contact-form'),q('.contact-success'));
