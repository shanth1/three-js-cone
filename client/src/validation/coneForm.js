export const checkConeForm = ({ height, radius, segmentNumber }) => {
    if (!height || !radius || !segmentNumber) return false;
    if (segmentNumber < 3 || segmentNumber > 50) return false;
    if (height < 1 || height > 15) return false;
    if (radius < 1 || radius > 10) return false;
    return true;
};
