// тип для объекта, все ключи которого опциональны, включая вложенные объекты
type DeepPartial<T> = T extends object
    ? T extends Function
        ? T
        : T extends Array<infer U>
            ? Array<DeepPartial<U>>
            : {
                [P in keyof T]?: DeepPartial<T[P]>;
            }
    : T;

// реализация Capitalize<T> из TypeScript
type MyCapitalize<T extends string> = T extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : T;

// тип для объекта, который делает все ключи изменяемыми, включая вложенные объекты
type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends ReadonlyArray<infer U>
        ? DeepMutable<U>[]
        : T[K] extends object
            ? DeepMutable<T[K]>
            : T[K];
};

// тип, возвращающий перечисление частей строк, являющимися параметрами URL-строки.
type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer _Start}:${infer Param}/${infer Rest}`
        ? Param | ParseURLParams<Rest>
        : StringElem extends `${infer _Start}:${infer Param}`
            ? Param
            : never;

// тестирование DeepPartial
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
type DeepPartialTest1 = DeepPartial<Product>;
const deepPartialTest1: DeepPartialTest1 = {
    id: 1,
};

const deepPartialTest2: DeepPartialTest1 = {
    description: {
        category: "",
    },
    tags: [{
        title: "",
    }],
};

const deepPartialTest3: DeepPartialTest1 = {
    description: {},
    tags: [
        { title: "" },
        {},
    ],
};

// тестирование MyCapitalize
type MyCapitalizeTest1 = MyCapitalize<"text">;
const myCapitalizeTest1A: MyCapitalizeTest1 = "Text";
// const myCapitalizeTest1B: MyCapitalizeTest1 = "text";

type MyCapitalizeTest2 = MyCapitalize<"Text">;
const myCapitalizeTest2A: MyCapitalizeTest2 = "Text";
// const myCapitalizeTest2B: MyCapitalizeTest2 = "world";

type MyCapitalizeTest3 = MyCapitalize<"">;
const myCapitalizeTest3: MyCapitalizeTest3 = "";

type MyCapitalizeTest4 = MyCapitalize<"hello world">;
const myCapitalizeTest4A: MyCapitalizeTest4 = "Hello world";
// const myCapitalizeTest4B: MyCapitalizeTest4 = "hello world";

// тестирование DeepMutable
type ProductReadonly = {
    readonly id: number;
    readonly name: string;
    readonly description: {
        readonly category: string;
        readonly type: string;
    };
    readonly tags: {
        readonly title: string;
        readonly other: string;
    }[];
    readonly price: number;
}

type ProductMutable = DeepMutable<ProductReadonly>;

const deepMutableTest: ProductMutable = {
    id: 1,
    name: "",
    description: {
        category: "",
        type: "",
    },
    tags: [{
        title: "",
        other: "",
    }],
    price: 0,
};

deepMutableTest.id = 2;
deepMutableTest.name = "Bob";

deepMutableTest.description.category = "tech"
deepMutableTest.description.type = "hairdryer"

deepMutableTest.tags[0].title = "tag 1";
deepMutableTest.tags[0].other = "info";

// тестирование ParseURLParams
type ParseURLParamsTest1 = ParseURLParams<"posts/:id">;
const parseURLParamsTest1A: ParseURLParamsTest1 = "id";
// const parseURLParamsTest1B: ParseURLParamsTest1 = "user";

type ParseURLParamsTest2 = ParseURLParams<"posts/:id/:user">;
const parseURLParamsTest2A: ParseURLParamsTest2 = "id";
const parseURLParamsTest2B: ParseURLParamsTest2 = "user";
// const parseURLParamsTest2C: ParseURLParamsTest2 = "other";

type ParseURLParamsTest3 = ParseURLParams<"posts">;
const parseURLParamsTest3: ParseURLParamsTest2 = undefined as never;

type ParseURLParamsTest4 = ParseURLParams<"api/v1/posts/:postId/comments/:commentId">;
const parseURLParamsTest4A: ParseURLParamsTest4 = "postId";
const parseURLParamsTest4B: ParseURLParamsTest4 = "commentId";
// const parseURLParamsTest4C: ParseURLParamsTest4 = "userId";