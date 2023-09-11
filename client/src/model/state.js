const createState = (stateObj) => {
    return new Proxy(stateObj, {
        set(target, property, value) {
            target[property] = value;
            return true;
        },
    });
};

export const state = createState({
    radius: "10",
    height: "15",
    segmentNumber: "15",
});
