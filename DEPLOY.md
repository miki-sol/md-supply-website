# Деплой MD Supply (Docker + CI/CD)

Push в ветку `main` → GitHub Actions собирает Docker-образ, привозит его на VPS по SSH и поднимает `docker compose`. На сервере нужен **только Docker** — ни Node, ни pnpm, ни nginx ставить не нужно. SSL выпускает Caddy автоматически.

## Как это работает

```
git push main
   │
   ▼
GitHub Actions (.github/workflows/deploy.yml)
   ├─ docker build  → образ md-supply:latest (Next.js standalone)
   ├─ docker save | gzip → image.tgz
   ├─ scp image.tgz + docker-compose.yml + Caddyfile → сервер:/opt/md-supply
   └─ ssh: docker load → docker compose up -d
   ▼
Caddy (:80/:443, авто-SSL Let's Encrypt) → app (Next.js :3000)
```

Реестр образов не нужен — образ едет тарболом, хватает трёх SSH-секретов.

## Секреты репозитория (Settings → Secrets and variables → Actions)

| Секрет           | Значение                                                          |
|------------------|-------------------------------------------------------------------|
| `DEPLOY_HOST`    | IP или домен VPS                                                  |
| `DEPLOY_USER`    | пользователь деплоя (например `deploy`)                           |
| `DEPLOY_SSH_KEY` | **приватный** SSH-ключ (публичный — в `authorized_keys` сервера)  |
| `DEPLOY_PORT`    | *(опционально)* SSH-порт, если не 22                              |

Эти три секрета (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`) — именно то, что нужно.

## Первичная настройка сервера (один раз)

1. Сгенерируйте SSH-ключ для деплоя (локально):
   ```bash
   ssh-keygen -t ed25519 -C "github-deploy" -f md-supply-deploy -N ""
   ```
   - приватную часть (`md-supply-deploy`) → секрет `DEPLOY_SSH_KEY`;
   - публичную (`md-supply-deploy.pub`) → в `~/.ssh/authorized_keys` пользователя деплоя на сервере.

2. На сервере (от root) — bootstrap ставит Docker и firewall:
   ```bash
   scp -r deploy root@<host>:/root/
   ssh root@<host> 'sudo bash /root/deploy/bootstrap.sh deploy'   # deploy = DEPLOY_USER
   ```

3. Push в `main` (или Actions → Deploy → Run workflow) — сайт поднимется.

## Привязка домена (домен уже куплен)

1. В панели регистратора домена создайте **A-запись**: `@` → IP вашего VPS,
   и `www` → тот же IP (или CNAME `www` → ваш домен).
2. В `Caddyfile` укажите ваш домен в первой строке (по умолчанию `mdsupply.by, www.mdsupply.by`).
3. Сделайте push — Caddy сам выпустит и продлит HTTPS-сертификат, как только DNS обновится
   (обычно от нескольких минут до пары часов). Ничего вручную для SSL делать не нужно.

> Пока DNS не настроен, можно открыть сайт по IP без HTTPS: в `Caddyfile` закомментируйте
> доменный блок и раскомментируйте `:80 { … }`.

## Откат / диагностика на сервере

```bash
ssh deploy@<host>
cd /opt/md-supply
docker compose ps                 # статус контейнеров
docker compose logs -f app        # логи приложения (заявки [lead])
docker compose logs -f caddy      # логи прокси/SSL
docker compose restart app        # перезапуск
docker compose up -d              # применить изменения compose/Caddyfile
```

Откат на предыдущую версию — повторный запуск workflow на нужном коммите
(Actions → Deploy → Run workflow → выбрать ветку/SHA) либо `git revert` + push.

## Приём заявок

Формы шлют `POST /api/lead`; сейчас заявки попадают в логи (`docker compose logs app`).
Для доставки на e-mail/Telegram допишите интеграцию в `src/app/api/lead/route.ts` и добавьте
переменные окружения в сервис `app` в `docker-compose.yml`.
