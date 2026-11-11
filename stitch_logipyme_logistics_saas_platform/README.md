# LogiPyme + SafeSMS — demo integrada

Prototipo navegable para la presentación de Diseño de Proyectos de Software. Une gestión de pedidos, consulta del destinatario y revisión preventiva de mensajes. React + Vite, con datos de ejemplo y perfiles simulados.

## Ejecutar

Requiere Node.js 22.13 o superior; `.nvmrc` selecciona 22.23.1.

```bash
nvm use
npm ci
npm start
```

Abre la dirección que informe Vite; normalmente http://localhost:5173.

```bash
npm test
npm run build
npm run preview
```

## Dónde ver SafeSMS

- Inicio del módulo: `/safesms`.
- Formulario: `/safesms/revisar`.
- Revisión con pedido de ejemplo: `/safesms/revisar?pedido=LP-1048`.
- Resultado temporal: `/safesms/resultado`.
- Historial y aprendizaje: `/safesms/historial`.
- Consulta del destinatario: `/consulta` o `/consulta/LP-1048`.

También aparece en la barra lateral y en el dashboard, detalle y consulta del pedido.

## Guion para presentar

1. Abre `/dashboard` con el perfil Microempresario.
2. Crea un pedido en `/pedidos/nuevo`, asignando una transportadora. Abre el detalle y anota su número.
3. En el selector superior, cambia al equipo de esa transportadora. En `/operacion`, registra `Recogido` o `En camino`.
4. Abre la consulta del destinatario desde la tarjeta de entrega. Comprueba que muestra el mismo estado sin exponer teléfono, dirección completa o valores financieros.
5. Pulsa **Revisar un SMS**. Carga el ejemplo **Cobro urgente** y pulsa **Analizar mensaje**.
6. Explica las señales de pago, urgencia y enlace. Consulta la información del dominio: se muestra sin abrirlo y con destino sin verificar.
7. Vuelve al pedido o guarda un resumen y abre el historial. El texto del SMS y el remitente no se conservan.
8. Vuelve al acceso para elegir Administración. Revisa los usuarios y registra una corrección con motivo: el historial anterior permanece.
9. En `/indicadores`, diferencia los datos operativos de la demo, el estudio simulado (20 comercios y 24 destinatarios) y las metas pendientes del piloto.

Los pedidos LP-1048 y LP-1049 permiten presentar el seguimiento y una evidencia de entrega de ejemplo sin crear datos nuevos.

## Alcance y privacidad

Todo se conserva en memoria de esta sesión y se reinicia al recargar. El selector de perfiles y sus restricciones son una demostración, no autenticación ni seguridad de servidor. No hay base de datos, GPS, integraciones con transportadoras, pagos, envío de correo, lectura de la bandeja de SMS ni análisis remoto de URLs.

SafeSMS aplica reglas locales sobre el texto: menciones de pago, urgencia, datos sensibles y enlaces. El resultado es orientativo, sin probabilidad numérica ni garantía de detección. No se verifican remitentes, antigüedad de dominios, certificados ni contenido de páginas. Los enlaces pegados no se abren.

El texto del SMS y el remitente se vacían al generar el resultado o cancelar el análisis. Solo se guarda un resumen sin texto cuando el usuario lo solicita. Las evidencias PNG/JPEG de hasta 2 MiB se leen localmente, sin enviar archivos. Los perfiles, las pruebas de entrega y los comprobantes descargados son de demostración.

## Documentación

- `docs/analisis-alineacion-2026-10-07.md`: comparación del taller, presentación y mockups previos.
- `docs/superpowers/specs/2026-10-07-logipyme-safesms-integracion-design.md`: diseño integrado.
- `docs/superpowers/plans/2026-10-07-logipyme-safesms-integracion.md`: plan de trabajo.

## Logotipo conjunto

`public/assets/logipyme-safesms-diapositivas.png` es la versión de fondo transparente usada en la demo, basada en los logos de la portada de las diapositivas. Se conservan los archivos originales y la primera propuesta como alternativas. El prompt y la referencia se registran en `docs/branding/logotipo-diapositivas.json`.
