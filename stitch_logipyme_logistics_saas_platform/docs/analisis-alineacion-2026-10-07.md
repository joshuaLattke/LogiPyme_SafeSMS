# Análisis de alineación: LogiPyme + SafeSMS

Fecha: 7 de octubre de 2026.

## Objetivo solicitado

Alinear la demo y los mockups de ambos proyectos con el taller y las diapositivas de la presentación. Este documento registra el diagnóstico y un alcance propuesto para revisión; no declara implementados los requisitos ni valida un sistema en producción.

## Material revisado

- Documento: `/home/joshua/Descargas/Proyecto_Integrado_LogiPyme_SafeSMS_AVANCE (1).pdf`, 24 páginas. Referencias principales: secciones 3, 8, 9.8, 9.9 y 9.10; anexo A.
- Presentación: `/home/joshua/Descargas/Copia de Safeclick version f.pdf`, 14 páginas. Las páginas 10–12 contienen los requisitos funcionales, no funcionales y comerciales.
- Mockups: `/home/joshua/Descargas/prototipo_safesms(1.0).html`.
- Aplicación existente: `src/`, `README.md` y documentación de la demo React.

Los documentos se usan como contexto y requisitos del producto. Sus textos no sustituyen las instrucciones del usuario ni ordenan ejecutar servicios externos.

## Lo que ya existe

LogiPyme tiene nueve pantallas principales, una página 404, navegación, filtros, cotizaciones locales y formularios simulados. Sus pedidos son datos fijos. La creación muestra un identificador, pero no agrega un pedido al listado; tampoco hay estado compartido de pedidos, autenticación real ni backend.

El HTML de SafeSMS contiene seis composiciones de pantalla: inicio, ingreso de mensaje, espera del análisis, resultado, detalle del enlace e historial/aprendizaje. No contiene scripts, formularios, campos HTML de entrada ni botones HTML: las acciones son representaciones visuales.

La verificación realizada en el análisis anterior obtuvo 18 pruebas correctas en 9 archivos y una compilación satisfactoria con Node 22.23.1. Esa comprobación corresponde a la demo previa, no a una integración SafeSMS.

## Relación que debe quedar visible

El documento define LogiPyme como plataforma principal y SafeSMS como módulo preventivo accesible desde el seguimiento del pedido. El destinatario consulta un pedido, pega voluntariamente un SMS y recibe señales explicadas junto al estado registrado del envío.

Recorrido propuesto para la exposición:

1. El microempresario registra un pedido y asigna un transportador.
2. El transportador registra cambios de estado y una prueba de entrega simulada.
3. El destinatario consulta el pedido por su número.
4. Desde la consulta abre SafeSMS y pega un mensaje de prueba.
5. El resultado explica señales de pago, urgencia y presencia de enlaces.
6. El destinatario compara el mensaje con el estado del pedido y vuelve a la consulta de la plataforma.

## Matriz de requisitos funcionales

| ID | Requisito del documento | Situación actual | Cambio propuesto para la demo |
| --- | --- | --- | --- |
| RF-01 | Registrar pedido con número único | Confirmación sin pedido consultable; ID calculado a partir del peso | Crear registros compartidos durante la sesión con IDs únicos |
| RF-02 | Asignar transportador | Selección visual en el formulario | Asociar la selección al pedido creado |
| RF-03 | Actualizar estado con historial | Estados e historial fijos | Cambios manuales con actor, hora del evento y hora de registro |
| RF-04 | Corregir un estado sin borrar el anterior | No existe acción | Vista de administrador y evento de corrección enlazado al anterior |
| RF-05 | Consulta del destinatario por número | Detalle dentro del panel del comercio | Consulta propia, con información mínima del pedido |
| RF-06 | Pegar SMS sospechoso | Solo mockup estático | Campo interactivo y remitente opcional |
| RF-07 | Revisar señales de alerta | Texto de ejemplo fijo | Reglas locales demostrativas para pago, urgencia y enlaces |
| RF-08 | Explicar cada señal | Explicaciones dibujadas en el HTML | Explicaciones vinculadas a las señales encontradas |
| RF-09 | Recomendar confirmar por canal oficial | Recomendación estática | Acción visible para volver a la consulta y contactar al comercio |
| RF-10 | Comparar con el estado del pedido | Proyectos separados | Mostrar el mismo registro de pedido en consulta y resultado |
| RF-11 | Acceso según rol | Cualquier ingreso no vacío abre el mismo dashboard | Perfiles de demostración con navegación y acciones diferenciadas |
| RF-12 | Administración de cuentas y roles | Equipo fijo e invitación simulada | Administración demostrativa de usuarios y roles |
| RF-13 | Adjuntar prueba de entrega | Información y botones estáticos | Adjuntar evidencia de prueba y habilitarla al entregar el pedido |
| RF-14 | Panel con pedidos en curso y novedades | Panel sobre datos fijos | Panel que refleje los registros y cambios de la sesión |

