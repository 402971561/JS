(function(){try{
 var r=$request;if(!r){$done({});return;}
 var h=r.headers||{};var mn=h["methodname"]||h["Methodname"]||"";var PC="http://192.168.1.9:8787/capture";
 function rep(t,b){$task.fetch({url:PC,method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({methodname:t,body:(b||"").slice(0,700),t:Date.now()}),timeout:6}).catch(function(){});}
 if(mn)rep("GW_TRACE",mn+" | "+((r.body||"").slice(0,100)));
 if(mn==="FusionService.GetFeedPromotions"||mn==="SilkwormService.GetStorePromotionDetail"){$task.fetch({url:PC,method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({methodname:mn,method:r.method,url:r.url,headers:h,body:r.body,t:Date.now()}),timeout:8}).catch(function(){});}
 if(mn==="SilkwormService.GrabPromotionQuota"){var hh={};for(var k in h){var l=k.toLowerCase();if(l!=="content-length"&&l!=="accept-encoding")hh[k]=h[k];}rep("GRAB_TRIGGER",r.body);for(var i=0;i<3;i++){(function(j){$task.fetch({url:r.url,method:"POST",headers:hh,body:r.body,timeout:8}).then(function(x){var b=String(x.body||"");rep("GRAB_RESULT","["+(j+1)+"] "+b);if(b.indexOf("promotion_order_id")>=0&&typeof $notify==="function")$notify("✅抢到名额","第"+(j+1)+"发","");}).catch(function(){});})(i);}if(typeof $notify==="function")$notify("🚀并发领取","3发","");}
}catch(e){}if(typeof $done==="function")$done({});})();
