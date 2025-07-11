import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Otsikko on pakollinen",
    }),
    description: string({
      required_error: "Kuvaus on pakollinen",
    }).min(120, "Kuvauksen täytyy olla vähintään 120 merkkiä pitkä!"),
    price: number({
      required_error: "Hinta on pakollinen",
    }),
    image: string({
      required_error: "Kuvan URL on pakollinen",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId on pakollinen",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
