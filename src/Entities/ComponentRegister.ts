import {IComponentManager} from "IComponentManager";
import {Dictionary} from "typescript-collections";
import {IComponent} from "IComponent";

export class ComponentRegister implements IComponentManager
{
	
	private managerByType:Dictionary<string, IComponentManager>;
	
	constructor()
	{
		this.managerByType = new Dictionary<string, IComponentManager>();
	}
	
	public registerComponentManager(type:string, manager:IComponentManager):void
	{
		this.managerByType.setValue(type, manager);
	
	}
	
	public unregisterComponentManager(type:string, manager:IComponentManager):void
	{
		this.managerByType.remove(type);
	}
	
	public registerComponent(component:IComponent):void
	{
		var type:string = component.getType();
		
		var componentManager:IComponentManager = this.managerByType.getValue(type);
		
		//exist manager for that kind of component
		if(componentManager !=null) {
			componentManager.registerComponent(component);
		}
	}
	
	public unregisterComponent(component:IComponent):void
	{
		var type:string = component.getType();
		
		var componentManager:IComponentManager = this.managerByType.getValue(type);
		
		//exist manager for that kind of component
		if(componentManager !=null) {
			componentManager.unregisterComponent(component);
		}
	}
	
}