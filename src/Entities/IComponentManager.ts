import {IComponent} from "./IComponent";

export interface IComponentManager
{		
	registerComponent(component:IComponent):void;
	unregisterComponent(component:IComponent):void;
}