export enum FORM_STATE {
  CREATE = 'Создание',
  EDIT = 'Редактирование',
  VIEW = 'Просмотр',
}

export class Nullable {
  static isNull(val: any): boolean {
    return !val;
  }
}

export interface IProductCategory {
  id: number;

  up: number | null;

  emoji: string | null;

  name: number | null;

  description: string | null;

  thumb: string | null;

  ord: string | null;
}

export class Product extends Nullable {
  id: number | null = null;

  category_id: number | null = null;

  name: string | null = null;

  price: number | null = null;

  discount: number | null = null;

  imgs: string | null = null;

  summary: string | null = null;

  description: string | null = null;

  constructor(product?: Product) {
    super();
    this.id = product?.id || null;
    this.category_id = product?.category_id || null;
    this.name = product?.name || null;
    this.price = product?.price || null;
    this.discount = product?.discount || null;
    this.imgs = product?.imgs || null;
    this.summary = product?.summary || null;
    this.description = product?.description || null;
  }
}
