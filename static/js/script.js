const avatarUpload = document.querySelector("#avatar-upload-div");
const avatar = document.querySelector("#avatar");
const avatarInput = document.querySelector("#avatar-input");
const backdrop = document.querySelector("#backdrop");

if(navigator.serviceWorker)
{
	window.addEventListener
	(
		"load",
		() =>
		{
			navigator.serviceWorker
				.register("sw.js")
				.catch((err) => console.error(`Service Worker error: ${err}`));
		}
	);
}

avatarUpload.addEventListener("click", () => avatarInput.click());

avatarInput.addEventListener
(
	"change",
	async () =>
	{
		const base64Img = await getBase64(avatarInput.files[0]);
		avatar.src = base64Img;

		const dominantColour = await getDominantColour(base64Img);
		backdrop.style.backgroundColor = `rgb(${dominantColour[0]}, ${dominantColour[1]}, ${dominantColour[2]})`;
	}
);

async function getBase64(file)
{
	return new Promise
	(
		(resolve, reject) =>
		{
			const reader = new FileReader();

			reader.addEventListener("error", reject);
			reader.addEventListener("load", () => resolve(reader.result));
			reader.readAsDataURL(file);
		}
	);
}

async function getDominantColour(base64Str)
{
	return new Promise
	(
		(resolve, reject) =>
		{
			const img = document.createElement("img");
			img.src = base64Str;
			
			img.addEventListener("error", reject);

			img.addEventListener
			(
				"load",
				() =>
				{
					const colorThief = new ColorThief(); // From ./color_thief_2.3.2.umd.js
					resolve(colorThief.getColor(img));
				}
			);
		}
	);
}
