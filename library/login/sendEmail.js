async function sendEmail(email) {
  const apiUrl = getApiEndPoint().concat("/verify/send-code");

  const requestData = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
    credentials: "include",
  };

  fetch("/verify/send-code", requestData)
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
      console.log("There was an error!", error);
      alert("Failed to send code. Please try again.");
      return { emailSent: false };
    });
}
