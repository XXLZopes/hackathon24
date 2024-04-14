async function forceLogin() {
    console.log("forcing");


    try {
        const response = await fetch(`http://localhost:3500/user/`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
            window.location.replace("login.html");

        } else if (data.message == "Not logged in.") {
            window.location.replace("login.html");
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


forceLogin();