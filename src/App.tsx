import * as SRD from "storm-react-diagrams";
import * as React from "react";
const differenceWith = require('lodash/differenceWith');

import { registerNodeFactories } from './NodeWidgetFactory';
import { Questions as QuestionsModel } from './Models/Questions';

interface Props {
    graph: Graph;
}

interface State {
}

interface Graph {
    nodes: any[], // Node models
    links: {
        uid: string; // <from uid>_<to uid>
        source: any; // Port model
        target: any; // Port model
        model: any;
    }[];
}

export class App extends React.Component<Props, State>
{
    private engine;
    private model;

    public static defaultProps = {
        graph: {
            nodes: [],
            links: [],
        },
    }

    public constructor(props)
    {
        super(props);
        this.state = {
        };

        //1) setup the diagram engine
        let engine = this.engine = new SRD.DiagramEngine();
        engine.registerNodeFactory(new SRD.DefaultNodeFactory());
        engine.registerLinkFactory(new SRD.DefaultLinkFactory());
        registerNodeFactories(engine);

        // 2) Setup the diagram model
        this.model = new SRD.DiagramModel();
        engine.setDiagramModel(this.model);

	this.updateGraphModels(this.props.graph);
    }

    public compoenentWillReceiveProps(nextProps)
    {
        this.updateGraphModels(nextProps.graph);
    }


    private updateGraphModels(graph : Graph)
    {
        //this.model = new SRD.DiagramModel();
        let self = this;
        const uidIsEqual = (n1, n2) => n1.uid == n2.uid;

        // Diff links
        differenceWith(self.state.graph.links, graph.links, uidIsEqual).map(link => {
            // Link removed
            link.model.remove();
        });
        let promises = differenceWith(graph.links, self.state.graph.links, uidIsEqual).map(link => {
            function waitPortsReady(ports, callback) {
                return new Promise((resolve, reject) => {
                    function _waitPortsReady(ports, callback) {
                        for (let port of ports) {
                            // Code from react-diagrams internals :
                            let selector = self.engine.canvas.querySelector('.port[data-name="' + port.getName() + '"][data-nodeid="' + port.getParent().getID() + '"]');
                            if (selector == null) {
                                setTimeout(() => _waitPortsReady(ports, callback), 10);
                                return;
                            }
                        }
                        resolve();
                        callback();
                    }
                    _waitPortsReady(ports, callback);
                });
            }
            // Link added : create the model
            let linkModel = new SRD.LinkModel();
            linkModel.setSourcePort(link.source);
            linkModel.setTargetPort(link.target);
            link.model = linkModel;

            // Wait for edges nodes to be "painted", because links use the DOM to find ports locations
            return waitPortsReady([link.source, link.target], () => self.model.addLink(linkModel));
        });

        // Diff nodes
        differenceWith(this.state.graph.nodes, graph.nodes, uidIsEqual).map(node => {
            // Nodes removed
            node.remove();
        });
        differenceWith(graph.nodes, this.state.graph.nodes, uidIsEqual).map(node => {
            // Nodes added
            self.model.addNode(node);
        });
        Promise.all(promises).then(() => self.engine.repaintCanvas());
    }

    public render()
    {
        return (
            <div>
                <div id="container">
                    <SRD.DiagramWidget
                        diagramEngine={this.engine}
                        allowLooseLinks={false}
                        allowCanvasZoom={true}
                        allowCanvasTranslation={true}
                    />
		</div>
            </div>
	);
    }
}
