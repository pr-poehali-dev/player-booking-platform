import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/ddacb37f-c509-4b4d-b31c-04b0d2cc1583.jpg";
const PLAYER_IMG = "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/5fad6ce7-68ed-47e6-9db6-71a9475c276f.jpg";
const SCHEDULE_IMG = "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/17856d85-cdf0-4806-a77e-92833fa92891.jpg";

type Section = "home" | "profiles" | "booking" | "schedule" | "about";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "profiles", label: "Профили", icon: "Users" },
  { id: "booking", label: "Запись", icon: "CalendarPlus" },
  { id: "schedule", label: "Расписание", icon: "Calendar" },
  { id: "about", label: "О нас", icon: "Info" },
];

const PLAYERS = [
  {
    id: 1, name: "STORM_X", role: "Снайпер", rank: "Легенда", wins: 842, kda: "4.7",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/82a38df4-e4c3-477a-8ef7-4dcb2fee2c12.jpg",
    online: true, tag: "#1337",
    desc: "Легендарный снайпер с идеальной точностью. Специализируется на дальних дистанциях, ни один враг не уходит от его прицела. 5 сезонов в Топ-10 мирового рейтинга.",
  },
  {
    id: 2, name: "VOID_REAPER", role: "Штурмовик", rank: "Мастер", wins: 671, kda: "3.9",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/5db1dae4-2ff0-4935-9e24-6a34834bdd94.jpg",
    online: false, tag: "#0842",
    desc: "Агрессивный штурмовик первой линии. Врывается в самую гущу боя и создаёт хаос в рядах противника. Победитель 3 региональных чемпионатов.",
  },
  {
    id: 3, name: "NOVA_GIRL", role: "Поддержка", rank: "Алмаз", wins: 553, kda: "5.1",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/3a2d4441-25ec-4c58-85cd-c4d67b961e30.jpg",
    online: true, tag: "#2024",
    desc: "Лучший игрок поддержки на платформе. Её уникальный стиль игры — удерживать команду живой в самых безнадёжных ситуациях. KDA 5.1 — абсолютный рекорд.",
  },
  {
    id: 4, name: "DARK_BLADE", role: "Танк", rank: "Платина", wins: 430, kda: "2.8",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/59dc8006-0236-4017-bf33-42261129cb0a.jpg",
    online: false, tag: "#7777",
    desc: "Несокрушимый танк, щит команды. Поглощает урон, который убил бы любого другого. Опытный ветеран с 6-летним стажем в профессиональном киберспорте.",
  },
  {
    id: 5, name: "ECLIPSE", role: "Контроль", rank: "Мастер", wins: 712, kda: "4.2",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/38148434-186b-413b-9141-a3528ac7e517.jpg",
    online: true, tag: "#0001",
    desc: "Мастер тактики и контроля карты. Читает игру на несколько ходов вперёд и блокирует стратегии противника ещё до их реализации. Аналитический гений.",
  },
  {
    id: 6, name: "PHANTOM", role: "Разведчик", rank: "Алмаз", wins: 589, kda: "3.6",
    img: "https://cdn.poehali.dev/projects/972ca233-0513-4a9b-9c10-76f104e4c5de/files/5a109040-4fba-4230-ba32-936586101261.jpg",
    online: false, tag: "#9000",
    desc: "Неуловимый разведчик, невидимый до последнего момента. Собирает информацию о противнике и наносит удар там, где его не ждут. Специалист по засадам.",
  },
];

const SCHEDULE_EVENTS = [
  { id: 1, time: "10:00", title: "Турнир «Буря» — Квалификация", type: "tournament", date: "7 апр", spots: 3 },
  { id: 2, time: "14:00", title: "Тренировочный матч — Команда A", type: "training", date: "7 апр", spots: 8 },
  { id: 3, time: "18:00", title: "Открытый чемпионат — Полуфинал", type: "tournament", date: "8 апр", spots: 0 },
  { id: 4, time: "20:30", title: "Ночная сессия — Pro лига", type: "pro", date: "8 апр", spots: 2 },
  { id: 5, time: "12:00", title: "Мастер-класс по стратегии", type: "training", date: "9 апр", spots: 12 },
  { id: 6, time: "16:00", title: "Финал «Буря» — Гранд-финал", type: "tournament", date: "10 апр", spots: 1 },
];

