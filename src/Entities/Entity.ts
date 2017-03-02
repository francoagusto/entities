import { IEntity } from "./IEntity";
import { IComponent } from "./IComponent";
import { ComponentRegister } from "./ComponentRegister";
import { Dictionary } from "typescript-collections";

class FunctionWrapper {
    constructor(public callback: (any) => any, public scope: any) {
    }
}

export class Entity implements IEntity {

    static destroyCallback: string = "destroy";

    private destroyed: boolean;

    private componentsByType: Dictionary<string, IComponent[]> = new Dictionary<string, IComponent[]>();
    private callbacksMap: Dictionary<string, FunctionWrapper> = new Dictionary<string, FunctionWrapper>();
    private refernceMap: Dictionary<string, any> = new Dictionary<string, any>();


    constructor(private componentRegister: ComponentRegister = null) {
        this.registerCallback(Entity.destroyCallback, this.destroy, this);
    }




    /* IEntity */
    isDestroyed(): boolean {
        return this.destroyed;
    }

    addComponent(component: IComponent): void {
        var dependencies: Array<any> = component.getDependencies();
        if (dependencies != null) {
            for (var dependency of dependencies) {
                if (!this.componentsByType.containsKey(dependency)) {
                    throw "Entity doesn't have the component dependency:" + dependency;
                }
            }
        }


        var type: string = component.getType();

        var components: IComponent[] = this.componentsByType.containsKey(type) ? this.componentsByType.getValue(type) : null;
        if (components == null) {
            components = [];
            this.componentsByType.setValue(type, components);
        }
        components.push(component);
        component.setOwner(this);

        if (this.componentRegister != null) {
            this.componentRegister.registerComponent(component);
        }
    }

    removeComponent(component: IComponent): void {
        if (this.componentRegister != null) {
            this.componentRegister.unregisterComponent(component);
        }

        var type: string = component.getType();

        var components: IComponent[] = this.componentsByType.getValue(type);

        //remove
        components.splice(components.indexOf(component), 1);

        //remove type if components are empty
        if (components.length <= 0) {
            this.componentsByType.remove(type);
        }
    }


	
	getRegistredReference<T extends Object>(id:string):T {
        return this.refernceMap.getValue(id);
    }


    registerReference<T extends Object>(id:string, propertyReference:T):void {
        this.refernceMap.setValue(id, propertyReference);
    }

    registerCallback(id: string, callback: () => void, scope: any): void {
        this.callbacksMap.setValue(id, new FunctionWrapper(callback, scope));
    }

    callCallback(id: string, ...args:any[]):any {
        var functionWrapper: FunctionWrapper = this.callbacksMap.getValue(id);

        if (functionWrapper != null) {
           return functionWrapper.callback.apply(functionWrapper.scope, args);
        }
        return null;
    }

    destroy(): void {
        var componentsTypes: IComponent[][] = this.componentsByType.values();

        for (var components of componentsTypes) {
            for (var component of components) {
                this.componentRegister.unregisterComponent(component);
                component.destroy();
            }
        }

        this.componentsByType.clear();
        this.componentsByType = null;

        this.refernceMap.clear();
        this.refernceMap = null;

        this.callbacksMap.clear();
        this.callbacksMap = null;

        this.destroyed = true;
    }

}