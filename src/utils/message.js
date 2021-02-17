const genMessage = (msg) => {
    return {
        msg,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    genMessage
}