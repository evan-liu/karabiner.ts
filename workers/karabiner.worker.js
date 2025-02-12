var It={exports:{}};(function(t){(e=>{var o=Object.defineProperty,c=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyNames,x=Object.prototype.hasOwnProperty,U=(n,i)=>{for(var s in i)o(n,s,{get:i[s],enumerable:!0})},X=(n,i,s,h)=>{if(i&&typeof i=="object"||typeof i=="function")for(let b of v(i))!x.call(n,b)&&b!==s&&o(n,b,{get:()=>i[b],enumerable:!(h=c(i,b))||h.enumerable});return n},F=n=>X(o({},"__esModule",{value:!0}),n),L=(n,i,s)=>new Promise((h,b)=>{var k=m=>{try{j(s.next(m))}catch(K){b(K)}},g=m=>{try{j(s.throw(m))}catch(K){b(K)}},j=m=>m.done?h(m.value):Promise.resolve(m.value).then(k,g);j((s=s.apply(n,i)).next())}),Z={};U(Z,{analyzeMetafile:()=>Wn,analyzeMetafileSync:()=>Gn,build:()=>Fn,buildSync:()=>zn,context:()=>Ln,default:()=>Xn,formatMessages:()=>Kn,formatMessagesSync:()=>Jn,initialize:()=>Yn,stop:()=>Hn,transform:()=>Bn,transformSync:()=>qn,version:()=>Vn}),e.exports=F(Z);function de(n){let i=h=>{if(h===null)s.write8(0);else if(typeof h=="boolean")s.write8(1),s.write8(+h);else if(typeof h=="number")s.write8(2),s.write32(h|0);else if(typeof h=="string")s.write8(3),s.write(le(h));else if(h instanceof Uint8Array)s.write8(4),s.write(h);else if(h instanceof Array){s.write8(5),s.write32(h.length);for(let b of h)i(b)}else{let b=Object.keys(h);s.write8(6),s.write32(b.length);for(let k of b)s.write(le(k)),i(h[k])}},s=new he;return s.write32(0),s.write32(n.id<<1|+!n.isRequest),i(n.value),je(s.buf,s.len-4,0),s.buf.subarray(0,s.len)}function se(n){let i=()=>{switch(s.read8()){case 0:return null;case 1:return!!s.read8();case 2:return s.read32();case 3:return ce(s.read());case 4:return s.read();case 5:{let g=s.read32(),j=[];for(let m=0;m<g;m++)j.push(i());return j}case 6:{let g=s.read32(),j={};for(let m=0;m<g;m++)j[ce(s.read())]=i();return j}default:throw new Error("Invalid packet")}},s=new he(n),h=s.read32(),b=(h&1)===0;h>>>=1;let k=i();if(s.ptr!==n.length)throw new Error("Invalid packet");return{id:h,isRequest:b,value:k}}var he=class{constructor(n=new Uint8Array(1024)){this.buf=n,this.len=0,this.ptr=0}_write(n){if(this.len+n>this.buf.length){let i=new Uint8Array((this.len+n)*2);i.set(this.buf),this.buf=i}return this.len+=n,this.len-n}write8(n){let i=this._write(1);this.buf[i]=n}write32(n){let i=this._write(4);je(this.buf,n,i)}write(n){let i=this._write(4+n.length);je(this.buf,n.length,i),this.buf.set(n,i+4)}_read(n){if(this.ptr+n>this.buf.length)throw new Error("Invalid packet");return this.ptr+=n,this.ptr-n}read8(){return this.buf[this._read(1)]}read32(){return Y(this.buf,this._read(4))}read(){let n=this.read32(),i=new Uint8Array(n),s=this._read(i.length);return i.set(this.buf.subarray(s,s+n)),i}},le,ce,we;if(typeof TextEncoder<"u"&&typeof TextDecoder<"u"){let n=new TextEncoder,i=new TextDecoder;le=s=>n.encode(s),ce=s=>i.decode(s),we='new TextEncoder().encode("")'}else if(typeof Buffer<"u")le=n=>Buffer.from(n),ce=n=>{let{buffer:i,byteOffset:s,byteLength:h}=n;return Buffer.from(i,s,h).toString()},we='Buffer.from("")';else throw new Error("No UTF-8 codec found");if(!(le("")instanceof Uint8Array))throw new Error(`Invariant violation: "${we} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);function Y(n,i){return n[i++]|n[i++]<<8|n[i++]<<16|n[i++]<<24}function je(n,i,s){n[s++]=i,n[s++]=i>>8,n[s++]=i>>16,n[s++]=i>>24}var ee=JSON.stringify,Ee="warning",ye="silent";function Ae(n){if(ue(n,"target"),n.indexOf(",")>=0)throw new Error(`Invalid target: ${n}`);return n}var Te=()=>null,te=n=>typeof n=="boolean"?null:"a boolean",D=n=>typeof n=="string"?null:"a string",tt=n=>n instanceof RegExp?null:"a RegExp object",Ue=n=>typeof n=="number"&&n===(n|0)?null:"an integer",Sn=n=>typeof n=="number"&&n===(n|0)&&n>=0&&n<=65535?null:"a valid port number",xt=n=>typeof n=="function"?null:"a function",ie=n=>Array.isArray(n)?null:"an array",ge=n=>typeof n=="object"&&n!==null&&!Array.isArray(n)?null:"an object",$n=n=>typeof n=="object"&&n!==null?null:"an array or an object",Tn=n=>n instanceof WebAssembly.Module?null:"a WebAssembly.Module",Et=n=>typeof n=="object"&&!Array.isArray(n)?null:"an object or null",St=n=>typeof n=="string"||typeof n=="boolean"?null:"a string or a boolean",Cn=n=>typeof n=="string"||typeof n=="object"&&n!==null&&!Array.isArray(n)?null:"a string or an object",jn=n=>typeof n=="string"||Array.isArray(n)?null:"a string or an array",$t=n=>typeof n=="string"||n instanceof Uint8Array?null:"a string or a Uint8Array",On=n=>typeof n=="string"||n instanceof URL?null:"a string or a URL";function l(n,i,s,h){let b=n[s];if(i[s+""]=!0,b===void 0)return;let k=h(b);if(k!==null)throw new Error(`${ee(s)} must be ${k}`);return b}function ae(n,i,s){for(let h in n)if(!(h in i))throw new Error(`Invalid option ${s}: ${ee(h)}`)}function Pn(n){let i=Object.create(null),s=l(n,i,"wasmURL",On),h=l(n,i,"wasmModule",Tn),b=l(n,i,"worker",te);return ae(n,i,"in initialize() call"),{wasmURL:s,wasmModule:h,worker:b}}function Tt(n){let i;if(n!==void 0){i=Object.create(null);for(let s in n){let h=n[s];if(typeof h=="string"||h===!1)i[s]=h;else throw new Error(`Expected ${ee(s)} in mangle cache to map to either a string or false`)}}return i}function nt(n,i,s,h,b){let k=l(i,s,"color",te),g=l(i,s,"logLevel",D),j=l(i,s,"logLimit",Ue);k!==void 0?n.push(`--color=${k}`):h&&n.push("--color=true"),n.push(`--log-level=${g||b}`),n.push(`--log-limit=${j||0}`)}function ue(n,i,s){if(typeof n!="string")throw new Error(`Expected value for ${i}${s!==void 0?" "+ee(s):""} to be a string, got ${typeof n} instead`);return n}function Ct(n,i,s){let h=l(i,s,"legalComments",D),b=l(i,s,"sourceRoot",D),k=l(i,s,"sourcesContent",te),g=l(i,s,"target",jn),j=l(i,s,"format",D),m=l(i,s,"globalName",D),K=l(i,s,"mangleProps",tt),W=l(i,s,"reserveProps",tt),I=l(i,s,"mangleQuoted",te),H=l(i,s,"minify",te),V=l(i,s,"minifySyntax",te),q=l(i,s,"minifyWhitespace",te),J=l(i,s,"minifyIdentifiers",te),A=l(i,s,"lineLimit",Ue),re=l(i,s,"drop",ie),P=l(i,s,"dropLabels",ie),O=l(i,s,"charset",D),w=l(i,s,"treeShaking",te),p=l(i,s,"ignoreAnnotations",te),a=l(i,s,"jsx",D),f=l(i,s,"jsxFactory",D),y=l(i,s,"jsxFragment",D),$=l(i,s,"jsxImportSource",D),T=l(i,s,"jsxDev",te),d=l(i,s,"jsxSideEffects",te),_=l(i,s,"define",ge),r=l(i,s,"logOverride",ge),u=l(i,s,"supported",ge),E=l(i,s,"pure",ie),S=l(i,s,"keepNames",te),M=l(i,s,"platform",D),B=l(i,s,"tsconfigRaw",Cn);if(h&&n.push(`--legal-comments=${h}`),b!==void 0&&n.push(`--source-root=${b}`),k!==void 0&&n.push(`--sources-content=${k}`),g&&(Array.isArray(g)?n.push(`--target=${Array.from(g).map(Ae).join(",")}`):n.push(`--target=${Ae(g)}`)),j&&n.push(`--format=${j}`),m&&n.push(`--global-name=${m}`),M&&n.push(`--platform=${M}`),B&&n.push(`--tsconfig-raw=${typeof B=="string"?B:JSON.stringify(B)}`),H&&n.push("--minify"),V&&n.push("--minify-syntax"),q&&n.push("--minify-whitespace"),J&&n.push("--minify-identifiers"),A&&n.push(`--line-limit=${A}`),O&&n.push(`--charset=${O}`),w!==void 0&&n.push(`--tree-shaking=${w}`),p&&n.push("--ignore-annotations"),re)for(let R of re)n.push(`--drop:${ue(R,"drop")}`);if(P&&n.push(`--drop-labels=${Array.from(P).map(R=>ue(R,"dropLabels")).join(",")}`),K&&n.push(`--mangle-props=${K.source}`),W&&n.push(`--reserve-props=${W.source}`),I!==void 0&&n.push(`--mangle-quoted=${I}`),a&&n.push(`--jsx=${a}`),f&&n.push(`--jsx-factory=${f}`),y&&n.push(`--jsx-fragment=${y}`),$&&n.push(`--jsx-import-source=${$}`),T&&n.push("--jsx-dev"),d&&n.push("--jsx-side-effects"),_)for(let R in _){if(R.indexOf("=")>=0)throw new Error(`Invalid define: ${R}`);n.push(`--define:${R}=${ue(_[R],"define",R)}`)}if(r)for(let R in r){if(R.indexOf("=")>=0)throw new Error(`Invalid log override: ${R}`);n.push(`--log-override:${R}=${ue(r[R],"log override",R)}`)}if(u)for(let R in u){if(R.indexOf("=")>=0)throw new Error(`Invalid supported: ${R}`);const N=u[R];if(typeof N!="boolean")throw new Error(`Expected value for supported ${ee(R)} to be a boolean, got ${typeof N} instead`);n.push(`--supported:${R}=${N}`)}if(E)for(let R of E)n.push(`--pure:${ue(R,"pure")}`);S&&n.push("--keep-names")}function Mn(n,i,s,h,b){var k;let g=[],j=[],m=Object.create(null),K=null,W=null;nt(g,i,m,s,h),Ct(g,i,m);let I=l(i,m,"sourcemap",St),H=l(i,m,"bundle",te),V=l(i,m,"splitting",te),q=l(i,m,"preserveSymlinks",te),J=l(i,m,"metafile",te),A=l(i,m,"outfile",D),re=l(i,m,"outdir",D),P=l(i,m,"outbase",D),O=l(i,m,"tsconfig",D),w=l(i,m,"resolveExtensions",ie),p=l(i,m,"nodePaths",ie),a=l(i,m,"mainFields",ie),f=l(i,m,"conditions",ie),y=l(i,m,"external",ie),$=l(i,m,"packages",D),T=l(i,m,"alias",ge),d=l(i,m,"loader",ge),_=l(i,m,"outExtension",ge),r=l(i,m,"publicPath",D),u=l(i,m,"entryNames",D),E=l(i,m,"chunkNames",D),S=l(i,m,"assetNames",D),M=l(i,m,"inject",ie),B=l(i,m,"banner",ge),R=l(i,m,"footer",ge),N=l(i,m,"entryPoints",$n),Q=l(i,m,"absWorkingDir",D),z=l(i,m,"stdin",ge),G=(k=l(i,m,"write",te))!=null?k:b,_e=l(i,m,"allowOverwrite",te),oe=l(i,m,"mangleCache",ge);if(m.plugins=!0,ae(i,m,`in ${n}() call`),I&&g.push(`--sourcemap${I===!0?"":`=${I}`}`),H&&g.push("--bundle"),_e&&g.push("--allow-overwrite"),V&&g.push("--splitting"),q&&g.push("--preserve-symlinks"),J&&g.push("--metafile"),A&&g.push(`--outfile=${A}`),re&&g.push(`--outdir=${re}`),P&&g.push(`--outbase=${P}`),O&&g.push(`--tsconfig=${O}`),$&&g.push(`--packages=${$}`),w){let C=[];for(let ne of w){if(ue(ne,"resolve extension"),ne.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${ne}`);C.push(ne)}g.push(`--resolve-extensions=${C.join(",")}`)}if(r&&g.push(`--public-path=${r}`),u&&g.push(`--entry-names=${u}`),E&&g.push(`--chunk-names=${E}`),S&&g.push(`--asset-names=${S}`),a){let C=[];for(let ne of a){if(ue(ne,"main field"),ne.indexOf(",")>=0)throw new Error(`Invalid main field: ${ne}`);C.push(ne)}g.push(`--main-fields=${C.join(",")}`)}if(f){let C=[];for(let ne of f){if(ue(ne,"condition"),ne.indexOf(",")>=0)throw new Error(`Invalid condition: ${ne}`);C.push(ne)}g.push(`--conditions=${C.join(",")}`)}if(y)for(let C of y)g.push(`--external:${ue(C,"external")}`);if(T)for(let C in T){if(C.indexOf("=")>=0)throw new Error(`Invalid package name in alias: ${C}`);g.push(`--alias:${C}=${ue(T[C],"alias",C)}`)}if(B)for(let C in B){if(C.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${C}`);g.push(`--banner:${C}=${ue(B[C],"banner",C)}`)}if(R)for(let C in R){if(C.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${C}`);g.push(`--footer:${C}=${ue(R[C],"footer",C)}`)}if(M)for(let C of M)g.push(`--inject:${ue(C,"inject")}`);if(d)for(let C in d){if(C.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${C}`);g.push(`--loader:${C}=${ue(d[C],"loader",C)}`)}if(_)for(let C in _){if(C.indexOf("=")>=0)throw new Error(`Invalid out extension: ${C}`);g.push(`--out-extension:${C}=${ue(_[C],"out extension",C)}`)}if(N)if(Array.isArray(N))for(let C=0,ne=N.length;C<ne;C++){let be=N[C];if(typeof be=="object"&&be!==null){let Se=Object.create(null),pe=l(be,Se,"in",D),He=l(be,Se,"out",D);if(ae(be,Se,"in entry point at index "+C),pe===void 0)throw new Error('Missing property "in" for entry point at index '+C);if(He===void 0)throw new Error('Missing property "out" for entry point at index '+C);j.push([He,pe])}else j.push(["",ue(be,"entry point at index "+C)])}else for(let C in N)j.push([C,ue(N[C],"entry point",C)]);if(z){let C=Object.create(null),ne=l(z,C,"contents",$t),be=l(z,C,"resolveDir",D),Se=l(z,C,"sourcefile",D),pe=l(z,C,"loader",D);ae(z,C,'in "stdin" object'),Se&&g.push(`--sourcefile=${Se}`),pe&&g.push(`--loader=${pe}`),be&&(W=be),typeof ne=="string"?K=le(ne):ne instanceof Uint8Array&&(K=ne)}let Re=[];if(p)for(let C of p)C+="",Re.push(C);return{entries:j,flags:g,write:G,stdinContents:K,stdinResolveDir:W,absWorkingDir:Q,nodePaths:Re,mangleCache:Tt(oe)}}function An(n,i,s,h){let b=[],k=Object.create(null);nt(b,i,k,s,h),Ct(b,i,k);let g=l(i,k,"sourcemap",St),j=l(i,k,"sourcefile",D),m=l(i,k,"loader",D),K=l(i,k,"banner",D),W=l(i,k,"footer",D),I=l(i,k,"mangleCache",ge);return ae(i,k,`in ${n}() call`),g&&b.push(`--sourcemap=${g===!0?"external":g}`),j&&b.push(`--sourcefile=${j}`),m&&b.push(`--loader=${m}`),K&&b.push(`--banner=${K}`),W&&b.push(`--footer=${W}`),{flags:b,mangleCache:Tt(I)}}function Dn(n){const i={},s={didClose:!1,reason:""};let h={},b=0,k=0,g=new Uint8Array(16*1024),j=0,m=O=>{let w=j+O.length;if(w>g.length){let a=new Uint8Array(w*2);a.set(g),g=a}g.set(O,j),j+=O.length;let p=0;for(;p+4<=j;){let a=Y(g,p);if(p+4+a>j)break;p+=4,q(g.subarray(p,p+a)),p+=a}p>0&&(g.copyWithin(0,p,j),j-=p)},K=O=>{s.didClose=!0,O&&(s.reason=": "+(O.message||O));const w="The service was stopped"+s.reason;for(let p in h)h[p](w,null);h={}},W=(O,w,p)=>{if(s.didClose)return p("The service is no longer running"+s.reason,null);let a=b++;h[a]=(f,y)=>{try{p(f,y)}finally{O&&O.unref()}},O&&O.ref(),n.writeToStdin(de({id:a,isRequest:!0,value:w}))},I=(O,w)=>{if(s.didClose)throw new Error("The service is no longer running"+s.reason);n.writeToStdin(de({id:O,isRequest:!1,value:w}))},H=(O,w)=>L(this,null,function*(){try{if(w.command==="ping"){I(O,{});return}if(typeof w.key=="number"){const p=i[w.key];if(!p)return;const a=p[w.command];if(a){yield a(O,w);return}}throw new Error("Invalid command: "+w.command)}catch(p){const a=[De(p,n,null,void 0,"")];try{I(O,{errors:a})}catch{}}}),V=!0,q=O=>{if(V){V=!1;let p=String.fromCharCode(...O);if(p!=="0.25.0")throw new Error(`Cannot start service: Host version "0.25.0" does not match binary version ${ee(p)}`);return}let w=se(O);if(w.isRequest)H(w.id,w.value);else{let p=h[w.id];delete h[w.id],w.value.error?p(w.value.error,{}):p(null,w.value)}};return{readFromStdout:m,afterClose:K,service:{buildOrContext:({callName:O,refs:w,options:p,isTTY:a,defaultWD:f,callback:y})=>{let $=0;const T=k++,d={},_={ref(){++$===1&&w&&w.ref()},unref(){--$===0&&(delete i[T],w&&w.unref())}};i[T]=d,_.ref(),In(O,T,W,I,_,n,d,p,a,f,(r,u)=>{try{y(r,u)}finally{_.unref()}})},transform:({callName:O,refs:w,input:p,options:a,isTTY:f,fs:y,callback:$})=>{const T=jt();let d=_=>{try{if(typeof p!="string"&&!(p instanceof Uint8Array))throw new Error('The input to "transform" must be a string or a Uint8Array');let{flags:r,mangleCache:u}=An(O,a,f,ye),E={command:"transform",flags:r,inputFS:_!==null,input:_!==null?le(_):typeof p=="string"?le(p):p};u&&(E.mangleCache=u),W(w,E,(S,M)=>{if(S)return $(new Error(S),null);let B=Ne(M.errors,T),R=Ne(M.warnings,T),N=1,Q=()=>{if(--N===0){let z={warnings:R,code:M.code,map:M.map,mangleCache:void 0,legalComments:void 0};"legalComments"in M&&(z.legalComments=M==null?void 0:M.legalComments),M.mangleCache&&(z.mangleCache=M==null?void 0:M.mangleCache),$(null,z)}};if(B.length>0)return $(Je("Transform failed",B,R),null);M.codeFS&&(N++,y.readFile(M.code,(z,G)=>{z!==null?$(z,null):(M.code=G,Q())})),M.mapFS&&(N++,y.readFile(M.map,(z,G)=>{z!==null?$(z,null):(M.map=G,Q())})),Q()})}catch(r){let u=[];try{nt(u,a,{},f,ye)}catch{}const E=De(r,n,T,void 0,"");W(w,{command:"error",flags:u,error:E},()=>{E.detail=T.load(E.detail),$(Je("Transform failed",[E],[]),null)})}};if((typeof p=="string"||p instanceof Uint8Array)&&p.length>1024*1024){let _=d;d=()=>y.writeFile(p,_)}d(null)},formatMessages:({callName:O,refs:w,messages:p,options:a,callback:f})=>{if(!a)throw new Error(`Missing second argument in ${O}() call`);let y={},$=l(a,y,"kind",D),T=l(a,y,"color",te),d=l(a,y,"terminalWidth",Ue);if(ae(a,y,`in ${O}() call`),$===void 0)throw new Error(`Missing "kind" in ${O}() call`);if($!=="error"&&$!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${O}() call`);let _={command:"format-msgs",messages:Ce(p,"messages",null,"",d),isWarning:$==="warning"};T!==void 0&&(_.color=T),d!==void 0&&(_.terminalWidth=d),W(w,_,(r,u)=>{if(r)return f(new Error(r),null);f(null,u.messages)})},analyzeMetafile:({callName:O,refs:w,metafile:p,options:a,callback:f})=>{a===void 0&&(a={});let y={},$=l(a,y,"color",te),T=l(a,y,"verbose",te);ae(a,y,`in ${O}() call`);let d={command:"analyze-metafile",metafile:p};$!==void 0&&(d.color=$),T!==void 0&&(d.verbose=T),W(w,d,(_,r)=>{if(_)return f(new Error(_),null);f(null,r.result)})}}}}function In(n,i,s,h,b,k,g,j,m,K,W){const I=jt(),H=n==="context",V=(A,re)=>{const P=[];try{nt(P,j,{},m,Ee)}catch{}const O=De(A,k,I,void 0,re);s(b,{command:"error",flags:P,error:O},()=>{O.detail=I.load(O.detail),W(Je(H?"Context failed":"Build failed",[O],[]),null)})};let q;if(typeof j=="object"){const A=j.plugins;if(A!==void 0){if(!Array.isArray(A))return V(new Error('"plugins" must be an array'),"");q=A}}if(q&&q.length>0){if(k.isSync)return V(new Error("Cannot use plugins in synchronous API calls"),"");Un(i,s,h,b,k,g,j,q,I).then(A=>{if(!A.ok)return V(A.error,A.pluginName);try{J(A.requestPlugins,A.runOnEndCallbacks,A.scheduleOnDisposeCallbacks)}catch(re){V(re,"")}},A=>V(A,""));return}try{J(null,(A,re)=>re([],[]),()=>{})}catch(A){V(A,"")}function J(A,re,P){const O=k.hasFS,{entries:w,flags:p,write:a,stdinContents:f,stdinResolveDir:y,absWorkingDir:$,nodePaths:T,mangleCache:d}=Mn(n,j,m,Ee,O);if(a&&!k.hasFS)throw new Error('The "write" option is unavailable in this environment');const _={command:"build",key:i,entries:w,flags:p,write:a,stdinContents:f,stdinResolveDir:y,absWorkingDir:$||K,nodePaths:T,context:H};A&&(_.plugins=A),d&&(_.mangleCache=d);const r=(S,M)=>{const B={errors:Ne(S.errors,I),warnings:Ne(S.warnings,I),outputFiles:void 0,metafile:void 0,mangleCache:void 0},R=B.errors.slice(),N=B.warnings.slice();S.outputFiles&&(B.outputFiles=S.outputFiles.map(Rn)),S.metafile&&(B.metafile=JSON.parse(S.metafile)),S.mangleCache&&(B.mangleCache=S.mangleCache),S.writeToStdout!==void 0&&console.log(ce(S.writeToStdout).replace(/\n$/,"")),re(B,(Q,z)=>{if(R.length>0||Q.length>0){const G=Je("Build failed",R.concat(Q),N.concat(z));return M(G,null,Q,z)}M(null,B,Q,z)})};let u,E;H&&(g["on-end"]=(S,M)=>new Promise(B=>{r(M,(R,N,Q,z)=>{const G={errors:Q,warnings:z};E&&E(R,N),u=void 0,E=void 0,h(S,G),B()})})),s(b,_,(S,M)=>{if(S)return W(new Error(S),null);if(!H)return r(M,(N,Q)=>(P(),W(N,Q)));if(M.errors.length>0)return W(Je("Context failed",M.errors,M.warnings),null);let B=!1;const R={rebuild:()=>(u||(u=new Promise((N,Q)=>{let z;E=(_e,oe)=>{z||(z=()=>_e?Q(_e):N(oe))};const G=()=>{s(b,{command:"rebuild",key:i},(oe,Re)=>{oe?Q(new Error(oe)):z?z():G()})};G()})),u),watch:(N={})=>new Promise((Q,z)=>{if(!k.hasFS)throw new Error('Cannot use the "watch" API in this environment');ae(N,{},"in watch() call"),s(b,{command:"watch",key:i},oe=>{oe?z(new Error(oe)):Q(void 0)})}),serve:(N={})=>new Promise((Q,z)=>{if(!k.hasFS)throw new Error('Cannot use the "serve" API in this environment');const G={},_e=l(N,G,"port",Sn),oe=l(N,G,"host",D),Re=l(N,G,"servedir",D),C=l(N,G,"keyfile",D),ne=l(N,G,"certfile",D),be=l(N,G,"fallback",D),Se=l(N,G,"onRequest",xt);ae(N,G,"in serve() call");const pe={command:"serve",key:i,onRequest:!!Se};_e!==void 0&&(pe.port=_e),oe!==void 0&&(pe.host=oe),Re!==void 0&&(pe.servedir=Re),C!==void 0&&(pe.keyfile=C),ne!==void 0&&(pe.certfile=ne),be!==void 0&&(pe.fallback=be),s(b,pe,(He,Zn)=>{if(He)return z(new Error(He));Se&&(g["serve-request"]=(er,tr)=>{Se(tr.args),h(er,{})}),Q(Zn)})}),cancel:()=>new Promise(N=>{if(B)return N();s(b,{command:"cancel",key:i},()=>{N()})}),dispose:()=>new Promise(N=>{if(B)return N();B=!0,s(b,{command:"dispose",key:i},()=>{N(),P(),b.unref()})})};b.ref(),W(null,R)})}}var Un=(n,i,s,h,b,k,g,j,m)=>L(void 0,null,function*(){let K=[],W=[],I={},H={},V=[],q=0,J=0,A=[],re=!1;j=[...j];for(let w of j){let p={};if(typeof w!="object")throw new Error(`Plugin at index ${J} must be an object`);const a=l(w,p,"name",D);if(typeof a!="string"||a==="")throw new Error(`Plugin at index ${J} is missing a name`);try{let f=l(w,p,"setup",xt);if(typeof f!="function")throw new Error("Plugin is missing a setup function");ae(w,p,`on plugin ${ee(a)}`);let y={name:a,onStart:!1,onEnd:!1,onResolve:[],onLoad:[]};J++;let T=f({initialOptions:g,resolve:(d,_={})=>{if(!re)throw new Error('Cannot call "resolve" before plugin setup has completed');if(typeof d!="string")throw new Error("The path to resolve must be a string");let r=Object.create(null),u=l(_,r,"pluginName",D),E=l(_,r,"importer",D),S=l(_,r,"namespace",D),M=l(_,r,"resolveDir",D),B=l(_,r,"kind",D),R=l(_,r,"pluginData",Te),N=l(_,r,"with",ge);return ae(_,r,"in resolve() call"),new Promise((Q,z)=>{const G={command:"resolve",path:d,key:n,pluginName:a};if(u!=null&&(G.pluginName=u),E!=null&&(G.importer=E),S!=null&&(G.namespace=S),M!=null&&(G.resolveDir=M),B!=null)G.kind=B;else throw new Error('Must specify "kind" when calling "resolve"');R!=null&&(G.pluginData=m.store(R)),N!=null&&(G.with=Nn(N,"with")),i(h,G,(_e,oe)=>{_e!==null?z(new Error(_e)):Q({errors:Ne(oe.errors,m),warnings:Ne(oe.warnings,m),path:oe.path,external:oe.external,sideEffects:oe.sideEffects,namespace:oe.namespace,suffix:oe.suffix,pluginData:m.load(oe.pluginData)})})})},onStart(d){let _='This error came from the "onStart" callback registered here:',r=rt(new Error(_),b,"onStart");K.push({name:a,callback:d,note:r}),y.onStart=!0},onEnd(d){let _='This error came from the "onEnd" callback registered here:',r=rt(new Error(_),b,"onEnd");W.push({name:a,callback:d,note:r}),y.onEnd=!0},onResolve(d,_){let r='This error came from the "onResolve" callback registered here:',u=rt(new Error(r),b,"onResolve"),E={},S=l(d,E,"filter",tt),M=l(d,E,"namespace",D);if(ae(d,E,`in onResolve() call for plugin ${ee(a)}`),S==null)throw new Error("onResolve() call is missing a filter");let B=q++;I[B]={name:a,callback:_,note:u},y.onResolve.push({id:B,filter:S.source,namespace:M||""})},onLoad(d,_){let r='This error came from the "onLoad" callback registered here:',u=rt(new Error(r),b,"onLoad"),E={},S=l(d,E,"filter",tt),M=l(d,E,"namespace",D);if(ae(d,E,`in onLoad() call for plugin ${ee(a)}`),S==null)throw new Error("onLoad() call is missing a filter");let B=q++;H[B]={name:a,callback:_,note:u},y.onLoad.push({id:B,filter:S.source,namespace:M||""})},onDispose(d){V.push(d)},esbuild:b.esbuild});T&&(yield T),A.push(y)}catch(f){return{ok:!1,error:f,pluginName:a}}}k["on-start"]=(w,p)=>L(void 0,null,function*(){m.clear();let a={errors:[],warnings:[]};yield Promise.all(K.map(f=>L(void 0,[f],function*({name:y,callback:$,note:T}){try{let d=yield $();if(d!=null){if(typeof d!="object")throw new Error(`Expected onStart() callback in plugin ${ee(y)} to return an object`);let _={},r=l(d,_,"errors",ie),u=l(d,_,"warnings",ie);ae(d,_,`from onStart() callback in plugin ${ee(y)}`),r!=null&&a.errors.push(...Ce(r,"errors",m,y,void 0)),u!=null&&a.warnings.push(...Ce(u,"warnings",m,y,void 0))}}catch(d){a.errors.push(De(d,b,m,T&&T(),y))}}))),s(w,a)}),k["on-resolve"]=(w,p)=>L(void 0,null,function*(){let a={},f="",y,$;for(let T of p.ids)try{({name:f,callback:y,note:$}=I[T]);let d=yield y({path:p.path,importer:p.importer,namespace:p.namespace,resolveDir:p.resolveDir,kind:p.kind,pluginData:m.load(p.pluginData),with:p.with});if(d!=null){if(typeof d!="object")throw new Error(`Expected onResolve() callback in plugin ${ee(f)} to return an object`);let _={},r=l(d,_,"pluginName",D),u=l(d,_,"path",D),E=l(d,_,"namespace",D),S=l(d,_,"suffix",D),M=l(d,_,"external",te),B=l(d,_,"sideEffects",te),R=l(d,_,"pluginData",Te),N=l(d,_,"errors",ie),Q=l(d,_,"warnings",ie),z=l(d,_,"watchFiles",ie),G=l(d,_,"watchDirs",ie);ae(d,_,`from onResolve() callback in plugin ${ee(f)}`),a.id=T,r!=null&&(a.pluginName=r),u!=null&&(a.path=u),E!=null&&(a.namespace=E),S!=null&&(a.suffix=S),M!=null&&(a.external=M),B!=null&&(a.sideEffects=B),R!=null&&(a.pluginData=m.store(R)),N!=null&&(a.errors=Ce(N,"errors",m,f,void 0)),Q!=null&&(a.warnings=Ce(Q,"warnings",m,f,void 0)),z!=null&&(a.watchFiles=it(z,"watchFiles")),G!=null&&(a.watchDirs=it(G,"watchDirs"));break}}catch(d){a={id:T,errors:[De(d,b,m,$&&$(),f)]};break}s(w,a)}),k["on-load"]=(w,p)=>L(void 0,null,function*(){let a={},f="",y,$;for(let T of p.ids)try{({name:f,callback:y,note:$}=H[T]);let d=yield y({path:p.path,namespace:p.namespace,suffix:p.suffix,pluginData:m.load(p.pluginData),with:p.with});if(d!=null){if(typeof d!="object")throw new Error(`Expected onLoad() callback in plugin ${ee(f)} to return an object`);let _={},r=l(d,_,"pluginName",D),u=l(d,_,"contents",$t),E=l(d,_,"resolveDir",D),S=l(d,_,"pluginData",Te),M=l(d,_,"loader",D),B=l(d,_,"errors",ie),R=l(d,_,"warnings",ie),N=l(d,_,"watchFiles",ie),Q=l(d,_,"watchDirs",ie);ae(d,_,`from onLoad() callback in plugin ${ee(f)}`),a.id=T,r!=null&&(a.pluginName=r),u instanceof Uint8Array?a.contents=u:u!=null&&(a.contents=le(u)),E!=null&&(a.resolveDir=E),S!=null&&(a.pluginData=m.store(S)),M!=null&&(a.loader=M),B!=null&&(a.errors=Ce(B,"errors",m,f,void 0)),R!=null&&(a.warnings=Ce(R,"warnings",m,f,void 0)),N!=null&&(a.watchFiles=it(N,"watchFiles")),Q!=null&&(a.watchDirs=it(Q,"watchDirs"));break}}catch(d){a={id:T,errors:[De(d,b,m,$&&$(),f)]};break}s(w,a)});let P=(w,p)=>p([],[]);W.length>0&&(P=(w,p)=>{L(void 0,null,function*(){const a=[],f=[];for(const{name:y,callback:$,note:T}of W){let d,_;try{const r=yield $(w);if(r!=null){if(typeof r!="object")throw new Error(`Expected onEnd() callback in plugin ${ee(y)} to return an object`);let u={},E=l(r,u,"errors",ie),S=l(r,u,"warnings",ie);ae(r,u,`from onEnd() callback in plugin ${ee(y)}`),E!=null&&(d=Ce(E,"errors",m,y,void 0)),S!=null&&(_=Ce(S,"warnings",m,y,void 0))}}catch(r){d=[De(r,b,m,T&&T(),y)]}if(d){a.push(...d);try{w.errors.push(...d)}catch{}}if(_){f.push(..._);try{w.warnings.push(..._)}catch{}}}p(a,f)})});let O=()=>{for(const w of V)setTimeout(()=>w(),0)};return re=!0,{ok:!0,requestPlugins:A,runOnEndCallbacks:P,scheduleOnDisposeCallbacks:O}});function jt(){const n=new Map;let i=0;return{clear(){n.clear()},load(s){return n.get(s)},store(s){if(s===void 0)return-1;const h=i++;return n.set(h,s),h}}}function rt(n,i,s){let h,b=!1;return()=>{if(b)return h;b=!0;try{let k=(n.stack+"").split(`
`);k.splice(1,1);let g=Ot(i,k,s);if(g)return h={text:n.message,location:g},h}catch{}}}function De(n,i,s,h,b){let k="Internal error",g=null;try{k=(n&&n.message||n)+""}catch{}try{g=Ot(i,(n.stack+"").split(`
`),"")}catch{}return{id:"",pluginName:b,text:k,location:g,notes:h?[h]:[],detail:s?s.store(n):-1}}function Ot(n,i,s){let h="    at ";if(n.readFileSync&&!i[0].startsWith(h)&&i[1].startsWith(h))for(let b=1;b<i.length;b++){let k=i[b];if(k.startsWith(h))for(k=k.slice(h.length);;){let g=/^(?:new |async )?\S+ \((.*)\)$/.exec(k);if(g){k=g[1];continue}if(g=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(k),g){k=g[1];continue}if(g=/^(\S+):(\d+):(\d+)$/.exec(k),g){let j;try{j=n.readFileSync(g[1],"utf8")}catch{break}let m=j.split(/\r\n|\r|\n|\u2028|\u2029/)[+g[2]-1]||"",K=+g[3]-1,W=m.slice(K,K+s.length)===s?s.length:0;return{file:g[1],namespace:"file",line:+g[2],column:le(m.slice(0,K)).length,length:le(m.slice(K,K+W)).length,lineText:m+`
`+i.slice(1).join(`
`),suggestion:""}}break}}return null}function Je(n,i,s){let h=5;n+=i.length<1?"":` with ${i.length} error${i.length<2?"":"s"}:`+i.slice(0,h+1).map((k,g)=>{if(g===h)return`
...`;if(!k.location)return`
error: ${k.text}`;let{file:j,line:m,column:K}=k.location,W=k.pluginName?`[plugin: ${k.pluginName}] `:"";return`
${j}:${m}:${K}: ERROR: ${W}${k.text}`}).join("");let b=new Error(n);for(const[k,g]of[["errors",i],["warnings",s]])Object.defineProperty(b,k,{configurable:!0,enumerable:!0,get:()=>g,set:j=>Object.defineProperty(b,k,{configurable:!0,enumerable:!0,value:j})});return b}function Ne(n,i){for(const s of n)s.detail=i.load(s.detail);return n}function Pt(n,i,s){if(n==null)return null;let h={},b=l(n,h,"file",D),k=l(n,h,"namespace",D),g=l(n,h,"line",Ue),j=l(n,h,"column",Ue),m=l(n,h,"length",Ue),K=l(n,h,"lineText",D),W=l(n,h,"suggestion",D);if(ae(n,h,i),K){const I=K.slice(0,(j&&j>0?j:0)+(m&&m>0?m:0)+(s&&s>0?s:80));!/[\x7F-\uFFFF]/.test(I)&&!/\n/.test(K)&&(K=I)}return{file:b||"",namespace:k||"",line:g||0,column:j||0,length:m||0,lineText:K||"",suggestion:W||""}}function Ce(n,i,s,h,b){let k=[],g=0;for(const j of n){let m={},K=l(j,m,"id",D),W=l(j,m,"pluginName",D),I=l(j,m,"text",D),H=l(j,m,"location",Et),V=l(j,m,"notes",ie),q=l(j,m,"detail",Te),J=`in element ${g} of "${i}"`;ae(j,m,J);let A=[];if(V)for(const re of V){let P={},O=l(re,P,"text",D),w=l(re,P,"location",Et);ae(re,P,J),A.push({text:O||"",location:Pt(w,J,b)})}k.push({id:K||"",pluginName:W||h,text:I||"",location:Pt(H,J,b),notes:A,detail:s?s.store(q):-1}),g++}return k}function it(n,i){const s=[];for(const h of n){if(typeof h!="string")throw new Error(`${ee(i)} must be an array of strings`);s.push(h)}return s}function Nn(n,i){const s=Object.create(null);for(const h in n){const b=n[h];if(typeof b!="string")throw new Error(`key ${ee(h)} in object ${ee(i)} must be a string`);s[h]=b}return s}function Rn({path:n,contents:i,hash:s}){let h=null;return{path:n,contents:i,hash:s,get text(){const b=this.contents;return(h===null||b!==i)&&(i=b,h=ce(b)),h}}}var Vn="0.25.0",Fn=n=>Ge().build(n),Ln=n=>Ge().context(n),Bn=(n,i)=>Ge().transform(n,i),Kn=(n,i)=>Ge().formatMessages(n,i),Wn=(n,i)=>Ge().analyzeMetafile(n,i),zn=()=>{throw new Error('The "buildSync" API only works in node')},qn=()=>{throw new Error('The "transformSync" API only works in node')},Jn=()=>{throw new Error('The "formatMessagesSync" API only works in node')},Gn=()=>{throw new Error('The "analyzeMetafileSync" API only works in node')},Hn=()=>(ot&&ot(),Promise.resolve()),Ie,ot,st,Ge=()=>{if(st)return st;throw Ie?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},Yn=n=>{n=Pn(n||{});let i=n.wasmURL,s=n.wasmModule,h=n.worker!==!1;if(!i&&!s)throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');if(Ie)throw new Error('Cannot call "initialize" more than once');return Ie=Qn(i||"",s,h),Ie.catch(()=>{Ie=void 0}),Ie},Qn=(n,i,s)=>L(void 0,null,function*(){let h,b;const k=new Promise(I=>b=I);if(s){let I=new Blob([`onmessage=((postMessage) => {
      // Copyright 2018 The Go Authors. All rights reserved.
      // Use of this source code is governed by a BSD-style
      // license that can be found in the LICENSE file.
      var __async = (__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = (value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          };
          var rejected = (value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          };
          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
          step((generator = generator.apply(__this, __arguments)).next());
        });
      };
      let onmessage;
      let globalThis = {};
      for (let o = self; o; o = Object.getPrototypeOf(o))
        for (let k of Object.getOwnPropertyNames(o))
          if (!(k in globalThis))
            Object.defineProperty(globalThis, k, { get: () => self[k] });
      "use strict";
      (() => {
        const enosys = () => {
          const err = new Error("not implemented");
          err.code = "ENOSYS";
          return err;
        };
        if (!globalThis.fs) {
          let outputBuf = "";
          globalThis.fs = {
            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
            // unused
            writeSync(fd, buf) {
              outputBuf += decoder.decode(buf);
              const nl = outputBuf.lastIndexOf("\\n");
              if (nl != -1) {
                console.log(outputBuf.substring(0, nl));
                outputBuf = outputBuf.substring(nl + 1);
              }
              return buf.length;
            },
            write(fd, buf, offset, length, position, callback) {
              if (offset !== 0 || length !== buf.length || position !== null) {
                callback(enosys());
                return;
              }
              const n = this.writeSync(fd, buf);
              callback(null, n);
            },
            chmod(path, mode, callback) {
              callback(enosys());
            },
            chown(path, uid, gid, callback) {
              callback(enosys());
            },
            close(fd, callback) {
              callback(enosys());
            },
            fchmod(fd, mode, callback) {
              callback(enosys());
            },
            fchown(fd, uid, gid, callback) {
              callback(enosys());
            },
            fstat(fd, callback) {
              callback(enosys());
            },
            fsync(fd, callback) {
              callback(null);
            },
            ftruncate(fd, length, callback) {
              callback(enosys());
            },
            lchown(path, uid, gid, callback) {
              callback(enosys());
            },
            link(path, link, callback) {
              callback(enosys());
            },
            lstat(path, callback) {
              callback(enosys());
            },
            mkdir(path, perm, callback) {
              callback(enosys());
            },
            open(path, flags, mode, callback) {
              callback(enosys());
            },
            read(fd, buffer, offset, length, position, callback) {
              callback(enosys());
            },
            readdir(path, callback) {
              callback(enosys());
            },
            readlink(path, callback) {
              callback(enosys());
            },
            rename(from, to, callback) {
              callback(enosys());
            },
            rmdir(path, callback) {
              callback(enosys());
            },
            stat(path, callback) {
              callback(enosys());
            },
            symlink(path, link, callback) {
              callback(enosys());
            },
            truncate(path, length, callback) {
              callback(enosys());
            },
            unlink(path, callback) {
              callback(enosys());
            },
            utimes(path, atime, mtime, callback) {
              callback(enosys());
            }
          };
        }
        if (!globalThis.process) {
          globalThis.process = {
            getuid() {
              return -1;
            },
            getgid() {
              return -1;
            },
            geteuid() {
              return -1;
            },
            getegid() {
              return -1;
            },
            getgroups() {
              throw enosys();
            },
            pid: -1,
            ppid: -1,
            umask() {
              throw enosys();
            },
            cwd() {
              throw enosys();
            },
            chdir() {
              throw enosys();
            }
          };
        }
        if (!globalThis.crypto) {
          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
        }
        if (!globalThis.performance) {
          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
        }
        if (!globalThis.TextEncoder) {
          throw new Error("globalThis.TextEncoder is not available, polyfill required");
        }
        if (!globalThis.TextDecoder) {
          throw new Error("globalThis.TextDecoder is not available, polyfill required");
        }
        const encoder = new TextEncoder("utf-8");
        const decoder = new TextDecoder("utf-8");
        globalThis.Go = class {
          constructor() {
            this.argv = ["js"];
            this.env = {};
            this.exit = (code) => {
              if (code !== 0) {
                console.warn("exit code:", code);
              }
            };
            this._exitPromise = new Promise((resolve) => {
              this._resolveExitPromise = resolve;
            });
            this._pendingEvent = null;
            this._scheduledTimeouts = /* @__PURE__ */ new Map();
            this._nextCallbackTimeoutID = 1;
            const setInt64 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
            };
            const setInt32 = (addr, v) => {
              this.mem.setUint32(addr + 0, v, true);
            };
            const getInt64 = (addr) => {
              const low = this.mem.getUint32(addr + 0, true);
              const high = this.mem.getInt32(addr + 4, true);
              return low + high * 4294967296;
            };
            const loadValue = (addr) => {
              const f = this.mem.getFloat64(addr, true);
              if (f === 0) {
                return void 0;
              }
              if (!isNaN(f)) {
                return f;
              }
              const id = this.mem.getUint32(addr, true);
              return this._values[id];
            };
            const storeValue = (addr, v) => {
              const nanHead = 2146959360;
              if (typeof v === "number" && v !== 0) {
                if (isNaN(v)) {
                  this.mem.setUint32(addr + 4, nanHead, true);
                  this.mem.setUint32(addr, 0, true);
                  return;
                }
                this.mem.setFloat64(addr, v, true);
                return;
              }
              if (v === void 0) {
                this.mem.setFloat64(addr, 0, true);
                return;
              }
              let id = this._ids.get(v);
              if (id === void 0) {
                id = this._idPool.pop();
                if (id === void 0) {
                  id = this._values.length;
                }
                this._values[id] = v;
                this._goRefCounts[id] = 0;
                this._ids.set(v, id);
              }
              this._goRefCounts[id]++;
              let typeFlag = 0;
              switch (typeof v) {
                case "object":
                  if (v !== null) {
                    typeFlag = 1;
                  }
                  break;
                case "string":
                  typeFlag = 2;
                  break;
                case "symbol":
                  typeFlag = 3;
                  break;
                case "function":
                  typeFlag = 4;
                  break;
              }
              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
              this.mem.setUint32(addr, id, true);
            };
            const loadSlice = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return new Uint8Array(this._inst.exports.mem.buffer, array, len);
            };
            const loadSliceOfValues = (addr) => {
              const array = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              const a = new Array(len);
              for (let i = 0; i < len; i++) {
                a[i] = loadValue(array + i * 8);
              }
              return a;
            };
            const loadString = (addr) => {
              const saddr = getInt64(addr + 0);
              const len = getInt64(addr + 8);
              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
            };
            const timeOrigin = Date.now() - performance.now();
            this.importObject = {
              _gotest: {
                add: (a, b) => a + b
              },
              gojs: {
                // Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
                // may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
                // function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
                // This changes the SP, thus we have to update the SP used by the imported function.
                // func wasmExit(code int32)
                "runtime.wasmExit": (sp) => {
                  sp >>>= 0;
                  const code = this.mem.getInt32(sp + 8, true);
                  this.exited = true;
                  delete this._inst;
                  delete this._values;
                  delete this._goRefCounts;
                  delete this._ids;
                  delete this._idPool;
                  this.exit(code);
                },
                // func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
                "runtime.wasmWrite": (sp) => {
                  sp >>>= 0;
                  const fd = getInt64(sp + 8);
                  const p = getInt64(sp + 16);
                  const n = this.mem.getInt32(sp + 24, true);
                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
                },
                // func resetMemoryDataView()
                "runtime.resetMemoryDataView": (sp) => {
                  sp >>>= 0;
                  this.mem = new DataView(this._inst.exports.mem.buffer);
                },
                // func nanotime1() int64
                "runtime.nanotime1": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                },
                // func walltime() (sec int64, nsec int32)
                "runtime.walltime": (sp) => {
                  sp >>>= 0;
                  const msec = (/* @__PURE__ */ new Date()).getTime();
                  setInt64(sp + 8, msec / 1e3);
                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                },
                // func scheduleTimeoutEvent(delay int64) int32
                "runtime.scheduleTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this._nextCallbackTimeoutID;
                  this._nextCallbackTimeoutID++;
                  this._scheduledTimeouts.set(id, setTimeout(
                    () => {
                      this._resume();
                      while (this._scheduledTimeouts.has(id)) {
                        console.warn("scheduleTimeoutEvent: missed timeout event");
                        this._resume();
                      }
                    },
                    getInt64(sp + 8)
                  ));
                  this.mem.setInt32(sp + 16, id, true);
                },
                // func clearTimeoutEvent(id int32)
                "runtime.clearTimeoutEvent": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getInt32(sp + 8, true);
                  clearTimeout(this._scheduledTimeouts.get(id));
                  this._scheduledTimeouts.delete(id);
                },
                // func getRandomData(r []byte)
                "runtime.getRandomData": (sp) => {
                  sp >>>= 0;
                  crypto.getRandomValues(loadSlice(sp + 8));
                },
                // func finalizeRef(v ref)
                "syscall/js.finalizeRef": (sp) => {
                  sp >>>= 0;
                  const id = this.mem.getUint32(sp + 8, true);
                  this._goRefCounts[id]--;
                  if (this._goRefCounts[id] === 0) {
                    const v = this._values[id];
                    this._values[id] = null;
                    this._ids.delete(v);
                    this._idPool.push(id);
                  }
                },
                // func stringVal(value string) ref
                "syscall/js.stringVal": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, loadString(sp + 8));
                },
                // func valueGet(v ref, p string) ref
                "syscall/js.valueGet": (sp) => {
                  sp >>>= 0;
                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                  sp = this._inst.exports.getsp() >>> 0;
                  storeValue(sp + 32, result);
                },
                // func valueSet(v ref, p string, x ref)
                "syscall/js.valueSet": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                },
                // func valueDelete(v ref, p string)
                "syscall/js.valueDelete": (sp) => {
                  sp >>>= 0;
                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                },
                // func valueIndex(v ref, i int) ref
                "syscall/js.valueIndex": (sp) => {
                  sp >>>= 0;
                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                },
                // valueSetIndex(v ref, i int, x ref)
                "syscall/js.valueSetIndex": (sp) => {
                  sp >>>= 0;
                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                },
                // func valueCall(v ref, m string, args []ref) (ref, bool)
                "syscall/js.valueCall": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const m = Reflect.get(v, loadString(sp + 16));
                    const args = loadSliceOfValues(sp + 32);
                    const result = Reflect.apply(m, v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, result);
                    this.mem.setUint8(sp + 64, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 56, err);
                    this.mem.setUint8(sp + 64, 0);
                  }
                },
                // func valueInvoke(v ref, args []ref) (ref, bool)
                "syscall/js.valueInvoke": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.apply(v, void 0, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueNew(v ref, args []ref) (ref, bool)
                "syscall/js.valueNew": (sp) => {
                  sp >>>= 0;
                  try {
                    const v = loadValue(sp + 8);
                    const args = loadSliceOfValues(sp + 16);
                    const result = Reflect.construct(v, args);
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, result);
                    this.mem.setUint8(sp + 48, 1);
                  } catch (err) {
                    sp = this._inst.exports.getsp() >>> 0;
                    storeValue(sp + 40, err);
                    this.mem.setUint8(sp + 48, 0);
                  }
                },
                // func valueLength(v ref) int
                "syscall/js.valueLength": (sp) => {
                  sp >>>= 0;
                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                },
                // valuePrepareString(v ref) (ref, int)
                "syscall/js.valuePrepareString": (sp) => {
                  sp >>>= 0;
                  const str = encoder.encode(String(loadValue(sp + 8)));
                  storeValue(sp + 16, str);
                  setInt64(sp + 24, str.length);
                },
                // valueLoadString(v ref, b []byte)
                "syscall/js.valueLoadString": (sp) => {
                  sp >>>= 0;
                  const str = loadValue(sp + 8);
                  loadSlice(sp + 16).set(str);
                },
                // func valueInstanceOf(v ref, t ref) bool
                "syscall/js.valueInstanceOf": (sp) => {
                  sp >>>= 0;
                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                },
                // func copyBytesToGo(dst []byte, src ref) (int, bool)
                "syscall/js.copyBytesToGo": (sp) => {
                  sp >>>= 0;
                  const dst = loadSlice(sp + 8);
                  const src = loadValue(sp + 32);
                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                // func copyBytesToJS(dst ref, src []byte) (int, bool)
                "syscall/js.copyBytesToJS": (sp) => {
                  sp >>>= 0;
                  const dst = loadValue(sp + 8);
                  const src = loadSlice(sp + 16);
                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                    this.mem.setUint8(sp + 48, 0);
                    return;
                  }
                  const toCopy = src.subarray(0, dst.length);
                  dst.set(toCopy);
                  setInt64(sp + 40, toCopy.length);
                  this.mem.setUint8(sp + 48, 1);
                },
                "debug": (value) => {
                  console.log(value);
                }
              }
            };
          }
          run(instance) {
            return __async(this, null, function* () {
              if (!(instance instanceof WebAssembly.Instance)) {
                throw new Error("Go.run: WebAssembly.Instance expected");
              }
              this._inst = instance;
              this.mem = new DataView(this._inst.exports.mem.buffer);
              this._values = [
                // JS values that Go currently has references to, indexed by reference id
                NaN,
                0,
                null,
                true,
                false,
                globalThis,
                this
              ];
              this._goRefCounts = new Array(this._values.length).fill(Infinity);
              this._ids = /* @__PURE__ */ new Map([
                // mapping from JS values to reference ids
                [0, 1],
                [null, 2],
                [true, 3],
                [false, 4],
                [globalThis, 5],
                [this, 6]
              ]);
              this._idPool = [];
              this.exited = false;
              let offset = 4096;
              const strPtr = (str) => {
                const ptr = offset;
                const bytes = encoder.encode(str + "\\0");
                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                offset += bytes.length;
                if (offset % 8 !== 0) {
                  offset += 8 - offset % 8;
                }
                return ptr;
              };
              const argc = this.argv.length;
              const argvPtrs = [];
              this.argv.forEach((arg) => {
                argvPtrs.push(strPtr(arg));
              });
              argvPtrs.push(0);
              const keys = Object.keys(this.env).sort();
              keys.forEach((key) => {
                argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
              });
              argvPtrs.push(0);
              const argv = offset;
              argvPtrs.forEach((ptr) => {
                this.mem.setUint32(offset, ptr, true);
                this.mem.setUint32(offset + 4, 0, true);
                offset += 8;
              });
              const wasmMinDataAddr = 4096 + 8192;
              if (offset >= wasmMinDataAddr) {
                throw new Error("total length of command line and environment variables exceeds limit");
              }
              this._inst.exports.run(argc, argv);
              if (this.exited) {
                this._resolveExitPromise();
              }
              yield this._exitPromise;
            });
          }
          _resume() {
            if (this.exited) {
              throw new Error("Go program has already exited");
            }
            this._inst.exports.resume();
            if (this.exited) {
              this._resolveExitPromise();
            }
          }
          _makeFuncWrapper(id) {
            const go = this;
            return function() {
              const event = { id, this: this, args: arguments };
              go._pendingEvent = event;
              go._resume();
              return event.result;
            };
          }
        };
      })();
      onmessage = ({ data: wasm }) => {
        let decoder = new TextDecoder();
        let fs = globalThis.fs;
        let stderr = "";
        fs.writeSync = (fd, buffer) => {
          if (fd === 1) {
            postMessage(buffer);
          } else if (fd === 2) {
            stderr += decoder.decode(buffer);
            let parts = stderr.split("\\n");
            if (parts.length > 1) console.log(parts.slice(0, -1).join("\\n"));
            stderr = parts[parts.length - 1];
          } else {
            throw new Error("Bad write");
          }
          return buffer.length;
        };
        let stdin = [];
        let resumeStdin;
        let stdinPos = 0;
        onmessage = ({ data }) => {
          if (data.length > 0) {
            stdin.push(data);
            if (resumeStdin) resumeStdin();
          }
          return go;
        };
        fs.read = (fd, buffer, offset, length, position, callback) => {
          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
            throw new Error("Bad read");
          }
          if (stdin.length === 0) {
            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
            return;
          }
          let first = stdin[0];
          let count = Math.max(0, Math.min(length, first.length - stdinPos));
          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
          stdinPos += count;
          if (stdinPos === first.length) {
            stdin.shift();
            stdinPos = 0;
          }
          callback(null, count);
        };
        let go = new globalThis.Go();
        go.argv = ["", \`--service=\${"0.25.0"}\`];
        tryToInstantiateModule(wasm, go).then(
          (instance) => {
            postMessage(null);
            go.run(instance);
          },
          (error) => {
            postMessage(error);
          }
        );
        return go;
      };
      function tryToInstantiateModule(wasm, go) {
        return __async(this, null, function* () {
          if (wasm instanceof WebAssembly.Module) {
            return WebAssembly.instantiate(wasm, go.importObject);
          }
          const res = yield fetch(wasm);
          if (!res.ok) throw new Error(\`Failed to download \${JSON.stringify(wasm)}\`);
          if ("instantiateStreaming" in WebAssembly && /^application\\/wasm($|;)/i.test(res.headers.get("Content-Type") || "")) {
            const result2 = yield WebAssembly.instantiateStreaming(res, go.importObject);
            return result2.instance;
          }
          const bytes = yield res.arrayBuffer();
          const result = yield WebAssembly.instantiate(bytes, go.importObject);
          return result.instance;
        });
      }
      return (m) => onmessage(m);
    })(postMessage)`],{type:"text/javascript"});h=new Worker(URL.createObjectURL(I))}else{let I=(V=>{var q=(P,O,w)=>new Promise((p,a)=>{var f=T=>{try{$(w.next(T))}catch(d){a(d)}},y=T=>{try{$(w.throw(T))}catch(d){a(d)}},$=T=>T.done?p(T.value):Promise.resolve(T.value).then(f,y);$((w=w.apply(P,O)).next())});let J,A={};for(let P=self;P;P=Object.getPrototypeOf(P))for(let O of Object.getOwnPropertyNames(P))O in A||Object.defineProperty(A,O,{get:()=>self[O]});(()=>{const P=()=>{const p=new Error("not implemented");return p.code="ENOSYS",p};if(!A.fs){let p="";A.fs={constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},writeSync(a,f){p+=w.decode(f);const y=p.lastIndexOf(`
`);return y!=-1&&(console.log(p.substring(0,y)),p=p.substring(y+1)),f.length},write(a,f,y,$,T,d){if(y!==0||$!==f.length||T!==null){d(P());return}const _=this.writeSync(a,f);d(null,_)},chmod(a,f,y){y(P())},chown(a,f,y,$){$(P())},close(a,f){f(P())},fchmod(a,f,y){y(P())},fchown(a,f,y,$){$(P())},fstat(a,f){f(P())},fsync(a,f){f(null)},ftruncate(a,f,y){y(P())},lchown(a,f,y,$){$(P())},link(a,f,y){y(P())},lstat(a,f){f(P())},mkdir(a,f,y){y(P())},open(a,f,y,$){$(P())},read(a,f,y,$,T,d){d(P())},readdir(a,f){f(P())},readlink(a,f){f(P())},rename(a,f,y){y(P())},rmdir(a,f){f(P())},stat(a,f){f(P())},symlink(a,f,y){y(P())},truncate(a,f,y){y(P())},unlink(a,f){f(P())},utimes(a,f,y,$){$(P())}}}if(A.process||(A.process={getuid(){return-1},getgid(){return-1},geteuid(){return-1},getegid(){return-1},getgroups(){throw P()},pid:-1,ppid:-1,umask(){throw P()},cwd(){throw P()},chdir(){throw P()}}),!A.crypto)throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");if(!A.performance)throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");if(!A.TextEncoder)throw new Error("globalThis.TextEncoder is not available, polyfill required");if(!A.TextDecoder)throw new Error("globalThis.TextDecoder is not available, polyfill required");const O=new TextEncoder("utf-8"),w=new TextDecoder("utf-8");A.Go=class{constructor(){this.argv=["js"],this.env={},this.exit=r=>{r!==0&&console.warn("exit code:",r)},this._exitPromise=new Promise(r=>{this._resolveExitPromise=r}),this._pendingEvent=null,this._scheduledTimeouts=new Map,this._nextCallbackTimeoutID=1;const p=(r,u)=>{this.mem.setUint32(r+0,u,!0),this.mem.setUint32(r+4,Math.floor(u/4294967296),!0)},a=r=>{const u=this.mem.getUint32(r+0,!0),E=this.mem.getInt32(r+4,!0);return u+E*4294967296},f=r=>{const u=this.mem.getFloat64(r,!0);if(u===0)return;if(!isNaN(u))return u;const E=this.mem.getUint32(r,!0);return this._values[E]},y=(r,u)=>{if(typeof u=="number"&&u!==0){if(isNaN(u)){this.mem.setUint32(r+4,2146959360,!0),this.mem.setUint32(r,0,!0);return}this.mem.setFloat64(r,u,!0);return}if(u===void 0){this.mem.setFloat64(r,0,!0);return}let S=this._ids.get(u);S===void 0&&(S=this._idPool.pop(),S===void 0&&(S=this._values.length),this._values[S]=u,this._goRefCounts[S]=0,this._ids.set(u,S)),this._goRefCounts[S]++;let M=0;switch(typeof u){case"object":u!==null&&(M=1);break;case"string":M=2;break;case"symbol":M=3;break;case"function":M=4;break}this.mem.setUint32(r+4,2146959360|M,!0),this.mem.setUint32(r,S,!0)},$=r=>{const u=a(r+0),E=a(r+8);return new Uint8Array(this._inst.exports.mem.buffer,u,E)},T=r=>{const u=a(r+0),E=a(r+8),S=new Array(E);for(let M=0;M<E;M++)S[M]=f(u+M*8);return S},d=r=>{const u=a(r+0),E=a(r+8);return w.decode(new DataView(this._inst.exports.mem.buffer,u,E))},_=Date.now()-performance.now();this.importObject={_gotest:{add:(r,u)=>r+u},gojs:{"runtime.wasmExit":r=>{r>>>=0;const u=this.mem.getInt32(r+8,!0);this.exited=!0,delete this._inst,delete this._values,delete this._goRefCounts,delete this._ids,delete this._idPool,this.exit(u)},"runtime.wasmWrite":r=>{r>>>=0;const u=a(r+8),E=a(r+16),S=this.mem.getInt32(r+24,!0);A.fs.writeSync(u,new Uint8Array(this._inst.exports.mem.buffer,E,S))},"runtime.resetMemoryDataView":r=>{this.mem=new DataView(this._inst.exports.mem.buffer)},"runtime.nanotime1":r=>{r>>>=0,p(r+8,(_+performance.now())*1e6)},"runtime.walltime":r=>{r>>>=0;const u=new Date().getTime();p(r+8,u/1e3),this.mem.setInt32(r+16,u%1e3*1e6,!0)},"runtime.scheduleTimeoutEvent":r=>{r>>>=0;const u=this._nextCallbackTimeoutID;this._nextCallbackTimeoutID++,this._scheduledTimeouts.set(u,setTimeout(()=>{for(this._resume();this._scheduledTimeouts.has(u);)console.warn("scheduleTimeoutEvent: missed timeout event"),this._resume()},a(r+8))),this.mem.setInt32(r+16,u,!0)},"runtime.clearTimeoutEvent":r=>{r>>>=0;const u=this.mem.getInt32(r+8,!0);clearTimeout(this._scheduledTimeouts.get(u)),this._scheduledTimeouts.delete(u)},"runtime.getRandomData":r=>{r>>>=0,crypto.getRandomValues($(r+8))},"syscall/js.finalizeRef":r=>{r>>>=0;const u=this.mem.getUint32(r+8,!0);if(this._goRefCounts[u]--,this._goRefCounts[u]===0){const E=this._values[u];this._values[u]=null,this._ids.delete(E),this._idPool.push(u)}},"syscall/js.stringVal":r=>{r>>>=0,y(r+24,d(r+8))},"syscall/js.valueGet":r=>{r>>>=0;const u=Reflect.get(f(r+8),d(r+16));r=this._inst.exports.getsp()>>>0,y(r+32,u)},"syscall/js.valueSet":r=>{r>>>=0,Reflect.set(f(r+8),d(r+16),f(r+32))},"syscall/js.valueDelete":r=>{r>>>=0,Reflect.deleteProperty(f(r+8),d(r+16))},"syscall/js.valueIndex":r=>{r>>>=0,y(r+24,Reflect.get(f(r+8),a(r+16)))},"syscall/js.valueSetIndex":r=>{r>>>=0,Reflect.set(f(r+8),a(r+16),f(r+24))},"syscall/js.valueCall":r=>{r>>>=0;try{const u=f(r+8),E=Reflect.get(u,d(r+16)),S=T(r+32),M=Reflect.apply(E,u,S);r=this._inst.exports.getsp()>>>0,y(r+56,M),this.mem.setUint8(r+64,1)}catch(u){r=this._inst.exports.getsp()>>>0,y(r+56,u),this.mem.setUint8(r+64,0)}},"syscall/js.valueInvoke":r=>{r>>>=0;try{const u=f(r+8),E=T(r+16),S=Reflect.apply(u,void 0,E);r=this._inst.exports.getsp()>>>0,y(r+40,S),this.mem.setUint8(r+48,1)}catch(u){r=this._inst.exports.getsp()>>>0,y(r+40,u),this.mem.setUint8(r+48,0)}},"syscall/js.valueNew":r=>{r>>>=0;try{const u=f(r+8),E=T(r+16),S=Reflect.construct(u,E);r=this._inst.exports.getsp()>>>0,y(r+40,S),this.mem.setUint8(r+48,1)}catch(u){r=this._inst.exports.getsp()>>>0,y(r+40,u),this.mem.setUint8(r+48,0)}},"syscall/js.valueLength":r=>{r>>>=0,p(r+16,parseInt(f(r+8).length))},"syscall/js.valuePrepareString":r=>{r>>>=0;const u=O.encode(String(f(r+8)));y(r+16,u),p(r+24,u.length)},"syscall/js.valueLoadString":r=>{r>>>=0;const u=f(r+8);$(r+16).set(u)},"syscall/js.valueInstanceOf":r=>{r>>>=0,this.mem.setUint8(r+24,f(r+8)instanceof f(r+16)?1:0)},"syscall/js.copyBytesToGo":r=>{r>>>=0;const u=$(r+8),E=f(r+32);if(!(E instanceof Uint8Array||E instanceof Uint8ClampedArray)){this.mem.setUint8(r+48,0);return}const S=E.subarray(0,u.length);u.set(S),p(r+40,S.length),this.mem.setUint8(r+48,1)},"syscall/js.copyBytesToJS":r=>{r>>>=0;const u=f(r+8),E=$(r+16);if(!(u instanceof Uint8Array||u instanceof Uint8ClampedArray)){this.mem.setUint8(r+48,0);return}const S=E.subarray(0,u.length);u.set(S),p(r+40,S.length),this.mem.setUint8(r+48,1)},debug:r=>{console.log(r)}}}}run(p){return q(this,null,function*(){if(!(p instanceof WebAssembly.Instance))throw new Error("Go.run: WebAssembly.Instance expected");this._inst=p,this.mem=new DataView(this._inst.exports.mem.buffer),this._values=[NaN,0,null,!0,!1,A,this],this._goRefCounts=new Array(this._values.length).fill(1/0),this._ids=new Map([[0,1],[null,2],[!0,3],[!1,4],[A,5],[this,6]]),this._idPool=[],this.exited=!1;let a=4096;const f=r=>{const u=a,E=O.encode(r+"\0");return new Uint8Array(this.mem.buffer,a,E.length).set(E),a+=E.length,a%8!==0&&(a+=8-a%8),u},y=this.argv.length,$=[];this.argv.forEach(r=>{$.push(f(r))}),$.push(0),Object.keys(this.env).sort().forEach(r=>{$.push(f(`${r}=${this.env[r]}`))}),$.push(0);const d=a;if($.forEach(r=>{this.mem.setUint32(a,r,!0),this.mem.setUint32(a+4,0,!0),a+=8}),a>=12288)throw new Error("total length of command line and environment variables exceeds limit");this._inst.exports.run(y,d),this.exited&&this._resolveExitPromise(),yield this._exitPromise})}_resume(){if(this.exited)throw new Error("Go program has already exited");this._inst.exports.resume(),this.exited&&this._resolveExitPromise()}_makeFuncWrapper(p){const a=this;return function(){const f={id:p,this:this,args:arguments};return a._pendingEvent=f,a._resume(),f.result}}}})(),J=({data:P})=>{let O=new TextDecoder,w=A.fs,p="";w.writeSync=(T,d)=>{if(T===1)V(d);else if(T===2){p+=O.decode(d);let _=p.split(`
`);_.length>1&&console.log(_.slice(0,-1).join(`
`)),p=_[_.length-1]}else throw new Error("Bad write");return d.length};let a=[],f,y=0;J=({data:T})=>(T.length>0&&(a.push(T),f&&f()),$),w.read=(T,d,_,r,u,E)=>{if(T!==0||_!==0||r!==d.length||u!==null)throw new Error("Bad read");if(a.length===0){f=()=>w.read(T,d,_,r,u,E);return}let S=a[0],M=Math.max(0,Math.min(r,S.length-y));d.set(S.subarray(y,y+M),_),y+=M,y===S.length&&(a.shift(),y=0),E(null,M)};let $=new A.Go;return $.argv=["","--service=0.25.0"],re(P,$).then(T=>{V(null),$.run(T)},T=>{V(T)}),$};function re(P,O){return q(this,null,function*(){if(P instanceof WebAssembly.Module)return WebAssembly.instantiate(P,O.importObject);const w=yield fetch(P);if(!w.ok)throw new Error(`Failed to download ${JSON.stringify(P)}`);if("instantiateStreaming"in WebAssembly&&/^application\/wasm($|;)/i.test(w.headers.get("Content-Type")||""))return(yield WebAssembly.instantiateStreaming(w,O.importObject)).instance;const p=yield w.arrayBuffer();return(yield WebAssembly.instantiate(p,O.importObject)).instance})}return P=>J(P)})(V=>h.onmessage({data:V})),H;h={onmessage:null,postMessage:V=>setTimeout(()=>{try{H=I({data:V})}catch(q){b(q)}}),terminate(){if(H)for(let V of H._scheduledTimeouts.values())clearTimeout(V)}}}let g,j;const m=new Promise((I,H)=>{g=I,j=H});h.onmessage=({data:I})=>{h.onmessage=({data:H})=>K(H),I?j(I):g()},h.postMessage(i||new URL(n,location.href).toString());let{readFromStdout:K,service:W}=Dn({writeToStdin(I){h.postMessage(I)},isSync:!1,hasFS:!1,esbuild:Z});yield m,ot=()=>{h.terminate(),Ie=void 0,ot=void 0,st=void 0},st={build:I=>new Promise((H,V)=>{k.then(V),W.buildOrContext({callName:"build",refs:null,options:I,isTTY:!1,defaultWD:"/",callback:(q,J)=>q?V(q):H(J)})}),context:I=>new Promise((H,V)=>{k.then(V),W.buildOrContext({callName:"context",refs:null,options:I,isTTY:!1,defaultWD:"/",callback:(q,J)=>q?V(q):H(J)})}),transform:(I,H)=>new Promise((V,q)=>{k.then(q),W.transform({callName:"transform",refs:null,input:I,options:H||{},isTTY:!1,fs:{readFile(J,A){A(new Error("Internal error"),null)},writeFile(J,A){A(null)}},callback:(J,A)=>J?q(J):V(A)})}),formatMessages:(I,H)=>new Promise((V,q)=>{k.then(q),W.formatMessages({callName:"formatMessages",refs:null,messages:I,options:H,callback:(J,A)=>J?q(J):V(A)})}),analyzeMetafile:(I,H)=>new Promise((V,q)=>{k.then(q),W.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof I=="string"?I:JSON.stringify(I),options:H,callback:(J,A)=>J?q(J):V(A)})})}}),Xn=Z})(t)})(It);var Ut=It.exports;const ct=["left_control","left_shift","left_option","left_command","right_control","right_shift","right_option","right_command","fn"],Nt=[...ct,"caps_lock"],Rt=["return_or_enter","escape","delete_or_backspace","delete_forward","tab","spacebar","hyphen","equal_sign","open_bracket","close_bracket","backslash","non_us_pound","semicolon","quote","grave_accent_and_tilde","comma","period","slash","non_us_backslash"],Vt=["up_arrow","down_arrow","left_arrow","right_arrow","page_up","page_down","home","end"],Ft=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],Lt=["1","2","3","4","5","6","7","8","9","0"],Bt=["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14","f15","f16","f17","f18","f19","f20"],Kt=["keypad_num_lock","keypad_slash","keypad_asterisk","keypad_hyphen","keypad_plus","keypad_enter","keypad_1","keypad_2","keypad_3","keypad_4","keypad_5","keypad_6","keypad_7","keypad_8","keypad_9","keypad_0","keypad_period","keypad_equal_sign","keypad_comma"],Wt=["print_screen","scroll_lock","pause","insert","application","help","power"],zt=["international1","international3","lang1","lang2"],qt=["japanese_eisuu","japanese_kana"],Jt=["volume_down","volume_up","mute","volume_decrement","volume_increment"],Ye=["f21","f22","f23","f24","execute","menu","select","stop","again","undo","cut","copy","paste","find","international2","international4","international5","international6","international7","international8","international9","lang3","lang4","lang5","lang6","lang7","lang8","lang9","japanese_pc_nfer","japanese_pc_xfer","japanese_pc_katakana","keypad_equal_sign_as400","locking_caps_lock","locking_num_lock","locking_scroll_lock","alternate_erase","sys_req_or_attention","cancel","clear","prior","return","separator","out","oper","clear_or_again","cr_sel_or_props","ex_sel"],qe=["vk_none","vk_consumer_brightness_down","vk_consumer_brightness_up","vk_mission_control","vk_launchpad","vk_dashboard","vk_consumer_illumination_down","vk_consumer_illumination_up","vk_consumer_previous","vk_consumer_play","vk_consumer_next","display_brightness_decrement","display_brightness_increment","rewind","play_or_pause","fastforward","apple_display_brightness_decrement","apple_display_brightness_increment","dashboard","launchpad","mission_control","apple_top_case_display_brightness_decrement","apple_top_case_display_brightness_increment","illumination_decrement","illumination_increment"],nr=["rewind","play_or_pause","fast_forward","mute","volume_decrement","volume_increment","al_terminal_lock_or_screensaver","eject","scan_previous_track","scan_next_track","al_word_processor","al_text_editor","al_spreadsheet","al_presentation_app","al_email_reader","al_calculator","al_local_machine_browser","al_internet_browser","al_dictionary","fastforward"],rr=["menu","al_graphics_editor","al_database_app","al_newsreader","al_voicemail","al_contacts_or_address_book","al_Calendar_Or_Schedule","al_task_or_project_manager","al_log_or_journal_or_timecard","al_checkbook_or_finance","al_a_or_v_capture_or_playback","al_lan_or_wan_browser","al_remote_networking_or_isp_connect","al_network_conference","al_network_chat","al_telephony_or_dialer","al_logon","al_logoff","al_logon_or_logoff","al_control_panel","al_command_line_processor_or_run","al_process_or_task_manager","al_select_task_or_application","al_next_task_or_application","al_previous_task_or_application","al_preemptive_halt_task_or_application","al_integrated_help_center","al_documents","al_thesaurus","al_desktop","al_spell_check","al_grammer_check","al_wireless_status","al_keyboard_layout","al_virus_protection","al_encryption","al_screen_saver","al_alarms","al_clock","al_file_browser","al_power_status","al_image_browser","al_audio_browser","al_movie_browser","al_digital_rights_manager","al_digital_wallet","al_instant_messaging","al_oem_feature_browser","al_oem_help","al_online_community","al_entertainment_content_browser","al_online_shopping_browswer","al_smart_card_information_or_help","al_market_monitor_or_finance_browser","al_customized_corporate_news_browser","al_online_activity_browswer","al_research_or_search_browswer","al_audio_player","al_message_status","al_contact_sync","al_navigation","al_contextaware_desktop_assistant","ac_home","ac_back","ac_forward","ac_refresh","ac_bookmarks","menu_pick","menu_up","menu_down","menu_left","menu_right","menu_escape","menu_value_increase","menu_value_decrease","data_on_screen","closed_caption","closed_caption_select","vcr_or_tv","broadcast_mode","snapshot","still","picture_in_picture_toggle","picture_in_picture_swap","red_menu_button","green_menu_button","blue_menu_button","yellow_menu_button","aspect","three_dimensional_mode_select"],ir=["display_brightness_decrement","display_brightness_increment","dictation"],or=["button1","button2","button3","button4","button5","button6","button7","button8","button9","button10","button11","button12","button13","button14","button15","button16","button17","button18","button19","button20","button21","button22","button23","button24","button25","button26","button27","button28","button29","button30","button31","button32"],Be={"⌘":"command","⌥":"option","⌃":"control","⇧":"shift","⇪":"caps_lock"},bt={"↑":"up_arrow","↓":"down_arrow","←":"left_arrow","→":"right_arrow","⇞":"page_up","⇟":"page_down","↖︎":"home","↘︎":"end"},vt={"⏎":"return_or_enter","⎋":"escape","⌫":"delete_or_backspace","⌦":"delete_forward","⇥":"tab","␣":"spacebar","-":"hyphen","=":"equal_sign","[":"open_bracket","]":"close_bracket","\\":"backslash",";":"semicolon","'":"quote","`":"grave_accent_and_tilde",",":"comma",".":"period","/":"slash"},Mt={...bt,...vt,"⇪":Be["⇪"]},sr=[...ct,...Nt,...Rt,...Vt,...Ft,...Lt,...Bt,...Kt,...Wt,...zt,...qt,...Jt,...Ye,...qe];function Oe(t,e,o){if(typeof t=="number")return`${t}`;if(t.length>1&&Qe(t)){const v=ft(t);if((v==null?void 0:v.length)===1)return v[0];throw new Error(`Invalid key ${t}`)}if(t in Mt)return Mt[t];const c=t;if(!sr.includes(c))throw new Error(`${c} is not valid key_code`);if(e!=null&&e.includes(c))throw new Error(`Key ${t} cannot be used ${o||"here"}`);return c}const Gt={Meh:["option","control","shift"],Hyper:["command","option","control","shift"],SuperHyper:["command","option","control","shift","fn"]},mt={"⌘⇧":["command","shift"],"⌥⇧":["option","shift"],"⌃⇧":["control","shift"],"⌘⌥":["command","option"],"⌘⌃":["command","control"],"⌥⌃":["option","control"],"⌘⌥⌃":["command","option","control"],"⌘⌥⇧":["command","option","shift"],"⌘⌃⇧":["command","control","shift"],"⌥⌃⇧":["option","control","shift"],"⌘⌥⌃⇧":["command","option","control","shift"],...Gt};function Pe(t){if(!t)return;if(typeof t=="string")return Qe(t)?ft(t):t in Be?[Be[t]]:t in mt?mt[t]:[t];if(Array.isArray(t))return lr(t)?ur(t):t.map(cr);let e;"left"in t?e=Fe("left",t.left):"l"in t&&(e=Fe("left",t.l));let o;if("right"in t?o=Fe("right",t.right):"r"in t&&(o=Fe("right",t.r)),!(!(e!=null&&e.length)&&!(o!=null&&o.length)))return[...e||[],...o||[]]}const Ht=/^(left|l|<|‹)([⌘⌥⌃⇧]*)$/,Yt=/^(right|r|>|›)([⌘⌥⌃⇧]*)$/;function Ve(t,e){if(!(!t&&!e))return{mandatory:At(t),optional:At(e)}}function At(t){if(t)return t==="any"?["any"]:Pe(t)}const ar=new Set(["command","option","control","shift"]);function Qe(t){return Ht.test(t)||Yt.test(t)}function ft(t){const e=t.match(Ht);if(e)return Fe("left",e[2]);const o=t.match(Yt);if(o)return Fe("right",o[2])}function lr(t){return t.some(Qe)}function ur(t){return t.reduce((e,o)=>[...e,...Qe(o)?ft(o)||[]:Pe(o)||[]],[])}function Fe(t,e){var o;if(e)return(o=Pe(e))==null?void 0:o.map(c=>ar.has(c)?`${t}_${c}`:c)}function cr(t){return t in Be?Be[t]:t}function $e(t){return Array.isArray(t)?t:[t]}function ke(t,e=1,o){return new xe({type:"variable_if",name:t,value:e,description:o})}function fr(t,e){var o,c;let v;if(Array.isArray(t))v=t.map(at);else if(typeof t=="string"||t instanceof RegExp)v=[at(t)];else return new xe({type:"frontmost_application_if",description:e,file_paths:(o=t.file_paths)==null?void 0:o.map(at),bundle_identifiers:(c=t.bundle_identifiers)==null?void 0:c.map(at)});return new xe({type:"frontmost_application_if",description:e,bundle_identifiers:v})}function dr(t,e){return new xe({type:"device_if",identifiers:$e(t),description:e})}function hr(t,e){return new xe({type:"device_exists_if",identifiers:$e(t),description:e})}function mr(t,e){return new xe({type:"keyboard_type_if",keyboard_types:$e(t),description:e})}function pr(t,e){return new xe({type:"input_source_if",input_sources:$e(t),description:e})}function yr(t=!0,e){return new xe({type:"event_changed_if",value:t,description:e})}const gr=_r({frontmost_application_if:"frontmost_application_unless",device_if:"device_unless",device_exists_if:"device_exists_unless",keyboard_type_if:"keyboard_type_unless",input_source_if:"input_source_unless",variable_if:"variable_unless",event_changed_if:"event_changed_unless"});class xe{constructor(e){this.condition=e}unless(){return new xe({...this.condition,type:gr[this.condition.type]})}build(){return{...this.condition}}}function Qt(t){return typeof t.build=="function"}function Me(t){return Qt(t)?t.build():t}function at(t){return typeof t=="string"?t:t.toString().slice(1,-1)}function _r(t){return Object.keys(t).reduce((e,o)=>({...e,[e[o]]:o}),t)}const br=["optionalAny","?any","??"];function vr(t){return!t||typeof t!="string"?!1:br.includes(t)}function wr(t){return/^\?(left|l|<|‹|right|r|>|›)?([⌘⌥⌃⇧⇪]*)$/.test(t)}function ve(t,e){if(!t)return Ve(t,e);if(vr(t))return Ve("","any");if(typeof t=="string"){if(wr(t))return Ve("",Pe(t.slice(1)));if(t.startsWith("?"))throw new Error(`${t} is not valid optional alias`)}return typeof t=="object"&&"optional"in t?Ve("",t.optional):Ve(t,e)}function Xe(t,e,o){if(typeof t=="object")return new We(t);const c=Oe(t,qe,"for from.key_code");return new We({key_code:c,modifiers:ve(e,o)})}function kr(t,e,o){return new We({consumer_key_code:t,modifiers:ve(e,o)})}function xr(t,e,o){return new We({pointing_button:t,modifiers:ve(e,o)})}function me(t,e,o){const c=Oe(t,Ye,"as to.key_code");return{...o,key_code:c,modifiers:e?Pe(e):void 0}}function Xt(t){return me("left_command","⌥⌃⇧",t)}function Zt(t){return me("left_option","⌃⇧",t)}function en(t){return me("fn","⌘⌥⌃⇧",t)}function tn(t){return me("vk_none",void 0,t)}function nn(t,e,o){return{...o,consumer_key_code:t,modifiers:e?Pe(e):void 0}}function rn(t,e,o){return{...o,pointing_button:t,modifiers:e?Pe(e):void 0}}function Ze(t){return{shell_command:t}}function on(t){const e=t.match(/^"?(.*?)(.app)?"?$/);return Ze(`open -a "${(e==null?void 0:e[1])||t}".app`)}function sn(t){return Ze(`osascript -e '
set prev to the clipboard
set the clipboard to "${t}"
tell application "System Events"
  keystroke "v" using command down
  delay 0.1
end tell
set the clipboard to prev'`)}const an=["Tink","Submarine","Sosumi","Morse","Ping","Pop","Purr","Glass","Hero","Frog","Funk","Blow","Bottle","Basso"];function Er(t){const e=an.includes(t)?`/System/Library/Sounds/${t}.aiff`:t;return Ze(`afplay ${e}`)}function ln(t){return{select_input_source:t}}function fe(t,e=1,o,c){return{set_variable:{name:t,value:e,key_up_value:o,type:c}}}function un(t){return{set_variable:{name:t,type:"unset"}}}function wt(t,e){return{set_notification_message:{id:t,text:e}}}function et(t){return{set_notification_message:{id:t,text:""}}}function cn(t){return{mouse_key:t}}function fn(t,e="toggle"){return{sticky_modifier:{[t]:e}}}function dn(t){return{software_function:{cg_event_double_click:{button:t}}}}function hn(t){return{software_function:{set_mouse_cursor_position:t}}}function mn(t){return{software_function:{iokit_power_management_sleep_system:{delay_milliseconds:t}}}}const Ke={};for(let t=0;t<=9;t++)Ke[t]=me(t);const Sr="abcdefghijklmnopqrstuvwxyz".split("");for(const t of Sr)Ke[t]=me(t),Ke[t.toUpperCase()]=me(t,"⇧");const $r=[...Object.keys(bt),...Object.keys(vt)];for(const t of $r)Ke[t]=me(t);const Tr={1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","'":'"',"=":"+",";":":",",":"<",".":">","/":"?","-":"_","[":"{","\\":"|","]":"}","`":"~"};for(const[t,e]of Object.entries(Tr))Ke[e]=me(t,"⇧");function pn(t,e){return t.split("").map(o=>{const c=(e==null?void 0:e[o])||Ke[o];if(!c)throw new Error(`${o} is unknown. Please provide a map with { ${o}: {ToEvent} }`);return c})}class We{constructor(e){this.manipulator={type:"basic",from:e}}get from(){return this.manipulator.from}to(e,o,c){return this.addToEvent(typeof e=="object"?e:me(e,o,c)),this}toHyper(e){return this.addToEvent(Xt(e)),this}toMeh(e){return this.addToEvent(Zt(e)),this}toSuperHyper(e){return this.addToEvent(en(e)),this}toNone(e){return this.addToEvent(tn(e)),this}toConsumerKey(e,o,c){return this.addToEvent(nn(e,o,c)),this}toPointingButton(e,o,c){return this.addToEvent(rn(e,o,c)),this}to$(e){return this.addToEvent(Ze(e)),this}toApp(e){return this.addToEvent(on(e)),this}toPaste(e){return this.addToEvent(sn(e)),this}toInputSource(e){return this.addToEvent(ln(e)),this}toVar(e,o=1,c,v){return this.addToEvent(fe(e,o,c,v)),this}toUnsetVar(e){return this.addToEvent(un(e)),this}toNotificationMessage(e,o){return this.addToEvent(wt(e,o)),this}toRemoveNotificationMessage(e){return this.addToEvent(et(e)),this}toMouseKey(e){return this.addToEvent(cn(e)),this}toStickyModifier(e,o="toggle"){return this.addToEvent(fn(e,o)),this}toCgEventDoubleClick(e){return this.addToEvent(dn(e)),this}toMouseCursorPosition(e){return this.addToEvent(hn(e)),this}toSleepSystem(e){return this.addToEvent(mn(e)),this}toTypeSequence(e,o){return this.addToEvent(pn(e,o)),this}toIfAlone(e,o,c){return this.pushOrCreateList(this.manipulator,"to_if_alone",typeof e=="object"?e:me(e,o,c)),this}toIfHeldDown(e,o,c){return this.pushOrCreateList(this.manipulator,"to_if_held_down",typeof e=="object"?e:me(e,o,c)),this}toAfterKeyUp(e,o,c){return this.pushOrCreateList(this.manipulator,"to_after_key_up",typeof e=="object"?e:me(e,o,c)),this}toDelayedAction(e,o){const c=this.manipulator.to_delayed_action||{to_if_invoked:[],to_if_canceled:[]};return $e(e).forEach(v=>c.to_if_invoked.push(v)),$e(o).forEach(v=>c.to_if_canceled.push(v)),this.manipulator.to_delayed_action=c,this}description(e){return this.manipulator.description=e,this}condition(...e){const{conditions:o=[]}=this.manipulator;return this.manipulator.conditions=[...o,...e.map(Me)],this}parameters(e){return this.manipulator.parameters={...this.manipulator.parameters,...e},this}build(e){return[{...this.manipulator}]}addToEvent(e){this.pushOrCreateList(this.manipulator,"to",e)}pushOrCreateList(e,o,c){const v=e[o]||[];$e(c).forEach(x=>v.push(x)),Object.assign(e,{[o]:v})}}function Cr(t){return typeof t.build=="function"}function ze(t,e){return Cr(t)?t.build(e):"type"in t?[t]:Object.entries(t).reduce((o,[c,v])=>[...o,...Xe(c).to(v).build(e)],[])}function jr(...t){return e=>{const o=t.map(Me);function c(x){return x.type!=="basic"?x:{...x,conditions:[...x.conditions||[],...o]}}const v=(Array.isArray(e)?e:ze(e)).reduce((x,U)=>[...x,...ze(U).map(c)],[]);return Object.assign(v,{build:()=>v})}}function Or(t){return e=>({build:()=>(Array.isArray(t)?t.map((o,c)=>[o,c]):Object.entries(t)).reduce((o,[c,v])=>[...o,...ze(e(c,v))],[])})}function Pr(t,e){return o=>({build:c=>{const v=ve(t,e);return(Array.isArray(o)?o:ze(o)).map(x=>ze(x,c)).reduce((x,U)=>x.concat(U),[]).map(x=>{var U;const X=Object.keys(v).reduce((F,L)=>{var Z;if(!((Z=v[L])!=null&&Z.length))return F;const de=new Set([...F[L]||[],...v[L]]);return F[L]=de.has("any")?["any"]:Array.from(de),F},{...(U=x.from)==null?void 0:U.modifiers});return x.from={...x.from,modifiers:X},x})}})}function yn(t,e,o){const c=x=>Oe(x,qe,"for from.simultaneous"),v=new Mr({simultaneous:t.map(x=>typeof x=="object"?x:{key_code:c(x)}),simultaneous_options:e});return o&&v.parameters({"basic.simultaneous_threshold_milliseconds":o}),v}class Mr extends We{constructor(e){super(e)}modifiers(e,o){return this.manipulator.from.modifiers=e||o?ve(e,o):void 0,this}}const gn="__support__manipulator";function Ar(t){return t.description=(t.description||"")+gn,t}function kt(t){var e;return(e=t.description)==null?void 0:e.endsWith(gn)}const pt={"double_tap.delay_milliseconds":200};function Dr(t,e,o,c){const v=Oe(t,[...Ye,...qe],"for double tap"),x=new Ir({key_code:v});return c?(x.delay(c),x.from.modifiers=ve(e,o)):o?typeof o=="number"?(x.delay(o),x.from.modifiers=ve(e)):x.from.modifiers=ve(e,o):e&&(typeof e=="number"?x.delay(e):x.from.modifiers=ve(e)),x}class Ir extends We{constructor(e){super(e),this.singleTapEvent=void 0}singleTap(e){return this.singleTapEvent=e,this}delay(e){return this.delayParam=e,this}build(e){var o;const c=(e==null?void 0:e.getParameters(pt))??pt,v=this.delayParam||c["double_tap.delay_milliseconds"],x=this.from.key_code;if(this.singleTapEvent===void 0){this.singleTapEvent={key_code:x};const se=(o=this.manipulator.from.modifiers)==null?void 0:o.mandatory;se&&(this.singleTapEvent.modifiers=se.filter(he=>he!=="any"))}const U=["double-tap",x];this.from.modifiers&&[this.from.modifiers.mandatory,this.from.modifiers.optional].map(se=>se!=null&&se.length?se.join(","):"").forEach(se=>se&&U.push(se));const X=U.join("-"),F=ke(X).build(),L=ke(X).unless().build(),Z=Ar({...this.manipulator,conditions:[F]}),de={...this.manipulator,to:[fe(X,1)],conditions:[...this.manipulator.conditions||[],L],to_delayed_action:{to_if_invoked:[...this.singleTapEvent?[this.singleTapEvent]:[],fe(X,0)],to_if_canceled:[fe(X,0)]}};return de.parameters={"basic.to_delayed_action_delay_milliseconds":v},[Z,de]}}function Ur(){return new Nr}class Nr{constructor(){this.manipulator={type:"mouse_motion_to_scroll"}}modifiers(e,o){return this.manipulator.from={modifiers:ve(e,o)},this}condition(...e){const{conditions:o=[]}=this.manipulator;return this.manipulator.conditions=[...o,...e.map(Me)],this}options(e){return this.manipulator.options={...this.manipulator.options,...e},this}build(e){return[{...this.manipulator}]}}function Rr(t,...e){return new dt(t,...e)}class dt{constructor(e,...o){this.ruleDescription=e,this.manipulatorSources=[],this.allowEmptyManipulators=!1,this.conditions=o}manipulators(e){return Array.isArray(e)?e.forEach(o=>this.manipulatorSources.push(o)):this.manipulatorSources.push(e),this}condition(...e){return e.forEach(o=>this.conditions.push(o)),this}description(e){return this.ruleDescription=e,this}build(e){const o={description:this.ruleDescription,manipulators:this.manipulatorSources.reduce((v,x)=>[...v,...ze(x,e)],[])};if(!this.allowEmptyManipulators&&o.manipulators.length===0)throw new Error(`"manipulators" is empty in "${o.description}"`);if(this.conditions.length===0)return o;const c=this.conditions.map(Me);return o.manipulators=o.manipulators.map(v=>v.type==="basic"&&!kt(v)?{...v,conditions:[...v.conditions||[],...c]}:{...v}),o}}function Vr(t){return typeof t.build=="function"}function Fr(t,e){return Vr(t)?t.build(e):t}const ut={escape:["escape","caps_lock"]};function _n(t,e,o){const c=[];if(!t)return c;for(const v of Array.isArray(t)?t:[t]){const x=Xe(v);c.push(...x.condition(e).to(o).build())}return c}const yt=[...qe,...Ye,...ct];function bn(t,e,o=1,c=0){return new Br(t,e,o,c)}function vn(t,e,o,c=1,v=0){return bn(e,o,c,v).modifiers(t)}function Lr(t,e,o=1,c=0){return vn("Hyper",t,e,o,c)}const lt="__layer";class Br extends dt{constructor(e,o,c=1,v=0){const x=$e(e).map(U=>Oe(U,yt,"as layer key"));o||(o=`layer-${x.join("-")}`),super(`Layer - ${o}`),this.onValue=c,this.offValue=v,this.replaceLayerKeyToIfAlone=!1,this.keys=x,this.varName=o,this.layerCondition=ke(this.varName,this.onValue),this.condition(this.layerCondition),this.allowEmptyManipulators=!0}modifiers(e,o){return this.layerModifiers=e||o?ve(e,o):void 0,this}configKey(e,o=!1){return this.layerKeyManipulator||(this.layerKeyManipulator=Xe("fn")),e(this.layerKeyManipulator),this.replaceLayerKeyToIfAlone=o,this}notification(e=!0){return this.layerNotification=e,this}leaderMode(e=!0){return e===!0?this.leaderModeOptions=ut:e?this.leaderModeOptions={...ut,...e}:this.leaderModeOptions=void 0,this}build(e){var o,c,v,x;const U=super.build(e);if(this.leaderModeOptions){const F=[fe(this.varName,this.offValue),fe(lt,0)];this.layerNotification&&F.push(et(kn(this.varName))),this.leaderModeOptions.sticky||U.manipulators.forEach(L=>L.type==="basic"&&!kt(L)&&(L.to=(L.to||[]).concat(F))),U.manipulators.push(..._n(this.leaderModeOptions.escape,ke(this.varName,this.onValue),F))}if((c=(o=this.layerModifiers)==null?void 0:o.mandatory)!=null&&c.length||(x=(v=this.layerModifiers)==null?void 0:v.optional)!=null&&x.length){const F=Dt(this.layerModifiers)==="optional";U.manipulators.forEach(L=>this.addModifierAnyToManipulator(L,F))}const X=this.conditions.filter(F=>F!==this.layerCondition).map(Me);for(const F of this.keys)U.manipulators=[...wn(F,this.varName,this.onValue,this.offValue,this.layerModifiers,X,e,this.layerKeyManipulator,this.replaceLayerKeyToIfAlone,this.layerNotification===!0?this.ruleDescription:this.layerNotification||void 0,this.leaderModeOptions),...U.manipulators];return U}addModifierAnyToManipulator(e,o){if(e.type==="basic"){if(e.from.modifiers){const{mandatory:c,optional:v}=e.from.modifiers;if(v!=null&&v.length||c!=null&&c.length){const x=Dt(e.from.modifiers);if(x==="mandatory")e.from.modifiers={mandatory:["any"]};else if(x==="optional")e.from.modifiers={optional:["any"]};else throw new Error("Layers with modifiers cannot have modifiers on manipulators");return}}e.from.modifiers=o?{optional:["any"]}:{mandatory:["any"]}}}}function wn(t,e,o,c,v,x,U,X,F,L,Z){var de;function se(Y){var je;if(!X)return Y;const ee=X.build()[0],Ee=$e(Y)[0];if(["to","to_if_alone","to_if_held_down","to_after_key_up"].forEach(ye=>{var Ae;return(Ae=ee[ye])==null?void 0:Ae.forEach(Te=>Ee[ye]=[...Ee[ye]||[],Te])}),ee.to_delayed_action){Ee.to_delayed_action=Ee.to_delayed_action||{to_if_invoked:[],to_if_canceled:[]};for(const ye of["to_if_invoked","to_if_canceled"])ee.to_delayed_action[ye].forEach(Ae=>{var Te;return(Te=Ee.to_delayed_action)==null?void 0:Te[ye].push(Ae)})}return F&&(Ee.to_if_alone=(je=Ee.to_if_alone)==null?void 0:je.filter(ye=>!("key_code"in ye&&ye.key_code===t))),Y}const he=Xe({key_code:t,modifiers:v}).toVar(e,o).toVar(lt).condition(ke(e,o).unless(),ke(lt).unless());if(!((de=v==null?void 0:v.mandatory)!=null&&de.length)&&!Z&&he.toIfAlone({key_code:t}),Z||he.toAfterKeyUp(fe(e,c)).toAfterKeyUp(fe(lt,0)),x!=null&&x.length&&he.condition(...x),L){const Y=kn(e);he.toNotificationMessage(Y,L),Z||he.toAfterKeyUp(et(Y))}if(!U)return se(he.build());const le=[`layer_${t}`,...v?[JSON.stringify(v)]:[],...(x||[]).map(Y=>JSON.stringify(Y)).sort()].join("_"),ce=U.getCache(le);if(ce!=null&&ce.to&&ce.to_after_key_up)return ce.to.find(Y=>"set_variable"in Y&&Y.set_variable.name===e)||(ce.to.push(fe(e,o)),ce.to_after_key_up.push(fe(e,c))),se(ce),[];const we=he.build(U);return U.setCache(le,we[0]),se(we)}function Dt({mandatory:t,optional:e}){return(t==null?void 0:t.length)===1&&t[0]==="any"?"mandatory":(e==null?void 0:e.length)===1&&e[0]==="any"?"optional":null}function kn(t){return`layer-${t}`}const gt={"simlayer.threshold_milliseconds":200};function Kr(t,e,o,c=1,v=0){return new Wr(t,e,o,c,v)}class Wr extends dt{constructor(e,o,c,v=1,x=0){const U=$e(e).map(X=>Oe(X,yt,"as simlayer key"));o||(o=`simlayer-${U.join("-")}`),super(`Simlayer - ${o}`),this.threshold=c,this.onValue=v,this.offValue=x,this.sharedLayerKeys=[],this.simultaneousOptions={detect_key_down_uninterruptedly:!0,key_down_order:"strict",key_up_order:"strict_inverse",key_up_when:"any"},this.layerModifiers={optional:["any"]},this.ifActivated=[],this.ifDeactivated=[],this.keys=U,this.varName=o,this.layerCondition=ke(this.varName,this.onValue),this.condition(this.layerCondition)}modifiers(e,o){return this.layerModifiers=e||o?ve(e,o):void 0,this}options(e){return Object.assign(this.simultaneousOptions,e),this}enableLayer(...e){return e.map(o=>Oe(o,yt,"as layer key")).forEach(o=>{if(this.keys.includes(o))throw new Error(`Key ${o} is already used in ${this.ruleDescription}`);if(this.sharedLayerKeys.includes(o))throw new Error(`Key ${o} is already used as shared layer key in  ${this.ruleDescription}`);this.sharedLayerKeys.push(o)}),this}toIfActivated(e){return this.ifActivated.push(e),this}toIfDeactivated(e){return this.ifDeactivated.push(e),this}build(e){const o=super.build(e),c=(e==null?void 0:e.getParameters(gt))??gt,v=this.threshold||c["simlayer.threshold_milliseconds"],x=this.conditions.length>1?this.conditions.filter(F=>F!==this.layerCondition).map(Me):void 0,U=fe(this.varName,this.onValue),X=fe(this.varName,this.offValue);o.manipulators.concat().forEach(F=>{var L;if(F.type!=="basic")throw new Error(`Unsupported manipulator type ${F.type} in simlayer ${this.ruleDescription}`);const Z=(L=F.from)==null?void 0:L.key_code;if(!Z)throw new Error(`Missing from.key_code in simlayer ${this.ruleDescription}`);this.layerModifiers&&(F.from.modifiers={...F.from.modifiers,...this.layerModifiers});for(const de of this.keys)o.manipulators.push({type:"basic",parameters:{"basic.simultaneous_threshold_milliseconds":v},to:[U,...F.to||[],...this.ifActivated],from:{simultaneous:[{key_code:de},{key_code:Z}],simultaneous_options:{...this.simultaneousOptions,to_after_key_up:[...this.simultaneousOptions.to_after_key_up||[],X,...this.ifDeactivated]},modifiers:this.layerModifiers},conditions:x})});for(const F of this.sharedLayerKeys)o.manipulators=[...wn(F,this.varName,this.onValue,this.offValue,this.layerModifiers,x,e),...o.manipulators];return o}}const _t={"duo_layer.threshold_milliseconds":200,"duo_layer.notification":!1};function zr(t,e,o,c=1,v=0){return new qr(t,e,o,c,v)}class qr extends dt{constructor(e,o,c,v=1,x=0){const U=`DuoLayer ${c||`${e} ${o}`}`;c||(c=`duo-layer-${e}-${o}`),super(U),this.key1=e,this.key2=o,this.onValue=v,this.offValue=x,this.simultaneousOptions={},this.ifActivated=[],this.ifDeactivated=[],this.varName=c,this.layerCondition=ke(this.varName,this.onValue),this.condition(this.layerCondition),this.allowEmptyManipulators=!0}threshold(e){return this.simultaneousThreshold=e,this}options(e){return Object.assign(this.simultaneousOptions,e),this}notification(e=!0){return this.layerNotification=e,this}toIfActivated(e){return this.ifActivated.push(e),this}toIfDeactivated(e){return this.ifDeactivated.push(e),this}leaderMode(e=!0){return e===!0?this.leaderModeOptions=ut:e?this.leaderModeOptions={...ut,...e}:this.leaderModeOptions=void 0,this}build(e){var o,c,v,x;const U=super.build(e),X=(e==null?void 0:e.getParameters(_t))??_t,F=this.simultaneousThreshold||X["duo_layer.threshold_milliseconds"],L=this.layerNotification??X["duo_layer.notification"],Z=this.conditions.filter(Y=>Y!==this.layerCondition).map(Me),de=[fe(this.varName,this.onValue),...this.ifActivated],se=[fe(this.varName,this.offValue),...this.ifDeactivated];if(L){const Y=`duo-layer-${this.varName}`,je=L===!0?this.ruleDescription:L;de.push(wt(Y,je)),se.push(et(Y))}this.leaderModeOptions&&(this.leaderModeOptions.sticky||U.manipulators.forEach(Y=>Y.type==="basic"&&!kt(Y)&&(Y.to=(Y.to||[]).concat(se))),U.manipulators.push(..._n(this.leaderModeOptions.escape,ke(this.varName,this.onValue),se)));const he=this.simultaneousOptions.to_after_key_up||[];this.leaderModeOptions||he.push(...se);const le=yn([this.key1,this.key2],{...this.simultaneousOptions,to_after_key_up:he},F).modifiers("??").to(de).condition(ke(this.varName,this.onValue).unless());if(Z.length&&le.condition(...Z),!e)return U.manipulators=[...le.build(),...U.manipulators],U;const ce=[`duo_layer_${this.key1}_${this.key2}`,...Z.map(Y=>JSON.stringify(Y)).sort()].join("_"),we=e.getCache(ce);if(we)(o=we.to)!=null&&o.find(Y=>"set_variable"in Y&&Y.set_variable.name===this.varName)||((c=we.to)==null||c.push(fe(this.varName,this.onValue)),(x=(v=we.from.simultaneous_options)==null?void 0:v.to_after_key_up)==null||x.push(fe(this.varName,this.offValue)));else{const Y=le.build(e)[0];e.setCache(ce,Y),U.manipulators=[Y,...U.manipulators]}return U}}class Jr{constructor(){this.parameters={},this.cache=new Map}setParameters(e){Object.assign(this.parameters,e)}getParameters(e){const o={...e};for(const c of Object.keys(e))c in this.parameters&&this.parameters[c]!==void 0&&Object.assign(o,{[c]:this.parameters[c]});return o}getCache(e){return this.cache.get(e)}setCache(e,o){this.cache.set(e,o)}}const xn={"basic.to_if_alone_timeout_milliseconds":1e3,"basic.to_if_held_down_threshold_milliseconds":500,"basic.to_delayed_action_delay_milliseconds":500,"basic.simultaneous_threshold_milliseconds":50,"mouse_motion_to_scroll.speed":100};function En(t,e={}){const{"double_tap.delay_milliseconds":o,"simlayer.threshold_milliseconds":c,"duo_layer.threshold_milliseconds":v,"duo_layer.notification":x,...U}=e,X=new Jr;X.setParameters({"double_tap.delay_milliseconds":o}),X.setParameters({"simlayer.threshold_milliseconds":c}),X.setParameters({"duo_layer.threshold_milliseconds":v,"duo_layer.notification":x});const F=t.map(Z=>Fr(Z,X)),L={rules:F.filter(Z=>Z.manipulators.length),parameters:{...xn,...U}};if(L.rules.length===0)throw new Error('complex_modifications "rules" is empty ');return L.rules.length<F.length&&console.warn(`Rules with empty manipulators are ignored: 
${F.filter(Z=>Z.manipulators.length===0).map(Z=>"- "+Z.description).join(`
`)}
`),L}const Le={karabinerConfigDir(){return require("node:path").join(require("node:os").homedir(),".config/karabiner")},karabinerConfigFile(){return require("node:path").join(this.karabinerConfigDir(),"karabiner.json")},readKarabinerConfig(t){return require(t??this.karabinerConfigFile())},writeKarabinerConfig(t,e){return require("node:fs/promises").writeFile(e??this.karabinerConfigFile(),t)},readJson(t){return require(t)},exit(t=0){process.exit(t)}};function Gr(t,e,o={}){typeof t=="string"&&(t={name:t,dryRun:t==="--dry-run"});const{name:c,dryRun:v}=t,x=t.karabinerJsonPath??Le.karabinerConfigFile(),U=v?{profiles:[{name:c,complex_modifications:{rules:[]}}]}:Le.readKarabinerConfig(x),X=U==null?void 0:U.profiles.find(L=>L.name===c);X||ht(`⚠️ Profile ${c} not found in ${x}.

ℹ️ Please check the profile name in the Karabiner-Elements UI and 
    - Update the profile name at writeToProfile()
    - Create a new profile if needed
 `);try{X.complex_modifications=En(e,o)}catch(L){ht(L)}const F=JSON.stringify(U,null,2);if(v){console.info(F);return}Le.writeKarabinerConfig(F,x).catch(ht),console.log(`✓ Profile ${c} updated.`)}function ht(t){return t&&console.error(typeof t=="string"?t:t.message||t),Le.exit(1)}function Hr(t){return{build(){const e=Le.readJson(t);if(!Array.isArray(e==null?void 0:e.rules))throw new Error(`Cannot file rules in ${t}`);return{description:`Imported from ${t}`,manipulators:e.rules.reduce((o,c)=>o.concat(c.manipulators),[])}}}}function Yr(t,e){return{build(){const o=Le.readKarabinerConfig(e).profiles.find(c=>c.name===t);if(!o)throw new Error(`Profile ${t} not found`);return{description:`Imported from profile ${t}`,manipulators:o.complex_modifications.rules.reduce((c,v)=>c.concat(v.manipulators),[])}}}}const Qr=Object.freeze(Object.defineProperty({__proto__:null,ConditionBuilder:xe,arrowKeyAliases:bt,arrowKeyCodes:Vt,buildCondition:Me,complexModifications:En,controlOrSymbolKeyAliases:vt,controlOrSymbolKeyCodes:Rt,defaultComplexModificationsParameters:xn,defaultDoubleTapParameters:pt,defaultDuoLayerParameters:_t,defaultSimlayerParameters:gt,duoLayer:zr,fromAndToConsumerKeyCodes:nr,fromOnlyConsumerKeyCodes:rr,fromOnlyKeyCodes:Ye,functionKeyCodes:Bt,getKeyWithAlias:Oe,hyperLayer:Lr,ifApp:fr,ifDevice:dr,ifDeviceExists:hr,ifEventChanged:yr,ifInputSource:pr,ifKeyboardType:mr,ifVar:ke,importJson:Hr,importProfile:Yr,internationalKeyCodes:zt,isConditionBuilder:Qt,isSideMultiModifierAlias:Qe,japaneseKeyCodes:qt,keypadKeyCodes:Kt,layer:bn,letterKeyCodes:Ft,map:Xe,mapConsumerKey:kr,mapDoubleTap:Dr,mapPointingButton:xr,mapSimultaneous:yn,modifierKeyAliases:Be,modifierKeyCodes:Nt,modifierLayer:vn,mouseMotionToScroll:Ur,multiModifierAliases:mt,namedMultiModifierAliases:Gt,numberKeyCodes:Lt,otherKeyCodes:Jt,parseFromModifierParams:Ve,parseModifierParam:Pe,parseSideMultiModifierAlias:ft,pcKeyboardKeyCodes:Wt,pointingButtons:or,rule:Rr,simlayer:Kr,stickyModifierKeyCodes:ct,systemSounds:an,to$:Ze,toApp:on,toCgEventDoubleClick:dn,toConsumerKey:nn,toHyper:Xt,toInputSource:ln,toKey:me,toMeh:Zt,toMouseCursorPosition:hn,toMouseKey:cn,toNone:tn,toNotificationMessage:wt,toOnlyConsumerKeyCodes:ir,toOnlyKeyCodes:qe,toPaste:sn,toPlaySound:Er,toPointingButton:rn,toRemoveNotificationMessage:et,toSetVar:fe,toSleepSystem:mn,toStickyModifier:fn,toSuperHyper:en,toTypeSequence:pn,toUnsetVar:un,withCondition:jr,withMapper:Or,withModifier:Pr,writeToProfile:Gr},Symbol.toStringTag,{value:"Module"}));Object.assign(self,Qr);let Xr=Ut.initialize({wasmURL:"https://unpkg.com/esbuild-wasm@0.25.0/esbuild.wasm"});self.onmessage=async t=>{let e=t.data;try{await Xr;let{code:o}=await Ut.transform(e.replace(/import[\s\S]*'karabiner\.ts'/,""),{loader:"ts"}),v=new Function(`${o};
return complexModifications(rules)`)().rules.reduce((x,U)=>({description:x.description?`${x.description}; ${U.description}`:U.description,manipulators:x.manipulators.concat(U.manipulators)}),{description:"",manipulators:[]});self.postMessage({input:e,output:JSON.stringify(v,null,2)})}catch(o){let c=(o==null?void 0:o.message)||"Unknown Error";self.postMessage({input:e,output:JSON.stringify({error:c},null,2)})}};
