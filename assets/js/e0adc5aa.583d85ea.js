"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[214],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>m});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),u=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=u(e.components);return n.createElement(s.Provider,{value:r},e.children)},y="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},c=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),y=u(t),c=a,m=y["".concat(s,".").concat(c)]||y[c]||d[c]||o;return t?n.createElement(m,i(i({ref:r},p),{},{components:t})):n.createElement(m,i({ref:r},p))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=c;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[y]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=t[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}c.displayName="MDXCreateElement"},6079:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=t(7462),a=(t(7294),t(3905));const o={title:"duoLayer()"},i=void 0,l={unversionedId:"rules/duo-layer",id:"rules/duo-layer",title:"duoLayer()",description:"Duo layer is a step further of hyper layer inspired by @mxstbr's Karabiner Elements configuration.",source:"@site/docs/rules/duo-layer.md",sourceDirName:"rules",slug:"/rules/duo-layer",permalink:"/karabiner.ts/rules/duo-layer",draft:!1,tags:[],version:"current",frontMatter:{title:"duoLayer()"},sidebar:"docs",previous:{title:"hyperLayer() / modifierLayer()",permalink:"/karabiner.ts/rules/hyper-layer"},next:{title:"from / map*()",permalink:"/karabiner.ts/manipulators/from"}},s={},u=[{value:"How duo layer works",id:"how-duo-layer-works",level:2},{value:"Problems in duo layer",id:"problems-in-duo-layer",level:2}],p={toc:u},y="wrapper";function d(e){let{components:r,...t}=e;return(0,a.kt)(y,(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Duo layer is a step further of ",(0,a.kt)("a",{parentName:"p",href:"./hyper-layer"},"hyper layer")," inspired by ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mxstbr/karabiner"},"@mxstbr's Karabiner Elements configuration"),".\nInstead of using hyper or any modifier(s), duo layer use any 2 keys together as the\nlayer trigger, like ",(0,a.kt)("inlineCode",{parentName:"p"},"f + d"),", which is normally easier to press than ",(0,a.kt)("inlineCode",{parentName:"p"},"f + hyper"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"duoLayer('f', 'd').manipulators([\n  map(1).to(2)\n])\n")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Generated JSON"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "description": "Layer - duo-layer-f-d",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {\n        "simultaneous": [\n          {"key_code": "f"},\n          {"key_code": "d"}\n        ],\n        "simultaneous_options": {\n          "to_after_key_up": [\n            {"set_variable": {"name": "duo-layer-f-d", "value": 0}}\n          ]\n        },\n        "modifiers": {"optional": ["any"]}\n      },\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},\n      "to": [\n        {"set_variable": {"name": "duo-layer-f-d", "value": 1}}\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {"key_code": "1"},\n      "to": [\n        {"key_code": "2"}\n      ],\n      "conditions": [\n        {"type": "variable_if", "name": "duo-layer-f-d", "value": 1}\n      ]\n    }\n  ]\n}\n'))),(0,a.kt)("h2",{id:"how-duo-layer-works"},"How duo layer works"),(0,a.kt)("p",null,"Duo layer is a combination of ",(0,a.kt)("a",{parentName:"p",href:"./layer"},"layer")," and ",(0,a.kt)("a",{parentName:"p",href:"./simlayer"},"simlayer"),": "),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Same as simlayer, it uses ",(0,a.kt)("a",{parentName:"li",href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/"},"from.simultaneous"),"\nfunctionality to toggle the layer variable. "),(0,a.kt)("li",{parentName:"ul"},"Same as layer, it is active once the layer keys are pressed and held. ")),(0,a.kt)("h2",{id:"problems-in-duo-layer"},"Problems in duo layer"),(0,a.kt)("p",null,"The duo layer has a limitation where if the two keys are typed rapidly together,\nthey may not be triggered. For instance, if the letter pair 'd' and 's'\nis assigned to a duo layer and the word 'words' is typed quickly,\nonly 'wor' will be triggered. To address this issue, it is advisable to select\nletter pairs that are not adjacent in regular typing."))}d.isMDXComponent=!0}}]);