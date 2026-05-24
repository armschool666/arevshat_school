/**
 * Конфиг конкретной школы.
 *
 * Это единственное место, которое нужно менять, чтобы клонировать сайт
 * под другую школу. Тексты (название, описание, адрес) локализованы:
 * правьте здесь — никаких хардкодов в коде или messages/*.json.
 */

export type SchoolLocale = "hy" | "ru" | "en";

type LocalizedString = Record<SchoolLocale, string>;

export interface SchoolConfig {
  /** Домен сайта без протокола, для SEO/metadata */
  domain: string;
  /** Email школы — используется в footer, contact page, mailto-форме */
  email: string;
  /** Дополнительный email (необязательный) */
  email2?: string;
  /** Телефон в международном формате (для tel:) и локально для отображения */
  phone: {
    display: string;
    tel: string;
  };
  /** Соц. сети — оставить пустую строку, чтобы скрыть ссылку */
  social: {
    facebook: string;
    youtube: string;
  };
  /** Ссылка на видео/рилс для embed на главной (необязательная) */
  reelUrl?: string;
  /** Координаты для встроенной карты OpenStreetMap */
  map: {
    lat: number;
    lon: number;
    /** Половина видимого охвата карты по широте/долготе (градусы) */
    bboxRadius: number;
  };
  /** Логотип и hero-изображение из /public */
  assets: {
    logo: string;
    heroImage: string;
  };
  /** Локализованные строки */
  name: LocalizedString;
  shortName: LocalizedString;
  tagline: LocalizedString;
  address: LocalizedString;
  region: LocalizedString;
}

export const schoolConfig: SchoolConfig = {
  domain: "arevshatschool.am",
  email: "arevshat-shirak@schools.am",
  email2: "sargis.xachatryan.68@mail.ru",
  phone: {
    display: "+374 94 50 97 82",
    tel: "+37494509782",
  },
  social: {
    facebook: "https://www.facebook.com/arevshati.dproc",
    youtube: "",
  },
  reelUrl: "https://www.facebook.com/reel/25183397998019434",
  map: {
    lat: 40.8472,
    lon: 43.8741,
    bboxRadius: 0.02,
  },
  assets: {
    logo: "/logoArevshat.jpg",
    heroImage: "/glxavor.png",
  },
  name: {
    hy: "Արևշատի Մետաքսեի անվան միջնակարգ դպրոց",
    ru: "Средняя школа имени Метаксе Аревшатян",
    en: "Arevshati Metaksei Secondary School",
  },
  shortName: {
    hy: "Արևշատ",
    ru: "Аревшат",
    en: "Arevshati",
  },
  tagline: {
    hy: "Պաշտոնական տեղեկատվական հարթակ",
    ru: "Официальный информационный портал",
    en: "Official information portal",
  },
  address: {
    hy: "",
    ru: "",
    en: "",
  },
  region: {
    hy: "Շիրակի մարզ",
    ru: "Ширакская область",
    en: "Shirak Province",
  },
};

export function bboxString(): string {
  const { lat, lon, bboxRadius } = schoolConfig.map;
  return [
    lon - bboxRadius,
    lat - bboxRadius / 2,
    lon + bboxRadius,
    lat + bboxRadius / 2,
  ].join(",");
}

export function mapEmbedUrl(): string {
  const { lat, lon } = schoolConfig.map;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bboxString()}&layer=mapnik&marker=${lat},${lon}`;
}
