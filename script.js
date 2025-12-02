document.getElementById("processBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;

    const response = await fetch("https://YOUR-VERCEL-NAME.vercel.app/api/process-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64: base64Image }),
    });

    const data = await response.json();
    console.log(data);

    alert("Image processed! Check browser console for result.");
  };
});
