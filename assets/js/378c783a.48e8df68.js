"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([["4425"],{50601:function(e,n,r){r.r(n),r.d(n,{default:()=>p,frontMatter:()=>l,metadata:()=>t,assets:()=>d,toc:()=>i,contentTitle:()=>o});var t=JSON.parse('{"id":"examples/vim/nested-leader-key","title":"Nested leader key","description":"To nest leader keys, use variables on leaderMode().","source":"@site/docs/examples/vim/nested-leader-key.md","sourceDirName":"examples/vim","slug":"/examples/vim/nested-leader-key","permalink":"/examples/vim/nested-leader-key","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Nested leader key"},"sidebar":"docs","previous":{"title":"Input symbols","permalink":"/examples/text-input/symbols"}}'),a=r("85893"),s=r("50065");let l={title:"Nested leader key"},o=void 0,d={},i=[];function c(e){let n={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["To nest leader keys, use variables on ",(0,a.jsx)(n.a,{href:"/rules/leader-mode",children:"leaderMode()"}),"."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"leader"})," ",(0,a.jsx)(n.code,{children:"o"})," ",(0,a.jsx)(n.code,{children:"f"}),": Open Finder"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"leader"})," ",(0,a.jsx)(n.code,{children:"r"})," ",(0,a.jsx)(n.code,{children:"e"}),": Raycast Emoji Picker"]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Example code: ( ",(0,a.jsx)(n.a,{href:"/editor?example=vim/nested-leader-key",children:"Open in the online editor \u2192"})," )"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"let escapeLeader = ['__layer', 'leader', 'leader--'].map(toUnsetVar)\nlet raycastEmoji = 'emoji-symbols/search-emoji-symbols'\n\nlet rules = [\n  hyperLayer('l', 'leader')\n    .leaderMode({ sticky: true, escape: [] })\n    .manipulators([\n      map('escape').to(escapeLeader),\n\n      map('o').toVar('leader--', 'o'), // Open\n      withCondition(ifVar('leader--', 'o'))([\n        withMapper([\n          map('f').toApp('Finder'), // Open Finder\n        ])((x) => x.to(escapeLeader)),\n      ]),\n\n      map('r').toVar('leader--', 'r'), // Raycast\n      withCondition(ifVar('leader--', 'r'))([\n        withMapper([\n          map('e').to$(`open raycast://extensions/raycast/${raycastEmoji}`),\n        ])((x) => x.to(escapeLeader)),\n      ]),\n    ]),\n]\n\n"})})]})}function p(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},50065:function(e,n,r){r.d(n,{Z:function(){return o},a:function(){return l}});var t=r(67294);let a={},s=t.createContext(a);function l(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);