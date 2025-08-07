FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git \
    && docker-php-ext-install pdo pdo_mysql zip

# Enable Apache rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only composer files first for caching
COPY composer.json composer.lock ./

# Install all dependencies including dev to support Pail
RUN composer install --optimize-autoloader --no-scripts --no-progress

# Copy the rest of the app
COPY . .

# Fix permissions for Laravel logs and cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Configure Apache to serve Laravel public folder
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf \
    && sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s|AllowOverride None|AllowOverride All|' /etc/apache2/sites-available/000-default.conf

EXPOSE 80
