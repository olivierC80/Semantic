(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Mr(e){const t=Object.create(null);for(const r of e.split(","))t[r]=1;return r=>r in t}const F={},nt=[],we=()=>{},Is=()=>!1,Wt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Ar=e=>e.startsWith("onUpdate:"),ne=Object.assign,Nr=(e,t)=>{const r=e.indexOf(t);r>-1&&e.splice(r,1)},Vs=Object.prototype.hasOwnProperty,O=(e,t)=>Vs.call(e,t),P=Array.isArray,st=e=>Jt(e)==="[object Map]",Ln=e=>Jt(e)==="[object Set]",z=e=>typeof e=="function",K=e=>typeof e=="string",Fe=e=>typeof e=="symbol",H=e=>e!==null&&typeof e=="object",Mn=e=>(H(e)||z(e))&&z(e.then)&&z(e.catch),An=Object.prototype.toString,Jt=e=>An.call(e),js=e=>Jt(e).slice(8,-1),Nn=e=>Jt(e)==="[object Object]",Or=e=>K(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,gt=Mr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Qt=e=>{const t=Object.create(null);return r=>t[r]||(t[r]=e(r))},Bs=/-(\w)/g,Re=Qt(e=>e.replace(Bs,(t,r)=>r?r.toUpperCase():"")),Us=/\B([A-Z])/g,Ye=Qt(e=>e.replace(Us,"-$1").toLowerCase()),On=Qt(e=>e.charAt(0).toUpperCase()+e.slice(1)),lr=Qt(e=>e?`on${On(e)}`:""),De=(e,t)=>!Object.is(e,t),Ft=(e,...t)=>{for(let r=0;r<e.length;r++)e[r](...t)},Dn=(e,t,r,n=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:n,value:r})},yr=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let en;const Yt=()=>en||(en=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Dr(e){if(P(e)){const t={};for(let r=0;r<e.length;r++){const n=e[r],s=K(n)?Ks(n):Dr(n);if(s)for(const i in s)t[i]=s[i]}return t}else if(K(e)||H(e))return e}const Hs=/;(?![^(]*\))/g,Xs=/:([^]+)/,Gs=/\/\*[^]*?\*\//g;function Ks(e){const t={};return e.replace(Gs,"").split(Hs).forEach(r=>{if(r){const n=r.split(Xs);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Zt(e){let t="";if(K(e))t=e;else if(P(e))for(let r=0;r<e.length;r++){const n=Zt(e[r]);n&&(t+=n+" ")}else if(H(e))for(const r in e)e[r]&&(t+=r+" ");return t.trim()}const $s="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ws=Mr($s);function Rn(e){return!!e||e===""}const Fn=e=>!!(e&&e.__v_isRef===!0),Ge=e=>K(e)?e:e==null?"":P(e)||H(e)&&(e.toString===An||!z(e.toString))?Fn(e)?Ge(e.value):JSON.stringify(e,In,2):String(e),In=(e,t)=>Fn(t)?In(e,t.value):st(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((r,[n,s],i)=>(r[ur(n,i)+" =>"]=s,r),{})}:Ln(t)?{[`Set(${t.size})`]:[...t.values()].map(r=>ur(r))}:Fe(t)?ur(t):H(t)&&!P(t)&&!Nn(t)?String(t):t,ur=(e,t="")=>{var r;return Fe(e)?`Symbol(${(r=e.description)!=null?r:t})`:e};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let le;class Js{constructor(t=!1){this.detached=t,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=le,!t&&le&&(this.index=(le.scopes||(le.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].pause();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,r;if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].resume();for(t=0,r=this.effects.length;t<r;t++)this.effects[t].resume()}}run(t){if(this._active){const r=le;try{return le=this,t()}finally{le=r}}}on(){le=this}off(){le=this.parent}stop(t){if(this._active){this._active=!1;let r,n;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].stop();for(this.effects.length=0,r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();if(this.cleanups.length=0,this.scopes){for(r=0,n=this.scopes.length;r<n;r++)this.scopes[r].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Qs(){return le}let B;const cr=new WeakSet;class Vn{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,le&&le.active&&le.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,cr.has(this)&&(cr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Bn(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,tn(this),Un(this);const t=B,r=fe;B=this,fe=!0;try{return this.fn()}finally{Hn(this),B=t,fe=r,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ir(t);this.deps=this.depsTail=void 0,tn(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?cr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){vr(this)&&this.run()}get dirty(){return vr(this)}}let jn=0,xt,bt;function Bn(e,t=!1){if(e.flags|=8,t){e.next=bt,bt=e;return}e.next=xt,xt=e}function Rr(){jn++}function Fr(){if(--jn>0)return;if(bt){let t=bt;for(bt=void 0;t;){const r=t.next;t.next=void 0,t.flags&=-9,t=r}}let e;for(;xt;){let t=xt;for(xt=void 0;t;){const r=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){e||(e=n)}t=r}}if(e)throw e}function Un(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Hn(e){let t,r=e.depsTail,n=r;for(;n;){const s=n.prevDep;n.version===-1?(n===r&&(r=s),Ir(n),Ys(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=s}e.deps=t,e.depsTail=r}function vr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Xn(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Xn(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Tt))return;e.globalVersion=Tt;const t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!vr(e)){e.flags&=-3;return}const r=B,n=fe;B=e,fe=!0;try{Un(e);const s=e.fn(e._value);(t.version===0||De(s,e._value))&&(e._value=s,t.version++)}catch(s){throw t.version++,s}finally{B=r,fe=n,Hn(e),e.flags&=-3}}function Ir(e,t=!1){const{dep:r,prevSub:n,nextSub:s}=e;if(n&&(n.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=n,e.nextSub=void 0),r.subs===e&&(r.subs=n,!n&&r.computed)){r.computed.flags&=-5;for(let i=r.computed.deps;i;i=i.nextDep)Ir(i,!0)}!t&&!--r.sc&&r.map&&r.map.delete(r.key)}function Ys(e){const{prevDep:t,nextDep:r}=e;t&&(t.nextDep=r,e.prevDep=void 0),r&&(r.prevDep=t,e.nextDep=void 0)}let fe=!0;const Gn=[];function Ie(){Gn.push(fe),fe=!1}function Ve(){const e=Gn.pop();fe=e===void 0?!0:e}function tn(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const r=B;B=void 0;try{t()}finally{B=r}}}let Tt=0;class Zs{constructor(t,r){this.sub=t,this.dep=r,this.version=r.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Vr{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(t){if(!B||!fe||B===this.computed)return;let r=this.activeLink;if(r===void 0||r.sub!==B)r=this.activeLink=new Zs(B,this),B.deps?(r.prevDep=B.depsTail,B.depsTail.nextDep=r,B.depsTail=r):B.deps=B.depsTail=r,Kn(r);else if(r.version===-1&&(r.version=this.version,r.nextDep)){const n=r.nextDep;n.prevDep=r.prevDep,r.prevDep&&(r.prevDep.nextDep=n),r.prevDep=B.depsTail,r.nextDep=void 0,B.depsTail.nextDep=r,B.depsTail=r,B.deps===r&&(B.deps=n)}return r}trigger(t){this.version++,Tt++,this.notify(t)}notify(t){Rr();try{for(let r=this.subs;r;r=r.prevSub)r.sub.notify()&&r.sub.dep.notify()}finally{Fr()}}}function Kn(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)Kn(n)}const r=e.dep.subs;r!==e&&(e.prevSub=r,r&&(r.nextSub=e)),e.dep.subs=e}}const kr=new WeakMap,We=Symbol(""),Tr=Symbol(""),wt=Symbol("");function J(e,t,r){if(fe&&B){let n=kr.get(e);n||kr.set(e,n=new Map);let s=n.get(r);s||(n.set(r,s=new Vr),s.map=n,s.key=r),s.track()}}function Ee(e,t,r,n,s,i){const o=kr.get(e);if(!o){Tt++;return}const a=u=>{u&&u.trigger()};if(Rr(),t==="clear")o.forEach(a);else{const u=P(e),m=u&&Or(r);if(u&&r==="length"){const p=Number(n);o.forEach((f,T)=>{(T==="length"||T===wt||!Fe(T)&&T>=p)&&a(f)})}else switch((r!==void 0||o.has(void 0))&&a(o.get(r)),m&&a(o.get(wt)),t){case"add":u?m&&a(o.get("length")):(a(o.get(We)),st(e)&&a(o.get(Tr)));break;case"delete":u||(a(o.get(We)),st(e)&&a(o.get(Tr)));break;case"set":st(e)&&a(o.get(We));break}}Fr()}function Ze(e){const t=N(e);return t===e?t:(J(t,"iterate",wt),de(e)?t:t.map(Q))}function er(e){return J(e=N(e),"iterate",wt),e}const ei={__proto__:null,[Symbol.iterator](){return pr(this,Symbol.iterator,Q)},concat(...e){return Ze(this).concat(...e.map(t=>P(t)?Ze(t):t))},entries(){return pr(this,"entries",e=>(e[1]=Q(e[1]),e))},every(e,t){return Ce(this,"every",e,t,void 0,arguments)},filter(e,t){return Ce(this,"filter",e,t,r=>r.map(Q),arguments)},find(e,t){return Ce(this,"find",e,t,Q,arguments)},findIndex(e,t){return Ce(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Ce(this,"findLast",e,t,Q,arguments)},findLastIndex(e,t){return Ce(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Ce(this,"forEach",e,t,void 0,arguments)},includes(...e){return dr(this,"includes",e)},indexOf(...e){return dr(this,"indexOf",e)},join(e){return Ze(this).join(e)},lastIndexOf(...e){return dr(this,"lastIndexOf",e)},map(e,t){return Ce(this,"map",e,t,void 0,arguments)},pop(){return mt(this,"pop")},push(...e){return mt(this,"push",e)},reduce(e,...t){return rn(this,"reduce",e,t)},reduceRight(e,...t){return rn(this,"reduceRight",e,t)},shift(){return mt(this,"shift")},some(e,t){return Ce(this,"some",e,t,void 0,arguments)},splice(...e){return mt(this,"splice",e)},toReversed(){return Ze(this).toReversed()},toSorted(e){return Ze(this).toSorted(e)},toSpliced(...e){return Ze(this).toSpliced(...e)},unshift(...e){return mt(this,"unshift",e)},values(){return pr(this,"values",Q)}};function pr(e,t,r){const n=er(e),s=n[t]();return n!==e&&!de(e)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=r(i.value)),i}),s}const ti=Array.prototype;function Ce(e,t,r,n,s,i){const o=er(e),a=o!==e&&!de(e),u=o[t];if(u!==ti[t]){const f=u.apply(e,i);return a?Q(f):f}let m=r;o!==e&&(a?m=function(f,T){return r.call(this,Q(f),T,e)}:r.length>2&&(m=function(f,T){return r.call(this,f,T,e)}));const p=u.call(o,m,n);return a&&s?s(p):p}function rn(e,t,r,n){const s=er(e);let i=r;return s!==e&&(de(e)?r.length>3&&(i=function(o,a,u){return r.call(this,o,a,u,e)}):i=function(o,a,u){return r.call(this,o,Q(a),u,e)}),s[t](i,...n)}function dr(e,t,r){const n=N(e);J(n,"iterate",wt);const s=n[t](...r);return(s===-1||s===!1)&&Hr(r[0])?(r[0]=N(r[0]),n[t](...r)):s}function mt(e,t,r=[]){Ie(),Rr();const n=N(e)[t].apply(e,r);return Fr(),Ve(),n}const ri=Mr("__proto__,__v_isRef,__isVue"),$n=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Fe));function ni(e){Fe(e)||(e=String(e));const t=N(this);return J(t,"has",e),t.hasOwnProperty(e)}class Wn{constructor(t=!1,r=!1){this._isReadonly=t,this._isShallow=r}get(t,r,n){if(r==="__v_skip")return t.__v_skip;const s=this._isReadonly,i=this._isShallow;if(r==="__v_isReactive")return!s;if(r==="__v_isReadonly")return s;if(r==="__v_isShallow")return i;if(r==="__v_raw")return n===(s?i?mi:Zn:i?Yn:Qn).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const o=P(t);if(!s){let u;if(o&&(u=ei[r]))return u;if(r==="hasOwnProperty")return ni}const a=Reflect.get(t,r,Y(t)?t:n);return(Fe(r)?$n.has(r):ri(r))||(s||J(t,"get",r),i)?a:Y(a)?o&&Or(r)?a:a.value:H(a)?s?es(a):Br(a):a}}class Jn extends Wn{constructor(t=!1){super(!1,t)}set(t,r,n,s){let i=t[r];if(!this._isShallow){const u=Je(i);if(!de(n)&&!Je(n)&&(i=N(i),n=N(n)),!P(t)&&Y(i)&&!Y(n))return u?!1:(i.value=n,!0)}const o=P(t)&&Or(r)?Number(r)<t.length:O(t,r),a=Reflect.set(t,r,n,Y(t)?t:s);return t===N(s)&&(o?De(n,i)&&Ee(t,"set",r,n):Ee(t,"add",r,n)),a}deleteProperty(t,r){const n=O(t,r);t[r];const s=Reflect.deleteProperty(t,r);return s&&n&&Ee(t,"delete",r,void 0),s}has(t,r){const n=Reflect.has(t,r);return(!Fe(r)||!$n.has(r))&&J(t,"has",r),n}ownKeys(t){return J(t,"iterate",P(t)?"length":We),Reflect.ownKeys(t)}}class si extends Wn{constructor(t=!1){super(!0,t)}set(t,r){return!0}deleteProperty(t,r){return!0}}const ii=new Jn,oi=new si,ai=new Jn(!0);const wr=e=>e,Ot=e=>Reflect.getPrototypeOf(e);function li(e,t,r){return function(...n){const s=this.__v_raw,i=N(s),o=st(i),a=e==="entries"||e===Symbol.iterator&&o,u=e==="keys"&&o,m=s[e](...n),p=r?wr:t?qr:Q;return!t&&J(i,"iterate",u?Tr:We),{next(){const{value:f,done:T}=m.next();return T?{value:f,done:T}:{value:a?[p(f[0]),p(f[1])]:p(f),done:T}},[Symbol.iterator](){return this}}}}function Dt(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function ui(e,t){const r={get(s){const i=this.__v_raw,o=N(i),a=N(s);e||(De(s,a)&&J(o,"get",s),J(o,"get",a));const{has:u}=Ot(o),m=t?wr:e?qr:Q;if(u.call(o,s))return m(i.get(s));if(u.call(o,a))return m(i.get(a));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!e&&J(N(s),"iterate",We),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=N(i),a=N(s);return e||(De(s,a)&&J(o,"has",s),J(o,"has",a)),s===a?i.has(s):i.has(s)||i.has(a)},forEach(s,i){const o=this,a=o.__v_raw,u=N(a),m=t?wr:e?qr:Q;return!e&&J(u,"iterate",We),a.forEach((p,f)=>s.call(i,m(p),m(f),o))}};return ne(r,e?{add:Dt("add"),set:Dt("set"),delete:Dt("delete"),clear:Dt("clear")}:{add(s){!t&&!de(s)&&!Je(s)&&(s=N(s));const i=N(this);return Ot(i).has.call(i,s)||(i.add(s),Ee(i,"add",s,s)),this},set(s,i){!t&&!de(i)&&!Je(i)&&(i=N(i));const o=N(this),{has:a,get:u}=Ot(o);let m=a.call(o,s);m||(s=N(s),m=a.call(o,s));const p=u.call(o,s);return o.set(s,i),m?De(i,p)&&Ee(o,"set",s,i):Ee(o,"add",s,i),this},delete(s){const i=N(this),{has:o,get:a}=Ot(i);let u=o.call(i,s);u||(s=N(s),u=o.call(i,s)),a&&a.call(i,s);const m=i.delete(s);return u&&Ee(i,"delete",s,void 0),m},clear(){const s=N(this),i=s.size!==0,o=s.clear();return i&&Ee(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{r[s]=li(s,e,t)}),r}function jr(e,t){const r=ui(e,t);return(n,s,i)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?n:Reflect.get(O(r,s)&&s in n?r:n,s,i)}const ci={get:jr(!1,!1)},pi={get:jr(!1,!0)},di={get:jr(!0,!1)};const Qn=new WeakMap,Yn=new WeakMap,Zn=new WeakMap,mi=new WeakMap;function fi(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function _i(e){return e.__v_skip||!Object.isExtensible(e)?0:fi(js(e))}function Br(e){return Je(e)?e:Ur(e,!1,ii,ci,Qn)}function hi(e){return Ur(e,!1,ai,pi,Yn)}function es(e){return Ur(e,!0,oi,di,Zn)}function Ur(e,t,r,n,s){if(!H(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=s.get(e);if(i)return i;const o=_i(e);if(o===0)return e;const a=new Proxy(e,o===2?n:r);return s.set(e,a),a}function it(e){return Je(e)?it(e.__v_raw):!!(e&&e.__v_isReactive)}function Je(e){return!!(e&&e.__v_isReadonly)}function de(e){return!!(e&&e.__v_isShallow)}function Hr(e){return e?!!e.__v_raw:!1}function N(e){const t=e&&e.__v_raw;return t?N(t):e}function gi(e){return!O(e,"__v_skip")&&Object.isExtensible(e)&&Dn(e,"__v_skip",!0),e}const Q=e=>H(e)?Br(e):e,qr=e=>H(e)?es(e):e;function Y(e){return e?e.__v_isRef===!0:!1}function nn(e){return xi(e,!1)}function xi(e,t){return Y(e)?e:new bi(e,t)}class bi{constructor(t,r){this.dep=new Vr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=r?t:N(t),this._value=r?t:Q(t),this.__v_isShallow=r}get value(){return this.dep.track(),this._value}set value(t){const r=this._rawValue,n=this.__v_isShallow||de(t)||Je(t);t=n?t:N(t),De(t,r)&&(this._rawValue=t,this._value=n?t:Q(t),this.dep.trigger())}}function yi(e){return Y(e)?e.value:e}const vi={get:(e,t,r)=>t==="__v_raw"?e:yi(Reflect.get(e,t,r)),set:(e,t,r,n)=>{const s=e[t];return Y(s)&&!Y(r)?(s.value=r,!0):Reflect.set(e,t,r,n)}};function ts(e){return it(e)?e:new Proxy(e,vi)}class ki{constructor(t,r,n){this.fn=t,this.setter=r,this._value=void 0,this.dep=new Vr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Tt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!r,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&B!==this)return Bn(this,!0),!0}get value(){const t=this.dep.track();return Xn(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Ti(e,t,r=!1){let n,s;return z(e)?n=e:(n=e.get,s=e.set),new ki(n,s,r)}const Rt={},Bt=new WeakMap;let Ke;function wi(e,t=!1,r=Ke){if(r){let n=Bt.get(r);n||Bt.set(r,n=[]),n.push(e)}}function qi(e,t,r=F){const{immediate:n,deep:s,once:i,scheduler:o,augmentJob:a,call:u}=r,m=S=>s?S:de(S)||s===!1||s===0?Pe(S,1):Pe(S);let p,f,T,w,A=!1,M=!1;if(Y(e)?(f=()=>e.value,A=de(e)):it(e)?(f=()=>m(e),A=!0):P(e)?(M=!0,A=e.some(S=>it(S)||de(S)),f=()=>e.map(S=>{if(Y(S))return S.value;if(it(S))return m(S);if(z(S))return u?u(S,2):S()})):z(e)?t?f=u?()=>u(e,2):e:f=()=>{if(T){Ie();try{T()}finally{Ve()}}const S=Ke;Ke=p;try{return u?u(e,3,[w]):e(w)}finally{Ke=S}}:f=we,t&&s){const S=f,$=s===!0?1/0:s;f=()=>Pe(S(),$)}const W=Qs(),R=()=>{p.stop(),W&&W.active&&Nr(W.effects,p)};if(i&&t){const S=t;t=(...$)=>{S(...$),R()}}let X=M?new Array(e.length).fill(Rt):Rt;const G=S=>{if(!(!(p.flags&1)||!p.dirty&&!S))if(t){const $=p.run();if(s||A||(M?$.some((Me,_e)=>De(Me,X[_e])):De($,X))){T&&T();const Me=Ke;Ke=p;try{const _e=[$,X===Rt?void 0:M&&X[0]===Rt?[]:X,w];u?u(t,3,_e):t(..._e),X=$}finally{Ke=Me}}}else p.run()};return a&&a(G),p=new Vn(f),p.scheduler=o?()=>o(G,!1):G,w=S=>wi(S,!1,p),T=p.onStop=()=>{const S=Bt.get(p);if(S){if(u)u(S,4);else for(const $ of S)$();Bt.delete(p)}},t?n?G(!0):X=p.run():o?o(G.bind(null,!0),!0):p.run(),R.pause=p.pause.bind(p),R.resume=p.resume.bind(p),R.stop=R,R}function Pe(e,t=1/0,r){if(t<=0||!H(e)||e.__v_skip||(r=r||new Set,r.has(e)))return e;if(r.add(e),t--,Y(e))Pe(e.value,t,r);else if(P(e))for(let n=0;n<e.length;n++)Pe(e[n],t,r);else if(Ln(e)||st(e))e.forEach(n=>{Pe(n,t,r)});else if(Nn(e)){for(const n in e)Pe(e[n],t,r);for(const n of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,n)&&Pe(e[n],t,r)}return e}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Et(e,t,r,n){try{return n?e(...n):e()}catch(s){tr(s,t,r)}}function qe(e,t,r,n){if(z(e)){const s=Et(e,t,r,n);return s&&Mn(s)&&s.catch(i=>{tr(i,t,r)}),s}if(P(e)){const s=[];for(let i=0;i<e.length;i++)s.push(qe(e[i],t,r,n));return s}}function tr(e,t,r,n=!0){const s=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||F;if(t){let a=t.parent;const u=t.proxy,m=`https://vuejs.org/error-reference/#runtime-${r}`;for(;a;){const p=a.ec;if(p){for(let f=0;f<p.length;f++)if(p[f](e,u,m)===!1)return}a=a.parent}if(i){Ie(),Et(i,null,10,[e,u,m]),Ve();return}}Ci(e,r,s,n,o)}function Ci(e,t,r,n=!0,s=!1){if(s)throw e;console.error(e)}const te=[];let ve=-1;const ot=[];let Ne=null,tt=0;const rs=Promise.resolve();let Ut=null;function Si(e){const t=Ut||rs;return e?t.then(this?e.bind(this):e):t}function Ei(e){let t=ve+1,r=te.length;for(;t<r;){const n=t+r>>>1,s=te[n],i=qt(s);i<e||i===e&&s.flags&2?t=n+1:r=n}return t}function Xr(e){if(!(e.flags&1)){const t=qt(e),r=te[te.length-1];!r||!(e.flags&2)&&t>=qt(r)?te.push(e):te.splice(Ei(t),0,e),e.flags|=1,ns()}}function ns(){Ut||(Ut=rs.then(is))}function Pi(e){P(e)?ot.push(...e):Ne&&e.id===-1?Ne.splice(tt+1,0,e):e.flags&1||(ot.push(e),e.flags|=1),ns()}function sn(e,t,r=ve+1){for(;r<te.length;r++){const n=te[r];if(n&&n.flags&2){if(e&&n.id!==e.uid)continue;te.splice(r,1),r--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function ss(e){if(ot.length){const t=[...new Set(ot)].sort((r,n)=>qt(r)-qt(n));if(ot.length=0,Ne){Ne.push(...t);return}for(Ne=t,tt=0;tt<Ne.length;tt++){const r=Ne[tt];r.flags&4&&(r.flags&=-2),r.flags&8||r(),r.flags&=-2}Ne=null,tt=0}}const qt=e=>e.id==null?e.flags&2?-1:1/0:e.id;function is(e){try{for(ve=0;ve<te.length;ve++){const t=te[ve];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Et(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;ve<te.length;ve++){const t=te[ve];t&&(t.flags&=-2)}ve=-1,te.length=0,ss(),Ut=null,(te.length||ot.length)&&is()}}let pe=null,os=null;function Ht(e){const t=pe;return pe=e,os=e&&e.type.__scopeId||null,t}function zi(e,t=pe,r){if(!t||e._n)return e;const n=(...s)=>{n._d&&_n(-1);const i=Ht(t);let o;try{o=e(...s)}finally{Ht(i),n._d&&_n(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function on(e,t){if(pe===null)return e;const r=ir(pe),n=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[i,o,a,u=F]=t[s];i&&(z(i)&&(i={mounted:i,updated:i}),i.deep&&Pe(o),n.push({dir:i,instance:r,value:o,oldValue:void 0,arg:a,modifiers:u}))}return e}function He(e,t,r,n){const s=e.dirs,i=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];i&&(a.oldValue=i[o].value);let u=a.dir[n];u&&(Ie(),qe(u,r,8,[e.el,a,e,t]),Ve())}}const Li=Symbol("_vte"),Mi=e=>e.__isTeleport;function Gr(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Gr(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function as(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Xt(e,t,r,n,s=!1){if(P(e)){e.forEach((A,M)=>Xt(A,t&&(P(t)?t[M]:t),r,n,s));return}if(yt(n)&&!s){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Xt(e,t,r,n.component.subTree);return}const i=n.shapeFlag&4?ir(n.component):n.el,o=s?null:i,{i:a,r:u}=e,m=t&&t.r,p=a.refs===F?a.refs={}:a.refs,f=a.setupState,T=N(f),w=f===F?()=>!1:A=>O(T,A);if(m!=null&&m!==u&&(K(m)?(p[m]=null,w(m)&&(f[m]=null)):Y(m)&&(m.value=null)),z(u))Et(u,a,12,[o,p]);else{const A=K(u),M=Y(u);if(A||M){const W=()=>{if(e.f){const R=A?w(u)?f[u]:p[u]:u.value;s?P(R)&&Nr(R,i):P(R)?R.includes(i)||R.push(i):A?(p[u]=[i],w(u)&&(f[u]=p[u])):(u.value=[i],e.k&&(p[e.k]=u.value))}else A?(p[u]=o,w(u)&&(f[u]=o)):M&&(u.value=o,e.k&&(p[e.k]=o))};o?(W.id=-1,ae(W,r)):W()}}}Yt().requestIdleCallback;Yt().cancelIdleCallback;const yt=e=>!!e.type.__asyncLoader,ls=e=>e.type.__isKeepAlive;function Ai(e,t){us(e,"a",t)}function Ni(e,t){us(e,"da",t)}function us(e,t,r=re){const n=e.__wdc||(e.__wdc=()=>{let s=r;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(rr(t,n,r),r){let s=r.parent;for(;s&&s.parent;)ls(s.parent.vnode)&&Oi(n,t,r,s),s=s.parent}}function Oi(e,t,r,n){const s=rr(t,e,n,!0);cs(()=>{Nr(n[t],s)},r)}function rr(e,t,r=re,n=!1){if(r){const s=r[e]||(r[e]=[]),i=t.__weh||(t.__weh=(...o)=>{Ie();const a=Pt(r),u=qe(t,r,e,o);return a(),Ve(),u});return n?s.unshift(i):s.push(i),i}}const Le=e=>(t,r=re)=>{(!St||e==="sp")&&rr(e,(...n)=>t(...n),r)},Di=Le("bm"),Ri=Le("m"),Fi=Le("bu"),Ii=Le("u"),Vi=Le("bum"),cs=Le("um"),ji=Le("sp"),Bi=Le("rtg"),Ui=Le("rtc");function Hi(e,t=re){rr("ec",e,t)}const Xi=Symbol.for("v-ndc");function Gi(e,t,r,n){let s;const i=r,o=P(e);if(o||K(e)){const a=o&&it(e);let u=!1;a&&(u=!de(e),e=er(e)),s=new Array(e.length);for(let m=0,p=e.length;m<p;m++)s[m]=t(u?Q(e[m]):e[m],m,void 0,i)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,i)}else if(H(e))if(e[Symbol.iterator])s=Array.from(e,(a,u)=>t(a,u,void 0,i));else{const a=Object.keys(e);s=new Array(a.length);for(let u=0,m=a.length;u<m;u++){const p=a[u];s[u]=t(e[p],p,u,i)}}else s=[];return s}const Cr=e=>e?Ms(e)?ir(e):Cr(e.parent):null,vt=ne(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Cr(e.parent),$root:e=>Cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>ds(e),$forceUpdate:e=>e.f||(e.f=()=>{Xr(e.update)}),$nextTick:e=>e.n||(e.n=Si.bind(e.proxy)),$watch:e=>_o.bind(e)}),mr=(e,t)=>e!==F&&!e.__isScriptSetup&&O(e,t),Ki={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:r,setupState:n,data:s,props:i,accessCache:o,type:a,appContext:u}=e;let m;if(t[0]!=="$"){const w=o[t];if(w!==void 0)switch(w){case 1:return n[t];case 2:return s[t];case 4:return r[t];case 3:return i[t]}else{if(mr(n,t))return o[t]=1,n[t];if(s!==F&&O(s,t))return o[t]=2,s[t];if((m=e.propsOptions[0])&&O(m,t))return o[t]=3,i[t];if(r!==F&&O(r,t))return o[t]=4,r[t];Sr&&(o[t]=0)}}const p=vt[t];let f,T;if(p)return t==="$attrs"&&J(e.attrs,"get",""),p(e);if((f=a.__cssModules)&&(f=f[t]))return f;if(r!==F&&O(r,t))return o[t]=4,r[t];if(T=u.config.globalProperties,O(T,t))return T[t]},set({_:e},t,r){const{data:n,setupState:s,ctx:i}=e;return mr(s,t)?(s[t]=r,!0):n!==F&&O(n,t)?(n[t]=r,!0):O(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=r,!0)},has({_:{data:e,setupState:t,accessCache:r,ctx:n,appContext:s,propsOptions:i}},o){let a;return!!r[o]||e!==F&&O(e,o)||mr(t,o)||(a=i[0])&&O(a,o)||O(n,o)||O(vt,o)||O(s.config.globalProperties,o)},defineProperty(e,t,r){return r.get!=null?e._.accessCache[t]=0:O(r,"value")&&this.set(e,t,r.value,null),Reflect.defineProperty(e,t,r)}};function an(e){return P(e)?e.reduce((t,r)=>(t[r]=null,t),{}):e}let Sr=!0;function $i(e){const t=ds(e),r=e.proxy,n=e.ctx;Sr=!1,t.beforeCreate&&ln(t.beforeCreate,e,"bc");const{data:s,computed:i,methods:o,watch:a,provide:u,inject:m,created:p,beforeMount:f,mounted:T,beforeUpdate:w,updated:A,activated:M,deactivated:W,beforeDestroy:R,beforeUnmount:X,destroyed:G,unmounted:S,render:$,renderTracked:Me,renderTriggered:_e,errorCaptured:Ae,serverPrefetch:zt,expose:je,inheritAttrs:ut,components:Lt,directives:Mt,filters:or}=t;if(m&&Wi(m,n,null),o)for(const U in o){const I=o[U];z(I)&&(n[U]=I.bind(r))}if(s){const U=s.call(r,r);H(U)&&(e.data=Br(U))}if(Sr=!0,i)for(const U in i){const I=i[U],Be=z(I)?I.bind(r,r):z(I.get)?I.get.bind(r,r):we,At=!z(I)&&z(I.set)?I.set.bind(r):we,Ue=Ns({get:Be,set:At});Object.defineProperty(n,U,{enumerable:!0,configurable:!0,get:()=>Ue.value,set:he=>Ue.value=he})}if(a)for(const U in a)ps(a[U],n,r,U);if(u){const U=z(u)?u.call(r):u;Reflect.ownKeys(U).forEach(I=>{to(I,U[I])})}p&&ln(p,e,"c");function Z(U,I){P(I)?I.forEach(Be=>U(Be.bind(r))):I&&U(I.bind(r))}if(Z(Di,f),Z(Ri,T),Z(Fi,w),Z(Ii,A),Z(Ai,M),Z(Ni,W),Z(Hi,Ae),Z(Ui,Me),Z(Bi,_e),Z(Vi,X),Z(cs,S),Z(ji,zt),P(je))if(je.length){const U=e.exposed||(e.exposed={});je.forEach(I=>{Object.defineProperty(U,I,{get:()=>r[I],set:Be=>r[I]=Be})})}else e.exposed||(e.exposed={});$&&e.render===we&&(e.render=$),ut!=null&&(e.inheritAttrs=ut),Lt&&(e.components=Lt),Mt&&(e.directives=Mt),zt&&as(e)}function Wi(e,t,r=we){P(e)&&(e=Er(e));for(const n in e){const s=e[n];let i;H(s)?"default"in s?i=It(s.from||n,s.default,!0):i=It(s.from||n):i=It(s),Y(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[n]=i}}function ln(e,t,r){qe(P(e)?e.map(n=>n.bind(t.proxy)):e.bind(t.proxy),t,r)}function ps(e,t,r,n){let s=n.includes(".")?Cs(r,n):()=>r[n];if(K(e)){const i=t[e];z(i)&&_r(s,i)}else if(z(e))_r(s,e.bind(r));else if(H(e))if(P(e))e.forEach(i=>ps(i,t,r,n));else{const i=z(e.handler)?e.handler.bind(r):t[e.handler];z(i)&&_r(s,i,e)}}function ds(e){const t=e.type,{mixins:r,extends:n}=t,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,a=i.get(t);let u;return a?u=a:!s.length&&!r&&!n?u=t:(u={},s.length&&s.forEach(m=>Gt(u,m,o,!0)),Gt(u,t,o)),H(t)&&i.set(t,u),u}function Gt(e,t,r,n=!1){const{mixins:s,extends:i}=t;i&&Gt(e,i,r,!0),s&&s.forEach(o=>Gt(e,o,r,!0));for(const o in t)if(!(n&&o==="expose")){const a=Ji[o]||r&&r[o];e[o]=a?a(e[o],t[o]):t[o]}return e}const Ji={data:un,props:cn,emits:cn,methods:ht,computed:ht,beforeCreate:ee,created:ee,beforeMount:ee,mounted:ee,beforeUpdate:ee,updated:ee,beforeDestroy:ee,beforeUnmount:ee,destroyed:ee,unmounted:ee,activated:ee,deactivated:ee,errorCaptured:ee,serverPrefetch:ee,components:ht,directives:ht,watch:Yi,provide:un,inject:Qi};function un(e,t){return t?e?function(){return ne(z(e)?e.call(this,this):e,z(t)?t.call(this,this):t)}:t:e}function Qi(e,t){return ht(Er(e),Er(t))}function Er(e){if(P(e)){const t={};for(let r=0;r<e.length;r++)t[e[r]]=e[r];return t}return e}function ee(e,t){return e?[...new Set([].concat(e,t))]:t}function ht(e,t){return e?ne(Object.create(null),e,t):t}function cn(e,t){return e?P(e)&&P(t)?[...new Set([...e,...t])]:ne(Object.create(null),an(e),an(t??{})):t}function Yi(e,t){if(!e)return t;if(!t)return e;const r=ne(Object.create(null),e);for(const n in t)r[n]=ee(e[n],t[n]);return r}function ms(){return{app:null,config:{isNativeTag:Is,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Zi=0;function eo(e,t){return function(n,s=null){z(n)||(n=ne({},n)),s!=null&&!H(s)&&(s=null);const i=ms(),o=new WeakSet,a=[];let u=!1;const m=i.app={_uid:Zi++,_component:n,_props:s,_container:null,_context:i,_instance:null,version:Do,get config(){return i.config},set config(p){},use(p,...f){return o.has(p)||(p&&z(p.install)?(o.add(p),p.install(m,...f)):z(p)&&(o.add(p),p(m,...f))),m},mixin(p){return i.mixins.includes(p)||i.mixins.push(p),m},component(p,f){return f?(i.components[p]=f,m):i.components[p]},directive(p,f){return f?(i.directives[p]=f,m):i.directives[p]},mount(p,f,T){if(!u){const w=m._ceVNode||ze(n,s);return w.appContext=i,T===!0?T="svg":T===!1&&(T=void 0),e(w,p,T),u=!0,m._container=p,p.__vue_app__=m,ir(w.component)}},onUnmount(p){a.push(p)},unmount(){u&&(qe(a,m._instance,16),e(null,m._container),delete m._container.__vue_app__)},provide(p,f){return i.provides[p]=f,m},runWithContext(p){const f=at;at=m;try{return p()}finally{at=f}}};return m}}let at=null;function to(e,t){if(re){let r=re.provides;const n=re.parent&&re.parent.provides;n===r&&(r=re.provides=Object.create(n)),r[e]=t}}function It(e,t,r=!1){const n=re||pe;if(n||at){const s=at?at._context.provides:n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return r&&z(t)?t.call(n&&n.proxy):t}}const fs={},_s=()=>Object.create(fs),hs=e=>Object.getPrototypeOf(e)===fs;function ro(e,t,r,n=!1){const s={},i=_s();e.propsDefaults=Object.create(null),gs(e,t,s,i);for(const o in e.propsOptions[0])o in s||(s[o]=void 0);r?e.props=n?s:hi(s):e.type.props?e.props=s:e.props=i,e.attrs=i}function no(e,t,r,n){const{props:s,attrs:i,vnode:{patchFlag:o}}=e,a=N(s),[u]=e.propsOptions;let m=!1;if((n||o>0)&&!(o&16)){if(o&8){const p=e.vnode.dynamicProps;for(let f=0;f<p.length;f++){let T=p[f];if(nr(e.emitsOptions,T))continue;const w=t[T];if(u)if(O(i,T))w!==i[T]&&(i[T]=w,m=!0);else{const A=Re(T);s[A]=Pr(u,a,A,w,e,!1)}else w!==i[T]&&(i[T]=w,m=!0)}}}else{gs(e,t,s,i)&&(m=!0);let p;for(const f in a)(!t||!O(t,f)&&((p=Ye(f))===f||!O(t,p)))&&(u?r&&(r[f]!==void 0||r[p]!==void 0)&&(s[f]=Pr(u,a,f,void 0,e,!0)):delete s[f]);if(i!==a)for(const f in i)(!t||!O(t,f))&&(delete i[f],m=!0)}m&&Ee(e.attrs,"set","")}function gs(e,t,r,n){const[s,i]=e.propsOptions;let o=!1,a;if(t)for(let u in t){if(gt(u))continue;const m=t[u];let p;s&&O(s,p=Re(u))?!i||!i.includes(p)?r[p]=m:(a||(a={}))[p]=m:nr(e.emitsOptions,u)||(!(u in n)||m!==n[u])&&(n[u]=m,o=!0)}if(i){const u=N(r),m=a||F;for(let p=0;p<i.length;p++){const f=i[p];r[f]=Pr(s,u,f,m[f],e,!O(m,f))}}return o}function Pr(e,t,r,n,s,i){const o=e[r];if(o!=null){const a=O(o,"default");if(a&&n===void 0){const u=o.default;if(o.type!==Function&&!o.skipFactory&&z(u)){const{propsDefaults:m}=s;if(r in m)n=m[r];else{const p=Pt(s);n=m[r]=u.call(null,t),p()}}else n=u;s.ce&&s.ce._setProp(r,n)}o[0]&&(i&&!a?n=!1:o[1]&&(n===""||n===Ye(r))&&(n=!0))}return n}const so=new WeakMap;function xs(e,t,r=!1){const n=r?so:t.propsCache,s=n.get(e);if(s)return s;const i=e.props,o={},a=[];let u=!1;if(!z(e)){const p=f=>{u=!0;const[T,w]=xs(f,t,!0);ne(o,T),w&&a.push(...w)};!r&&t.mixins.length&&t.mixins.forEach(p),e.extends&&p(e.extends),e.mixins&&e.mixins.forEach(p)}if(!i&&!u)return H(e)&&n.set(e,nt),nt;if(P(i))for(let p=0;p<i.length;p++){const f=Re(i[p]);pn(f)&&(o[f]=F)}else if(i)for(const p in i){const f=Re(p);if(pn(f)){const T=i[p],w=o[f]=P(T)||z(T)?{type:T}:ne({},T),A=w.type;let M=!1,W=!0;if(P(A))for(let R=0;R<A.length;++R){const X=A[R],G=z(X)&&X.name;if(G==="Boolean"){M=!0;break}else G==="String"&&(W=!1)}else M=z(A)&&A.name==="Boolean";w[0]=M,w[1]=W,(M||O(w,"default"))&&a.push(f)}}const m=[o,a];return H(e)&&n.set(e,m),m}function pn(e){return e[0]!=="$"&&!gt(e)}const bs=e=>e[0]==="_"||e==="$stable",Kr=e=>P(e)?e.map(Te):[Te(e)],io=(e,t,r)=>{if(t._n)return t;const n=zi((...s)=>Kr(t(...s)),r);return n._c=!1,n},ys=(e,t,r)=>{const n=e._ctx;for(const s in e){if(bs(s))continue;const i=e[s];if(z(i))t[s]=io(s,i,n);else if(i!=null){const o=Kr(i);t[s]=()=>o}}},vs=(e,t)=>{const r=Kr(t);e.slots.default=()=>r},ks=(e,t,r)=>{for(const n in t)(r||n!=="_")&&(e[n]=t[n])},oo=(e,t,r)=>{const n=e.slots=_s();if(e.vnode.shapeFlag&32){const s=t._;s?(ks(n,t,r),r&&Dn(n,"_",s,!0)):ys(t,n)}else t&&vs(e,t)},ao=(e,t,r)=>{const{vnode:n,slots:s}=e;let i=!0,o=F;if(n.shapeFlag&32){const a=t._;a?r&&a===1?i=!1:ks(s,t,r):(i=!t.$stable,ys(t,s)),o=t}else t&&(vs(e,t),o={default:1});if(i)for(const a in s)!bs(a)&&o[a]==null&&delete s[a]},ae=ko;function lo(e){return uo(e)}function uo(e,t){const r=Yt();r.__VUE__=!0;const{insert:n,remove:s,patchProp:i,createElement:o,createText:a,createComment:u,setText:m,setElementText:p,parentNode:f,nextSibling:T,setScopeId:w=we,insertStaticContent:A}=e,M=(l,c,d,g=null,_=null,h=null,v=void 0,y=null,b=!!c.dynamicChildren)=>{if(l===c)return;l&&!ft(l,c)&&(g=Nt(l),he(l,_,h,!0),l=null),c.patchFlag===-2&&(b=!1,c.dynamicChildren=null);const{type:x,ref:C,shapeFlag:k}=c;switch(x){case sr:W(l,c,d,g);break;case Qe:R(l,c,d,g);break;case hr:l==null&&X(c,d,g,v);break;case ke:Lt(l,c,d,g,_,h,v,y,b);break;default:k&1?$(l,c,d,g,_,h,v,y,b):k&6?Mt(l,c,d,g,_,h,v,y,b):(k&64||k&128)&&x.process(l,c,d,g,_,h,v,y,b,pt)}C!=null&&_&&Xt(C,l&&l.ref,h,c||l,!c)},W=(l,c,d,g)=>{if(l==null)n(c.el=a(c.children),d,g);else{const _=c.el=l.el;c.children!==l.children&&m(_,c.children)}},R=(l,c,d,g)=>{l==null?n(c.el=u(c.children||""),d,g):c.el=l.el},X=(l,c,d,g)=>{[l.el,l.anchor]=A(l.children,c,d,g,l.el,l.anchor)},G=({el:l,anchor:c},d,g)=>{let _;for(;l&&l!==c;)_=T(l),n(l,d,g),l=_;n(c,d,g)},S=({el:l,anchor:c})=>{let d;for(;l&&l!==c;)d=T(l),s(l),l=d;s(c)},$=(l,c,d,g,_,h,v,y,b)=>{c.type==="svg"?v="svg":c.type==="math"&&(v="mathml"),l==null?Me(c,d,g,_,h,v,y,b):zt(l,c,_,h,v,y,b)},Me=(l,c,d,g,_,h,v,y)=>{let b,x;const{props:C,shapeFlag:k,transition:q,dirs:E}=l;if(b=l.el=o(l.type,h,C&&C.is,C),k&8?p(b,l.children):k&16&&Ae(l.children,b,null,g,_,fr(l,h),v,y),E&&He(l,null,g,"created"),_e(b,l,l.scopeId,v,g),C){for(const V in C)V!=="value"&&!gt(V)&&i(b,V,null,C[V],h,g);"value"in C&&i(b,"value",null,C.value,h),(x=C.onVnodeBeforeMount)&&ye(x,g,l)}E&&He(l,null,g,"beforeMount");const L=co(_,q);L&&q.beforeEnter(b),n(b,c,d),((x=C&&C.onVnodeMounted)||L||E)&&ae(()=>{x&&ye(x,g,l),L&&q.enter(b),E&&He(l,null,g,"mounted")},_)},_e=(l,c,d,g,_)=>{if(d&&w(l,d),g)for(let h=0;h<g.length;h++)w(l,g[h]);if(_){let h=_.subTree;if(c===h||Es(h.type)&&(h.ssContent===c||h.ssFallback===c)){const v=_.vnode;_e(l,v,v.scopeId,v.slotScopeIds,_.parent)}}},Ae=(l,c,d,g,_,h,v,y,b=0)=>{for(let x=b;x<l.length;x++){const C=l[x]=y?Oe(l[x]):Te(l[x]);M(null,C,c,d,g,_,h,v,y)}},zt=(l,c,d,g,_,h,v)=>{const y=c.el=l.el;let{patchFlag:b,dynamicChildren:x,dirs:C}=c;b|=l.patchFlag&16;const k=l.props||F,q=c.props||F;let E;if(d&&Xe(d,!1),(E=q.onVnodeBeforeUpdate)&&ye(E,d,c,l),C&&He(c,l,d,"beforeUpdate"),d&&Xe(d,!0),(k.innerHTML&&q.innerHTML==null||k.textContent&&q.textContent==null)&&p(y,""),x?je(l.dynamicChildren,x,y,d,g,fr(c,_),h):v||I(l,c,y,null,d,g,fr(c,_),h,!1),b>0){if(b&16)ut(y,k,q,d,_);else if(b&2&&k.class!==q.class&&i(y,"class",null,q.class,_),b&4&&i(y,"style",k.style,q.style,_),b&8){const L=c.dynamicProps;for(let V=0;V<L.length;V++){const D=L[V],ie=k[D],se=q[D];(se!==ie||D==="value")&&i(y,D,ie,se,_,d)}}b&1&&l.children!==c.children&&p(y,c.children)}else!v&&x==null&&ut(y,k,q,d,_);((E=q.onVnodeUpdated)||C)&&ae(()=>{E&&ye(E,d,c,l),C&&He(c,l,d,"updated")},g)},je=(l,c,d,g,_,h,v)=>{for(let y=0;y<c.length;y++){const b=l[y],x=c[y],C=b.el&&(b.type===ke||!ft(b,x)||b.shapeFlag&70)?f(b.el):d;M(b,x,C,null,g,_,h,v,!0)}},ut=(l,c,d,g,_)=>{if(c!==d){if(c!==F)for(const h in c)!gt(h)&&!(h in d)&&i(l,h,c[h],null,_,g);for(const h in d){if(gt(h))continue;const v=d[h],y=c[h];v!==y&&h!=="value"&&i(l,h,y,v,_,g)}"value"in d&&i(l,"value",c.value,d.value,_)}},Lt=(l,c,d,g,_,h,v,y,b)=>{const x=c.el=l?l.el:a(""),C=c.anchor=l?l.anchor:a("");let{patchFlag:k,dynamicChildren:q,slotScopeIds:E}=c;E&&(y=y?y.concat(E):E),l==null?(n(x,d,g),n(C,d,g),Ae(c.children||[],d,C,_,h,v,y,b)):k>0&&k&64&&q&&l.dynamicChildren?(je(l.dynamicChildren,q,d,_,h,v,y),(c.key!=null||_&&c===_.subTree)&&Ts(l,c,!0)):I(l,c,d,C,_,h,v,y,b)},Mt=(l,c,d,g,_,h,v,y,b)=>{c.slotScopeIds=y,l==null?c.shapeFlag&512?_.ctx.activate(c,d,g,v,b):or(c,d,g,_,h,v,b):Wr(l,c,b)},or=(l,c,d,g,_,h,v)=>{const y=l.component=zo(l,g,_);if(ls(l)&&(y.ctx.renderer=pt),Lo(y,!1,v),y.asyncDep){if(_&&_.registerDep(y,Z,v),!l.el){const b=y.subTree=ze(Qe);R(null,b,c,d)}}else Z(y,l,c,d,_,h,v)},Wr=(l,c,d)=>{const g=c.component=l.component;if(yo(l,c,d))if(g.asyncDep&&!g.asyncResolved){U(g,c,d);return}else g.next=c,g.update();else c.el=l.el,g.vnode=c},Z=(l,c,d,g,_,h,v)=>{const y=()=>{if(l.isMounted){let{next:k,bu:q,u:E,parent:L,vnode:V}=l;{const xe=ws(l);if(xe){k&&(k.el=V.el,U(l,k,v)),xe.asyncDep.then(()=>{l.isUnmounted||y()});return}}let D=k,ie;Xe(l,!1),k?(k.el=V.el,U(l,k,v)):k=V,q&&Ft(q),(ie=k.props&&k.props.onVnodeBeforeUpdate)&&ye(ie,L,k,V),Xe(l,!0);const se=mn(l),ge=l.subTree;l.subTree=se,M(ge,se,f(ge.el),Nt(ge),l,_,h),k.el=se.el,D===null&&vo(l,se.el),E&&ae(E,_),(ie=k.props&&k.props.onVnodeUpdated)&&ae(()=>ye(ie,L,k,V),_)}else{let k;const{el:q,props:E}=c,{bm:L,m:V,parent:D,root:ie,type:se}=l,ge=yt(c);Xe(l,!1),L&&Ft(L),!ge&&(k=E&&E.onVnodeBeforeMount)&&ye(k,D,c),Xe(l,!0);{ie.ce&&ie.ce._injectChildStyle(se);const xe=l.subTree=mn(l);M(null,xe,d,g,l,_,h),c.el=xe.el}if(V&&ae(V,_),!ge&&(k=E&&E.onVnodeMounted)){const xe=c;ae(()=>ye(k,D,xe),_)}(c.shapeFlag&256||D&&yt(D.vnode)&&D.vnode.shapeFlag&256)&&l.a&&ae(l.a,_),l.isMounted=!0,c=d=g=null}};l.scope.on();const b=l.effect=new Vn(y);l.scope.off();const x=l.update=b.run.bind(b),C=l.job=b.runIfDirty.bind(b);C.i=l,C.id=l.uid,b.scheduler=()=>Xr(C),Xe(l,!0),x()},U=(l,c,d)=>{c.component=l;const g=l.vnode.props;l.vnode=c,l.next=null,no(l,c.props,g,d),ao(l,c.children,d),Ie(),sn(l),Ve()},I=(l,c,d,g,_,h,v,y,b=!1)=>{const x=l&&l.children,C=l?l.shapeFlag:0,k=c.children,{patchFlag:q,shapeFlag:E}=c;if(q>0){if(q&128){At(x,k,d,g,_,h,v,y,b);return}else if(q&256){Be(x,k,d,g,_,h,v,y,b);return}}E&8?(C&16&&ct(x,_,h),k!==x&&p(d,k)):C&16?E&16?At(x,k,d,g,_,h,v,y,b):ct(x,_,h,!0):(C&8&&p(d,""),E&16&&Ae(k,d,g,_,h,v,y,b))},Be=(l,c,d,g,_,h,v,y,b)=>{l=l||nt,c=c||nt;const x=l.length,C=c.length,k=Math.min(x,C);let q;for(q=0;q<k;q++){const E=c[q]=b?Oe(c[q]):Te(c[q]);M(l[q],E,d,null,_,h,v,y,b)}x>C?ct(l,_,h,!0,!1,k):Ae(c,d,g,_,h,v,y,b,k)},At=(l,c,d,g,_,h,v,y,b)=>{let x=0;const C=c.length;let k=l.length-1,q=C-1;for(;x<=k&&x<=q;){const E=l[x],L=c[x]=b?Oe(c[x]):Te(c[x]);if(ft(E,L))M(E,L,d,null,_,h,v,y,b);else break;x++}for(;x<=k&&x<=q;){const E=l[k],L=c[q]=b?Oe(c[q]):Te(c[q]);if(ft(E,L))M(E,L,d,null,_,h,v,y,b);else break;k--,q--}if(x>k){if(x<=q){const E=q+1,L=E<C?c[E].el:g;for(;x<=q;)M(null,c[x]=b?Oe(c[x]):Te(c[x]),d,L,_,h,v,y,b),x++}}else if(x>q)for(;x<=k;)he(l[x],_,h,!0),x++;else{const E=x,L=x,V=new Map;for(x=L;x<=q;x++){const oe=c[x]=b?Oe(c[x]):Te(c[x]);oe.key!=null&&V.set(oe.key,x)}let D,ie=0;const se=q-L+1;let ge=!1,xe=0;const dt=new Array(se);for(x=0;x<se;x++)dt[x]=0;for(x=E;x<=k;x++){const oe=l[x];if(ie>=se){he(oe,_,h,!0);continue}let be;if(oe.key!=null)be=V.get(oe.key);else for(D=L;D<=q;D++)if(dt[D-L]===0&&ft(oe,c[D])){be=D;break}be===void 0?he(oe,_,h,!0):(dt[be-L]=x+1,be>=xe?xe=be:ge=!0,M(oe,c[be],d,null,_,h,v,y,b),ie++)}const Yr=ge?po(dt):nt;for(D=Yr.length-1,x=se-1;x>=0;x--){const oe=L+x,be=c[oe],Zr=oe+1<C?c[oe+1].el:g;dt[x]===0?M(null,be,d,Zr,_,h,v,y,b):ge&&(D<0||x!==Yr[D]?Ue(be,d,Zr,2):D--)}}},Ue=(l,c,d,g,_=null)=>{const{el:h,type:v,transition:y,children:b,shapeFlag:x}=l;if(x&6){Ue(l.component.subTree,c,d,g);return}if(x&128){l.suspense.move(c,d,g);return}if(x&64){v.move(l,c,d,pt);return}if(v===ke){n(h,c,d);for(let k=0;k<b.length;k++)Ue(b[k],c,d,g);n(l.anchor,c,d);return}if(v===hr){G(l,c,d);return}if(g!==2&&x&1&&y)if(g===0)y.beforeEnter(h),n(h,c,d),ae(()=>y.enter(h),_);else{const{leave:k,delayLeave:q,afterLeave:E}=y,L=()=>n(h,c,d),V=()=>{k(h,()=>{L(),E&&E()})};q?q(h,L,V):V()}else n(h,c,d)},he=(l,c,d,g=!1,_=!1)=>{const{type:h,props:v,ref:y,children:b,dynamicChildren:x,shapeFlag:C,patchFlag:k,dirs:q,cacheIndex:E}=l;if(k===-2&&(_=!1),y!=null&&Xt(y,null,d,l,!0),E!=null&&(c.renderCache[E]=void 0),C&256){c.ctx.deactivate(l);return}const L=C&1&&q,V=!yt(l);let D;if(V&&(D=v&&v.onVnodeBeforeUnmount)&&ye(D,c,l),C&6)Fs(l.component,d,g);else{if(C&128){l.suspense.unmount(d,g);return}L&&He(l,null,c,"beforeUnmount"),C&64?l.type.remove(l,c,d,pt,g):x&&!x.hasOnce&&(h!==ke||k>0&&k&64)?ct(x,c,d,!1,!0):(h===ke&&k&384||!_&&C&16)&&ct(b,c,d),g&&Jr(l)}(V&&(D=v&&v.onVnodeUnmounted)||L)&&ae(()=>{D&&ye(D,c,l),L&&He(l,null,c,"unmounted")},d)},Jr=l=>{const{type:c,el:d,anchor:g,transition:_}=l;if(c===ke){Rs(d,g);return}if(c===hr){S(l);return}const h=()=>{s(d),_&&!_.persisted&&_.afterLeave&&_.afterLeave()};if(l.shapeFlag&1&&_&&!_.persisted){const{leave:v,delayLeave:y}=_,b=()=>v(d,h);y?y(l.el,h,b):b()}else h()},Rs=(l,c)=>{let d;for(;l!==c;)d=T(l),s(l),l=d;s(c)},Fs=(l,c,d)=>{const{bum:g,scope:_,job:h,subTree:v,um:y,m:b,a:x}=l;dn(b),dn(x),g&&Ft(g),_.stop(),h&&(h.flags|=8,he(v,l,c,d)),y&&ae(y,c),ae(()=>{l.isUnmounted=!0},c),c&&c.pendingBranch&&!c.isUnmounted&&l.asyncDep&&!l.asyncResolved&&l.suspenseId===c.pendingId&&(c.deps--,c.deps===0&&c.resolve())},ct=(l,c,d,g=!1,_=!1,h=0)=>{for(let v=h;v<l.length;v++)he(l[v],c,d,g,_)},Nt=l=>{if(l.shapeFlag&6)return Nt(l.component.subTree);if(l.shapeFlag&128)return l.suspense.next();const c=T(l.anchor||l.el),d=c&&c[Li];return d?T(d):c};let ar=!1;const Qr=(l,c,d)=>{l==null?c._vnode&&he(c._vnode,null,null,!0):M(c._vnode||null,l,c,null,null,null,d),c._vnode=l,ar||(ar=!0,sn(),ss(),ar=!1)},pt={p:M,um:he,m:Ue,r:Jr,mt:or,mc:Ae,pc:I,pbc:je,n:Nt,o:e};return{render:Qr,hydrate:void 0,createApp:eo(Qr)}}function fr({type:e,props:t},r){return r==="svg"&&e==="foreignObject"||r==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:r}function Xe({effect:e,job:t},r){r?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function co(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Ts(e,t,r=!1){const n=e.children,s=t.children;if(P(n)&&P(s))for(let i=0;i<n.length;i++){const o=n[i];let a=s[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[i]=Oe(s[i]),a.el=o.el),!r&&a.patchFlag!==-2&&Ts(o,a)),a.type===sr&&(a.el=o.el)}}function po(e){const t=e.slice(),r=[0];let n,s,i,o,a;const u=e.length;for(n=0;n<u;n++){const m=e[n];if(m!==0){if(s=r[r.length-1],e[s]<m){t[n]=s,r.push(n);continue}for(i=0,o=r.length-1;i<o;)a=i+o>>1,e[r[a]]<m?i=a+1:o=a;m<e[r[i]]&&(i>0&&(t[n]=r[i-1]),r[i]=n)}}for(i=r.length,o=r[i-1];i-- >0;)r[i]=o,o=t[o];return r}function ws(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ws(t)}function dn(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const mo=Symbol.for("v-scx"),fo=()=>It(mo);function _r(e,t,r){return qs(e,t,r)}function qs(e,t,r=F){const{immediate:n,deep:s,flush:i,once:o}=r,a=ne({},r),u=t&&n||!t&&i!=="post";let m;if(St){if(i==="sync"){const w=fo();m=w.__watcherHandles||(w.__watcherHandles=[])}else if(!u){const w=()=>{};return w.stop=we,w.resume=we,w.pause=we,w}}const p=re;a.call=(w,A,M)=>qe(w,p,A,M);let f=!1;i==="post"?a.scheduler=w=>{ae(w,p&&p.suspense)}:i!=="sync"&&(f=!0,a.scheduler=(w,A)=>{A?w():Xr(w)}),a.augmentJob=w=>{t&&(w.flags|=4),f&&(w.flags|=2,p&&(w.id=p.uid,w.i=p))};const T=qi(e,t,a);return St&&(m?m.push(T):u&&T()),T}function _o(e,t,r){const n=this.proxy,s=K(e)?e.includes(".")?Cs(n,e):()=>n[e]:e.bind(n,n);let i;z(t)?i=t:(i=t.handler,r=t);const o=Pt(this),a=qs(s,i.bind(n),r);return o(),a}function Cs(e,t){const r=t.split(".");return()=>{let n=e;for(let s=0;s<r.length&&n;s++)n=n[r[s]];return n}}const ho=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Re(t)}Modifiers`]||e[`${Ye(t)}Modifiers`];function go(e,t,...r){if(e.isUnmounted)return;const n=e.vnode.props||F;let s=r;const i=t.startsWith("update:"),o=i&&ho(n,t.slice(7));o&&(o.trim&&(s=r.map(p=>K(p)?p.trim():p)),o.number&&(s=r.map(yr)));let a,u=n[a=lr(t)]||n[a=lr(Re(t))];!u&&i&&(u=n[a=lr(Ye(t))]),u&&qe(u,e,6,s);const m=n[a+"Once"];if(m){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,qe(m,e,6,s)}}function Ss(e,t,r=!1){const n=t.emitsCache,s=n.get(e);if(s!==void 0)return s;const i=e.emits;let o={},a=!1;if(!z(e)){const u=m=>{const p=Ss(m,t,!0);p&&(a=!0,ne(o,p))};!r&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}return!i&&!a?(H(e)&&n.set(e,null),null):(P(i)?i.forEach(u=>o[u]=null):ne(o,i),H(e)&&n.set(e,o),o)}function nr(e,t){return!e||!Wt(t)?!1:(t=t.slice(2).replace(/Once$/,""),O(e,t[0].toLowerCase()+t.slice(1))||O(e,Ye(t))||O(e,t))}function mn(e){const{type:t,vnode:r,proxy:n,withProxy:s,propsOptions:[i],slots:o,attrs:a,emit:u,render:m,renderCache:p,props:f,data:T,setupState:w,ctx:A,inheritAttrs:M}=e,W=Ht(e);let R,X;try{if(r.shapeFlag&4){const S=s||n,$=S;R=Te(m.call($,S,p,f,w,T,A)),X=a}else{const S=t;R=Te(S.length>1?S(f,{attrs:a,slots:o,emit:u}):S(f,null)),X=t.props?a:xo(a)}}catch(S){kt.length=0,tr(S,e,1),R=ze(Qe)}let G=R;if(X&&M!==!1){const S=Object.keys(X),{shapeFlag:$}=G;S.length&&$&7&&(i&&S.some(Ar)&&(X=bo(X,i)),G=lt(G,X,!1,!0))}return r.dirs&&(G=lt(G,null,!1,!0),G.dirs=G.dirs?G.dirs.concat(r.dirs):r.dirs),r.transition&&Gr(G,r.transition),R=G,Ht(W),R}const xo=e=>{let t;for(const r in e)(r==="class"||r==="style"||Wt(r))&&((t||(t={}))[r]=e[r]);return t},bo=(e,t)=>{const r={};for(const n in e)(!Ar(n)||!(n.slice(9)in t))&&(r[n]=e[n]);return r};function yo(e,t,r){const{props:n,children:s,component:i}=e,{props:o,children:a,patchFlag:u}=t,m=i.emitsOptions;if(t.dirs||t.transition)return!0;if(r&&u>=0){if(u&1024)return!0;if(u&16)return n?fn(n,o,m):!!o;if(u&8){const p=t.dynamicProps;for(let f=0;f<p.length;f++){const T=p[f];if(o[T]!==n[T]&&!nr(m,T))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?fn(n,o,m):!0:!!o;return!1}function fn(e,t,r){const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(let s=0;s<n.length;s++){const i=n[s];if(t[i]!==e[i]&&!nr(r,i))return!0}return!1}function vo({vnode:e,parent:t},r){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.el=e.el),n===e)(e=t.vnode).el=r,t=t.parent;else break}}const Es=e=>e.__isSuspense;function ko(e,t){t&&t.pendingBranch?P(e)?t.effects.push(...e):t.effects.push(e):Pi(e)}const ke=Symbol.for("v-fgt"),sr=Symbol.for("v-txt"),Qe=Symbol.for("v-cmt"),hr=Symbol.for("v-stc"),kt=[];let ue=null;function ce(e=!1){kt.push(ue=e?null:[])}function To(){kt.pop(),ue=kt[kt.length-1]||null}let Ct=1;function _n(e,t=!1){Ct+=e,e<0&&ue&&t&&(ue.hasOnce=!0)}function Ps(e){return e.dynamicChildren=Ct>0?ue||nt:null,To(),Ct>0&&ue&&ue.push(e),e}function me(e,t,r,n,s,i){return Ps(j(e,t,r,n,s,i,!0))}function wo(e,t,r,n,s){return Ps(ze(e,t,r,n,s,!0))}function zs(e){return e?e.__v_isVNode===!0:!1}function ft(e,t){return e.type===t.type&&e.key===t.key}const Ls=({key:e})=>e??null,Vt=({ref:e,ref_key:t,ref_for:r})=>(typeof e=="number"&&(e=""+e),e!=null?K(e)||Y(e)||z(e)?{i:pe,r:e,k:t,f:!!r}:e:null);function j(e,t=null,r=null,n=0,s=null,i=e===ke?0:1,o=!1,a=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ls(t),ref:t&&Vt(t),scopeId:os,slotScopeIds:null,children:r,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:n,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:pe};return a?($r(u,r),i&128&&e.normalize(u)):r&&(u.shapeFlag|=K(r)?8:16),Ct>0&&!o&&ue&&(u.patchFlag>0||i&6)&&u.patchFlag!==32&&ue.push(u),u}const ze=qo;function qo(e,t=null,r=null,n=0,s=null,i=!1){if((!e||e===Xi)&&(e=Qe),zs(e)){const a=lt(e,t,!0);return r&&$r(a,r),Ct>0&&!i&&ue&&(a.shapeFlag&6?ue[ue.indexOf(e)]=a:ue.push(a)),a.patchFlag=-2,a}if(Oo(e)&&(e=e.__vccOpts),t){t=Co(t);let{class:a,style:u}=t;a&&!K(a)&&(t.class=Zt(a)),H(u)&&(Hr(u)&&!P(u)&&(u=ne({},u)),t.style=Dr(u))}const o=K(e)?1:Es(e)?128:Mi(e)?64:H(e)?4:z(e)?2:0;return j(e,t,r,n,s,o,i,!0)}function Co(e){return e?Hr(e)||hs(e)?ne({},e):e:null}function lt(e,t,r=!1,n=!1){const{props:s,ref:i,patchFlag:o,children:a,transition:u}=e,m=t?So(s||{},t):s,p={__v_isVNode:!0,__v_skip:!0,type:e.type,props:m,key:m&&Ls(m),ref:t&&t.ref?r&&i?P(i)?i.concat(Vt(t)):[i,Vt(t)]:Vt(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ke?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&lt(e.ssContent),ssFallback:e.ssFallback&&lt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&n&&Gr(p,u.clone(p)),p}function $e(e=" ",t=0){return ze(sr,null,e,t)}function et(e="",t=!1){return t?(ce(),wo(Qe,null,e)):ze(Qe,null,e)}function Te(e){return e==null||typeof e=="boolean"?ze(Qe):P(e)?ze(ke,null,e.slice()):zs(e)?Oe(e):ze(sr,null,String(e))}function Oe(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:lt(e)}function $r(e,t){let r=0;const{shapeFlag:n}=e;if(t==null)t=null;else if(P(t))r=16;else if(typeof t=="object")if(n&65){const s=t.default;s&&(s._c&&(s._d=!1),$r(e,s()),s._c&&(s._d=!0));return}else{r=32;const s=t._;!s&&!hs(t)?t._ctx=pe:s===3&&pe&&(pe.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else z(t)?(t={default:t,_ctx:pe},r=32):(t=String(t),n&64?(r=16,t=[$e(t)]):r=8);e.children=t,e.shapeFlag|=r}function So(...e){const t={};for(let r=0;r<e.length;r++){const n=e[r];for(const s in n)if(s==="class")t.class!==n.class&&(t.class=Zt([t.class,n.class]));else if(s==="style")t.style=Dr([t.style,n.style]);else if(Wt(s)){const i=t[s],o=n[s];o&&i!==o&&!(P(i)&&i.includes(o))&&(t[s]=i?[].concat(i,o):o)}else s!==""&&(t[s]=n[s])}return t}function ye(e,t,r,n=null){qe(e,t,7,[r,n])}const Eo=ms();let Po=0;function zo(e,t,r){const n=e.type,s=(t?t.appContext:e.appContext)||Eo,i={uid:Po++,vnode:e,type:n,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Js(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xs(n,s),emitsOptions:Ss(n,s),emit:null,emitted:null,propsDefaults:F,inheritAttrs:n.inheritAttrs,ctx:F,data:F,props:F,attrs:F,slots:F,refs:F,setupState:F,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=go.bind(null,i),e.ce&&e.ce(i),i}let re=null,Kt,zr;{const e=Yt(),t=(r,n)=>{let s;return(s=e[r])||(s=e[r]=[]),s.push(n),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Kt=t("__VUE_INSTANCE_SETTERS__",r=>re=r),zr=t("__VUE_SSR_SETTERS__",r=>St=r)}const Pt=e=>{const t=re;return Kt(e),e.scope.on(),()=>{e.scope.off(),Kt(t)}},hn=()=>{re&&re.scope.off(),Kt(null)};function Ms(e){return e.vnode.shapeFlag&4}let St=!1;function Lo(e,t=!1,r=!1){t&&zr(t);const{props:n,children:s}=e.vnode,i=Ms(e);ro(e,n,i,t),oo(e,s,r);const o=i?Mo(e,t):void 0;return t&&zr(!1),o}function Mo(e,t){const r=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Ki);const{setup:n}=r;if(n){Ie();const s=e.setupContext=n.length>1?No(e):null,i=Pt(e),o=Et(n,e,0,[e.props,s]),a=Mn(o);if(Ve(),i(),(a||e.sp)&&!yt(e)&&as(e),a){if(o.then(hn,hn),t)return o.then(u=>{gn(e,u)}).catch(u=>{tr(u,e,0)});e.asyncDep=o}else gn(e,o)}else As(e)}function gn(e,t,r){z(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:H(t)&&(e.setupState=ts(t)),As(e)}function As(e,t,r){const n=e.type;e.render||(e.render=n.render||we);{const s=Pt(e);Ie();try{$i(e)}finally{Ve(),s()}}}const Ao={get(e,t){return J(e,"get",""),e[t]}};function No(e){const t=r=>{e.exposed=r||{}};return{attrs:new Proxy(e.attrs,Ao),slots:e.slots,emit:e.emit,expose:t}}function ir(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(ts(gi(e.exposed)),{get(t,r){if(r in t)return t[r];if(r in vt)return vt[r](e)},has(t,r){return r in t||r in vt}})):e.proxy}function Oo(e){return z(e)&&"__vccOpts"in e}const Ns=(e,t)=>Ti(e,t,St),Do="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Lr;const xn=typeof window<"u"&&window.trustedTypes;if(xn)try{Lr=xn.createPolicy("vue",{createHTML:e=>e})}catch{}const Os=Lr?e=>Lr.createHTML(e):e=>e,Ro="http://www.w3.org/2000/svg",Fo="http://www.w3.org/1998/Math/MathML",Se=typeof document<"u"?document:null,bn=Se&&Se.createElement("template"),Io={insert:(e,t,r)=>{t.insertBefore(e,r||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,r,n)=>{const s=t==="svg"?Se.createElementNS(Ro,e):t==="mathml"?Se.createElementNS(Fo,e):r?Se.createElement(e,{is:r}):Se.createElement(e);return e==="select"&&n&&n.multiple!=null&&s.setAttribute("multiple",n.multiple),s},createText:e=>Se.createTextNode(e),createComment:e=>Se.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Se.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,r,n,s,i){const o=r?r.previousSibling:t.lastChild;if(s&&(s===i||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),r),!(s===i||!(s=s.nextSibling)););else{bn.innerHTML=Os(n==="svg"?`<svg>${e}</svg>`:n==="mathml"?`<math>${e}</math>`:e);const a=bn.content;if(n==="svg"||n==="mathml"){const u=a.firstChild;for(;u.firstChild;)a.appendChild(u.firstChild);a.removeChild(u)}t.insertBefore(a,r)}return[o?o.nextSibling:t.firstChild,r?r.previousSibling:t.lastChild]}},Vo=Symbol("_vtc");function jo(e,t,r){const n=e[Vo];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?e.removeAttribute("class"):r?e.setAttribute("class",t):e.className=t}const $t=Symbol("_vod"),Ds=Symbol("_vsh"),Bo={beforeMount(e,{value:t},{transition:r}){e[$t]=e.style.display==="none"?"":e.style.display,r&&t?r.beforeEnter(e):_t(e,t)},mounted(e,{value:t},{transition:r}){r&&t&&r.enter(e)},updated(e,{value:t,oldValue:r},{transition:n}){!t!=!r&&(n?t?(n.beforeEnter(e),_t(e,!0),n.enter(e)):n.leave(e,()=>{_t(e,!1)}):_t(e,t))},beforeUnmount(e,{value:t}){_t(e,t)}};function _t(e,t){e.style.display=t?e[$t]:"none",e[Ds]=!t}const Uo=Symbol(""),Ho=/(^|;)\s*display\s*:/;function Xo(e,t,r){const n=e.style,s=K(r);let i=!1;if(r&&!s){if(t)if(K(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();r[a]==null&&jt(n,a,"")}else for(const o in t)r[o]==null&&jt(n,o,"");for(const o in r)o==="display"&&(i=!0),jt(n,o,r[o])}else if(s){if(t!==r){const o=n[Uo];o&&(r+=";"+o),n.cssText=r,i=Ho.test(r)}}else t&&e.removeAttribute("style");$t in e&&(e[$t]=i?n.display:"",e[Ds]&&(n.display="none"))}const yn=/\s*!important$/;function jt(e,t,r){if(P(r))r.forEach(n=>jt(e,t,n));else if(r==null&&(r=""),t.startsWith("--"))e.setProperty(t,r);else{const n=Go(e,t);yn.test(r)?e.setProperty(Ye(n),r.replace(yn,""),"important"):e[n]=r}}const vn=["Webkit","Moz","ms"],gr={};function Go(e,t){const r=gr[t];if(r)return r;let n=Re(t);if(n!=="filter"&&n in e)return gr[t]=n;n=On(n);for(let s=0;s<vn.length;s++){const i=vn[s]+n;if(i in e)return gr[t]=i}return t}const kn="http://www.w3.org/1999/xlink";function Tn(e,t,r,n,s,i=Ws(t)){n&&t.startsWith("xlink:")?r==null?e.removeAttributeNS(kn,t.slice(6,t.length)):e.setAttributeNS(kn,t,r):r==null||i&&!Rn(r)?e.removeAttribute(t):e.setAttribute(t,i?"":Fe(r)?String(r):r)}function wn(e,t,r,n,s){if(t==="innerHTML"||t==="textContent"){r!=null&&(e[t]=t==="innerHTML"?Os(r):r);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,u=r==null?e.type==="checkbox"?"on":"":String(r);(a!==u||!("_value"in e))&&(e.value=u),r==null&&e.removeAttribute(t),e._value=r;return}let o=!1;if(r===""||r==null){const a=typeof e[t];a==="boolean"?r=Rn(r):r==null&&a==="string"?(r="",o=!0):a==="number"&&(r=0,o=!0)}try{e[t]=r}catch{}o&&e.removeAttribute(s||t)}function rt(e,t,r,n){e.addEventListener(t,r,n)}function Ko(e,t,r,n){e.removeEventListener(t,r,n)}const qn=Symbol("_vei");function $o(e,t,r,n,s=null){const i=e[qn]||(e[qn]={}),o=i[t];if(n&&o)o.value=n;else{const[a,u]=Wo(t);if(n){const m=i[t]=Yo(n,s);rt(e,a,m,u)}else o&&(Ko(e,a,o,u),i[t]=void 0)}}const Cn=/(?:Once|Passive|Capture)$/;function Wo(e){let t;if(Cn.test(e)){t={};let n;for(;n=e.match(Cn);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Ye(e.slice(2)),t]}let xr=0;const Jo=Promise.resolve(),Qo=()=>xr||(Jo.then(()=>xr=0),xr=Date.now());function Yo(e,t){const r=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=r.attached)return;qe(Zo(n,r.value),t,5,[n])};return r.value=e,r.attached=Qo(),r}function Zo(e,t){if(P(t)){const r=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{r.call(e),e._stopped=!0},t.map(n=>s=>!s._stopped&&n&&n(s))}else return t}const Sn=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,ea=(e,t,r,n,s,i)=>{const o=s==="svg";t==="class"?jo(e,n,o):t==="style"?Xo(e,r,n):Wt(t)?Ar(t)||$o(e,t,r,n,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):ta(e,t,n,o))?(wn(e,t,n),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Tn(e,t,n,o,i,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!K(n))?wn(e,Re(t),n,i,t):(t==="true-value"?e._trueValue=n:t==="false-value"&&(e._falseValue=n),Tn(e,t,n,o))};function ta(e,t,r,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in e&&Sn(t)&&z(r));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Sn(t)&&K(r)?!1:t in e}const En=e=>{const t=e.props["onUpdate:modelValue"]||!1;return P(t)?r=>Ft(t,r):t};function ra(e){e.target.composing=!0}function Pn(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const br=Symbol("_assign"),na={created(e,{modifiers:{lazy:t,trim:r,number:n}},s){e[br]=En(s);const i=n||s.props&&s.props.type==="number";rt(e,t?"change":"input",o=>{if(o.target.composing)return;let a=e.value;r&&(a=a.trim()),i&&(a=yr(a)),e[br](a)}),r&&rt(e,"change",()=>{e.value=e.value.trim()}),t||(rt(e,"compositionstart",ra),rt(e,"compositionend",Pn),rt(e,"change",Pn))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:r,modifiers:{lazy:n,trim:s,number:i}},o){if(e[br]=En(o),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?yr(e.value):e.value,u=t??"";a!==u&&(document.activeElement===e&&e.type!=="range"&&(n&&t===r||s&&e.value.trim()===u)||(e.value=u))}},sa=ne({patchProp:ea},Io);let zn;function ia(){return zn||(zn=lo(sa))}const oa=(...e)=>{const t=ia().createApp(...e),{mount:r}=t;return t.mount=n=>{const s=la(n);if(!s)return;const i=t._component;!z(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=r(s,!1,aa(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t};function aa(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function la(e){return K(e)?document.querySelector(e):e}const ua=(e,t)=>{const r=e.__vccOpts||e;for(const[n,s]of t)r[n]=s;return r},ca={class:"nlp-course-app"},pa={class:"search-container"},da={key:0,class:"no-results"},ma={key:1,class:"function-list"},fa=["onClick"],_a={class:"library-tag"},ha={class:"function-name"},ga={class:"toggle-icon"},xa={class:"item-details"},ba={class:"explanation"},ya={class:"language-python"},va={key:0,class:"nltk-note"},ka={key:1,class:"spacy-note"},Ta={key:2,class:"haystack-note"},wa={key:3,class:"matplotlib-note"},qa={key:4,class:"colorama-note"},Ca={key:5,class:"displacy-note"},Sa={__name:"App",setup(e){const t=nn([{library:"requests",name:"get()",explanation:"Effectue une requête HTTP GET pour récupérer le contenu d'une URL. Utile pour télécharger des données textuelles depuis le web.",example:`import requests

url = 'https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/index.xml' # Exemple d'URL
try:
    response = requests.get(url)
    response.raise_for_status() # Lève une exception pour les erreurs HTTP (4xx ou 5xx)
    print(f"Contenu récupéré (premiers 200 caractères):\\n{response.text[:200]}...")
except requests.exceptions.RequestException as e:
    print(f"Erreur lors de la requête: {e}")`,isExpanded:!1},{library:"re",name:"sub()",explanation:"Remplace les occurrences d'un motif (pattern) dans une chaîne de caractères par une autre chaîne.",example:`import re

text = "Le chat est sur le tapis. Le chat dort."
pattern = r"chat"
replacement = "chien"

new_text = re.sub(pattern, replacement, text, flags=re.IGNORECASE) # Ignore la casse
print(f"Texte original: {text}")
print(f"Texte modifié: {new_text}")
# Output: Texte modifié: Le chien est sur le tapis. Le chien dort.`,isExpanded:!1},{library:"re",name:"search()",explanation:"Cherche la *première* occurrence d'un motif dans une chaîne et retourne un objet 'match' si trouvé, sinon None.",example:`import re

text = "Contactez-nous au 01-23-45-67-89 ou à info@example.com."
pattern = r"\\d{2}-\\d{2}-\\d{2}-\\d{2}-\\d{2}" # Motif pour un numéro de téléphone FR

match = re.search(pattern, text)

if match:
    print(f"Numéro de téléphone trouvé: {match.group(0)}")
    print(f"Position: {match.span()}")
else:
    print("Aucun numéro de téléphone trouvé.")`,isExpanded:!1},{library:"re",name:"split()",explanation:"Divise une chaîne de caractères en une liste de sous-chaînes en utilisant un motif comme délimiteur.",example:`import re

text = "Mot1, Mot2; Mot3 Mot4:Mot5"
# Sépare par virgule, point-virgule, espace ou deux-points
delimiters = r"[,;\\s:]+"

words = re.split(delimiters, text)
print(f"Texte original: {text}")
print(f"Mots séparés: {words}")
# Output: Mots séparés: ['Mot1', 'Mot2', 'Mot3', 'Mot4', 'Mot5']`,isExpanded:!1},{library:"re",name:"findall()",explanation:"Trouve *toutes* les occurrences non chevauchantes d'un motif dans une chaîne et les retourne sous forme de liste de chaînes.",example:`import re

text = "Les emails sont a@b.com et x@y.net, mais pas z@domain."
# Motif simple pour une adresse email
pattern = r"\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b"

emails = re.findall(pattern, text)
print(f"Emails trouvés: {emails}")
# Output: Emails trouvés: ['a@b.com', 'x@y.net']`,isExpanded:!1},{library:"nltk",name:"word_tokenize()",explanation:"Segmente une chaîne de caractères (phrase ou texte) en une liste de mots (tokens). Nécessite le téléchargement de 'punkt' (`nltk.download('punkt')`).",example:`import nltk
# nltk.download('punkt') # Décommenter si nécessaire

text = "NLTK est une bibliothèque puissante pour le NLP."
tokens = nltk.word_tokenize(text, language='french') # Spécifier la langue
print(f"Texte: {text}")
print(f"Tokens: {tokens}")
# Output: Tokens: ['NLTK', 'est', 'une', 'bibliothèque', 'puissante', 'pour', 'le', 'NLP', '.']`,isExpanded:!1},{library:"nltk",name:"sent_tokenize()",explanation:"Segmente un texte en une liste de phrases. Nécessite le téléchargement de 'punkt' (`nltk.download('punkt')`).",example:`import nltk
# nltk.download('punkt') # Décommenter si nécessaire

text = "Bonjour le monde. Comment allez-vous aujourd'hui? J'espère que bien."
sentences = nltk.sent_tokenize(text, language='french')
print(f"Texte: {text}")
print(f"Phrases: {sentences}")
# Output: Phrases: ['Bonjour le monde.', 'Comment allez-vous aujourd'hui?', "J'espère que bien."]`,isExpanded:!1},{library:"nltk",name:"Text()",explanation:"Crée un objet NLTK Text à partir d'une liste de tokens. Permet d'utiliser des méthodes utiles comme concordance(), similar(), etc.",example:`import nltk
# nltk.download('punkt') # Décommenter si nécessaire

text_string = "Le traitement automatique du langage naturel (TALN), ou NLP en anglais, est un domaine fascinant du langage."
tokens = nltk.word_tokenize(text_string.lower(), language='french')
text_obj = nltk.Text(tokens)

print("Concordance du mot 'langage':")
text_obj.concordance("langage")
# Output:
# Displaying 2 of 2 matches:
# le traitement automatique du langage naturel ( taln ) , ou nlp en an
# st un domaine fascinant du langage .`,isExpanded:!1},{library:"nltk",name:"FreqDist()",explanation:"Calcule la distribution de fréquence des éléments dans une liste (souvent des tokens).",example:`import nltk
# nltk.download('punkt') # Décommenter si nécessaire

text = "le chat mange la souris et le chien regarde le chat"
tokens = nltk.word_tokenize(text)
fdist = nltk.FreqDist(tokens)

print(f"Tokens: {tokens}")
print(f"Fréquences: {fdist}")
print(f"Mot le plus fréquent: {fdist.max()}")
print(f"Fréquence de 'chat': {fdist['chat']}")
# Output:
# Fréquences: <FreqDist with 8 samples and 10 outcomes>
# Mot le plus fréquent: le
# Fréquence de 'chat': 2`,isExpanded:!1},{library:"nltk",name:"ConditionalFreqDist()",explanation:"Calcule une distribution de fréquence conditionnée par un contexte. Utile pour les modèles de langue simples ou l'analyse de bigrammes.",example:`import nltk
# nltk.download('genesis') # Exemple avec la Genèse
# nltk.download('punkt')

from nltk.corpus import genesis

# Mots de la Genèse en anglais
words = genesis.words('english-web.txt')

# Bigrammes (paires de mots consécutifs)
bigrams = list(nltk.bigrams(words))

# Distribution conditionnelle: P(mot | mot_précédent)
cfd = nltk.ConditionalFreqDist(bigrams)

print("Mots qui suivent 'living':")
print(list(cfd['living'])) # Affiche les mots possibles après 'living'

print("\\nFréquence des mots suivant 'living':")
print(cfd['living'].most_common(5)) # Les 5 mots les plus fréquents après 'living'`,isExpanded:!1},{library:"nltk",name:"ngrams()",explanation:"Génère des séquences de n éléments consécutifs (n-grammes) à partir d'une séquence d'entrée (souvent des tokens).",example:`import nltk
# nltk.download('punkt')

text = "un exemple simple de n-grammes"
tokens = nltk.word_tokenize(text)

bigrams = list(nltk.ngrams(tokens, 2))
trigrams = list(nltk.ngrams(tokens, 3))

print(f"Tokens: {tokens}")
print(f"Bigrammes (n=2): {bigrams}")
print(f"Trigrammes (n=3): {trigrams}")
# Output:
# Bigrammes (n=2): [('un', 'exemple'), ('exemple', 'simple'), ('simple', 'de'), ('de', 'n-grammes')]
# Trigrammes (n=3): [('un', 'exemple', 'simple'), ('exemple', 'simple', 'de'), ('simple', 'de', 'n-grammes')]`,isExpanded:!1},{library:"nltk.stem",name:"PorterStemmer()",explanation:"Applique l'algorithme de stemming de Porter pour réduire les mots à leur racine (stem). C'est un algorithme assez ancien et agressif.",example:`from nltk.stem import PorterStemmer

stemmer = PorterStemmer()
words = ["running", "flies", "happily", "computation", "national"]
stems = [stemmer.stem(word) for word in words]

print(f"Mots originaux: {words}")
print(f"Stems (Porter): {stems}")
# Output: Stems (Porter): ['run', 'fli', 'happili', 'comput', 'nation']`,isExpanded:!1},{library:"nltk.stem",name:"LancasterStemmer()",explanation:"Applique l'algorithme de stemming de Lancaster, encore plus agressif que Porter.",example:`from nltk.stem import LancasterStemmer

stemmer = LancasterStemmer()
words = ["running", "flies", "happily", "computation", "national"]
stems = [stemmer.stem(word) for word in words]

print(f"Mots originaux: {words}")
print(f"Stems (Lancaster): {stems}")
# Output: Stems (Lancaster): ['run', 'fli', 'happy', 'comput', 'nat']`,isExpanded:!1},{library:"nltk.stem",name:"WordNetLemmatizer()",explanation:"Réduit les mots à leur forme de base ou lemme, en utilisant la base de données WordNet. Plus précis que le stemming car il produit des mots réels. Nécessite 'wordnet' (`nltk.download('wordnet')`). Peut nécessiter de spécifier le POS tag pour être efficace.",example:`from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet # Pour les constantes POS
# nltk.download('wordnet')
# nltk.download('omw-1.4') # Open Multilingual Wordnet, pour certaines langues

lemmatizer = WordNetLemmatizer()
words = ["running", "flies", "happily", "computation", "better", "geese"]

# Lemmatisation sans POS tag (par défaut nom 'n')
lemmas_default = [lemmatizer.lemmatize(word) for word in words]

# Lemmatisation avec POS tag (v=verbe, a=adjectif, n=nom, r=adverbe)
lemmas_pos = [
    lemmatizer.lemmatize("running", pos=wordnet.VERB), # v
    lemmatizer.lemmatize("flies", pos=wordnet.VERB),   # v
    lemmatizer.lemmatize("happily", pos=wordnet.ADV),  # r
    lemmatizer.lemmatize("computation", pos=wordnet.NOUN), # n
    lemmatizer.lemmatize("better", pos=wordnet.ADJ),  # a
    lemmatizer.lemmatize("geese", pos=wordnet.NOUN)    # n
]


print(f"Mots originaux: {words}")
print(f"Lemmes (défaut): {lemmas_default}")
print(f"Lemmes (avec POS): {lemmas_pos}")
# Output:
# Lemmes (défaut): ['running', 'fly', 'happily', 'computation', 'better', 'goose']
# Lemmes (avec POS): ['run', 'fly', 'happily', 'computation', 'good', 'goose']`,isExpanded:!1},{library:"nltk",name:"pos_tag()",explanation:"Attribue une étiquette de partie du discours (Part-of-Speech, POS) à chaque mot d'une séquence de tokens. Nécessite 'averaged_perceptron_tagger' (`nltk.download('averaged_perceptron_tagger')`).",example:`import nltk
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

text = "And now for something completely different"
tokens = nltk.word_tokenize(text)
pos_tags = nltk.pos_tag(tokens)

print(f"Tokens: {tokens}")
print(f"POS Tags: {pos_tags}")
# Output: POS Tags: [('And', 'CC'), ('now', 'RB'), ('for', 'IN'), ('something', 'NN'), ('completely', 'RB'), ('different', 'JJ')]
# CC: Conj Coordonnée, RB: Adverbe, IN: Préposition, NN: Nom singulier, JJ: Adjectif`,isExpanded:!1},{library:"nltk.chunk",name:"RegexpParser()",explanation:"Analyse superficielle (chunking) basée sur des expressions régulières appliquées aux séquences de POS tags pour identifier des groupes syntaxiques (ex: groupes nominaux).",example:`import nltk
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

text = "The little yellow dog barked at the cat."
tokens = nltk.word_tokenize(text)
pos_tags = nltk.pos_tag(tokens)

# Grammaire pour trouver les Groupes Nominaux (NP)
# NP: (Optionnel) Déterminant (DT), (0 ou +) Adjectif (JJ), Nom (NN)
grammar = "NP: {<DT>?<JJ>*<NN>}"

cp = nltk.RegexpParser(grammar)
tree = cp.parse(pos_tags)

print(f"POS Tags: {pos_tags}")
print("\\nArbre de chunking:")
print(tree)
# tree.draw() # Ouvre une fenêtre graphique si Tkinter est installé

# Output (texte):
# Arbre de chunking:
# (S
#   (NP The/DT little/JJ yellow/JJ dog/NN)
#   barked/VBD
#   at/IN
#   (NP the/DT cat/NN)
#   ./.)`,isExpanded:!1},{library:"nltk.classify",name:"MaxentClassifier / NaiveBayesClassifier",explanation:"Classifieurs NLTK. NaiveBayes est simple et rapide, Maxent (Maximum Entropy) est plus complexe mais potentiellement plus précis. Ils nécessitent des données d'entraînement sous forme de `(featureset, label)`. L'exemple montre NaiveBayes.",example:`import nltk
from nltk.classify import NaiveBayesClassifier
# nltk.download('names')
from nltk.corpus import names
import random

# Fonction pour extraire une feature simple (dernière lettre)
def gender_features(word):
    return {'last_letter': word[-1]}

# Préparer les données : (feature_dict, label)
male_names = [(gender_features(name), 'male') for name in names.words('male.txt')]
female_names = [(gender_features(name), 'female') for name in names.words('female.txt')]
labeled_names = male_names + female_names
random.shuffle(labeled_names)

# Séparer train/test
train_set = labeled_names[500:]
test_set = labeled_names[:500]

# Entraîner le classifieur
classifier = NaiveBayesClassifier.train(train_set)

# Tester
accuracy = nltk.classify.accuracy(classifier, test_set)
print(f"Précision du classifieur NaiveBayes (sur la dernière lettre): {accuracy:.2f}")

# Classifier un nouveau nom
print(f"Classification pour 'Neo': {classifier.classify(gender_features('Neo'))}")
print(f"Classification pour 'Trinity': {classifier.classify(gender_features('Trinity'))}")

# Afficher les features les plus informatives
classifier.show_most_informative_features(5)`,isExpanded:!1},{library:"nltk.corpus",name:"movie_reviews",explanation:"Corpus NLTK contenant 2000 critiques de films (1000 positives, 1000 négatives), classées par sentiment. Utile pour l'entraînement et l'évaluation de classifieurs de sentiment. Nécessite `nltk.download('movie_reviews')`.",example:`import nltk
# nltk.download('movie_reviews')
from nltk.corpus import movie_reviews
import random

# Lister les IDs des fichiers (critiques)
documents_ids = movie_reviews.fileids() # ['neg/cv000_29416.txt', 'neg/cv001_19502.txt', ...]
print(f"Nombre total de critiques: {len(documents_ids)}")

# Accéder au texte brut d'une critique
example_id = random.choice(documents_ids)
print(f"\\nExemple de critique ({example_id}):")
print(movie_reviews.raw(example_id)[:200] + "...")

# Accéder aux mots d'une critique
print(f"\\nMots de la critique {example_id} (10 premiers):")
print(movie_reviews.words(example_id)[:10])

# Obtenir les critiques par catégorie (pos/neg)
positive_ids = movie_reviews.fileids('pos')
negative_ids = movie_reviews.fileids('neg')
print(f"\\nNombre de critiques positives: {len(positive_ids)}")
print(f"Nombre de critiques négatives: {len(negative_ids)}")`,isExpanded:!1},{library:"nltk.corpus",name:"cmudict",explanation:"Dictionnaire de prononciation CMU pour les mots anglais, donnant la transcription phonétique. Nécessite `nltk.download('cmudict')`.",example:`import nltk
# nltk.download('cmudict')
from nltk.corpus import cmudict

prondict = cmudict.dict()

word = "natural"
try:
    pronunciations = prondict[word]
    print(f"Prononciations possibles pour '{word}':")
    for pron in pronunciations:
        print(f"- {' '.join(pron)}")
except KeyError:
    print(f"Le mot '{word}' n'est pas dans le dictionnaire CMU.")

# Exemple avec un mot ayant plusieurs prononciations
word2 = "read" # Peut être lu /riːd/ (présent) ou /rɛd/ (passé)
print(f"\\nPrononciations possibles pour '{word2}':")
for pron in prondict[word2]:
    print(f"- {' '.join(pron)}")

# Output:
# Prononciations possibles pour 'natural':
# - N AE1 CH ER0 AH0 L
# - N AE1 CH R AH0 L
#
# Prononciations possibles pour 'read':
# - R EH1 D
# - R IY1 D`,isExpanded:!1},{library:"nltk.corpus",name:"stopwords",explanation:"Fournit des listes de mots vides (stop words) pour différentes langues. Ce sont des mots courants (comme 'le', 'est', 'un') souvent filtrés lors du prétraitement de texte. Nécessite `nltk.download('stopwords')`.",example:`import nltk
# nltk.download('stopwords')
from nltk.corpus import stopwords

# Stopwords en anglais
stop_words_en = set(stopwords.words('english'))
print(f"Quelques stopwords anglais: {list(stop_words_en)[:15]}...")
print(f"Nombre total: {len(stop_words_en)}")

# Stopwords en français
try:
    stop_words_fr = set(stopwords.words('french'))
    print(f"\\nQuelques stopwords français: {list(stop_words_fr)[:15]}...")
    print(f"Nombre total: {len(stop_words_fr)}")

    # Exemple de filtrage
    text = "Ceci est une phrase exemple pour montrer le filtrage des mots vides."
    tokens = nltk.word_tokenize(text.lower(), language='french')
    filtered_tokens = [word for word in tokens if word.isalpha() and word not in stop_words_fr]
    print(f"\\nTokens originaux: {tokens}")
    print(f"Tokens filtrés: {filtered_tokens}")

except OSError:
    print("\\nLes stopwords français ne semblent pas téléchargés.")
    print("Exécutez nltk.download('stopwords')")

# Output (si français téléchargé):
# Quelques stopwords français: ['eussions', 'toi', 'eûmes', 'ils', 'eût', 'fûtes', 'lui', 'seront', 'ayantes', 'serais', 'soient', 'étante', 'tes', 'sa', 'étants']...
# Nombre total: 157
# Tokens filtrés: ['ceci', 'phrase', 'exemple', 'montrer', 'filtrage', 'mots', 'vides']`,isExpanded:!1},{library:"sklearn.feature_extraction.text",name:"TfidfVectorizer",explanation:"Convertit une collection de documents textuels bruts en une matrice de caractéristiques TF-IDF (Term Frequency-Inverse Document Frequency).",example:`from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [
    'Le traitement du langage naturel est passionnant.',
    'Le langage naturel est partout.',
    'Scikit-learn rend le NLP plus facile.',
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)

