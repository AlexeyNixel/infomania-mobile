export type EntryResponseType = {
  data: EntryType[];
  meta: MetaType;
};

export type DocumentResponseType = {
  data: DocumentType[];
  meta: MetaType;
};

export type BillboardType = {
  id: string;
  oldId: number;
  eventDate: string;
  eventTime: string;
  title: string;
  desc: string;
  eventPlace: AffichePlacesEnum;
  phone: string;
  slug: string;
  entryId: string;
  isDeleted: boolean;
};

export type DocumentType = {
  id: string;
  oldId: number;
  title: string;
  content: string;
  menuItemId: string;
  fileId: string;
  isDeleted: boolean;
  publishedAt: string;
};

export type DepartmentType = {
  id: string;
  title: string;
  desc: string;
  slug: string;
  preview: {
    path: string;
  };
  isDeleted: boolean;
};

export type EntryType = {
  id: string;
  oldId: number;
  fileId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  desc: string;
  content: Document;
  slug: string;
  published: string;
  departmentId: string;
  department: DepartmentType;
  rubrics: any;
  rubric: RubricType;
  preview: {
    path: string;
  };
  isDeleted: boolean;
  isActive: boolean;
};

export type RubricType = {
  id: string;
  title: RubricNameEnum;
  slug: string;
  entries: EntryType;
};

export type SliderType = {
  id: string;
  title: string;
  desc: string;
  entryId: string;
  fileId: string;
  image: ImageType;
  entry: EntryType;
  url: string;
  isDeleted: boolean;
  createdAt: string;
};

export type ImageType = {
  path: string;
  type: string;
  originalName: string;
};

export type ParamsType = {
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  orderBy?: string;
  search?: string;
  page?: number;
  include?: string;
  includes?: string;
  searchByField?: string;
  type?: string;
  model?: string;
  isDeleted?: boolean;
};

export type MetaType = {
  page: number;
  pages: number;
  pageSize: number;
};

export type MenuItemType = {
  id: string;
  oldId: number;
  title: string;
  menuId: string;
  menuItemType: string;
  slug: string;
  link: string;
  document: DocumentType;
};

export type MenuType = {
  id: string;
  oldId: number;
  title: string;
  menuType: string;
  menuItems: MenuItemType[];
};

export type UserType = {
  username: string | undefined;
  password: string | undefined;
  repeatPassword?: string | undefined;
};

export enum RubricNameEnum {
  ANONSY = 'anonsy',
  SOBITIYA = 'sobytiya',
  AKTUALNOE = 'aktualnoe',
}

export const RubricName: { [key in RubricNameEnum]: string } = {
  [RubricNameEnum.ANONSY]: 'Анонсы',
  [RubricNameEnum.SOBITIYA]: 'События',
  [RubricNameEnum.AKTUALNOE]: 'Актуальное',
};

enum AffichePlacesEnum {
  SPACE_TYPE_ALL = 'all',
  SPACE_TYPE_OUT = 'out',
  SPACE_TYPE_GUEST = 'guest',
  SPACE_TYPE_ITCLASS = 'itclass',
  SPACE_TYPE_ITCLASS_1 = 'itclass_1',
  SPACE_TYPE_ITCLASS_2 = 'itclass_2',
  SPACE_TYPE_CONF = 'conf',
  SPACE_TYPE_MEDIA = 'media',
  SPACE_TYPE_MAB = 'mab',
  SPACE_TYPE_OKIR = 'okir',
  SPACE_TYPE_OMP = 'omp',
  SPACE_TYPE_OOL = 'ool',
  SPACE_TYPE_KOHL_DS = 'kohl_ds',
  SPACE_TYPE_KOHL_C = 'kohl_c',
  SPACE_TYPE_CROSS = 'cross',
  SPACE_TYPE_OOL_COM = 'ool_com',
  SPACE_TYPE_CPKIM = 'cpkim',
  SPACE_TYPE_VIRT = 'virt',
}

export const AffichePlaces: { [key in AffichePlacesEnum]: string } = {
  [AffichePlacesEnum.SPACE_TYPE_ALL]: 'Все помещения библиотеки',
  [AffichePlacesEnum.SPACE_TYPE_OUT]: 'Выездное',
  [AffichePlacesEnum.SPACE_TYPE_GUEST]: 'Гостиная',
  [AffichePlacesEnum.SPACE_TYPE_ITCLASS]: 'IT-класс (весь)',
  [AffichePlacesEnum.SPACE_TYPE_ITCLASS_1]:
    'Компьютерный класс (секция с компьютерами)',
  [AffichePlacesEnum.SPACE_TYPE_ITCLASS_2]: 'Компьютерный класс (студия)',
  [AffichePlacesEnum.SPACE_TYPE_CONF]: 'Конференц-зал',
  [AffichePlacesEnum.SPACE_TYPE_MEDIA]: 'Медиатека',
  [AffichePlacesEnum.SPACE_TYPE_MAB]: 'Молодёжно-аналитическое бюро',
  [AffichePlacesEnum.SPACE_TYPE_OKIR]: 'Отдел координации и развития',
  [AffichePlacesEnum.SPACE_TYPE_OMP]: 'Отдел литературных программ',
  [AffichePlacesEnum.SPACE_TYPE_OOL]: 'Отдел отраслевой литературы (зал)',
  [AffichePlacesEnum.SPACE_TYPE_KOHL_DS]:
    'Отдел художественной литературы (детский сектор)',
  [AffichePlacesEnum.SPACE_TYPE_KOHL_C]:
    'Отдел художественной литературы (цокольный этаж)',
  [AffichePlacesEnum.SPACE_TYPE_CROSS]:
    'Пересечение Красного проспекта и Октябрьской',
  [AffichePlacesEnum.SPACE_TYPE_OOL_COM]: 'Центр графической культуры',
  [AffichePlacesEnum.SPACE_TYPE_CPKIM]:
    'Центр поддержки культурных инициатив молодёжи',
  [AffichePlacesEnum.SPACE_TYPE_VIRT]: 'Электронные ресурсы библиотеки',
};

