const users = []



//Adding and Removing User From Each Room and keeping track of all Users in specific room 

const addUsers = ({ userID, userName, chatRoom }) => {
    userName = userName.trim()
    chatRoom = chatRoom.trim()



    if (!userName || !chatRoom) {
        return {
            error: 'UserName anD Room are Required!'
        }
    }

    //Check if user exists
    const eUser = users.find((user) => {
        return user.chatRoom === chatRoom && user.userName === userName


    })
    if (eUser) {

        return {
            error: 'User Already Exists In Room!'
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



const getUser = (userID) => {
    const findUser = users.find((user) => {
        return user.userID === userID



    })

    if (findUser != undefined)
        return findUser
    else
        return {
            error: 'Username Dose Not Exists!'
        }




}

const getUsersRoom = (room) => {
    const userRoom = users.filter((user) => {
        return user.chatRoom === room
    })

    return userRoom
}

addUsers({
    userID: 22,
    userName: 'Millad',
    chatRoom: 'TorontoRoom'

})



addUsers({
    userID: 23,
    userName: 'Mihai',
    chatRoom: 'TorontoRoom'

})

addUsers({
    userID: 24,
    userName: 'Micheal',
    chatRoom: 'CoolRoom'

})


module.exports = {
    addUsers,
    userRemove,
    getUser,
    getUsersRoom
}