import { NodeType, Node } from './Node';
import * as SRD from 'storm-react-diagrams';

export class If extends Node
{
    public ports: {
        input: any;
        success: any;
        failure: any;
    };
    public items : string[];

    public constructor(uid : string, items: string[])
    {
        super(uid, NodeType.QUESTIONS);

        this.items = items;
        this.ports = {
            input: this.addPort(new SRD.DefaultPortModel(true, "input", "Entrée")),
            failure: this.addPort(new SRD.DefaultPortModel(false, "failure", "Echec")),
            success: this.addPort(new SRD.DefaultPortModel(false, "success", "Succès")),
        };
    }
}
