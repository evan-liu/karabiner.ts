"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[769],{6339:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>m,frontMatter:()=>r,metadata:()=>c,toc:()=>l});var t=o(5893),s=o(1151);const r={title:"to*()"},i="ToEvent",c={id:"manipulators/to",title:"to*()",description:"ToEvent type models Karabiner to event definition.",source:"@site/docs/manipulators/to.md",sourceDirName:"manipulators",slug:"/manipulators/to",permalink:"/manipulators/to",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"to*()"},sidebar:"docs",previous:{title:"from / mapDoubleTap()",permalink:"/manipulators/double-tap"},next:{title:"condition / if*()",permalink:"/manipulators/condition"}},a={},l=[{value:"Create ToEvent",id:"create-toevent",level:2},{value:"toKey()",id:"tokey",level:3},{value:"to$()",id:"to",level:3},{value:"to*()",id:"to-1",level:3},{value:"map().to*()",id:"mapto",level:3},{value:"Use ToEvent",id:"use-toevent",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components},{Details:o}=n;return o||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"toevent",children:"ToEvent"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ToEvent"})," type models Karabiner ",(0,t.jsx)(n.a,{href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/",children:"to event definition"}),"."]}),"\n",(0,t.jsxs)(o,{children:[(0,t.jsx)("summary",{children:"ToEvent type"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"export type ToEvent = (\n  | { key_code: string | number }\n  | { consumer_key_code: string | number }\n  | { pointing_button: string | number }\n  | { shell_command: string }\n  | {\n      select_input_source: {\n        language?: string\n        input_source_id?: string\n        input_mode_id?: string\n      }\n    }\n  | {\n      set_variable: {\n        name: string\n        value: number | boolean | string\n      }\n    }\n  | { set_notification_message: { id: string; text: string } }\n  | {\n      mouse_key: {\n        x?: number\n        y?: number\n        vertical_wheel?: number\n        horizontal_wheel?: number\n        speed_multiplier?: number\n      }\n    }\n  | {\n      sticky_modifier: Partial<\n        Record<\n          | 'left_control'\n          | 'left_shift'\n          | 'left_option'\n          | 'left_command'\n          | 'right_control'\n          | 'right_shift'\n          | 'right_option'\n          | 'right_command'\n          | 'fn',\n          'on' | 'off' | 'toggle'\n        >\n      >\n    }\n  | {\n      software_function:\n        | { cg_event_double_click: { button: number } }\n        | {\n            set_mouse_cursor_position: {\n              x: number | `${number}%`\n              y: number | `${number}%`\n              screen?: number\n            }\n          }\n        | {\n            iokit_power_management_sleep_system: { delay_milliseconds?: number }\n          }\n    }\n) & {\n  modifiers?: Array<\n    | 'left_control'\n    | 'left_shift'\n    | 'left_option'\n    | 'left_command'\n    | 'right_control'\n    | 'right_shift'\n    | 'right_option'\n    | 'right_command'\n    | 'fn'\n    | 'caps_lock'\n    | 'command'\n    | 'control'\n    | 'option'\n    | 'shift'\n  >\n  lazy?: boolean\n  repeat?: boolean\n  halt?: boolean\n  hold_down_milliseconds?: number\n}\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"create-toevent",children:"Create ToEvent"}),"\n",(0,t.jsxs)(n.p,{children:["There are a few ways to create a ",(0,t.jsx)(n.code,{children:"ToEvent"}),":"]}),"\n",(0,t.jsx)(n.h3,{id:"tokey",children:"toKey()"}),"\n",(0,t.jsxs)(n.p,{children:["The most common ",(0,t.jsx)(n.code,{children:"ToEvent"})," is ",(0,t.jsx)(n.code,{children:"key_code"})," by ",(0,t.jsx)(n.code,{children:"toKey()"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"toKey('a', '\u2318\u21e7')\n"})}),"\n",(0,t.jsxs)(o,{children:[(0,t.jsx)("summary",{children:"Generated JSON"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "key_code": "a",\n  "modifiers": ["command", "shift"]\n}\n'})})]}),"\n",(0,t.jsx)(n.p,{children:"And there are a few methods to create common used cases:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"toHyper() // \u2318\u2325\u2303\u21e7\ntoMeh() // \u2325\u2303\u21e7\ntoSuperHyper() // \u2318\u2325\u2303\u21e7fn\ntoNone() // vk_none\n"})}),"\n",(0,t.jsxs)(o,{children:[(0,t.jsx)("summary",{children:"Generated JSON"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'// toHyper() \u2318\u2325\u2303\u21e7\n{\n  "key_code": "left_command", \n  "modifiers": ["option", "control", "shift"]\n}\n// toMeh() \u2325\u2303\u21e7\n{\n  "key_code": "left_option", \n  "modifiers": ["control", "shift"]\n}\n// toSuperHyper() \u2318\u2325\u2303\u21e7fn\n{\n  "key_code": "fn", \n  "modifiers": ["command", "option", "control", "shift"]\n}\n// toNone() vk_none\n{ "key_code": "vk_none" }\n'})})]}),"\n",(0,t.jsx)(n.h3,{id:"to",children:"to$()"}),"\n",(0,t.jsxs)(n.p,{children:["Another common used ",(0,t.jsx)(n.code,{children:"ToEvent"})," is ",(0,t.jsx)(n.code,{children:"shell_command"})," by ",(0,t.jsx)(n.code,{children:"to$()"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'to$(\'rm ~/temp\') // {"shell_command": "rm ~/temp"}\n'})}),"\n",(0,t.jsx)(n.p,{children:"There are a few methods to create common used commands:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"toApp() // open -a {}.app\ntoPaste() // Paste text via clipboard \n"})}),"\n",(0,t.jsxs)(o,{children:[(0,t.jsx)("summary",{children:"Generated JSON"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'// toApp(\'Finder\')\n{ "shell_command": "open -a \\"Finder\\".app" }\n// toPaste(\'\u2728\')\n{ "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2728\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'" }\n'})})]}),"\n",(0,t.jsx)(n.h3,{id:"to-1",children:"to*()"}),"\n",(0,t.jsxs)(n.p,{children:["The other ",(0,t.jsx)(n.code,{children:"to*()"})," methods to create ",(0,t.jsx)(n.code,{children:"ToEvent"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"toInputSource()\ntoSetVar()\ntoNotificationMessage()\ntoRemoveNotificationMessage()\ntoMouseKey()\ntoStickyModifier()\ntoCgEventDoubleClick()\ntoMouseCursorPosition()\ntoSleepSystem()\n"})}),"\n",(0,t.jsx)(n.h3,{id:"mapto",children:"map().to*()"}),"\n",(0,t.jsxs)(n.p,{children:["To write shorter code, all ",(0,t.jsx)(n.code,{children:"map*()"})," methods can chain with ",(0,t.jsx)(n.code,{children:"to*()"})," methods"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"map(1).to('a').toApp('Arc').toConsumerKey('play_or_pause')\n"})}),"\n",(0,t.jsxs)(o,{children:[(0,t.jsx)("summary",{children:"Generated JSON"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "type": "basic",\n  "from": { "key_code": "1" },\n  "to": [\n    { "key_code": "a" },\n    { "shell_command": "open -a \\"Arc\\".app" },\n    { "consumer_key_code": "play_or_pause" }\n  ]\n}\n'})})]}),"\n",(0,t.jsx)(n.h2,{id:"use-toevent",children:"Use ToEvent"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"ToEvent"})," is mostly used with ",(0,t.jsx)(n.code,{children:"map().to()"}),". It can also be used in other places:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"map().toIfAlone(/* to*() */)\nmap().toIfHeldDown(/* to*() */)\nmap().toAfterKeyUp(/* to*() */)\nmap().toDelayedAction(/* to*(),  to*() */)\nmapDoubleTap().singleTap(/* to*() */)\nmapSimultaneous([], { to_after_key_up: [/* to*() */] })\n"})})]})}function m(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>c,a:()=>i});var t=o(7294);const s={},r=t.createContext(s);function i(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);