"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[205],{6997:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>t,toc:()=>d});var s=i(5893),r=i(1151);const a={title:"simlayer()"},o=void 0,t={id:"rules/simlayer",title:"simlayer()",description:"Generated JSON in profiles.complex_modifications.rules",source:"@site/docs/rules/simlayer.md",sourceDirName:"rules",slug:"/rules/simlayer",permalink:"/karabiner.ts/rules/simlayer",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"simlayer()"},sidebar:"docs",previous:{title:"layer()",permalink:"/karabiner.ts/rules/layer"},next:{title:"hyperLayer() / modifierLayer()",permalink:"/karabiner.ts/rules/hyper-layer"}},l={},d=[{value:"How simlayer works",id:"how-simlayer-works",level:2},{value:"Modifiers",id:"modifiers",level:2},{value:"The simultaneous_options",id:"the-simultaneous_options",level:2},{value:"The threshold time",id:"the-threshold-time",level:2},{value:"Problems in simlayer",id:"problems-in-simlayer",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components},{Details:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"simlayer('a', 'a-mode').manipulators([\n  map(1).to(2), // Only when key 'a' is pressed and held, then key '1' right after \n])\n"})}),"\n",(0,s.jsxs)(i,{children:[(0,s.jsx)("summary",{children:"Generated JSON in profiles.complex_modifications.rules"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Simlayer - a-mode",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {"key_code": "1", "modifiers": {"optional": ["any"]}},\n      "to": [{"key_code": "2"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "from": {\n        // highlight-next-line\n        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          // highlight-next-line\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        },\n        "modifiers": {"optional": ["any"]}\n      },\n      // highlight-next-line\n      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "2"}],\n      // highlight-next-line\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200}\n    }\n  ]\n}\n'})})]}),"\n",(0,s.jsx)(n.h2,{id:"how-simlayer-works",children:"How simlayer works"}),"\n",(0,s.jsxs)(n.p,{children:["Simlayer is similar to ",(0,s.jsx)(n.a,{href:"./layer",children:"layer"}),", which add a variable on a group of ",(0,s.jsx)(n.code,{children:"manipulators"}),".\nThe difference is how the variable is toggled."]}),"\n",(0,s.jsxs)(n.p,{children:["Layer sets the variable to 1\nwhen the layer key is pressed down and set it back to 0 when the key is released.\nSimlayer uses ",(0,s.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/",children:"from.simultaneous"}),"\nfunctionality instead."]}),"\n",(0,s.jsxs)(n.p,{children:["Simlayer sets the variable to 1 only if the simlayer key is pressed and held,\nthen any key on the simlayer is pressed within the threshold time (",(0,s.jsx)(n.code,{children:"200 milliseconds"}),"\nby default). Then the variable remains 1 until the simlayer key is released."]}),"\n",(0,s.jsx)(n.p,{children:"For example,"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"simlayer('a', 'a-mode').manipulators([\n  map(1).to(','),\n  map(2).to('.'),\n])\n"})}),"\n",(0,s.jsxs)(i,{children:[(0,s.jsx)("summary",{children:"Generated JSON in profiles.complex_modifications.rules"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Simlayer - a-mode",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {"key_code": "1", "modifiers": {"optional": ["any"]}},\n      "to": [{"key_code": "comma"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "from": {"key_code": "2", "modifiers": {"optional": ["any"]}},\n      "to": [{"key_code": "period"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},\n      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "comma"}],\n      "from": {\n        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        }, \n        "modifiers": {"optional": ["any"]}\n      }\n    },\n    {\n      "type": "basic",\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},\n      "to": [\n        {"set_variable": {"name": "a-mode", "value": 1}}, \n        {"key_code": "period"}\n      ],\n      "from": {\n        "simultaneous": [{"key_code": "a"}, {"key_code": "2"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        },\n        "modifiers": {"optional": ["any"]}\n      }\n    }\n  ]\n}\n\n'})})]}),"\n",(0,s.jsx)(n.p,{children:"If key 'a' is pressed and held for longer than the threshold time, 'a' starts to\nrepeat."}),"\n",(0,s.jsx)(n.p,{children:"If key 'a' is pressed and held, and key '1' (or '2') is also pressed within the\nthreshold time, the simlayer variable is set to 1, and ',' (or '.' for '2') is\ntriggered. As long as key 'a' is not released, ',' and '.' will be triggered\nwhen '1' or '2' is pressed."}),"\n",(0,s.jsx)(n.p,{children:"Once key 'a' is released the simlayer variable is set back to 0."}),"\n",(0,s.jsx)(n.h2,{id:"modifiers",children:"Modifiers"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"simlayer"})," by default set ",(0,s.jsx)(n.code,{children:"from.modifiers"})," to ",(0,s.jsx)(n.code,{children:'{ optional: ["any"] }'}),". It can be\nchanged by ",(0,s.jsx)(n.code,{children:"modifiers()"})," method."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"simlayer('a', 'a-mode')\n  // highlight-next-line\n  .modifiers({ optional: '\u21ea' })\n  .manipulators([\n    map(1).to(2), \n  ])\n"})}),"\n",(0,s.jsxs)(i,{children:[(0,s.jsx)("summary",{children:"Generated JSON in profiles.complex_modifications.rules"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "description": "Simlayer - a-mode",\n  "manipulators": [\n    {\n      "type": "basic",\n      // highlight-next-line\n      "from": {"key_code": "1", "modifiers": {"optional": ["caps_lock"]}},\n      "to": [{"key_code": "2"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        },\n        // highlight-next-line\n        "modifiers": {"optional": ["caps_lock"]}\n      },\n      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "2"}],\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200}\n    }\n  ]\n}\n'})})]}),"\n",(0,s.jsx)(n.h2,{id:"the-simultaneous_options",children:"The simultaneous_options"}),"\n",(0,s.jsxs)(n.p,{children:["The default ",(0,s.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous-options/",children:(0,s.jsx)(n.code,{children:"simultaneous_options"})})," set by ",(0,s.jsx)(n.code,{children:"simlayer"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"{\n  detect_key_down_uninterruptedly: true,\n  key_down_order: 'strict',\n  key_up_order: 'strict_inverse',\n  key_up_when: 'any',\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["You can override them using ",(0,s.jsx)(n.code,{children:"simlayer().options({/* ... */})"})]}),"\n",(0,s.jsx)(n.h2,{id:"the-threshold-time",children:"The threshold time"}),"\n",(0,s.jsxs)(n.p,{children:["The default threshold time is ",(0,s.jsx)(n.code,{children:"200 milliseconds"}),". It can be set on each layer"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"simlayer('a', 'a-mode', 100) // The third parameter `threshold` in milliseconds\n"})}),"\n",(0,s.jsxs)(n.p,{children:["It can also be set at ",(0,s.jsx)(n.code,{children:"writeToProfile()"})," for all simlayer in the profile."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"writeToProfile(\n  '--dry-run', // profile name \n  [], // rules\n  { 'simlayer.threshold_milliseconds': 100 }, // parameters \n)\n"})}),"\n",(0,s.jsx)(n.h2,{id:"problems-in-simlayer",children:"Problems in simlayer"}),"\n",(0,s.jsx)(n.p,{children:"The other key(s) on the simlayer must be quickly pressed after the layer key,\notherwise the simlayer key is triggered."})]})}function m(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>t,a:()=>o});var s=i(7294);const r={},a=s.createContext(r);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);