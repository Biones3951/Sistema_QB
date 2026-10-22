#!/usr/bin/env bash
# Build do backend nas plataformas de deploy (Render, Railway, etc.)
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
