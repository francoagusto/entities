import {IComponent} from "IComponent";
import {IComponentManager} from "IComponentManager";


export class DefaultComponentManager<T extends IComponent> implements IComponentManager {

    private components:Array<T>;

    constructor() {
        this.components = [];
    }

    public registerComponent(component:T):void {
        this.components.push(component);
    }

    public unregisterComponent(component:T):void {
        this.components.splice(this.components.indexOf(component), 1);
    }
}