

# BCard App - Server

פרויקט סיום מודול Node.js - שרת REST API לאפליקציית כרטיסי ביקור.

## התקנה

1. להתקין את החבילות:

```bash
npm install
```

2. ליצור קובץ `.env` בתיקייה הראשית עם הערכים הבאים:

```
PORT=8000
DB=mongodb_connection_string
JWTKEY=your_secret_key
```

3. להריץ את השרת:

```bash
npm start
```

בהרצה הראשונה נוצרים אוטומטית 3 משתמשים ו-3 כרטיסים לבדיקה.

## משתמשים לבדיקה

סיסמה לכולם: `Aa123456!`

| סוג משתמש | אימייל |
| --- | --- |
| רגיל | user@test.com |
| עסקי | business@test.com |
| אדמין | admin@test.com |

## Endpoints

### Users

| Method | URL | Auth |
| --- | --- | --- |
| POST | /api/users | הרשמה |
| POST | /api/users/login | התחברות |
| GET | /api/users | אדמין |
| GET | /api/users/:id | משתמש/אדמין |
| PUT | /api/users/:id | משתמש |
| PATCH | /api/users/:id | משתמש |
| DELETE | /api/users/:id | משתמש/אדמין |

### Cards

| Method | URL | Auth |
| --- | --- | --- |
| GET | /api/cards | all |
| GET | /api/cards/my-cards | משתמש רשום |
| GET | /api/cards/:id | all |
| POST | /api/cards | משתמש עסקי |
| PUT | /api/cards/:id | יוצר הכרטיס |
| PATCH | /api/cards/:id | משתמש רשום (לייק) |
| PATCH | /api/cards/:id/bizNumber | אדמין (בונוס) |
| DELETE | /api/cards/:id | יוצר הכרטיס/אדמין |

כל בקשה מוגנת דורשת כותרת `x-auth-token` עם הטוקן מ-login.

## בונוסים

- שינוי bizNumber על ידי אדמין (עם בדיקה שהמספר פנוי)
- חסימת משתמש ל-24 שעות אחרי 3 ניסיונות התחברות כושלים
- File logger - כל תגובה עם סטאטוס 400+ נשמרת בקובץ log יומי בתיקיית `logs`

## טכנולוגיות

Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Joi, Morgan, Cors, Dotenv.
