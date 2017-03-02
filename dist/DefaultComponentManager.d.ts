import { IComponent } from "./IComponent";
import { IComponentManager } from "./IComponentManager";
export declare class DefaultComponentManager<T extends IComponent> implements IComponentManager {
    protected components: Array<T>;
    constructor();
    registerComponent(component: T): void;
    unregisterComponent(component: T): void;
}
