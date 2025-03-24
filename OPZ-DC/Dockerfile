# Use specific version tag for better reproducibility
FROM php:8.3.3-fpm-bullseye

# Add labels for better maintainability
LABEL maintainer="your-email@example.com"
LABEL description="PHP 8.3 FPM for Laravel"

# Set working directory
WORKDIR /var/www

# Define ARGs at the beginning
ARG user=sagun
ARG uid=1003
ARG gid=1003

# Use multi-line arguments for better readability and add only necessary packages
# Added --no-install-recommends to reduce image size
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    # Combine RUN commands to reduce layers
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    # Create system user to run Composer and Laravel Commands
    && groupadd -g $gid $user || true \
    && useradd -u $uid -g $gid -ms /bin/bash $user || true \
    && usermod -a -G www-data $user

# Copy composer from official image, using multi-stage build
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Create entrypoint script with more secure permissions
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Fix permissions on container start\n\
find /var/www -type f -exec chmod 644 {} \\;\n\
find /var/www -type d -exec chmod 755 {} \\;\n\
chown -R sagun:www-data /var/www/storage /var/www/bootstrap/cache\n\
chmod -R ug+rwx /var/www/storage /var/www/bootstrap/cache\n\
\n\
# Execute the main command\n\
exec "$@"\n' > /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

# Use non-root user
USER $user

# Expose port for PHP-FPM
EXPOSE 9000

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Run PHP-FPM
CMD ["php-fpm"] 