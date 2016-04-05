!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.rnaplot=n():e.rnaplot=n()}(this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){e.exports=t(10)},function(e,n,t){"use strict";function r(){var e=(new Date).getTime(),n="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){var t=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==n?t:3&t|8).toString(16)});return n}function o(e,n,t){var o=this;o.type="protein",o.size=n,o.nodes=[{name:"P",num:1,radius:3*Math.sqrt(n),rna:o,nodeType:"protein",structName:e,elemType:"p",size:n,uid:r()}],o.links=[],o.uid=r(),o.addUids=function(e){for(var n=0;n<e.length;n++)o.nodes[n].uid=e[n];return o},o.getUids=function(){uids=[];for(var e=0;e<o.dotbracket.length;e++)uids.push(o.nodes[e].uid);return uids}}function a(e,n,t,o){var a=this;a.type="rna",a.circularizeExternal=!1,0===arguments.length?(a.seq="",a.dotbracket="",a.structName=""):(a.seq=e,a.dotbracket=n,a.structName=t),arguments.length<4&&(o=1),a.circular=!1,a.dotbracket.length>0&&"*"==a.dotbracket[a.dotbracket.length-1]&&(a.dotbracket=a.dotbracket.slice(0,a.dotbracket.length-1),a.circular=!0),a.uid=r(),a.elements=[],a.pseudoknotPairs=[],a.nucsToNodes={},a.addUids=function(e){for(var n=a.nodes.filter(function(e){return"nucleotide"==e.nodeType}),t=0;t<e.length&&t<n.length;t++)n[t].uid=e[t];return a},a.computePairtable=function(){a.pairtable=s.rnaUtilities.dotbracketToPairtable(a.dotbracket)},a.removeBreaks=function(e){for(var n=[],t=-1;(t=e.indexOf("&"))>=0;)n.push(t),e=e.substring(0,t)+"oo"+e.substring(t+1,e.length);return{targetString:e,breaks:n}};var i=a.removeBreaks(a.dotbracket);a.dotbracket=i.targetString,a.dotBracketBreaks=i.breaks,i=a.removeBreaks(a.seq),a.seq=i.targetString,a.seqBreaks=i.breaks,a.calculateStartNumberArray=function(){a.startNumberArray=[];for(var e=0;e<a.dotbracket.length;e++)a.startNumberArray.push(o),"o"==a.dotbracket[e]&&(o=-e)},a.calculateStartNumberArray(),a.rnaLength=a.dotbracket.length,(0,s.arraysEqual)(a.dotBracketBreaks,a.seqBreaks)||(console.log("WARNING: Sequence and structure breaks not equal"),console.log("WARNING: Using the breaks in the structure")),a.computePairtable(),a.addPositions=function(e,n){for(var t=a.nodes.filter(function(n){return n.nodeType==e}),r=0;r<t.length;r++)t[r].x=n[r][0],t[r].px=n[r][0],t[r].y=n[r][1],t[r].py=n[r][1];return a},a.breakNodesToFakeNodes=function(){for(var e=a.nodes.filter(function(e){return"nucleotide"==e.nodeType}),n=0;n<e.length;n++)"o"==a.dotbracket[n]&&(e[n].nodeType="middle");for(var n=0;n<a.elements.length;n++){for(var t=!1,r=0;r<a.elements[n][2].length;r++)a.dotBracketBreaks.indexOf(a.elements[n][2][r])>=0&&(t=!0);t?a.elements[n][2].map(function(e){0!=e&&(a.nodes[e-1].elemType="e")}):a.elements[n][2].map(function(e){0!=e&&(a.nodes[e-1].elemType=a.elements[n][0])})}return a},a.getPositions=function(e){for(var n=[],t=a.nodes.filter(function(n){return n.nodeType==e}),r=0;r<t.length;r++)n.push([t[r].x,t[r].y]);return n},a.getUids=function(){for(var e=[],n=0;n<a.dotbracket.length;n++)e.push(a.nodes[n].uid);return e},a.reinforceStems=function(){for(var e=a.pairtable,n=a.elements.filter(function(e){return"s"==e[0]&&e[2].length>=4}),t=0;t<n.length;t++)for(var r=n[t][2],o=r.slice(0,r.length/2),i=0;i<o.length-1;i++)a.addFakeNode([o[i],o[i+1],e[o[i+1]],e[o[i]]]);return a},a.reinforceLoops=function(){for(var e=function(e){return 0!==e&&e<=a.dotbracket.length},n=0;n<a.elements.length;n++)if("s"!=a.elements[n][0]&&(a.circularizeExternal||"e"!=a.elements[n][0])){var t=a.elements[n][2].filter(e);if("e"==a.elements[n][0]){var o={name:"",num:-3,radius:0,rna:a,nodeType:"middle",elemType:"f",nucs:[],x:a.nodes[a.rnaLength-1].x,y:a.nodes[a.rnaLength-1].y,px:a.nodes[a.rnaLength-1].px,py:a.nodes[a.rnaLength-1].py,uid:r()},i={name:"",num:-2,radius:0,rna:a,nodeType:"middle",elemType:"f",nucs:[],x:a.nodes[0].x,y:a.nodes[0].y,px:a.nodes[0].px,py:a.nodes[0].py,uid:r()};t.push(a.nodes.length+1),t.push(a.nodes.length+2),a.nodes.push(o),a.nodes.push(i)}a.addFakeNode(t)}return a},a.updateLinkUids=function(){for(var e=0;e<a.links.length;e++)a.links[e].uid=a.links[e].source.uid+a.links[e].target.uid;return a},a.addFakeNode=function(e){for(var n=18,t=6.283/(2*e.length),o=n/(2*Math.tan(t)),i="",s=0;s<e.length;s++)i+=a.nodes[e[s]-1].uid;var l={name:"",num:-1,radius:o,rna:a,nodeType:"middle",elemType:"f",nucs:e,uid:i};a.nodes.push(l);var u=0,c=0,d=0;t=3.14159*(e.length-2)/(2*e.length),o=.5/Math.cos(t);for(var p=0;p<e.length;p++)if(!(0===e[p]||e[p]>a.dotbracket.length)){a.links.push({source:a.nodes[e[p]-1],target:a.nodes[a.nodes.length-1],linkType:"fake",value:o,uid:r()}),e.length>4&&a.links.push({source:a.nodes[e[p]-1],target:a.nodes[e[(p+Math.floor(e.length/2))%e.length]-1],linkType:"fake",value:2*o,uid:r()});var f=3.14159*(e.length-2)/e.length,h=2*Math.cos(1.570795-f/2);a.links.push({source:a.nodes[e[p]-1],target:a.nodes[e[(p+2)%e.length]-1],linkType:"fake",value:h});var g=a.nodes[e[p]-1];"x"in g&&(u+=g.x,c+=g.y,d+=1)}return d>0&&(l.x=u/d,l.y=c/d,l.px=l.x,l.py=l.y),a},a.connectFakeNodes=function(){for(var e=18,n=function(e){return"middle"==e.nodeType},t={},r=a.nodes.filter(n),o=new Set,i=1;i<=a.nodes.length;i++)t[i]=[];for(var i=0;i<r.length;i++)for(var s=r[i],l=0;l<s.nucs.length;l++){for(var u=s.nucs[l],c=0;c<t[u].length;c++)if(!o.has(JSON.stringify([t[u][c].uid,s.uid].sort()))){var d=t[u][c].radius+s.radius;a.links.push({source:t[u][c],target:s,value:d/e,linkType:"fake_fake"}),o.add(JSON.stringify([t[u][c].uid,s.uid].sort()))}t[u].push(s)}return a},a.addExtraLinks=function(e){if("undefined"==typeof e)return a;for(var n=0;n<e.length;n++){var t=a.getNodeFromNucleotides(e[n].from),o=a.getNodeFromNucleotides(e[n].to),i={source:t,target:o,linkType:"extra",extraLinkType:e[n].linkType,uid:r()};a.links.push(i)}return a},a.elementsToJson=function(){var e=a.pairtable;a.elements;a.nodes=[],a.links=[];var n={};a.elements.sort();for(var t=0;t<a.elements.length;t++)for(var o=a.elements[t][2],i=0;i<o.length;i++)n[o[i]]=a.elements[t][0];for(var t=1;t<=e[0];t++){var s=a.seq[t-1];(a.dotBracketBreaks.indexOf(t-1)>=0||a.dotBracketBreaks.indexOf(t-2)>=0)&&(s=""),a.nodes.push({name:s,num:t+a.startNumberArray[t-1]-1,radius:5,rna:a,nodeType:"nucleotide",structName:a.structName,elemType:n[t],uid:r(),linked:!1})}for(var t=0;t<a.nodes.length;t++)0===t?a.nodes[t].prevNode=null:a.nodes[t].prevNode=a.nodes[t-1],t==a.nodes.length-1?a.nodes[t].nextNode=null:a.nodes[t].nextNode=a.nodes[t+1];for(var t=1;t<=e[0];t++)0!==e[t]&&a.links.push({source:a.nodes[t-1],target:a.nodes[e[t]-1],linkType:"basepair",value:1,uid:r()}),t>1&&-1===a.dotBracketBreaks.indexOf(t-1)&&-1==a.dotBracketBreaks.indexOf(t-2)&&-1==a.dotBracketBreaks.indexOf(t-3)&&(a.links.push({source:a.nodes[t-2],target:a.nodes[t-1],linkType:"backbone",value:1,uid:r()}),a.nodes[t-1].linked=!0);for(var t=0;t<a.pseudoknotPairs.length;t++)a.links.push({source:a.nodes[a.pseudoknotPairs[t][0]-1],target:a.nodes[a.pseudoknotPairs[t][1]-1],linkType:"pseudoknot",value:1,uid:r()});return a.circular&&a.links.push({source:a.nodes[0],target:a.nodes[a.rnaLength-1],linkType:"backbone",value:1,uid:r()}),a},a.ptToElements=function(e,n,t,r){var o=[],i=[t-1],s=[r+1];if(t>r)return[];for(;0===e[t];t++)i.push(t);for(;0===e[r];r--)s.push(r);if(t>r){if(i.push(t),0===n)return[["e",n,i.sort(l)]];for(var u=!1,c=[],d=[],p=0;p<i.length;p++)u?d.push(i[p]):c.push(i[p]),a.dotBracketBreaks.indexOf(i[p])>=0&&(u=!0);return u?[["h",n,i.sort(l)]]:[["h",n,i.sort(l)]]}if(e[t]!=r){var f=i,p=t;for(f.push(p);r>=p;){for(o=o.concat(a.ptToElements(e,n,p,e[p])),f.push(e[p]),p=e[p]+1;0===e[p]&&r>=p;p++)f.push(p);f.push(p)}return f.pop(),f=f.concat(s),f.length>0&&(0===n?o.push(["e",n,f.sort(l)]):o.push(["m",n,f.sort(l)])),o}if(e[t]===r){i.push(t),s.push(r);var h=i.concat(s);h.length>4&&(0===n?o.push(["e",n,i.concat(s).sort(l)]):o.push(["i",n,i.concat(s).sort(l)]))}for(var g=[];e[t]===r&&r>t;)g.push(t),g.push(r),t+=1,r-=1,n+=1;return i=[t-1],s=[r+1],o.push(["s",n,g.sort(l)]),o.concat(a.ptToElements(e,n,t,r))},a.addLabels=function(e,n){if(0===arguments.length&&(e=1,n=10),1===arguments.length&&(n=10),0===n)return a;0>=n&&console.log("The label interval entered in invalid:",n);for(var t=1;t<=a.pairtable[0];t++)if(t%n===0){var o,i,s,l,u,c,d=a.nodes[t-1];1==a.rnaLength?(c=[d.x-15,d.y],u=[d.x-15,d.y]):(s=1==t?a.nodes[a.rnaLength-1]:a.nodes[t-2],l=t==a.rnaLength?a.nodes[0]:a.nodes[t],0!==a.pairtable[l.num]&&0!==a.pairtable[s.num]&&0!==a.pairtable[d.num]&&(s=l=a.nodes[a.pairtable[d.num]-1]),0===a.pairtable[d.num]||0!==a.pairtable[l.num]&&0!==a.pairtable[s.num]?(c=[l.x-d.x,l.y-d.y],u=[s.x-d.x,s.y-d.y]):(c=[d.x-l.x,d.y-l.y],u=[d.x-s.x,d.y-s.y]));var p=[c[0]+u[0],c[1]+u[1]],f=Math.sqrt(p[0]*p[0]+p[1]*p[1]),h=[p[0]/f,p[1]/f],g=[-15*h[0],-15*h[1]],o=a.nodes[t-1].x+g[0],i=a.nodes[t-1].y+g[1],m={name:t+a.startNumberArray[t-1]-1,num:-1,radius:6,rna:a,nodeType:"label",structName:a.structName,elemType:"l",x:o,y:i,px:o,py:i,uid:r()},v={source:a.nodes[t-1],target:m,value:1,linkType:"label_link",uid:r()};a.nodes.push(m),a.links.push(v)}return a},a.recalculateElements=function(){if(a.removePseudoknots(),a.elements=a.ptToElements(a.pairtable,0,1,a.dotbracket.length),a.circular&&(externalLoop=a.elements.filter(function(e){return"e"==e[0]?!0:void 0}),externalLoop.length>0)){eloop=externalLoop[0],nucs=eloop[2].sort(l),prev=nucs[0],hloop=!0,numGreater=0;for(var e=1;e<nucs.length;e++)nucs[e]-prev>1&&(numGreater+=1),prev=nucs[e];1==numGreater?eloop[0]="h":2==numGreater?eloop[0]="i":eloop[0]="m"}return a},a.reassignLinkUids=function(){for(var e,e=0;e<a.links.length;e++)a.links[e].uid=a.links[e].source.uid+a.links[e].target.uid;return a},a.removePseudoknots=function(){return a.pairtable.length>1&&(a.pseudoknotPairs=a.pseudoknotPairs.concat(s.rnaUtilities.removePseudoknotsFromPairtable(a.pairtable))),a},a.addPseudoknots=function(){for(var e=a.pairtable,n=a.pseudoknotPairs,t=0;t<n.length;t++)e[n[t][0]]=n[t][1],e[n[t][1]]=n[t][0];return a.pseudoknotPairs=[],a},a.addName=function(e){return"undefined"==typeof e?(a.name="",a):(a.name=e,a)},a.rnaLength>0&&a.recalculateElements()}function i(e){for(var n={},t=[],i=[],s=0;s<e.molecules.length;s++){var l,u=e.molecules[s];"rna"==u.type?(l=new a(u.seq,u.ss,u.header),l.circularizeExternal=!0,l.elementsToJson().addPositions("nucleotide",u.positions).addLabels().reinforceStems().reinforceLoops()):"protein"==u.type&&(l=new o(u.header,u.size)),l.addUids(u.uids);for(var c=0;c<l.nodes.length;c++)n[l.nodes[c].uid]=l.nodes[c];t.push(l)}for(var s=0;s<e.extraLinks.length;s++)link=e.extraLinks[s],link.source=n[link.source],link.target=n[link.target],link.uid=r(),i.push(link);return{graphs:t,extraLinks:i}}Object.defineProperty(n,"__esModule",{value:!0}),n.ProteinGraph=o,n.RNAGraph=a,n.moleculesToJson=i;var s=t(2),l=function(e,n){return e-n};"undefined"==typeof String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s+|\s+$/g,"")})},function(e,n,t){var r,o,a;(function(e){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(i,s){"object"==t(n)&&"object"==t(e)?e.exports=s():(o=[],r=s,a="function"==typeof r?r.apply(n,o):r,!(void 0!==a&&(e.exports=a)))}(void 0,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){e.exports=t(1)},function(e,n){function t(e,n){if(e===n)return!0;if(null===e||null===n)return!1;if(e.length!=n.length)return!1;for(var t=0;t<e.length;++t)if(e[t]!==n[t])return!1;return!0}function r(){var e=this;e.bracketLeft="([{<ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),e.bracketRight=")]}>abcdefghijklmnopqrstuvwxyz".split(""),e.inverseBrackets=function(e){for(var n={},t=0;t<e.length;t++)n[e[t]]=t;return n},e.maximumMatching=function(e){for(var n=e[0],t=0,r=new Array(n+1),o=0;n>=o;o++){r[o]=new Array(n+1);for(var a=o;n>=a;a++)r[o][a]=0}for(var i=0,o=n-t-1;o>0;o--)for(var a=o+t+1;n>=a;a++){i=r[o][a-1];for(var s=a-t-1;s>=o;s--)e[s]===a&&(i=Math.max(i,(s>o?r[o][s-1]:0)+1+(a-s-1>0?r[s+1][a-1]:0)));r[o][a]=i}return i=r[1][n],r},e.backtrackMaximumMatching=function(n,t){var r=Array.apply(null,Array(n.length)).map(function(){return 0});return e.mmBt(n,r,t,1,n.length-1),r},e.mmBt=function(n,t,r,o,a){var i=n[o][a],s=0;if(!(s>a-o-1)){if(n[o][a-1]==i)return void e.mmBt(n,t,r,o,a-1);for(var l=a-s-1;l>=o;l--)if(r[a]===l){var u=l>o?n[o][l-1]:0,c=a-l-1>0?n[l+1][a-1]:0;if(u+c+1==i)return t[l]=a,t[a]=l,l>o&&e.mmBt(n,t,r,o,l-1),void e.mmBt(n,t,r,l+1,a-1)}console.log("FAILED!!!"+o+","+a+": backtracking failed!")}},e.dotbracketToPairtable=function(n){var t=Array.apply(null,new Array(n.length+1)).map(Number.prototype.valueOf,0);t[0]=n.length;for(var r={},o=0;o<e.bracketLeft.length;o++)r[o]=[];for(var a=e.inverseBrackets(e.bracketLeft),i=e.inverseBrackets(e.bracketRight),o=0;o<n.length;o++){var s=n[o],l=o+1;if("."==s||"o"==s)t[l]=0;else if(s in a)r[a[s]].push(l);else{if(!(s in i))throw"Unknown symbol in dotbracket string";var u=r[i[s]].pop();t[l]=u,t[u]=l}}for(var c in r)if(r[c].length>0)throw"Unmatched base at position "+r[c][0];return t},e.insertIntoStack=function(e,n,t){for(var r=0;e[r].length>0&&e[r][e[r].length-1]<t;)r+=1;return e[r].push(t),r},e.deleteFromStack=function(e,n){for(var t=0;0===e[t].length||e[t][e[t].length-1]!=n;)t+=1;return e[t].pop(),t},e.pairtableToDotbracket=function(n){for(var t={},r=0;r<n[0];r++)t[r]=[];for(var r,o={},a="",r=1;r<n[0]+1;r++){if(0!==n[r]&&n[r]in o)throw"Invalid pairtable contains duplicate entries";o[n[r]]=!0,a+=0===n[r]?".":n[r]>r?e.bracketLeft[e.insertIntoStack(t,r,n[r])]:e.bracketRight[e.deleteFromStack(t,r)]}return a},e.findUnmatched=function(n,t,r){for(var o,a=[],i=[],s=t,l=r,o=t;r>=o;o++)0!==n[o]&&(n[o]<t||n[o]>r)&&i.push([o,n[o]]);for(var o=s;l>=o;o++){for(;0===n[o]&&l>=o;)o++;for(r=n[o];n[o]===r;)o++,r--;a=a.concat(e.findUnmatched(n,o,r))}return i.length>0&&a.push(i),a},e.removePseudoknotsFromPairtable=function(n){for(var t=e.maximumMatching(n),r=e.backtrackMaximumMatching(t,n),o=[],a=1;a<n.length;a++)n[a]<a||r[a]!=n[a]&&(o.push([a,n[a]]),n[n[a]]=0,n[a]=0);return o},e.ptToElements=function(n,t,r,o,i){var s=[],l=[r-1],u=[o+1];if(arguments.length<5&&(i=[]),r>o)return[];for(;0===n[r];r++)l.push(r);for(;0===n[o];o--)u.push(o);if(r>o){if(l.push(r),0===t)return[["e",t,l.sort(a)]];for(var c=!1,d=[],p=[],f=0;f<l.length;f++)c?p.push(l[f]):d.push(l[f]),i.indexOf(l[f])>=0&&(c=!0);return c?[["h",t,l.sort(a)]]:[["h",t,l.sort(a)]]}if(n[r]!=o){var h=l,f=r;for(h.push(f);o>=f;){for(s=s.concat(e.ptToElements(n,t,f,n[f],i)),h.push(n[f]),f=n[f]+1;0===n[f]&&o>=f;f++)h.push(f);h.push(f)}return h.pop(),h=h.concat(u),h.length>0&&(0===t?s.push(["e",t,h.sort(a)]):s.push(["m",t,h.sort(a)])),s}if(n[r]===o){l.push(r),u.push(o);var g=l.concat(u);g.length>4&&(0===t?s.push(["e",t,l.concat(u).sort(a)]):s.push(["i",t,l.concat(u).sort(a)]))}for(var m=[];n[r]===o&&o>r;)m.push(r),m.push(o),r+=1,o-=1,t+=1;return l=[r-1],u=[o+1],s.push(["s",t,m.sort(a)]),s.concat(e.ptToElements(n,t,r,o,i))}}function o(e){var n=this;return n.colorsText=e,n.parseRange=function(e){for(var n=e.split(","),t=[],r=0;r<n.length;r++){var o=n[r].split("-");if(1==o.length)t.push(parseInt(o[0]));else if(2==o.length)for(var a=parseInt(o[0]),i=parseInt(o[1]),s=a;i>=s;s++)t.push(s);else console.log("Malformed range (too many dashes):",e)}return t},n.parseColorText=function(e){for(var t=e.split("\n"),r="",o=1,a={colorValues:{"":{}},range:["white","steelblue"]},i=[],s=0;s<t.length;s++)if(">"!=t[s][0])for(var l=t[s].trim().split(/[\s]+/),u=0;u<l.length;u++)if(isNaN(l[u])){if(0===l[u].search("range")){var c=l[u].split("="),d=c[1].split(":");a.range=[d[0],d[1]];continue}if(0==l[u].search("domain")){var p=l[u].split("="),d=p[1].split(":");a.domain=[d[0],d[1]];continue}for(var f=l[u].split(":"),h=n.parseRange(f[0]),g=f[1],m=0;m<h.length;m++)isNaN(g)?a.colorValues[r][h[m]]=g:(a.colorValues[r][h[m]]=+g,i.push(Number(g)))}else a.colorValues[r][o]=Number(l[u]),o+=1,i.push(Number(l[u]));else r=t[s].trim().slice(1),o=1,a.colorValues[r]={};return"domain"in a||(a.domain=[Math.min.apply(null,i),Math.max.apply(null,i)]),n.colorsJson=a,n},n.normalizeColors=function(){var e;for(var t in n.colorsJson){var r=Number.MAX_VALUE,o=Number.MIN_VALUE;for(var a in n.colorsJson.colorValues[t])e=n.colorsJson.colorValues[t][a],"number"==typeof e&&(r>e&&(r=e),e>o&&(o=e));for(a in n.colorsJson.colorValues[t])e=n.colorsJson.colorValues[t][a],"number"==typeof e&&(n.colorsJson.colorValues[t][a]=(e-r)/(o-r))}return n},n.parseColorText(n.colorsText),n}Object.defineProperty(n,"__esModule",{value:!0}),n.arraysEqual=t,n.RNAUtilities=r,n.ColorScheme=o;var a=function(e,n){return e-n};n.rnaUtilities=new r}])})}).call(n,t(3)(e))},function(e,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},,,,function(e,n){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],n=0;n<this.length;n++){var t=this[n];t[2]?e.push("@media "+t[2]+"{"+t[1]+"}"):e.push(t[1])}return e.join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];"number"==typeof a&&(r[a]=!0)}for(o=0;o<n.length;o++){var i=n[o];"number"==typeof i[0]&&r[i[0]]||(t&&!i[2]?i[2]=t:t&&(i[2]="("+i[2]+") and ("+t+")"),e.push(i))}},e}},function(e,n,t){function r(e,n){for(var t=0;t<e.length;t++){var r=e[t],o=f[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(u(r.parts[a],n))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(u(r.parts[a],n));f[r.id]={id:r.id,refs:1,parts:i}}}}function o(e){for(var n=[],t={},r=0;r<e.length;r++){var o=e[r],a=o[0],i=o[1],s=o[2],l=o[3],u={css:i,media:s,sourceMap:l};t[a]?t[a].parts.push(u):n.push(t[a]={id:a,parts:[u]})}return n}function a(e,n){var t=m(),r=y[y.length-1];if("top"===e.insertAt)r?r.nextSibling?t.insertBefore(n,r.nextSibling):t.appendChild(n):t.insertBefore(n,t.firstChild),y.push(n);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(n)}}function i(e){e.parentNode.removeChild(e);var n=y.indexOf(e);n>=0&&y.splice(n,1)}function s(e){var n=document.createElement("style");return n.type="text/css",a(e,n),n}function l(e){var n=document.createElement("link");return n.rel="stylesheet",a(e,n),n}function u(e,n){var t,r,o;if(n.singleton){var a=k++;t=v||(v=s(n)),r=c.bind(null,t,a,!1),o=c.bind(null,t,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=l(n),r=p.bind(null,t),o=function(){i(t),t.href&&URL.revokeObjectURL(t.href)}):(t=s(n),r=d.bind(null,t),o=function(){i(t)});return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}function c(e,n,t,r){var o=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(n,o);else{var a=document.createTextNode(o),i=e.childNodes;i[n]&&e.removeChild(i[n]),i.length?e.insertBefore(a,i[n]):e.appendChild(a)}}function d(e,n){var t=n.css,r=n.media;n.sourceMap;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}function p(e,n){var t=n.css,r=(n.media,n.sourceMap);r&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([t],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(o),a&&URL.revokeObjectURL(a)}var f={},h=function(e){var n;return function(){return"undefined"==typeof n&&(n=e.apply(this,arguments)),n}},g=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=h(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,k=0,y=[];e.exports=function(e,n){n=n||{},"undefined"==typeof n.singleton&&(n.singleton=g()),"undefined"==typeof n.insertAt&&(n.insertAt="bottom");var t=o(e);return r(t,n),function(e){for(var a=[],i=0;i<t.length;i++){var s=t[i],l=f[s.id];l.refs--,a.push(l)}if(e){var u=o(e);r(u,n)}for(var i=0;i<a.length;i++){var l=a[i];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete f[l.id]}}}};var b=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}()},function(e,n){"use strict";function t(e){var n,t,r,o=0,a=100,i=100,s=15,l=[],u=[];t=e[0];var c=Array.apply(null,new Array(t+5)).map(Number.prototype.valueOf,0),d=Array.apply(null,new Array(16+Math.floor(t/5))).map(Number.prototype.valueOf,0),p=Array.apply(null,new Array(16+Math.floor(t/5))).map(Number.prototype.valueOf,0),f=0,h=0,g=Math.PI/2,m=function k(e,n,t){var r,o,a,i,s,l,u,m,v,y,b,x,N=2,T=0,L=0,w=Array.apply(null,new Array(3+2*Math.floor((n-e)/5))).map(Number.prototype.valueOf,0);for(r=e-1,n++;e!=n;)if(o=t[e],o&&0!=e){N+=2,a=e,i=o,w[++T]=a,w[++T]=i,e=o+1,s=a,l=i,m=0;do a++,i--,m++;while(t[a]==i&&t[a]>a);if(u=m-2,m>=2&&(c[s+1+u]+=g,c[l-1-u]+=g,c[s]+=g,c[l]+=g,m>2))for(;u>=1;u--)c[s+u]=Math.PI,c[l-u]=Math.PI;p[++h]=m,i>=a&&k(a,i,t)}else e++,N++,L++;for(x=Math.PI*(N-2)/N,w[++T]=n,v=0>r?0:r,y=1;T>=y;y++){for(b=w[y]-v,u=0;b>=u;u++)c[v+u]+=x;if(y>T)break;v=w[++y]}d[++f]=L};m(0,t+1,e),d[f]-=2,r=o,l[0]=a,u[0]=i;var v=[];for(v.push([l[0],u[0]]),n=1;t>n;n++)l[n]=l[n-1]+s*Math.cos(r),u[n]=u[n-1]+s*Math.sin(r),v.push([l[n],u[n]]),r+=Math.PI-c[n+1];return v}Object.defineProperty(n,"__esModule",{value:!0}),n.simpleXyCoordinates=t},function(e,n,t){"use strict";function r(){function e(e,n){function t(e,n,t){var r=(e.range()[1]-e.range()[0])/(e.domain()[1]-e.domain()[0]),o=(n[1]-n[0])*r,a=(t[1]-t[0]-o)/2;return{scaleFactor:r,scale:d3.scale.linear().domain(n).range([t[0]+a,t[1]-a])}}var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2],o=d3.extent(e),a=d3.extent(n),i=30;""!=r&&(a[1]+=i),o[0]-=d.nucleotideRadius+d.rnaEdgePadding,a[0]-=d.nucleotideRadius+d.rnaEdgePadding,o[1]+=d.nucleotideRadius+d.rnaEdgePadding,a[1]+=d.nucleotideRadius+d.rnaEdgePadding;var s,l=o[1]-o[0],p=a[1]-a[0],f=l-d.width,h=p-d.height;f>h?(u=d3.scale.linear().domain(o).range([0,d.width]),s=t(u,a,[0,d.height]),c=s.scale):(c=d3.scale.linear().domain(a).range([0,d.height]),s=t(c,o,[0,d.width]),u=s.scale);u.range()[0]-u.domain()[0],c.range()[0]-c.domain()[0];return"translate("+-(u.domain()[0]*s.scaleFactor-u.range()[0])+","+-(c.domain()[0]*s.scaleFactor-c.range()[0])+")scale("+s.scaleFactor+")"}function n(e,n){var t=e.selectAll(".rna-base").data(n).enter().append("svg:g").attr("transform",function(e){return"translate("+e.x+","+e.y+")"});t.append("svg:circle").attr("r",d.nucleotideRadius).classed("rna-base",!0);if(d.showNucleotideLabels){t.append("svg:text").text(function(e){return e.name}).attr("text-anchor","middle").attr("dominant-baseline","central").classed("nucleotide-label",!0).append("svg:title").text(function(e){return e.struct_name+":"+e.num})}}function t(e,n){var t=e.selectAll(".rnaLabel").data(n).enter().append("svg:g").attr("transform",function(e){return"translate("+e.x+","+e.y+")"});t.append("svg:text").text(function(e){return e.name}).attr("text-anchor","middle").attr("font-weight","bold").attr("dominant-baseline","central").classed("number-label",!0)}function r(e,n){e.append("svg:text").attr("transform","translate("+u.invert(d.width/2)+","+c.invert(d.height)+")").attr("dy",-10).classed("rna-name",!0).text(n)}function i(e,n){var t={},r=[];n=n.filter(function(e){return"correct"==e.linkType||"incorrect"==e.linkType||"extra"==e.linkType}),e.selectAll("[link-type=extra]").remove();for(var o=0;o<n.length;o++)null!==n[o].source&&null!==n[o].target&&(t[n[o].source.uid]=n[o].source,t[n[o].target.uid]=n[o].target,r.push({source:n[o].source.uid,target:n[o].target.uid,linkType:n[o].linkType,extraLinkType:n[o].extraLinkType}));for(var a=d3.ForceEdgeBundling().nodes(t).edges(r).compatibility_threshold(.8).step_size(.2),i=a(),s=d3.svg.line().x(function(e){return e.x}).y(function(e){return e.y}).interpolate("linear"),o=0;o<i.length;o++){var l=i[o];e.append("path").attr("d",s(l)).style("fill","none").attr("link-type",function(e){return r[o].linkType}).attr("extra-link-type",function(e){return r[o].extraLinkType}).style("stroke-opacity",.4)}}function s(e,n){n=n.filter(function(e){return null!==e.source&&null!==e.target});e.selectAll(".rna-link").data(n).enter().append("svg:line").attr("x1",function(e){return e.source.x}).attr("x2",function(e){return e.target.x}).attr("y1",function(e){return e.source.y}).attr("y2",function(e){return e.target.y}).attr("link-type",function(e){return e.linkType}).attr("extra-link-type",function(e){return e.extraLinkType}).classed("rna-link",!0)}function l(l){l.each(function(l){var u=new a.RNAGraph(l.sequence,l.structure,l.name).recalculateElements().elementsToJson().addName(l.name);l.rnaGraph=u;var c=(0,o.simpleXyCoordinates)(u.pairtable);u.addPositions("nucleotide",c).reinforceStems().reinforceLoops().addExtraLinks(l.extraLinks).addLabels(d.startNucleotideNumber,d.labelInterval);var p=e(u.nodes.map(function(e){return e.x}),u.nodes.map(function(e){return e.y})),f=d3.select(this).append("g").attr("transform",p),h=u.nodes.filter(function(e){return"nucleotide"==e.nodeType}),g=u.nodes.filter(function(e){return"label"==e.nodeType}),m=u.links;s(f,m),n(f,h),t(f,g),r(f,l.name),d.bundleExternalLinks&&i(f,m)})}var u,c,d={width:400,height:400,nucleotideRadius:5,rnaEdgePadding:0,labelInterval:0,showNucleotideLabels:!0,startNucleotideNumber:1,bundleExternalLinks:!1};return l.width=function(e){return arguments.length?(d.width=e,l):d.width},l.height=function(e){return arguments.length?(d.height=e,l):d.height},l.showNucleotideLabels=function(e){return arguments.length?(d.showNucleotideLabels=e,l):d.showNucleotideLabels},l.rnaEdgePadding=function(e){return arguments.length?(d.rnaEdgePadding=e,l):d.rnaEdgePadding},l.nucleotideRadius=function(e){return arguments.length?(d.nucleotideRadius=e,l):d.nucleotideRadius},l.labelInterval=function(e){return arguments.length?(d.labelInterval=e,l):d.labelInterval},l.showNucleotideLabels=function(e){return arguments.length?(d.showNucleotideLabels=e,l):d.showNucleotideLabels},l.startNucleotideNumber=function(e){return arguments.length?(d.startNucleotideNumber=e,l):d.startNucleotideNumber},l.bundleExternalLinks=function(e){return arguments.length?(d.bundleExternalLinks=e,l):d.bundleExternalLinks},l}Object.defineProperty(n,"__esModule",{value:!0}),n.rnaPlot=r;var o=t(9),a=t(1);t(2);t(11),"undefined"==typeof String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s+|\s+$/g,"")})},function(e,n,t){var r=t(12);"string"==typeof r&&(r=[[e.id,r,""]]);t(8)(r,{});r.locals&&(e.exports=r.locals)},function(e,n,t){n=e.exports=t(7)(),n.push([e.id,'.structure-background-rect {\n    stroke: black;\n    stroke-width: 5;\n    fill: transparent;\n}\n\ncircle.rna-base {\n  stroke: #ccc;\n  stroke-width: 1px;\n  opacity: 1;\n  fill: white;\n}\n\ncircle.rna-base.label {\n    stroke: transparent;\n    stroke-width: 0;\n    fill: white;\n}\n\nline.link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\nline.rna-link {\n  stroke: #999;\n  stroke-opacity: 0.8;\n  stroke-width: 2;\n}\n\n.overlay {\n    fill: transparent;\n}\n\n.rna-name {\n    text-anchor: middle;\n    dy: -10;\n    font-family: Tahoma, Geneva, sans-serif;\n    font-size: 8pt;\n}\n\nline.rna-link[link-type="backbone"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type="basepair"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type="fake"] {\n    stroke: transparent;\n}\n\nline.rna-link[link-type="extra"] {\n    stroke: grey;\n}\n\nline.rna-link[extra-link-type="correct"] {\n    stroke: green;\n}\n\nline.rna-link[extra-link-type="incorrect"] {\n    stroke: green;\n}\n\n\npath {\n    stroke: grey;\n  stroke-width: 2;\n}\n\npath[extra-link-type="correct"] {\n    stroke: green;\n}\n\npath[extra-link-type="incorrect"] {\n    stroke: red;\n}\n\n\nline.basepair {\n  stroke: red;\n}\n\nline.intermolecule {\n  stroke: blue;\n}\n\nline.chain_chain {\n  stroke-dasharray: 3,3;\n}\n\nline.fake {\n  stroke: green;\n}\n\n.transparent {\n    fill: transparent;\n    stroke-width: 0;\n    stroke-opacity: 0;\n    opacity: 0;\n}\n\n.d3-tip {\n    line-height: 1;\n    font-weight: bold;\n    padding: 6px;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    border-radius: 4px;\n    pointer-events: none;\n          }\n\ntext.nucleotide-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext.number-label {\n    font-size: 5.5pt;\n    font-weight: bold;\n    font-family: Tahoma, Geneva, sans-serif;\n    color: rgb(100,100,100);\n    pointer-events: none;\n}\n\ntext {\n    pointer-events: none;\n}\n\ng.gnode {\n\n}\n\n.brush .extent {\n  fill-opacity: .1;\n  stroke: #fff;\n  shape-rendering: crispEdges;\n}\n\n.noselect {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n',""])}])});