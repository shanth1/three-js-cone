import { getBasePoints } from "../api/basePointsRequest";

const getBufferGeometryData = (basePoints, height, segmentNumber) => {
    const vertices = new Float32Array([
        ...[0, 0, 0], // середина основания
        ...[0, 0, height], // вершина
        ...basePoints,
    ]);
    const indices = [];
    for (let i = 0; i < segmentNumber - 1; i++) {
        indices.push(0, i + 2, i + 3);
        indices.push(1, i + 2, i + 3);
    }
    indices.push(0, segmentNumber - 1 + 2, 2);
    indices.push(1, segmentNumber - 1 + 2, 2);

    return [vertices, indices];
};

export const loadFigure = (scene, state) => {
    getBasePoints(state.radius, state.segmentNumber)
        .then(({ data }) => {
            const [vertices, indices] = getBufferGeometryData(
                data,
                state.height,
                state.segmentNumber,
            );
            scene.updateMesh(vertices, indices);
        })
        .catch((e) => console.error(e));
};
