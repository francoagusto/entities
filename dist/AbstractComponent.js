define(["require", "exports"], function (require, exports) {
    "use strict";
    var AbstractComponent = (function () {
        function AbstractComponent() {
        }
        AbstractComponent.prototype.setOwner = function (owner) {
            this.owner = owner;
            this.setup();
        };
        AbstractComponent.prototype.isDestroyed = function () {
            return this.destroyed;
        };
        AbstractComponent.prototype.getDependencies = function () {
            return null;
        };
        AbstractComponent.prototype.getType = function () {
            throw Error("AbstractComponent.getType not overrided. Please implement this method");
        };
        AbstractComponent.prototype.setup = function () {
            throw Error("You must override this method, here the owner is available to start your component");
        };
        AbstractComponent.prototype.destroy = function () {
            this.owner = null;
            this.destroyed = true;
        };
        return AbstractComponent;
    }());
    exports.AbstractComponent = AbstractComponent;
});