print("Corpus:")
for doc in corpus: print(f"- {doc}")

print("\\nNoms des features (vocabulaire):")
print(vectorizer.get_feature_names_out())

print("\\nMatrice TF-IDF (dense):")
print(tfidf_matrix.toarray().round(2))`,isExpanded:!1},{library:"sklearn.feature_extraction.text",name:"CountVectorizer",explanation:"Convertit une collection de documents textuels bruts en une matrice de comptages de tokens (fréquence brute).",example:`from sklearn.feature_extraction.text import CountVectorizer

corpus = [
    'Chat chat chien',
    'Chien oiseau',
    'Chat oiseau chat',
]

vectorizer = CountVectorizer()
count_matrix = vectorizer.fit_transform(corpus)

print("Corpus:")
for doc in corpus: print(f"- {doc}")

print("\\nNoms des features (vocabulaire):")
print(vectorizer.get_feature_names_out())

print("\\nMatrice de comptage (dense):")
print(count_matrix.toarray())
# Output:
# Matrice de comptage (dense):
# [[2 1 0]  # chat=2, chien=1, oiseau=0
#  [0 1 1]  # chat=0, chien=1, oiseau=1
#  [2 0 1]] # chat=2, chien=0, oiseau=1`,isExpanded:!1},{library:"sklearn.decomposition",name:"LatentDirichletAllocation",explanation:"Modèle de topic modeling (modélisation de sujets) basé sur l'Allocation Latente de Dirichlet. Permet de découvrir des sujets thématiques abstraits dans une collection de documents.",example:`from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import numpy as np

