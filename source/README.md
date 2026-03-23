# Tour Project

Project web dat tour du lich voi cau truc tach rieng `client/server`, dung chung `package.json`, `node_modules` va `.env` tai thu muc `source`.

## Yeu cau moi truong

- Node.js 18 tro len
- npm 9 tro len

## Cau truc thu muc

```text
source/
  .env
  .env.example
  package.json
  client/
    public/
    src/
    index.html
    vite.config.js
  server/
    src/
```

- `client`: frontend React + Vite + Tailwind CSS
- `server`: backend Node.js/Express se duoc bo sung o giai doan sau
- `.env`: file bien moi truong dung chung cho ca frontend va backend

## Cai dat

Mo terminal va chay:

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm install
```

## Chay frontend o moi truong phat trien

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run dev
```

Sau khi chay thanh cong, mo trinh duyet tai:

- [http://127.0.0.1:5173](http://127.0.0.1:5173)

Neu cong `5173` dang ban, Vite co the tu chuyen sang cong khac va se hien URL moi trong terminal.

## Build production

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run build
```

Ban build se duoc tao trong thu muc:

- `source/dist`

## Preview ban build

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run preview
```

## Bien moi truong

Project dang dung chung file:

- `.env`
- `.env.example`

Frontend hien da duoc cau hinh doc env tu root `source` thong qua `client/vite.config.js`.

Neu sau nay can them bien cho frontend, dat theo quy tac Vite:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Tinh trang hien tai

- Frontend nguoi dung da co giao dien va mock data
- Backend moi la khung thu muc `server/src`
- Chua ket noi API that

## Mot so lenh hay dung

```bash
npm run dev
npm run build
npm run preview
```

## Ghi chu

- Chay lenh tai thu muc `source`, khong chay trong `client`
- Frontend hien dang su dung mock data de demo luong xem tour, dat tour va thanh toan
- Neu muon noi backend that, co the phat trien tiep trong `source/server`
