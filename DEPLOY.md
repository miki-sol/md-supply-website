# Деплой MD Supply (CI/CD)

Push в ветку `main` → GitHub Actions собирает приложение и автоматически деплоит его на VPS по SSH. Без даунтайма (pm2 reload).

## Как это работает

```
git push main
   │
   ▼
GitHub Actions (.github/workflows/deploy.yml)
   ├─ pnpm install --frozen-lockfile
   ├─ pnpm lint
   ├─ pnpm build         → .next/standalone (самодостаточный сервер)
   ├─ собирает release.tgz (standalone + public + static + pm2-конфиг)
   ├─ scp release.tgz → сервер:/tmp
   └─ ssh: распаковка в /opt/md-supply/releases/<sha>,
           переключение симлинка current, pm2 reload
   ▼
nginx (:80/:443) → reverse proxy → Node (127.0.0.1:3000)
```

Структура на сервере:

```
/opt/md-supply/
  releases/<git-sha>/   ← релизы (хранятся последние 5)
  current →  releases/<git-sha>   ← симлинк на активный релиз
```

## Секреты репозитория (Settings → Secrets → Actions)

| Секрет           | Значение                                              |
|------------------|-------------------------------------------------------|
| `DEPLOY_HOST`    | IP или домен VPS                                      |
| `DEPLOY_USER`    | пользователь деплоя на сервере (например `deploy`)    |
| `DEPLOY_SSH_KEY` | **приватный** SSH-ключ (публичный — в `authorized_keys` пользователя) |
| `DEPLOY_PORT`    | *(опционально)* SSH-порт, если не 22                  |

Эти три секрета (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`) — именно то, что нужно. `DEPLOY_PORT` добавляется только при нестандартном порте.

## Первичная настройка сервера (один раз)

1. Создайте SSH-ключ для деплоя (локально):
   ```bash
   ssh-keygen -t ed25519 -C "github-deploy" -f md-supply-deploy -N ""
   ```
   - Приватную часть (`md-supply-deploy`) → секрет `DEPLOY_SSH_KEY`.
   - Публичную (`md-supply-deploy.pub`) → в `~/.ssh/authorized_keys` пользователя деплоя на сервере.

2. На сервере (от root) запустите bootstrap — ставит Node 22, pnpm, pm2, nginx, firewall:
   ```bash
   scp -r deploy root@<host>:/root/
   ssh root@<host>
   sudo bash /root/deploy/bootstrap.sh deploy   # deploy = имя DEPLOY_USER
   ```

3. Пропишите домен в `/etc/nginx/sites-available/md-supply` (`server_name`) и включите SSL:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d mdsupply.by -d www.mdsupply.by
   ```

4. Сделайте `git push` в `main` (или запустите workflow вручную — Actions → Deploy → Run workflow).

## Откат на предыдущий релиз

```bash
ssh deploy@<host>
cd /opt/md-supply
ls -1dt releases/*/            # список релизов
ln -sfn releases/<нужный-sha> current
pm2 reload current/ecosystem.config.cjs --update-env
```

## Полезные команды на сервере

```bash
pm2 status              # статус процесса
pm2 logs md-supply      # логи приложения (в т.ч. заявки [lead])
pm2 reload md-supply    # перезапуск без даунтайма
sudo nginx -t && sudo systemctl reload nginx
```

## Приём заявок

Формы отправляют `POST /api/lead`. Сейчас заявки пишутся в логи (`pm2 logs`). Для доставки на e-mail/Telegram
допишите интеграцию в `src/app/api/lead/route.ts` (SMTP / Telegram Bot API) и при необходимости добавьте
переменные окружения в `ecosystem.config.cjs` (блок `env`).
