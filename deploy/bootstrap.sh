#!/usr/bin/env bash
# Однократная настройка чистого VPS (Ubuntu/Debian) под деплой MD Supply.
# Запускать на сервере от root:  sudo bash bootstrap.sh <deploy_user>
set -euo pipefail

DEPLOY_USER="${1:-deploy}"
APP_DIR="/opt/md-supply"
NODE_MAJOR=22

echo ">> Обновление пакетов"
apt-get update -y
apt-get install -y curl ca-certificates gnupg ufw nginx

echo ">> Установка Node.js ${NODE_MAJOR}"
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_MAJOR" ]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi

echo ">> Установка pnpm и pm2"
npm install -g pnpm pm2

echo ">> Пользователь деплоя: ${DEPLOY_USER}"
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi

echo ">> Каталог приложения: ${APP_DIR}"
mkdir -p "$APP_DIR/releases"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo ">> Автозапуск pm2 для ${DEPLOY_USER}"
env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$DEPLOY_USER" --hp "/home/$DEPLOY_USER" | tail -n 1 | bash || true

echo ">> Nginx reverse proxy"
cp "$(dirname "$0")/nginx/md-supply.conf" /etc/nginx/sites-available/md-supply
ln -sfn /etc/nginx/sites-available/md-supply /etc/nginx/sites-enabled/md-supply
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ">> Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "================ ГОТОВО ================"
echo "1. Убедитесь, что публичный ключ из секрета DEPLOY_SSH_KEY добавлен в"
echo "   /home/${DEPLOY_USER}/.ssh/authorized_keys"
echo "2. Пропишите домен в /etc/nginx/sites-available/md-supply (server_name)"
echo "3. SSL:  sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d mdsupply.by -d www.mdsupply.by"
echo "4. Сделайте push в main — пайплайн задеплоит приложение на :3000"
echo "========================================"
