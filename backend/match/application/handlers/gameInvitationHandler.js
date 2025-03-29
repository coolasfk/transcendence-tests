import EventBus from "../../infrastructure/EventBus";


EventBus.subscribe("game_invitation_sent", (data) => {
    io.to(data.oponnentId).emit("invitation_received", {
        matchId: data.matchId,
    })
})