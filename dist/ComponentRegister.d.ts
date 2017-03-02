import { IComponentManager } from "./IComponentManager";
import { IComponent } from "./IComponent";
export declare class ComponentRegister implements IComponentManager {
    private managerByType;
    constructor();
    registerComponentManager(type: string, manager: IComponentManager): void;
    unregisterComponentManager(type: string, manager: IComponentManager): void;
    registerComponent(component: IComponent): void;
    unregisterComponent(component: IComponent): void;
}
