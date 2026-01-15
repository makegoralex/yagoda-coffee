import { useEffect, useMemo, useState } from "react";

const BRAND = {
  name: "Ягода",
  city: "Пенза",
  address: "Пенза, ул. Максима Горького, 37а",
  phone: "+7 (___) ___-__-__",
  tg: "t.me/____",
  vk: "vk.com/____",
  legal: 'ООО "Джемьюн"',
};

const NAV = [
  { id: "home", label: "Главная" },
  { id: "offsite", label: "Выездная кофейня" },
  { id: "cases", label: "Кейсы" },
  { id: "projects", label: "Проекты" },
  { id: "careers", label: "Работа" },
  { id: "contacts", label: "Контакты" },
];

const focusCards = [
  { title: "Пенза", icon: "🏙️" },
  { title: "Выезды", icon: "📅" },
  { title: "Сервис", icon: "✨" },
];

const packages = [
  {
    name: "Light",
    badge: "Небольшие события",
    bullets: ["1 бариста", "2–3 часа", "базовое меню", "до ~X гостей"],
  },
  {
    name: "Standart",
    badge: "Самый частый запрос",
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
    q: "Можно ли брендирование?",
    a: "Да — обсудим стаканы/зону/таблички. Укажите в заявке, подготовим варианты.",
  },
];

const cases = [
  {
    title: "Фестиваль · выездная торговля",
    note: "Поток, короткое меню, скорость.",
  },
  {
    title: "Свадьба · ~70 гостей",
    note: "Камерный формат, спокойная подача.",
  },
  {
    title: "Корпоратив · ~120 гостей",
    note: "Тайминг, стабильность, кофе-брейк.",
  },
];

