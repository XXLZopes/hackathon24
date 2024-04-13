const emailEl = document.querySelector("#emailInput");
let url = "http://localhost:3500";
let email;

function displaySubmit() {
  email = document.querySelector("#emailInput").value;
  if (!email) {
    alert("Please enter an email.");
    return;
  } else {
    document.querySelector("#loginEmail").innerHTML =
      '<label for="code">Code:</label> <input type="text" name="code" id="codeInput"/> <button id="submit" onclick="verifyEmail()">Submit</button>';
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
      console.log("Email: " + email);
      console.log("Code: " + code);
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
        window.location.href = "./homepage.html";
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
  }
});
