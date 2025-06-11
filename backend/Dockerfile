FROM php:8.4-apache

# Installe les dépendances (Composer, extensions MySQL, etc.)
RUN apt-get update && apt-get install -y \
    git unzip \
    && docker-php-ext-install pdo pdo_mysql

# Installe Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copie les fichiers nécessaires
WORKDIR /var/www/html
COPY ./src/ ./          
COPY ./composer.* ./    
RUN composer install    

# Configure Apache
RUN a2enmod rewrite