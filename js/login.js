
document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const error =
    document.getElementById("errorMsg");

    /* Temporary Admin Login */

    if(
        email === "admin@fashion.com" &&
        password === "fashion@123"
    ){

        window.location.href =
        "admin-dashboard.html";

        return;
    }

    /* MongoDB Login API */

    try{

        const response = await fetch(
            "http://localhost:5000/api/admin/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if(data.success){

            localStorage.setItem(
                "token",
                data.token
            );

            window.location.href =
            "admin-dashboard.html";

        }else{

            error.innerText =
            data.message;

        }

    }catch(err){

        error.innerText =
        "Invalid Email or Password";

    }

});