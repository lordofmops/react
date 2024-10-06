// дженерик для конвертации свойств объекта из snake_case в camelCase, включая вложенность
type Camelize<T> = T extends object
    ? T extends any[]
        ? {[K in keyof T]: Camelize<T[K]>;}
        : {
            [K in keyof T as K extends string
                ? K extends `${infer P1}_${infer P2}`
                    ? `${P1}${CamelizeString<P2>}`
                    : K
                : K]: Camelize<T[K]>
        }
    : T;

type CamelizeString<S extends string> =
    S extends `${infer P1}_${infer P2}`
        ? `${Capitalize<P1>}${CamelizeString<P2>}`
        : Capitalize<S>;

// реализация Pick из TypeScript, но Paths может включать вложенные объекты
type DeepPick<T, Path extends string> =
    Path extends `${infer Key}.${infer Rest}`
        ? Key extends keyof T
            ? T[Key] extends Array<infer U>
                ? { [K in Key]: DeepPick<U, Rest>[] }
                : { [K in Key]: DeepPick<T[Key], Rest> }
            : never
        : Path extends keyof T
            ? { [K in Path]: T[Path] }
            : never;

// тестирование Camelize
type ProductSnake = {
    product_id: number;
    product_name: string;
    product_description?: {
        product_category: string;
        product_type: string;
    };
    product_tags?: {
        tag_title: string;
        tag_other: string;
    }[];
    product_price: number;
}

const camel: Camelize<ProductSnake> = {
    productId: 1,
    productName: "",
    productDescription: {
        productCategory: "",
        productType: "",
    },
    productTags: [{
        tagTitle: "",
        tagOther: "",
    }],
    productPrice: 1000,
}

// тестирование DeepPick
type Product1 = {
    id: number;
    name: string;
    description: {
        category: string;
        type: string;
    };
    tags: {
        title: string;
        other: string;
    }[];
    price: number;
}

type DeepPickTest1 = DeepPick<Product1, "description">;
const deepPickTest1: DeepPickTest1 = {
    description: {
        category: "",
        type: ""
    }
};

type DeepPickTest2 = DeepPick<Product1, "description.category" | "tags.title">;
const deepPickTest2: DeepPickTest2 = {
    description:{
        category: "",
    },
    tags: [{
        title: "",
    }]
}

type DeepPickTest3 = DeepPick<Product1, "does not exist">;
const deepPickTest3: DeepPickTest3 = undefined as never