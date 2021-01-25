const cacheName = "v4";
const cacheAssets = [
	"./",
	"./index.html",
	"./static/css/style.css",
	"./static/img/add_avatar.svg",
	"./static/img/edit_pencil.svg",
	"./static/img/sg_gray.svg",
	"./static/img/clear_cross.svg",
	"./static/img/sg.jpg",
	"./static/js/color_thief_2.3.2.umd.js",
	"./static/js/script.js"
];

self.addEventListener
(
	"install",
	(e) =>
	{
		// Cache files
		e.waitUntil
		(
			caches.open(cacheName)
				.then((cache) => cache.addAll(cacheAssets))
				.then(() => self.skipWaiting())
				.catch((err) => console.error(`Cache error: ${err}`))
		);
	}
);

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
						caches.open(cacheName).then((cache) => cache.put(e.request, resClone));

					return response;
				}
			).catch((err) => caches.match(e.request).then((response) => response))
		);
	}
);
