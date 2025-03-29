The match aggreagate is created when:  
    - user accepts the invitation
    - user sends the invitation
    - user clicks "start a game with ai btn"

The match aggregate is being saved on the server;

If the user sends many game requests, the array with matches is being saved in the server;


Match tables saved in the db :

matchId / playerA_id / playerB_id / status / winner / dateCreated(later replaced with dateOfTheActualGame, when status changes to finished)

match is deleted from the db if the invitation is pending for longer than 10min ??