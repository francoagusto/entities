define(["require", "exports", "typescript-collections"], function (require, exports, typescript_collections_1) {
    "use strict";
    var FunctionWrapper = (function () {
        function FunctionWrapper(callback, scope) {
            this.callback = callback;
            this.scope = scope;
        }
        return FunctionWrapper;
    }());
    var Entity = (function () {
        function Entity(componentRegister) {
            if (componentRegister === void 0) { componentRegister = null; }
            this.componentRegister = componentRegister;
            this.componentsByType = new typescript_collections_1.Dictionary();
            this.callbacksMap = new typescript_collections_1.Dictionary();
            this.refernceMap = new typescript_collections_1.Dictionary();
            this.registerCallback(Entity.destroyCallback, this.destroy, this);
        }
        Entity.prototype.isDestroyed = function () {
            return this.destroyed;
        };
        Entity.prototype.addComponent = function (component) {
            var dependencies = component.getDependencies();
            if (dependencies != null) {
                for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
                    var dependency = dependencies_1[_i];
                    if (!this.componentsByType.containsKey(dependency)) {
                        throw "Entity doesn't have the component dependency:" + dependency;
                    }
                }
            }
            var type = component.getType();
            var components = this.componentsByType.containsKey(type) ? this.componentsByType.getValue(type) : null;
            if (components == null) {
                components = [];
                this.componentsByType.setValue(type, components);
            }
            components.push(component);
            component.setOwner(this);
            if (this.componentRegister != null) {
                this.componentRegister.registerComponent(component);
            }
        };
        Entity.prototype.removeComponent = function (component) {
            if (this.componentRegister != null) {
                this.componentRegister.unregisterComponent(component);
            }
            var type = component.getType();
            var components = this.componentsByType.getValue(type);
            components.splice(components.indexOf(component), 1);
            if (components.length <= 0) {
                this.componentsByType.remove(type);
            }
        };
        Entity.prototype.getRegistredReference = function (id) {
            return this.refernceMap.getValue(id);
        };
        Entity.prototype.registerReference = function (id, propertyReference) {
            this.refernceMap.setValue(id, propertyReference);
        };
        Entity.prototype.registerCallback = function (id, callback, scope) {
            this.callbacksMap.setValue(id, new FunctionWrapper(callback, scope));
        };
        Entity.prototype.callCallback = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var functionWrapper = this.callbacksMap.getValue(id);
            if (functionWrapper != null) {
                return functionWrapper.callback.apply(functionWrapper.scope, args);
            }
            return null;
        };
        Entity.prototype.destroy = function () {
            var componentsTypes = this.componentsByType.values();
            for (var _i = 0, componentsTypes_1 = componentsTypes; _i < componentsTypes_1.length; _i++) {
                var components = componentsTypes_1[_i];
                for (var _a = 0, components_1 = components; _a < components_1.length; _a++) {
                    var component = components_1[_a];
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
        };
        return Entity;
    }());
    exports.Entity = Entity;
    Entity.destroyCallback = "destroy";
});
