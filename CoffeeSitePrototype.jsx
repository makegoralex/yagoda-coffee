import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  Calendar,
  Users,
  Zap,
  Coffee,
  Sparkles,
  Layers,
  CheckCircle2,
  HelpCircle,
  Building2,
  Camera,
  BadgeCheck,
  Quote,
} from "lucide-react";

/**
 * Прототип сайта кофейни «Ягода» + выездная кофейня (предпросмотр).
 * Один файл, Tailwind + shadcn/ui + framer-motion.
 */

const BRAND = {
  name: "Ягода",
  city: "Пенза",
  address: "Пенза, ул. Максима Горького, 37а",
  phone: "+7 (___) ___-__-__",
  tg: "t.me/____",
  vk: "vk.com/____",
  legal: 'ООО "Джемьюн"',
};

const nav = [
  { id: "home", label: "Главная" },
  { id: "offsite", label: "Выездная кофейня" },
  { id: "cases", label: "Кейсы" },
  { id: "projects", label: "Проекты" },
  { id: "cafe", label: "Кофейня" },
  { id: "menu", label: "Меню" },
  { id: "contacts", label: "Контакты" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useHashScroll() {
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hashchange", onHash);
    setTimeout(onHash, 50);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function Section({ id, eyebrow, title, subtitle, children, className }) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          {eyebrow ? (
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              <span>{eyebrow}</span>
            </div>
          ) : null}
          {title ? (
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-3xl">
              {subtitle}
            </p>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <Badge variant="secondary" className="gap-2 py-1.5 px-3 rounded-full">
      <Icon className="h-4 w-4" />
      <span className="text-sm">{children}</span>
    </Badge>
  );
}

function MiniTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function Header({ onOpenLead }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70",
        scrolled ? "bg-background/80" : "bg-background/40"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl border flex items-center justify-center shadow-sm">
              <Coffee className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{BRAND.name}</div>
              <div className="text-xs text-muted-foreground">
                Кофейня · {BRAND.city}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm px-3 py-2 rounded-xl hover:bg-muted transition"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden sm:inline-flex"
              onClick={onOpenLead}
            >
              Заказать выезд
            </Button>
            <Button onClick={() => (window.location.hash = "#contacts")}>
              Контакты <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onOpenLead }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-muted blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-muted blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2 mb-5">
              <Pill icon={Sparkles}>Сделано в «Ягоде»</Pill>
              <Pill icon={Coffee}>Кофейня</Pill>
              <Pill icon={Layers}>Выездная кофейня</Pill>
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              Кофейня «{BRAND.name}» в {BRAND.city}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
              Мы варим кофе в зале и на мероприятиях — от фестивалей и городских
              событий до свадеб, дней рождений и корпоративов. Это сайт-визитка и
              витрина выездной кофейни: здесь можно посмотреть, как мы работаем,
              и быстро запросить смету.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={onOpenLead}>
                Рассчитать выезд <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => (window.location.hash = "#cafe")}
              >
                Как нас найти
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {BRAND.address}
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> {BRAND.phone}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5" /> Быстрый запрос на выезд
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Дата
                      </label>
                      <div className="mt-1">
                        <Input placeholder="Напр. 20.02" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Гостей
                      </label>
                      <div className="mt-1">
                        <Input placeholder="Напр. 80" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Формат
                    </label>
                    <div className="mt-1">
                      <Input placeholder="Фестиваль / свадьба / корпоратив" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Контакт (тел/мессенджер)
                    </label>
                    <div className="mt-1">
                      <Input placeholder="@username или +7…" />
                    </div>
                  </div>
                  <Button onClick={onOpenLead} className="w-full">
                    Заполнить подробную заявку
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Прототип: форма не отправляет данные. Позже подключим CRM /
                    Telegram.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {["выезды", "сервис", "качество"].map((t) => (
                <Card key={t} className="rounded-3xl">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Упор</div>
                    <div className="mt-1 text-xl font-semibold">{t}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function WhatWeDo({ onOpenLead }) {
  const items = [
    {
      icon: Building2,
      title: "Кофейня",
      desc: "Ежедневно. Кофе, завтраки и атмосфера. Можно посидеть, поработать и взять с собой.",
      cta: "Как нас найти",
      href: "#cafe",
    },
    {
      icon: Coffee,
      title: "Выездная кофейня",
      desc: "Кофе на мероприятия: фестивали, ярмарки, свадьбы, ДР, корпоративы, конференции.",
      cta: "Заказать выезд",
      href: "#offsite",
      primary: true,
    },
  ];

  return (
    <Section
      id="home"
      eyebrow="Сайт-визитка + лидогенерация"
      title="Что мы делаем"
      subtitle="Главная — про бренд и кофейню. Страница выездов — про заявки и SEO по Пензе."
      className="py-10"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <Card key={it.title} className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <it.icon className="h-5 w-5" />
                    <div className="text-xl font-semibold">{it.title}</div>
                  </div>
                  <p className="mt-2 text-muted-foreground">{it.desc}</p>
                  <div className="mt-4 flex gap-2">
                    {it.primary ? (
                      <Button onClick={onOpenLead}>
                        {it.cta} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => (window.location.hash = it.href)}
                      >
                        {it.cta}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => (window.location.hash = it.href)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col gap-2 items-end">
                  <MiniTag>Сделано в Ягоде</MiniTag>
                  <MiniTag>Выездная кофейня</MiniTag>
                  <MiniTag>Пенза</MiniTag>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Benefits() {
  const points = [
    {
      icon: CheckCircle2,
      title: "Оборудование и подготовка",
      desc: "Привозим, настраиваем, работаем аккуратно — организаторам спокойно.",
    },
    {
      icon: Users,
      title: "Работаем с потоком",
      desc: "Подстроим скорость обслуживания под формат и количество гостей.",
    },
    {
      icon: Zap,
      title: "Сервис",
      desc: "Вежливо, быстро, без суеты. Это важнее «акций» на мероприятии.",
    },
    {
      icon: Sparkles,
      title: "Пакеты под задачу",
      desc: "Лёгкий формат / стандарт / большой выезд — под ваш сценарий.",
    },
  ];

  return (
    <Section
      id="benefits"
      eyebrow="Почему выбирают"
      title="Надёжный выезд + понятный сервис"
      subtitle="Сайт должен объяснять услугу за 30 секунд и давать быстрый путь к заявке."
      className="py-10"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {points.map((p) => (
          <Card key={p.title} className="rounded-3xl">
            <CardContent className="p-6">
              <div className="h-10 w-10 rounded-2xl border flex items-center justify-center shadow-sm">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Offsite({ onOpenLead }) {
  const formats = [
    {
      title: "Фестивали / ярмарки",
      desc: "Участие в выездных продажах и плотный поток.",
    },
    { title: "Свадьбы", desc: "Аккуратная подача и спокойный сервис." },
    { title: "Дни рождения", desc: "Камерно или с потоком — под формат." },
    { title: "Корпоративы", desc: "Кофе-брейк, скорость, стабильность." },
    { title: "Конференции", desc: "Тайминг и ранний старт." },
  ];

  const packages = [
    {
      name: "Light",
      badge: "Небольшие события",
      bullets: ["1 бариста", "2–3 часа", "базовое меню", "до ~X гостей"],
    },
    {
      name: "Standart",
      badge: "Оптимально для большинства",
      bullets: [
        "1–2 бариста",
        "3–5 часов",
        "расширенное меню",
        "до ~Y гостей",
      ],
      highlight: true,
    },
    {
      name: "Full",
      badge: "Большие мероприятия",
      bullets: [
        "2+ бариста",
        "высокий поток",
        "дольше по времени",
        "индивидуальный расчёт",
      ],
    },
  ];

  const includes = [
    "Кофемашина и кофемолка",
    "Бариста",
    "Кофе, молоко, расходники",
    "Рабочее место/стойка",
    "Настройка и демонтаж",
  ];

  const faq = [
    {
      q: "Сколько места нужно?",
      a: "Обычно достаточно небольшой зоны (ориентир — от 2×2 м). Точно скажем после уточнения площадки.",
    },
    {
      q: "Какие требования по электричеству?",
      a: "Чаще всего достаточно стандартной линии. Всё уточним заранее под ваш формат.",
    },
    {
      q: "Можно ли выезд без молока/с альтернативой?",
      a: "Да — просто укажите в заявке, заложим в смету.",
    },
  ];

  return (
    <Section
      id="offsite"
      eyebrow="Целевая услуга"
      title={`Выездная кофейня в ${BRAND.city}`}
      subtitle="Нас можно пригласить на мероприятие — расскажите формат и гостей, мы предложим пакет и смету."
      className="py-12"
    >
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "выездная кофейня Пенза",
              "кофе на мероприятие Пенза",
              "кофе-брейк Пенза",
              "бариста на выезд",
            ].map((t) => (
              <MiniTag key={t}>{t}</MiniTag>
            ))}
          </div>

          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {formats.map((f) => (
                  <div key={f.title} className="rounded-2xl border p-4">
                    <div className="font-semibold">{f.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={onOpenLead}>
                  Получить расчет <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => (window.location.hash = "#cases")}
                >
                  Посмотреть кейсы
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {packages.map((p) => (
              <Card
                key={p.name}
                className={cn(
                  "rounded-3xl",
                  p.highlight ? "shadow-sm border-foreground/20" : ""
                )}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xl font-semibold">{p.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {p.badge}
                      </div>
                    </div>
                    {p.highlight ? <Badge>Рекомендуем</Badge> : null}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> {b}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-5 w-full"
                    variant={p.highlight ? "default" : "secondary"}
                    onClick={onOpenLead}
                  >
                    Запросить смету
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">Что входит</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {includes.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-2xl border p-4 text-sm text-muted-foreground">
                  Опции: альтернативное молоко, второй бариста, брендирование
                  стаканов/зоны.
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">Как это проходит</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  {["Заявка", "Уточнение", "Смета/условия", "Выезд"].map(
                    (s, idx) => (
                      <li key={s} className="flex gap-3">
                        <div className="h-7 w-7 rounded-full border flex items-center justify-center text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-medium">{s}</div>
                          <div className="text-muted-foreground">
                            {idx === 0
                              ? "Дата, формат, гостей, площадка — 1–2 минуты."
                              : idx === 1
                              ? "Тайминг, требования по месту/электричеству, меню."
                              : idx === 2
                              ? "Фиксируем пакет и условия."
                              : "Приезжаем, настраиваем, работаем, убираем."}
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ol>
                <Button className="mt-5 w-full" onClick={onOpenLead}>
                  Оставить заявку
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" /> FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {faq.map((f) => (
                  <div key={f.q} className="rounded-2xl border p-4">
                    <div className="font-semibold">{f.q}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {f.a}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Card className="rounded-3xl shadow-sm lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Заявка на выезд
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div>
                  <label className="text-sm text-muted-foreground">Дата</label>
                  <Input className="mt-1" placeholder="Напр. 20 февраля" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Формат
                  </label>
                  <Input
                    className="mt-1"
                    placeholder="Фестиваль / свадьба / корпоратив"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Гостей</label>
                  <Input className="mt-1" placeholder="Напр. 120" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Локация
                  </label>
                  <Input className="mt-1" placeholder="Пенза, площадка" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Контакт
                  </label>
                  <Input className="mt-1" placeholder="Телефон или @username" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Комментарий
                  </label>
                  <Textarea
                    className="mt-1"
                    placeholder="Тайминг, пожелания, брендирование…"
                  />
                </div>
                <Button onClick={onOpenLead}>
                  Получить смету <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                  Позже подключим админку и отправку заявок в Telegram/CRM.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Cases() {
  const cases = [
    {
      title: "Фестиваль · выездная торговля",
      place: "Пенза (пример)",
      note: "Поток, быстрый сервис, короткое меню.",
    },
    {
      title: "Свадьба · ~70 гостей",
      place: "Пенза (пример)",
      note: "Камерный формат, аккуратная подача.",
    },
    {
      title: "Корпоратив · ~120 гостей",
      place: "Пенза (пример)",
      note: "Кофе-брейк, тайминг, стабильность.",
    },
  ];

  return (
    <Section
      id="cases"
      eyebrow="Доверие"
      title="Кейсы"
      subtitle="Сюда добавляются реальные фото/отзывы. В админке — управление кейсами."
      className="py-12"
    >
      <div className="grid md:grid-cols-3 gap-4">
        {cases.map((c) => (
          <Card key={c.title} className="rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {c.place}
                  </div>
                </div>
                <Camera className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => alert("Страница кейса (позже)")}
                >
                  Посмотреть
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => (window.location.hash = "#offsite")}
                >
                  Заказать выезд
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl mt-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-semibold">Отзывы</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Добавь 6–10 коротких отзывов — это сильно поднимает конверсию.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

function Projects() {
  const items = [
    {
      title: "Ювелирный проект",
      desc: "Сайт украшений (пока заглушка). Каталог, истории изделий, новинки.",
      tag: "в процессе",
    },
    {
      title: "Yago POS",
      desc: "POS-система: касса, склад, меню, аналитика, лояльность. Тестируем на своей кофейне.",
      tag: "beta",
    },
  ];

  return (
    <Section
      id="projects"
      eyebrow="То, что мы делаем параллельно"
      title="Проекты"
      subtitle="Пока — карточки с описанием и будущими ссылками. В админке — редактирование."
      className="py-12"
    >
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <Card key={it.title} className="rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold">{it.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {it.desc}
                  </div>
                </div>
                <Badge variant="secondary">{it.tag}</Badge>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => alert("Ссылка появится позже")}
                >
                  Открыть (позже)
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => (window.location.hash = "#contacts")}
                >
                  Связаться
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl mt-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-semibold">«Сделано в Ягоде»</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Лейбл для вещей/идей/новинок, которые рождаются здесь. На сайте
                он используется как бирка, не как лозунг.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

function Cafe() {
  return (
    <Section
      id="cafe"
      eyebrow="О точке"
      title="Кофейня"
      subtitle="Адрес, часы, фото, коротко — что внутри."
      className="py-12"
    >
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Адрес</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {BRAND.address}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Часы</div>
                    <div className="mt-1 font-semibold">(вставь график)</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Контакт</div>
                    <div className="mt-1 font-semibold flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {BRAND.phone}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">Сделано в Ягоде</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Здесь можно показать: собственные идеи/прототипы/мелкие
                    предметы/новинки меню. (Без “зелени в шапке”, просто как
                    особенность внутри кофейни.)
                  </div>
                </div>

                <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                  Здесь добавь галерею 6–10 фото зала.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Карта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                Вставь Яндекс/2ГИС карту + кнопки «Построить маршрут».
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => (window.location.hash = "#menu")}
                >
                  Меню
                </Button>
                <Button onClick={() => (window.location.hash = "#contacts")}>
                  Контакты <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Menu() {
  const menu = useMemo(
    () => ({
      Кофе: [
        { name: "Эспрессо", price: "—" },
        { name: "Американо", price: "—" },
        { name: "Капучино", price: "—" },
        { name: "Латте", price: "—" },
        { name: "Фильтр", price: "—" },
      ],
      Напитки: [
        { name: "Какао", price: "—" },
        { name: "Чай", price: "—" },
      ],
      Завтраки: [
        { name: "(пункт)", price: "—" },
        { name: "(пункт)", price: "—" },
      ],
      Десерты: [
        { name: "Круассан", price: "—" },
        { name: "(пункт)", price: "—" },
      ],
    }),
    []
  );

  return (
    <Section
      id="menu"
      eyebrow="Быстро и понятно"
      title="Меню"
      subtitle="MVP: список и цены. Позже — PDF и сезонные позиции через админку."
      className="py-12"
    >
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(menu).map(([cat, items]) => (
              <Card key={cat} className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-lg">{cat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {items.map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="text-sm">{it.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {it.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <Card className="rounded-3xl lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-lg">Сезонное / Новинки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                1–3 позиции, которые реально двигают продажи. Управление — через
                админку.
              </div>
              <Button
                className="mt-4 w-full"
                variant="secondary"
                onClick={() => alert("PDF позже")}
              >
                Скачать меню PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Contacts({ onOpenLead }) {
  return (
    <Section
      id="contacts"
      eyebrow="Связаться"
      title="Контакты"
      subtitle="TG/VK + телефон. И отдельный быстрый путь к заявке на выезд."
      className="py-12"
    >
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card className="rounded-3xl shadow-sm">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Адрес</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {BRAND.address}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Телефон</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4" /> {BRAND.phone}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telegram</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> {BRAND.tg}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">VK</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> {BRAND.vk}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button onClick={onOpenLead}>
                  Заказать выезд <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => alert("Карта позже")}>
                  Открыть карту
                </Button>
              </div>

              <div className="mt-5 rounded-2xl border p-4 text-sm text-muted-foreground">
                Юр. лицо: {BRAND.legal}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Быстрая заявка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Input placeholder="Имя" />
                <Input placeholder="Телефон или мессенджер" />
                <Input placeholder="Дата / формат / гостей" />
                <Textarea placeholder="Комментарий" />
                <Button onClick={onOpenLead}>Отправить</Button>
                <p className="text-xs text-muted-foreground">
                  Позже подключим админку и сохранение заявок + уведомления в
                  Telegram.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.city} ·{" "}
            {BRAND.legal}
          </div>
          <div className="flex gap-3">
            <a className="hover:underline" href="#offsite">
              Выездная кофейня
            </a>
            <a className="hover:underline" href="#menu">
              Меню
            </a>
            <a className="hover:underline" href="#projects">
              Проекты
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function LeadModal({ open, onClose }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2"
          >
            <Card className="rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coffee className="h-5 w-5" /> Заявка на выезд
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!sent ? (
                  <div className="grid gap-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Дата
                        </label>
                        <Input className="mt-1" placeholder="20 февраля" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">
                          Гостей
                        </label>
                        <Input className="mt-1" placeholder="120" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Формат
                      </label>
                      <Input
                        className="mt-1"
                        placeholder="Фестиваль / свадьба / корпоратив"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Локация
                      </label>
                      <Input className="mt-1" placeholder="Пенза, площадка" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Контакт
                      </label>
                      <Input className="mt-1" placeholder="Телефон или @username" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">
                        Комментарий
                      </label>
                      <Textarea
                        className="mt-1"
                        placeholder="Тайминг, пожелания, брендирование…"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => setSent(true)}>
                        Отправить
                      </Button>
                      <Button variant="secondary" onClick={onClose}>
                        Закрыть
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Прототип. В реале: сохранить лид в админке + отправить
                      уведомление в TG.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border p-4">
                    <div className="font-semibold">Заявка принята (прототип)</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Здесь будет подтверждение и сообщение о времени ответа.
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button onClick={onClose}>Ок</Button>
                      <Button
                        variant="secondary"
                        onClick={() => (window.location.hash = "#contacts")}
                      >
                        Контакты
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function CoffeeSitePrototype() {
  useHashScroll();
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onOpenLead={() => setLeadOpen(true)} />

      <main>
        <Hero onOpenLead={() => setLeadOpen(true)} />
        <WhatWeDo onOpenLead={() => setLeadOpen(true)} />
        <Benefits />
        <Offsite onOpenLead={() => setLeadOpen(true)} />
        <Cases />
        <Projects />
        <Cafe />
        <Menu />
        <Contacts onOpenLead={() => setLeadOpen(true)} />
      </main>

      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}
