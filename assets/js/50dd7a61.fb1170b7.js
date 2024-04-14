"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[253],{1306:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>d});var i=a(5893),t=a(1151);const l={title:"from / mapDoubleTap()"},o="mapDoubleTap()",s={id:"manipulators/double-tap",title:"from / mapDoubleTap()",description:"Generated JSON",source:"@site/docs/manipulators/double-tap.md",sourceDirName:"manipulators",slug:"/manipulators/double-tap",permalink:"/karabiner.ts/manipulators/double-tap",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"from / mapDoubleTap()"},sidebar:"docs",previous:{title:"from / map*()",permalink:"/karabiner.ts/manipulators/from"},next:{title:"to*()",permalink:"/karabiner.ts/manipulators/to"}},r={},d=[{value:"How doubleTap() works",id:"how-doubletap-works",level:2},{value:"The single tap",id:"the-single-tap",level:2},{value:"The delay time",id:"the-delay-time",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components},{Details:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"mapdoubletap",children:"mapDoubleTap()"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"mapDoubleTap('\u2191').to('\u2196\ufe0e') // double tap up_arrow -> home\n"})}),"\n",(0,i.jsxs)(a,{children:[(0,i.jsx)("summary",{children:"Generated JSON"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[\n  {\n    "type": "basic",\n    "from": {"key_code": "up_arrow"},\n    "to": [\n      {"key_code": "home"}\n    ],\n    // highlight-next-line\n    "conditions": [\n      // highlight-next-line\n      {"type": "variable_if", "name": "double-tap-up_arrow", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {"key_code": "up_arrow"},\n    // highlight-next-line\n    "to": [\n      // highlight-next-line\n      {"set_variable": {"name": "double-tap-up_arrow", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-up_arrow", "value": 1}\n    ],\n    "to_delayed_action": {\n      // highlight-next-line\n      "to_if_canceled": [\n        // highlight-next-line\n        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}}\n      ],\n      // highlight-next-line\n      "to_if_invoked": [\n        // highlight-next-line\n        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}},\n        {"key_code": "up_arrow"}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"how-doubletap-works",children:"How doubleTap() works"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"doubleTap()"})," adds a ",(0,i.jsx)(n.code,{children:"variable"})," condition to the ",(0,i.jsx)(n.code,{children:"manipulator"}),"."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["When the key is tapped at the first time, the ",(0,i.jsx)(n.code,{children:"variable"})," is set to ",(0,i.jsx)(n.code,{children:"1"})]}),"\n",(0,i.jsxs)(n.li,{children:["When the key is tapped at the second time and the ",(0,i.jsx)(n.code,{children:"variable"})," is still ",(0,i.jsx)(n.code,{children:"1"}),",\nthe ",(0,i.jsx)(n.code,{children:"ToEvent"})," is triggered"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["It also uses a ",(0,i.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/",children:"to_delayed_action"}),"\nto set a timer (",(0,i.jsx)(n.code,{children:"200 milliseconds"})," ",(0,i.jsx)(n.code,{children:"delay"})," by default) when the key is tapped\nfor the first time."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["If another key is pressed within the ",(0,i.jsx)(n.code,{children:"delay"})," time","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"variable"})," is set back to ",(0,i.jsx)(n.code,{children:"0"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["If no other key is pressed within the ",(0,i.jsx)(n.code,{children:"delay"})," time","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"variable"})," is set back to ",(0,i.jsx)(n.code,{children:"0"})]}),"\n",(0,i.jsx)(n.li,{children:"The key itself is triggered, so single tap is still functional"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"the-single-tap",children:"The single tap"}),"\n",(0,i.jsxs)(n.p,{children:["By default ",(0,i.jsx)(n.code,{children:"doubleTap"})," will send the from key if no another key is pressed within\nthe ",(0,i.jsx)(n.code,{children:"delay"})," time. It can be set to another key using ",(0,i.jsx)(n.code,{children:"singleTap()"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"mapDoubleTap('\u21ea').to('\u238b')\n  // highlight-next-line\n  .singleTap(toKey('q', '\u2318'))\n"})}),"\n",(0,i.jsxs)(a,{children:[(0,i.jsx)("summary",{children:"Generated JSON"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[\n  {\n    "type": "basic",\n    "from": {"key_code": "caps_lock"},\n    "to": [\n      {"key_code": "escape"}\n    ],\n    "conditions": [\n      {"type": "variable_if", "name": "double-tap-caps_lock", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {"key_code": "caps_lock"},\n    "to": [\n      {"set_variable": {"name": "double-tap-caps_lock", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-caps_lock", "value": 1}\n    ],\n    "to_delayed_action": {\n      "to_if_canceled": [\n        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}}\n      ],\n      "to_if_invoked": [\n        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}},\n        // highlight-next-line\n        {"key_code": "q", "modifiers": ["command"]}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'})})]}),"\n",(0,i.jsxs)(n.p,{children:["Or it can be disabled with ",(0,i.jsx)(n.code,{children:"singleTap(null)"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"mapDoubleTap('q', '\u2318').to('q', '\u2318')\n  // highlight-next-line\n  .singleTap(null) // Must pressing command-q twice to quit application\n"})}),"\n",(0,i.jsxs)(a,{children:[(0,i.jsx)("summary",{children:"Generated JSON"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[\n  {\n    "type": "basic",\n    "from": {"key_code": "q", "modifiers": {"mandatory": ["command"]}},\n    "to": [\n      {"key_code": "q", "modifiers": ["command"]}\n    ],\n    "conditions": [\n      {"type": "variable_if", "name": "double-tap-q-command", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {\n      "key_code": "q", "modifiers": {"mandatory": ["command"]}\n    },\n    "to": [\n      {"set_variable": {"name": "double-tap-q-command", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-q-command", "value": 1}\n    ],\n    "to_delayed_action": {\n      "to_if_canceled": [\n        {"set_variable": {"name": "double-tap-q-command", "value": 0}}\n      ],\n      "to_if_invoked": [\n        {"set_variable": {"name": "double-tap-q-command", "value": 0}}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"the-delay-time",children:"The delay time"}),"\n",(0,i.jsxs)(n.p,{children:["The default ",(0,i.jsx)(n.code,{children:"delay"})," time waiting for the second tap (or to trigger the single\ntap) is ",(0,i.jsx)(n.code,{children:"200 milliseconds"}),". It can be set for each ",(0,i.jsx)(n.code,{children:"doubleTap()"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"mapDoubleTap('\u21ea', 100) // The last parameter\n  .delay(100) // Can also be set with another method\n"})}),"\n",(0,i.jsxs)(n.p,{children:["It can also be set at ",(0,i.jsx)(n.code,{children:"writeToProfile()"})," for all ",(0,i.jsx)(n.code,{children:"mapDoubleTap()"})," in the profile."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"writeToProfile(\n  '--dry-run', // profile name \n  [], // rules\n  { 'double_tap.delay_milliseconds': 100 }, // parameters \n)\n"})})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,a)=>{a.d(n,{Z:()=>s,a:()=>o});var i=a(7294);const t={},l=i.createContext(t);function o(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);