function getCurrentZone(from,current) {
    do {
        if (from.classList.contains(current)) {
            return from;
        }
    } while (from = from.parentElement);
}
module.exports = getCurrentZone;