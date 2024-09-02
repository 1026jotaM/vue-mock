# WireMock y Vue con Docker Compose

Este proyecto utiliza Docker Compose para desarrollorar aplicaciones en VUE usando vite para mayor velocidad de desarrollo la aplicacion Vue corre en http://127.0.0.1:8000/, tambien cuenta con un mock server en wiremock que corre en http://127.0.0.1:8082/ 

## Requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura del Proyecto
```
├── vue
├── new-kredicity-mock
│   └── mappings
|       └── api
│  
├── docker-compose.yml
└── README.md
```

**Instalación**

1. Clona el repositorio:
   ```bash
   git clone
2. Para iniciar debe pararse sobre el directorio donde se descargo el repositorio y ejecuta:
   ```bash
   docker-compose up -d

## Uso

Abre el navegador web y navega a http://localhost:8000 deberias poder ver la aplicacion VUE
