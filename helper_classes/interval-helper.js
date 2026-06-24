export class IntervalHub {
    // saves all registered interval ID's
    static allIntervals = [];

    // starts a new interval and adds it to array allIntervals
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        // console.log(IntervalHub.allIntervals);
    }

    // stops all registered intervals and clears array
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}
