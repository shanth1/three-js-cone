const calculateBasePoints = (radius, segmentNumber) => {
    const basePoints = [];

    for (let pointIndex = 0; pointIndex < segmentNumber; pointIndex++) {
        const coordinateX =
            radius * Math.cos((2 * Math.PI * pointIndex) / segmentNumber);
        const coordinateY =
            radius * Math.sin((2 * Math.PI * pointIndex) / segmentNumber);
        const coordinateZ = 0;
        basePoints.push(coordinateX, coordinateY, coordinateZ);
    }

    return basePoints;
};

module.exports = calculateBasePoints;