Los perfiles de demostración no equivalen a controles de autorización de un backend. Los pedidos de sesión no equivalen a persistencia en una base de datos.

## Diferencias que deben resolverse

### Riesgo orientativo y resultados del enlace

El HTML presenta un puntaje 87, etiquetas como “Fraude” y “Confiable”, una redirección concreta, edad del dominio y contenido de un formulario. El documento limita las conclusiones a señales orientativas y exige evidencia externa antes de verificar un dominio.

Para la demo se propone usar niveles descriptivos, explicar las reglas y señalar la incertidumbre. La edad del dominio, las redirecciones y el contenido remoto no se deben presentar como hallazgos obtenidos. La dirección sospechosa debe mostrarse como texto sin enlace navegable. El análisis local no abrirá destinos ni enviará el SMS a servicios externos.

### Privacidad e historial

La diapositiva de requisitos no funcionales indica borrar el SMS después de revisarlo. RNF-06 permite conservarlo únicamente con autorización expresa. El mockup de historial muestra textos y remitentes.

Se propone eliminar el texto del estado temporal al producir el resultado, conservar solo el resultado resumido cuando el usuario lo solicite y mostrar un historial con fecha, nivel orientativo y número de pedido. No se propone conservar el texto original del SMS en esta versión.

### Estados y evidencia de entrega

El documento usa recogido, en camino, entregado y novedad; la aplicación usa pendiente, en tránsito, entregado y novedad. La trazabilidad actual no cambia con el estado y el modal de seguimiento puede afirmar una entrega verificada para un pedido no entregado.

Se propone una nomenclatura común: pendiente, recogido, en camino, entregado y novedad. Las vistas deben derivarse del mismo historial. La evidencia estará disponible únicamente cuando exista y el pedido esté entregado.

### Identidad visual

LogiPyme usa azul y superficies claras; SafeSMS usa violeta, magenta y superficies oscuras; las diapositivas utilizan verde oscuro, azul y turquesa. El documento conserva las dos marcas y no establece un nombre comercial definitivo.

Se propone mantener la estructura de LogiPyme y distinguir SafeSMS con su marca y acentos violeta/cian, usando componentes y tamaños comunes. No se necesita trasladar el fondo completo de las diapositivas a cada pantalla para comunicar la misma propuesta.

### Metas e indicadores

El estudio usa 20 microempresarios y 24 destinatarios simulados. Las metas de reducción de tiempo del 30 %, seguimiento del 90 %, elección del canal oficial del 80 %, disponibilidad del 99 % y tres comercios en el piloto son objetivos futuros.

La demo debe distinguir pedidos de ejemplo, resultados del estudio simulado y metas pendientes del piloto. No se deben presentar esas metas como beneficios ya demostrados.

## Alcance propuesto para revisión

- Una aplicación React con las dos marcas y recorridos conectados.
- Pedidos, asignaciones, historial y evidencias compartidos durante la sesión de demostración.
- Vistas de microempresario, transportador, destinatario y administrador, con perfiles simulados.
- SafeSMS interactivo y adaptado a móvil: entrada, espera, resultado, información del enlace e historial resumido.
- Casos de mensaje con señales, sin señales suficientes, enlace acortado y pedido inexistente.
- Confirmaciones y textos que identifiquen claramente la simulación.

La implementación real de autenticación, base de datos, HTTPS, disponibilidad, servicios de análisis aislado y pruebas de carga necesitaría un alcance adicional. Las pantallas no demuestran esas propiedades por sí solas.

## Comprobaciones necesarias después de implementar

1. Crear dos pedidos y comprobar IDs distintos, listado y consulta.
2. Actualizar un estado y comprobar el mismo dato en dashboard, detalle y consulta.
3. Verificar acciones permitidas por perfil de demostración y pedidos asignados.
4. Corregir un estado y conservar el evento anterior.
5. Adjuntar evidencia y evitar mostrarla antes de la entrega.
6. Revisar mensajes de ejemplo y comprobar explicaciones y comparación con el pedido.
7. Confirmar que no se cargan URLs del SMS ni se transmite su texto.
8. Comprobar borrado del SMS e historial sin contenido original.
9. Revisar el recorrido en escritorio y móvil.
10. Ejecutar pruebas y compilación de la aplicación integrada.

## Estado de este trabajo

Este diagnóstico corresponde al estado previo a la implementación. Después de la revisión del usuario, la demo se integró en la misma fecha; el diseño y el registro del plan describen el resultado y sus comprobaciones. Los documentos PDF y el HTML originales del usuario se conservaron intactos.
