

async function findUser()  {
    await fetch("http://localhost:3500/user/userNames").then((result) => {
    return result.json().then((data)=>{
        courses=data;
    })
  })
}