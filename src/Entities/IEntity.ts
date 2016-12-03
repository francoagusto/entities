import {IDestroyable} from "IDestroyable";
import {IComponent} from "IComponent";

export interface IEntity extends IDestroyable
{
	addComponent(component:IComponent):void;
	removeComponent(component:IComponent):void;
	setProperty(name:String, value:any):void;
	getProperty(name:String):any;
	registerProperty(name:String, getter:any, setter:any):void;
	registerCallback(name:String, callback:any, scope:any):void;
	callCallback(name:String):void;

}