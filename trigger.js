class Trigger {
    constructor (conditions, effect) {
        this._conditions = conditions;
        this._effect = effect;
    }

    apply(state) {
        for (const c of this._conditions) {
            if (!c.test(state)) return;
        } 
        this._effect(state);
    }
}

class Condition {
    constructor (name, comparison, value) {
        this._name = name;
        this._comp = comparison;
        this._value = value;
    }

    test(state) {
        return this._comp(state.getValue(this._name),this._value);
    }
}

SetTimer = (delay,state,result,clockName='__time') => {
    return new Trigger([new Condition(clockName,gte,state.getValue(clockName)+delay)],result);
}

gt = (a,b) => {
    return a > b;
}
gte = (a,b) => {
    return a >= b;
}
lt = (a,b) => {
    return a < b;
}
lte = (a,b) => {
    return a <= b;
}
eq = (a,b) => {
    return a === b;
}
neq = (a,b) => {
    return a !== b;
}
tru = (a,b) => {
    return true;
}
fal = (a,b) => {
    return false;
}