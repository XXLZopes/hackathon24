async function getStudyGroupSessions(studyGroupId) {
    const apiUrl = "http://localhost:3500"

    await fetch(apiUrl)
    .then(response => {
        console.log(response.json())
        return response.json()
    })
}

