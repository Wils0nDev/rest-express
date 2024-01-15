

export class TodoEntity {
    constructor(
        public id:number,
        public text : string,
        public completedAt ? : Date | null
    ){}

    get isCompleted(){
        return !!this.completedAt;
    }

    public static fromObject(object:{[key:string]:any}) : TodoEntity{
        let newCompletedAt;
        const {id,text,completedAt} = object;
        if(!id) throw 'Id is required';
        if(!text) throw 'Textd is required';
        if(completedAt){
            newCompletedAt = new Date(completedAt)
            if(isNaN(newCompletedAt.getTime())){
                throw 'CompletedAt is not valid date'
            }
        }
       return new TodoEntity(id,text, newCompletedAt)
    }
}