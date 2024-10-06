// реализация Pick из TypeScript
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// дженерик для массива, возвращающий тип его N элемента
type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

// дженерик для массива, первый элемент которого имеет тип Elem, а остальные элементы - тип массива в первом переданном параметре
type Unshift<ArrayType extends unknown[], Elem> = [Elem, ...ArrayType];

// реализация Exclude из TypeScript
type MyExclude<T, U> = T extends U ? never : T;

// тестирование MyPick
type Product = {
    id: number;
    name: string;
    description?: {
        category: string;
        type: string;
    };
    tags?: {
        title: string;
        other: string;
    }[];
    price: number;
}

type MyPickTest1 = MyPick<Product, 'id' | 'name' | 'description'>;
const myPickTest1: MyPickTest1 = {
    id: 1,
    name: "",
    description: undefined,
};

interface ExtendedProduct extends Product {
    category: string;
}

type MyPickTest2 = MyPick<ExtendedProduct, 'id' | 'category'>;
const myPickTest2: MyPickTest2 = {
    id: 2,
    category: "",
};

type MyPickTest3 = MyPick<Product, never>;
const myPickTest3: MyPickTest3 = {};

// тестирование NOfArray
type NOfArrayTest1 = NOfArray<[number, undefined, boolean], 1>;
const nOfArrayTest1: NOfArrayTest1 = undefined;

type NOfArrayTest2 = NOfArray<string[], 2>;
const nOfArrayTest2: NOfArrayTest2 = "";

type NOfArrayTest3 = NOfArray<MyExclude<Product[], 'description'>, 0>;
const nOfArrayTest3: NOfArrayTest3 = { id: 1, name: "", price: 1 };

type NOfArrayTest4 = NOfArray<(number | string)[], 0>;
const nOfArrayTest4A: NOfArrayTest4 = 1;
const nOfArrayTest4B: NOfArrayTest4 = "";

type NOfArrayTest5 = NOfArray<[{ a: number }, string, { b: boolean }], 1>;
const nOfArrayTest5: NOfArrayTest5 = "";

// тестирование Unshift
type UnshiftTest1 = Unshift<[], number>;
const unshiftTest1: UnshiftTest1 = [42];

type UnshiftTest2 = Unshift<[number, string], null>;
const unshiftTest2: UnshiftTest2 = [null, 10, ""];

type UnshiftTest3 = Unshift<[MyPick<Product, 'id' | 'name'>], boolean>;
const unshiftTest3: UnshiftTest3 = [true, { id: 1, name: ""}];

type UnshiftTest4 = Unshift<[number, string, boolean], object>;
const unshiftTest4: UnshiftTest4 = [{}, 1, "", true];

// тестирование MyExclude
type MyExcludeTest1 = MyExclude<number | string | boolean, string>;
const myExcludeTest1A: MyExcludeTest1 = 42;
const myExcludeTest1B: MyExcludeTest1 = true;
// const myExcludeTest1C: MyExcludeTest1 = "";

type MyExcludeTest2 = MyExclude<'a' | 'b' | 'c' | 'd', 'a' | 'b'>;
const myExcludeTest2A: MyExcludeTest2 = 'd';
// const myExcludeTest2B: MyExcludeTest2 = 'a';

type MyExcludeTest3 = MyExclude<string | number | MyPick<Product, 'id' | 'name'>, string>;
const myExcludeTest3A: MyExcludeTest3 = 100;
const myExcludeTest3B: MyExcludeTest3 = { id: 3, name: "" };
// const myExcludeTest3C: MyExcludeTest3 = "";

type MyExcludeTest4 = MyExclude<1 | 2 | { a: number }, 1 | { a: number }>;
const myExcludeTest4A: MyExcludeTest4 = 2;
// const myExcludeTest4B: MyExcludeTest4 = 1;
// const myExcludeTest4C: MyExcludeTest4 = { a: 1 };

type MyExcludeTest5 = MyExclude<null | undefined, number>;
const myExcludeTest5A: MyExcludeTest5 = null;
const myExcludeTest5B: MyExcludeTest5 = undefined;