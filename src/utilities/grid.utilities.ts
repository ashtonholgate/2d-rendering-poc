export const convertXYToGridRef = (x: number, y: number) => {
    return `X${x.toString().padStart(3, "0")}•Y${y.toString().padStart(3, "0")}`
}