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
        const res = {
            i1: 0,
            i2: 0,
        }
        let i = 0;
        await array.forEach((el) => {
            if ((el === array[array.length]) && (i != array.length - 1)) {
                if (res.i1 === 0) {
                    res.i1 = i
                    console.log(el);
                } else if (res.i2 === 0) {
                    res.i2 = i;
                    console.log(el);
                }
            }
            i++;
        })
        return res.i2 - res.i1;
    }

    static async #findPiar(array, newArr) {
        let res = 0;
        await array.forEach((el) => {
            if (newArr.includes(el)) {
                res = newArr.indexOf(el);
            }
        })
        return res;
    }

    static async periodAndAperiodicLength(array) {
        const P = await this.#period(array);
        console.log(P)
        // const newArr = await this.generator(125566, 200000, 276128, P);
        // const i3 = await this.#findPiar(array, newArr);
        // const L = i3 + P;
        // console.log({ P, L })
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