# Données d'exemple très simplifiées
corpus = [
    "sport football match équipe but",
    "politique élection gouvernement vote loi",
    "sport basketball panier joueur score",
    "politique débat parlement président discours",
    "sport tennis balle raquette tournoi",
    "technologie ordinateur code programmation logiciel"
]

n_topics = 3 # Nombre de sujets à découvrir

# 1. Vectoriser les données
vectorizer = CountVectorizer(max_df=0.95, min_df=1, stop_words=None) # Pas de stopwords ici
X = vectorizer.fit_transform(corpus)
feature_names = vectorizer.get_feature_names_out()

# 2. Appliquer LDA
lda = LatentDirichletAllocation(n_components=n_topics, random_state=0)
lda.fit(X)

# 3. Afficher les mots clés pour chaque sujet
def print_top_words(model, feature_names, n_top_words):
    for topic_idx, topic in enumerate(model.components_):
        message = f"Sujet #{topic_idx}: "
        message += " ".join([feature_names[i]
                             for i in topic.argsort()[:-n_top_words - 1:-1]])
        print(message)

print(f"Top mots pour {n_topics} sujets découverts par LDA:")
print_top_words(lda, feature_names, 5)`,isExpanded:!1},{library:"sklearn.model_selection",name:"train_test_split",explanation:"Divise des jeux de données (features X et labels y) en sous-ensembles aléatoires d'entraînement et de test.",example:`from sklearn.model_selection import train_test_split
import numpy as np