const projects = [
  {
    title: "Ювелирный проект",
    desc: "Отдельный сайт украшений (ссылка появится).",
    tag: "в процессе",
  },
  {
    title: "Yago POS",
    desc: "POS-система: касса, склад, меню, аналитика, лояльность. Тестируем на своей кофейне.",
    tag: "beta",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = leadOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [leadOpen]);

  const jumpTo = (id) => {
    window.location.hash = `#${id}`;
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container header__content">
          <a className="logo" href="#home">
            <span className="logo__mark">☕</span>
            <span className="logo__text">
              <span className="logo__name">{BRAND.name}</span>
              <span className="logo__meta">твоя кофейня · {BRAND.city}</span>
            </span>
          </a>

          <nav className="nav nav--desktop">
            {NAV.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="nav__link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <button
              className="button button--ghost"
              onClick={() => setLeadOpen(true)}
              type="button"
            >
              Рассчитать выезд
            </button>
            <button
              className="button"
              onClick={() => jumpTo("contacts")}
              type="button"
            >
              Контакты →
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Меню"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="nav nav--mobile">
            {NAV.map((item) => (
              <button
                key={item.id}
                className="nav__link nav__link--mobile"
                onClick={() => jumpTo(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              className="button button--accent"
              onClick={() => setLeadOpen(true)}
              type="button"
            >
              Рассчитать выезд
            </button>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero__content">
            <div className="hero__info">
              <div className="pill-row">
                <span className="pill">✔️ Сделано в «Ягоде»</span>
                <span className="pill">☕ Кофейня</span>
                <span className="pill">👥 Выезды</span>
              </div>
              <h1>
                {BRAND.name} — кофейня и выездная кофейня в {BRAND.city}
              </h1>
              <p className="text-muted">
                Варим кофе в зале и на мероприятиях: фестивали, городские события,
                свадьбы, корпоративы и частные праздники. Быстрый расчёт сметы —
                по заявке.
              </p>
              <div className="hero__actions">
                <button
                  className="button button--accent"
                  onClick={() => setLeadOpen(true)}
                  type="button"
                >
                  Рассчитать выезд →
                </button>
                <button
                  className="button button--ghost"
                  onClick={() => jumpTo("offsite")}
                  type="button"
                >
                  Посмотреть пакеты
                </button>
              </div>
              <div className="hero__meta">
                <span>📍 {BRAND.address}</span>
                <span>📞 {BRAND.phone}</span>
              </div>
            </div>

            <div className="hero__card">
              <div className="card">
                <h3>Быстрый запрос на выезд</h3>
                <div className="form-grid">
                  <div className="form-grid__row">
                    <input placeholder="Дата" />
                    <input placeholder="Гостей" />
                  </div>
                  <input placeholder="Формат (фестиваль / свадьба / корпоратив…)" />
                  <input placeholder="Контакт (тел / TG)" />
                  <button
                    className="button button--accent"
                    type="button"
                    onClick={() => setLeadOpen(true)}
                  >
                    Заполнить заявку
                  </button>
                  <p className="text-muted small">
                    Прототип: позже подключим сохранение заявок (админка) +
                    уведомления.
                  </p>
                </div>
              </div>
              <div className="hero__mini-cards">
                {focusCards.map((item) => (
                  <div className="mini-card" key={item.title}>
                    <span className="text-muted small">Фокус</span>
                    <strong>
                      {item.icon} {item.title}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="offsite">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Целевая услуга</span>
              <h2>Выездная кофейня</h2>
              <p className="text-muted">
                Мы участвовали в фестивалях и городских мероприятиях — и нас можно
                пригласить на ваше событие. Пакеты ниже — ориентиры, финально
                считаем по формату.
              </p>
            </div>

            <div className="grid grid--three">
              {packages.map((pack) => (
                <article
                  key={pack.name}
                  className={`card package ${pack.highlight ? "package--highlight" : ""}`}
                >
                  <div>
                    <h3>{pack.name}</h3>
                    <p className="text-muted small">{pack.badge}</p>
                  </div>
                  <ul>
                    {pack.bullets.map((bullet) => (
                      <li key={bullet}>✓ {bullet}</li>
                    ))}
                  </ul>
                  <button
                    className={`button ${pack.highlight ? "button--accent" : "button--ghost"}`}
                    type="button"
                    onClick={() => setLeadOpen(true)}
                  >
                    Запросить смету
                  </button>
                </article>
              ))}
            </div>

            <div className="grid grid--two section__grid">
              <article className="card">
                <h3>Что входит</h3>
                <ul>
                  {includes.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
                <p className="text-muted small">
                  Опции: альтернативное молоко, второй бариста, брендирование зоны.
                </p>
              </article>
              <article className="card">
                <h3>FAQ</h3>
                <div className="faq">
                  {faq.map((item) => (
                    <div key={item.q} className="faq__item">
                      <strong>{item.q}</strong>
                      <p className="text-muted small">{item.a}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="section__cta">
              <button
                className="button button--accent"
                onClick={() => setLeadOpen(true)}
                type="button"
              >
                Получить расчёт →
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="cases">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Доверие</span>
              <h2>Кейсы</h2>
              <p className="text-muted">
                Добавь реальные фото/отзывы — это сильно повышает конверсию. В
                админке: список кейсов, страница кейса, галерея.
              </p>
            </div>
            <div className="grid grid--three">
              {cases.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p className="text-muted">{item.note}</p>
                  <div className="card__actions">
                    <button className="button button--ghost" type="button">
                      Посмотреть
                    </button>
                    <button
                      className="button button--ghost"
                      type="button"
                      onClick={() => jumpTo("offsite")}
                    >
                      Заказать выезд
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Сделано в «Ягоде»</span>
              <h2>Проекты</h2>
              <p className="text-muted">
                Мы развиваем продукты параллельно кофейне. На сайте — раздел
                «Проекты» как точка доверия и уникальности.
              </p>
            </div>
            <div className="grid grid--two">
              {projects.map((item) => (
                <article key={item.title} className="card">
                  <div className="card__header">
                    <h3>{item.title}</h3>
                    <span className="tag tag--ghost">{item.tag}</span>
                  </div>
                  <p className="text-muted">{item.desc}</p>
                  <div className="card__actions">
                    <button className="button button--ghost" type="button">
                      Открыть
                    </button>
                    <button
                      className="button button--ghost"
                      type="button"
                      onClick={() => jumpTo("contacts")}
                    >
                      Связаться
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="careers">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Команда</span>
              <h2>Работа в «Ягоде»</h2>
              <p className="text-muted">
                Пока простая анкета. В админке: список откликов, экспорт, статусы.
              </p>
            </div>
            <div className="grid grid--two">
              <article className="card">
                <div className="form-grid">
                  <input placeholder="Имя" />
                  <input placeholder="Контакт (тел / TG)" />
                  <input placeholder="Позиция (бариста / помощник)" />
                  <textarea placeholder="Немного о себе и опыте" />
                  <button className="button button--accent" type="button">
                    Отправить анкету
                  </button>
                  <p className="text-muted small">
                    Позже: прикрепление файла/ссылки, согласие на обработку данных.
                  </p>
                </div>
              </article>
              <article className="card">
                <h3>Что важно</h3>
                <div className="note-grid">
                  <div className="note-card">Сервис и скорость</div>
                  <div className="note-card">Любовь к деталям</div>
                  <div className="note-card">Умение работать с потоком</div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="contacts">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Связаться</span>
              <h2>Контакты</h2>
              <p className="text-muted">
                Адрес, соцсети, юр. информация. На проде: карта + кнопки маршрута.
              </p>
            </div>
            <div className="grid grid--two">
              <article className="card">
                <div className="contact-grid">
                  <div>
                    <span className="text-muted small">Адрес</span>
                    <strong>📍 {BRAND.address}</strong>
                  </div>
                  <div>
                    <span className="text-muted small">Телефон</span>
                    <strong>📞 {BRAND.phone}</strong>
                  </div>
                  <div>
                    <span className="text-muted small">Telegram</span>
                    <strong>💬 {BRAND.tg}</strong>
                  </div>
                  <div>
                    <span className="text-muted small">VK</span>
                    <strong>💬 {BRAND.vk}</strong>
                  </div>
                </div>
                <div className="card__actions">
                  <button
                    className="button button--accent"
                    type="button"
                    onClick={() => setLeadOpen(true)}
                  >
                    Заказать выезд →
                  </button>
                  <button className="button button--ghost" type="button">
                    Открыть карту
                  </button>
                </div>
                <div className="card card--note">
                  <p className="text-muted small">Юр. лицо: {BRAND.legal}</p>
                </div>
              </article>
              <article className="card">
                <h3>Написать</h3>
                <div className="form-grid">
                  <input placeholder="Имя" />
                  <input placeholder="Контакт" />
                  <textarea placeholder="Сообщение" />
                  <button className="button button--accent" type="button">
                    Отправить
                  </button>
                  <p className="text-muted small">
                    В проде: заявки уходят в админку + TG уведомления.
                  </p>
                </div>
              </article>
            </div>

            <div className="footer footer--section">
              <div className="footer__content">
                <span>
                  © {new Date().getFullYear()} {BRAND.name}. {BRAND.city} · {BRAND.legal}
                </span>
                <div className="footer__links">
                  <a href="#offsite">Выезды</a>
                  <a href="#projects">Проекты</a>
                  <a href="#careers">Работа</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {leadOpen && (
        <div className="modal">
          <div className="modal__backdrop" onClick={() => setLeadOpen(false)} />
          <div className="modal__content">
            <h3>Заявка на выезд</h3>
            <div className="form-grid">
              <div className="form-grid__row">
                <input placeholder="Дата" />
                <input placeholder="Гостей" />
              </div>
              <input placeholder="Формат" />
              <input placeholder="Локация" />
              <input placeholder="Контакт" />
              <textarea placeholder="Комментарий" />
              <div className="modal__actions">
                <button className="button button--accent" type="button">
                  Отправить
                </button>
                <button
                  className="button button--ghost"
                  type="button"
                  onClick={() => setLeadOpen(false)}
                >
                  Закрыть
                </button>
              </div>
              <p className="text-muted small">
                В проде: сохранить заявку → админка → уведомление в TG.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
