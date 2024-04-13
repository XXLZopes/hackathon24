async function getCoursesOnDay(userId, weekday) {
    const apiUrl = getApiEndPoint()

    await fetch(apiUrl)
    .then(response => {
        console.log(response.json())
        return response.json()
    })
}
