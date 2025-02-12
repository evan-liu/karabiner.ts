"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([["5750"],{25631:function(e,n,t){t.r(n),t.d(n,{default:()=>p,frontMatter:()=>s,metadata:()=>i,assets:()=>l,toc:()=>c,contentTitle:()=>r});var i=JSON.parse('{"id":"examples/text-input/emoji","title":"Input emoji","description":"Input emoji by layer + keys. When press and hold key z to activate","source":"@site/docs/examples/text-input/emoji.md","sourceDirName":"examples/text-input","slug":"/examples/text-input/emoji","permalink":"/examples/text-input/emoji","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Input emoji"},"sidebar":"docs","previous":{"title":"Launch Apps | Modifier","permalink":"/examples/os-functionality/launch-apps-modifier"},"next":{"title":"Input symbols","permalink":"/examples/text-input/symbols"}}'),a=t("85893"),o=t("50065");let s={title:"Input emoji"},r=void 0,l={},c=[];function d(e){let n={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Input emoji by layer + keys. When press and hold key ",(0,a.jsx)(n.code,{children:"z"})," to activate\nthe 'emoji' layer:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"j"}),": \uD83D\uDE02 (joy)"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Use any key for the layer, also consider using:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"simlayer('z', 'emoji')"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"hyperLayer('z', 'emoji')"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"duoLayer('z', 'x', 'emoji')"})}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Copy and edit the code below in ",(0,a.jsx)(n.a,{href:"https://karabiner.ts.evanliu.dev/editor",children:"the online editor"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"export const rules = () => [\n  layer('z', 'emoji').manipulators({\n    j: toPaste('\uD83D\uDE02'), // joy\n  }),\n]\n\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Or copy the JSON below and ",(0,a.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/",children:"add it to Karabiner-Elements"})," without changes:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Layer - emoji",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "z"\n      },\n      "to": [\n        {\n          "set_variable": {\n            "name": "emoji",\n            "value": 1\n          }\n        },\n        {\n          "set_variable": {\n            "name": "__layer",\n            "value": 1\n          }\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_unless",\n          "name": "emoji",\n          "value": 1\n        },\n        {\n          "type": "variable_unless",\n          "name": "__layer",\n          "value": 1\n        }\n      ],\n      "to_if_alone": [\n        {\n          "key_code": "z"\n        }\n      ],\n      "to_after_key_up": [\n        {\n          "set_variable": {\n            "name": "emoji",\n            "value": 0\n          }\n        },\n        {\n          "set_variable": {\n            "name": "__layer",\n            "value": 0\n          }\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "j"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\uD83D\uDE02\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "emoji",\n          "value": 1\n        }\n      ]\n    }\n  ]\n}\n'})})]})}function p(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},50065:function(e,n,t){t.d(n,{Z:function(){return r},a:function(){return s}});var i=t(67294);let a={},o=i.createContext(a);function s(e){let n=i.useContext(o);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);