# Exemple de données (10 points, 2 features)
X = np.arange(20).reshape((10, 2))
# Exemple de labels (10 labels binaires)
y = np.array([0, 1, 0, 1, 1, 0, 0, 1, 0, 1])

# Division 70% train, 30% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y # stratify pour garder proportions des classes
)

print("Dimensions de X:", X.shape)
print("Dimensions de y:", y.shape)
print("\\nDimensions X_train:", X_train.shape)
print("Dimensions X_test:", X_test.shape)
print("Dimensions y_train:", y_train.shape)
print("Dimensions y_test:", y_test.shape)

print("\\ny_train:", y_train)
print("y_test:", y_test)`,isExpanded:!1},{library:"sklearn.ensemble",name:"RandomForestClassifier",explanation:"Classifieur basé sur un ensemble d'arbres de décision (forêt aléatoire). Robuste et performant sur de nombreux problèmes.",example:`from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification # Génère des données synthétiques
from sklearn.metrics import accuracy_score

# Générer des données de classification
X, y = make_classification(n_samples=1000, n_features=20, n_informative=15,
                           n_redundant=5, random_state=42, n_classes=2)

# Diviser les données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer et entraîner le modèle
rf_clf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1) # 100 arbres, utilise tous les CPU
rf_clf.fit(X_train, y_train)

# Faire des prédictions
y_pred = rf_clf.predict(X_test)

# Évaluer
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision de RandomForestClassifier: {accuracy:.4f}")`,isExpanded:!1},{library:"sklearn.tree",name:"DecisionTreeClassifier",explanation:"Classifieur basé sur un unique arbre de décision. Simple à interpréter mais peut être sujet au surapprentissage (overfitting).",example:`from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris # Jeu de données Iris
from sklearn.metrics import accuracy_score

# Charger les données Iris
iris = load_iris()
X, y = iris.data, iris.target

# Diviser les données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer et entraîner le modèle
dt_clf = DecisionTreeClassifier(max_depth=3, random_state=42) # Limiter la profondeur pour éviter overfitting
dt_clf.fit(X_train, y_train)

# Faire des prédictions
y_pred = dt_clf.predict(X_test)

# Évaluer
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision de DecisionTreeClassifier (profondeur 3): {accuracy:.4f}")

# On peut aussi visualiser l'arbre (nécessite graphviz et matplotlib)
# from sklearn.tree import plot_tree
# import matplotlib.pyplot as plt
# plt.figure(figsize=(12,8))
# plot_tree(dt_clf, filled=True, feature_names=iris.feature_names, class_names=iris.target_names)
# plt.show()`,isExpanded:!1},{library:"sklearn.naive_bayes",name:"MultinomialNB",explanation:"Classifieur Naive Bayes adapté aux données discrètes, comme les comptages de mots (utilisé souvent avec CountVectorizer ou TF-IDF).",example:`from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import fetch_20newsgroups # Jeu de données textuelles

# Charger une partie du jeu de données 20 Newsgroups
categories = ['alt.atheism', 'soc.religion.christian', 'comp.graphics', 'sci.med']
newsgroups_train = fetch_20newsgroups(subset='train', categories=categories, shuffle=True, random_state=42)
newsgroups_test = fetch_20newsgroups(subset='test', categories=categories, shuffle=True, random_state=42)

# Vectoriser le texte
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(newsgroups_train.data)
X_test = vectorizer.transform(newsgroups_test.data)
y_train = newsgroups_train.target
y_test = newsgroups_test.target

# Créer et entraîner le modèle
mnb_clf = MultinomialNB()
mnb_clf.fit(X_train, y_train)

# Prédire et évaluer
y_pred = mnb_clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision de MultinomialNB sur 20 Newsgroups: {accuracy:.4f}")`,isExpanded:!1},{library:"sklearn.linear_model",name:"LogisticRegression",explanation:"Modèle linéaire pour la classification binaire ou multi-classe. Malgré son nom, c'est un modèle de classification.",example:`from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler # Important pour LogisticRegression

# Charger les données Iris
iris = load_iris()
X, y = iris.data, iris.target

# Diviser les données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Mettre à l'échelle les features (important pour LogReg)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Créer et entraîner le modèle
log_reg = LogisticRegression(solver='liblinear', random_state=42) # Liblinear bon pour petits datasets
log_reg.fit(X_train_scaled, y_train)

# Prédire et évaluer
y_pred = log_reg.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision de LogisticRegression sur Iris (scaled): {accuracy:.4f}")`,isExpanded:!1},{library:"sklearn.ensemble",name:"VotingClassifier",explanation:"Combine plusieurs modèles de classification différents et prédit la classe basée sur un vote majoritaire (hard voting) or la moyenne des probabilités prédites (soft voting).",example:`from sklearn.ensemble import VotingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC # Support Vector Classifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_moons # Données non linéairement séparables
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

# Générer des données
X, y = make_moons(n_samples=500, noise=0.30, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Mise à l'échelle pour LogReg et SVC
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Définir les classifieurs individuels
log_clf = LogisticRegression(solver="liblinear", random_state=42)
rnd_clf = RandomForestClassifier(n_estimators=100, random_state=42)
svm_clf = SVC(gamma="scale", probability=True, random_state=42) # probability=True pour soft voting

# Créer le VotingClassifier (soft voting)
# Note: LogReg et SVC utilisent les données scalées, RF non (mais on peut créer un Pipeline)
# Simplification: on utilise les données scalées pour tous ici (pas idéal pour RF)
voting_clf = VotingClassifier(
    estimators=[('lr', log_clf), ('rf', rnd_clf), ('svc', svm_clf)],
    voting='soft' # 'hard' pour vote majoritaire simple
)

# Entraîner le VotingClassifier
voting_clf.fit(X_train_scaled, y_train)

# Évaluer chaque classifieur et le voting classifier
for clf in (log_clf, rnd_clf, svm_clf, voting_clf):
    clf.fit(X_train_scaled, y_train) # Ré-entrainer juste pour être sûr
    y_pred = clf.predict(X_test_scaled)
    print(f"{clf.__class__.__name__} accuracy: {accuracy_score(y_test, y_pred):.4f}")`,isExpanded:!1},{library:"sklearn.linear_model",name:"LinearRegression",explanation:"Modèle de régression linéaire simple (Moindres Carrés Ordinaires). Prédit une valeur continue.",example:`from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_regression # Génère données de régression
from sklearn.metrics import mean_squared_error
import numpy as np

# Générer des données de régression
X, y = make_regression(n_samples=100, n_features=1, noise=10, random_state=42)

# Diviser
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer et entraîner
lin_reg = LinearRegression()
lin_reg.fit(X_train, y_train)

# Prédire
y_pred = lin_reg.predict(X_test)

# Évaluer (Mean Squared Error)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"Coefficient (pente): {lin_reg.coef_[0]:.2f}")
print(f"Intercept: {lin_reg.intercept_:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")`,isExpanded:!1},{library:"sklearn.linear_model",name:"Lasso",explanation:"Modèle de régression linéaire avec régularisation L1. Tendance à mettre certains coefficients à zéro, effectuant ainsi une sélection de features.",example:`from sklearn.linear_model import Lasso
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error
import numpy as np

# Générer des données (avec plus de features pour voir la sélection)
X, y = make_regression(n_samples=100, n_features=10, n_informative=5, noise=15, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer et entraîner (alpha contrôle la force de régularisation)
lasso_reg = Lasso(alpha=1.0, random_state=42) # alpha=1.0 est une valeur commune pour commencer
lasso_reg.fit(X_train, y_train)

# Prédire
y_pred = lasso_reg.predict(X_test)

# Évaluer
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"Nombre de features utilisées (coefficients non nuls): {np.sum(lasso_reg.coef_ != 0)} / {X.shape[1]}")
print(f"Coefficients Lasso: {np.round(lasso_reg.coef_, 2)}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")`,isExpanded:!1},{library:"sklearn.ensemble",name:"RandomForestRegressor",explanation:"Modèle de régression basé sur un ensemble d'arbres de décision (forêt aléatoire). Version régression de RandomForestClassifier.",example:`from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error
import numpy as np

# Générer des données
X, y = make_regression(n_samples=500, n_features=5, n_informative=3, noise=20, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer et entraîner
rf_reg = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
rf_reg.fit(X_train, y_train)

# Prédire
y_pred = rf_reg.predict(X_test)

# Évaluer
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"Random Forest Regressor RMSE: {rmse:.2f}")`,isExpanded:!1},{library:"sklearn.metrics",name:"accuracy_score()",explanation:"Calcule la précision (accuracy) en classification : (nombre de prédictions correctes) / (nombre total de prédictions).",example:`from sklearn.metrics import accuracy_score

y_true = [0, 1, 1, 0, 1, 0] # Vraies étiquettes
y_pred = [0, 1, 0, 0, 1, 1] # Prédictions du modèle

accuracy = accuracy_score(y_true, y_pred)
# Corrects: 0, 1, X, 0, 1, X -> 4 corrects sur 6
print(f"Vraies étiquettes: {y_true}")
print(f"Prédictions:       {y_pred}")
print(f"Accuracy: {accuracy:.4f}") # Output: 0.6667

# On peut aussi avoir le nombre de prédictions correctes
correct_predictions = accuracy_score(y_true, y_pred, normalize=False)
print(f"Nombre de prédictions correctes: {correct_predictions}") # Output: 4`,isExpanded:!1},{library:"sklearn.metrics",name:"precision_score()",explanation:"Calcule la précision (precision) : TP / (TP + FP). Parmi toutes les prédictions positives, quelle proportion était correcte ? Important quand les faux positifs coûtent cher.",example:`from sklearn.metrics import precision_score

y_true = [0, 1, 1, 0, 1, 0, 1] # Vraies étiquettes (4 positifs)
y_pred = [0, 1, 0, 0, 1, 1, 1] # Prédictions (4 positifs prédits)

# TP: 1 (pos 1), 1 (pos 4), 1 (pos 6) -> 3
# FP: 1 (pos 5) -> 1
# TN: 0 (pos 0), 0 (pos 3) -> 2
# FN: 1 (pos 2) -> 1

# Precision pour la classe 1 (par défaut)
# TP / (TP + FP) = 3 / (3 + 1) = 0.75
precision = precision_score(y_true, y_pred) # pos_label=1 par défaut
print(f"Vraies étiquettes: {y_true}")
print(f"Prédictions:       {y_pred}")
print(f"Precision (classe 1): {precision:.4f}") # Output: 0.75

# Precision pour la classe 0
# Vrai Négatifs (TN): 2 (indices 0, 3)
# Faux Négatifs (FN): 1 (indice 2 -> prédit 0 mais vrai 1)
# Vrai Positifs (TP pour classe 0): 2 (indices 0, 3)
# Faux Positifs (FP pour classe 0): 1 (indice 5 -> prédit 1 mais vrai 0)
# Precision(0) = TP(0) / (TP(0) + FP(0)) = 2 / (2 + 1) = 0.6667
precision_0 = precision_score(y_true, y_pred, pos_label=0)
print(f"Precision (classe 0): {precision_0:.4f}") # Output: 0.6667`,isExpanded:!1},{library:"sklearn.metrics",name:"recall_score()",explanation:"Calcule le rappel (recall) ou sensibilité : TP / (TP + FN). Parmi tous les exemples réellement positifs, quelle proportion a été correctement identifiée ? Important quand les faux négatifs coûtent cher.",example:`from sklearn.metrics import recall_score

y_true = [0, 1, 1, 0, 1, 0, 1] # Vraies étiquettes (4 positifs réels: 1, 2, 4, 6)
y_pred = [0, 1, 0, 0, 1, 1, 1] # Prédictions

# TP: 3 (indices 1, 4, 6)
# FN: 1 (indice 2 -> vrai 1, prédit 0)
# FP: 1 (indice 5 -> vrai 0, prédit 1)
# TN: 2 (indices 0, 3)

# Rappel pour la classe 1 (par défaut)
# TP / (TP + FN) = 3 / (3 + 1) = 0.75
recall = recall_score(y_true, y_pred) # pos_label=1 par défaut
print(f"Vraies étiquettes: {y_true}")
print(f"Prédictions:       {y_pred}")
print(f"Recall (classe 1): {recall:.4f}") # Output: 0.75

# Rappel pour la classe 0
# Vrai Négatifs (TN): 2 (indices 0, 3)
# Faux Positifs (FP pour classe 0): 1 (indice 5 -> vrai 0, prédit 1)
# TP(0) = TN = 2
# FN(0) = FP = 1
# Recall(0) = TP(0) / (TP(0) + FN(0)) = 2 / (2 + 1) = 0.6667
recall_0 = recall_score(y_true, y_pred, pos_label=0)
print(f"Recall (classe 0): {recall_0:.4f}") # Output: 0.6667`,isExpanded:!1},{library:"sklearn.metrics",name:"f1_score()",explanation:"Calcule le score F1, qui est la moyenne harmonique de la précision et du rappel : 2 * (Precision * Recall) / (Precision + Recall). C'est une bonne mesure globale quand on cherche un équilibre entre précision et rappel.",example:`from sklearn.metrics import f1_score, precision_score, recall_score

y_true = [0, 1, 1, 0, 1, 0, 1] # Vraies étiquettes
y_pred = [0, 1, 0, 0, 1, 1, 1] # Prédictions

# Precision = 0.75, Recall = 0.75 (calculés précédemment pour la classe 1)
f1 = f1_score(y_true, y_pred) # pos_label=1 par défaut

precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)

print(f"Vraies étiquettes: {y_true}")
print(f"Prédictions:       {y_pred}")
print(f"Precision (classe 1): {precision:.4f}")
print(f"Recall (classe 1):    {recall:.4f}")
print(f"F1 Score (classe 1):  {f1:.4f}") # Output: 0.75

# Vérification manuelle: 2 * (0.75 * 0.75) / (0.75 + 0.75) = 2 * 0.5625 / 1.5 = 1.125 / 1.5 = 0.75

# F1 Score pour la classe 0
f1_0 = f1_score(y_true, y_pred, pos_label=0)
print(f"F1 Score (classe 0):  {f1_0:.4f}") # Output: 0.6667`,isExpanded:!1},{library:"sklearn.metrics",name:"mean_squared_error()",explanation:"Calcule l'erreur quadratique moyenne (Mean Squared Error, MSE) en régression. C'est la moyenne des carrés des différences entre les valeurs prédites et les valeurs réelles.",example:`from sklearn.metrics import mean_squared_error
import numpy as np

y_true = [3, -0.5, 2, 7]  # Vraies valeurs
y_pred = [2.5, 0.0, 2, 8]  # Prédictions

mse = mean_squared_error(y_true, y_pred)

# Erreurs: (3-2.5)=0.5, (-0.5-0.0)=-0.5, (2-2)=0, (7-8)=-1
# Erreurs au carré: 0.25, 0.25, 0, 1
# Moyenne des carrés: (0.25 + 0.25 + 0 + 1) / 4 = 1.5 / 4 = 0.375

print(f"Vraies valeurs: {y_true}")
print(f"Prédictions:    {y_pred}")
print(f"Mean Squared Error (MSE): {mse:.4f}") # Output: 0.375

# Souvent, on utilise la racine carrée (RMSE) pour avoir une erreur dans la même unité que y
rmse = np.sqrt(mse) # ou mean_squared_error(y_true, y_pred, squared=False)
print(f"Root Mean Squared Error (RMSE): {rmse:.4f}") # Output: 0.6124`,isExpanded:!1},{library:"sklearn.pipeline",name:"Pipeline()",explanation:"Permet d'enchaîner plusieurs étapes de traitement (ex: vectorisation, mise à l'échelle, modèle) en un seul estimateur Scikit-learn. Simplifie le code et évite les fuites de données lors de la validation croisée.",example:`from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import fetch_20newsgroups

