import{k as g,j as p,c as e,g as r,i as a,r as d,u as f,F as b,t as n}from"./chunks/web.92b2a543.js";import{BoardContainer as $}from"./ui.3df4c920.js";import{M as x}from"./chunks/modal.7d92f783.js";import{t as h}from"./chunks/tooltip.aa2d8a72.js";import{M as _}from"./chunks/cog.60cdac04.js";import{M as v}from"./chunks/eyedropper-variant.9bf79744.js";import"./chunks/arrow-left-top.22a141d1.js";const S=n(`<div class="flex flex-col items-center text-center w-96"><div class="bg-primary-dark flex rounded-full p-6 mb-6"></div><h4 class="section-subheading mb-2">Color Guesser</h4><p class="text-sm mb-6">Are you nerd enough to guess a color based on its RGB HEX code? Let's find out!</p><div class="w-full grid sm:grid-cols-2 gap-3"><button class="btn accent py-3">Play</button><button class="btn outline py-3">Back to Games</button></div></div>`),C=n('<div class="w-full flex items-center p-2 rounded-xl border"><p class="ml-3 flex-grow">Color code: #FF0000</p><button class="btn icon"></button></div>'),w=n('<div class="h-full grid grid-cols-6 gap-3"></div>'),M=n('<div class="w-full h-full bg-accent rounded-lg"></div>'),[y,s]=g(!0),k=()=>e(x,{show:y,setShow:s,get children(){const l=r(S),o=l.firstChild,t=o.nextSibling,i=t.nextSibling,u=i.nextSibling,c=u.firstChild,m=c.nextSibling;return a(o,e(v,{class:"text-3xl text-accent"})),c.$$click=()=>s(!1),m.$$click=()=>s(!1),d(),l}}),G=()=>(()=>{const l=r(C),o=l.firstChild,t=o.nextSibling;return h(t,()=>[()=>"Game Settings","top"]),t.$$click=()=>s(i=>!i),a(t,e(_,{})),d(),l})(),E=l=>{const o=f({colorCount:36},l);return(()=>{const t=r(w);return a(t,e(b,{get each(){return new Array(o.colorCount)},children:()=>r(M)})),t})()},N=()=>[e($,{get children(){return e(E,{})}}),e(G,{}),e(k,{})];p(["click"]);export{N as default};
