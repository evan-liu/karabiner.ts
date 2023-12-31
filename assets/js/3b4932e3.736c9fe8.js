"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[282],{824:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var t=o(5893),r=o(1151);const s={title:"Caps Lock \u2192 Hyper"},a=void 0,c={id:"examples/modifier-keys/caps_lock-to-hyper",title:"Caps Lock \u2192 Hyper",description:"Map CAPS_LOCK \u21ea to Hyper \u2318\u2325\u2303\u21e7, and keep as \u21ea if alone (or map to another",source:"@site/docs/examples/modifier-keys/caps_lock-to-hyper.md",sourceDirName:"examples/modifier-keys",slug:"/examples/modifier-keys/caps_lock-to-hyper",permalink:"/examples/modifier-keys/caps_lock-to-hyper",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Caps Lock \u2192 Hyper"},sidebar:"docs",previous:{title:"Imports",permalink:"/imports"},next:{title:"Launch Apps | Layer",permalink:"/examples/os-functionality/launch-apps-layer"}},i={},p=[];function l(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["Map CAPS_LOCK ",(0,t.jsx)(n.code,{children:"\u21ea"})," to Hyper ",(0,t.jsx)(n.code,{children:"\u2318\u2325\u2303\u21e7"}),", and keep as ",(0,t.jsx)(n.code,{children:"\u21ea"})," if alone (or map to another\nkey if alone, e.g. ",(0,t.jsx)(n.code,{children:"toIfAlone('escape')"})," for ",(0,t.jsx)(n.code,{children:"\u238b"}),")."]}),"\n",(0,t.jsxs)(n.p,{children:["Copy and edit the code below in ",(0,t.jsx)(n.a,{href:"https://stackblitz.com/github/evan-liu/karabiner.ts/tree/main/editor?embed=1&file=rules.js&hideExplorer=1&hideNavigation=1&terminalHeight=20&title=karabiner.ts%20editor",children:"the online editor"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"export const rules = () => [\n  rule('Caps Lock \u2192 Hyper').manipulators([\n    map('caps_lock').toHyper().toIfAlone('caps_lock'),\n  ]),\n]\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Or copy the JSON below and ",(0,t.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules",children:"add it to Karabiner-Elements"})," without changes:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Caps Lock \u2192 Hyper",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "caps_lock"\n      },\n      "to": [\n        {\n          "key_code": "left_command",\n          "modifiers": [\n            "option",\n            "control",\n            "shift"\n          ]\n        }\n      ],\n      "to_if_alone": [\n        {\n          "key_code": "caps_lock"\n        }\n      ]\n    }\n  ]\n}\n'})})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>c,a:()=>a});var t=o(7294);const r={},s=t.createContext(r);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);