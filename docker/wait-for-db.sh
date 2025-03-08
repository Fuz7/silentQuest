#!/bin/sh
echo "Waiting for database connection..."

until php artisan migrate:status > /dev/null 2>&1; do
    echo "Database is not ready. Retrying in 5 seconds..."
    sleep 5
done

echo "Database is ready! Running migrations..."
php artisan migrate --seed