# Charger des données textuelles
categories = ['sci.med', 'sci.space']
data = fetch_20newsgroups(subset='all', categories=categories, shuffle=True, random_state=42)
X, y = data.data, data.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Créer le pipeline: Vectorizer -> Classifier
text_clf_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english')), # Étape 1: TF-IDF
    ('clf', MultinomialNB()),                       # Étape 2: Classifieur MNB
])

# Entraîner le pipeline comme un seul modèle
text_clf_pipeline.fit(X_train, y_train)

# Prédire avec le pipeline
y_pred = text_clf_pipeline.predict(X_test)

# Évaluer
accuracy = accuracy_score(y_test, y_pred)
print(f"Précision du Pipeline (TF-IDF + MNB): {accuracy:.4f}")

# Utilisation simple pour prédire un nouveau texte
new_doc = ["Exploring the effects of microgravity on human cells"]
predicted_category_index = text_clf_pipeline.predict(new_doc)[0]
predicted_category_name = data.target_names[predicted_category_index]
print(f"\\nPrédiction pour '{new_doc[0]}': {predicted_category_name}")`,isExpanded:!1},{library:"sklearn.preprocessing",name:"LabelEncoder()",explanation:"Encode des étiquettes catégorielles (texte ou nombre) en valeurs numériques comprises entre 0 et n_classes-1.",example:`from sklearn.preprocessing import LabelEncoder

labels = ['chat', 'chien', 'oiseau', 'chat', 'poisson', 'chien']

# Créer et ajuster l'encodeur
encoder = LabelEncoder()
encoder.fit(labels) # Apprend le mapping

print(f"Étiquettes originales: {labels}")
print(f"Classes apprises: {encoder.classes_}")

# Transformer les étiquettes en nombres
encoded_labels = encoder.transform(labels)
print(f"Étiquettes encodées: {encoded_labels}")
# Output: [0 1 2 0 3 1] (chat=0, chien=1, oiseau=2, poisson=3)

# Transformer de nouveaux labels (doivent être connus)
new_labels = ['chien', 'oiseau']
encoded_new = encoder.transform(new_labels)
print(f"Nouveaux labels encodés: {encoded_new}") # Output: [1 2]

# Revenir aux étiquettes originales
decoded_labels = encoder.inverse_transform(encoded_labels)
print(f"Étiquettes décodées: {list(decoded_labels)}")`,isExpanded:!1},{library:"sklearn.metrics.pairwise",name:"cosine_similarity()",explanation:"Calcule la similarité cosinus entre des échantillons dans X et Y. Si Y n'est pas donné, calcule la similarité entre tous les paires d'échantillons dans X. Utilisé souvent sur des vecteurs TF-IDF ou des embeddings.",example:`from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

documents = [
    "le ciel est bleu",
    "le soleil brille",
    "le ciel bleu est beau",
    "la météo est belle aujourd'hui"
]

# Vectoriser les documents
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(documents)

# Calculer la matrice de similarité cosinus (entre tous les docs)
# La matrice est de taille (n_docs, n_docs)
cosine_sim_matrix = cosine_similarity(tfidf_matrix)

print("Matrice TF-IDF (sparse):")
print(tfidf_matrix)
print("\\nMatrice de Similarité Cosinus:")
print(cosine_sim_matrix.round(3))

# Similarité entre le doc 0 ("le ciel est bleu") et le doc 2 ("le ciel bleu est beau")
sim_0_2 = cosine_similarity(tfidf_matrix[0], tfidf_matrix[2])
print(f"\\nSimilarité entre doc 0 et doc 2: {sim_0_2[0][0]:.3f}")`,isExpanded:!1},{library:"spacy",name:"load()",explanation:"Charge un modèle linguistique spaCy (pré-entraîné ou personnalisé). Les modèles contiennent le vocabulaire, les poids des réseaux neuronaux, et les règles de traitement. Nécessite d'avoir téléchargé le modèle (ex: `python -m spacy download en_core_web_sm`).",example:`import spacy

model_name = "en_core_web_sm" # Nom du modèle petit pour l'anglais

try:
    nlp = spacy.load(model_name)
    print(f"Modèle spaCy '{model_name}' chargé avec succès.")
    print(f"Pipeline du modèle: {nlp.pipe_names}")
    # Output: Pipeline du modèle: ['tok2vec', 'tagger', 'parser', 'attribute_ruler', 'lemmatizer', 'ner']

except OSError:
    print(f"Erreur: Modèle '{model_name}' non trouvé.")
    print(f"Vous pouvez le télécharger avec: python -m spacy download {model_name}")

# Exemple avec un modèle français (s'il est téléchargé)
# model_name_fr = "fr_core_news_sm"
# try:
#     nlp_fr = spacy.load(model_name_fr)
#     print(f"Modèle spaCy '{model_name_fr}' chargé.")
# except OSError:
#     print(f"Modèle '{model_name_fr}' non trouvé.")`,isExpanded:!1},{library:"spacy",name:"nlp()",explanation:"Applique le pipeline de traitement linguistique (chargé avec `spacy.load()`) à un texte d'entrée. Retourne un objet `Doc` contenant les tokens, annotations (POS, dépendances, entités nommées, etc.).",example:`import spacy

# Charger un modèle (assurez-vous qu'il est téléchargé)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Modèle 'en_core_web_sm' non trouvé. Téléchargez-le avec:")
    print("python -m spacy download en_core_web_sm")
    exit() # Arrêter si le modèle n'est pas là pour cet exemple

text = "Apple is looking at buying U.K. startup for $1 billion"

# Traiter le texte avec le pipeline nlp
doc = nlp(text)

print(f"Texte original: {text}")
print("\\nTokens et leurs POS tags:")
for token in doc:
    print(f"- {token.text:<10} {token.lemma_:<10} {token.pos_:<8} {token.tag_:<6} {spacy.explain(token.tag_)}")

print(f"\\nType de l'objet retourné: {type(doc)}")`,isExpanded:!1},{library:"spacy.tokens.Doc",name:"doc.ents",explanation:"Accède à la séquence des entités nommées (Named Entities) reconnues dans un objet `Doc` traité par spaCy. Chaque entité est un objet `Span` avec un texte et une étiquette (label).",example:`import spacy

# Charger un modèle (assurez-vous qu'il est téléchargé)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError: exit("Modèle en_core_web_sm non trouvé.")

text = "Apple is looking at buying U.K. startup for $1 billion in London."
doc = nlp(text)

print(f"Texte: {text}")
print("\\nEntités nommées trouvées:")
if doc.ents:
    for ent in doc.ents:
        print(f"- Texte: '{ent.text}', Étiquette: {ent.label_} ({spacy.explain(ent.label_)})")
else:
    print("Aucune entité nommée trouvée.")

# Output:
# Entités nommées trouvées:
# - Texte: 'Apple', Étiquette: ORG (Companies, agencies, institutions, etc.)
# - Texte: 'U.K.', Étiquette: GPE (Countries, cities, states)
# - Texte: '$1 billion', Étiquette: MONEY (Monetary values, including unit)
# - Texte: 'London', Étiquette: GPE (Countries, cities, states)`,isExpanded:!1},{library:"spacy.tokens.Token",name:"token.dep_",explanation:"Accède à l'étiquette de la relation de dépendance syntaxique qui relie ce token à son 'head' (tête syntaxique).",example:`import spacy

# Charger un modèle avec analyseur syntaxique
try:
    nlp = spacy.load("en_core_web_sm")
except OSError: exit("Modèle en_core_web_sm non trouvé.")

text = "The quick brown fox jumps over the lazy dog."
doc = nlp(text)

print(f"Texte: {text}")
print("\\nToken, Relation de Dépendance (dep_), Tête Syntaxique (head):")
for token in doc:
    print(f"- {token.text:<10} {token.dep_:<10} {token.head.text:<10}")

# Exemple: 'fox' est le sujet nominal (nsubj) du verbe 'jumps'
#          'quick' et 'brown' sont des modificateurs adjectivaux (amod) de 'fox'`,isExpanded:!1},{library:"spacy.tokens.Token",name:"token.head",explanation:"Accède au token qui est la tête syntaxique de ce token dans l'arbre de dépendance.",example:`import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError: exit("Modèle en_core_web_sm non trouvé.")

text = "She eats green apples."
doc = nlp(text)

print(f"Texte: {text}")
print("\\nAnalyse de 'green':")
green_token = doc[2] # Le token 'green'
print(f"- Token: {green_token.text}")
print(f"- Sa tête syntaxique (head): {green_token.head.text}") # 'apples'
print(f"- Relation de dépendance (dep_): {green_token.dep_} ({spacy.explain(green_token.dep_)})") # amod (adjectival modifier)

print("\\nAnalyse de 'eats':")
eats_token = doc[1] # Le token 'eats'
print(f"- Token: {eats_token.text}")
print(f"- Sa tête syntaxique (head): {eats_token.head.text}") # 'eats' (c'est la racine de la phrase)
print(f"- Relation de dépendance (dep_): {eats_token.dep_} ({spacy.explain(eats_token.dep_)})") # ROOT`,isExpanded:!1},{library:"spacy.tokens.Token/Span/Doc",name:".vector",explanation:"Accède au vecteur sémantique (word embedding) associé à un token, une portion (span) ou un document entier. Nécessite un modèle spaCy qui inclut des vecteurs (ex: `en_core_web_md` ou `en_core_web_lg`, pas `sm`).",example:`import spacy
import numpy as np

model_with_vectors = "en_core_web_md" # Modèle moyen avec vecteurs

try:
    nlp = spacy.load(model_with_vectors)
    print(f"Modèle '{model_with_vectors}' chargé.")
except OSError:
    print(f"Modèle '{model_with_vectors}' non trouvé. Téléchargez-le avec:")
    print(f"python -m spacy download {model_with_vectors}")
    # Utilisation d'un exemple simple si le modèle n'est pas là
    print("\\nUtilisation d'un exemple conceptuel sans modèle chargé.")
    print("Le vecteur aurait une dimension et des valeurs numériques.")
    vector_example = np.array([0.1, -0.2, 0.3, "..."]) # Exemple conceptuel
    print(f"Exemple de vecteur (forme): {vector_example.shape}")
    print(f"Exemple de vecteur (début): {vector_example[:3]}...")
    exit() # Arrêter ici si le modèle n'est pas là

text = "King queen prince princess"
doc = nlp(text)

print(f"\\nTexte: {text}")
for token in doc:
    print(f"Token: {token.text}")
    print(f"- Possède un vecteur? {'Oui' if token.has_vector else 'Non'}")
    if token.has_vector:
        print(f"- Dimension du vecteur: {token.vector.shape}")
        print(f"- Vecteur (3 premières valeurs): {token.vector[:3].round(3)}...")
    # print(f"- Est hors vocabulaire? {token.is_oov}") # Out Of Vocabulary

# Vecteur du document entier (moyenne des vecteurs des tokens par défaut)
print(f"\\nVecteur du document entier:")
print(f"- Possède un vecteur? {'Oui' if doc.has_vector else 'Non'}")
if doc.has_vector:
    print(f"- Dimension du vecteur: {doc.vector.shape}")
    print(f"- Vecteur (3 premières valeurs): {doc.vector[:3].round(3)}...")`,isExpanded:!1},{library:"spacy.tokens.Token/Span/Doc",name:".similarity()",explanation:"Calcule la similarité sémantique (basée sur la similarité cosinus des vecteurs) entre deux objets spaCy (Token, Span, ou Doc). Nécessite un modèle avec vecteurs.",example:`import spacy

model_with_vectors = "en_core_web_md" # Modèle moyen avec vecteurs

try:
    nlp = spacy.load(model_with_vectors)
    print(f"Modèle '{model_with_vectors}' chargé.")
except OSError:
    print(f"Modèle '{model_with_vectors}' non trouvé. Téléchargez-le.")
    print("\\nExemple conceptuel sans calcul réel.")
    print("similarity('roi', 'reine') -> devrait être élevée")
    print("similarity('roi', 'table') -> devrait être faible")
    exit()

doc1 = nlp("king")
doc2 = nlp("queen")
doc3 = nlp("man")
doc4 = nlp("woman")
doc5 = nlp("banana")
doc6 = nlp("car")

print(f"Similarité '{doc1.text}' vs '{doc2.text}': {doc1.similarity(doc2):.3f}") # king vs queen
print(f"Similarité '{doc3.text}' vs '{doc4.text}': {doc3.similarity(doc4):.3f}") # man vs woman
print(f"Similarité '{doc1.text}' vs '{doc3.text}': {doc1.similarity(doc3):.3f}") # king vs man
print(f"Similarité '{doc2.text}' vs '{doc4.text}': {doc2.similarity(doc4):.3f}") # queen vs woman
print(f"Similarité '{doc1.text}' vs '{doc5.text}': {doc1.similarity(doc5):.3f}") # king vs banana
print(f"Similarité '{doc5.text}' vs '{doc6.text}': {doc5.similarity(doc6):.3f}") # banana vs car

# Similarité entre phrases/docs
doc_sentence1 = nlp("The cat sits on the mat.")
doc_sentence2 = nlp("A feline relaxes upon a rug.")
doc_sentence3 = nlp("The weather is nice today.")
print(f"\\nSimilarité Phrase 1 vs Phrase 2: {doc_sentence1.similarity(doc_sentence2):.3f}")
print(f"Similarité Phrase 1 vs Phrase 3: {doc_sentence1.similarity(doc_sentence3):.3f}")`,isExpanded:!1},{library:"spacy.displacy",name:"serve()",explanation:"Lance un serveur web local pour visualiser les dépendances syntaxiques ou les entités nommées d'un ou plusieurs objets `Doc` spaCy de manière interactive dans le navigateur.",example:`import spacy
from spacy import displacy

# --- ATTENTION ---
# Cet exemple lance un serveur web. Il ne s'arrêtera pas
# tout seul. Vous devrez l'arrêter manuellement (Ctrl+C dans le terminal).
# Il n'est pas adapté pour une exécution directe dans certains environnements.
# L'exemple est commenté par défaut pour éviter un lancement accidentel.

# try:
#     nlp = spacy.load("en_core_web_sm")
# except OSError: exit("Modèle en_core_web_sm non trouvé.")

# text = "This is a sentence about dependency parsing visualization."
# doc = nlp(text)

# print("Lancement du serveur Displacy pour l'analyse de dépendance.")
# print("Ouvrez votre navigateur à l'adresse indiquée (souvent http://127.0.0.1:5000).")
# print("Arrêtez le serveur avec Ctrl+C dans le terminal.")

# # Visualisation des dépendances
# # displacy.serve(doc, style="dep")

# # Visualisation des entités nommées
# text_ner = "Apple is based in Cupertino and was founded by Steve Jobs."
# doc_ner = nlp(text_ner)
# print("\\nLancement du serveur Displacy pour les entités nommées.")
# # displacy.serve(doc_ner, style="ent")

print("--- Exemple de code pour displacy.serve() ---")
print("Le code est commenté pour éviter de lancer un serveur automatiquement.")
print("Décommentez les lignes 'displacy.serve(...)' pour tester.")
print("import spacy")
print("from spacy import displacy")
print("nlp = spacy.load('en_core_web_sm')")
print("doc = nlp('This is a test sentence.')")
print("# displacy.serve(doc, style='dep') # Pour les dépendances")
print("# displacy.serve(doc, style='ent') # Pour les entités nommées")`,isExpanded:!1},{library:"transformers",name:"pipeline()",explanation:"Interface de haut niveau de la bibliothèque 🤗 Transformers pour utiliser des modèles pré-entraînés sur diverses tâches NLP (classification de texte, NER, traduction, résumé, génération de texte, QA, etc.) en quelques lignes de code.",example:`from transformers import pipeline

# Exemple 1: Analyse de sentiment
sentiment_analyzer = pipeline("sentiment-analysis")
result = sentiment_analyzer("This movie was absolutely fantastic!")
print("Analyse de Sentiment:")
print(result)
# Output: [{'label': 'POSITIVE', 'score': 0.9998...}]

# Exemple 2: Question Answering (sur un contexte donné)
qa_pipeline = pipeline("question-answering")
context = "Paris is the capital and most populous city of France."
question = "What is the capital of France?"
result_qa = qa_pipeline(question=question, context=context)
print("\\nQuestion Answering:")
print(result_qa)
# Output: {'score': 0.99..., 'start': 0, 'end': 5, 'answer': 'Paris'}

# Exemple 3: Génération de texte (peut nécessiter modèle spécifique)
# Utilise GPT-2 par défaut si disponible
try:
    text_generator = pipeline("text-generation", model="gpt2") # "gpt2" est petit
    prompt = "In a world where AI rules,"
    generated_text = text_generator(prompt, max_length=30, num_return_sequences=1)
    print("\\nGénération de texte:")
    print(generated_text)
except Exception as e:
    print(f"\\nErreur lors de la génération de texte (modèle peut-être manquant): {e}")

# Exemple 4: Zero-shot classification (classification sans entraînement spécifique)
zero_shot_classifier = pipeline("zero-shot-classification")
sequence = "Who are you voting for in 2024?"
candidate_labels = ["politics", "business", "technology", "sports"]
result_zero = zero_shot_classifier(sequence, candidate_labels)
print("\\nZero-Shot Classification:")
print(result_zero)
# Output: {'sequence': 'Who are you voting for in 2024?', 'labels': ['politics', ...], 'scores': [0.99..., ...]} `,isExpanded:!1},{library:"transformers",name:"AutoTokenizer",explanation:"Classe 'magique' de 🤗 Transformers qui charge automatiquement le tokenizer approprié pour un modèle pré-entraîné donné (identifié par son nom ou chemin). Gère la tokenisation spécifique à chaque modèle (WordPiece, BPE, SentencePiece...).",example:`from transformers import AutoTokenizer

# Charger le tokenizer pour BERT
model_name_bert = "bert-base-uncased"
try:
    tokenizer_bert = AutoTokenizer.from_pretrained(model_name_bert)
    text = "Here is an example sentence."
    encoded_input_bert = tokenizer_bert(text)
    tokens_bert = tokenizer_bert.tokenize(text)

    print(f"Tokenizer pour: {model_name_bert}")
    print(f"Texte: {text}")
    print(f"Tokens (spécifiques BERT): {tokens_bert}")
    print(f"Input encodé (IDs, attention mask...): {encoded_input_bert}")
    # Output: Tokens: ['here', 'is', 'an', 'example', 'sentence', '.']
    # Output: Input encodé: {'input_ids': [101, 2182, ..., 102], 'token_type_ids': [...], 'attention_mask': [...]}

except OSError:
    print(f"Modèle/Tokenizer '{model_name_bert}' non trouvé ou problème réseau.")


# Charger le tokenizer pour CamemBERT (modèle français)
model_name_camembert = "camembert-base"
try:
    tokenizer_camembert = AutoTokenizer.from_pretrained(model_name_camembert)
    text_fr = "Voici une phrase d'exemple."
    encoded_input_camembert = tokenizer_camembert(text_fr)
    tokens_camembert = tokenizer_camembert.tokenize(text_fr)

    print(f"\\nTokenizer pour: {model_name_camembert}")
    print(f"Texte: {text_fr}")
    print(f"Tokens (spécifiques CamemBERT/SentencePiece): {tokens_camembert}") # Peut inclure ' '
    print(f"Input encodé: {encoded_input_camembert}")

except OSError:
    print(f"Modèle/Tokenizer '{model_name_camembert}' non trouvé ou problème réseau.")`,isExpanded:!1},{library:"transformers",name:"AutoModelForCausalLM",explanation:"Classe 'magique' similaire à AutoTokenizer, mais pour charger des modèles pré-entraînés spécifiquement pour la tâche de Modélisation Causale du Langage (Causal Language Modeling - CLM), c'est-à-dire la prédiction du mot suivant (ex: GPT-2, GPT-Neo).",example:`from transformers import AutoModelForCausalLM, AutoTokenizer
import torch # Les modèles Transformers retournent souvent des tenseurs PyTorch par défaut

model_name = "gpt2" # Petit modèle GPT-2
prompt = "The future of AI is"

try:
    # 1. Charger le tokenizer et le modèle
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)

    # Mettre le tokenizer en mode padding à gauche pour la génération
    tokenizer.padding_side = "left"
    tokenizer.pad_token = tokenizer.eos_token # Utiliser le token EndOfSentence comme padding

    # 2. Tokenizer le prompt
    inputs = tokenizer(prompt, return_tensors="pt", padding=True) # Retourner des tenseurs PyTorch

    # 3. Générer du texte (voir aussi model.generate())
    # Obtenir les logits (scores avant softmax) pour le token suivant
    with torch.no_grad(): # Pas besoin de gradients pour l'inférence
        outputs = model(**inputs)
        logits = outputs.logits

    # Prédire le token suivant (le plus probable)
    # Logits shape: [batch_size, sequence_length, vocab_size]
    next_token_logits = logits[:, -1, :] # Logits du dernier token
    predicted_next_token_id = torch.argmax(next_token_logits, dim=-1)
    predicted_next_token = tokenizer.decode(predicted_next_token_id)

    print(f"Modèle: {model_name}")
    print(f"Prompt: '{prompt}'")
    print(f"Token suivant prédit (via logits): '{predicted_next_token}'") # Varie selon exécution/modèle

    # Voir 'model.generate()' pour une génération plus complète

except OSError:
    print(f"Modèle/Tokenizer '{model_name}' non trouvé ou problème réseau.")
except Exception as e:
    print(f"Une erreur est survenue: {e}")`,isExpanded:!1},{library:"transformers",name:"MarianTokenizer / MarianMTModel",explanation:"Classes spécifiques pour utiliser les modèles de traduction automatique neuronale (NMT) du projet Marian. Optimisés et souvent multilingues.",example:`from transformers import MarianMTModel, MarianTokenizer

# Exemple: Traduction Anglais -> Français
model_name = 'Helsinki-NLP/opus-mt-en-fr'
text_en = "My name is Wolfgang and I live in Berlin."

try:
    # Charger le tokenizer et le modèle spécifiques à Marian
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)

    # Préparer le texte pour le modèle
    inputs = tokenizer(text_en, return_tensors="pt", padding=True)

    # Générer la traduction (voir model.generate())
    translated_tokens = model.generate(**inputs)

    # Décoder les tokens traduits en texte
    text_fr = tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]

    print(f"Modèle de traduction: {model_name}")
    print(f"Texte original (en): '{text_en}'")
    print(f"Traduction (fr):   '{text_fr}'")
    # Output: Traduction (fr):   'Mon nom est Wolfgang et je vis à Berlin.' (ou similaire)

except OSError:
    print(f"Modèle/Tokenizer Marian '{model_name}' non trouvé ou problème réseau.")
except Exception as e:
    print(f"Une erreur est survenue: {e}")`,isExpanded:!1},{library:"transformers",name:"TapasTokenizer / TapasForQuestionAnswering",explanation:"Classes spécifiques pour les modèles TAPAS (TAble PArSing), conçus pour répondre à des questions basées sur des données tabulaires (ex: tableaux Pandas).",example:`from transformers import TapasTokenizer, TapasForQuestionAnswering
import pandas as pd
import torch

# Modèle TAPAS fine-tuné pour la QA sur table (WTQ dataset)
model_name = "google/tapas-base-finetuned-wtq"

try:
    tokenizer = TapasTokenizer.from_pretrained(model_name)
    model = TapasForQuestionAnswering.from_pretrained(model_name)

    # Exemple de table (doit être un DataFrame Pandas)
    data = {
        'Ville': ["Paris", "Londres", "Berlin"],
        'Pays': ["France", "Royaume-Uni", "Allemagne"],
        'Population (Millions)': [2.1, 8.9, 3.6]
    }
    table = pd.DataFrame.from_dict(data)
    # Important: Convertir les types en string pour le tokenizer TAPAS
    table = table.astype(str)

    # Question sur la table
    query = "Quelle est la population de Londres?"

    # Préparer les inputs pour TAPAS
    # table: le DataFrame ; queries: la ou les questions
    inputs = tokenizer(table=table, queries=query, padding="max_length", return_tensors="pt")

    # Obtenir les prédictions du modèle
    with torch.no_grad():
        outputs = model(**inputs)

    # Décoder la réponse prédite
    predicted_answer_coordinates, predicted_aggregation_indices = tokenizer.convert_logits_to_predictions(
        inputs,
        outputs.logits.detach(), # Logits des cellules de la table
        outputs.logits_aggregation.detach() # Logits pour l'agrégation (SUM, COUNT, AVERAGE, NONE)
    )

    # TAPAS peut retourner des coordonnées de cellules ou agréger
    aggregation_prediction_str = model.config.aggregation_labels[predicted_aggregation_indices[0]]

    answers = []
    if aggregation_prediction_str == "NONE": # Réponse directe depuis les cellules
        for coordinates in predicted_answer_coordinates[0]:
             answers.append(table.iat[coordinates]) # iat accède par position entière
    else: # Le modèle a utilisé une agrégation
        answers.append(aggregation_prediction_str)


    print("Table:")
    print(table.to_string())
    print(f"\\nQuestion: {query}")
    print(f"Réponse(s) prédite(s): {answers}")
    # Output: Réponse(s) prédite(s): ['8.9']

except OSError:
    print(f"Modèle/Tokenizer TAPAS '{model_name}' non trouvé ou problème réseau.")
except Exception as e:
    print(f"Une erreur est survenue (TAPAS peut être complexe): {e}")`,isExpanded:!1},{library:"transformers",name:"model.generate()",explanation:"Méthode principale des modèles de génération de texte (Causal LM, Seq2Seq comme traduction ou résumé) dans 🤗 Transformers. Permet de générer des séquences de tokens à partir d'un prompt ou d'inputs, avec de nombreuses options (decoding strategies: greedy, beam search, sampling; max_length, etc.).",example:`from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2" # Ou un modèle de traduction comme 'Helsinki-NLP/opus-mt-en-fr'
prompt = "Once upon a time, in a land far, far away,"

try:
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name) # Ou AutoModelForSeq2SeqLM pour traduction/résumé

    # Mettre le tokenizer en mode padding à gauche si besoin (surtout pour batch > 1)
    tokenizer.padding_side = "left"
    tokenizer.pad_token = tokenizer.eos_token

    # Tokenizer le prompt
    inputs = tokenizer(prompt, return_tensors="pt", padding=True)

    print(f"Utilisation de model.generate() pour '{model_name}'")
    print(f"Prompt: '{prompt}'")

    # Génération simple (Greedy search par défaut implicitement)
    print("\\n--- Génération Greedy (par défaut) ---")
    output_greedy = model.generate(
        **inputs,
        max_length=50, # Longueur maximale de la séquence générée (prompt inclus)
        pad_token_id=tokenizer.eos_token_id # Éviter warning
        )
    text_greedy = tokenizer.decode(output_greedy[0], skip_special_tokens=True)
    print(text_greedy)

    # Génération avec Beam Search
    print("\\n--- Génération Beam Search (num_beams=5) ---")
    output_beam = model.generate(
        **inputs,
        max_length=50,
        num_beams=5, # Nombre de faisceaux à explorer
        early_stopping=True, # Arrêter dès que num_beams séquences complètes sont trouvées
        pad_token_id=tokenizer.eos_token_id
    )
    text_beam = tokenizer.decode(output_beam[0], skip_special_tokens=True)
    print(text_beam)

    # Génération avec Sampling (plus créatif/aléatoire)
    print("\\n--- Génération Sampling (top_k=50, top_p=0.95) ---")
    output_sample = model.generate(
        **inputs,
        max_length=50,
        do_sample=True, # Activer le sampling
        top_k=50,       # Considérer seulement les 50 tokens les plus probables
        top_p=0.95,     # Considérer les tokens dont la probabilité cumulée atteint 0.95
        temperature=0.7,# Contrôle l'aléatoire (plus bas = moins aléatoire)
        pad_token_id=tokenizer.eos_token_id
    )
    text_sample = tokenizer.decode(output_sample[0], skip_special_tokens=True)
    print(text_sample)


except OSError:
    print(f"Modèle/Tokenizer '{model_name}' non trouvé ou problème réseau.")
except Exception as e:
    print(f"Une erreur est survenue: {e}")`,isExpanded:!1},{library:"tensorflow.keras.preprocessing.text",name:"Tokenizer",explanation:"Utilitaire Keras pour vectoriser une collection de textes en transformant chaque texte en une séquence d'entiers (indices du vocabulaire).",example:`from tensorflow.keras.preprocessing.text import Tokenizer

texts = [
    "J'aime le NLP",
    "Le NLP est super",
    "Keras rend le NLP facile"
]

# Créer un Tokenizer (limiter la taille du vocabulaire si besoin)
# num_words: taille max du vocabulaire (les mots les plus fréquents)
# oov_token: token pour les mots hors vocabulaire
tokenizer = Tokenizer(num_words=100, oov_token="<OOV>")

