const avatarUpload = document.querySelector("#avatar-upload-div");
const avatarInput = document.querySelector("#avatar-input");

avatarUpload.addEventListener("click", () => avatarInput.click());

avatarInput.addEventListener
(
	"change",
	async () =>
	{
		const base64Img = await getBase64(avatarInput.files[0]);
		console.log(base64Img);

		const dominantColour = await getDominantColour(base64Img);
		console.log("The dominant colour in uploaded image is RGB(" + dominantColour + ").");
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
					const colorThief = new ColorThief();
					resolve(colorThief.getColor(img));
				}
			);
		}
	);
}
