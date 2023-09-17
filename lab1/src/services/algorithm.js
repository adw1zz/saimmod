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

    static async #getEstimationOfVariance(array, m) {
        const tmp = array.map((X) => {
            return Math.pow((X - m), 2);
        })
        const sum = tmp.reduceRight((acc, cur) => acc + cur, 0);
        return sum / array.length
    }

    static async estimation(generatedXArray) {
        const estimationResult = {
            estimationOfMathExpectation: 0,
            estimationOfVariance: 0
        }
        estimationResult.estimationOfMathExpectation = await this.#getEstimationOfMathExpectation(generatedXArray);
        estimationResult.estimationOfVariance = await this.#getEstimationOfVariance(generatedXArray, estimationResult.estimationOfMathExpectation);
        return estimationResult;
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