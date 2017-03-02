import {IDestroyable} from "./IDestroyable";
import {IComponent} from "./IComponent";

export interface IEntity extends IDestroyable
{
	addComponent(component:IComponent):void;
	removeComponent(component:IComponent):void;

	//register property
	registerReference<T extends Object>(id:string, property:T):void;
	getRegistredReference<T extends Object>(id:string):T;

	//callSetterById
	registerCallback(id:string, callback:(any)=>any, scope:any):void;
	callCallback(id:string, ...args: any[]):any;
}