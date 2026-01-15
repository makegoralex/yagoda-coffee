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

const nav = [
  { id: "home", label: "Главная" },
  { id: "offsite", label: "Выездная кофейня" },
  { id: "cases", label: "Кейсы" },
  { id: "projects", label: "Проекты" },
  { id: "cafe", label: "Кофейня" },
  { id: "menu", label: "Меню" },
  { id: "contacts", label: "Контакты" },
];

const seoTags = [
  "выездная кофейня Пенза",
  "кофе на мероприятие Пенза",
  "кофе-брейк Пенза",
  "бариста на выезд",
];

const packages = [
  {
    name: "Light",
    badge: "Небольшие события",
    bullets: ["1 бариста", "2–3 часа", "базовое меню", "до ~X гостей"],
  },
  {
    name: "Standard",
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

const projects = [
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

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

  return (
    <div className="page">
      <header className="header">
        <div className="container header__content">
          <a className="logo" href="#home">
            <span className="logo__mark">☕</span>
            <span className="logo__text">
              <span className="logo__name">{BRAND.name}</span>
              <span className="logo__meta">Кофейня · {BRAND.city}</span>
            </span>
          </a>

          <nav className="nav nav--desktop">
            {nav.map((item) => (
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
              Заказать выезд
            </button>
            <button
              className="button"
              onClick={() => (window.location.hash = "#contacts")}
              type="button"
            >
              Контакты →
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
              aria-label="Открыть меню"
            >
              ☰
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="nav nav--mobile">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero__content">
            <div className="hero__info">
              <div className="tag-row">
                <span className="tag">Сделано в «Ягоде»</span>
                <span className="tag">Кофейня</span>
                <span className="tag">Выездная кофейня</span>
              </div>
              <h1>
                Кофейня «{BRAND.name}» в {BRAND.city}
              </h1>
              <p className="text-muted">
                Мы варим кофе в зале и на мероприятиях — от фестивалей и городских
                событий до свадеб, дней рождений и корпоративов. Это сайт-визитка
                и витрина выездной кофейни: здесь можно посмотреть, как мы
                работаем, и быстро запросить смету.
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
                  onClick={() => (window.location.hash = "#cafe")}
                  type="button"
                >
                  Как нас найти
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
                  <label>
                    Дата
                    <input placeholder="Напр. 20.02" />
                  </label>
                  <label>
                    Гостей
                    <input placeholder="Напр. 80" />
                  </label>
                  <label>
                    Формат
                    <input placeholder="Фестиваль / свадьба / корпоратив" />
                  </label>
                  <label>
                    Контакт (тел/мессенджер)
                    <input placeholder="@username или +7…" />
                  </label>
                  <button
                    className="button button--accent"
                    type="button"
                    onClick={() => setLeadOpen(true)}
                  >
                    Заполнить подробную заявку
                  </button>
                  <p className="text-muted small">
                    Прототип: форма не отправляет данные. Позже подключим CRM /
                    Telegram.
                  </p>
                </div>
              </div>
              <div className="hero__mini-cards">
                {["выезды", "сервис", "качество"].map((item) => (
                  <div className="mini-card" key={item}>
                    <span className="text-muted small">Упор</span>
                    <strong>{item}</strong>
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
              <h2>Выездная кофейня в {BRAND.city}</h2>
              <p className="text-muted">
                Нас можно пригласить на мероприятие — расскажите формат и гостей,
                мы предложим пакет и смету.
              </p>
            </div>

            <div className="tag-row">
              {seoTags.map((tag) => (
                <span className="tag tag--ghost" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="card formats">
              {formats.map((item) => (
                <div key={item.title} className="format-card">
                  <h4>{item.title}</h4>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              ))}
              <div className="formats__actions">
                <button
                  className="button button--accent"
                  onClick={() => setLeadOpen(true)}
                  type="button"
                >
                  Получить расчет →
                </button>
                <button
                  className="button button--ghost"
                  onClick={() => (window.location.hash = "#cases")}
                  type="button"
                >
                  Посмотреть кейсы
                </button>
              </div>
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

            <div className="grid grid--two">
              <article className="card">
                <h3>Что входит</h3>
                <ul>
                  {includes.map((item) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
                <p className="text-muted small">
                  Опции: альтернативное молоко, второй бариста, брендирование
                  стаканов/зоны.
                </p>
              </article>
              <article className="card">
                <h3>Как это проходит</h3>
                <ol className="timeline">
                  {[
                    "Заявка",
                    "Уточнение",
                    "Смета/условия",
                    "Выезд",
                  ].map((step, index) => (
                    <li key={step}>
                      <span className="timeline__index">{index + 1}</span>
                      <div>
                        <strong>{step}</strong>
                        <p className="text-muted small">
                          {index === 0
                            ? "Дата, формат, гостей, площадка — 1–2 минуты."
                            : index === 1
                            ? "Тайминг, требования по месту/электричеству, меню."
                            : index === 2
                            ? "Фиксируем пакет и условия."
                            : "Приезжаем, настраиваем, работаем, убираем."}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <button
                  className="button button--accent"
                  type="button"
                  onClick={() => setLeadOpen(true)}
                >
                  Оставить заявку
                </button>
              </article>
            </div>

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
        </section>

        <section className="section" id="cases">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Доверие</span>
              <h2>Кейсы</h2>
              <p className="text-muted">
                Сюда добавляются реальные фото/отзывы. В админке — управление
                кейсами.
              </p>
            </div>
            <div className="grid grid--three">
              {cases.map((item) => (
                <article key={item.title} className="card">
                  <h3>{item.title}</h3>
                  <p className="text-muted small">{item.place}</p>
                  <p className="text-muted">{item.note}</p>
                  <div className="card__actions">
                    <button className="button button--ghost" type="button">
                      Посмотреть
                    </button>
                    <button
                      className="button button--ghost"
                      type="button"
                      onClick={() => (window.location.hash = "#offsite")}
                    >
                      Заказать выезд
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <article className="card card--note">
              <strong>Отзывы</strong>
              <p className="text-muted small">
                Добавь 6–10 коротких отзывов — это сильно поднимает конверсию.
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">То, что мы делаем параллельно</span>
              <h2>Проекты</h2>
              <p className="text-muted">
                Пока — карточки с описанием и будущими ссылками. В админке —
                редактирование.
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
                      Открыть (позже)
                    </button>
                    <button
                      className="button button--ghost"
                      type="button"
                      onClick={() => (window.location.hash = "#contacts")}
                    >
                      Связаться
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <article className="card card--note">
              <strong>«Сделано в Ягоде»</strong>
              <p className="text-muted small">
                Лейбл для вещей/идей/новинок, которые рождаются здесь. На сайте
                он используется как бирка, не как лозунг.
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="cafe">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">О точке</span>
              <h2>Кофейня</h2>
              <p className="text-muted">
                Адрес, часы, фото, коротко — что внутри.
              </p>
            </div>
            <div className="grid grid--two">
              <article className="card">
                <div className="info-block">
                  <span className="text-muted small">Адрес</span>
                  <strong>📍 {BRAND.address}</strong>
                </div>
                <div className="info-block">
                  <span className="text-muted small">Часы</span>
                  <strong>(вставь график)</strong>
                </div>
                <div className="info-block">
                  <span className="text-muted small">Контакт</span>
                  <strong>📞 {BRAND.phone}</strong>
                </div>
                <div className="card card--note">
                  <strong>Сделано в Ягоде</strong>
                  <p className="text-muted small">
                    Здесь можно показать: собственные идеи/прототипы/мелкие
                    предметы/новинки меню. (Без «зелени в шапке», просто как
                    особенность внутри кофейни.)
                  </p>
                </div>
                <div className="card card--note">
                  <p className="text-muted small">
                    Здесь добавь галерею 6–10 фото зала.
                  </p>
                </div>
              </article>
              <article className="card">
                <h3>Карта</h3>
                <p className="text-muted small">
                  Вставь Яндекс/2ГИС карту + кнопки «Построить маршрут».
                </p>
                <div className="card__actions">
                  <button
                    className="button button--ghost"
                    type="button"
                    onClick={() => (window.location.hash = "#menu")}
                  >
                    Меню
                  </button>
                  <button
                    className="button button--accent"
                    type="button"
                    onClick={() => (window.location.hash = "#contacts")}
                  >
                    Контакты →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="menu">
          <div className="container">
            <div className="section__header">
              <span className="eyebrow">Быстро и понятно</span>
              <h2>Меню</h2>
              <p className="text-muted">
                MVP: список и цены. Позже — PDF и сезонные позиции через админку.
              </p>
            </div>
            <div className="grid grid--two">
              {Object.entries(menu).map(([category, items]) => (
                <article key={category} className="card">
                  <h3>{category}</h3>
                  <div className="menu-list">
                    {items.map((item) => (
                      <div className="menu-item" key={item.name}>
                        <span>{item.name}</span>
                        <span className="text-muted small">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
              <article className="card">
                <h3>Сезонное / Новинки</h3>
                <p className="text-muted small">
                  1–3 позиции, которые реально двигают продажи. Управление — через
                  админку.
                </p>
                <button className="button button--ghost" type="button">
                  Скачать меню PDF
                </button>
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
                TG/VK + телефон. И отдельный быстрый путь к заявке на выезд.
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
                <h3>Быстрая заявка</h3>
                <div className="form-grid">
                  <label>
                    Имя
                    <input placeholder="Ваше имя" />
                  </label>
                  <label>
                    Телефон или мессенджер
                    <input placeholder="+7..." />
                  </label>
                  <label>
                    Дата / формат / гостей
                    <input placeholder="Напр. 20.02, свадьба, 80 гостей" />
                  </label>
                  <label>
                    Комментарий
                    <textarea placeholder="Пожелания по меню и таймингам" />
                  </label>
                  <button
                    className="button button--accent"
                    type="button"
                    onClick={() => setLeadOpen(true)}
                  >
                    Отправить
                  </button>
                  <p className="text-muted small">
                    Позже подключим админку и сохранение заявок + уведомления в
                    Telegram.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__content">
          <span>
            © {new Date().getFullYear()} {BRAND.name}. {BRAND.city} ·{" "}
            {BRAND.legal}
          </span>
          <div className="footer__links">
            <a href="#offsite">Выездная кофейня</a>
            <a href="#menu">Меню</a>
            <a href="#projects">Проекты</a>
          </div>
        </div>
      </footer>

      {leadOpen && (
        <div className="modal">
          <div
            className="modal__backdrop"
            onClick={() => setLeadOpen(false)}
          />
          <div className="modal__content">
            <h3>Заявка на выезд</h3>
            <div className="form-grid">
              <label>
                Дата
                <input placeholder="20 февраля" />
              </label>
              <label>
                Гостей
                <input placeholder="120" />
              </label>
              <label>
                Формат
                <input placeholder="Фестиваль / свадьба / корпоратив" />
              </label>
              <label>
                Локация
                <input placeholder="Пенза, площадка" />
              </label>
              <label>
                Контакт
                <input placeholder="Телефон или @username" />
              </label>
              <label>
                Комментарий
                <textarea placeholder="Тайминг, пожелания, брендирование…" />
              </label>
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
                Прототип. В реале: сохранить лид в админке + отправить
                уведомление в TG.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
