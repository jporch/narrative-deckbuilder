function getSeasonFilter(state=GlobalState, clockName='__time', ticksPerSeason=13) {
    let t = state.getValue(clockName);
    if (t < 0) {
        console.log(`Error: clock ${clockName} cannot be negative.`);
        return isActive;
    }
    t = t%(1+ticksPerSeason*4)
    if (t>ticksPerSeason*3) return isWinter;
    if (t>ticksPerSeason*2) return isFall;
    if (t>ticksPerSeason) return isSummer;
    return isSpring;
}

function getSeason(state=GlobalState, clockName='__time', ticksPerSeason=13) {
    let t = state.getValue(clockName);
    if (t < 0) {
        console.log(`Error: clock ${clockName} cannot be negative.`);
        return isActive;
    }
    t = t%(1+ticksPerSeason*4)
    if (t>ticksPerSeason*3) return 'Winter';
    if (t>ticksPerSeason*2) return 'Fall';
    if (t>ticksPerSeason) return 'Summer';
    return 'Spring';
}