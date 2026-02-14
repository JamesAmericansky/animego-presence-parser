# Anime Presence Parser

> [!NOTE]
>  **Новое обновление!**  
> Добавлена поддержка Animelib сайта. Рекомендуется обновить файлы.

Сделан в основном для русскоговорящих людей.

Anime Presence Parser — это инструмент для отображения статуса просмотра аниме в Discord с сайтов AnimeGO и плеера Kodik (интегрирован в AnimeGO). Сделан за пару часов от нечего делать для личного пользования. Вдохновлено официальной интеграцией Crunchyroll с дискордом.

## Возможности

- Отображает название аниме, серию и прогресс просмотра в Discord Rich Presence
- Работает сразу при заходе на страницу любого аниме в AnimeGO
- Автоматически обновляет статус при просмотре

## Требования

- [**Node.js**](https://nodejs.org/) (рекомендуется версия 14+)
- Аккаунт **Discord** (для создания приложения в Discord Developer Portal)
- Аккаунт **Cloudinary** (для обработки изображений)

## Установка

### 1. Скачайте проект

**Через Git:**

```bash
git clone https://github.com/your-username/anime-presence-parser.git
cd anime-presence-parser
```

**Или скачайте ZIP (легче):**

1. Перейдите на страницу [репозитория](https://github.com/your-username/anime-presence-parser)
2. Нажмите **Code** →**Download ZIP**
3. Распакуйте архив и откройте папку в терминале

### 2. Установите зависимости

```bash
npm install
```

### 3. Настройте переменные окружения

1. Скопируйте файл`.env.example` в`.env`:
   ```bash
   cp .env.example .env
   ```
2. Заполните значения:
   - CLIENT_ID — ID вашего Discord приложения ([инструкция](https://discord.com/developers/applications))
   - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET — данные из Cloudinary ([инструкция](https://cloudinary.com/))

### 4. Запустите приложение

```bash
node src/main.js
```

### 5. Установите userscript или расширение

**Установка UserScript:**

1. Установите расширение[Tampermonkey](https://www.tampermonkey.net/) или аналог для вашего браузера
2. Вставьте файл`userscript.js` из папки`src` в скрипты Tampermonkey.

(Убедитесь, что в вашем браузере разрешены userscripts, на хроме надо зайти в browser://extensions, включить режим разработчика в правом верхнем углу и зайти в свойства tampermonkey, там надо включить переключалку с говорящим названием)

3. Сохраните скрипт и откройте любое аниме на animego.me

**Установка расширение:**

1. Введите в адресной строке браузера chrome://extensions или аналог для вашего браузера
2. Перенесите папку extension в браузер
3. Откройте любое аниме на animego.me и проверьте работоспособность расширения

### 6. Загрузите ассеты (по желанию)

1. Зайдите в своё дискорд-приложение (где вы копировали client id) и перейдите в раздел Rich Presence
2. Загрузите Art Assets из папки assets с названиями pause.png и play.png

## Использование

- Запустите приложение (шаг 4)
- Откройте любое аниме на animego.me
- Ваш Discord статус автоматически обновится

## Вклад

Буду рад вашим предложениям и pull request'ам!

## Лицензия

MIT License

---

**Вопросы?**
Создайте issue на [GitHub](https://github.com/jamesamericansky/anime-presence-parser/issues) или напишите мне в дискорде (привязан в профиле)

