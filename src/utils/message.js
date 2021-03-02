const genMessage = (user, msg) => {
    return {
        user,
        msg,
        createdAt: new Date().getTime()
    }
}

const MessageLocation = (user, location) => {
    return {
        user,
        location,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    genMessage,
    MessageLocation
}