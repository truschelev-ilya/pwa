import hexToHsl from 'hex-to-hsl';

export const hexToRGB = (hex: string, format?: boolean) => {
    const hexRegEx = /^#[0-9A-F]{6}$/i;
    if (hexRegEx.test(hex)) {

        const r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (format) {
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            return [r, g, b];
        }
    } else {
        if (format) {
            return 'rgb(0, 0, 0)';
        } else {
            return [0, 0, 0];
        }
    }
};

export const hexToHSL = (hex: string, format?: boolean) => {
    const hsl = hexToHsl(hex);

    if (format) {
        return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    } else {
        return hsl;
    }
};

export const getHSLDif = (baseHex: string, targetHex: string) => {
    const baseHSL = hexToHSL(baseHex);
    const targetHSL = hexToHSL(targetHex);
    const unitsMap= ['h', 's', 'l'];
    let result = '';

    for (const [index, value] of baseHSL.entries()) {
        if (targetHSL[index] > value) {
            const dif = targetHSL[index] - value;
            result += `${unitsMap[index]}(+${dif}${index ? '%' : ''})`;
        }
        if (targetHSL[index] < value) {
            const dif = value - targetHSL[index];
            result += `${unitsMap[index]}(-${dif}${index ? '%' : ''})`;
        }
    }

    return result;
};
