# نظام OSSOL لإدارة الأصول

نظام متكامل لإدارة الأصول للأسواق السعودية والسودانية والمصرية مع دعم كامل للغة العربية والإنجليزية.

## 🚀 خطوات التشغيل المحلي

### المتطلبات الأساسية
- Node.js 18+ 
- npm أو yarn
- Git

### 1. تحميل المشروع
```bash
git clone <repository-url>
cd ossol-asset-management
```

### 2. تثبيت الاعتماديات
```bash
npm install
```

### 3. إعداد قاعدة البيانات
```bash
# تهيئة Prisma Client
npm run db:generate

# دفع Schema إلى قاعدة البيانات
npm run db:push
```

### 4. تشغيل خادم التطوير
```bash
npm run dev
```

### 5. الوصول إلى التطبيق
افتح المتصفح على: `http://localhost:3000`

## 📋 أوامر npm المتاحة

### التطوير
```bash
npm run dev      # تشغيل خادم التطوير مع Socket.IO
npm run build    # بناء نسخة الإنتاج
npm run start    # تشغيل خادم الإنتاج
npm run lint     # فحص جودة الكود
```

### قاعدة البيانات
```bash
npm run db:push      # دفع الـ Schema إلى قاعدة البيانات
npm run db:generate  # توليد Prisma Client
npm run db:migrate   # تشغيل الترحيلات
npm run db:reset     # إعادة تعيين قاعدة البيانات
```

## 🏗️ بنية المشروع

```
src/
├── app/                    # صفحات Next.js
│   ├── (dashboard)/       # صفحات لوحة التحكم
│   │   ├── page.tsx       # الرئيسية
│   │   ├── assets/        # إدارة الأصول
│   │   ├── maintenance/   # الصيانة
│   │   └── settings/      # الإعدادات
│   └── api/               # الـ API routes
├── components/            # المكونات
│   ├── ui/               # مكونات Shadcn/ui
│   ├── charts/           # المخططات البيانية
│   └── layout/           # التخطيط الرئيسي
├── lib/                  # المكتبات المساعدة
│   ├── translations.ts   # الترجمات
│   ├── socket.ts         # Socket.IO
│   └── db.ts            # قاعدة البيانات
└── types/               # تعريفات TypeScript
```

## 🌐 المميزات الرئيسية

### 1. دعم متعدد اللغات
- العربية (RTL)
- الإنجليزية (LTR)
- تبديل ديناميكي

### 2. لوحة التحكم
- إحصائيات فورية
- مخططات تفاعلية
- تنبيهات في الوقت الحقيقي

### 3. إدارة الأصول
- تسجيل الأصول
- تتبع الصيانة
- البحث والتصفية

### 4. نظام الصيانة
- جدولة الصيانة
- تتبع الحالة
- إسناد الفنيين

### 5. الإعدادات
- الملف الشخصي
- التنبيهات
- تكامل ERP
- المظهر واللغة

## 🔧 التخصيص

### إضافة لغة جديدة
1. افتح `src/lib/translations.ts`
2. أضف الترجمات الجديدة
3. حدد اللغة في قائمة اللغات

### تعديل الألوان
عدل في `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### إضافة صفحة جديدة
1. أنشئ مجلد جديد في `src/app/(dashboard)/`
2. أضف `page.tsx`
3. أضف الرابط في الشريط الجانبي

## 🗄️ قاعدة البيانات

النظام يستخدم SQLite مع Prisma ORM. لتعديل الـ Schema:

1. افتح `prisma/schema.prisma`
2. أضف أو عدل النماذج
3. شغّل `npm run db:push`

## 🚀 النشر

### بناء الإنتاج
```bash
npm run build
npm run start
```

### متغيرات البيئة
أنشئ `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret"
```

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

**المشكلة:** المنفذ 3000 مستخدم
```bash
# حل: استخدم منفذ آخر
PORT=3001 npm run dev
```

**المشكلة:** خطأ في Prisma
```bash
# حل: أعد توليد الـ Client
npm run db:generate
npm run db:push
```

**المشكلة:** Socket.IO لا يعمل
```bash
# حل: تحقق من السيرفر
node server.ts
```

## 📞 الدعم

لأي استفسارات أو مشاكل:
1. تحقق من الـ Console Logs
2. راجع `dev.log` للأخطاء
3. تأكد من إعدادات قاعدة البيانات

## 📄 الترخيص

مشروع OSSOL - جميع الحقوق محفوظة © 2025