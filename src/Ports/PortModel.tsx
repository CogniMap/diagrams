import * as SRD from 'storm-react-diagrams';

export class PortModel extends SRD.PortModel
{
    private position : string|'top'|'bottom'|'left'|'right';

    constructor (pos : string = 'top')
    {
        super(pos);
        this.position = pos;
    }
}
