import { IDestroyable } from "./IDestroyable";
import { IComponent } from "./IComponent";
export interface IEntity extends IDestroyable {
    addComponent(component: IComponent): void;
    removeComponent(component: IComponent): void;
    registerReference<T extends Object>(id: string, property: T): void;
    getRegistredReference<T extends Object>(id: string): T;
    registerCallback(id: string, callback: (any) => any, scope: any): void;
    callCallback(id: string, ...args: any[]): any;
}