# Construire le vocabulaire basé sur les textes
tokenizer.fit_on_texts(texts)

# Voir le vocabulaire (word -> index)
word_index = tokenizer.word_index
print("Index des mots (vocabulaire):")
print(word_index)
# Output: {'<OOV>': 1, 'le': 2, 'nlp': 3, "j'aime": 4, 'est': 5, 'super': 6, 'keras': 7, 'rend': 8, 'facile': 9}

print("\\nTextes originaux:")
print(texts)

# Convertir les textes en séquences d'entiers
sequences = tokenizer.texts_to_sequences(texts)
print("\\nTextes convertis en séquences:")
print(sequences)
# Output: [[4, 2, 3], [2, 3, 5, 6], [7, 8, 2, 3, 9]]

# Exemple avec un mot inconnu
new_text = ["Le Deep Learning est populaire"]
new_sequence = tokenizer.texts_to_sequences(new_text)
print(f"\\nSéquence pour '{new_text[0]}': {new_sequence}")
# Output: [[2, 1, 5, 1]] ('Deep' et 'populaire' -> <OOV> qui est 1)`,isExpanded:!1},{library:"tensorflow.keras.preprocessing.text.Tokenizer",name:"texts_to_sequences()",explanation:"Méthode de l'objet `Tokenizer` de Keras (après `fit_on_texts`) qui transforme une liste de textes en une liste de séquences d'entiers, basées sur le vocabulaire appris.",example:`from tensorflow.keras.preprocessing.text import Tokenizer

texts = ["un deux trois", "deux trois quatre"]
new_texts = ["un cinq", "trois quatre zéro"]

tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(texts) # Apprend {un:1, deux:2, trois:3, quatre:4} + <OOV>

print("Vocabulaire (word_index):", tokenizer.word_index)

sequences_original = tokenizer.texts_to_sequences(texts)
print(f"\\nSéquences pour textes originaux: {sequences_original}")
# Output: [[2, 3, 4], [3, 4, 5]]  (indices décalés si oov_token est utilisé)
# Correction: Avec oov_token='<OOV>', l'index commence après.
# {<OOV>: 1, deux: 2, trois: 3, un: 4, quatre: 5} -> [[4, 2, 3], [2, 3, 5]]

sequences_new = tokenizer.texts_to_sequences(new_texts)
print(f"Séquences pour nouveaux textes: {sequences_new}")
# Output: [[4, 1], [3, 5, 1]] ('cinq' et 'zéro' deviennent <OOV>=1)`,isExpanded:!1},{library:"tensorflow.keras.preprocessing.sequence",name:"pad_sequences()",explanation:"Complète (padding) des séquences d'entiers (issues de `texts_to_sequences`) pour qu'elles aient toutes la même longueur. Nécessaire pour l'input des réseaux de neurones récurrents (RNN/LSTM) ou convolutifs (CNN) sur du texte.",example:`from tensorflow.keras.preprocessing.sequence import pad_sequences

sequences = [
  [4, 2, 3],
  [2, 3, 5, 6],
  [7, 8, 2, 3, 9]
]

print("Séquences originales:")
print(sequences)

# Padding à la fin (post) pour atteindre la longueur de la plus longue séquence
padded_post = pad_sequences(sequences, padding='post')
print("\\nSéquences paddées (padding='post'):")
print(padded_post)
# Output:
# [[4 2 3 0 0]
#  [2 3 5 6 0]
#  [7 8 2 3 9]]

# Padding au début (pre)
padded_pre = pad_sequences(sequences, padding='pre')
print("\\nSéquences paddées (padding='pre'):")
print(padded_pre)
# Output:
# [[0 0 4 2 3]
#  [0 2 3 5 6]
#  [7 8 2 3 9]]

# Padding avec longueur max et troncature
padded_maxlen = pad_sequences(sequences, padding='post', maxlen=4, truncating='post')
print("\\nSéquences paddées (maxlen=4, truncating='post'):")
print(padded_maxlen)
# Output:
# [[4 2 3 0]
#  [2 3 5 6]
#  [7 8 2 3]] # [..., 9] est tronqué`,isExpanded:!1},{library:"tensorflow.keras.layers",name:"Input, Embedding, LSTM, Dense",explanation:"Couches fondamentales de Keras pour construire des modèles NLP. `Input` définit la forme de l'entrée. `Embedding` transforme les indices de mots en vecteurs denses (embeddings). `LSTM` est une couche récurrente pour traiter les séquences. `Dense` est une couche neuronale classique (fully connected).",example:`import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Embedding, LSTM, Dense

# Paramètres d'exemple
vocab_size = 10000 # Taille du vocabulaire
embedding_dim = 16 # Dimension des embeddings
lstm_units = 32    # Nombre d'unités dans la couche LSTM
max_sequence_length = 120 # Longueur des séquences après padding
num_classes = 1 # Ex: Régression ou classification binaire (avec activation sigmoid)

print("Construction d'un modèle Keras simple (LSTM pour classification binaire)")

# 1. Couche d'entrée
# Shape: (batch_size, max_sequence_length)
input_layer = Input(shape=(max_sequence_length,), name="Input_Sequence")
print(f"Input shape: {(None, max_sequence_length)}") # None représente le batch size

# 2. Couche Embedding
# Input: (batch_size, max_sequence_length)
# Output: (batch_size, max_sequence_length, embedding_dim)
embedding_layer = Embedding(input_dim=vocab_size,
                            output_dim=embedding_dim,
                            # input_length=max_sequence_length, # Souvent inféré
                            name="Word_Embedding")(input_layer)
print(f"Embedding output shape: {(None, max_sequence_length, embedding_dim)}")

# 3. Couche LSTM
# Input: (batch_size, max_sequence_length, embedding_dim)
# Output (par défaut, seulement le dernier état): (batch_size, lstm_units)
# Si return_sequences=True: (batch_size, max_sequence_length, lstm_units)
lstm_layer = LSTM(units=lstm_units, name="LSTM_Layer")(embedding_layer)
print(f"LSTM output shape (return_sequences=False): {(None, lstm_units)}")

# 4. Couche Dense (couche de sortie)
# Input: (batch_size, lstm_units)
# Output: (batch_size, num_classes)
output_layer = Dense(units=num_classes, activation='sigmoid', name="Output_Layer")(lstm_layer)
print(f"Dense output shape: {(None, num_classes)}")

# 5. Création du Modèle (via API Fonctionnelle)
model = Model(inputs=input_layer, outputs=output_layer, name="Simple_LSTM_Classifier")

# Afficher le résumé du modèle
print("\\nRésumé du modèle:")
model.summary()`,isExpanded:!1},{library:"tensorflow.keras.models",name:"Model()",explanation:"Permet de créer un modèle Keras en utilisant l'API Fonctionnelle. On définit les couches comme des fonctions appelables et on les connecte explicitement, offrant plus de flexibilité que l'API Séquentielle (pour des modèles avec plusieurs entrées/sorties, branches, etc.).",example:`import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Embedding, LSTM, Dense, concatenate

# Exemple: Modèle avec deux entrées textuelles

vocab_size = 5000
embed_dim = 32
lstm_units = 16
max_len = 50
num_classes = 1

# Entrée 1 (ex: titre d'un article)
input_1 = Input(shape=(max_len,), name='title_input')
embedding_1 = Embedding(vocab_size, embed_dim)(input_1)
lstm_1 = LSTM(lstm_units, name='title_lstm')(embedding_1)

# Entrée 2 (ex: corps de l'article)
input_2 = Input(shape=(max_len,), name='body_input')
embedding_2 = Embedding(vocab_size, embed_dim)(input_2)
lstm_2 = LSTM(lstm_units, name='body_lstm')(embedding_2)

# Concaténer les sorties des deux branches LSTM
concatenated = concatenate([lstm_1, lstm_2], name='concatenate_features')

# Couche Dense finale pour la prédiction
output_layer = Dense(num_classes, activation='sigmoid', name='output')(concatenated)

# Créer le modèle en spécifiant les entrées et la sortie
model = Model(inputs=[input_1, input_2], outputs=output_layer, name='Dual_Input_LSTM')

print("Résumé du modèle à double entrée:")
model.summary()

# On pourrait l'entraîner avec:
# model.compile(...)
# model.fit({'title_input': title_data, 'body_input': body_data}, labels, ...)`,isExpanded:!1},{library:"tensorflow.keras.Model",name:"compile()",explanation:"Configure le modèle Keras pour l'entraînement. Spécifie la fonction de perte (loss function), l'optimiseur (optimizer), et éventuellement les métriques à évaluer pendant l'entraînement et le test.",example:`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Créer un modèle simple (ex: régression)
model = Sequential([
    Dense(64, activation='relu', input_shape=(10,)), # Input layer avec 10 features
    Dense(32, activation='relu'),
    Dense(1) # Couche de sortie pour la régression (1 valeur continue)
], name="Simple_Regression_Model")

print("Modèle avant compilation:")
model.summary()

# Compilation pour la régression
print("\\nCompilation pour la régression (MSE loss, Adam optimizer):")
model.compile(
    loss='mean_squared_error', # Ou tf.keras.losses.MeanSquaredError()
    optimizer='adam',          # Ou tf.keras.optimizers.Adam(learning_rate=0.001)
    metrics=['mae']            # Mean Absolute Error comme métrique supplémentaire
)
print("Modèle compilé pour régression.")
# print(model.optimizer.get_config())
# print(model.loss)


# Compilation pour classification binaire
model_clf_bin = Sequential([
    Dense(32, activation='relu', input_shape=(20,)),
    Dense(1, activation='sigmoid') # Sigmoid pour sortie entre 0 et 1
], name="Simple_Binary_Classifier")

print("\\nCompilation pour classification binaire (BinaryCrossentropy, SGD):")
model_clf_bin.compile(
    loss=tf.keras.losses.BinaryCrossentropy(),
    optimizer=tf.keras.optimizers.SGD(),
    metrics=['accuracy'] # Précision comme métrique
)
print("Modèle compilé pour classification binaire.")


# Compilation pour classification multi-classe (labels entiers)
model_clf_multi = Sequential([
    Dense(64, activation='relu', input_shape=(30,)),
    Dense(10, activation='softmax') # Softmax pour probabilités sur 10 classes
], name="Simple_MultiClass_Classifier")

print("\\nCompilation pour classification multi-classe (SparseCategoricalCrossentropy):")
model_clf_multi.compile(
    loss='sparse_categorical_crossentropy', # Si les labels sont des entiers (0, 1, 2...)
    # loss='categorical_crossentropy', # Si les labels sont one-hot encodés [[1,0,0], [0,1,0]...]
    optimizer='rmsprop',
    metrics=['accuracy']
)
print("Modèle compilé pour classification multi-classe.")`,isExpanded:!1},{library:"tensorflow.keras.Model",name:"fit()",explanation:"Entraîne le modèle Keras (préalablement compilé) sur des données d'entraînement pendant un certain nombre d'époques (epochs). On fournit les données d'entrée (X) et les cibles (y).",example:`import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np

# Générer des données d'entraînement simples (linéaires avec bruit)
print("Génération de données d'entraînement simples...")
X_train = np.random.rand(100, 1) * 10 # 100 exemples, 1 feature entre 0 et 10
y_train = 2 * X_train + 1 + np.random.randn(100, 1) * 2 # y = 2x + 1 + bruit gaussien

# Générer des données de validation
X_val = np.random.rand(20, 1) * 10
y_val = 2 * X_val + 1 + np.random.randn(20, 1) * 2

print(f"Shape X_train: {X_train.shape}, Shape y_train: {y_train.shape}")
print(f"Shape X_val: {X_val.shape}, Shape y_val: {y_val.shape}")

# Créer un modèle linéaire simple
model = Sequential([
    Dense(1, input_shape=(1,)) # Une seule couche dense avec une sortie
])

# Compiler le modèle
model.compile(loss='mean_squared_error', optimizer=tf.keras.optimizers.Adam(0.1))
print("\\nModèle compilé. Début de l'entraînement (fit)...")

# Entraîner le modèle (fit)
# epochs: nombre de fois où le modèle voit l'ensemble des données d'entraînement
# batch_size: nombre d'exemples traités avant mise à jour des poids
# validation_data: données pour évaluer le modèle à la fin de chaque époque (ne sont pas utilisées pour l'entraînement)
history = model.fit(
    X_train, y_train,
    epochs=20,          # Petit nombre d'époques pour l'exemple
    batch_size=16,
    validation_data=(X_val, y_val),
    verbose=1 # Mettre à 0 pour moins d'output, 1 pour barre de progression, 2 pour une ligne par époque
)

print("\\nEntraînement terminé.")
print("Poids appris par le modèle (proches de [2.0] et [1.0]):")
print(model.get_weights())

# L'objet 'history' contient les logs (loss, métriques) par époque
print("\\nClés disponibles dans l'historique:", history.history.keys())
# Exemple: Accéder à la loss de validation de la dernière époque
# print("Dernière validation loss:", history.history['val_loss'][-1])`,isExpanded:!1},{library:"torch.nn",name:"Module",explanation:"Classe de base pour tous les modules de réseaux de neurones dans PyTorch. Les modèles personnalisés doivent hériter de `nn.Module`. Elle gère les paramètres (poids), les sous-modules, et fournit des fonctionnalités comme le déplacement sur GPU (`.to(device)`), le passage en mode entraînement/évaluation (`.train()`, `.eval()`).",example:`import torch
import torch.nn as nn
import torch.nn.functional as F

# Définition d'un modèle simple héritant de nn.Module
class SimpleNet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNet, self).__init__() # Important: appeler l'init de la classe parente
        # Définir les couches comme attributs
        self.layer1 = nn.Linear(input_size, hidden_size) # Couche linéaire (fully connected)
        self.layer2 = nn.Linear(hidden_size, output_size)
        print("Instance de SimpleNet créée.")
        print(f"Attributs définis: {self.__dict__.keys()}")

    # Définir la passe avant (forward pass)
    # x: tenseur d'entrée
    def forward(self, x):
        print("Début de la passe forward...")
        # Appliquer les couches et les fonctions d'activation
        x = self.layer1(x)
        print("Après layer1:", x.shape)
        x = F.relu(x) # Fonction d'activation ReLU
        print("Après ReLU:", x.shape)
        x = self.layer2(x)
        print("Après layer2:", x.shape)
        # Pas d'activation finale ici (dépend de la tâche, ex: Softmax pour classif)
        print("Fin de la passe forward.")
        return x

# Instancier le modèle
input_dim = 10
hidden_dim = 20
output_dim = 5
model = SimpleNet(input_dim, hidden_dim, output_dim)

# Afficher les paramètres du modèle (poids et biais appris automatiquement)
print("\\nParamètres du modèle (nom, shape):")
for name, param in model.named_parameters():
    if param.requires_grad:
        print(f"- {name}: {param.shape}")

# Créer un tenseur d'entrée factice (batch_size=3, features=10)
dummy_input = torch.randn(3, input_dim)
print(f"\\nInput factice shape: {dummy_input.shape}")

# Passer l'input dans le modèle (appelle la méthode forward)
output = model(dummy_input)
print(f"\\nOutput du modèle shape: {output.shape}") # Devrait être (3, 5)`,isExpanded:!1},{library:"torch.nn",name:"Embedding",explanation:"Couche PyTorch qui stocke des embeddings de mots (vecteurs denses) pour un dictionnaire de taille fixe. Prend en entrée des indices (LongTensor) et retourne les embeddings correspondants.",example:`import torch
import torch.nn as nn

# Paramètres
num_embeddings = 10 # Taille du vocabulaire (indices de 0 à 9)
embedding_dim = 5   # Dimension des vecteurs d'embedding

# Créer la couche Embedding
embedding_layer = nn.Embedding(num_embeddings=num_embeddings, embedding_dim=embedding_dim)

print("Couche Embedding créée.")
print(f"Poids de l'embedding (lookup table) shape: {embedding_layer.weight.shape}")
# Output: torch.Size([10, 5]) -> 10 vecteurs de dimension 5

# Indices des mots à chercher (doivent être LongTensor)
# Exemple: chercher les embeddings pour les mots d'indices 1, 4, 1, 9
# Batch de 2 séquences: [[1, 4], [1, 9]]
input_indices = torch.LongTensor([[1, 4], [1, 9]])
print(f"\\nIndices d'entrée (shape={input_indices.shape}):\\n{input_indices}")

# Obtenir les embeddings correspondants
output_embeddings = embedding_layer(input_indices)

print(f"\\nEmbeddings de sortie (shape={output_embeddings.shape}):")
# Output shape: [batch_size, sequence_length, embedding_dim] -> [2, 2, 5]
print(output_embeddings)

# Vérifier que output[0, 0] est égal à embedding_layer.weight[1]
print(f"\\nEmbedding pour indice 1 (via lookup):\\n{output_embeddings[0, 0]}")
print(f"Poids stocké pour indice 1:\\n{embedding_layer.weight[1]}")
print(f"Sont-ils égaux? {torch.equal(output_embeddings[0, 0], embedding_layer.weight[1])}")`,isExpanded:!1},{library:"torch.nn",name:"LSTM",explanation:"Couche PyTorch implémentant une cellule Long Short-Term Memory (LSTM). Traite des séquences d'entrée et peut retourner la séquence de sortie complète ou seulement le dernier état caché/cellule.",example:`import torch
import torch.nn as nn

# Paramètres
input_size = 10  # Dimension des features d'entrée à chaque pas de temps
hidden_size = 20 # Dimension de l'état caché (et état de cellule)
num_layers = 1   # Nombre de couches LSTM superposées (par défaut 1)
batch_size = 5   # Nombre de séquences dans le batch
seq_length = 7   # Longueur des séquences

# Créer la couche LSTM
# batch_first=True signifie que l'input aura la shape (batch, seq_len, feature)
lstm_layer = nn.LSTM(input_size=input_size, hidden_size=hidden_size,
                     num_layers=num_layers, batch_first=True)
print("Couche LSTM créée.")

# Créer un tenseur d'entrée factice
# Shape: (batch_size, seq_length, input_size)
dummy_input = torch.randn(batch_size, seq_length, input_size)
print(f"Input factice shape: {dummy_input.shape}")

# Initialiser les états cachés et de cellule (optionnel, par défaut à zéro)
# Shape: (num_layers * num_directions, batch_size, hidden_size)
h0 = torch.zeros(num_layers, batch_size, hidden_size)
c0 = torch.zeros(num_layers, batch_size, hidden_size)
print(f"État caché initial (h0) shape: {h0.shape}")
print(f"État de cellule initial (c0) shape: {c0.shape}")


# Passer l'input et les états initiaux dans la couche LSTM
# output: contient les états cachés de la dernière couche pour chaque pas de temps
# hn: contient le dernier état caché pour chaque couche
# cn: contient le dernier état de cellule pour chaque couche
output, (hn, cn) = lstm_layer(dummy_input, (h0, c0))

print("\\n--- Sorties de la couche LSTM ---")
print(f"Output shape (batch, seq_len, hidden_size): {output.shape}")
# Contient h_t pour t=0..6 pour la couche 0 (car num_layers=1)

print(f"Dernier état caché (hn) shape (num_layers, batch, hidden_size): {hn.shape}")
# Devrait être égal à output[:, -1, :] si num_layers=1

print(f"Dernier état de cellule (cn) shape (num_layers, batch, hidden_size): {cn.shape}")

# Vérification de hn vs output[:, -1, :]
# Note: besoin de .squeeze(0) car hn a une dimension pour num_layers
# is_equal = torch.allclose(hn.squeeze(0), output[:, -1, :])
# print(f"\\nEst-ce que hn[0] est égal au dernier output? {is_equal}")`,isExpanded:!1},{library:"torch.nn",name:"Linear",explanation:"Couche PyTorch qui applique une transformation linéaire (multiplication par une matrice de poids + addition d'un biais) aux données d'entrée. C'est la couche 'fully connected' ou 'dense'.",example:`import torch
import torch.nn as nn

# Paramètres
in_features = 10  # Dimension de l'entrée
out_features = 5 # Dimension de la sortie
batch_size = 3    # Nombre d'exemples dans le batch

# Créer la couche linéaire
linear_layer = nn.Linear(in_features=in_features, out_features=out_features, bias=True) # bias=True par défaut
print("Couche Linear créée.")
print(f"Poids (weight) shape: {linear_layer.weight.shape}") # Shape: [out_features, in_features]
print(f"Biais (bias) shape: {linear_layer.bias.shape}")     # Shape: [out_features]

# Créer un tenseur d'entrée factice
# Shape: (batch_size, in_features) ou (..., in_features)
dummy_input = torch.randn(batch_size, in_features)
print(f"\\nInput factice shape: {dummy_input.shape}")

# Appliquer la couche linéaire
output = linear_layer(dummy_input)
print(f"\\nOutput de la couche Linear shape: {output.shape}") # Shape: [batch_size, out_features]
print("Output values:")
print(output)

# Calcul manuel pour le premier exemple (pour vérifier)
# output[0] = input[0] @ weight.T + bias
input_0 = dummy_input[0]
weight_t = linear_layer.weight.t() # Transposée des poids
bias = linear_layer.bias
manual_output_0 = torch.matmul(input_0, weight_t) + bias

print(f"\\nOutput calculé manuellement pour le 1er exemple:\\n{manual_output_0}")
print(f"Output du modèle pour le 1er exemple:\\n{output[0]}")
print(f"Sont-ils (approximativement) égaux? {torch.allclose(manual_output_0, output[0])}")`,isExpanded:!1},{library:"torch.optim",name:"Adam",explanation:"Implémentation de l'optimiseur Adam (Adaptive Moment Estimation) dans PyTorch. C'est un algorithme d'optimisation populaire et souvent efficace pour l'entraînement de réseaux de neurones. Il adapte le taux d'apprentissage pour chaque paramètre.",example:`import torch
import torch.nn as nn
import torch.optim as optim

# 1. Définir un modèle simple (exemple)
model = nn.Linear(10, 2) # Modèle avec des paramètres (poids et biais)

# 2. Créer l'optimiseur Adam
# On lui passe les paramètres du modèle qu'il doit optimiser
# lr: learning rate (taux d'apprentissage)
optimizer = optim.Adam(model.parameters(), lr=0.001)
print("Optimiseur Adam créé.")
print(f"Taux d'apprentissage initial: {optimizer.defaults['lr']}")

# --- Boucle d'entraînement typique (simplifiée) ---
print("\\nSimulation d'une étape d'entraînement:")

# a. Obtenir des données (factices ici)
inputs = torch.randn(5, 10) # Batch de 5 exemples
targets = torch.randint(0, 2, (5,)).float().unsqueeze(1) # Cibles binaires factices [5, 1]

# b. Mettre les gradients à zéro avant la passe avant
optimizer.zero_grad()
print("- Gradients mis à zéro (optimizer.zero_grad())")

# c. Passe avant: calculer les prédictions du modèle
outputs = model(inputs)
print(f"- Prédictions du modèle (shape): {outputs.shape}")

# d. Calculer la perte (loss) - exemple avec Binary Cross Entropy avec Logits
loss_fn = nn.BCEWithLogitsLoss()
loss = loss_fn(outputs, targets)
print(f"- Calcul de la perte (loss): {loss.item():.4f}")

# e. Passe arrière: calculer les gradients de la perte par rapport aux paramètres
loss.backward()
print("- Calcul des gradients (loss.backward())")
# Vérifier qu'un gradient existe (ex: pour le biais de la couche)
# print(f"  Gradient du biais: {model.bias.grad}")

# f. Mettre à jour les poids du modèle en utilisant les gradients calculés
optimizer.step()
print("- Mise à jour des poids (optimizer.step())")

# Les poids dans model.parameters() ont maintenant été ajustés par Adam
# print("Nouveaux poids (biais):", model.bias.data)
print("--- Fin de l'étape d'entraînement simulée ---")`,isExpanded:!1},{library:"torch.nn",name:"CrossEntropyLoss",explanation:"Fonction de perte PyTorch couramment utilisée pour les problèmes de classification multi-classe. Combine `nn.LogSoftmax()` et `nn.NLLLoss()` en une seule classe, ce qui est numériquement plus stable. Attend les scores bruts du modèle (logits) en entrée et les étiquettes de classe (indices entiers) en cible.",example:`import torch
import torch.nn as nn

# Paramètres
batch_size = 3
num_classes = 5 # Nombre de classes possibles (ex: 0, 1, 2, 3, 4)

# Créer la fonction de perte
criterion = nn.CrossEntropyLoss()
print("Fonction de perte CrossEntropyLoss créée.")

# Entrées (logits) - Scores bruts sortis par le modèle
# Shape: (batch_size, num_classes) ou (N, C)
# Valeurs aléatoires pour l'exemple
dummy_logits = torch.randn(batch_size, num_classes, requires_grad=True)
print(f"\\nLogits factices (shape={dummy_logits.shape}):\\n{dummy_logits.detach()}")

# Cibles (target) - Indices des vraies classes pour chaque exemple
# Shape: (batch_size) ou (N)
# Doit être de type LongTensor (entiers 64 bits)
# Les valeurs doivent être entre 0 et num_classes-1
dummy_targets = torch.randint(0, num_classes, (batch_size,), dtype=torch.long)
print(f"\\nCibles factices (shape={dummy_targets.shape}, type={dummy_targets.dtype}):\\n{dummy_targets}")

# Calculer la perte
loss = criterion(dummy_logits, dummy_targets)
print(f"\\nPerte calculée (CrossEntropyLoss): {loss.item():.4f}")
print(f"Requiert gradient: {loss.requires_grad}") # True, car dummy_logits le requiert

# --- Exemple avec des poids par classe (Weighting) ---
# Utile si les classes sont déséquilibrées
class_weights = torch.tensor([0.5, 1.0, 1.0, 1.5, 1.0]) # Donner plus de poids à la classe 3
criterion_weighted = nn.CrossEntropyLoss(weight=class_weights)
loss_weighted = criterion_weighted(dummy_logits, dummy_targets)
print(f"\\nPerte calculée avec poids par classe: {loss_weighted.item():.4f}")`,isExpanded:!1},{library:"torch.utils.data",name:"Dataset",explanation:"Classe abstraite PyTorch pour représenter un jeu de données. Il faut l'hériter et implémenter deux méthodes : `__len__(self)` qui retourne la taille du dataset, et `__getitem__(self, idx)` qui retourne le i-ème échantillon du dataset.",example:`import torch
from torch.utils.data import Dataset

# Exemple simple: Dataset de paires (donnée, étiquette)
class CustomDataset(Dataset):
    def __init__(self, data, labels):
        # Assurer que data et labels ont la même longueur
        assert len(data) == len(labels), "Data and labels must have the same length"
        self.data = data
        self.labels = labels
        print(f"CustomDataset créé avec {len(data)} échantillons.")

    def __len__(self):
        # Retourne le nombre total d'échantillons dans le dataset
        return len(self.data)

    def __getitem__(self, idx):
        # Retourne le i-ème échantillon (donnée + étiquette)
        # idx est l'index demandé (de 0 à len(self)-1)
        if torch.is_tensor(idx): # Peut recevoir un tenseur d'indices
            idx = idx.tolist()

        sample_data = self.data[idx]
        sample_label = self.labels[idx]

        # Souvent, on retourne un dictionnaire ou un tuple
        sample = {'data': sample_data, 'label': sample_label}
        # print(f"__getitem__({idx}) demandé.") # Décommenter pour voir les appels
        return sample

# Créer des données factices
num_samples = 100
# Données: 100 tenseurs de taille [5]
dummy_data = [torch.randn(5) for _ in range(num_samples)]
# Étiquettes: 100 entiers (0 ou 1)
dummy_labels = [torch.randint(0, 2, (1,)).item() for _ in range(num_samples)]

# Instancier le Dataset personnalisé
my_dataset = CustomDataset(dummy_data, dummy_labels)

# Accéder à la longueur du dataset
print(f"\\nTaille du dataset (len): {len(my_dataset)}")

# Accéder à un échantillon spécifique (appelle __getitem__)
first_sample = my_dataset[0]
print(f"\\nPremier échantillon (dataset[0]): {first_sample}")

# Accéder au dernier échantillon
last_sample = my_dataset[len(my_dataset) - 1]
print(f"Dernier échantillon (dataset[-1]): {last_sample}")

# On peut itérer sur le dataset (utilise __getitem__ en interne)
# print("\\nItération sur les 3 premiers échantillons:")
# for i in range(3):
#     print(f"Échantillon {i}: {my_dataset[i]}")`,isExpanded:!1},{library:"torch.utils.data",name:"DataLoader",explanation:"Utilitaire PyTorch qui prend un `Dataset` et fournit un itérable pour parcourir les données par mini-batchs. Gère le brassage (shuffle), le chargement parallèle (multi-processing), et le regroupement automatique des échantillons en batchs (batching).",example:`import torch
from torch.utils.data import Dataset, DataLoader

