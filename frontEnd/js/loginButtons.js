let emailEl = document.querySelector("#emailInput");
let url = "http://localhost:3500";
let email;

function displaySubmit() {
  email = document.querySelector("#emailInput").value;

  const regex = /@humboldt\.edu$/;
  const result = regex.test(email);
  console.log(result); // Output will be true or false

  if (!result) {
    alert('You must enter a Humboldt email address.');
    window.location.reload();
  }

  if (!email) {
    alert("Please enter an email.");
    return;
  } else {
    document.querySelector("#loginEmail").querySelector("#emailLabel").innerHTML = 'Enter Code:'
    document.querySelector("#loginEmail").querySelector("#emailInput").setAttribute('type','number');
    document.querySelector("#loginEmail").querySelector("#emailInput").setAttribute('type','text');
    document.querySelector("#loginEmail").querySelector("#emailInput").setAttribute('id','codeInput');
    document.querySelector("#loginEmail").querySelector("#sendCode").setAttribute('onclick','verifyEmail()');
    emailEl = document.querySelector("#emailInput");
  }
}

// SEND CODE LOGIC
async function sendEmail() {
  const requestData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
    credentials: "include",
  };

  fetch(url + "/verify/send-code/", requestData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Somethings wrong!!!");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      console.log("Code sent!");
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
  const code = document.querySelector("#codeInput").value;
  if (!code) {
    alert("Please enter a code.");
    return;
  }

  const requestData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, code: code }),
    credentials: "include",
  };

  const isVerified = await fetch(url + "/verify/verify-code/", requestData)
    .then((response) => {
      // console.log(response)
      return response.json();
    })
    .then((data) => {
      console.log("data.verified: ", data.verified);
      return data.verified;
    })
    .catch((error) => {
      console.error("There was an error!", error);
      alert("Login failed. Please try again.");
    });

  if (isVerified) {
    fetch(url + "/user/login/", requestData)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("data.verified: ", data);
        if (!data.firstName)
          window.location.href = "./account.html";
        else
          window.location.href = "./studentHomepage.html";
        return data.verified;
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Login failed. Please try again.");
      });
  }
}

const sendCodeEl = document.querySelector("#sendCode");

sendCodeEl.addEventListener("click", () => {
  if (email) {
    sendEmail();
    sendCodeEl
    var new_element = sendCodeEl.cloneNode(true);
    sendCodeEl.parentNode.replaceChild(new_element, sendCodeEl);
  }
});
