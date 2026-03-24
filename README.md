# photo-tagging-app

this assignment is a part of The Odin Project curriculum ,the main goal is the practice
of all things learned  with an emphisis on server side TDD!

## MVP- requirements:
 #### Frontend
- display a single image
- detect click position
- show target selection ui
    - send data to back end with following format:
        ``` json
            {
                "playrName" "DeZohan":,
                "SW": 830,
                "SH": 320,
                " targets" :[
                    {"targetId": "waldo", "TX": 120,"TY": 50},
                    {"targetId": "wanda", "TX": 120,"TY": 50},
                    {"targetId": "odlaw", "TX": 120,"TY": 50},
                ],
            }
        
        ```
        TX = target position on the X axis;
        TY = target position on the Y axis;
        SW = screen width at time of target selection;
        SH = screen height at time of target selection;
        targetId = target name as shown in the database;
        playerName= user player name used to register a score!
 #### Backend
    ##### /finish
    - validates and sanitizes front end input
    - checks if target data overlaps with target data from the db
        * queries database for, original imgSize and target position
        ```js
            //Prisma ORM
            return prisma.findUnique({
                where: {id: mapId},
                include:{
                    targets:{
                        where:{targetId: targetId}
                    }
                }
            })
            
        ```
    - normalizes and finds the scalling factor for both W & H
    - applies resize factor to target position
    -checks if selected target position  overlaps with database targets
        with ano verlap margin of 50px  (the size of search circle in the UI)
    - sends 200 ok response

### database 

map{
    id
    targets[targetId]
}
target{
    id
    name
    Xpos
    Ypos
}
score{
    name
    mapId
    time
}

