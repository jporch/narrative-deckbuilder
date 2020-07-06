class Deck {
    constructor (id='', name='',cards = []) {
        const n = name || id;
        this.deck = [];
        this.id = id;
        this.name = n;
        const newCards = [];

        for (const c of cards) {
            newCards.push(new Card(c));
        }
        this.insert(newCards);
    }

    insert(cards) {
        for (const card of cards) {
            this.deck.push(card);
        }
    }
    remove(id) {
        if (this.deck.length <= id) {
            console.log(`No ${id} present in deck`);
            return;
        }
        const card = this.deck[id];
        this.deck.splice(id,1);
        return card;
    }

    static Merge(decks, id='', name='') {
        const newDeck = new Deck(id,name,[]);
        for (const d of decks) {
            newDeck.insert(d.deck);
        }
        return newDeck;
    }
    merge(decks, id='', name='') {
        const newDeck = new Deck(id || this.id,name || this.name,this.deck);
        for (const d of decks) {
            newDeck.insert(d.deck);
        }
        return newDeck;
    }
    static Filter(deck, predicates, id='', name='') {
        const newDeck = new Deck(id,name,[]);
        let d = deck.deck;
        for (const p of predicates) {
            d = d.filter(p);
        }
        newDeck.insert(d);

        return newDeck;
    }
    filter(predicates, id='', name='') {
        const newDeck = new Deck(id || this.id,name || this.name,[]);
        let d = this.deck;
        for (const p of predicates) {
            d = d.filter(p);
        }
        newDeck.insert(d);

        return newDeck;
    }

    draw(cond = [], active=true, inactive=false) {
        let d = this.deck;
        if (!active) cond.push(isInactive);
        if (!inactive) cond.push(isActive);
        for (const c of cond) {
            d = d.filter(c);
        }
        if (d.length < 1) {
            return NoCard;
        }
        let rand = Math.floor(Math.random()*d.length);
        const r = d[rand];
        r.deactivate();
        this.show();
        return r;
    }

    show() {
        const el = document.getElementById(this.id);
        el.querySelector('.deckSize').innerText = this.size([isActive]);
        el.querySelector('.discardSize').innerText = this.size([isInactive]);
        return this;
    }

    size(filter=[]) {
        let newDeck = this.filter(filter);
        return newDeck.deck.length;
    }

    shuffle() {
        for (const c of this.deck) {
            c.activate();
        }
        this.show();
    }
}

EmptyDeck = new Deck();