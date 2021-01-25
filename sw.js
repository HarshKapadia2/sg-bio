const cacheName = "sg-bio-v1";

self.addEventListener
(
	"activate",
	(e) =>
	{
		e.waitUntil
		(
			// Delete any previous cache
			caches.keys()
			.then
			(
				(cacheKeys) =>
				{
					return Promise.all
					(
						cacheKeys.map
						(
							(cacheKey) =>
							{
								if(cacheKey !== cacheName)
									return caches.delete(cacheKey);
							}
						)
					);
				}
			)
		);
	}
);

self.addEventListener
(
	"fetch",
	(e) =>
	{
		e.respondWith
		(
			fetch(e.request)
			.then
			(
				(response) =>
				{
					const resClone = response.clone();

					// Add response to cache
					if(e.request.url.indexOf('http') === 0)
					{
						console.log("Service Worker caching!");
						caches.open(cacheName).then((cache) => cache.put(e.request, resClone));
					}

					return response;
				}
			).catch((err) => caches.match(e.request).then((response) => response))
		);
	}
);
