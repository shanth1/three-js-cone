export const checkConeForm = ({ height, radius, segmentNumber }) => {
    if (!height || !radius || !segmentNumber) return true;
    if (segmentNumber < 3 || segmentNumber > 50) return true;
    if (height < 1 || height > 15) return true;
    if (radius < 1 || radius > 10) return true;
    return false;
};
