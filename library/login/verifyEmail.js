async function verifyEmail(email, code) {

    console.log(email, code);
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
    }).catch(error => {
        console.error('There was an error', error);
        return false;
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