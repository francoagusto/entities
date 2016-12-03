import {IComponent} from "IComponent";
import {IDestroyable} from "IDestroyable";
import {IEntity} from "IEntity";

export class AbstractComponent implements IComponent, IDestroyable {

    private owner:IEntity;
    private destroyed:boolean;

    constructor() {
    }

    public setOwner(owner:IEntity):void {
        this.owner = owner;
        this.setup();
    }

    public isDestroyed():boolean {
        return this.destroyed;
    }

    public getDependencies():Array<string> {
        return null;
    }

    public getType():string {
        throw Error("AbstractComponent.getType not overrided. Please implement this method");
    }

    public setup():void {
        throw Error("You must override this method, here the owner is available to start your component");
    }

    public destroy():void {
        this.owner = null;
        this.destroyed = true;
    }

}