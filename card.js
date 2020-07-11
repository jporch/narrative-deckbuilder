class Card {
    constructor (id = null) {
        if (id == null) {
            this.id = 0;
            this.name = 'NoCard';
            this.description = 'The deck is empty';
            this.tags = [];
            this.active = false;
            this.effects = [];
            return;
        }
        if (Cards.hasOwnProperty(id)) {
            this.id = id;
            const card = Cards[id];
            this.name = 'name' in card ? card.name : 'The Card With No Name';
            this.description = 'description' in card ? card.description : 'Description Goes Here';
            this.tags = 'tags' in card ? card.tags : [];
            this.active = 'active' in card ? card.active : true;
            this.effects = 'effects' in card ? card.effects : [];
            return;
        }
        console.log(`Error, no ${id} exists.`);
    }

    play(state=GlobalState, message=GlobalMessages) {
        if ('effects' in this) {
            for (const e of this.effects) {
                e(state);
            }
        }
        message.post(`${this.name}: ${this.description}`);
        return this;
    }

    show(element) {
        const el = document.getElementById(element);
        el.querySelector('.cardID').innerText = this.id;
        el.querySelector('.cardName').innerText = this.name;
        el.querySelector('.cardDescription').innerText = this.description;
        return this;
    }

    activate() {
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
}

const NoCard = new Card();