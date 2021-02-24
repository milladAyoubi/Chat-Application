const users = []



//Adding and Removing User From Each Room and keeping track of all Users in specific room 



const addUser = ({ userId, userName, chatRoom }) => {
    userName = userName.trim().toLowerCase()
    room = room.trim().toLowerCase()



    if (!userName || !chatRoom) {
        return {
            error: 'UserName and Room are Required!'
        }
    }
}