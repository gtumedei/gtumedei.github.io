import{k as $,q as B,u as S,v as j,w as H,p as R,j as D,c as C,l as k,g as v,i as b,b as _,h as q,r as G,P as I,t as P}from"./web.ae25b5d1.js";function F(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}const M=e=>{let s,a=!0;const[x,m]=$(),[L,E]=$(),z=B(()=>e.children),o=e.name||"s";e=S({name:o,enterActiveClass:o+"-enter-active",enterClass:o+"-enter",enterToClass:o+"-enter-to",exitActiveClass:o+"-exit-active",exitClass:o+"-exit",exitToClass:o+"-exit-to"},e);const{onBeforeEnter:h,onEnter:f,onAfterEnter:g,onBeforeExit:A,onExit:u,onAfterExit:T}=e;function y(t,n){if(!a||e.appear){let i=function(d){t&&(!d||d.target===t)&&(t.removeEventListener("transitionend",i),t.removeEventListener("animationend",i),t.classList.remove(...c),t.classList.remove(...l),R(()=>{x()!==t&&m(t),L()===t&&E(void 0)}),g&&g(t),e.mode==="inout"&&w(t,n))};const r=e.enterClass.split(" "),c=e.enterActiveClass.split(" "),l=e.enterToClass.split(" ");h&&h(t),t.classList.add(...r),t.classList.add(...c),F(()=>{t.classList.remove(...r),t.classList.add(...l),f&&f(t,()=>i()),(!f||f.length<2)&&(t.addEventListener("transitionend",i),t.addEventListener("animationend",i))})}n&&!e.mode?E(t):m(t)}function w(t,n){const r=e.exitClass.split(" "),c=e.exitActiveClass.split(" "),l=e.exitToClass.split(" ");if(!n.parentNode)return i();A&&A(n),n.classList.add(...r),n.classList.add(...c),F(()=>{n.classList.remove(...r),n.classList.add(...l)}),u&&u(n,()=>i()),(!u||u.length<2)&&(n.addEventListener("transitionend",i),n.addEventListener("animationend",i));function i(d){(!d||d.target===n)&&(n.removeEventListener("transitionend",i),n.removeEventListener("animationend",i),n.classList.remove(...c),n.classList.remove(...l),x()===n&&m(void 0),T&&T(n),e.mode==="outin"&&y(t,n))}}return j(t=>{for(s=z();typeof s=="function";)s=s();return H(()=>(s&&s!==t&&(e.mode!=="outin"?y(s,t):a&&m(s)),t&&t!==s&&e.mode!=="inout"&&w(s,t),a=!1,s))}),[x,L]},N=P("<div></div>"),J=P('<div class="fixed inset-0 bg-black-38 z-30"></div>'),O=e=>C(I,{get children(){return[C(M,{enterClass:"opacity-0",exitToClass:"opacity-0",enterActiveClass:"transition-opacity",exitActiveClass:"transition-opacity",get children(){return k(()=>!!e.show(),!0)()&&v(J)}}),(()=>{const s=v(N);return s.$$click=()=>!e.persistent&&e.setShow(!1),b(s,C(M,{enterClass:"opacity-0 transform -translate-y-2",exitToClass:"opacity-0 transform -translate-y-2",enterActiveClass:"transition-all",exitActiveClass:"transition-all",get children(){return k(()=>!!e.show(),!0)()&&(()=>{const a=v(N);return b(a,()=>e.children),_(()=>q(a,`card container max-w-lg m-auto pointer-events-auto ${e.class} ${e.class?.includes("w-")?"":"w-min"}`)),a})()}})),_(()=>q(s,`fixed inset-0 p-3 max-h-screen overflow-y-auto flex z-40 ${e.show()?"":"pointer-events-none"}`)),G(),s})()]}});D(["click"]);export{O as M,M as T};
