class DecisionRoom{

    #id
    
    static autoIncrementalId = 0
    static nextId(){ return this.autoIncrementalId ++ }
    
    static fromSettings(aDecisionRoomSettings){
        return new this(this.nextId())
    }

    constructor(anId){
        this.#id = anId
    }

    id(){
        return this.#id
    }

    identifiedAs(anId){
        return this.#id === anId
    }

}

export default DecisionRoom