var C="hd-v1";
self.addEventListener("install",function(){self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);if(u.origin!==location.origin)return;
  if(/\.bin$/.test(u.pathname)){
    e.respondWith(caches.open(C).then(function(c){return c.match(r).then(function(h){return h||fetch(r).then(function(x){if(x.ok)c.put(r,x.clone());return x;});});}));
  }else if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(function(x){var y=x.clone();caches.open(C).then(function(c){c.put("./",y);});return x;}).catch(function(){return caches.open(C).then(function(c){return c.match("./");});}));
  }
});
