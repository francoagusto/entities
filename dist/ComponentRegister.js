define(["require", "exports", "typescript-collections"], function (require, exports, typescript_collections_1) {
    "use strict";
    var ComponentRegister = (function () {
        function ComponentRegister() {
            this.managerByType = new typescript_collections_1.Dictionary();
        }
        ComponentRegister.prototype.registerComponentManager = function (type, manager) {
            this.managerByType.setValue(type, manager);
        };
        ComponentRegister.prototype.unregisterComponentManager = function (type, manager) {
            this.managerByType.remove(type);
        };
        ComponentRegister.prototype.registerComponent = function (component) {
            var type = component.getType();
            var componentManager = this.managerByType.getValue(type);
            if (componentManager != null) {
                componentManager.registerComponent(component);
            }
        };
        ComponentRegister.prototype.unregisterComponent = function (component) {
            var type = component.getType();
            var componentManager = this.managerByType.getValue(type);
            if (componentManager != null) {
                componentManager.unregisterComponent(component);
            }
        };
        return ComponentRegister;
    }());
    exports.ComponentRegister = ComponentRegister;
});
