import * as React from "react";
import * as SRD from 'storm-react-diagrams';

import { If as IfModel } from '../Models/If';

export interface IfProps {
    model: IfModel;

    diagramEngine: any;
}

export interface IfState{
}


export class If extends React.Component<IfProps, IfState> {

    public static defaultProps: IfProps = {
        model: null,

        diagramEngine: null,
    };

    public constructor(props: IfProps) {
        super(props);
        this.state = {
        }
    }

    public render()
    {
        let self = this;
        return (
            <div className="basic-node questions-node" style={{
                width: "300px",
                background: "rgb(0, 192, 255)"
            }}>
                <div className="title">
                    If
                    <div className="fa fa-close" onClick={() => {
                        self.props.model.remove();
                        self.props.diagramEngine.repaintCanvas();
                    }} />
                </div>
                <div className="ports">
                    <div className="in">
                        <SRD.DefaultPortLabel model={this.props.model.ports.input} key="input" />
                    </div>
                    <div className="out">
                        <SRD.DefaultPortLabel model={this.props.model.ports.success} key="success" />
                        <SRD.DefaultPortLabel model={this.props.model.ports.failure} key="failure" />
                    </div>
                </div>
            </div>
        );
    }
}
