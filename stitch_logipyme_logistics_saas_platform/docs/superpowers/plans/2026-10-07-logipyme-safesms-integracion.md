# LogiPyme + SafeSMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Implementar una demo navegable que conecte pedidos, seguimiento del destinatario y revisión preventiva de SMS para la presentación.

**Architecture:** React Context y reducer conservan pedidos, perfiles y resúmenes de análisis en la sesión. Funciones puras validan pedidos y detectan señales locales; las páginas comparten los mismos registros. Se conservan las rutas actuales y se añaden consulta, SafeSMS, operación y administración.

**Tech Stack:** React, React Router, Vite, Vitest y Testing Library; sin dependencias nuevas.

**Spec:** `docs/superpowers/specs/2026-10-07-logipyme-safesms-integracion-design.md`.

## Global Constraints

- Node.js 22.13.0 o superior; comprobación con Node.js 22.23.1.
- No enviar texto de SMS ni cargar los enlaces detectados.
- No conservar el texto del SMS ni el remitente en resultados o historial.
- Usar datos de sesión, perfiles simulados y etiquetas claras de demostración.
- Evidencia PNG o JPEG de hasta 2 MiB, sin subida a servicios externos.
- Metas del piloto identificadas como pendientes, no como resultados medidos.

## Review Focus

- Doble creación con el mismo peso debe producir IDs distintos.
- Un transportador no debe modificar pedidos de otro operador.
- Consultas inexistentes y recarga del resultado deben tener una salida útil.
- Mensajes sin señales y enlaces acortados deben indicar incertidumbre.
- Correcciones no deben borrar eventos; la evidencia no debe confirmar una entrega pendiente.

## Task 1: Estado común y análisis local

**Files:** `src/state/DemoContext.jsx`, `src/domain/orders.js`, `src/domain/sms.js`, `src/domain/*.test.js`.

**Interfaces:** `createDemoState()`, `demoReducer(state, action)`, `validateOrder(values)`, `analyzeSms(text)`; `useDemo()` expone `state`, `user`, `visibleOrders`, `dispatch` y acciones.

- [x] Escribir y ejecutar pruebas de IDs, roles, correcciones, validaciones, señales e historial sin texto.
- [x] Implementar las funciones y el contexto; verificar las pruebas dirigidas.

## Task 2: Conectar LogiPyme y perfiles

**Files:** `src/App.jsx`, acceso, dashboard, pedidos, creación, detalle, seguimiento, operadores, configuración, indicadores; componentes de navegación y modal.

**Interfaces:** consumir `useDemo()` y registros con `events`, `carrierId`, `ownerId` y evidencia opcional; exportaciones locales con `downloadText(filename, text, type)`.

- [x] Añadir prueba del recorrido crear → listar → consultar y casos de acceso por perfil.
- [x] Conectar las páginas existentes; implementar operación, administración, evidencia y acciones de presentación.
- [x] Mantener y adaptar las pruebas previas para usar un provider nuevo por prueba.

## Task 3: Consulta y módulo SafeSMS

**Files:** `src/pages/ConsultPage.jsx`, `src/pages/SafeSms*.jsx`, `src/components/PublicShell.jsx`, `src/components/SafeBrand.jsx`, pruebas de integración.

**Interfaces:** rutas `/consulta`, `/consulta/:orderId`, `/safesms`, `/safesms/revisar`, `/safesms/resultado`, `/safesms/historial`; resultado `{level, signals, domains, shortened}` sin texto original.

- [x] Escribir y ejecutar pruebas de consulta, comparación, cancelación y borrado del SMS.
- [x] Implementar formulario, espera, resultado, detalle de dominios, historial y aprendizaje.
- [x] Verificar que URLs sospechosas no aparecen como enlaces navegables.

## Task 4: Presentación, estilos y verificación

**Files:** `src/styles.css`, `README.md`, `index.html`, recursos locales SafeSMS.

- [x] Unificar navegación y componentes; adaptar las pantallas a móvil y escritorio.
- [x] Documentar rutas y un guion para la exposición.
- [x] Ejecutar suite completa, compilación y comprobación del servidor local. La revisión visual en navegador no estuvo disponible; se registra la limitación en el ledger.
- [x] Solicitar una revisión independiente del conjunto y resolver hallazgos importantes.

## Ejecución

El usuario pidió explícitamente implementar la integración después de recibir el diseño. Se ejecuta aquí de forma continua, sin nueva confirmación de alcance. No hay repositorio Git utilizable: se conserva un respaldo local y un registro en `docs/superpowers/plans/2026-10-07-logipyme-safesms-progress.md`; no se crean commits ni worktrees.
