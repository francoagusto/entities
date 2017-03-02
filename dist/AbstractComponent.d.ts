import { IComponent } from "./IComponent";
import { IDestroyable } from "./IDestroyable";
import { IEntity } from "./IEntity";
export declare class AbstractComponent implements IComponent, IDestroyable {
    protected owner: IEntity;
    protected destroyed: boolean;
    constructor();
    setOwner(owner: IEntity): void;
    isDestroyed(): boolean;
    getDependencies(): Array<string>;
    getType(): string;
    setup(): void;
    destroy(): void;
}
