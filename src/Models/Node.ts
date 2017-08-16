import * as SRD from 'storm-react-diagrams';

export namespace NodeType {
    export const LOGIC_IF = 'logic.if';
}

export class Node extends SRD.NodeModel
{
    public type : string;
    public uid : string;

    public constructor(uid : string, type : string)
    {
        super(type);
        this.uid = uid;
        this.type = type;
    }

    public getType() : string
    {
        return this.type;
    }
}
