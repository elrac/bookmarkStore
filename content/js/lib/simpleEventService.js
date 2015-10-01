define(function () {

  var createEventManager = function(){
    function EventManager(){
        this.listeners = {};
    }

    EventManager.prototype.addListener = function(trigger,listener){
        if(!this.listeners[trigger]){
            this.listeners[trigger] = [];
        }
        this.listeners[trigger] = this.listeners[trigger].concat(listener);
        this.cleanTrigger(trigger);
    }

    EventManager.prototype.on = EventManager.prototype.addListener;

    EventManager.prototype.removeListener = function(trigger,listener){
        if(this.listeners[trigger]){
            this.listeners[trigger].filter(function(item){
                return item != trigger;
            });
            this.cleanTrigger(trigger);
        }
    }

    EventManager.prototype.removeTrigger = function(trigger){
        this.listeners[trigger] = null;
    }

    EventManager.prototype.trigger = function(trigger){
        if(this.listeners[trigger]){
            var args = [].slice.call(arguments).slice(1);
            this.listeners[trigger].forEach(function(item){
                item.apply(null,args);
            });
        }
    }
    EventManager.prototype.doTrigger = EventManager.prototype.trigger;
    EventManager.prototype.do = EventManager.prototype.trigger;

    EventManager.prototype.cleanTrigger = function(trigger){
        if(this.listeners[trigger]){
            this.listeners[trigger].filter(function(item){
                return item instanceof Function;
            });
            if(this.listeners[trigger].length == 0){
                this.listeners[trigger] = null;
            }
        }
    }

    return new EventManager();
  };

  createEventManager.getEventManager = createEventManager;
  return createEventManager;
});
