module.exports = {
    isWorking: function (creep){
        var creepStorage = creep.store;
        var memory = creep.memory;
    
        if(creepStorage.getUsedCapacity() == 0 && !memory.working)
            memory.working = true
    
        else if(creepStorage.getFreeCapacity() == 0 && memory.working)
            memory.working = false;
    
        return memory.working;
    },
    cleanCreepMemory(){
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    },

    handle: function(){
        var creeps = Game.creeps;
        this.cleanCreepMemory();

        for(const i in creeps){
            
            var creep = creeps[i];
            var role = creep.memory.role;
            var functionality = require(role);
            creep.memory.room = creep.room.name;

            functionality.run(this.isWorking(creep), creep);
        }
    },
}