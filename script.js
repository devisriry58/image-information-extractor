async function processImage() {
    const file = document.getElementById("imageInput").files[0];
    if (!file) {
        alert("Please upload an image");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = async function () {
        const base64Image = reader.result.split(",")[1];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "input_text", text: "Extract all readable information from this image." },
                            { type: "input_image", image_url: `data:image/png;base64,${base64Image}` }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        const extracted = data.choices[0].message.content;

        document.getElementById("result").innerText = extracted;

        const csv = "data:text/csv;charset=utf-8,Information\n" +
                    extracted.replace(/\n/g, " ");

        const link = document.getElementById("downloadLink");
        link.setAttribute("href", encodeURI(csv));
        link.setAttribute("download", "extracted_data.csv");
        link.style.display = "block";
        link.innerText = "Download Excel (CSV)";
    };

    reader.readAsDataURL(file);
}
