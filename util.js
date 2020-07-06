function getSeasonFilter(state=GlobalState, clockName='time', ticksPerSeason=13) {
    let t = state.getValue(clockName);
    if (t < 0) {
        console.log('Error: time cannot be negative.');
        return isActive;
    }
    t = t%(1+ticksPerSeason*4)
    if (t>ticksPerSeason*3) return isWinter;
    if (t>ticksPerSeason*2) return isFall;
    if (t>ticksPerSeason) return isSummer;
    return isSpring;
}