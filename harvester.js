var harvester = {
    run: function(isWorking, creep){
        this.chooseTargetResource(creep);
        console.log(creep.name)

        if(isWorking){
            creep.memory.storeTargetPath = "[]";
            this.findPathToResource(creep);
            var parsedSpawnToResource = JSON.parse(creep.memory.spawnToResource);
            var targetResource = Game.getObjectById(creep.memory.targetResource);

            if(creep.harvest(targetResource) == ERR_NOT_IN_RANGE){
                creep.move(parsedSpawnToResource[0].direction)
                parsedSpawnToResource.shift();
                var stringifySpawnToResource = JSON.stringify(parsedSpawnToResource);
                creep.memory.spawnToResource = stringifySpawnToResource;
            }
        }else{
            creep.memory.spawnToResource = "[]";
            this.findPathToStorage(creep);
            var parsedStoreTargetPath =JSON.parse(creep.memory.storeTargetPath) 
            console.log("creepnotworking");
            creep.moveByPath(parsedStoreTargetPath);
            console.log(parsedStoreTargetPath);
            for(const resourceType in creep.carry) {
                console.log(Game.getObjectById(creep.memory.storeTarget));
                creep.transfer(Game.getObjectById(creep.memory.storeTarget), resourceType);
            }
        }
    },

    chooseTargetResource(creep){
        if(!creep.memory.targetResource){
            creep.memory.targetResource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE).id;
        }
    },
    findPathToResource: function(creep){
        if(creep.memory.spawnToResource == undefined) creep.memory.spawnToResource = "[]"

        var parsed = JSON.parse(creep.memory.spawnToResource);
        if(parsed.length == 0){
            const targetResource= Game.getObjectById(creep.memory.targetResource);
            const pathToTarget = creep.pos.findPathTo(targetResource);
            creep.memory.spawnToResource = JSON.stringify(pathToTarget);
        }
    },
    findPathToStorage(creep){
        // creep.memory.storeTargetPath = "[]";
        var myStructures = creep.room.find(FIND_MY_STRUCTURES,{
            filter: function(object) {
                console.log(object)
                if(object.store != null){
                    console.log(object.store.getCapacity(RESOURCE_ENERGY));
                }
                
                return object.store != null;
            }
        });
        
        if(!creep.memory.storeTarget){ 
            creep.memory.storeTarget = myStructures[0].id;
        }
        if(!creep.memory.storeTargetPath || JSON.parse(creep.memory.storeTargetPath).length == 0){
            const targetStorage = Game.getObjectById(creep.memory.storeTarget);
            const pathToTarget = creep.pos.findPathTo(targetStorage);
            console.log(JSON.stringify(pathToTarget));
            creep.memory.storeTargetPath = JSON.stringify(pathToTarget);
        }

        // console.log(myStructures);
        
    }
}

module.exports = harvester;