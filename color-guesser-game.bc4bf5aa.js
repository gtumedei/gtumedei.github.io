import{g as l,s as h,r as i,t as s,k as _,j as C,c as n,i as c,b as M,a as S,l as y,u as k,F as L}from"./chunks/web.92b2a543.js";import{BoardContainer as E}from"./ui.3df4c920.js";import{M as B}from"./chunks/modal.296329b7.js";import{t as G}from"./chunks/tooltip.aa2d8a72.js";import{M as D}from"./chunks/cog.60cdac04.js";import{M as A}from"./chunks/eyedropper-variant.9bf79744.js";import"./chunks/arrow-left-top.22a141d1.js";const H=s('<svg class="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z"></path></svg>'),F=(r={})=>(()=>{const e=l(H);return h(e,r,!0,!0),i(),e})(),R=s('<svg class="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"></path></svg>'),N=(r={})=>(()=>{const e=l(R);return h(e,r,!0,!0),i(),e})(),P=s('<svg class="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path fill="currentColor" d="M12 16a3 3 0 0 1-3-3c0-1.12.61-2.1 1.5-2.61l9.71-5.62l-5.53 9.58c-.5.98-1.51 1.65-2.68 1.65m0-13c1.81 0 3.5.5 4.97 1.32l-2.1 1.21C14 5.19 13 5 12 5a8 8 0 0 0-8 8c0 2.21.89 4.21 2.34 5.65h.01c.39.39.39 1.02 0 1.41c-.39.39-1.03.39-1.42.01A9.969 9.969 0 0 1 2 13A10 10 0 0 1 12 3m10 10c0 2.76-1.12 5.26-2.93 7.07c-.39.38-1.02.38-1.41-.01a.996.996 0 0 1 0-1.41A7.95 7.95 0 0 0 20 13c0-1-.19-2-.54-2.9L20.67 8C21.5 9.5 22 11.18 22 13Z"></path></svg>'),Z=(r={})=>(()=>{const e=l(P);return h(e,r,!0,!0),i(),e})(),I=s('<div class="bg-primary-dark flex rounded-full p-6 mb-6"></div>'),j=s('<h4 class="section-subheading mb-2">Color Guesser</h4>'),T=s(`<p class="text-sm mb-8">Are you nerd enough to guess a color based on its RGB HEX code? Let's find out!</p>`),V=s('<div class="w-full flex items-center gap-3 p-2 border rounded-xl mb-8"><div class="flex bg-primary-dark text-accent rounded-lg p-3"></div><h5 class="text-left font-bold tracking-wider flex-grow ml-2">Difficulty</h5><div class="flex gap-2 items-center"><button class="btn icon"></button><span class="text-sm w-16"></span><button class="btn icon"></button></div></div>'),X=s('<div class="w-full grid sm:grid-cols-2 gap-3"><!#><!/><a href="/games" class="btn outline py-3">Back to Games</a></div>'),q=s('<button class="btn accent py-3">Play</button>'),z=s('<button class="btn accent py-3">Restart</button>'),J=s('<div class="w-full flex items-center p-2 rounded-xl border"><p class="ml-3 flex-grow">Color code: #FF0000</p><button class="btn icon"></button></div>'),K=s('<div class="h-full grid grid-cols-6 gap-3"></div>'),O=s('<div class="w-full h-full bg-accent rounded-lg"></div>'),[Q,g]=_(!0),$=[{label:"Easy",grid:2},{label:"Normal",grid:3},{label:"Hard",grid:4},{label:"Harder",grid:5},{label:"Hardest",grid:6}],[b,w]=_(0),[U,it]=_("IDLE"),W=()=>{const r=()=>w(t=>Math.min(t+1,$.length-1)),e=()=>w(t=>Math.max(t-1,0));return n(B,{class:"flex flex-col items-center text-center w-full",show:Q,setShow:g,get children(){return[(()=>{const t=l(I);return c(t,n(A,{class:"text-3xl text-accent"})),t})(),l(j),l(T),(()=>{const t=l(V),a=t.firstChild,m=a.nextSibling,f=m.nextSibling,d=f.firstChild,o=d.nextSibling,p=o.nextSibling;return c(a,n(Z,{})),d.$$click=e,c(d,n(F,{})),c(o,()=>$[b()].label),p.$$click=r,c(p,n(N,{})),M(u=>{const v=b()==0,x=b()==$.length-1;return v!==u._v$&&(d.disabled=u._v$=v),x!==u._v$2&&(p.disabled=u._v$2=x),u},{_v$:void 0,_v$2:void 0}),i(),t})(),(()=>{const t=l(X),a=t.firstChild,[m,f]=S(a.nextSibling);return m.nextSibling,c(t,(()=>{const d=y(()=>U()=="IDLE",!0);return()=>d()?(()=>{const o=l(q);return o.$$click=()=>g(!1),i(),o})():(()=>{const o=l(z);return o.$$click=()=>g(!1),i(),o})()})(),m,f),t})()]}})},Y=()=>(()=>{const r=l(J),e=r.firstChild,t=e.nextSibling;return G(t,()=>[()=>"Game Settings","top"]),t.$$click=()=>g(a=>!a),c(t,n(D,{})),i(),r})(),tt=r=>{const e=k({colorCount:36},r);return(()=>{const t=l(K);return c(t,n(L,{get each(){return new Array(e.colorCount)},children:()=>l(O)})),t})()},at=()=>[n(E,{get children(){return n(tt,{})}}),n(Y,{}),n(W,{})];C(["click"]);export{at as default};
