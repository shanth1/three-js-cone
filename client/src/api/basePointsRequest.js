import axios from "axios";
import { config } from "./config";

export const getBasePoints = (radius, segmentNumber) => {
    const { PROTOCOL, HOST, PORT } = config;
    const url = `${PROTOCOL}://${HOST}:${PORT}/api/triangulation`;
    return axios.get(url, {
        params: {
            radius,
            segmentNumber,
        },
    });
};
