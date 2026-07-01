#!/bin/bash
# Hostinger Deployment Script for StoreManagement
# استخدم هذا السكريبت بعد رفع المشروع إلى Hostinger عبر SSH

set -e

echo "🚀 Starting deployment..."

# 1. نسخ البيئة
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
fi

# 2. تثبيت PHP dependencies
composer install --optimize-autoloader --no-dev

# 3. تثبيت Node dependencies وبناء assets
npm ci --omit=dev
npm run build

# 4. تنظيف cache
php artisan optimize:clear

# 5. إنشاء storage link
php artisan storage:link

# 6. تشغيل الترحيلات
php artisan migrate --force

# 7. تحسين الأداء
php artisan optimize
php artisan view:cache

# 8. صلاحيات المجلدات
chmod -R 775 storage bootstrap/cache
chmod -R 775 public/build

echo "✅ Deployment complete!"
