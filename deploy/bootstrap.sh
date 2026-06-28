#!/usr/bin/env bash
# Однократная настройка чистого VPS (Ubuntu/Debian) под Docker-деплой MD Supply.
# Запускать на сервере от root:  sudo bash bootstrap.sh <deploy_user>
set -euo pipefail

DEPLOY_USER="${1:-deploy}"
APP_DIR="/opt/md-supply"

echo ">> Базовые пакеты + firewall"
apt-get update -y
apt-get install -y curl ca-certificates ufw

echo ">> Установка Docker (engine + compose plugin)"
if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

echo ">> Пользователь деплоя: ${DEPLOY_USER}"
if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi
usermod -aG docker "$DEPLOY_USER"

echo ">> Каталог приложения: ${APP_DIR}"
mkdir -p "$APP_DIR"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

echo ">> Firewall (SSH + HTTP/HTTPS)"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "================ ГОТОВО ================"
echo "1. Публичный ключ из секрета DEPLOY_SSH_KEY должен быть в"
echo "   /home/${DEPLOY_USER}/.ssh/authorized_keys"
echo "2. Наведите домен (A-запись) на IP этого сервера и впишите его в Caddyfile."
echo "3. Сделайте push в main — пайплайн соберёт образ, привезёт его и поднимет docker compose."
echo "   Caddy сам выпустит SSL-сертификат, как только домен заработает."
echo "========================================"