const TEAM_MEMBERS = [
  { name: "Алексей Громов", role: "Главный тренер", exp: "8 лет опыта" },
  { name: "Мария Сокол", role: "Аналитик команды", exp: "5 лет опыта" },
  { name: "Дмитрий Нова", role: "Pro-игрок / Наставник", exp: "Топ-100 мира" },
  { name: "Ирина Стрела", role: "Менеджер платформы", exp: "Организатор турниров" },
];

const eventTypeStyles: Record<string, string> = {
  tournament: "border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_8px_rgba(0,229,255,0.25)]",
  training: "border-[var(--neon-purple)] text-[var(--neon-purple)] shadow-[0_0_8px_rgba(155,89,255,0.25)]",
  pro: "border-[var(--neon-pink)] text-[var(--neon-pink)] shadow-[0_0_8px_rgba(255,45,120,0.25)]",
};
const eventTypeLabel: Record<string, string> = {
  tournament: "Турнир",
  training: "Тренировка",
  pro: "Pro лига",
};

const rankColors: Record<string, string> = {
  "Легенда": "gradient-text-purple-pink",
  "Мастер": "gradient-text-cyan-purple",
  "Алмаз": "text-sky-400",
  "Платина": "text-slate-300",
};

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", phone: "", event: "", notify: [] as string[] });
  const [bookingDone, setBookingDone] = useState(false);

  const goTo = (id: Section) => {
    setActive(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen bg-background mesh-bg overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goTo("home")}>
            <div className="w-8 h-8 rounded-lg gradient-cyan-purple flex items-center justify-center animate-pulse-glow">
              <Icon name="Zap" size={16} className="text-background" />
            </div>
            <span className="font-display text-xl tracking-wider neon-text-cyan">GAME<span className="text-foreground">ZONE</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                  active === item.id
                    ? "glass-strong neon-text-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo("booking")}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium gradient-cyan-purple text-background btn-glow-cyan"
            >
              <Icon name="CalendarPlus" size={15} />
              Записаться
            </button>
            <button
              className="md:hidden p-2 rounded-lg glass"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass-strong border-t border-[var(--glass-border)] p-4 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-body text-sm transition-all ${
                  active === item.id ? "glass neon-text-cyan" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => goTo("booking")}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-body font-medium gradient-cyan-purple text-background"
            >
              <Icon name="CalendarPlus" size={15} />
              Записаться на игру
            </button>
          </div>
        )}
      </nav>

      <main className="pt-16">

        {/* ========== HOME ========== */}
        {active === "home" && (
          <div>
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
              <div className="absolute inset-0 mesh-bg" />

              <div className="relative max-w-7xl mx-auto px-6 py-24">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-6 animate-fade-in">
                    <div className="h-px w-10 gradient-cyan-purple" />
                    <span className="font-body text-sm text-[var(--neon-cyan)] tracking-widest uppercase">Игровая платформа нового уровня</span>
                  </div>
                  <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl leading-none mb-6 animate-fade-in delay-100">
                    ИГРАЙ
                    <br />
                    <span className="gradient-text-cyan-purple">НА УРОВНЕ</span>
                    <br />
                    ЛЕГЕНДЫ
                  </h1>
                  <p className="font-body text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed animate-fade-in delay-200">
                    Профили игроков, онлайн-расписание, мгновенная запись на турниры и уведомления в Telegram и SMS — всё в одном месте.
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
                    <button
                      onClick={() => goTo("booking")}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-display text-base tracking-wider gradient-cyan-purple text-background btn-glow-cyan"
                    >
                      <Icon name="CalendarPlus" size={18} />
                      ЗАПИСАТЬСЯ
                    </button>
                    <button
                      onClick={() => goTo("profiles")}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-display text-base tracking-wider glass border border-[var(--neon-purple)]/50 hover:bg-white/10 transition-all text-[var(--neon-purple)]"
                    >
                      <Icon name="Users" size={18} />
                      ПРОФИЛИ
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-8 mt-14 animate-fade-in delay-400">
                    {[
                      { value: "1 200+", label: "Активных игроков" },
                      { value: "340+", label: "Турниров сыграно" },
                      { value: "98%", label: "Довольных участников" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div className="font-display text-3xl gradient-text-cyan-purple">{stat.value}</div>
                        <div className="font-body text-xs text-muted-foreground mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl sm:text-5xl mb-4">ЧТО <span className="neon-text-cyan">МЫ</span> ПРЕДЛАГАЕМ</h2>
                <p className="font-body text-muted-foreground max-w-lg mx-auto">Полная экосистема для серьёзных игроков</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "UserCircle", title: "Профили игроков", desc: "Статистика, ранги, KDA и история матчей", color: "var(--neon-cyan)", section: "profiles" as Section },
                  { icon: "CalendarPlus", title: "Онлайн-запись", desc: "Запись на турниры в пару кликов — без очередей", color: "var(--neon-purple)", section: "booking" as Section },
                  { icon: "Calendar", title: "Расписание", desc: "Актуальные события с фильтрацией по типу", color: "var(--neon-pink)", section: "schedule" as Section },
                  { icon: "Bell", title: "Уведомления", desc: "Telegram и SMS — не пропустишь ни одно событие", color: "var(--neon-cyan)", section: "about" as Section },
                ].map((f, i) => (
                  <div
                    key={f.title}
                    onClick={() => goTo(f.section)}
                    className={`glass card-hover rounded-2xl p-6 cursor-pointer animate-slide-up delay-${(i + 1) * 100}`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${f.color}18`, border: `1px solid ${f.color}40` }}
                    >
                      <Icon name={f.icon as Parameters<typeof Icon>[0]['name']} size={22} style={{ color: f.color }} />
                    </div>
                    <h3 className="font-display text-lg mb-2">{f.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative mx-4 sm:mx-6 mb-24 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SCHEDULE_IMG})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8 p-10 sm:p-16">
                <div>
                  <h2 className="font-display text-3xl sm:text-4xl mb-3">ГОТОВ К СЛЕДУЮЩЕМУ <span className="gradient-text-cyan-purple">МАТЧУ?</span></h2>
                  <p className="font-body text-muted-foreground">Запишись сейчас и получи уведомление в Telegram</p>
                </div>
                <button
                  onClick={() => goTo("schedule")}
                  className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl font-display tracking-wider gradient-cyan-purple text-background btn-glow-cyan"
                >
                  <Icon name="Calendar" size={18} />
                  РАСПИСАНИЕ
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ========== PROFILES ========== */}
        {active === "profiles" && (
          <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 gradient-cyan-purple" />
                  <span className="font-body text-xs text-[var(--neon-cyan)] tracking-widest uppercase">Топ игроки платформы</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl">ПРОФИЛИ <span className="neon-text-cyan">ИГРОКОВ</span></h2>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-sm text-muted-foreground">3 игрока онлайн</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLAYERS.map((player, i) => (
                <div key={player.id} className={`glass rounded-2xl overflow-hidden card-hover animate-slide-up delay-${(i % 4 + 1) * 100} flex flex-col`}>

                  {/* Фото игрока */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={player.img} alt={player.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))] via-[hsl(var(--card))]/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`font-display text-xs px-2.5 py-1 rounded-lg glass-strong ${rankColors[player.rank] || "text-foreground"}`}>
                        {player.rank}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body glass-strong ${player.online ? "text-green-400" : "text-muted-foreground"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${player.online ? "bg-green-400 animate-pulse" : "bg-muted-foreground"}`} />
                        {player.online ? "Онлайн" : "Оффлайн"}
                      </div>
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="px-5 pb-5 pt-4 flex flex-col flex-1">
                    <div className="mb-2">
                      <h3 className="font-display text-xl neon-text-cyan">{player.name}</h3>
                      <span className="font-body text-xs text-muted-foreground">{player.tag} · {player.role}</span>
                    </div>

                    {/* Описание */}
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {player.desc}
                    </p>

                    {/* Статистика */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="glass rounded-xl px-3 py-2">
                        <div className="font-body text-xs text-muted-foreground mb-0.5">Победы</div>
                        <div className="font-display text-lg gradient-text-cyan-purple">{player.wins}</div>
                      </div>
                      <div className="glass rounded-xl px-3 py-2">
                        <div className="font-body text-xs text-muted-foreground mb-0.5">KDA</div>
                        <div className="font-display text-lg gradient-text-purple-pink">{player.kda}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => goTo("booking")}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm font-medium glass hover:bg-white/10 transition-all text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 hover:border-[var(--neon-cyan)]/70"
                    >
                      <Icon name="Swords" size={14} />
                      Вызвать на матч
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========== BOOKING ========== */}
        {active === "booking" && (
          <section className="max-w-2xl mx-auto px-6 py-16 animate-fade-in">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-px w-8 gradient-cyan-purple" />
                <span className="font-body text-xs text-[var(--neon-cyan)] tracking-widest uppercase">Быстро и удобно</span>
                <div className="h-px w-8 gradient-cyan-purple" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl mb-4">ЗАПИСЬ <span className="gradient-text-cyan-purple">НА ИГРУ</span></h2>
              <p className="font-body text-muted-foreground">Заполни форму — получишь подтверждение в Telegram и SMS</p>
            </div>

            {bookingDone ? (
              <div className="glass rounded-3xl p-10 text-center animate-fade-in-scale">
                <div className="w-20 h-20 rounded-full gradient-cyan-purple flex items-center justify-center mx-auto mb-6 btn-glow-cyan">
                  <Icon name="CheckCircle" size={36} className="text-background" />
                </div>
                <h3 className="font-display text-3xl mb-3 neon-text-cyan">ЗАПИСЬ ПРИНЯТА!</h3>
                <p className="font-body text-muted-foreground mb-2">Вы записаны на: <span className="text-foreground font-medium">{bookingData.event || "выбранное событие"}</span></p>
                <p className="font-body text-sm text-muted-foreground mb-8">Уведомление придёт на указанный номер и в Telegram</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setBookingDone(false); setBookingData({ name: "", phone: "", event: "", notify: [] }); }}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body glass hover:bg-white/10 transition-all"
                  >
                    <Icon name="Plus" size={16} />
                    Новая запись
                  </button>
                  <button
                    onClick={() => goTo("schedule")}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body gradient-cyan-purple text-background btn-glow-cyan"
                  >
                    <Icon name="Calendar" size={16} />
                    Расписание
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="glass rounded-3xl p-8 space-y-6">
                <div>
                  <label className="font-body text-sm text-muted-foreground block mb-2">Ваше игровое имя</label>
                  <input
                    type="text"
                    placeholder="Никнейм или имя"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/40 focus:border-[var(--neon-cyan)] focus:outline-none rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-muted-foreground block mb-2">Номер телефона</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/40 focus:border-[var(--neon-cyan)] focus:outline-none rounded-xl px-4 py-3 font-body text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-muted-foreground block mb-2">Выберите событие</label>
                  <select
                    value={bookingData.event}
                    onChange={(e) => setBookingData({ ...bookingData, event: e.target.value })}
                    required
                    className="w-full bg-[hsl(var(--background))] border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/40 focus:border-[var(--neon-cyan)] focus:outline-none rounded-xl px-4 py-3 font-body text-foreground transition-all"
                  >
                    <option value="">— Выберите из расписания —</option>
                    {SCHEDULE_EVENTS.filter((e) => e.spots > 0).map((ev) => (
                      <option key={ev.id} value={ev.title}>
                        {ev.date} {ev.time} — {ev.title} ({ev.spots} мест)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-body text-sm text-muted-foreground block mb-3">Способ уведомлений</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: "telegram", icon: "Send", label: "Telegram" },
                      { id: "sms", icon: "MessageSquare", label: "SMS" },
                    ].map((opt) => {
                      const selected = bookingData.notify.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setBookingData({
                              ...bookingData,
                              notify: selected
                                ? bookingData.notify.filter((n) => n !== opt.id)
                                : [...bookingData.notify, opt.id],
                            });
                          }}
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm transition-all ${
                            selected
                              ? "gradient-cyan-purple text-background btn-glow-cyan"
                              : "glass text-muted-foreground hover:text-foreground hover:bg-white/10"
                          }`}
                        >
                          <Icon name={opt.icon as Parameters<typeof Icon>[0]['name']} size={15} />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display text-base tracking-wider gradient-cyan-purple text-background btn-glow-cyan"
                >
                  <Icon name="Zap" size={18} />
                  ПОДТВЕРДИТЬ ЗАПИСЬ
                </button>

                <p className="font-body text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на получение уведомлений
                </p>
              </form>
            )}
          </section>
        )}

        {/* ========== SCHEDULE ========== */}
        {active === "schedule" && (
          <section className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-8 gradient-cyan-purple" />
                  <span className="font-body text-xs text-[var(--neon-cyan)] tracking-widest uppercase">Актуальные события</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl">РАСПИСАНИЕ <span className="neon-text-cyan">МАТЧЕЙ</span></h2>
              </div>
              <div className="glass rounded-xl overflow-hidden shrink-0">
                <img src={SCHEDULE_IMG} alt="Расписание" className="w-32 h-20 object-cover opacity-70" />
              </div>
            </div>

            <div className="space-y-4">
              {SCHEDULE_EVENTS.map((ev, i) => (
                <div
                  key={ev.id}
                  className={`glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 card-hover animate-slide-up delay-${(i % 5 + 1) * 100}`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="text-center shrink-0">
                      <div className="font-display text-xl neon-text-cyan">{ev.time}</div>
                      <div className="font-body text-xs text-muted-foreground">{ev.date}</div>
                    </div>
                    <div className="h-10 w-px bg-gradient-to-b from-transparent via-[var(--neon-cyan)]/30 to-transparent shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-display text-base truncate">{ev.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`font-body text-xs px-2 py-0.5 rounded-full border ${eventTypeStyles[ev.type]}`}>
                          {eventTypeLabel[ev.type]}
                        </span>
                        {ev.spots === 0 ? (
                          <span className="font-body text-xs text-red-400/80 flex items-center gap-1">
                            <Icon name="Lock" size={11} />
                            Мест нет
                          </span>
                        ) : (
                          <span className="font-body text-xs text-green-400/80 flex items-center gap-1">
                            <Icon name="Users" size={11} />
                            {ev.spots} {ev.spots === 1 ? "место" : "места"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setBookingData({ ...bookingData, event: ev.title });
                      goTo("booking");
                    }}
                    disabled={ev.spots === 0}
                    className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm transition-all ${
                      ev.spots === 0
                        ? "glass opacity-40 cursor-not-allowed text-muted-foreground"
                        : "gradient-cyan-purple text-background btn-glow-cyan"
                    }`}
                  >
                    <Icon name={ev.spots === 0 ? "Lock" : "CalendarPlus"} size={14} />
                    {ev.spots === 0 ? "Занято" : "Записаться"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 glass-strong rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 border border-[var(--neon-purple)]/40 shadow-[0_0_20px_rgba(155,89,255,0.1)]">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(155,89,255,0.15)", border: "1px solid rgba(155,89,255,0.4)" }}>
                <Icon name="Bell" size={22} className="text-[var(--neon-purple)]" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-display text-base mb-1">ПОДПИШИСЬ НА УВЕДОМЛЕНИЯ</div>
                <p className="font-body text-sm text-muted-foreground">Получай напоминания о матчах в Telegram и SMS</p>
              </div>
              <button
                onClick={() => goTo("booking")}
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm glass text-[var(--neon-purple)] border border-[var(--neon-purple)]/40 hover:border-[var(--neon-purple)] transition-all"
              >
                <Icon name="Send" size={15} />
                Подключить
              </button>
            </div>
          </section>
        )}

        {/* ========== ABOUT ========== */}
        {active === "about" && (
          <section className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-px w-8 gradient-cyan-purple" />
                <span className="font-body text-xs text-[var(--neon-cyan)] tracking-widest uppercase">Наша история</span>
                <div className="h-px w-8 gradient-cyan-purple" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl mb-4">О <span className="gradient-text-cyan-purple">НАС</span></h2>
              <p className="font-body text-muted-foreground max-w-xl mx-auto leading-relaxed">
                GameZone — профессиональная платформа для организации игровых событий, турниров и тренировок. Мы создаём пространство, где каждый игрок может расти и соревноваться.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="glass rounded-2xl overflow-hidden">
                <img src={HERO_IMG} alt="О нас" className="w-full h-48 object-cover opacity-60" />
                <div className="p-6">
                  <h3 className="font-display text-2xl mb-3 neon-text-cyan">НАША МИССИЯ</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    Мы убеждены: игровой спорт заслуживает профессиональной инфраструктуры. Наша платформа объединяет игроков, тренеров и организаторов в едином цифровом пространстве.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: "Trophy", title: "Профессиональный подход", desc: "Все турниры проводятся по международным правилам с прозрачной системой рейтинга", color: "var(--neon-cyan)" },
                  { icon: "Shield", title: "Честная игра", desc: "Система верификации участников обеспечивает справедливые результаты", color: "var(--neon-purple)" },
                  { icon: "Zap", title: "Мгновенные уведомления", desc: "Telegram и SMS-уведомления о всех изменениях расписания и записи", color: "var(--neon-pink)" },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-xl p-4 flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
                    >
                      <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm mb-1">{item.title}</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-3xl mb-8 text-center">НАША <span className="neon-text-cyan">КОМАНДА</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {TEAM_MEMBERS.map((member, i) => (
                  <div key={member.name} className={`glass rounded-2xl p-5 text-center card-hover animate-slide-up delay-${(i + 1) * 100}`}>
                    <div className="w-14 h-14 rounded-2xl gradient-cyan-purple flex items-center justify-center mx-auto mb-4">
                      <Icon name="User" size={24} className="text-background" />
                    </div>
                    <h4 className="font-display text-base mb-1">{member.name}</h4>
                    <div className="font-body text-xs text-[var(--neon-cyan)] mb-1">{member.role}</div>
                    <div className="font-body text-xs text-muted-foreground">{member.exp}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 glass-strong rounded-2xl p-8 text-center border border-[var(--neon-cyan)]/30 shadow-[0_0_20px_rgba(0,229,255,0.08)]">
              <h3 className="font-display text-2xl mb-6">СВЯЗАТЬСЯ С НАМИ</h3>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { icon: "Send", label: "Telegram", value: "@gamezone_pro" },
                  { icon: "Mail", label: "Email", value: "info@gamezone.pro" },
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-35-35" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <Icon name={c.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-[var(--neon-cyan)]" />
                    <div className="text-left">
                      <div className="font-body text-xs text-muted-foreground">{c.label}</div>
                      <div className="font-body text-sm">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--glass-border)] py-8 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => goTo("home")}>
            <div className="w-6 h-6 rounded-md gradient-cyan-purple flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-background" />
            </div>
            <span className="font-display text-sm neon-text-cyan">GAME<span className="text-foreground">ZONE</span></span>
          </div>
          <p className="font-body text-xs text-muted-foreground">© 2026 GameZone. Все права защищены.</p>
          <div className="flex gap-3">
            {[
              { icon: "Send", action: () => {} },
              { icon: "MessageSquare", action: () => {} },
              { icon: "Globe", action: () => {} },
            ].map((item) => (
              <button key={item.icon} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-all">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}