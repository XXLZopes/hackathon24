let url = "http://localhost:3500";
// SEND CODE LOGIC
async function sendEmail() {
    const emailEl = document.querySelector("#email");
    const email = emailEl.value;

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
      credentials: "include",
    };
  
    fetch(url+"/verify/send-code/", requestData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Somethings wrong!!!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        alert("Code sent!");
        return { emailSent: true };
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Failed to send code. Please try again.");
        return { emailSent: false };
      });
  }


//VERIFY EMAIL
async function verifyEmail() {
    const email = document.querySelector('#email').value;
    const code = document.querySelector('#code').value;

    if (!email || !code) {
        alert('Please enter an email address and a code.');
        return;
    }

    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, code: code }),
        credentials: 'include'
    };

    const isVerified = await fetch(url+'/verify/verify-code/', requestData)
        .then(response => {
            // console.log(response)
            return response.json();
        })
        .then(data => {
            console.log("data.verified: ", data.verified);
            return data.verified;
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert('Login failed. Please try again.');
        });
    
    if (isVerified) {
        fetch(url+'/user/login/', requestData)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log("data.verified: ", data);
            // window.location.href = ("./loggedIn.html");
            return data.verified;
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert('Login failed. Please try again.');
        });
    }
}

const sendCodeEl = document.querySelector("#sendCode");
const submitEl = document.querySelector("#submit");

sendCodeEl.addEventListener("click", () => {
  sendEmail();
});
submitEl.addEventListener("click", () => {
    verifyEmail();
  });