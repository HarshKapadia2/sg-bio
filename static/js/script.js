const avatarUpload = document.querySelector("#avatar-upload-div");
const avatarInput = document.querySelector("#avatar-input");

avatarUpload.addEventListener("click", () => avatarInput.click());

avatarInput.addEventListener("change", () => getBase64(avatarInput.files[0]));

function getBase64(file)
{
	const reader = new FileReader();

	reader.readAsDataURL(file);
	reader.onload = () => console.log(reader.result);
	reader.onerror = (err) => console.error(err);
}
