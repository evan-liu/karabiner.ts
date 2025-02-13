"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([["3945"],{34107:function(n,e,t){t.r(e),t.d(e,{default:()=>p,frontMatter:()=>a,metadata:()=>o,assets:()=>r,toc:()=>c,contentTitle:()=>i});var o=JSON.parse('{"id":"examples/text-input/symbols","title":"Input symbols","description":"Input symbols (which can be used as key alias) by layer + keys. When press and","source":"@site/docs/examples/text-input/symbols.md","sourceDirName":"examples/text-input","slug":"/examples/text-input/symbols","permalink":"/examples/text-input/symbols","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Input symbols"},"sidebar":"docs","previous":{"title":"Input emoji","permalink":"/examples/text-input/emoji"}}'),s=t("85893"),l=t("50065");let a={title:"Input symbols"},i=void 0,r={},c=[];function d(n){let e={a:"a",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(e.p,{children:["Input symbols (which can be used as key alias) by layer + keys. When press and\nhold key ",(0,s.jsx)(e.code,{children:"z"})," to activate the 'symbols' layer:"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"\u2190"}),", ",(0,s.jsx)(e.code,{children:"\u2192"}),", ",(0,s.jsx)(e.code,{children:"\u2191"}),", ",(0,s.jsx)(e.code,{children:"\u2193"}),", ",(0,s.jsx)(e.code,{children:"\u2423"}),", ",(0,s.jsx)(e.code,{children:"\u23CE"}),", ",(0,s.jsx)(e.code,{children:"\u232B"}),", ",(0,s.jsx)(e.code,{children:"\u2326"}),": Paste the symbol."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:","}),": Paste ",(0,s.jsx)(e.code,{children:"\u2039"}),' (for "left side" which looks nicer than ',(0,s.jsx)(e.code,{children:"<"}),")."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"."}),": Paste ",(0,s.jsx)(e.code,{children:"\u203A"}),' (for "right side" which looks nicer than ',(0,s.jsx)(e.code,{children:">"}),")."]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"4"}),": Paste ",(0,s.jsx)(e.code,{children:"\u21E5"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"5"}),": Paste ",(0,s.jsx)(e.code,{children:"\u238B"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"6"}),": Paste ",(0,s.jsx)(e.code,{children:"\u2318"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"7"}),": Paste ",(0,s.jsx)(e.code,{children:"\u2325"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"8"}),": Paste ",(0,s.jsx)(e.code,{children:"\u2303"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"9"}),": Paste ",(0,s.jsx)(e.code,{children:"\u21E7"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"0"}),": Paste ",(0,s.jsx)(e.code,{children:"\u21EA"})]}),"\n"]}),"\n",(0,s.jsx)(e.p,{children:"Use any key for the layer, also consider using:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"simlayer('z', 'symbols')"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"hyperLayer('z', 'symbols')"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"duoLayer('z', 'x', 'symbols')"})}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-typescript",children:"let rules = [\n  layer('z', 'symbols').manipulators([\n    withMapper(['\u2190', '\u2192', '\u2191', '\u2193', '\u2423', '\u23CE', '\u232B', '\u2326'])((k) =>\n      map(k).toPaste(k),\n    ),\n\n    { ',': toPaste('\u2039'), '.': toPaste('\u203A') },\n\n    withMapper({ 4: '\u21E5', 5: '\u238B', 6: '\u2318', 7: '\u2325', 8: '\u2303', 9: '\u21E7', 0: '\u21EA' })(\n      (k, v) => map(k).toPaste(v),\n    ),\n  ]),\n]\n\n"})}),"\n",(0,s.jsxs)(e.p,{children:["Open and edit the code in ",(0,s.jsx)(e.a,{href:"/editor?example=text-input/symbols",children:"the online editor"}),",\nor copy the JSON below and ",(0,s.jsx)(e.a,{href:"https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/",children:"add it to Karabiner-Elements"})," without changes:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-json",children:'{\n  "description": "Layer - symbols",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "z"\n      },\n      "to": [\n        {\n          "set_variable": {\n            "name": "symbols",\n            "value": 1\n          }\n        },\n        {\n          "set_variable": {\n            "name": "__layer",\n            "value": 1\n          }\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_unless",\n          "name": "symbols",\n          "value": 1\n        },\n        {\n          "type": "variable_unless",\n          "name": "__layer",\n          "value": 1\n        }\n      ],\n      "to_if_alone": [\n        {\n          "key_code": "z"\n        }\n      ],\n      "to_after_key_up": [\n        {\n          "set_variable": {\n            "name": "symbols",\n            "value": 0\n          }\n        },\n        {\n          "set_variable": {\n            "name": "__layer",\n            "value": 0\n          }\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "left_arrow"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2190\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "right_arrow"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2192\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "up_arrow"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2191\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "down_arrow"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2193\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "spacebar"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2423\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "return_or_enter"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u23CE\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "delete_or_backspace"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u232B\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "delete_forward"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2326\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "comma"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2039\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "period"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u203A\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "0"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u21EA\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "4"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u21E5\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "5"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u238B\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "6"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2318\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "7"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2325\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "8"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u2303\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    },\n    {\n      "type": "basic",\n      "from": {\n        "key_code": "9"\n      },\n      "to": [\n        {\n          "shell_command": "osascript -e \'\\nset prev to the clipboard\\nset the clipboard to \\"\u21E7\\"\\ntell application \\"System Events\\"\\n  keystroke \\"v\\" using command down\\n  delay 0.1\\nend tell\\nset the clipboard to prev\'"\n        }\n      ],\n      "conditions": [\n        {\n          "type": "variable_if",\n          "name": "symbols",\n          "value": 1\n        }\n      ]\n    }\n  ]\n}\n'})})]})}function p(n={}){let{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(d,{...n})}):d(n)}},50065:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return a}});var o=t(67294);let s={},l=o.createContext(s);function a(n){let e=o.useContext(l);return o.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:a(n.components),o.createElement(l.Provider,{value:e},n.children)}}}]);