# Reprendre le CustomDataset de l'exemple précédent
class CustomDataset(Dataset):
    def __init__(self, num_samples=100):
        self.num_samples = num_samples
        self.data = [torch.randn(5) for _ in range(num_samples)]
        self.labels = [torch.randint(0, 2, (1,)).item() for _ in range(num_samples)]
        print(f"CustomDataset créé avec {num_samples} échantillons.")
    def __len__(self):
        return self.num_samples
    def __getitem__(self, idx):
        # Retourne un tuple cette fois (plus courant avec DataLoader par défaut)
        return self.data[idx], self.labels[idx]

# Instancier le Dataset
dataset = CustomDataset(num_samples=53) # 53 échantillons pour voir le dernier batch

# Créer le DataLoader
batch_size = 10
# shuffle=True: mélanger les données à chaque époque
# num_workers: nombre de processus pour charger les données en parallèle (0=principal)
data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=0)

print(f"\\nDataLoader créé avec batch_size={batch_size} et shuffle=True.")
print(f"Nombre total de batchs par époque: {len(data_loader)}") # Ceil(53 / 10) = 6

# --- Itération sur le DataLoader (simule une époque d'entraînement) ---
print("\\nItération sur les batchs du DataLoader (une époque):")
for i, batch in enumerate(data_loader):
    # 'batch' est ce que __getitem__ retourne, mais regroupé
    # Ici, batch sera un tuple: (tenseur_de_donnees, tenseur_de_labels)
    batch_data, batch_labels = batch

    print(f"--- Batch {i+1}/{len(data_loader)} ---")
    print(f"  Type de batch_data: {type(batch_data)}")
    print(f"  Shape de batch_data: {batch_data.shape}") # Devrait être [batch_size, 5] sauf dernier batch
    print(f"  Type de batch_labels: {type(batch_labels)}")
    print(f"  Shape de batch_labels: {batch_labels.shape}") # Devrait être [batch_size] sauf dernier batch
    # print(f"  Labels dans ce batch: {batch_labels}")

    # Ici, on ferait la passe avant, calcul de perte, passe arrière, etc.
    # loss = model(batch_data) ...

print("\\nFin de l'itération sur le DataLoader.")`,isExpanded:!1},{library:"torch",name:"tensor()",explanation:"Fonction principale pour créer des tenseurs (tableaux multi-dimensionnels) dans PyTorch. Peut prendre des données existantes (listes Python, arrays NumPy) ou créer des tenseurs avec des dimensions spécifiques.",example:`import torch
import numpy as np

# --- Création à partir de listes Python ---
# Scalaire (tenseur 0D)
s = torch.tensor(5.0)
print(f"Scalaire: {s}, Shape: {s.shape}, Dtype: {s.dtype}")

# Vecteur (tenseur 1D)
v = torch.tensor([1, 2, 3]) # Infère dtype=torch.int64
print(f"Vecteur: {v}, Shape: {v.shape}, Dtype: {v.dtype}")

# Matrice (tenseur 2D)
m = torch.tensor([[1.0, 2.0], [3.0, 4.0]]) # Infère dtype=torch.float32
print(f"Matrice:\\n{m}, Shape: {m.shape}, Dtype: {m.dtype}")

