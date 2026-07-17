/**
 * Manages all game intervals in one central location.
 *
 * IntervalHub stores all created interval IDs in an array so they can be
 * stopped together. This is used when restarting the game or when the game
 * ends to prevent old intervals from continuing to run.
 *
 * @class IntervalHub
 */
export class IntervalHub {
    /**
     * saves all registered interval ID's
     */
    static allIntervals = [];

    /**
     * Creates a new interval and stores its ID.
     *
     * The interval ID is added to allIntervals so it can later be cleared with
     * stopAllIntervals().
     *
     * @param {Function} func - Function that should be executed repeatedly.
     * @param {number} timer - Delay between executions in milliseconds.
     *
     * @returns {void}
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    /**
     * Stops all active intervals registered in IntervalHub.
     *
     * Clears every interval stored in allIntervals and resets the array afterwards.
     * Used when restarting the game or stopping the game completely.
     *
     * @returns {void}
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
