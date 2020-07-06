class State {
    constructor(id='',name='') {
        if (id === '') {
            console.log('Error: Cannot have anonymous state. Please provide an ID.');
            return;
        }
        
        this._id = id;
        this._name = name || id;
        this._values = {};
        this._decks = {};
        this._triggers = {};
        this._init_actions = [];
        this._initialized = false;
    }

    // One-time use, fires all registered init_actions 
    init() {
        if (this._initialized) return;
        for (const act of this._init_actions) {
            act();
        } 
        this._initialized = true;
    }
    // Add new functions to the init queue
    // They will fire in the order 
    register_init_action(action, position=-1) {
        if (this._initialized) {
            console.log(`Error: ${this._id} already initialized, can't add more init actions.`);
            return;
        }
        if (position < 0) this._init_actions.push(action);
        else this._init_actions.splice(position,0,action);
    }

    // Value Methods
    updateValue(key, delta) {
        if (!(key in this._values)) {
            this._values[key] = 0;
        }
        this._values[key] += delta;
    }
    setValue(key, value) {
        this._values[key] = value;
    }
    getValue(key) {
        return (key in this._values) ? this._values[key] : '';
    }

    // Deck Methods
    addDeck(deck, id='') {
        const _id = id || deck.id; 
        if (_id === '') {
            console.log('Cannot include an anonymous deck. Please provide one with a unique ID or specify an ID to use.');
            return;
        }
        if (!(_id in this._decks)) {
            this._decks[_id] = deck;
            return;
        }
        console.log(`Error: Deck ${_id} already present.`);
    }
    removeDeck(id) {
        if (id in this._decks) {
            const d = this._decks[id];
            delete this._decks[id];
            return d;
        }
        console.log(`Error: Deck ${id} does not exist.`);
        return new Deck();
    }
    getDeck(id) {
        if (id in this._decks) {
            return this._decks[id];
        }
        console.log(`Error: deck ${name} does not exist.`);
        return new Deck();
    }

    // Trigger Methods
    addTrigger(id, trigger) {
        if (!(id in this._triggers)) {
            this._triggers[id] = trigger;
            return;
        }
        console.log(`Error: Trigger ${id} already present.`);
    }
    removeTrigger(id) {
        if (id in this._triggers) {
            const t = this._triggers[id];
            delete this._triggers[id];
            return t;
        }
        console.log(`Error: Trigger ${id} does not exist.`);
        return new Trigger();
    }
    applyTriggers() {
        for (const key of Object.keys(this._triggers)) {
            this._triggers[key].apply(this);
        }
    }

    display() {
        const el = document.getElementById(this._id);
        const newEl = el.cloneNode(false);
        const newH2 = document.createElement('H2');
        newH2.innerText=this._name;
        newEl.appendChild(newH2);
        const newUL = document.createElement('UL');
        for (const key of Object.keys(this._values)) {
            const item = document.createElement('LI');
            item.innerText=`${key}: ${this._values[key]}`;
            newUL.append(item);
        }
        newEl.appendChild(newUL);
        el.parentNode.replaceChild(newEl,el); // Clears all children from past display
    }


    // Convenience Functions
    tick(increment=1,clockName='time') {
        this.updateValue(clockName, increment);
    }

}

const GlobalState = new State('GlobalState');