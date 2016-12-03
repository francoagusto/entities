import {IEntity} from "IEntity";
import {IComponent} from "IComponent";
import {ComponentRegister} from "ComponentRegister";
import {Dictionary} from "typescript-collections";

export class Entity implements IEntity {

    public static destroyCallback:string = "destroy";

    private destroyed:boolean;


    private componentsByType:Dictionary<string, IComponent[]> = new Dictionary<string, IComponent[]>();

    private propertiesSettersMap:Dictionary<string, (any)=>void> = new Dictionary<string, (any)=>void>();
    private propertiesGettersMap:Dictionary<string, ()=>any> = new Dictionary<string, ()=>any>();

    private callbacksMap:Dictionary<string, ()=>void> = new Dictionary<string, ()=>void>();


    constructor(private componentRegister:ComponentRegister = null) {
        this.registerCallback(Entity.destroyCallback, this.destroy, this);
    }

    /* IEntity */
    public isDestroyed():boolean {
        return this.destroyed;
    }

    public addComponent(component:IComponent):void {
        var dependencies:Array<any> = component.getDependencies();
        if (dependencies != null) {
            for (var dependency of dependencies) {
                if (!this.componentsByType.containsKey(dependency)) {
                    throw "Entity doesn't have the component dependency:" + dependency;
                }
            }
        }


        var type:string = component.getType();

        var components:IComponent[] = this.componentsByType.containsKey(type) ? this.componentsByType.getValue(type) : null;
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

    public removeComponent(component:IComponent):void {
        if (this.componentRegister != null) {
            this.componentRegister.unregisterComponent(component);
        }

        var type:string = component.getType();

        var components:IComponent[] = this.componentsByType.getValue(type);

        //remove
        components.splice(components.indexOf(component), 1);

        //remove type if components are empty
        if (components.length <= 0) {
            this.componentsByType.remove(type);
        }
    }


    public setProperty(name:string, value:any):void {
        var setterFunction:(any)=>void = this.propertiesSettersMap.getValue(name);

        if (setterFunction != null) {
            setterFunction(value);
        }
    }

    public getProperty(name:string):any {
        var getterFunction:()=>any = this.propertiesGettersMap.getValue(name);

        if (getterFunction != null) {
            return getterFunction();
        }
        return null;
    }

    public registerProperty(name:string, getter:any, setter:any = null):void {
        this.propertiesSettersMap.setValue(name, setter);
        this.propertiesGettersMap.setValue(name, getter);
    }

    public registerCallback(name:string, callback:()=>void, scope:any):void {
        this.callbacksMap.setValue(name, callback.bind(scope));
    }

    public callCallback(name:string):void {
        var callback:()=>void = this.callbacksMap.getValue(name);

        if (callback != null) {
            callback();
        }
    }

    public destroy():void {
        var componentsTypes:IComponent[][] = this.componentsByType.values();

        for (var components of componentsTypes) {
            for (var component of components) {
                this.componentRegister.unregisterComponent(component);
                component.destroy();
            }
        }

        this.componentsByType = null;
        this.propertiesSettersMap = null;
        this.propertiesGettersMap = null;
        this.callbacksMap = null;

        this.destroyed = true;
    }

}