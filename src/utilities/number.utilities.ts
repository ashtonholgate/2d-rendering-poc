export const roundToNearest = (num: number, interval: number = 1, type: "round" | "ceil" | "floor" = "round") => {
    if (type === "ceil") return Math.round(num / interval) * interval;
    if (type === "floor") return Math.floor(num / interval) * interval;
    return Math.round(num / interval) * interval;
}