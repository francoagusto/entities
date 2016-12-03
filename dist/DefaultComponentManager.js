define(["require", "exports"], function (require, exports) {
    "use strict";
    var DefaultComponentManager = (function () {
        function DefaultComponentManager() {
            this.components = [];
        }
        DefaultComponentManager.prototype.registerComponent = function (component) {
            this.components.push(component);
        };
        DefaultComponentManager.prototype.unregisterComponent = function (component) {
            this.components.splice(this.components.indexOf(component), 1);
        };
        return DefaultComponentManager;
    }());
    exports.DefaultComponentManager = DefaultComponentManager;
});
