(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[821],{5985:(e,t,n)=>{"use strict";n.d(t,{Z:()=>C});n(7294);var s=n(512),a=n(5281),o=n(5130),i=n(5999),c=n(3692);const l={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var r=n(5893);function d(e){let{permalink:t,label:n,count:a,description:o}=e;return(0,r.jsxs)(c.Z,{href:t,title:o,className:(0,s.Z)(l.tag,a?l.tagWithCount:l.tagRegular),children:[n,a&&(0,r.jsx)("span",{children:a})]})}const u={tags:"tags_jXut",tag:"tag_QGVx"};function m(e){let{tags:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:(0,r.jsx)(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,r.jsx)("ul",{className:(0,s.Z)(u.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,r.jsx)("li",{className:u.tag,children:(0,r.jsx)(d,{...e})},e.permalink)))})]})}const h={iconEdit:"iconEdit_Z9Sw"};function p(e){let{className:t,...n}=e;return(0,r.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.Z)(h.iconEdit,t),"aria-hidden":"true",...n,children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function f(e){let{editUrl:t}=e;return(0,r.jsxs)(c.Z,{to:t,className:a.k.common.editThisPage,children:[(0,r.jsx)(p,{}),(0,r.jsx)(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var x=n(2263);function b(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,x.Z)(),n=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,x.Z)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:n,...e})}function g(e){let{lastUpdatedAt:t}=e;const n=new Date(t),s=b({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(n);return(0,r.jsx)(i.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,r.jsx)("b",{children:(0,r.jsx)("time",{dateTime:n.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function v(e){let{lastUpdatedBy:t}=e;return(0,r.jsx)(i.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,r.jsx)("b",{children:t})},children:" by {user}"})}function j(e){let{lastUpdatedAt:t,lastUpdatedBy:n}=e;return(0,r.jsxs)("span",{className:a.k.common.lastUpdated,children:[(0,r.jsx)(i.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,r.jsx)(g,{lastUpdatedAt:t}):"",byUser:n?(0,r.jsx)(v,{lastUpdatedBy:n}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const N={lastUpdated:"lastUpdated_JAkA"};function k(e){let{className:t,editUrl:n,lastUpdatedAt:a,lastUpdatedBy:o}=e;return(0,r.jsxs)("div",{className:(0,s.Z)("row",t),children:[(0,r.jsx)("div",{className:"col",children:n&&(0,r.jsx)(f,{editUrl:n})}),(0,r.jsx)("div",{className:(0,s.Z)("col",N.lastUpdated),children:(a||o)&&(0,r.jsx)(j,{lastUpdatedAt:a,lastUpdatedBy:o})})]})}function C(){const{metadata:e}=(0,o.k)(),{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:i,tags:c}=e,l=c.length>0,d=!!(t||n||i);return l||d?(0,r.jsxs)("footer",{className:(0,s.Z)(a.k.docs.docFooter,"docusaurus-mt-lg"),children:[l&&(0,r.jsx)("div",{className:(0,s.Z)("row margin-top--sm",a.k.docs.docFooterTagsRow),children:(0,r.jsx)("div",{className:"col",children:(0,r.jsx)(m,{tags:c})})}),d&&(0,r.jsx)(k,{className:(0,s.Z)("margin-top--sm",a.k.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:n,lastUpdatedBy:i})]}):null}},7550:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Et});var s=n(7294),a=n(833),o=n(5130),i=n(5893);function c(){const{metadata:e,frontMatter:t,assets:n}=(0,o.k)();return(0,i.jsx)(a.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var l=n(512),r=n(7524),d=n(5999),u=n(3692);function m(e){const{permalink:t,title:n,subLabel:s,isNext:a}=e;return(0,i.jsxs)(u.Z,{className:(0,l.Z)("pagination-nav__link",a?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[s&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:s}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}function h(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,d.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(m,{...t,subLabel:(0,i.jsx)(d.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(m,{...n,subLabel:(0,i.jsx)(d.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function p(){const{metadata:e}=(0,o.k)();return(0,i.jsx)(h,{previous:e.previous,next:e.next})}var f=n(2263),x=n(143),b=n(5281),g=n(373),v=n(4477);const j={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,i.jsx)(d.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,i.jsx)(d.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function N(e){const t=j[e.versionMetadata.banner];return(0,i.jsx)(t,{...e})}function k(e){let{versionLabel:t,to:n,onClick:s}=e;return(0,i.jsx)(d.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,i.jsx)("b",{children:(0,i.jsx)(u.Z,{to:n,onClick:s,children:(0,i.jsx)(d.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function C(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:s}}=(0,f.Z)(),{pluginId:a}=(0,x.gA)({failfast:!0}),{savePreferredVersionName:o}=(0,g.J)(a),{latestDocSuggestion:c,latestVersionSuggestion:r}=(0,x.Jo)(a),d=c??(u=r).docs.find((e=>e.id===u.mainDocId));var u;return(0,i.jsxs)("div",{className:(0,l.Z)(t,b.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,i.jsx)("div",{children:(0,i.jsx)(N,{siteTitle:s,versionMetadata:n})}),(0,i.jsx)("div",{className:"margin-top--md",children:(0,i.jsx)(k,{versionLabel:r.label,to:d.path,onClick:()=>o(r.name)})})]})}function y(e){let{className:t}=e;const n=(0,v.E)();return n.banner?(0,i.jsx)(C,{className:t,versionMetadata:n}):null}function L(e){let{className:t}=e;const n=(0,v.E)();return n.badge?(0,i.jsx)("span",{className:(0,l.Z)(t,b.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,i.jsx)(d.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}var _=n(8804),B=n(6043),w=n(6668);function Z(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const s=n.slice(2,e.level);e.parentIndex=Math.max(...s),n[e.level]=t}));const s=[];return t.forEach((e=>{const{parentIndex:n,...a}=e;n>=0?t[n].children.push(a):s.push(a)})),s}function T(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:s}=e;return t.flatMap((e=>{const t=T({toc:e.children,minHeadingLevel:n,maxHeadingLevel:s});return function(e){return e.level>=n&&e.level<=s}(e)?[{...e,children:t}]:t}))}function E(e){const t=e.getBoundingClientRect();return t.top===t.bottom?E(e.parentNode):t}function H(e,t){let{anchorTopOffset:n}=t;const s=e.find((e=>E(e).top>=n));if(s){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(E(s))?s:e[e.indexOf(s)-1]??null}return e[e.length-1]??null}function I(){const e=(0,s.useRef)(0),{navbar:{hideOnScroll:t}}=(0,w.L)();return(0,s.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function M(e){const t=(0,s.useRef)(void 0),n=I();(0,s.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:s,linkActiveClassName:a,minHeadingLevel:o,maxHeadingLevel:i}=e;function c(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(s),c=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const s=[];for(let a=t;a<=n;a+=1)s.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(s.join()))}({minHeadingLevel:o,maxHeadingLevel:i}),l=H(c,{anchorTopOffset:n.current}),r=e.find((e=>l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(a),e.classList.add(a),t.current=e):e.classList.remove(a)}(e,e===r)}))}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),()=>{document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}),[e,n])}function A(e){let{toc:t,className:n,linkClassName:s,isChild:a}=e;return t.length?(0,i.jsx)("ul",{className:a?void 0:n,children:t.map((e=>(0,i.jsxs)("li",{children:[(0,i.jsx)(u.Z,{to:`#${e.id}`,className:s??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,i.jsx)(A,{isChild:!0,toc:e.children,className:n,linkClassName:s})]},e.id)))}):null}const S=s.memo(A);function U(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:a="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:c,maxHeadingLevel:l,...r}=e;const d=(0,w.L)(),u=c??d.tableOfContents.minHeadingLevel,m=l??d.tableOfContents.maxHeadingLevel,h=function(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return(0,s.useMemo)((()=>T({toc:Z(t),minHeadingLevel:n,maxHeadingLevel:a})),[t,n,a])}({toc:t,minHeadingLevel:u,maxHeadingLevel:m});return M((0,s.useMemo)((()=>{if(a&&o)return{linkClassName:a,linkActiveClassName:o,minHeadingLevel:u,maxHeadingLevel:m}}),[a,o,u,m])),(0,i.jsx)(S,{toc:h,className:n,linkClassName:a,...r})}const z={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};function V(e){let{collapsed:t,...n}=e;return(0,i.jsx)("button",{type:"button",...n,className:(0,l.Z)("clean-btn",z.tocCollapsibleButton,!t&&z.tocCollapsibleButtonExpanded,n.className),children:(0,i.jsx)(d.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const R={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function P(e){let{toc:t,className:n,minHeadingLevel:s,maxHeadingLevel:a}=e;const{collapsed:o,toggleCollapsed:c}=(0,B.u)({initialState:!0});return(0,i.jsxs)("div",{className:(0,l.Z)(R.tocCollapsible,!o&&R.tocCollapsibleExpanded,n),children:[(0,i.jsx)(V,{collapsed:o,onClick:c}),(0,i.jsx)(B.z,{lazy:!0,className:R.tocCollapsibleContent,collapsed:o,children:(0,i.jsx)(U,{toc:t,minHeadingLevel:s,maxHeadingLevel:a})})]})}const O={tocMobile:"tocMobile_ITEo"};function D(){const{toc:e,frontMatter:t}=(0,o.k)();return(0,i.jsx)(P,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,l.Z)(b.k.docs.docTocMobile,O.tocMobile)})}const $={tableOfContents:"tableOfContents_bqdL",docItemContainer:"docItemContainer_F8PC"},W="table-of-contents__link toc-highlight",F="table-of-contents__link--active";function q(e){let{className:t,...n}=e;return(0,i.jsx)("div",{className:(0,l.Z)($.tableOfContents,"thin-scrollbar",t),children:(0,i.jsx)(U,{...n,linkClassName:W,linkActiveClassName:F})})}function G(){const{toc:e,frontMatter:t}=(0,o.k)();return(0,i.jsx)(q,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:b.k.docs.docTocDesktop})}var J=n(2503),Y=n(1151),Q=n(5742),X=n(2389),K=n(2949);function ee(){const{prism:e}=(0,w.L)(),{colorMode:t}=(0,K.I)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}var te=n(7594),ne=n.n(te);const se=/title=(?<quote>["'])(?<title>.*?)\1/,ae=/\{(?<range>[\d,-]+)\}/,oe={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},ie={...oe,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},ce=Object.keys(oe);function le(e,t){const n=e.map((e=>{const{start:n,end:s}=ie[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${s})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function re(e,t){let n=e.replace(/\n$/,"");const{language:s,magicComments:a,metastring:o}=t;if(o&&ae.test(o)){const e=o.match(ae).groups.range;if(0===a.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${o}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=a[0].className,s=ne()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(s),code:n}}if(void 0===s)return{lineClassNames:{},code:n};const i=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return le(["js","jsBlock"],t);case"jsx":case"tsx":return le(["js","jsBlock","jsx"],t);case"html":return le(["js","jsBlock","html"],t);case"python":case"py":case"bash":return le(["bash"],t);case"markdown":case"md":return le(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return le(["tex"],t);case"lua":case"haskell":case"sql":return le(["lua"],t);case"wasm":return le(["wasm"],t);case"vb":case"vba":case"visual-basic":return le(["vb","rem"],t);case"vbnet":return le(["vbnet","rem"],t);case"batch":return le(["rem"],t);case"basic":return le(["rem","f90"],t);case"fsharp":return le(["js","ml"],t);case"ocaml":case"sml":return le(["ml"],t);case"fortran":return le(["f90"],t);case"cobol":return le(["cobol"],t);default:return le(ce,t)}}(s,a),c=n.split("\n"),l=Object.fromEntries(a.map((e=>[e.className,{start:0,range:""}]))),r=Object.fromEntries(a.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let h=0;h<c.length;){const e=c[h].match(i);if(!e){h+=1;continue}const t=e.slice(1).find((e=>void 0!==e));r[t]?l[r[t]].range+=`${h},`:d[t]?l[d[t]].start=h:u[t]&&(l[u[t]].range+=`${l[u[t]].start}-${h-1},`),c.splice(h,1)}n=c.join("\n");const m={};return Object.entries(l).forEach((e=>{let[t,{range:n}]=e;ne()(n).forEach((e=>{m[e]??=[],m[e].push(t)}))})),{lineClassNames:m,code:n}}const de={codeBlockContainer:"codeBlockContainer_Ckt0"};function ue(e){let{as:t,...n}=e;const s=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[s,a]=e;const o=t[s];o&&"string"==typeof a&&(n[o]=a)})),n}(ee());return(0,i.jsx)(t,{...n,style:s,className:(0,l.Z)(n.className,de.codeBlockContainer,b.k.common.codeBlock)})}const me={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function he(e){let{children:t,className:n}=e;return(0,i.jsx)(ue,{as:"pre",tabIndex:0,className:(0,l.Z)(me.codeBlockStandalone,"thin-scrollbar",n),children:(0,i.jsx)("code",{className:me.codeBlockLines,children:t})})}var pe=n(902);const fe={attributes:!0,characterData:!0,childList:!0,subtree:!0};function xe(e,t){const[n,a]=(0,s.useState)(),o=(0,s.useCallback)((()=>{a(e.current?.closest("[role=tabpanel][hidden]"))}),[e,a]);(0,s.useEffect)((()=>{o()}),[o]),function(e,t,n){void 0===n&&(n=fe);const a=(0,pe.zX)(t),o=(0,pe.Ql)(n);(0,s.useEffect)((()=>{const t=new MutationObserver(a);return e&&t.observe(e,o),()=>t.disconnect()}),[e,a,o])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),o())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var be=n(2573);const ge={codeLine:"codeLine_lJS_",codeLineNumber:"codeLineNumber_Tfdd",codeLineContent:"codeLineContent_feaV"};function ve(e){let{line:t,classNames:n,showLineNumbers:s,getLineProps:a,getTokenProps:o}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const c=a({line:t,className:(0,l.Z)(n,s&&ge.codeLine)}),r=t.map(((e,t)=>(0,i.jsx)("span",{...o({token:e})},t)));return(0,i.jsxs)("span",{...c,children:[s?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("span",{className:ge.codeLineNumber}),(0,i.jsx)("span",{className:ge.codeLineContent,children:r})]}):r,(0,i.jsx)("br",{})]})}function je(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function Ne(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const ke={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function Ce(e){let{code:t,className:n}=e;const[a,o]=(0,s.useState)(!1),c=(0,s.useRef)(void 0),r=(0,s.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const s=document.createElement("textarea"),a=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";const o=document.getSelection(),i=o.rangeCount>0&&o.getRangeAt(0);n.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;let c=!1;try{c=document.execCommand("copy")}catch{}s.remove(),i&&(o.removeAllRanges(),o.addRange(i)),a&&a.focus()}(t),o(!0),c.current=window.setTimeout((()=>{o(!1)}),1e3)}),[t]);return(0,s.useEffect)((()=>()=>window.clearTimeout(c.current)),[]),(0,i.jsx)("button",{type:"button","aria-label":a?(0,d.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,d.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,d.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,l.Z)("clean-btn",n,ke.copyButton,a&&ke.copyButtonCopied),onClick:r,children:(0,i.jsxs)("span",{className:ke.copyButtonIcons,"aria-hidden":"true",children:[(0,i.jsx)(je,{className:ke.copyButtonIcon}),(0,i.jsx)(Ne,{className:ke.copyButtonSuccessIcon})]})})}function ye(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const Le={wordWrapButtonIcon:"wordWrapButtonIcon_Bwma",wordWrapButtonEnabled:"wordWrapButtonEnabled_EoeP"};function _e(e){let{className:t,onClick:n,isEnabled:s}=e;const a=(0,d.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,i.jsx)("button",{type:"button",onClick:n,className:(0,l.Z)("clean-btn",t,s&&Le.wordWrapButtonEnabled),"aria-label":a,title:a,children:(0,i.jsx)(ye,{className:Le.wordWrapButtonIcon,"aria-hidden":"true"})})}function Be(e){let{children:t,className:n="",metastring:a,title:o,showLineNumbers:c,language:r}=e;const{prism:{defaultLanguage:d,magicComments:u}}=(0,w.L)(),m=function(e){return e?.toLowerCase()}(r??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}(n)??d),h=ee(),p=function(){const[e,t]=(0,s.useState)(!1),[n,a]=(0,s.useState)(!1),o=(0,s.useRef)(null),i=(0,s.useCallback)((()=>{const n=o.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[o,e]),c=(0,s.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=o.current,n=e>t||o.current.querySelector("code").hasAttribute("style");a(n)}),[o]);return xe(o,c),(0,s.useEffect)((()=>{c()}),[e,c]),(0,s.useEffect)((()=>(window.addEventListener("resize",c,{passive:!0}),()=>{window.removeEventListener("resize",c)})),[c]),{codeBlockRef:o,isEnabled:e,isCodeScrollable:n,toggle:i}}(),f=function(e){return e?.match(se)?.groups.title??""}(a)||o,{lineClassNames:x,code:b}=re(t,{metastring:a,language:m,magicComments:u}),g=c??function(e){return Boolean(e?.includes("showLineNumbers"))}(a);return(0,i.jsxs)(ue,{as:"div",className:(0,l.Z)(n,m&&!n.includes(`language-${m}`)&&`language-${m}`),children:[f&&(0,i.jsx)("div",{className:me.codeBlockTitle,children:f}),(0,i.jsxs)("div",{className:me.codeBlockContent,children:[(0,i.jsx)(be.y$,{theme:h,code:b,language:m??"text",children:e=>{let{className:t,style:n,tokens:s,getLineProps:a,getTokenProps:o}=e;return(0,i.jsx)("pre",{tabIndex:0,ref:p.codeBlockRef,className:(0,l.Z)(t,me.codeBlock,"thin-scrollbar"),style:n,children:(0,i.jsx)("code",{className:(0,l.Z)(me.codeBlockLines,g&&me.codeBlockLinesWithNumbering),children:s.map(((e,t)=>(0,i.jsx)(ve,{line:e,getLineProps:a,getTokenProps:o,classNames:x[t],showLineNumbers:g},t)))})})}}),(0,i.jsxs)("div",{className:me.buttonGroup,children:[(p.isEnabled||p.isCodeScrollable)&&(0,i.jsx)(_e,{className:me.codeButton,onClick:()=>p.toggle(),isEnabled:p.isEnabled}),(0,i.jsx)(Ce,{className:me.codeButton,code:b})]})]})]})}function we(e){let{children:t,...n}=e;const a=(0,X.Z)(),o=function(e){return s.Children.toArray(e).some((e=>(0,s.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),c="string"==typeof o?Be:he;return(0,i.jsx)(c,{...n,children:o},String(a))}function Ze(e){return(0,i.jsx)("code",{...e})}var Te=n(8138);const Ee={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};function He(e){return!!e&&("SUMMARY"===e.tagName||He(e.parentElement))}function Ie(e,t){return!!e&&(e===t||Ie(e.parentElement,t))}function Me(e){let{summary:t,children:n,...a}=e;(0,Te.Z)().collectAnchor(a.id);const o=(0,X.Z)(),c=(0,s.useRef)(null),{collapsed:r,setCollapsed:d}=(0,B.u)({initialState:!a.open}),[u,m]=(0,s.useState)(a.open),h=s.isValidElement(t)?t:(0,i.jsx)("summary",{children:t??"Details"});return(0,i.jsxs)("details",{...a,ref:c,open:u,"data-collapsed":r,className:(0,l.Z)(Ee.details,o&&Ee.isBrowser,a.className),onMouseDown:e=>{He(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;He(t)&&Ie(t,c.current)&&(e.preventDefault(),r?(d(!1),m(!0)):d(!0))},children:[h,(0,i.jsx)(B.z,{lazy:!1,collapsed:r,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{d(e),m(!e)},children:(0,i.jsx)("div",{className:Ee.collapsibleContent,children:n})})]})}const Ae={details:"details_b_Ee"},Se="alert alert--info";function Ue(e){let{...t}=e;return(0,i.jsx)(Me,{...t,className:(0,l.Z)(Se,Ae.details,t.className)})}function ze(e){const t=s.Children.toArray(e.children),n=t.find((e=>s.isValidElement(e)&&"summary"===e.type)),a=(0,i.jsx)(i.Fragment,{children:t.filter((e=>e!==n))});return(0,i.jsx)(Ue,{...e,summary:n,children:a})}function Ve(e){return(0,i.jsx)(J.Z,{...e})}const Re={containsTaskList:"containsTaskList_mC6p"};function Pe(e){if(void 0!==e)return(0,l.Z)(e,e?.includes("contains-task-list")&&Re.containsTaskList)}const Oe={img:"img_ev3q"};function De(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=s.Children.toArray(e),n=t.find((e=>s.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),a=t.filter((e=>e!==n)),o=n?.props.children;return{mdxAdmonitionTitle:o,rest:a.length>0?(0,i.jsx)(i.Fragment,{children:a}):null}}(e.children),a=e.title??t;return{...e,...a&&{title:a},children:n}}const $e={admonition:"admonition_xJq3",admonitionHeading:"admonitionHeading_Gvgb",admonitionIcon:"admonitionIcon_Rf37",admonitionContent:"admonitionContent_BuS1"};function We(e){let{type:t,className:n,children:s}=e;return(0,i.jsx)("div",{className:(0,l.Z)(b.k.common.admonition,b.k.common.admonitionType(t),$e.admonition,n),children:s})}function Fe(e){let{icon:t,title:n}=e;return(0,i.jsxs)("div",{className:$e.admonitionHeading,children:[(0,i.jsx)("span",{className:$e.admonitionIcon,children:t}),n]})}function qe(e){let{children:t}=e;return t?(0,i.jsx)("div",{className:$e.admonitionContent,children:t}):null}function Ge(e){const{type:t,icon:n,title:s,children:a,className:o}=e;return(0,i.jsxs)(We,{type:t,className:o,children:[s||n?(0,i.jsx)(Fe,{title:s,icon:n}):null,(0,i.jsx)(qe,{children:a})]})}function Je(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const Ye={icon:(0,i.jsx)(Je,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function Qe(e){return(0,i.jsx)(Ge,{...Ye,...e,className:(0,l.Z)("alert alert--secondary",e.className),children:e.children})}function Xe(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const Ke={icon:(0,i.jsx)(Xe,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function et(e){return(0,i.jsx)(Ge,{...Ke,...e,className:(0,l.Z)("alert alert--success",e.className),children:e.children})}function tt(e){return(0,i.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const nt={icon:(0,i.jsx)(tt,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function st(e){return(0,i.jsx)(Ge,{...nt,...e,className:(0,l.Z)("alert alert--info",e.className),children:e.children})}function at(e){return(0,i.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const ot={icon:(0,i.jsx)(at,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function it(e){return(0,i.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const ct={icon:(0,i.jsx)(it,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const lt={icon:(0,i.jsx)(at,{}),title:(0,i.jsx)(d.Z,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const rt={...{note:Qe,tip:et,info:st,warning:function(e){return(0,i.jsx)(Ge,{...ot,...e,className:(0,l.Z)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,i.jsx)(Ge,{...ct,...e,className:(0,l.Z)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,i.jsx)(Qe,{title:"secondary",...e}),important:e=>(0,i.jsx)(st,{title:"important",...e}),success:e=>(0,i.jsx)(et,{title:"success",...e}),caution:function(e){return(0,i.jsx)(Ge,{...lt,...e,className:(0,l.Z)("alert alert--warning",e.className),children:e.children})}}};function dt(e){const t=De(e),n=(s=t.type,rt[s]||(console.warn(`No admonition component found for admonition type "${s}". Using Info as fallback.`),rt.info));var s;return(0,i.jsx)(n,{...t})}const ut={Head:Q.Z,details:ze,Details:ze,code:function(e){return function(e){return void 0!==e.children&&s.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")))}(e)?(0,i.jsx)(Ze,{...e}):(0,i.jsx)(we,{...e})},a:function(e){return(0,i.jsx)(u.Z,{...e})},pre:function(e){return(0,i.jsx)(i.Fragment,{children:e.children})},ul:function(e){return(0,i.jsx)("ul",{...e,className:Pe(e.className)})},li:function(e){return(0,Te.Z)().collectAnchor(e.id),(0,i.jsx)("li",{...e})},img:function(e){return(0,i.jsx)("img",{decoding:"async",loading:"lazy",...e,className:(t=e.className,(0,l.Z)(t,Oe.img))});var t},h1:e=>(0,i.jsx)(Ve,{as:"h1",...e}),h2:e=>(0,i.jsx)(Ve,{as:"h2",...e}),h3:e=>(0,i.jsx)(Ve,{as:"h3",...e}),h4:e=>(0,i.jsx)(Ve,{as:"h4",...e}),h5:e=>(0,i.jsx)(Ve,{as:"h5",...e}),h6:e=>(0,i.jsx)(Ve,{as:"h6",...e}),admonition:dt,mermaid:()=>null};function mt(e){let{children:t}=e;return(0,i.jsx)(Y.Z,{components:ut,children:t})}function ht(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=(0,o.k)();return t.hide_title||void 0!==n?null:e.title}();return(0,i.jsxs)("div",{className:(0,l.Z)(b.k.docs.docMarkdown,"markdown"),children:[n&&(0,i.jsx)("header",{children:(0,i.jsx)(J.Z,{as:"h1",children:n})}),(0,i.jsx)(mt,{children:t})]})}var pt=n(2802),ft=n(8596),xt=n(4996);function bt(e){return(0,i.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,i.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const gt={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function vt(){const e=(0,xt.ZP)("/");return(0,i.jsx)("li",{className:"breadcrumbs__item",children:(0,i.jsx)(u.Z,{"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,i.jsx)(bt,{className:gt.breadcrumbHomeIcon})})})}const jt={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function Nt(e){let{children:t,href:n,isLast:s}=e;const a="breadcrumbs__link";return s?(0,i.jsx)("span",{className:a,itemProp:"name",children:t}):n?(0,i.jsx)(u.Z,{className:a,href:n,itemProp:"item",children:(0,i.jsx)("span",{itemProp:"name",children:t})}):(0,i.jsx)("span",{className:a,children:t})}function kt(e){let{children:t,active:n,index:s,addMicrodata:a}=e;return(0,i.jsxs)("li",{...a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,l.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,i.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function Ct(){const e=(0,pt.s1)(),t=(0,ft.Ns)();return e?(0,i.jsx)("nav",{className:(0,l.Z)(b.k.docs.docBreadcrumbs,jt.breadcrumbsContainer),"aria-label":(0,d.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,i.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,i.jsx)(vt,{}),e.map(((t,n)=>{const s=n===e.length-1,a="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,i.jsx)(kt,{active:s,index:n,addMicrodata:!!a,children:(0,i.jsx)(Nt,{href:a,isLast:s,children:t.label})},n)}))]})}):null}function yt(){return(0,i.jsx)(d.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function Lt(){return(0,i.jsx)(d.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function _t(){return(0,i.jsx)(Q.Z,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function Bt(e){let{className:t}=e;return(0,i.jsx)(dt,{type:"caution",title:(0,i.jsx)(yt,{}),className:(0,l.Z)(t,b.k.common.unlistedBanner),children:(0,i.jsx)(Lt,{})})}function wt(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(_t,{}),(0,i.jsx)(Bt,{...e})]})}const Zt={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function Tt(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=(0,o.k)(),n=(0,r.i)(),s=e.hide_table_of_contents,a=!s&&t.length>0;return{hidden:s,mobile:a?(0,i.jsx)(D,{}):void 0,desktop:!a||"desktop"!==n&&"ssr"!==n?void 0:(0,i.jsx)(G,{})}}(),{metadata:{unlisted:s}}=(0,o.k)();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,l.Z)("col",!n.hidden&&Zt.docItemCol),children:[s&&(0,i.jsx)(wt,{}),(0,i.jsx)(y,{}),(0,i.jsxs)("div",{className:Zt.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(Ct,{}),(0,i.jsx)(L,{}),n.mobile,(0,i.jsx)(ht,{children:t}),(0,i.jsx)(_.Z,{})]}),(0,i.jsx)(p,{})]})]}),n.desktop&&(0,i.jsx)("div",{className:"col col--3",children:n.desktop})]})}function Et(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,i.jsx)(o.b,{content:e.content,children:(0,i.jsxs)(a.FG,{className:t,children:[(0,i.jsx)(c,{}),(0,i.jsx)(Tt,{children:(0,i.jsx)(n,{})})]})})}},5130:(e,t,n)=>{"use strict";n.d(t,{b:()=>c,k:()=>l});var s=n(7294),a=n(902),o=n(5893);const i=s.createContext(null);function c(e){let{children:t,content:n}=e;const a=function(e){return(0,s.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,o.jsx)(i.Provider,{value:a,children:t})}function l(){const e=(0,s.useContext)(i);if(null===e)throw new a.i6("DocProvider");return e}},7594:(e,t)=>{function n(e){let t,n=[];for(let s of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,a,o]=t;if(s&&o){s=parseInt(s),o=parseInt(o);const e=s<o?1:-1;"-"!==a&&".."!==a&&"\u2025"!==a||(o+=e);for(let t=s;t!==o;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},24:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var s=n(5893),a=n(7294);function o({id:e,host:t,repo:o,repoId:i,category:c,categoryId:l,mapping:r,term:d,strict:u,reactionsEnabled:m,emitMetadata:h,inputPosition:p,theme:f,lang:x,loading:b}){const[g,v]=(0,a.useState)(!1);return(0,a.useEffect)((()=>{g||(n.e(355).then(n.bind(n,4355)),v(!0))}),[]),g?(0,s.jsx)("giscus-widget",{id:e,host:t,repo:o,repoid:i,category:c,categoryid:l,mapping:r,term:d,strict:u,reactionsenabled:m,emitmetadata:h,inputposition:p,theme:f,lang:x,loading:b}):null}},1151:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c,a:()=>i});var s=n(7294);const a={},o=s.createContext(a);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);