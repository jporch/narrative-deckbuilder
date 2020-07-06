const normalWeeks = new Deck('Normal','Normal',[
    'spring_1',
    'spring_1',
    'spring_1',
    'spring_1',
    'spring_2',
    'spring_2',
    'spring_2',
    'spring_3',
    'spring_3',
    'spring_3',
    'spring_4',
    'spring_5',
    'spring_5',
    'summer_1',
    'summer_1',
    'summer_1',
    'summer_1',
    'summer_2',
    'summer_2',
    'summer_2',
    'summer_3',
    'summer_3',
    'summer_3',
    'summer_4',
    'summer_5',
    'summer_5',
    'fall_1',
    'fall_1',
    'fall_1',
    'fall_1',
    'fall_2',
    'fall_2',
    'fall_2',
    'fall_3',
    'fall_3',
    'fall_3',
    'fall_4',
    'fall_5',
    'fall_5',
    'winter_1',
    'winter_1',
    'winter_1',
    'winter_1',
    'winter_2',
    'winter_2',
    'winter_2',
    'winter_3',
    'winter_3',
    'winter_3',
    'winter_4',
    'winter_5',
    'winter_5',
]);
const specialEvents = new Deck('Special','Special',[
    'bandit_1',
    'bandit_1',
    'bandit_1',
    'bandit_2',
    'surprise_1',
]);

GlobalState.register_init_action(() => {
    GlobalState.setValue('time',1);
    GlobalState.addDeck(normalWeeks);
    GlobalState.addDeck(specialEvents);
    let mainDeck = new Deck('Main');
    mainDeck = mainDeck.merge([GlobalState.getDeck('Normal'),GlobalState.getDeck('Special')]);
    mainDeck = mainDeck.filter([hasAnyTag]);
    GlobalState.addDeck(mainDeck);
    GlobalState.getDeck('Main').show();
    GlobalState.display();
    function seasonMessage() {
        if (GlobalState.getValue('time') > 52) {
            alert('year!!!');
            GlobalState.setValue('time',1);
            GlobalState.getDeck('Main').shuffle();
            GlobalState.display();
        } else {
            alert('season!');
        }
    
        GlobalState.removeTrigger('season');
        GlobalState.addTrigger('season',SetTimer(13,GlobalState,seasonMessage));
    };
    GlobalState.addTrigger('season',SetTimer(13,GlobalState,seasonMessage));
    
    const b = document.getElementById('drawButton');
    b.onclick=() => { GlobalState.getDeck('Main').draw([getSeasonFilter()]).play().show('card'); GlobalState.display();GlobalState.applyTriggers();};
    
    const s = document.getElementById('shuffleButton');
    s.onclick=() => { GlobalState.getDeck('Main').shuffle(); GlobalState.display();};
});
GlobalState.register_init_action(function a() {let x = 1;},0);
GlobalState.register_init_action(function b() {let x = 2;},99999999);
GlobalState.init();