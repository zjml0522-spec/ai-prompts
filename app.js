(function(){var D=window.PROMPTS||[],cur="全部",q="";var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
$("total").textContent=D.length;var cnt={};D.forEach(function(x){cnt[x.风格]=(cnt[x.风格]||0)+1});
var st=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]});
$("chips").innerHTML=['<button class="chip on" data-s="全部">全部<i>'+D.length+'</i></button>'].concat(st.map(function(s){return '<button class="chip" data-s="'+esc(s)+'">'+esc(s)+'<i>'+cnt[s]+'</i></button>'})).join("");
$("chips").onclick=function(e){var b=e.target.closest(".chip");if(!b)return;cur=b.dataset.s;[].forEach.call(document.querySelectorAll(".chip"),function(c){c.classList.toggle("on",c===b)});render()};
$("q").oninput=function(){q=this.value.trim().toLowerCase();render()};
function render(){var L=D.filter(function(x){if(cur!=="全部"&&x.风格!==cur)return false;if(!q)return true;return [x.名称,x.风格,x.适用场景,x.标题,x.prompts.join(" ")].join(" ").toLowerCase().indexOf(q)>=0});
$("grid").innerHTML=L.map(function(x){return '<div class="card" data-id="'+x.编号+'"><div class="ph"><img loading="lazy" src="'+x.img+'" alt="'+esc(x.名称)+'" width="'+x.w+'" height="'+x.h+'"></div><div class="t"><h3>'+esc(x.名称)+'</h3><span class="tag">'+esc(x.风格)+'</span>'+(x.类型==="视频"?'<span class="tag">视频</span>':'')+'<span class="scene">'+esc(x.适用场景)+'</span></div></div>'}).join("");
$("count").textContent=(cur==="全部"?"全部":cur)+" · "+L.length+" 条";$("empty").hidden=L.length>0}
$("grid").onclick=function(e){var c=e.target.closest(".card");if(c)open(+c.dataset.id)};
function open(id){var x=D.filter(function(y){return y.编号===id})[0];if(!x)return;
$("detail").innerHTML='<img class="big" src="'+x.img+'" alt="'+esc(x.名称)+'"><div class="dbody"><h2>'+esc(x.名称)+'</h2><div class="meta"><span class="tag">'+esc(x.风格)+'</span> '+esc(x.适用场景)+'<br>发布于 '+esc(x.发布日期)+' · <a href="'+esc(x.原文)+'" target="_blank" rel="noopener">原文 ›</a></div>'+
x.prompts.map(function(p,i){return '<div class="pr"><div class="ph2"><span>'+esc(x.labels[i]||("提示词"+(i+1)))+'</span><button class="copy" data-i="'+i+'">复制</button></div><pre class="pt">'+esc(p)+'</pre></div>'}).join("")+
'<ol class="steps" style="margin-top:16px"><li><b>1</b>上传你的照片</li><li><b>2</b>粘贴提示词</li><li><b>3</b>生成</li></ol></div>';
$("modal").hidden=false;document.body.style.overflow="hidden";$("modal").firstChild.scrollTop=0;
if(location.hash!=="#"+id)history.pushState(null,"","#"+id)}
function close(){$("modal").hidden=true;document.body.style.overflow=""}
$("close").onclick=function(){history.length>1&&location.hash?history.back():close()};
$("modal").onclick=function(e){if(e.target===this)$("close").onclick()};
window.onpopstate=function(){var id=+location.hash.slice(1);id?open(id):close()};
document.onkeydown=function(e){if(e.key==="Escape"&&!$("modal").hidden)$("close").onclick()};
function toast(t){var el=$("toast");el.textContent=t;el.classList.add("on");clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove("on")},1800)}
function selectPre(pre){var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r)}
function legacy(t){var a=document.createElement("textarea");a.value=t;a.setAttribute("readonly","");a.style.cssText="position:fixed;top:0;left:0;opacity:0";document.body.appendChild(a);a.select();a.setSelectionRange(0,t.length);var ok=false;try{ok=document.execCommand("copy")}catch(e){}document.body.removeChild(a);return ok}
$("detail").onclick=function(e){var b=e.target.closest(".copy");if(!b)return;var pre=b.parentNode.nextSibling,t=pre.textContent;
function done(){b.textContent="已复制 ✓";b.classList.add("ok");toast("已复制，去粘贴给 AI 吧");setTimeout(function(){b.textContent="复制";b.classList.remove("ok")},2000)}
function fb(){if(legacy(t))done();else{selectPre(pre);toast("已选中文字，请长按手动复制")}}
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(done,fb);else fb()};
render();var h=+location.hash.slice(1);if(h)open(h)})();
