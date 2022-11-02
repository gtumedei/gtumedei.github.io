import{g as s,s as f,r as $,t as i,i as r,c as o,F as x,a as b,l as _,b as y,d as C,h as M}from"./chunks/web.92b2a543.js";import{c as w,s as g}from"./chunks/motion.f435f640.js";import{M as H}from"./chunks/eyedropper-variant.9bf79744.js";const V=i('<svg class="icon" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path fill="currentColor" d="m21.47 4.35l-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79c.01-.26-.04-.55-.13-.81L13 3.5a1.954 1.954 0 0 0-1.81-1.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34"></path></svg>'),k=(e={})=>(()=>{const a=s(V);return f(a,e,!0,!0),$(),a})(),z=i('<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3H2v18h20V3H4zm16 2v14H4V5h16zm-6 4h-2v2h-2v2H8v2H6v2h2v-2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2V9zM8 7H6v2h2V7z"></path></svg>'),E=i(`<a><div class="
        w-full flex justify-center items-center bg-primary-dark group-hover:bg-accent-10
        text-3xl text-accent rounded-lg px-6 py-18 transition-colors
      "></div><div class="w-full p-2"><h2 class="section-subheading mb-1"></h2><p class="text-sm font-mono"></p></div><!#><!/></a>`),S=i('<span class="absolute top-1 left-1 badge">Coming soon(ish)</span>'),T=i('<h1 class="motion-1 section-heading mb-2">Games</h1>'),G=i('<p class="motion-1 font-mono mb-12">This page is a work in progress. Things are going to be added soon(ish).</p>'),L=i('<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"></div>'),N=[{name:"Color Guesser",description:"Can you guess a color based on its code?",icon:()=>o(H,{}),href:"/games/color-guesser",available:!1},{name:"Memory",description:"Just a minimalist memory game.",icon:()=>o(k,{}),href:"/games/memory",available:!1},{name:"Px Art",description:"Make pixel art images. Is this even a game?",icon:()=>s(z),href:"/games/px-art",available:!1}],A=e=>(()=>{const a=s(E),n=a.firstChild,l=n.nextSibling,c=l.firstChild,h=c.nextSibling,v=l.nextSibling,[u,p]=b(v.nextSibling);return r(n,()=>e.game.icon),r(c,()=>e.game.name),r(h,()=>e.game.description),r(a,(()=>{const t=_(()=>!e.game.available,!0);return()=>t()&&s(S)})(),u,p),y(t=>{const m=e.game.href,d=`
      group relative flex flex-col gap-2 items-center rounded-xl p-2 transition-colors
      border hover:border-accent ${e.class??""}
    `;return m!==t._v$&&C(a,"href",t._v$=m),d!==t._v$2&&M(a,t._v$2=d),t},{_v$:void 0,_v$2:void 0}),a})(),P=()=>(w([[".motion-1",{opacity:1,x:[-10,0]},{duration:.4,delay:g(.15)}],[".motion-2",{opacity:1,scale:[.95,1],y:[10,0]},{duration:.4,delay:g(.15,{start:.2}),at:"<"}]]),[s(T),s(G),(()=>{const e=s(L);return r(e,o(x,{each:N,children:a=>o(A,{game:a,class:"motion-2"})})),e})()]);export{P as default};