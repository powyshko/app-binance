import{d as y,r as m,_ as B,s as T,o as k,a as i,c as l,b as V,u,i as U,e as o,F as w,f as D,t as d,p as b,g as I}from"./index-CLUkZpL2.js";import{u as x,V as N}from"./VSelect-BiFE__6c.js";const P=y("settings",()=>{const s=["BTCUSDT","BNBBTC","ETHBTC"],e=m("BTCUSDT"),a=m([]);return{currencyPairs:s,selectedPair:e,currencyPairChanges:a,setSelectedPair:r=>{e.value=r},addCurrencyPairChange:r=>{a.value.unshift(r)}}}),h=s=>(b("data-v-43ec50a3"),s=s(),I(),s),E={class:"settings-page"},F=h(()=>o("h1",{class:"settings-page__title"},"Настройки",-1)),L={class:"settings-page__logs"},O=h(()=>o("h2",{class:"settings-page__subtitle"},"Лог изменений:",-1)),R={__name:"SettingsPage",setup(s){const{selectedPair:e,currencyPairChanges:a}=T(P()),{currencyPairs:p,setSelectedPair:g,addCurrencyPairChange:r}=P(),{fetchOrderBookSnapshot:S,handleWebSocketUpdates:C}=x(),f=()=>a.value.length>0?a.value[0].to:"BTCUSDT",v=async n=>{const t={from:f(),to:n,timestamp:new Date().toLocaleTimeString()};g(n),r(t),await _()},_=async()=>{await S(e.value),C(e.value)};return k(async()=>{await _()}),(n,c)=>(i(),l("div",E,[F,V(N,{modelValue:u(e),"onUpdate:modelValue":[c[0]||(c[0]=t=>U(e)?e.value=t:null),v],items:u(p),variant:"underlined",label:"Выберите валютную пару"},null,8,["modelValue","items"]),o("div",L,[O,o("ul",null,[(i(!0),l(w,null,D(u(a),t=>(i(),l("li",{key:t.timestamp},d(t.from)+" → "+d(t.to)+" ("+d(t.timestamp)+") ",1))),128))])])]))}},W=B(R,[["__scopeId","data-v-43ec50a3"]]);export{W as default};