define(["require", "exports", "typescript-collections"], function (require, exports, typescript_collections_1) {
    "use strict";
    var Entity = (function () {
        function Entity(componentRegister) {
            if (componentRegister === void 0) { componentRegister = null; }
            this.componentRegister = componentRegister;
            this.componentsByType = new typescript_collections_1.Dictionary();
            this.propertiesSettersMap = new typescript_collections_1.Dictionary();
            this.propertiesGettersMap = new typescript_collections_1.Dictionary();
            this.callbacksMap = new typescript_collections_1.Dictionary();
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
            assert.ok(!this.componentsByType.containsKey(type), "Entity doesn't have component :" + type);
            var components = this.componentsByType.getValue(type);
            components.splice(components.indexOf(component), 1);
            if (components.length <= 0) {
                this.componentsByType.remove(type);
            }
        };
        Entity.prototype.setProperty = function (name, value) {
            var setterFunction = this.propertiesSettersMap.getValue(name);
            if (setterFunction != null) {
                setterFunction(value);
            }
        };
        Entity.prototype.getProperty = function (name) {
            var getterFunction = this.propertiesGettersMap.getValue(name);
            if (getterFunction != null) {
                return getterFunction();
            }
            return null;
        };
        Entity.prototype.registerProperty = function (name, getter, setter) {
            if (setter === void 0) { setter = null; }
            this.propertiesSettersMap.setValue(name, setter);
            this.propertiesGettersMap.setValue(name, getter);
        };
        Entity.prototype.registerCallback = function (name, callback, scope) {
            this.callbacksMap.setValue(name, callback.bind(scope));
        };
        Entity.prototype.callCallback = function (name) {
            var callback = this.callbacksMap.getValue(name);
            if (callback != null) {
                callback();
            }
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
            this.componentsByType = null;
            this.propertiesSettersMap = null;
            this.propertiesGettersMap = null;
            this.callbacksMap = null;
            this.destroyed = true;
        };
        return Entity;
    }());
    exports.Entity = Entity;
    Entity.destroyCallback = "destroy";
});
