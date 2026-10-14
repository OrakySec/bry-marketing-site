FROM nginx:1.27-alpine

# Configuração própria do site (substitui a padrão do nginx)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Site estático
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/healthz || exit 1
