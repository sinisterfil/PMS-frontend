# PMS Frontend

Bu proje iki parçadan oluşur:

- `frontend`: React + Vite arayüzü
- `backend`: Node.js + Express + SQLite API

Uygulamayı tam çalıştırmak için hem backend'i hem frontend'i başlatmanız gerekir.

## Gereksinimler

- Node.js 18 veya üzeri
- npm

## Kurulum

Her iki klasörde de bağımlılıkları yükleyin:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

Not: Repoda `node_modules` klasörleri varsa tekrar kurulum yapmanız şart değildir; ama temiz bir kurulum için `npm install` çalıştırmanız önerilir.

## Projeyi Çalıştırma

İki ayrı terminal açın.

### 1. Backend'i başlatın

```bash
cd backend
npm run dev
```

Backend şu adreste çalışır:

`http://localhost:3000`

Sağlık kontrolü için:

`http://localhost:3000/health`

### 2. Frontend'i başlatın

```bash
cd frontend
npm run dev
```

Frontend şu adreste açılır:

`http://localhost:5173`

Frontend, Vite proxy üzerinden backend'e `/api` yolu ile bağlanır. Bu yüzden backend açık değilse veri işlemleri çalışmaz.

## Kısa Başlangıç Özeti

```bash
# Terminal 1
cd backend
npm install
npm run dev
```

```bash
# Terminal 2
cd frontend
npm install
npm run dev
```

## Demo Giriş Bilgileri

Tüm hesapların şifresi:

`123456`

- Öğrenci: `sevinc.yigit@ogr.university.edu.tr`
- Danışman: `sila.korklubasoglu@university.edu.tr`
- Admin: `admin@university.edu.tr`

## Production Build

Frontend production build almak için:

```bash
cd frontend
npm run build
```

Build çıktısı `frontend/dist` klasörüne yazılır.

Backend production modunda çalıştırmak için:

```bash
cd backend
npm start
```

## Proje Yapısı

```text
PMS-frontend/
├── README.md
├── backend/
│   ├── src/
│   ├── package.json
│   └── pms.db
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```
