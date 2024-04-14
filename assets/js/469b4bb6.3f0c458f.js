"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[254],{8486:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=t(5893),o=t(1151);const r={title:"Input emoji"},s=void 0,a={id:"examples/text-input/emoji",title:"Input emoji",description:"Input emoji by layer + keys. When press and hold key z to activate",source:"@site/docs/examples/text-input/emoji.md",sourceDirName:"examples/text-input",slug:"/examples/text-input/emoji",permalink:"/karabiner.ts/examples/text-input/emoji",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Input emoji"},sidebar:"docs",previous:{title:"Launch Apps | Modifier",permalink:"/karabiner.ts/examples/os-functionality/launch-apps-modifier"},next:{title:"Input symbols",permalink:"/karabiner.ts/examples/text-input/symbols"}},l={},c=[];function d(e){const n={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Input emoji by layer + keys. When press and hold key ",(0,i.jsx)(n.code,{children:"z"})," to activate\nthe 'emoji' layer:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"j"}),": \ud83d\ude02 (joy)"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Use any key for the layer, also consider using:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"simlayer('z', 'emoji')"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"hyperLayer('z', 'emoji')"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.code,{children:"duoLayer('z', 'x', 'emoji')"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Copy and edit the code below in ",(0,i.jsx)(n.a,{href:"https://stackblitz.com/github/evan-liu/karabiner.ts/tree/main/editor?embed=1&file=rules.js&hideExplorer=1&hideNavigation=1&terminalHeight=20&title=karabiner.ts%20editor",children:"the online editor"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"export const rules = () => [\n  layer('z', 'emoji').manipulators({\n    j: toPaste('\ud83d\ude02'), // joy\n  }),\n]\n\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Or copy the JSON below and ",(0,i.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules",children:"add it to Karabiner-Elements"})," without changes:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Layer - emoji",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "z"\n      },\n      "to": [\n        {\n          "set_variable": {\n            "name": "emoji",\n            "value": 1\n          }\n        }\n      ],\n      "to_after_key_up": [\n        {\n          "set_variable": {\n            "name": "emoji",\n            "value": 0\n          }\n        }\n      ],\n      "to_if_alone": [\n        {\n          "key_code": "z"\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "j"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\ud83d\ude02\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "emoji",\n          "value": 1\n        }\n      ]\n    }\n  ]\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var i=t(7294);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);