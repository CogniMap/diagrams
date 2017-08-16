import * as React from 'react';
import * as SRD from 'storm-react-diagrams';

import { NodeType, Node as NodeModel } from './Models/Node';
import { If as LogicIfModel } from './Models/Logic/If';

import { If as LogicIf } from './Nodes/Logic/If';

class NodeWidgetFactory extends SRD.NodeWidgetFactory
{
    public type : string;

    public constructor(type : string) {
        super(type);
        this.type = type;
    }

    public generateReactWidget(engine : SRD.DiagramEngine, node : SRD.NodeModel)
    {
        switch (this.type) {
            case NodeType.LOGIC_IF:
                return <LogicIf model={node as LogicIfModel} diagramEngine={engine} />;
            default:
                return  null;
        }
    }
}

export function registerNodeFactories(engine)
{
    let allTypes = [NodeType.LOGIC_IF];
    for (let type of allTypes) {
        engine.registerNodeFactory(new NodeWidgetFactory(type));
    }
}
