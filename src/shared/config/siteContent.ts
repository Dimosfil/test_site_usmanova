import { BadgePercent, Clock, Dumbbell, Home, Info, ReceiptText, Salad, Smile, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

export type ThemeId = "rose" | "teal" | "lime" | "sky" | "mono";
export type ProgramId =
  | "home-body"
  | "strength-shape"
  | "food-rhythm"
  | "glutes-core"
  | "postpartum-return"
  | "express-start"
  | "self-love"
  | "mobility";

export type Program = {
  id: ProgramId;
  title: string;
  duration: string;
  summary: string;
  image: string;
  imageAlt: string;
  Icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

export type CatalogCard = {
  eyebrow: string;
  title: string;
  summary: string;
  details?: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

export const themes: Array<{ id: ThemeId; label: string }> = [
  { id: "rose", label: "Rose" },
  { id: "teal", label: "Teal" },
  { id: "lime", label: "Lime" },
  { id: "sky", label: "Sky" },
  { id: "mono", label: "Mono" },
];

export const programs: Program[] = [
  {
    id: "home-body",
    title: "Тело дома",
    duration: "4 недели",
    summary: "Короткие тренировки 25-35 минут для живота, ягодиц, осанки и мягкого кардио без оборудования.",
    image: "/assets/fit-home-band.png",
    imageAlt: "Упражнение с фитнес-резинкой",
    Icon: Home,
  },
  {
    id: "glutes-core",
    title: "Попа и живот",
    duration: "5 недель",
    summary: "Фокус на ягодицы, талию и глубокие мышцы корпуса без изнуряющего кардио.",
    image: "/assets/fit-home-band.png",
    imageAlt: "Домашная тренировка для ягодиц и корпуса",
    Icon: Sparkles,
  },
  {
    id: "strength-shape",
    title: "Сила и форма",
    duration: "6 недель",
    summary: "План для зала: техника базовых движений, прогрессия веса и уверенная работа с тренажерами.",
    image: "/assets/fit-gym-dumbbells.png",
    imageAlt: "Тренировка с гантелями в зале",
    Icon: Dumbbell,
  },
  {
    id: "express-start",
    title: "Старт без стресса",
    duration: "14 дней",
    summary: "Короткий вход в режим: легкие тренировки, простое питание и первые привычки без перегруза.",
    image: "/assets/fit-gym-dumbbells.png",
    imageAlt: "Легкий старт тренировок с гантелями",
    Icon: Smile,
  },
  {
    id: "food-rhythm",
    title: "Режим питания",
    duration: "3 недели",
    summary: "Мягкая настройка рациона, простые тарелки, список покупок и привычки, которые держатся.",
    image: "/assets/fit-nutrition-table.png",
    imageAlt: "Здоровое питание и план тренировок",
    Icon: Salad,
  },
  {
    id: "postpartum-return",
    title: "После паузы",
    duration: "6 недель",
    summary: "Возвращение к тренировкам после перерыва: техника, восстановление, мягкая прогрессия.",
    image: "/assets/fit-hero-lunge.png",
    imageAlt: "Тренер показывает контролируемое движение с гантелью",
    Icon: Clock,
  },
  {
    id: "self-love",
    title: "Любовь к себе",
    duration: "4 недели",
    summary: "Тренировки и задания, которые помогают убрать злость к телу и выстроить спокойный режим.",
    image: "/assets/fit-self-care-portrait.png",
    imageAlt: "Фитнес-тренер в спокойной уверенной позе",
    Icon: Smile,
  },
  {
    id: "mobility",
    title: "Осанка и легкость",
    duration: "3 недели",
    summary: "Мобилити, спина, плечи и мягкая сила для тех, кто много сидит и хочет двигаться свободнее.",
    image: "/assets/fit-self-care-full.png",
    imageAlt: "Тренировка дома для осанки и мобильности",
    Icon: Sparkles,
  },
];

export const goals = [
  "Похудеть без жесткой диеты",
  "Подтянуть живот и ягодицы",
  "Вернуться к тренировкам после паузы",
  "Разобраться с питанием",
];

export const nutritionCards: CatalogCard[] = [
  {
    eyebrow: "Бестселлер",
    title: "ИИ-нутрициолог",
    summary: "Едите без срывов и понимаете свое тело: питание, тренировки и анализ привычек в кармане.",
    details: "Подскажет, поддержит и не осудит, когда нужен понятный следующий шаг.",
    image: "/assets/fit-nutrition-table.png",
    imageAlt: "Сбалансированное питание и план тренировок",
    badge: "Бестселлер",
  },
  {
    eyebrow: "Курс",
    title: "По питанию",
    summary: "Сбросить вес без диет и жестких ограничений.",
    details: "Избавиться от срывов, заедания и качелей веса через спокойную систему тарелок.",
    image: "/assets/fit-nutrition-table.png",
    imageAlt: "Домашная программа рядом с планом питания",
  },
];

export const selfLoveCards: CatalogCard[] = [
  {
    eyebrow: "О себе",
    title: "Любовь к себе 1.0",
    summary: "Перестать ненавидеть свое отражение и начать тренироваться из любви, а не из злости.",
    details: "Программа для тех, кто худеет годами и все равно остается недоволен собой.",
    image: "/assets/fit-self-care-portrait.png",
    imageAlt: "Фитнес-тренер в спокойной позе",
  },
  {
    eyebrow: "О себе",
    title: "Любовь к себе 2.0",
    summary: "Не приносить себя в жертву делам, близким или еде.",
    details: "Вторая ступень для тех, кто хочет жить потом, но выбирает начать сейчас.",
    image: "/assets/fit-self-care-full.png",
    imageAlt: "Фитнес-тренер с гантелью",
  },
];

export const guarantees = [
  {
    Icon: BadgePercent,
    title: "Гарантия лучшей цены",
    text: "Лояльная цена для комплекта тренировок и питания с глубоким содержанием и быстрым стартом.",
  },
  {
    Icon: Sparkles,
    title: "Гарантия уникальности программ",
    text: "Все программы собраны под опыт Саши Белоконовой и адаптированы под разные уровни подготовки.",
  },
  {
    Icon: Smile,
    title: "Гарантия результата при соблюдении рекомендаций",
    text: "Задания и рекомендации помогают закреплять результат и двигаться дальше без хаоса.",
  },
  {
    Icon: Clock,
    title: "Гарантия соблюдения сроков обучения",
    text: "Материалы открываются в согласованный срок, чтобы вы спокойно шли по этапам.",
  },
  {
    Icon: ReceiptText,
    title: "Гарантия юридической чистоты сделки",
    text: "Оплата проходит через кассу, а чек приходит на указанный e-mail.",
  },
  {
    Icon: Info,
    title: "Гарантия необходимой информации",
    text: "Вы получаете материалы, которые нужны для тренировок, питания и быстрого старта без лишних вопросов.",
  },
];

export const socialLinks = [
  { label: "Telegram", href: "https://t.me/", short: "TG" },
  { label: "VK", href: "https://vk.com/", short: "VK" },
  { label: "Почта", href: "mailto:hello@example.com", short: "M" },
  { label: "Чат", href: "#form", short: "P" },
];

export const legalLinks = ["Служба заботы", "Оферта", "Политика конфиденциальности", "Согласие на обработку данных"];

export function findProgram(programId: ProgramId): Program {
  return programs.find((program) => program.id === programId) ?? programs[0];
}
