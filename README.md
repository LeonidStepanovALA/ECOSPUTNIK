# 🌱 EcoSputnik - Эко-туристическая платформа

Современная веб-платформа для управления эко-туризмом в Казахстане с поддержкой многоязычности и адаптивного дизайна.

## 🚀 Особенности

### 📱 **Многоязычность**
- Полная поддержка русского и английского языков
- Динамическое переключение языков
- Локализованный контент и интерфейс

### 🎯 **Роли пользователей**
- **Туристы** - поиск маршрутов, бронирование, отчеты о выбросах CO2
- **Гиды** - управление турами, образование, сертификация
- **Администраторы** - аналитика, управление проектами, статистика

### 📊 **Функциональность**

#### **Для туристов:**
- 🔍 Поиск и фильтрация маршрутов
- 📅 Календарь бронирований
- 🌱 Отчеты о сокращении углеродного следа
- 📰 Новости и акции
- 🚨 Экстренные контакты
- 💡 Персонализированные рекомендации

#### **Для гидов:**
- 📚 Образовательные курсы (8 курсов)
- 🎓 Система сертификации
- 📈 Отслеживание прогресса обучения
- 🗺️ Управление маршрутами
- 📊 Статистика туров

#### **Для администраторов:**
- 📊 Аналитика и отчеты
- 🗺️ Тепловая карта Казахстана
- 🌿 Управление эко-проектами
- 💰 Финансовые отчеты
- 👥 Управление гидами

## 🛠️ Технологии

- **Frontend:** Next.js 14, React 18, TypeScript
- **Стилизация:** Tailwind CSS
- **Языки:** Русский, Английский
- **Адаптивность:** Mobile-first дизайн
- **Сервер:** Node.js, npm

## 📦 Установка и запуск

### Предварительные требования
- Node.js 18+ 
- npm или yarn
- PowerShell (для Windows)

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
# Обычный запуск
npm run dev

# Или используйте скрипты для Windows:
start-server.bat
# или
start-server-permanent.ps1
```

### Запуск в постоянном режиме (Windows)
```powershell
# Запуск постоянного сервера
.\start-server-permanent.ps1

# Остановка сервера
.\stop-server.ps1

# Просмотр логов
.\view-logs.ps1
```

## 🌐 Доступ к приложению

После запуска приложение доступно по адресу:
- **Локально:** http://localhost:3000
- **Автоматическое открытие:** Браузер откроется автоматически

## 📁 Структура проекта

```
ECOSPUTNIK/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Административная панель
│   │   ├── guide/             # Кабинет гида
│   │   ├── tourist/           # Кабинет туриста
│   │   └── layout.tsx         # Основной layout
│   ├── components/            # React компоненты
│   ├── hooks/                 # Пользовательские хуки
│   └── translations/          # Файлы локализации
├── public/                    # Статические файлы
├── scripts/                   # Скрипты управления
└── README.md                  # Документация
```

## 🎓 Образовательные курсы для гидов

### Доступные курсы:
1. **Основы эко-туризма** (40 часов) - Айгуль Садыкова
2. **Экологическая безопасность** (60 часов) - Марат Нурланов
3. **Устойчивое развитие туризма** (50 часов) - Анна Козлова
4. **Сохранение дикой природы** (45 часов) - Дмитрий Волков
5. **Культурное наследие Казахстана** (35 часов) - Елена Петрова
6. **Первая помощь в дикой природе** (25 часов) - Сергей Иванов
7. **Фотография природы** (30 часов) - Ольга Сидорова
8. **Местная кухня и кулинарные традиции** (20 часов) - Марина Ковалева

### Уровни сложности:
- **Начинающий** - базовые знания
- **Промежуточный** - углубленное изучение
- **Продвинутый** - экспертный уровень

## 🔧 Скрипты управления

### Windows PowerShell скрипты:
- `start-server-permanent.ps1` - Запуск постоянного сервера
- `stop-server.ps1` - Остановка сервера
- `view-logs.ps1` - Просмотр логов

### Windows Batch файлы:
- `start-server.bat` - Быстрый запуск
- `run-server.bat` - Альтернативный запуск
- `stop-server.bat` - Остановка через cmd

## 📊 Функции аналитики

### Для администраторов:
- 📈 Общая статистика туристов
- 🗺️ Тепловая карта регионов
- 🌱 Отчеты по эко-проектам
- 💰 Финансовые показатели
- 📊 Сравнение методов компенсации CO2

### Для туристов:
- 🌍 Отслеживание углеродного следа
- 🏆 Достижения и награды
- 📈 Персональная статистика

## 🌍 Экологические особенности

- **Сокращение выбросов CO2** - отслеживание и компенсация
- **Эко-проекты** - поддержка зеленых инициатив
- **Устойчивый туризм** - обучение принципам
- **Биоразнообразие** - сохранение природы

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для получения дополнительной информации.

## 📞 Поддержка

Если у вас есть вопросы или предложения, создайте Issue в репозитории.

---

**EcoSputnik** - Продвигаем устойчивый туризм в Казахстане! 🌱🇰🇿
