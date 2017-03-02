import { IEntity } from "./IEntity";
import { IComponent } from "./IComponent";
import { ComponentRegister } from "./ComponentRegister";
export declare class Entity implements IEntity {
    private componentRegister;
    static destroyCallback: string;
    private destroyed;
    private componentsByType;
    private callbacksMap;
    private refernceMap;
    constructor(componentRegister?: ComponentRegister);
    isDestroyed(): boolean;
    addComponent(component: IComponent): void;
    removeComponent(component: IComponent): void;
    getRegistredReference<T extends Object>(id: string): T;
    registerReference<T extends Object>(id: string, propertyReference: T): void;
    registerCallback(id: string, callback: () => void, scope: any): void;
    callCallback(id: string, ...args: any[]): any;
    destroy(): void;
}