# Tenseur 3D
t3d = torch.tensor([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(f"Tenseur 3D:\\n{t3d}, Shape: {t3d.shape}, Dtype: {t3d.dtype}")

# --- Spécifier le type de données (dtype) ---
float_tensor = torch.tensor([1, 2, 3], dtype=torch.float32)
print(f"\\nTenseur float32: {float_tensor}, Dtype: {float_tensor.dtype}")

# --- Création à partir d'array NumPy ---
np_array = np.array([[1, 2], [3, 4]])
torch_from_np = torch.tensor(np_array) # Copie les données
# Alternative: torch.from_numpy(np_array) partage la mémoire (attention!)
print(f"\\nTenseur depuis NumPy:\\n{torch_from_np}, Dtype: {torch_from_np.dtype}")

# --- Création de tenseurs spécifiques ---
# Tenseur de zéros
zeros = torch.zeros(2, 3) # Shape (2, 3)
print(f"\\nTenseur de zéros:\\n{zeros}")

# Tenseur de uns
ones = torch.ones(3, 2, dtype=torch.int)
print(f"Tenseur de uns (int):\\n{ones}")

# Tenseur avec valeurs aléatoires (distribution uniforme [0, 1))
rand_tensor = torch.rand(2, 2)
print(f"Tenseur aléatoire (rand):\\n{rand_tensor}")

# Tenseur avec valeurs aléatoires (distribution normale standard N(0, 1))
randn_tensor = torch.randn(2, 2)
print(f"Tenseur aléatoire (randn):\\n{randn_tensor}")

# Créer un tenseur avec la même shape/dtype qu'un autre
like_zeros = torch.zeros_like(m) # Zéros avec shape et dtype de m
print(f"Tenseur like zeros:\\n{like_zeros}, Dtype: {like_zeros.dtype}")`,isExpanded:!1},{library:"torch.nn.utils.rnn",name:"pad_sequence()",explanation:"Utilitaire PyTorch pour prendre une liste de tenseurs de longueurs variables (ex: séquences de mots après tokenisation) et les 'padder' (compléter avec des zéros ou une autre valeur) pour former un seul tenseur batché où toutes les séquences ont la même longueur (celle de la plus longue séquence par défaut).",example:`import torch
from torch.nn.utils.rnn import pad_sequence

# Liste de tenseurs (séquences) de longueurs différentes
# Chaque tenseur représente une séquence (ex: indices de mots)
seq1 = torch.tensor([1, 2, 3])
seq2 = torch.tensor([4, 5])
seq3 = torch.tensor([6, 7, 8, 9])

list_of_sequences = [seq1, seq2, seq3]
print("Liste de séquences originales:")
for i, seq in enumerate(list_of_sequences):
    print(f"  Seq {i+1} (shape {seq.shape}): {seq}")

# Padder les séquences pour former un batch
# Par défaut: padding_value=0.0, batch_first=False
# batch_first=False -> Output shape: (seq_len, batch_size, *)
padded_batch_default = pad_sequence(list_of_sequences)
print("\\nPadded batch (batch_first=False, défaut):")
print(f"Shape: {padded_batch_default.shape}") # Devrait être [4, 3] (seq_len=4, batch=3)
print(padded_batch_default)
# Output:
# tensor([[1, 4, 6],
#         [2, 5, 7],
#         [3, 0, 8],  <- seq2 paddée ici
#         [0, 0, 9]]) <- seq1 et seq2 paddées ici

# Padder avec batch_first=True (plus courant pour les couches Conv/Linear)
# batch_first=True -> Output shape: (batch_size, seq_len, *)
padded_batch_first = pad_sequence(list_of_sequences, batch_first=True, padding_value=-1) # Utiliser -1 comme valeur de padding
print("\\nPadded batch (batch_first=True, padding_value=-1):")
print(f"Shape: {padded_batch_first.shape}") # Devrait être [3, 4] (batch=3, seq_len=4)
print(padded_batch_first)
# Output:
# tensor([[ 1,  2,  3, -1],
#         [ 4,  5, -1, -1],
#         [ 6,  7,  8,  9]])`,isExpanded:!1},{library:"torch",name:"argmax()",explanation:"Fonction PyTorch qui retourne les indices des valeurs maximales d'un tenseur le long d'une dimension donnée. Très utilisé en classification pour obtenir la classe prédite à partir des logits ou des probabilités.",example:`import torch
import torch.nn.functional as F

# Exemple 1: Trouver l'indice max dans un vecteur
vec = torch.tensor([1.0, 5.0, 2.0, 4.5])
max_index_vec = torch.argmax(vec) # dim est 0 par défaut pour un vecteur
print(f"Vecteur: {vec}")
print(f"Indice de la valeur max: {max_index_vec}") # Output: 1 (car 5.0 est à l'indice 1)

# Exemple 2: Classification multi-classe (logits)
# Batch de 3 exemples, 4 classes possibles
logits = torch.tensor([
  [ 1.2,  0.5, -0.1,  1.5], # Exemple 1
  [-1.0,  2.5,  1.0,  0.0], # Exemple 2
  [ 0.1,  0.2,  0.3,  0.0]  # Exemple 3
])
print(f"\\nLogits (Batch=3, Classes=4):\\n{logits}")

# Trouver la classe prédite pour chaque exemple (max le long de la dimension des classes, dim=1)
predicted_classes = torch.argmax(logits, dim=1)
print(f"Classes prédites (indices max sur dim=1): {predicted_classes}")
# Output: tensor([3, 1, 2])

# Exemple 3: Avec probabilités (après Softmax)
probabilities = F.softmax(logits, dim=1)
print(f"\\nProbabilités (après Softmax):\\n{probabilities.round(decimals=3)}")
predicted_classes_proba = torch.argmax(probabilities, dim=1)
print(f"Classes prédites (depuis probabilités): {predicted_classes_proba}")
# Output: tensor([3, 1, 2]) (même résultat)

# Exemple 4: Trouver le max dans une matrice le long d'une autre dimension
mat = torch.tensor([[1, 5, 2], [6, 3, 4]])
print(f"\\nMatrice:\\n{mat}")
max_indices_dim0 = torch.argmax(mat, dim=0) # Max pour chaque colonne
print(f"Indices max le long de dim=0 (colonnes): {max_indices_dim0}") # Output: tensor([1, 0, 1])
max_indices_dim1 = torch.argmax(mat, dim=1) # Max pour chaque ligne
print(f"Indices max le long de dim=1 (lignes):   {max_indices_dim1}") # Output: tensor([1, 0])`,isExpanded:!1},{library:"torch",name:"no_grad()",explanation:"Contexte managérial (`with torch.no_grad():`) dans PyTorch qui désactive temporairement le calcul et le stockage des gradients. C'est crucial pendant l'évaluation du modèle (inférence) ou toute opération où la rétropropagation n'est pas nécessaire, car cela réduit significativement l'utilisation de la mémoire et accélère les calculs.",example:`import torch

# Créer des tenseurs qui requièrent des gradients
x = torch.tensor([2.0], requires_grad=True)
w = torch.tensor([3.0], requires_grad=True)
b = torch.tensor([1.0], requires_grad=True)

# Calcul avec suivi des gradients (par défaut)
y = w * x + b # Opération linéaire simple
print(f"Calcul de y = w*x + b")
print(f"y: {y}")
print(f"y.requires_grad: {y.requires_grad}") # True, car w et x l'ont
# y a maintenant une fonction de gradient associée (y.grad_fn)
print(f"y.grad_fn: {y.grad_fn}")

# Calculer les gradients (exemple)
# y.backward()
# print(f"Gradient de w (dy/dw = x): {w.grad}") # Devrait être 2.0
# print(f"Gradient de x (dy/dx = w): {x.grad}") # Devrait être 3.0
# w.grad.zero_() # Remettre à zéro pour la suite
# x.grad.zero_()

print("\\n--- Utilisation de torch.no_grad() ---")
# Calcul DANS le contexte no_grad
with torch.no_grad():
    z = w * x + b
    print("Calcul de z = w*x + b DANS torch.no_grad():")
    print(f"z: {z}")
    print(f"z.requires_grad: {z.requires_grad}") # FALSE!
    print(f"z.grad_fn: {z.grad_fn}") # None

# z n'a pas de fonction de gradient, on ne peut pas faire z.backward()
try:
    # z.backward() # Ceci lèverait une erreur
    pass
except RuntimeError as e:
    print(f"Erreur attendue si on essaie z.backward(): {e}")

# Les tenseurs originaux conservent leur état requires_grad
print(f"\\nAprès no_grad, w.requires_grad est toujours: {w.requires_grad}") # True

# Utilisation typique en évaluation:
# model.eval() # Met le modèle en mode évaluation (désactive Dropout, BatchNorm stats fixes)
# with torch.no_grad():
#     predictions = model(input_data)
# # Faire quelque chose avec les prédictions...`,isExpanded:!1},{library:"torchtext.data.utils",name:"get_tokenizer()",explanation:"Fonction utilitaire de TorchText (souvent de `torchtext.data.utils` ou maintenant `torchtext.datasets`) qui retourne une fonction de tokenisation. Peut utiliser des tokenizers simples basés sur des espaces ou des bibliothèques externes comme spaCy ou NLTK si elles sont installées.",example:`from torchtext.data.utils import get_tokenizer
# Note: L'emplacement peut changer légèrement entre les versions de torchtext.
# Vérifier la documentation de votre version installée.

# 1. Tokenizer de base (split sur les espaces)
tokenizer_basic = get_tokenizer(None) # Ou 'basic_english' qui fait un peu plus
text = "Here is a simple example sentence."
tokens_basic = tokenizer_basic(text)
print(f"Texte: '{text}'")
print(f"Tokens (tokenizer=None/basic): {tokens_basic}")
# Output: ['Here', 'is', 'a', 'simple', 'example', 'sentence.']

# 2. Utilisation d'un tokenizer externe (spaCy)
#    Nécessite d'avoir spaCy et le modèle de langue installés
#    (pip install spacy && python -m spacy download en_core_web_sm)
try:
    # Le nom du modèle spaCy est passé comme argument
    tokenizer_spacy = get_tokenizer("spacy", language="en_core_web_sm")
    text_spacy = "Don't hesitate to ask questions!"
    tokens_spacy = tokenizer_spacy(text_spacy)
    print(f"\\nTexte: '{text_spacy}'")
    print(f"Tokens (tokenizer=spacy): {tokens_spacy}")
    # Output: ["Do", "n't", "hesitate", "to", "ask", "questions", "!"]

except ImportError:
    print("\\nBibliothèque spaCy non trouvée. Impossible d'utiliser le tokenizer spaCy.")
except OSError:
    print("\\nModèle spaCy 'en_core_web_sm' non trouvé. Téléchargez-le avec:")
    print("python -m spacy download en_core_web_sm")

# 3. Utilisation d'un tokenizer externe (NLTK - via 'moses')
#    Nécessite NLTK (pip install nltk)
# try:
#     # 'moses' utilise souvent nltk.word_tokenize derrière
#     tokenizer_moses = get_tokenizer("moses", language="en")
#     text_moses = "Another example, using Moses (NLTK)."
#     tokens_moses = tokenizer_moses(text_moses)
#     print(f"\\nTexte: '{text_moses}'")
#     print(f"Tokens (tokenizer=moses): {tokens_moses}")

# except ImportError:
#     print("\\nBibliothèque NLTK non trouvée pour tokenizer 'moses'.")

print("\\nNote: La disponibilité des tokenizers externes dépend de leur installation.")`,isExpanded:!1},{library:"torchtext.vocab",name:"build_vocab_from_iterator()",explanation:"Fonction de TorchText pour construire un objet Vocab (mappage mot -> index et inversement) à partir d'un itérateur qui produit des listes de tokens (ex: les sorties d'un tokenizer sur un corpus). Permet de spécifier la taille maximale, la fréquence minimale, et des tokens spéciaux (comme `<unk>` pour inconnu, `<pad>` pour padding).",example:`import torch
from torchtext.vocab import build_vocab_from_iterator
from torchtext.data.utils import get_tokenizer

# 1. Données textuelles (itérable de textes)
corpus = [
    "le chat est sur le tapis",
    "le chien aboie après le chat",
    "le chat dort"
]
print("Corpus:")
for line in corpus: print(f"- {line}")

# 2. Fonction de tokenisation (itérable de listes de tokens)
tokenizer = get_tokenizer(None) # Tokenizer simple par espace

def yield_tokens(data_iter):
    for text in data_iter:
        yield tokenizer(text)

# 3. Construire le vocabulaire
# min_freq: fréquence minimale pour qu'un mot soit inclus
# specials: liste de tokens spéciaux à ajouter (toujours au début, index 0, 1, ...)
# special_first=True: mettre les spéciaux au début
vocab = build_vocab_from_iterator(
    yield_tokens(corpus),
    min_freq=1,
    specials=["<unk>", "<pad>", "<bos>", "<eos>"], # inconnu, padding, début, fin
    special_first=True
)
print("\\nVocabulaire construit.")

# 4. Utiliser le vocabulaire

# Définir le comportement pour les mots inconnus (<unk> est à l'index 0)
vocab.set_default_index(vocab["<unk>"])

print(f"Taille du vocabulaire (incluant spéciaux): {len(vocab)}")

# Mapper les mots vers les indices
print("\\nMots -> Indices:")
words_to_check = ["le", "chat", "chien", "tapis", "dort", "oiseau", "<pad>"]
for word in words_to_check:
    index = vocab[word] # Utilise l'index par défaut si mot inconnu
    print(f"- '{word}' -> {index}")
    # oiseau -> 0 (<unk>)

# Mapper des indices vers les mots (Inverse Token STring)
print("\\nIndices -> Mots:")
indices_to_check = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
itos = vocab.get_itos() # get_itos() -> list[str]
for index in indices_to_check:
    if index < len(itos):
        print(f"- {index} -> '{itos[index]}'")
    else:
        print(f"- {index} -> (hors vocabulaire)")

# Convertir une phrase en indices
text_to_convert = "le chat et le chien"
tokens = tokenizer(text_to_convert)
indices = vocab(tokens) # Le vocab est appelable!
print(f"\\nConversion: '{text_to_convert}'")
print(f"  Tokens: {tokens}")
print(f"  Indices: {indices}") # -> [4, 5, 0, 4, 6] ('et' devient <unk>)`,isExpanded:!1},{library:"sumy",name:"PlaintextParser, Tokenizer, LsaSummarizer, Stemmer, get_stop_words",explanation:"Composants de la bibliothèque Sumy pour le résumé automatique de texte. `PlaintextParser` lit le texte. `Tokenizer` le segmente. `LsaSummarizer` utilise l'Analyse Sémantique Latente (LSA) pour extraire les phrases les plus importantes. `Stemmer` réduit les mots à leur racine. `get_stop_words` fournit les mots vides.",example:`from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer as SumyTokenizer # Renommer pour éviter conflit
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

LANGUAGE = "french" # Ou "english", etc.
SENTENCES_COUNT = 2 # Nombre de phrases à extraire pour le résumé

text = """
Le traitement automatique du langage naturel (TALN), souvent appelé NLP en anglais,
est un domaine passionnant à l'intersection de l'informatique, de l'intelligence artificielle
et de la linguistique. Il vise à permettre aux ordinateurs de comprendre, d'interpréter
et de générer le langage humain. Les applications sont nombreuses : traduction automatique,
analyse de sentiments, chatbots, résumé de texte, et bien plus encore. Les défis restent
importants, notamment la compréhension du contexte et des ambiguïtés du langage.
"""

try:
    # 1. Parser le texte
    # From_string prend la chaine et la langue
    parser = PlaintextParser.from_string(text, SumyTokenizer(LANGUAGE))

    # 2. Initialiser le stemmer (pour LSA)
    stemmer = Stemmer(LANGUAGE)

    # 3. Initialiser le LsaSummarizer
    # Il prend le stemmer et les stopwords pour la langue
    summarizer = LsaSummarizer(stemmer)
    summarizer.stop_words = get_stop_words(LANGUAGE)

    # 4. Générer le résumé
    # Le summarizer est appelé sur le document du parser et le nombre de phrases souhaité
    summary = summarizer(parser.document, SENTENCES_COUNT)

    print("Texte original:")
    print(text)
    print("\\nRésumé généré (LSA):")
    for sentence in summary:
        print(f"- {sentence}")

except ImportError as e:
     print(f"Erreur d'importation Sumy ou dépendance manquante: {e}")
     print("Assurez-vous d'avoir installé sumy: pip install sumy")
     print("Et potentiellement ses dépendances NLP (comme NLTK): pip install nltk")
     print("Il peut aussi falloir télécharger des données NLTK: python -m nltk.downloader punkt stopwords")

# Output (Exemple):
# Résumé généré (LSA):
# - Le traitement automatique du langage naturel (TALN), souvent appelé NLP en anglais, est un domaine passionnant à l'intersection de l'informatique, de l'intelligence artificielle et de la linguistique.
# - Les applications sont nombreuses : traduction automatique, analyse de sentiments, chatbots, résumé de texte, et bien plus encore.`,isExpanded:!1},{library:"haystack",name:"InMemoryDocumentStore, FARMReader, EmbeddingRetriever, ExtractiveQAPipeline",explanation:"Composants clés de Haystack (un framework de QA et recherche sémantique). `DocumentStore` stocke les documents (ex: `InMemoryDocumentStore` pour la mémoire). `Retriever` trouve les documents pertinents à une requête (ex: `EmbeddingRetriever` basé sur similarité sémantique). `Reader` lit les documents pertinents et extrait la réponse exacte (ex: `FARMReader` basé sur Transformers). `Pipeline` combine Retriever et Reader. **Note:** L'import peut échouer selon l'installation et les dépendances complexes de Haystack.",example:`# --- ATTENTION: Haystack peut être complexe à installer et configurer ---
# Cet exemple est CONCEPTUEL et peut nécessiter ajustements/installations.
# L'import de ExtractiveQAPipeline peut échouer comme mentionné.

# from haystack.document_stores import InMemoryDocumentStore
# from haystack.nodes import FARMReader, EmbeddingRetriever # Ou TfidfRetriever etc.
# from haystack.utils import clean_wiki_text, convert_files_to_docs, fetch_archive_from_http
# from haystack.pipelines import ExtractiveQAPipeline

print("--- Exemple Conceptuel Haystack (Imports commentés) ---")
print("L'exécution réelle dépend d'une installation correcte et des dépendances.")

# try:
#     # 1. Initialiser le DocumentStore
#     document_store = InMemoryDocumentStore(use_bm25=True) # BM25 est souvent utilisé avec EmbeddingRetriever
#
#     # 2. Préparer des documents (exemple: télécharger et convertir)
#     # doc_dir = "data/article_txt_got"
#     # fetch_archive_from_http(
#     #     url="https://s3.eu-central-1.amazonaws.com/deepset.ai-farm-qa/datasets/documents/wiki_gameofthrones_txt1.zip",
#     #     output_dir=doc_dir
#     # )
#     # docs = convert_files_to_docs(dir_path=doc_dir, clean_func=clean_wiki_text, split_paragraphs=True)
#     # print(f"Nombre de documents préparés: {len(docs)}")
#
#     # Écrire les documents dans le DocumentStore
#     # document_store.write_documents(docs)
#     print("- DocumentStore initialisé (conceptuellement).")
#     print("- Documents chargés et écrits (conceptuellement).")
#
#     # 3. Initialiser le Retriever (basé sur Embeddings)
#     # Nécessite des modèles pour calculer les embeddings des docs et de la query
#     # retriever = EmbeddingRetriever(
#     #     document_store=document_store,
#     #     embedding_model="sentence-transformers/multi-qa-mpnet-base-dot-v1", # Exemple de modèle SBERT
#     #     model_format="sentence_transformers"
#     # )
#     # Important: Mettre à jour les embeddings dans le DocumentStore
#     # document_store.update_embeddings(retriever)
#     print("- Retriever (EmbeddingRetriever) initialisé (conceptuellement).")
#     print("- Embeddings calculés et stockés (conceptuellement).")
#
#     # 4. Initialiser le Reader (basé sur Transformers/FARM)
#     # Utilise un modèle QA pré-entraîné (type BERT)
#     # reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=True) # Utiliser GPU si disponible
#     print("- Reader (FARMReader) initialisé (conceptuellement).")
#
#     # 5. Créer le Pipeline de Question Answering Extractif
#     # Combine le Retriever et le Reader
#     # try:
#     #    qa_pipeline = ExtractiveQAPipeline(reader=reader, retriever=retriever)
#     #    print("- Pipeline (ExtractiveQAPipeline) créé (conceptuellement).")
#     # except NameError:
#     #    print("ERREUR: Impossible d'importer/créer ExtractiveQAPipeline.")
#     #    print("Vérifiez l'installation Haystack et ses dépendances.")
#     #    exit() # Arrêter si le pipeline ne peut être créé
#
#     # 6. Poser une question
#     # query = "Who is the father of Arya Stark?"
#     # params = {"Retriever": {"top_k": 10}, "Reader": {"top_k": 5}} # Combien de docs récupérer/lire
#     # prediction = qa_pipeline.run(query=query, params=params)
#
#     # print("\\nRésultats de la prédiction (conceptuel):")
#     # from haystack.utils import print_answers
#     # print_answers(prediction, details="minimum") # Afficher les réponses trouvées
#
# except ImportError as e:
#     print(f"\\nERREUR: Importation Haystack échouée: {e}")
#     print("Haystack n'est peut-être pas installé ou une dépendance manque.")
#     print("Installation: pip install farm-haystack[all]")
# except Exception as e:
#      print(f"\\nUne autre erreur est survenue: {e}")

print("\\nFin de l'exemple conceptuel Haystack.")`,isExpanded:!1},{library:"pandas",name:"DataFrame()",explanation:"Structure de données tabulaire (2D) de Pandas, similaire à une feuille de calcul ou une table SQL. Composée de lignes et de colonnes, où chaque colonne peut avoir un type de données différent. C'est l'objet central de Pandas.",example:`import pandas as pd
import numpy as np

# Création depuis un dictionnaire de listes/arrays
data_dict = {
    'colonne_A': [1, 2, 3, 4, 5],
    'colonne_B': ['a', 'b', 'c', 'd', 'e'],
    'colonne_C': np.random.rand(5) # Valeurs float aléatoires
}
df_from_dict = pd.DataFrame(data_dict)
print("DataFrame créé depuis un dictionnaire:")
print(df_from_dict)
print("\\nInfos sur le DataFrame:")
df_from_dict.info()

# Création depuis une liste de dictionnaires
data_list = [
    {'nom': 'Alice', 'age': 30, 'ville': 'Paris'},
    {'nom': 'Bob', 'age': 25, 'ville': 'Lyon'},
    {'nom': 'Charlie', 'age': 35, 'ville': 'Paris'}
]
df_from_list = pd.DataFrame(data_list)
print("\\nDataFrame créé depuis une liste de dictionnaires:")
print(df_from_list)

# Spécifier l'index
index_labels = ['ligne1', 'ligne2', 'ligne3', 'ligne4', 'ligne5']
df_with_index = pd.DataFrame(data_dict, index=index_labels)
print("\\nDataFrame avec index personnalisé:")
print(df_with_index)

# Accès aux données
print("\\nAccès aux données:")
print("Premières 2 lignes (head(2)):")
print(df_from_dict.head(2))
print("\\nColonne 'colonne_B':")
print(df_from_dict['colonne_B']) # Retourne une Series Pandas
print("\\nLigne avec index 'ligne2' (loc):")
print(df_with_index.loc['ligne2']) # Accès par label d'index
print("\\nLigne à la position 1 (iloc):")
print(df_from_dict.iloc[1]) # Accès par position entière`,isExpanded:!1},{library:"pandas",name:"read_csv()",explanation:"Fonction Pandas très utilisée pour lire des données depuis un fichier CSV (Comma Separated Values) et les charger dans un DataFrame.",example:`import pandas as pd
import io # Pour simuler un fichier CSV en mémoire

# Simuler un fichier CSV avec des données
csv_data = """ID,Nom,Score,Ville
1,Alice,85,Paris
2,Bob,92,Lyon
3,Charlie,78,Paris
4,David,88,Marseille
"""

# Utiliser io.StringIO pour lire la chaîne comme un fichier
csv_file = io.StringIO(csv_data)

try:
    # Lire le fichier CSV simulé
    # sep=',' est le séparateur par défaut
    # header=0 signifie que la première ligne contient les noms de colonnes
    df = pd.read_csv(csv_file) # Ou pd.read_csv("chemin/vers/votre/fichier.csv")

    print("DataFrame lu depuis le CSV:")
    print(df)

    print("\\nInfos sur le DataFrame chargé:")
    df.info()

    print("\\nTypes de données des colonnes:")
    print(df.dtypes)

except FileNotFoundError:
    print("Erreur: Le fichier CSV spécifié n'a pas été trouvé.")
except Exception as e:
    print(f"Une erreur est survenue lors de la lecture du CSV: {e}")

# --- Exemple avec options ---
csv_data_options = """col1;col2;col3
10;apple;true
20;banana;false
# ceci est un commentaire
30;cherry;true
"""
csv_file_options = io.StringIO(csv_data_options)

df_options = pd.read_csv(
    csv_file_options,
    sep=';',           # Spécifier le séparateur point-virgule
    comment='#',       # Ignorer les lignes commençant par #
    dtype={'col1': int, 'col2': str, 'col3': bool} # Spécifier les types
)
print("\\nDataFrame lu avec options (sep=';', comment='#', dtype):")
print(df_options)
print(df_options.dtypes)`,isExpanded:!1},{library:"numpy",name:"dot()",explanation:"Fonction NumPy (ou méthode des arrays NumPy) pour calculer le produit scalaire (dot product) de deux vecteurs ou la multiplication matricielle de deux matrices.",example:`import numpy as np

# 1. Produit scalaire de deux vecteurs (1D arrays)
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
# Produit scalaire = (1*4) + (2*5) + (3*6) = 4 + 10 + 18 = 32
dot_product_v = np.dot(a, b)
# Alternative: dot_product_v = a.dot(b)
# Alternative: dot_product_v = a @ b # Opérateur Python 3.5+ pour mult matricielle/dot

print(f"Vecteur a: {a}")
print(f"Vecteur b: {b}")
print(f"Produit scalaire (np.dot(a, b)): {dot_product_v}")
print(f"Produit scalaire (a @ b): {a @ b}")


# 2. Multiplication de matrices (2D arrays)
# Matrice M (2x3)
M = np.array([[1, 2, 3],
              [4, 5, 6]])
# Matrice N (3x2)
N = np.array([[7, 8],
              [9, 10],
              [11, 12]])
# Résultat P (2x2)
dot_product_m = np.dot(M, N)
# Alternative: dot_product_m = M @ N

print(f"\\nMatrice M (shape {M.shape}):\\n{M}")
print(f"Matrice N (shape {N.shape}):\\n{N}")
print(f"Produit matriciel (np.dot(M, N)) (shape {dot_product_m.shape}):\\n{dot_product_m}")
# P[0,0] = (1*7 + 2*9 + 3*11) = 7 + 18 + 33 = 58
# P[0,1] = (1*8 + 2*10 + 3*12) = 8 + 20 + 36 = 64
# P[1,0] = (4*7 + 5*9 + 6*11) = 28 + 45 + 66 = 139
# P[1,1] = (4*8 + 5*10 + 6*12) = 32 + 50 + 72 = 154
print(f"Produit matriciel (M @ N):\\n{M @ N}")

# 3. Produit d'une matrice et d'un vecteur
# P (2x2)
# v (2,) -> traité comme (2x1) implicitement dans ce cas
v_vec = np.array([1, 2])
dot_product_mv = np.dot(dot_product_m, v_vec) # Résultat (2,)
# Alternative: dot_product_mv = dot_product_m @ v_vec
print(f"\\nMatrice P:\\n{dot_product_m}")
print(f"Vecteur v: {v_vec}")
print(f"Produit Mv (np.dot(P, v)): {dot_product_mv}") # [58*1+64*2, 139*1+154*2] = [186, 447]`,isExpanded:!1},{library:"numpy.linalg",name:"norm()",explanation:"Fonction NumPy du sous-module `linalg` (Linear Algebra) pour calculer la norme (ou magnitude) d'un vecteur ou d'une matrice. La norme L2 (Euclidienne) est la plus courante pour les vecteurs.",example:`import numpy as np
from numpy.linalg import norm

# 1. Norme d'un vecteur (par défaut: Norme L2 ou Euclidienne)
v = np.array([3, 4]) # Vecteur dans R^2
# Norme L2 = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5
norm_l2 = norm(v)
print(f"Vecteur v: {v}")
print(f"Norme L2 (Euclidienne) de v: {norm_l2}")

# Norme L1 (Manhattan distance) = sum(|x_i|)
norm_l1 = norm(v, ord=1)
print(f"Norme L1 de v: {norm_l1}") # Output: 7 (|3| + |4|)

# Norme L-infini = max(|x_i|)
norm_linf = norm(v, ord=np.inf)
print(f"Norme L-infini de v: {norm_linf}") # Output: 4 (max(|3|, |4|))


# 2. Norme d'une matrice
M = np.array([[1, 2], [3, 4]])
print(f"\\nMatrice M:\\n{M}")

# Norme de Frobenius (par défaut pour les matrices)
# sqrt(sum(all elements squared)) = sqrt(1^2 + 2^2 + 3^2 + 4^2)
# = sqrt(1 + 4 + 9 + 16) = sqrt(30) ~= 5.477
norm_fro = norm(M) # Ou norm(M, ord='fro')
print(f"Norme de Frobenius de M: {norm_fro:.4f}")

# Norme L1 (max column sum) = max(1+3, 2+4) = max(4, 6) = 6
norm_mat_l1 = norm(M, ord=1)
print(f"Norme L1 matricielle (max col sum): {norm_mat_l1}")

# Norme L-infini (max row sum) = max(1+2, 3+4) = max(3, 7) = 7
norm_mat_linf = norm(M, ord=np.inf)
print(f"Norme L-infini matricielle (max row sum): {norm_mat_linf}")`,isExpanded:!1},{library:"numpy",name:"zeros()",explanation:"Fonction NumPy pour créer un nouvel array rempli de zéros, avec une forme (shape) et un type de données (dtype) spécifiés.",example:`import numpy as np

# Créer un vecteur (1D array) de 5 zéros
# Par défaut, dtype est float64
zeros_vec = np.zeros(5)
print(f"Vecteur de zéros (shape={zeros_vec.shape}, dtype={zeros_vec.dtype}):")
print(zeros_vec)

# Créer une matrice (2D array) de zéros (3 lignes, 4 colonnes)
zeros_mat = np.zeros((3, 4)) # La shape est passée comme un tuple
print(f"\\nMatrice de zéros (shape={zeros_mat.shape}, dtype={zeros_mat.dtype}):")
print(zeros_mat)

# Créer un array de zéros avec un type entier (int)
zeros_int = np.zeros((2, 2), dtype=int) # Ou np.int32, np.int64
print(f"\\nMatrice de zéros entiers (shape={zeros_int.shape}, dtype={zeros_int.dtype}):")
print(zeros_int)

# Créer un array de zéros avec la même forme qu'un autre array
existing_array = np.array([[1, 2], [3, 4], [5, 6]])
zeros_like = np.zeros_like(existing_array) # Prend la shape et le dtype de l'existant
print(f"\\nArray 'existing_array' (shape={existing_array.shape}, dtype={existing_array.dtype}):\\n{existing_array}")
print(f"Zeros avec la même forme (shape={zeros_like.shape}, dtype={zeros_like.dtype}):\\n{zeros_like}")`,isExpanded:!1},{library:"numpy",name:"argmax()",explanation:"Fonction NumPy qui retourne les indices des éléments maximums d'un array le long d'un axe spécifié. Très similaire à `torch.argmax()`.",example:`import numpy as np

# Exemple 1: Trouver l'indice max dans un vecteur (1D array)
vec = np.array([1.0, 5.0, 2.0, 4.5, 5.0]) # Note: 5.0 apparaît deux fois
max_index_vec = np.argmax(vec) # axis est None ou 0 par défaut pour 1D
print(f"Vecteur: {vec}")
# Retourne le premier indice du maximum si plusieurs occurrences
print(f"Indice de la valeur max: {max_index_vec}") # Output: 1

# Exemple 2: Trouver les indices max le long des axes d'une matrice (2D array)
mat = np.array([[1, 5, 2],
                [6, 3, 5],
                [4, 6, 1]])
print(f"\\nMatrice:\\n{mat}")

# Indices max pour chaque colonne (le long de l'axe 0)
max_indices_axis0 = np.argmax(mat, axis=0)
print(f"Indices max le long de axis=0 (colonnes): {max_indices_axis0}")
# Colonne 0: max(1, 6, 4)=6 à l'indice 1
# Colonne 1: max(5, 3, 6)=6 à l'indice 2
# Colonne 2: max(2, 5, 1)=5 à l'indice 1
# Output: [1 2 1]

# Indices max pour chaque ligne (le long de l'axe 1)
max_indices_axis1 = np.argmax(mat, axis=1)
print(f"Indices max le long de axis=1 (lignes):   {max_indices_axis1}")
# Ligne 0: max(1, 5, 2)=5 à l'indice 1
# Ligne 1: max(6, 3, 5)=6 à l'indice 0
# Ligne 2: max(4, 6, 1)=6 à l'indice 1
# Output: [1 0 1]

# Trouver l'indice max dans l'array aplati (flattened)
max_index_flat = np.argmax(mat) # axis=None par défaut
# L'array aplati est [1, 5, 2, 6, 3, 5, 4, 6, 1]
# Le max est 6, première occurrence à l'indice 3, seconde à l'indice 7
print(f"Indice max dans l'array aplati: {max_index_flat}") # Output: 3`,isExpanded:!1},{library:"matplotlib.pyplot",name:"figure(), plot(), show()",explanation:"`matplotlib.pyplot` est une collection de fonctions style MATLAB pour créer des visualisations. `figure()` crée une nouvelle figure (fenêtre ou zone de dessin). `plot()` dessine des points (x, y) et les relie par des lignes. `show()` affiche la figure créée.",example:`import matplotlib.pyplot as plt
import numpy as np

# --- ATTENTION ---
# Ce code génère un graphique dans une fenêtre séparée ou dans
# l'output d'un notebook Jupyter. Il ne s'affiche pas directement
# dans une application web Vue.js sans intégration spécifique.
# L'exemple montre le code Python qui serait utilisé.

print("--- Code Matplotlib pour générer un graphique simple ---")
print("Exécutez ce code dans un environnement Python avec Matplotlib.")

# 1. Préparer les données
x = np.linspace(0, 10, 100) # 100 points entre 0 et 10
y_sin = np.sin(x)
y_cos = np.cos(x)

# 2. Créer une figure et des axes (implicite ici)
# plt.figure(figsize=(8, 6)) # Optionnel: créer une figure avec une taille spécifique

# 3. Dessiner les courbes (plot)
plt.plot(x, y_sin, label='sin(x)', color='blue', linestyle='-')
plt.plot(x, y_cos, label='cos(x)', color='red', linestyle='--')

# 4. Ajouter des éléments au graphique (optionnel)
plt.title('Fonctions Sinus et Cosinus')
plt.xlabel('x')
plt.ylabel('y')
plt.legend() # Afficher les labels définis dans plot()
plt.grid(True) # Ajouter une grille
plt.xlim(0, 10) # Limiter l'axe x
plt.ylim(-1.2, 1.2) # Limiter l'axe y

# 5. Afficher le graphique
print("Appel de plt.show() pour afficher le graphique...")
# plt.show() # Décommenter pour exécuter et voir le graphique

print("--- Code Matplotlib ---")
print("import matplotlib.pyplot as plt")
print("import numpy as np")
print("x = np.linspace(0, 10, 100)")
print("y_sin = np.sin(x)")
print("plt.figure()")
print("plt.plot(x, y_sin, label='sin(x)')")
print("plt.title('Exemple Sinus')")
print("plt.xlabel('x')")
print("plt.ylabel('sin(x)')")
print("plt.legend()")
print("plt.grid(True)")
print("# plt.show()")`,isExpanded:!1},{library:"colorama",name:"Fore, Style",explanation:"Colorama est une bibliothèque Python simple pour produire du texte en couleur dans les terminaux multi-plateformes. `Fore` est utilisé pour changer la couleur du texte (avant-plan), `Style` pour changer le style (ex: `BRIGHT`, `RESET_ALL`). Nécessite `colorama.init()` au début du script.",example:`# --- ATTENTION ---
# Ce code produit des couleurs dans la sortie du terminal.
# L'effet ne sera pas visible dans une page web HTML standard.

# import colorama
# from colorama import Fore, Back, Style

# # Initialiser colorama (important!)
# colorama.init(autoreset=True) # autoreset=True remet le style par défaut après chaque print

# print("--- Exemple d'utilisation de Colorama ---")

# # Texte normal
# print("Ceci est du texte normal.")

# # Texte en couleur (avant-plan)
# print(Fore.RED + "Ceci est en rouge.")
# print(Fore.GREEN + "Ceci est en vert.")
# print(Fore.YELLOW + Style.BRIGHT + "Ceci est en jaune vif.") # Combinaison couleur + style

# # Utilisation de Style
# print(Style.DIM + "Ceci est du texte atténué (dim).")
# print(Fore.CYAN + "Ceci est en cyan (reset auto grâce à init).")

# # Si autoreset=False, il faut reset manuellement
# # colorama.init(autoreset=False)
# # print(Fore.MAGENTA + "Magenta")
# # print("Toujours magenta sans reset")
# # print(Style.RESET_ALL + "Retour à la normale après RESET_ALL")

# print("--- Code Colorama ---")
print("# import colorama")
print("# from colorama import Fore, Style")
print("# colorama.init(autoreset=True)")
print("# print(Fore.BLUE + 'Texte en bleu')")
print("# print(Fore.GREEN + Style.BRIGHT + 'Texte en vert vif')")
print("# print('Texte normal à nouveau')")`,isExpanded:!1},{library:"csv",name:"writer(), writerow()",explanation:"Module intégré Python pour lire et écrire des fichiers CSV. `csv.writer()` crée un objet writer pour écrire dans un fichier ouvert. `writerow()` écrit une ligne (une liste ou un tuple) dans le fichier CSV, en gérant correctement les délimiteurs et les caractères d'échappement.",example:`import csv
import io # Pour écrire dans une chaîne en mémoire au lieu d'un fichier

# Données à écrire (liste de listes/tuples)
data_to_write = [
    ['Nom', 'Age', 'Ville'],
    ['Alice', 30, 'Paris'],
    ['Bob', 25, 'Lyon'],
    ['Charlie', 35, 'Paris']
]

# Utiliser io.StringIO pour capturer la sortie CSV
output_buffer = io.StringIO()

# Créer un writer CSV
# newline='' est important pour éviter les lignes vides supplémentaires sous Windows
# delimiter: le caractère séparateur (',' par défaut)
# quotechar: caractère pour entourer les champs contenant le délimiteur ('"' par défaut)
# quoting: quand utiliser les guillemets (csv.QUOTE_MINIMAL, csv.QUOTE_ALL, etc.)
csv_writer = csv.writer(output_buffer, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

print("Écriture des données dans le buffer CSV...")
try:
    # Écrire les lignes une par une
    for row in data_to_write:
        csv_writer.writerow(row)
        print(f"- Ligne écrite: {row}")

    # Alternative: écrire toutes les lignes d'un coup
    # csv_writer.writerows(data_to_write)

    print("\\nÉcriture terminée.")

    # Obtenir le contenu du buffer
    csv_output = output_buffer.getvalue()
    print("\\nContenu du CSV généré:")
    print(csv_output)

except csv.Error as e:
    print(f"Erreur CSV: {e}")
finally:
    # Fermer le buffer (similaire à fermer un fichier)
    output_buffer.close()

# Exemple avec un champ contenant le délimiteur
data_with_comma = [
    ['Titre', 'Description'],
    ['Item 1', 'Simple'],
    ['Item 2', 'Contient une virgule, ici']
]
output_buffer_comma = io.StringIO()
csv_writer_comma = csv.writer(output_buffer_comma)
csv_writer_comma.writerows(data_with_comma)
print("\\nExemple avec virgule dans un champ:")
print(output_buffer_comma.getvalue())
# Output: "Item 2","Contient une virgule, ici" (guillemets ajoutés automatiquement)
output_buffer_comma.close()`,isExpanded:!1},{library:"operator",name:"itemgetter()",explanation:"`operator.itemgetter(item)` retourne une fonction appelable qui récupère l'élément `item` de son opérande. Si plusieurs items sont spécifiés, elle retourne un tuple d'éléments. Très utile comme clé pour les fonctions de tri (`sorted()`, `list.sort()`).",example:`import operator

# Exemple 1: Récupérer un seul élément (utile pour trier des listes de tuples/listes)
data = [('pomme', 5, 0.5), ('banane', 2, 0.3), ('orange', 8, 0.4)]
print(f"Données: {data}")

# Trier par le deuxième élément (quantité, index 1)
get_quantity = operator.itemgetter(1) # Crée une fonction qui prend x et retourne x[1]
# Equivalent à: get_quantity = lambda x: x[1]

# Utilisation avec sorted()
sorted_by_quantity = sorted(data, key=get_quantity)
print(f"Trié par quantité (index 1): {sorted_by_quantity}")
# Output: [('banane', 2, 0.3), ('pomme', 5, 0.5), ('orange', 8, 0.4)]

# Trier par le premier élément (nom, index 0) - on peut passer itemgetter directement
sorted_by_name = sorted(data, key=operator.itemgetter(0))
print(f"Trié par nom (index 0): {sorted_by_name}")
# Output: [('banane', 2, 0.3), ('orange', 8, 0.4), ('pomme', 5, 0.5)]

# Exemple 2: Récupérer plusieurs éléments
get_name_and_price = operator.itemgetter(0, 2) # Crée une fonction qui retourne (x[0], x[2])

# Appliquer la fonction à un élément
item = data[0] # ('pomme', 5, 0.5)
name_price = get_name_and_price(item)
print(f"\\nÉlément: {item}")
print(f"Nom et prix récupérés (indices 0, 2): {name_price}") # Output: ('pomme', 0.5)

# Exemple 3: Utilisation avec des dictionnaires
data_dict = [{'nom': 'A', 'val': 10}, {'nom': 'B', 'val': 5}, {'nom': 'C', 'val': 15}]
print(f"\\nDonnées (liste de dicts): {data_dict}")

# Trier par la clé 'val'
sorted_dict_by_val = sorted(data_dict, key=operator.itemgetter('val'))
print(f"Trié par 'val': {sorted_dict_by_val}")
# Output: [{'nom': 'B', 'val': 5}, {'nom': 'A', 'val': 10}, {'nom': 'C', 'val': 15}]`,isExpanded:!1},{library:"collections",name:"defaultdict()",explanation:"Sous-classe de `dict` qui appelle une fonction 'factory' (fournie lors de la création) pour fournir une valeur par défaut lorsqu'une clé inexistante est accédée (au lieu de lever une `KeyError`). Utile pour regrouper ou compter des éléments.",example:`from collections import defaultdict

# Exemple 1: Compter les occurrences de mots
text = "le chat et le chien et le chat"
words = text.split()
print(f"Texte: '{text}'")
print(f"Mots: {words}")

# Créer un defaultdict avec int comme factory (int() retourne 0)
word_counts = defaultdict(int)

# Itérer et compter
for word in words:
    word_counts[word] += 1 # Si word n'existe pas, int() est appelé (retourne 0), puis on fait 0 + 1

print("\\nComptage des mots (defaultdict(int)):")
print(word_counts)
# Output: defaultdict(<class 'int'>, {'le': 3, 'chat': 2, 'et': 2, 'chien': 1})
# Fonctionne comme un dict normal pour l'accès:
print(f"Compte pour 'chat': {word_counts['chat']}") # 2
print(f"Compte pour 'oiseau' (clé inconnue): {word_counts['oiseau']}") # 0 (grâce au defaultdict)

# Convertir en dict normal si besoin
regular_dict = dict(word_counts)
print(f"Converti en dict normal: {regular_dict}")


# Exemple 2: Regrouper des éléments par catégorie
data = [('fruit', 'pomme'), ('legume', 'carotte'), ('fruit', 'banane'),
        ('legume', 'brocoli'), ('fruit', 'orange')]
print(f"\\nDonnées: {data}")

# Créer un defaultdict avec list comme factory (list() retourne [])
grouped_data = defaultdict(list)

# Regrouper
for category, item in data:
    grouped_data[category].append(item) # Si category n'existe pas, list() est appelé (crée une liste vide), puis append

print("\\nDonnées groupées (defaultdict(list)):")
print(grouped_data)
# Output:
# defaultdict(<class 'list'>, {
#  'fruit': ['pomme', 'banane', 'orange'],
#  'legume': ['carotte', 'brocoli']
# })

# Accéder à une catégorie existante
print(f"Fruits: {grouped_data['fruit']}")
# Accéder à une catégorie inexistante
print(f"Viandes (clé inconnue): {grouped_data['viande']}") # [] (grâce au defaultdict)`,isExpanded:!1},{library:"bs4",name:"BeautifulSoup()",explanation:"Classe principale de la bibliothèque Beautiful Soup 4. Prend en entrée du contenu HTML ou XML (sous forme de chaîne ou de fichier) et un nom de parseur (ex: 'html.parser', 'lxml', 'xml') pour créer un objet 'soup' qui représente le document parsé sous forme d'arbre.",example:`from bs4 import BeautifulSoup

# Exemple de contenu HTML (chaîne de caractères)
html_doc = """
<html><head><title>Titre de la page</title></head>
<body>
<p class="content">Premier paragraphe.</p>
<p class="content" id="second">Second paragraphe avec <a href="/lien" class="link">un lien</a>.</p>
<div id="footer">
    <span>Pied de page</span>
</div>
</body></html>
"""

# Créer l'objet BeautifulSoup
# 'html.parser' est le parseur intégré de Python (pas de dépendance externe)
# 'lxml' est plus rapide mais nécessite 'pip install lxml'
# 'html5lib' est très tolérant aux erreurs mais nécessite 'pip install html5lib'
soup = BeautifulSoup(html_doc, 'html.parser')
print("Objet BeautifulSoup créé avec 'html.parser'.")

# --- Exploration de base de l'objet 'soup' ---

# Afficher le HTML joliment indenté (pretty print)
# print("\\nHTML indenté (prettify):")
# print(soup.prettify())

# Accéder au titre
print(f"\\nTitre de la page: {soup.title}") # <title>Titre de la page</title>
print(f"Nom de la balise titre: {soup.title.name}") # 'title'
print(f"Contenu texte du titre: {soup.title.string}") # 'Titre de la page'

# Accéder au premier paragraphe <p>
first_p = soup.p # Ou soup.find('p')
print(f"\\nPremier paragraphe: {first_p}")
print(f"Attributs de classe du premier p: {first_p['class']}") # ['content']

# Accéder au lien <a> dans le second paragraphe
link = soup.find('a') # Trouve la première balise 'a'
print(f"\\nLien trouvé: {link}")
print(f"Attribut href du lien: {link['href']}") # '/lien'
print(f"Texte du lien: {link.string}") # 'un lien'

# Trouver un élément par son ID
footer_div = soup.find(id="footer")
print(f"\\nDiv avec id='footer': {footer_div}")

# Voir 'find_all()' pour trouver plusieurs éléments.`,isExpanded:!1},{library:"bs4",name:"find_all()",explanation:"Méthode de l'objet BeautifulSoup (ou d'une balise trouvée) qui recherche tous les descendants correspondant aux critères spécifiés (nom de balise, attributs CSS, texte, etc.) et les retourne sous forme de liste (`ResultSet`).",example:`from bs4 import BeautifulSoup

html_doc = """
<html><head><title>Liste d'items</title></head>
<body>
<h1>Produits</h1>
<ul>
  <li class="item promo" id="item1">Pomme</li>
  <li class="item" id="item2">Banane</li>
  <li class="item promo" id="item3">Orange</li>
</ul>
<p>Fin de la liste.</p>
<a href="/page1">Lien 1</a>
<a href="/page2" class="external">Lien 2</a>
</body></html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')
print("HTML parsé.")

# 1. Trouver toutes les balises <li>
all_li = soup.find_all('li')
print(f"\\n--- Toutes les balises <li> ({len(all_li)} trouvées) ---")
for li in all_li:
    print(f"- {li.string} (id={li.get('id', 'N/A')})") # Utiliser .get pour éviter KeyError

# 2. Trouver tous les éléments avec la classe "item"
items = soup.find_all(class_="item") # Noter l'underscore après class_
print(f"\\n--- Éléments avec class='item' ({len(items)} trouvés) ---")
for item in items:
    print(f"- {item}")

# 3. Trouver tous les éléments avec la classe "promo"
promos = soup.find_all(class_="promo")
print(f"\\n--- Éléments avec class='promo' ({len(promos)} trouvés) ---")
for promo in promos:
    print(f"- {promo.string}")

# 4. Trouver un élément par ID (find() est plus direct, mais find_all retourne une liste)
item2_list = soup.find_all(id="item2")
print(f"\\n--- Éléments avec id='item2' ({len(item2_list)} trouvés) ---")
if item2_list:
    print(f"- {item2_list[0]}")

# 5. Trouver toutes les balises <li> ET qui ont la classe "promo"
# On peut passer un dictionnaire pour les attributs
promo_lis = soup.find_all('li', class_='promo') # Ou attrs={'class': 'promo'}
print(f"\\n--- Balises <li> avec class='promo' ({len(promo_lis)} trouvées) ---")
for li in promo_lis:
    print(f"- {li.string}")

# 6. Trouver toutes les balises <a>
all_a = soup.find_all('a')
print(f"\\n--- Toutes les balises <a> ({len(all_a)} trouvées) ---")
for a in all_a:
    print(f"- Texte: {a.string}, Href: {a['href']}, Classes: {a.get('class', [])}")

# 7. Utiliser une fonction lambda pour un filtre complexe (ex: liens externes)
# def is_external_link(tag):
#     return tag.name == 'a' and tag.has_attr('class') and 'external' in tag['class']
# external_links = soup.find_all(is_external_link)
# print(f"\\n--- Liens externes (filtre lambda) ({len(external_links)} trouvés) ---")
# for link in external_links:
#     print(f"- {link}")`,isExpanded:!1}]),r=nn(""),n=Ns(()=>{if(!r.value.trim())return t.value;const i=r.value.toLowerCase().trim();return t.value.filter(o=>o.library.toLowerCase().includes(i)||o.name.toLowerCase().includes(i)||o.explanation.toLowerCase().includes(i))});function s(i){i.isExpanded=!i.isExpanded}return(i,o)=>(ce(),me("div",ca,[j("header",null,[o[1]||(o[1]=j("h1",null,"Référence des Fonctions NLP en Python",-1)),o[2]||(o[2]=j("p",null,"Une collection de fonctions et classes utiles pour le Traitement Automatique du Langage Naturel, avec explications et exemples.",-1)),j("div",pa,[on(j("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=a=>r.value=a),placeholder:"Rechercher une fonction, bibliothèque ou mot-clé...","aria-label":"Rechercher une fonction"},null,512),[[na,r.value]])])]),j("main",null,[n.value.length===0?(ce(),me("div",da,' Aucune fonction trouvée pour "'+Ge(r.value)+'". ',1)):(ce(),me("ul",ma,[(ce(!0),me(ke,null,Gi(n.value,(a,u)=>(ce(),me("li",{key:`${a.library}-${a.name}-${u}`,class:Zt(["function-item",{expanded:a.isExpanded}])},[j("div",{class:"item-header",onClick:m=>s(a)},[j("span",_a,Ge(a.library),1),j("span",ha,Ge(a.name),1),j("span",ga,Ge(a.isExpanded?"−":"+"),1)],8,fa),on(j("div",xa,[o[9]||(o[9]=j("h4",null,"Explication",-1)),j("p",ba,Ge(a.explanation),1),o[10]||(o[10]=j("h4",null,"Exemple",-1)),j("pre",null,[j("code",ya,Ge(a.example),1)]),a.library.startsWith("nltk")&&(a.name.includes("tokenize")||a.name.includes("tag")||a.name.includes("movie_reviews")||a.name.includes("cmudict")||a.name.includes("stopwords")||a.name.includes("WordNetLemmatizer"))?(ce(),me("p",va,o[3]||(o[3]=[j("strong",null,"Note NLTK:",-1),$e(" Cette fonction peut nécessiter le téléchargement de données supplémentaires via `nltk.download('...')`. Voir les commentaires dans l'exemple. ")]))):et("",!0),a.library.startsWith("spacy")&&(a.name.includes("load")||a.name.includes("vector")||a.name.includes("similarity"))?(ce(),me("p",ka,o[4]||(o[4]=[j("strong",null,"Note spaCy:",-1),$e(" Cette fonction nécessite souvent un modèle linguistique pré-entraîné (ex: 'en_core_web_sm'). Téléchargez-le avec `python -m spacy download nom_du_modele`. Les fonctions `.vector` et `.similarity` requièrent des modèles avec vecteurs (`md` ou `lg`). ")]))):et("",!0),a.library.startsWith("haystack")?(ce(),me("p",Ta,o[5]||(o[5]=[j("strong",null,"Note Haystack:",-1),$e(" Haystack est un framework puissant mais complexe à installer. Les imports et l'exécution peuvent nécessiter une configuration spécifique et des dépendances lourdes (`pip install farm-haystack[all]`). L'exemple fourni est principalement conceptuel. ")]))):et("",!0),a.library.startsWith("matplotlib")?(ce(),me("p",wa,o[6]||(o[6]=[j("strong",null,"Note Matplotlib:",-1),$e(" Le code `matplotlib.pyplot` génère des graphiques. L'appel à `plt.show()` affichera le graphique dans une fenêtre séparée ou l'output d'un notebook, pas directement dans cette page web. ")]))):et("",!0),a.library.startsWith("colorama")?(ce(),me("p",qa,o[7]||(o[7]=[j("strong",null,"Note Colorama:",-1),$e(" Ce code produit du texte coloré dans un terminal compatible. L'effet n'est pas visible ici. ")]))):et("",!0),a.library.includes("displacy")&&a.name.includes("serve")?(ce(),me("p",Ca,o[8]||(o[8]=[j("strong",null,"Note spaCy Displacy:",-1),$e(" `displacy.serve()` lance un serveur web local. Il ne s'arrêtera pas automatiquement et doit être stoppé manuellement (Ctrl+C). ")]))):et("",!0)],512),[[Bo,a.isExpanded]])],2))),128))]))]),o[11]||(o[11]=j("footer",null,[j("p",null,"Application Vue.js simple pour la référence NLP.")],-1))]))}},Ea=ua(Sa,[["__scopeId","data-v-06f0fbb4"]]);oa(Ea).mount("#app");
