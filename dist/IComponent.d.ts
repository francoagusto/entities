import { IDestroyable } from "./IDestroyable";
import { IEntity } from "./IEntity";
export interface IComponent extends IDestroyable {
    getType(): string;
    getDependencies(): Array<any>;
    setup(): void;
    setOwner(owner: IEntity): void;
}
