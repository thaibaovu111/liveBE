module.exports = class Chat {
    constructor(io) {
      this.io = io
    }

    connection() {
        this.io.on('connection', socket => {
            console.log('connect successfully')
            socket.on("private message", (anotherSocketId, msg) => {
                socket.to(anotherSocketId).emit("private message", socket.id, msg);
            });
        })
    }
}
