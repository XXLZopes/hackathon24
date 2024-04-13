const { error } = require("console");

async function verifyEmail(email, code) {

    if(!email || !code) {
        alert("No Email or Code")
        return false;
    }

    const requestData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
        credentials: "include",
      };

    const isVerified = await fetch("/verify/verify-code",requestData)
    .then(response => {
        return response.json().verified
    })

    if(isVerified)
        fetch("/user/login",requestData)
    .then(response => {
       const data = response.json()
       //todo if verified direct to main page
       return data.verified
    }).catch(error => {
        console.error("There error", error)
        alert("Login Failed")
        return false
    })
    

    




}