enum ContentPathEnum {
  MENU_ITEMS = '/menu-items',
  MENU_ITEM = '/menu-item',
  PREVIEW = '/file',
  PREVIEW_ALT = 'file',
  MENU = 'menuItems',
  DEPARTMENT = '/department',
  RUBRIC = '/rubric',
  AFFICHE = '/affiche',
  MAIN_SLIDER = '/main-slider',
  MENUS = '/menu',
  DOCUMENT = '/document',
  ENTRY = '/entry',
}

export const ContentPath: { [key: string]: string } = {
  [ContentPathEnum.MENU_ITEMS]: '/menu-item',
  [ContentPathEnum.MENU_ITEM]: '/menu-item',
  [ContentPathEnum.PREVIEW]: '/file',
  [ContentPathEnum.PREVIEW_ALT]: '/file',
  [ContentPathEnum.MENU]: '/menu',
  [ContentPathEnum.DEPARTMENT]: '/department',
  [ContentPathEnum.RUBRIC]: '/rubric',
  [ContentPathEnum.AFFICHE]: '/affiche',
  [ContentPathEnum.MAIN_SLIDER]: '/main-slider',
  [ContentPathEnum.MENUS]: '/menu',
  [ContentPathEnum.DOCUMENT]: '/menu-item/document',
  [ContentPathEnum.ENTRY]: '/entry',
};

enum FieldNameEnum {
  TITLE = 'title',
  DESC = 'desc',
  CONTENT = 'content',
  SLUG = 'slug',
  DEPARTMENT = 'department',
  RUBRIC = 'rubric',
  AFFICHE = 'affiche',
  MAIN_SLIDER = 'mainSlider',
  MENU_ITEMS = 'menuItems',
  IMAGE = 'image',
  ENTRY = 'entry',
  EVENT_PLACE = 'eventPlace',
  PHONE = 'phone',
  EVENT_DAY = 'eventDate',
  EVENT_TIME = 'eventTime',
  PUBLISHED = 'publishedAt',
  LINK = 'link',
  DOCUMENT = 'document',
  MENU_ITEM_TYPE = 'menuItemType',
  MENU = 'menu',
}

export const FieldName: { [key: string]: string } = {
  [FieldNameEnum.TITLE]: 'Название',
  [FieldNameEnum.DESC]: 'Описание',
  [FieldNameEnum.CONTENT]: 'Контент',
  [FieldNameEnum.SLUG]: 'Слаг',
  [FieldNameEnum.DEPARTMENT]: 'Отдел',
  [FieldNameEnum.RUBRIC]: 'Рубрика',
  [FieldNameEnum.AFFICHE]: 'Афиша',
  [FieldNameEnum.MAIN_SLIDER]: 'Слайдер',
  [FieldNameEnum.MENU_ITEMS]: 'Предметы меню',
  [FieldNameEnum.IMAGE]: 'Изображение',
  [FieldNameEnum.ENTRY]: 'Новость',
  [FieldNameEnum.EVENT_PLACE]: 'Место проведения',
  [FieldNameEnum.PHONE]: 'Телефон',
  [FieldNameEnum.EVENT_DAY]: 'День проведения',
  [FieldNameEnum.EVENT_TIME]: 'Вермя проведения',
  [FieldNameEnum.PUBLISHED]: 'Дата публикации',
  [FieldNameEnum.LINK]: 'Ссылка',
  [FieldNameEnum.DOCUMENT]: 'Документ',
  [FieldNameEnum.MENU_ITEM_TYPE]: 'Тип контента',
  [FieldNameEnum.MENU]: 'Меню',
};

enum ModelNameEnum {
  ENTRY = 'EntryComponent',
  DEPARTMENT = 'DepartmentComponent',
  DOCUMENT = 'DocumentComponent',
  AFFICHE = 'AfficheComponent',
  MENU_ITEM = 'MenuItemComponent',
  MAIN_SLIDER = 'SliderComponent',
}

export const ModelName: { [key: string]: string } = {
  [ModelNameEnum.ENTRY]: 'Новость',
  [ModelNameEnum.DEPARTMENT]: 'Отдел',
  [ModelNameEnum.DOCUMENT]: 'Документ',
  [ModelNameEnum.AFFICHE]: 'Афиша',
  [ModelNameEnum.MENU_ITEM]: 'Предмет меню',
  [ModelNameEnum.MAIN_SLIDER]: 'Слайдер',
};

enum RouteEnum {
  ENTRY = 'entry',
  DEPARTMENT = '/department',
  RUBRIC = '/rubric',
}

export const RouteAlternative: { [key: string]: string } = {
  [RouteEnum.ENTRY]: '/api/entry',
  [RouteEnum.DEPARTMENT]: '/api/department',
  [RouteEnum.RUBRIC]: '/api/rubric',
};
