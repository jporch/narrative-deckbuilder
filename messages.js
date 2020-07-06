class Messages {
    constructor(id) {
        if (id === '') {
            console.log('Error: Cannot have anonymous messages. Please provide an ID.');
            return;
        }
        
        this._id = id;
        this._name = name || id;
        this._messages = [];
        this.display();
    }

    post(text) {
        this._messages.splice(0,0,text);
        this.display();
    }

    display() {
        const el = document.getElementById(this._id);
        const newEl = el.cloneNode(false);
        const newH2 = document.createElement('H2');
        newH2.innerText=this._name;
        newEl.appendChild(newH2);
        const newUL = document.createElement('UL');
        for (const message of this._messages) {
            const item = document.createElement('LI');
            item.innerText=message;
            newUL.append(item);
        }
        newEl.appendChild(newUL);
        el.parentNode.replaceChild(newEl,el); // Clears all children from past display
    }
}

const GlobalMessages = new Messages('GlobalMessages');