export default class Algorithm {

    static #mStep = 1 / 20;
    static #rangeValues = [];

    static async generator(a, n, m, Rinp) {
        let R = 0;
        const resArray = [];
        for (let i = 1; i <= n; i++) {
            let Rprev = i > 1 ? R : Rinp;
            const firstStep = a * Rprev;
            const secondStep = firstStep % m;
            R = secondStep;
            const X = R / m;
            resArray.push(X);
        }
        return resArray;
    }

    static async #getEstimationOfMathExpectation(array) {
        const sum = array.reduceRight((acc, cur) => acc + cur, 0)
        return sum / array.length
    }

    static async #getEstimationOfDispersion(array, m) {
        const tmp = array.map((X) => {
            return Math.pow((X - m), 2);
        })
        const sum = tmp.reduceRight((acc, cur) => acc + cur, 0);
        return sum / array.length
    }

    static async estimation(generatedXArray) {
        const estimationResult = {
            estimationOfMathExpectation: 0,
            estimationOfDispersion: 0,
            estimationOfDeviation: 0,
        }
        estimationResult.estimationOfMathExpectation = await this.#getEstimationOfMathExpectation(generatedXArray);
        estimationResult.estimationOfDispersion = await this.#getEstimationOfDispersion(generatedXArray, estimationResult.estimationOfMathExpectation);
        estimationResult.estimationOfDeviation = Math.sqrt(estimationResult.estimationOfDispersion);
        return estimationResult;
    }

    static async inderectSigns(array) {
        let K = 0;
        let i = 0;
        await array.forEach((el) => {
            if ((Math.pow(array[2 * i - 1], 2) + Math.pow(array[2 * i], 2)) < 1) {
                K++;
            }
            i++;
        })
        return {
            first: Math.PI / 4,
            second: 2 * K / array.length
        }
    }

    static async #period(array) {
        const XV = array[array.length - 1];
        let i1 = 0, i2 = 0, i = 0;
        for (i = 0; i < array.length; i++) {
            if (array[i] === XV) {
                if (i1 === 0) {
                    i1 = i;
                    i++;
                } else if (i2 === 0) {
                    i2 = i;
                    break;
                }
            }

        }
        return i2 - i1;
    }

    static async periodAndAperiodicLength(array, inputData) {
        const P = await this.#period(array);
        const newArray = await this.generator(inputData.a, inputData.n, inputData.m, array[P]);
        let i3 = 0;
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === newArray[i + P]) {
                i3 = i;
                break;
            }
        }
        return {
            P: P,
            L: P + i3
        }
    }

    static async histogram(generatedArray) {
        this.#rangeValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        await generatedArray.forEach(el => {
            for (let i = 0; i <= 19; i++) {
                const left = i * this.#mStep;
                const right = (i + 1) * this.#mStep;
                if ((el >= left) && (el < right)) {
                    this.#rangeValues[i] = this.#rangeValues[i] + 1;
                    break;
                }
            }
        });
        return this.#rangeValues;
    }

}