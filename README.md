![Prev](https://i.ibb.co/nqpC92Xv/testswsf.webp)
# Проект Test SWSF Ex

Этот проект — тестовое задание для создания сайта по макету в Figma c функционалом визуализации рекурсивных объектов и работой с API. Он построен с использованием **TypeScript**, **React** и **SASS**, а также использует **RTK Query** для работы с API и стилизации компонентов.

### Деплой

[Versel](https://test-swsf-ex.vercel.app/)

## Содержание
1. [Настройка проекта](#настройка-проекта)
2. [Интеграция с API](#интеграция-с-api)
3. [Разработка локально](#разработка-локально)

## Настройка проекта

### Требования
- **TypeScript**
- **React**
- **SASS**
- **RTK Query** (опционально)
- **MUI** + **styled-components** (опционально)
- **Vite** как сборщик

### Зависимости
- `@mantine/core` и `@mantine/hooks` для компонентов UI
- `@reduxjs/toolkit` для управления состоянием
- `react`, `react-dom`, `react-redux` для настройки React
- `sass` для стилизации

### Разработческие зависимости
- `@eslint/js`, `eslint`, и `typescript-eslint` для линтинга и поддержки TypeScript
- `vite` для работы с сервером разработки и сборкой проекта

Чтобы начать, клонируйте репозиторий и установите зависимости:

```bash
git clone https://github.com/StoneZol/test-swsf-ex
cd test-swsf-ex
npm install
```

## Интеграция с API

### Базовый URL API:
API доступно по адресу:  
[API Base URL](http://185.244.172.108:8081/)

### Документация API:
Полную документацию можно найти по ссылке:  
[API Документация](http://185.244.172.108:8081/swagger-ui/index.html?url=/openapi.json#/)

### Основные эндпоинты API:

1. **Создание сущности**:
   - URL: `/v1/outlay-rows/entity/create`
   - Метод: `POST`
   - Описание: Эта операция выполняется один раз для создания общей сущности. Возвращаемое значение `eID` будет использоваться для дальнейших взаимодействий с API.

2. **Получение строк**:
   - URL: `/v1/outlay-rows/entity/{eID}/row/list`
   - Метод: `GET`
   - Описание: Получает все строки для конкретной сущности. Этот запрос должен выполняться только один раз при загрузке страницы. Последующие обновления должны обрабатываться локально.

3. **Создание строки**:
   - URL: `/v1/outlay-rows/entity/{eID}/row/create`
   - Метод: `POST`
   - Описание: Этот эндпоинт используется для создания новой строки. Пользователь может нажать на иконку существующей строки для создания новой, которая будет инициализирована нулями (кроме заголовка).

4. **Обновление строки**:
   - URL: `/v1/outlay-rows/entity/{eID}/row/{rID}/update`
   - Метод: `POST`
   - Описание: Этот эндпоинт используется для обновления существующей строки после её редактирования. Для этого нужно дважды кликнуть по строке.

5. **Удаление строки**:
   - URL: `/v1/outlay-rows/entity/{eID}/row/{rID}/delete`
   - Метод: `DELETE`
   - Описание: Удаляет строку при клике на иконку корзины.

### Обработка ответов API:
- **Создание, обновление, удаление**: После выполнения операции сервер возвращает массив обновленных строк. Эти данные следует использовать для обновления локального состояния.
- **Локальные обновления**: Локальные данные должны обновляться без повторных запросов к серверу. Новые данные нужно запрашивать только при первой загрузке страницы.

## Разработка локально

Чтобы запустить сервер разработки, выполните:

```bash
npm run dev
```

Сервер разработки будет доступен по адресу `http://localhost:5173`.

### Сборка проекта:
Для сборки проекта в продакшен:

```bash
npm run build
```
