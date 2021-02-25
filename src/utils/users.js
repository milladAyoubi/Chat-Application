const users = []



//Adding and Removing User From Each Room and keeping track of all Users in specific room 



const addUser = ({ userID, userName, chatRoom }) => {
    userName = userName.trim().toLowerCase()
    chatRoom = chatRoom.trim().toLowerCase()



    if (!userName || !chatRoom) {
        return {
            error: 'UserName anD Room are Required!'
        }
    }

    //Check if user exists
    const eUser = users.find((user) => {
        return user.chatRoom === chatRoom && user.username === userName
    })
    if (eUser) {
        return {
            error: 'Username is in use!'
        }
    }
    //storing user into the users array if there exist no other in the chat room
    const user = { userID, userName, chatRoom }
    users.push(user)
    return { user }

}


//Remove User By Finding Index in Array By ID and Returning All User Except Selected
const userRemove = (userID) => {
    const userFind = users.findIndex((user) => {
        return user.userID === userID
    })

    if (userFind != -1)
        return users.splice(userFind, 1)[0]


}

addUser({
    userID: 22,
    userName: 'Millad',
    chatRoom: 'TorontoRoom'

})



addUser({
    userID: 23,
    userName: 'Mihai',
    chatRoom: 'TorontoRoom'

})



//Testing 
console.log(users)
userRemove(22)