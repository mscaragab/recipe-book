const IGNORE_URLS = [
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key",
];

function isInArray(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(val) > -1) {
      return true;
    }
    return false;
  }
}

self.addEventListener("install", (event) => {
  // console.log("Installing Service Worker............", event);
});

self.addEventListener("fetch", (event) => {
  if (isInArray(IGNORE_URLS, event.request.url)) {
    // console.log("IGNORED...", event);
    return event.response;
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            // console.log("In Cache....", event);
            return response;
          } else {
            // console.log('Fetching......live....', event);
            return fetch(event.request)
              .then((res) => {
                return caches
                  .open("dynamic-recipes")
                  .then((cache) => {
                    // console.log('PUT in cache....done...', res.clone());
                    cache.put(event.request, res.clone());
                    return res;
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err))
    );
  }
});
