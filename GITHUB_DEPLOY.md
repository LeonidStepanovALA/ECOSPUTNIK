# 🚀 Пошаговый деплой на GitHub и Vercel

## 📋 Подготовка

### Шаг 1: Проверка Git
```bash
git --version
```

### Шаг 2: Настройка Git (если не настроен)
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "ваш@email.com"
```

## 🌐 Создание репозитория на GitHub

### Шаг 1: Создание репозитория
1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Введите название: `eco-tourism-platform`
4. Выберите "Public" или "Private"
5. **НЕ ставьте галочки** на:
   - Add a README file
   - Add .gitignore
   - Choose a license
6. Нажмите "Create repository"

### Шаг 2: Копирование URL
Скопируйте URL вашего репозитория, он будет выглядеть так:
```
https://github.com/YOUR_USERNAME/eco-tourism-platform.git
```

## 💻 Локальная настройка Git

### Шаг 1: Инициализация Git
```bash
# В папке eco-tourism выполните:
git init
```

### Шаг 2: Добавление файлов
```bash
git add .
```

### Шаг 3: Первый коммит
```bash
git commit -m "Initial commit: Eco-Tourism Platform v1.0.0"
```

### Шаг 4: Подключение к GitHub
```bash
# Замените YOUR_USERNAME на ваше имя пользователя GitHub
git remote add origin https://github.com/YOUR_USERNAME/eco-tourism-platform.git
```

### Шаг 5: Переименование ветки
```bash
git branch -M main
```

### Шаг 6: Отправка на GitHub
```bash
git push -u origin main
```

## 🌐 Деплой на Vercel

### Шаг 1: Регистрация на Vercel
1. Перейдите на [Vercel](https://vercel.com)
2. Нажмите "Sign Up"
3. Выберите "Continue with GitHub"
4. Авторизуйтесь через GitHub

### Шаг 2: Создание проекта
1. Нажмите "New Project"
2. Выберите ваш репозиторий `eco-tourism-platform`
3. Vercel автоматически определит настройки:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### Шаг 3: Настройка переменных окружения
В разделе "Environment Variables" добавьте:
```
NODE_ENV=production
```

### Шаг 4: Деплой
1. Нажмите "Deploy"
2. Дождитесь завершения сборки (2-3 минуты)
3. Получите URL вашего сайта

## ✅ Проверка деплоя

### Проверьте следующие функции:
1. **Главная страница** - должна загружаться без ошибок
2. **Все роли** - турист, гид, размещение, аналитик, админ
3. **Многоязычность** - переключение между русским и английским
4. **Emergency система** - кнопка и модальное окно
5. **Адаптивность** - на мобильных устройствах

## 🔄 Обновления

### Для обновления сайта:
```bash
# Внесите изменения в код
git add .
git commit -m "Update: описание изменений"
git push origin main

# Vercel автоматически пересоберет и задеплоит проект
```

## 🐛 Устранение проблем

### Проблема: Git не установлен
```bash
# Скачайте Git с https://git-scm.com/
# Или используйте winget:
winget install Git.Git
```

### Проблема: Ошибка аутентификации
```bash
# Настройте SSH ключи или используйте Personal Access Token
# Инструкции: https://docs.github.com/en/authentication
```

### Проблема: Ошибка сборки на Vercel
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все зависимости указаны в package.json
3. Проверьте, что нет ошибок TypeScript

## 📊 Результат

После успешного деплоя у вас будет:
- 🌐 **Живой сайт** на Vercel
- 📱 **Адаптивный дизайн**
- 🌍 **Многоязычная платформа**
- 🚨 **Emergency система**
- 📊 **Аналитические дашборды**
- 🔄 **Автоматические обновления**

## 🎯 Полезные ссылки

- [GitHub](https://github.com) - размещение кода
- [Vercel](https://vercel.com) - хостинг и деплой
- [Next.js Documentation](https://nextjs.org/docs) - документация фреймворка
- [Tailwind CSS](https://tailwindcss.com) - документация стилей

---

**Время деплоя: ~15 минут**
**Сложность: Средне**
**Результат: Готовый к использованию сайт** 