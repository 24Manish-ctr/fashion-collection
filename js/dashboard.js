
document.getElementById("productForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("productName").value
    );

    formData.append(
        "price",
        document.getElementById("productPrice").value
    );

    formData.append(
        "category",
        document.getElementById("category").value
    );

    formData.append(
        "description",
        document.getElementById("description").value
    );

    formData.append(
        "image",
        document.getElementById("image").files[0]
    );

    try {

        const response = await fetch(
            "http://localhost:5000/api/products/add",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log(data);

        if (data.success) {

            alert("Product Added Successfully!");

            document
                .getElementById("productForm")
                .reset();

        } else {

            alert(data.message);
        }

    } catch (err) {

        console.error(err);

        alert("API Error");
    }
});

function logout() {

    localStorage.removeItem("token");

    window.location.href = "admin-login.html";
}
