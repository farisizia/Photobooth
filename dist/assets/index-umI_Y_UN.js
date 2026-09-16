const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-CBUgMvkx.js","assets/vendor-react-DrlxC-KN.js","assets/vendor-icons-Cymb5sZA.js","assets/TemplateSelection-DEE0tHps.js","assets/storage-BoeuUYM5.js","assets/Photobooth-7Bf5mXtb.js"])))=>i.map(i=>d[i]);
import{a as te,b as re,g as oe,r as p,B as se,R as ae,c as P,N as ie,u as ne,d as le}from"./vendor-react-DrlxC-KN.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();var L={exports:{}},j={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var H;function ce(){if(H)return j;H=1;var e=te(),t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function o(n,l,d){var c,u={},m=null,f=null;d!==void 0&&(m=""+d),l.key!==void 0&&(m=""+l.key),l.ref!==void 0&&(f=l.ref);for(c in l)i.call(l,c)&&!a.hasOwnProperty(c)&&(u[c]=l[c]);if(n&&n.defaultProps)for(c in l=n.defaultProps,l)u[c]===void 0&&(u[c]=l[c]);return{$$typeof:t,type:n,key:m,ref:f,props:u,_owner:s.current}}return j.Fragment=r,j.jsx=o,j.jsxs=o,j}var B;function de(){return B||(B=1,L.exports=ce()),L.exports}var h=de(),O={},U;function ue(){if(U)return O;U=1;var e=re();return O.createRoot=e.createRoot,O.hydrateRoot=e.hydrateRoot,O}var pe=ue();const me=oe(pe),fe="modulepreload",he=function(e){return"/"+e},J={},F=function(t,r,i){let s=Promise.resolve();if(r&&r.length>0){let o=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),l=n?.nonce||n?.getAttribute("nonce");s=o(r.map(d=>{if(d=he(d),d in J)return;J[d]=!0;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":fe,c||(m.as="script"),m.crossOrigin="",m.href=d,l&&m.setAttribute("nonce",l),document.head.appendChild(m),c)return new Promise((f,_)=>{m.addEventListener("load",f),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return s.then(o=>{for(const n of o||[])n.status==="rejected"&&a(n.reason);return t().catch(a)})};let ge={data:""},ye=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||ge},be=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ve=/\/\*[^]*?\*\/|  +/g,V=/\n+/g,w=(e,t)=>{let r="",i="",s="";for(let a in e){let o=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+o+";":i+=a[1]=="f"?w(o,a):a+"{"+w(o,a[1]=="k"?"":t)+"}":typeof o=="object"?i+=w(o,t?t.replace(/([^,])+/g,n=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):a):o!=null&&(a=a[1]=="-"?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=w.p?w.p(a,o):a+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+i},x={},W=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+W(e[r]);return t}return e},xe=(e,t,r,i,s)=>{let a=W(e),o=x[a]||(x[a]=(l=>{let d=0,c=11;for(;d<l.length;)c=101*c+l.charCodeAt(d++)>>>0;return"go"+c})(a));if(!x[o]){let l=a!==e?e:(d=>{let c,u,m=[{}];for(;c=be.exec(d.replace(ve,""));)c[4]?m.shift():c[3]?(u=c[3].replace(V," ").trim(),m.unshift(m[0][u]=m[0][u]||{})):m[0][c[1]]=c[2].replace(V," ").trim();return m[0]})(e);x[o]=w(s?{["@keyframes "+o]:l}:l,r?"":"."+o)}let n=r&&x.g;return r&&(x.g=x[o]),((l,d,c,u)=>{u?d.data=d.data.replace(u,l):d.data.indexOf(l)===-1&&(d.data=c?l+d.data:d.data+l)})(x[o],t,i,n),o},we=(e,t,r)=>e.reduce((i,s,a)=>{let o=t[a];if(o&&o.call){let n=o(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;o=l?"."+l:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return i+s+(o??"")},"");function C(e){let t=this||{},r=e.call?e(t.p):e;return xe(r.unshift?r.raw?we(r,[].slice.call(arguments,1),t.p):r.reduce((i,s)=>Object.assign(i,s&&s.call?s(t.p):s),{}):r,ye(t.target),t.g,t.o,t.k)}let Y,A,I;C.bind({g:1});let v=C.bind({k:1});function Ee(e,t,r,i){w.p=t,Y=e,A=r,I=i}function E(e,t){let r=this||{};return function(){let i=arguments;function s(a,o){let n=Object.assign({},a),l=n.className||s.className;r.p=Object.assign({theme:A&&A()},n),r.o=/go\d/.test(l),n.className=C.apply(r,i)+(l?" "+l:"");let d=e;return e[0]&&(d=n.as||e,delete n.as),I&&d[0]&&I(n),Y(d,n)}return s}}var _e=e=>typeof e=="function",$=(e,t)=>_e(e)?e(t):e,je=(()=>{let e=0;return()=>(++e).toString()})(),K=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Re=20,z="default",Z=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(o=>o.id===t.toast.id?{...o,...t.toast}:o)};case 2:let{toast:i}=t;return Z(e,{type:e.toasts.find(o=>o.id===i.id)?1:0,toast:i});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(o=>o.id===s||s===void 0?{...o,dismissed:!0,visible:!1}:o)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(o=>o.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(o=>({...o,pauseDuration:o.pauseDuration+a}))}}},N=[],Q={toasts:[],pausedAt:void 0,settings:{toastLimit:Re}},b={},G=(e,t=z)=>{b[t]=Z(b[t]||Q,e),N.forEach(([r,i])=>{r===t&&i(b[t])})},X=e=>Object.keys(b).forEach(t=>G(e,t)),Pe=e=>Object.keys(b).find(t=>b[t].toasts.some(r=>r.id===e)),S=(e=z)=>t=>{G(t,e)},Oe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ke=(e={},t=z)=>{let[r,i]=p.useState(b[t]||Q),s=p.useRef(b[t]);p.useEffect(()=>(s.current!==b[t]&&i(b[t]),N.push([t,i]),()=>{let o=N.findIndex(([n])=>n===t);o>-1&&N.splice(o,1)}),[t]);let a=r.toasts.map(o=>{var n,l,d;return{...e,...e[o.type],...o,removeDelay:o.removeDelay||((n=e[o.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:o.duration||((l=e[o.type])==null?void 0:l.duration)||e?.duration||Oe[o.type],style:{...e.style,...(d=e[o.type])==null?void 0:d.style,...o.style}}});return{...r,toasts:a}},Ne=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||je()}),R=e=>(t,r)=>{let i=Ne(t,e,r);return S(i.toasterId||Pe(i.id))({type:2,toast:i}),i.id},g=(e,t)=>R("blank")(e,t);g.error=R("error");g.success=R("success");g.loading=R("loading");g.custom=R("custom");g.dismiss=(e,t)=>{let r={type:3,toastId:e};t?S(t)(r):X(r)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let r={type:4,toastId:e};t?S(t)(r):X(r)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,r)=>{let i=g.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let a=t.success?$(t.success,s):void 0;return a?g.success(a,{id:i,...r,...r?.success}):g.dismiss(i),s}).catch(s=>{let a=t.error?$(t.error,s):void 0;a?g.error(a,{id:i,...r,...r?.error}):g.dismiss(i)}),e};var $e=1e3,Ce=(e,t="default")=>{let{toasts:r,pausedAt:i}=ke(e,t),s=p.useRef(new Map).current,a=p.useCallback((u,m=$e)=>{if(s.has(u))return;let f=setTimeout(()=>{s.delete(u),o({type:4,toastId:u})},m);s.set(u,f)},[]);p.useEffect(()=>{if(i)return;let u=Date.now(),m=r.map(f=>{if(f.duration===1/0)return;let _=(f.duration||0)+f.pauseDuration-(u-f.createdAt);if(_<0){f.visible&&g.dismiss(f.id);return}return setTimeout(()=>g.dismiss(f.id,t),_)});return()=>{m.forEach(f=>f&&clearTimeout(f))}},[r,i,t]);let o=p.useCallback(S(t),[t]),n=p.useCallback(()=>{o({type:5,time:Date.now()})},[o]),l=p.useCallback((u,m)=>{o({type:1,toast:{id:u,height:m}})},[o]),d=p.useCallback(()=>{i&&o({type:6,time:Date.now()})},[i,o]),c=p.useCallback((u,m)=>{let{reverseOrder:f=!1,gutter:_=8,defaultPosition:q}=m||{},D=r.filter(y=>(y.position||q)===(u.position||q)&&y.height),ee=D.findIndex(y=>y.id===u.id),M=D.filter((y,T)=>T<ee&&y.visible).length;return D.filter(y=>y.visible).slice(...f?[M+1]:[0,M]).reduce((y,T)=>y+(T.height||0)+_,0)},[r]);return p.useEffect(()=>{r.forEach(u=>{if(u.dismissed)a(u.id,u.removeDelay);else{let m=s.get(u.id);m&&(clearTimeout(m),s.delete(u.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:l,startPause:n,endPause:d,calculateOffset:c}}},Se=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,De=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Te=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Le=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Se} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${De} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Te} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ae=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ie=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ae} 1s linear infinite;
`,Fe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ze=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,qe=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Fe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ze} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Me=E("div")`
  position: absolute;
`,He=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Be=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ue=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Be} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Je=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return t!==void 0?typeof t=="string"?p.createElement(Ue,null,t):t:r==="blank"?null:p.createElement(He,null,p.createElement(Ie,{...i}),r!=="loading"&&p.createElement(Me,null,r==="error"?p.createElement(Le,{...i}):p.createElement(qe,{...i})))},Ve=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,We=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ye="0%{opacity:0;} 100%{opacity:1;}",Ke="0%{opacity:1;} 100%{opacity:0;}",Ze=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Qe=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ge=(e,t)=>{let r=e.includes("top")?1:-1,[i,s]=K()?[Ye,Ke]:[Ve(r),We(r)];return{animation:t?`${v(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Xe=p.memo(({toast:e,position:t,style:r,children:i})=>{let s=e.height?Ge(e.position||t||"top-center",e.visible):{opacity:0},a=p.createElement(Je,{toast:e}),o=p.createElement(Qe,{...e.ariaProps},$(e.message,e));return p.createElement(Ze,{className:e.className,style:{...s,...r,...e.style}},typeof i=="function"?i({icon:a,message:o}):p.createElement(p.Fragment,null,a,o))});Ee(p.createElement);var et=({id:e,className:t,style:r,onHeightUpdate:i,children:s})=>{let a=p.useCallback(o=>{if(o){let n=()=>{let l=o.getBoundingClientRect().height;i(e,l)};n(),new MutationObserver(n).observe(o,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return p.createElement("div",{ref:a,className:t,style:r},s)},tt=(e,t)=>{let r=e.includes("top"),i=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:K()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...i,...s}},rt=C`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,ot=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:s,toasterId:a,containerStyle:o,containerClassName:n})=>{let{toasts:l,handlers:d}=Ce(r,a);return p.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...o},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map(c=>{let u=c.position||t,m=d.calculateOffset(c,{reverseOrder:e,gutter:i,defaultPosition:t}),f=tt(u,m);return p.createElement(et,{id:c.id,key:c.id,onHeightUpdate:d.updateHeight,className:c.visible?rt:"",style:f},c.type==="custom"?$(c.message,c):s?s(c):p.createElement(Xe,{toast:c,position:u}))}))};const st=p.lazy(()=>F(()=>import("./Home-CBUgMvkx.js"),__vite__mapDeps([0,1,2])).then(e=>({default:e.HomePage}))),at=p.lazy(()=>F(()=>import("./TemplateSelection-DEE0tHps.js"),__vite__mapDeps([3,1,4,2])).then(e=>({default:e.TemplateSelectionPage}))),it=p.lazy(()=>F(()=>import("./Photobooth-7Bf5mXtb.js"),__vite__mapDeps([5,1,2,4])).then(e=>({default:e.PhotoboothPage})));function nt(){return h.jsx("div",{className:"min-h-screen bg-[#0C0D12] flex items-center justify-center",children:h.jsxs("div",{className:"flex flex-col items-center gap-3",children:[h.jsx("div",{className:"w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 to-rose-500 animate-pulse flex items-center justify-center shadow-lg shadow-coral-500/20",children:h.jsx("span",{className:"text-white text-lg font-black",children:"✦"})}),h.jsx("div",{className:"text-xs font-semibold text-gray-400 tracking-wider uppercase animate-pulse",children:"Memuat Studio..."})]})})}function lt(){const{pathname:e}=ne();return p.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),document.documentElement.scrollTop=0,document.body.scrollTop=0},[e]),null}function ct(){return h.jsxs(se,{children:[h.jsx(lt,{}),h.jsx(ot,{position:"top-center",toastOptions:{style:{background:"#181A22",color:"#FFFFFF",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",fontSize:"14px"}}}),h.jsx(p.Suspense,{fallback:h.jsx(nt,{}),children:h.jsxs(ae,{children:[h.jsx(P,{path:"/",element:h.jsx(st,{})}),h.jsx(P,{path:"/templates",element:h.jsx(at,{})}),h.jsx(P,{path:"/photobooth",element:h.jsx(it,{})}),h.jsx(P,{path:"*",element:h.jsx(ie,{to:"/",replace:!0})})]})})]})}me.createRoot(document.getElementById("root")).render(h.jsx(le.StrictMode,{children:h.jsx(ct,{})}));export{F as _,h as j};
