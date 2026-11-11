# Diseño de la demo integrada LogiPyme + SafeSMS

Fecha: 7 de octubre de 2026.
Estado: implementación de la demo finalizada por solicitud del usuario. Pruebas y compilación verificadas; revisión visual en navegador no disponible en esta sesión.

## Intención y criterios de éxito

El usuario necesita implementar los mockups para que LogiPyme y SafeSMS representen el mismo proyecto descrito en el taller y las diapositivas de la exposición. El entregable será una demo React navegable que permita presentar un recorrido continuo entre gestión de entregas, consulta del destinatario y revisión preventiva de un SMS.

La solicitud autoriza desarrollar los mockups. Se asume una demostración académica con datos de ejemplo y acciones locales, conforme al alcance del documento: asignación manual, cambios de estado de prueba, revisión voluntaria del mensaje y resultados orientativos. No se asume el desarrollo ni la publicación de infraestructura de producción.

Se considerará logrado el diseño cuando un pedido creado en la demo pueda consultarse, actualizarse por su transportador, mostrar una evidencia al entregarse y compararse con las señales de un mensaje en SafeSMS. Los roles, las limitaciones del análisis y la privacidad del SMS deben ser visibles y comprensibles en escritorio y móvil.

## Fuentes y alineación

- `Proyecto_Integrado_LogiPyme_SafeSMS_AVANCE (1).pdf`: flujo integrado, pantallas de la sección 8, RF-01 a RF-14 y RNF-01 a RNF-09.
- `Copia de Safeclick version f.pdf`: misma propuesta de valor; páginas 10–12 sobre funciones, calidad y metas comerciales.
- `prototipo_safesms(1.0).html`: referencia de las seis pantallas y de la identidad violeta/cian.
- `docs/analisis-alineacion-2026-10-07.md`: diagnóstico y matriz de requisitos.

Las cifras del estudio son simuladas. Las metas comerciales y de disponibilidad son propuestas para un piloto futuro. Ninguna se presentará como eficacia medida de la demo.

## Enfoque elegido y alternativas

El enfoque recomendado es extender la aplicación React actual, reutilizar su navegación y añadir una fuente común de datos en memoria. Así los dos módulos pueden consultar exactamente el mismo pedido durante la exposición.

Alternativas consideradas: conservar galerías HTML estáticas para mostrar composición visual, o mantener dos demos enlazadas con estados separados. La primera facilita revisar pantallas, pero no prueba el recorrido; la segunda requiere coordinar manualmente los pedidos de ambas demos. La solicitud de alineación se satisface mejor con una única aplicación navegable.

## Arquitectura

Se mantiene React, React Router, Vite, Vitest y Testing Library. No se añaden dependencias de producto. Se requiere Node.js 22.13.0 o superior y se usará Node.js 22.23.1 para la comprobación local, según `.nvmrc`.

Un `DemoProvider` envuelve las rutas y conserva durante la sesión usuarios de ejemplo, perfil activo, pedidos, eventos de trazabilidad, evidencia y resultados resumidos de revisiones. Sus acciones validan el perfil y la asignación antes de modificar un pedido. Esto demuestra los recorridos por rol, pero no equivale a seguridad del servidor.

La lógica de pedidos y de señales de SMS se separa de las páginas. Los componentes actuales se mantienen salvo cambios necesarios para usar los datos comunes. SafeSMS usa componentes propios pequeños para formulario, estado de espera, resultado, información del enlace e historial.

El texto del SMS vive únicamente en el formulario mientras se revisa. La función local devuelve señales estructuradas y dominios normalizados; al producir el resultado se vacía el formulario. El resultado y el historial no contienen el texto original del mensaje, datos del remitente ni URLs completas.

## Estado de los pedidos

Cada pedido tendrá:

- ID único dentro de la sesión, número de guía de ejemplo y fecha de creación.
- Comercio propietario y transportador asignado.
- Nombre del destinatario, teléfono, ciudad y dirección.
- Peso positivo, valor declarado no negativo, contenido, valor del flete y opción contraentrega.
- Estado actual y lista de eventos.
- Evidencia opcional vinculada a un evento de entrega.

Estados comunes: `Pendiente`, `Recogido`, `En camino`, `Entregado` y `Novedad`. `En camino` sustituye la etiqueta actual `En tránsito` para coincidir con el documento.

Cada evento registra ID, estado, actor, hora del evento y hora de registro. Una corrección administrativa añade un evento con motivo y referencia al evento corregido. No elimina el historial anterior. No se impone una máquina de transición compleja: son cambios manuales de prueba, pero una evidencia solo se habilita para una entrega registrada.

Las evidencias se adjuntan localmente como imagen PNG o JPEG de hasta 2 MiB. Se muestra una previsualización y una nota para usar imágenes de prueba del paquete. No se envían archivos a servicios externos. El reinicio de la demo libera los recursos temporales.

## Roles y accesos

El acceso permite seleccionar perfiles de demostración. El registro valida empresa, NIT, nombre, correo, contraseña y aceptación antes de crear un perfil local del comercio. Las credenciales no se persisten ni se presentan como autenticación real.

| Perfil | Recorrido y acciones |
| --- | --- |
| Microempresario | Crear y ver sus pedidos; asignar transportador; abrir detalle y consulta del destinatario |
| Transportador | Ver pedidos asignados; registrar estado y evidencia local |
| Administrador | Ver el conjunto de pedidos; corregir estados con motivo; administrar usuarios y roles de demostración |
| Destinatario | Consultar por número de pedido y revisar un SMS desde esa consulta |

La consulta del destinatario no requiere entrar al panel del comercio. Presenta ID, transportador, estado, fecha, historial permitido y evidencia disponible; omite teléfono, dirección completa, valores financieros y funciones administrativas. El número de pedido es un mecanismo de consulta de demostración, no una garantía de privacidad de producción.

## Rutas y pantallas

Se conservan las rutas actuales de acceso, dashboard, pedidos, creación, detalle, operadores, indicadores y configuración.

- `/consulta`: formulario de consulta del destinatario.
- `/consulta/:orderId`: seguimiento del destinatario y botón `Revisar un SMS`.
- `/safesms`: inicio del módulo, acceso al formulario y revisiones resumidas.
- `/safesms/revisar`: formulario; recibe opcionalmente `pedido` como contexto.
- `/safesms/resultado`: resultado de la revisión actual, información del dominio y comparación con el pedido.
- `/safesms/historial`: revisiones guardadas explícitamente y aprendizaje.
- `/operacion`: pedidos asignados al transportador y actualización manual.
- `/administracion`: usuarios de demostración y correcciones de estado.

El seguimiento actual usa los registros compartidos. El mapa sigue siendo esquemático y se identifica así; sus marcadores corresponden al filtro activo. No muestra una prueba de entrega si el pedido no está entregado o no tiene evidencia.

Los botones dentro del recorrido de presentación tienen acciones concretas. Descargar guía genera un comprobante local identificado como documento de demostración. Elegir operador lleva a la creación con el operador preseleccionado. Exportar reporte descarga los datos de ejemplo visibles. Las funciones de producción no incluidas muestran su estado de simulación y una explicación breve.

## SafeSMS

### Entrada y espera

El formulario incluye texto del SMS, remitente opcional y número de pedido opcional. Acepta entre 1 y 2.000 caracteres no vacíos. Los enlaces se detectan para mostrar sus dominios como texto. El usuario puede usar casos de ejemplo de pago urgente, aviso de recogida, enlace acortado y texto insuficiente.

La revisión es voluntaria y local. Antes de analizar se muestra que no se lee la bandeja de SMS y que no se abren enlaces. La espera usa un indicador indeterminado y el texto `Revisión de demostración`; no inventa consultas a servicios externos ni porcentajes técnicos de progreso. Cancelar vacía el texto pendiente y vuelve al formulario.

### Reglas y resultado

Reglas demostrativas, tolerantes a mayúsculas y acentos:

- Solicitud de pago: términos de pago, cobro, dinero o tarjeta.
- Urgencia: límite de tiempo, acción inmediata o presión para liberar un paquete.
- Solicitud de datos sensibles: contraseña, clave o datos de tarjeta.
- Presencia de enlace: dirección explícita HTTP(S) o dirección con prefijo `www`.
- Enlace acortado: dominio reconocido de un acortador; destino final desconocido.

Niveles orientativos: `Varias señales de alerta` para pago más urgencia o una solicitud de datos sensibles; `Requiere verificación` para alguna señal; `Información insuficiente` cuando no se detectan señales. No se presenta una probabilidad numérica ni se etiqueta un mensaje como seguro.

Cada señal tiene una explicación sencilla. Siempre se ofrece confirmar con el comercio o la transportadora por un canal obtenido de forma independiente. En el contexto de un pedido se incluye `Volver a consultar mi pedido` y el estado del registro de demostración.

La comparación muestra datos del mismo pedido y distingue lo registrado de lo que no puede verificarse. Un mensaje que pide dinero no se declara falso solo porque el pedido esté en camino. Si el número no existe, se explica que no se pudo comparar.

### Información del enlace y privacidad

La información del enlace muestra únicamente dominios extraídos y el estado `Destino sin verificar`. No abre URLs ni muestra iframes, capturas de páginas remotas, redirecciones, antigüedad del dominio, certificados o suplantación como hallazgos comprobados.

La acción `Guardar resumen` almacena en la sesión fecha, nivel, códigos de señales y número del pedido, sin contenido original ni remitente. El usuario puede borrar un resumen o todos. El aprendizaje contiene consejos breves sobre urgencia, cobros y consulta independiente.

## Identidad visual y móvil

Se conservan las identidades de ambas marcas. La estructura compartida usa LogiPyme; SafeSMS utiliza su nombre, acentos violeta/cian y tarjetas adaptadas al diseño existente. La aplicación sigue una sola escala de tipografía, campos, botones, espaciado y estados.

Las pantallas del destinatario y SafeSMS priorizan el uso móvil, con contenido apilado y botones visibles. Se revisan a 390 px y en escritorio a 1440 px, sin desbordamiento horizontal de la página. Los modales gestionan foco inicial, retorno al cerrar, cierre con Escape y navegación por teclado.

## Indicadores, configuración y transparencia

El dashboard y los indicadores operativos se derivan de los pedidos de la sesión. Los indicadores del estudio se presentan por separado y se rotulan `Datos simulados`, con grupos de 20 microempresarios y 24 destinatarios.

Las metas del piloto se rotulan `Pendiente de validación`: reducción de tiempo del 30 %, trazabilidad del 90 %, elección del canal oficial del 80 %, disponibilidad del 99 % y mínimo de tres comercios. No se vinculan a una afirmación de cumplimiento actual.

Configuración muestra preferencias locales, resumen del tratamiento de datos en la demo, administración de resúmenes SafeSMS y reinicio de datos de ejemplo. No declara certificación legal, contraseñas cifradas en servidor ni protección por HTTPS implementada por el frontend.

## Errores y situaciones incompletas

- Formulario inválido: mensajes junto al campo, sin crear registro.
- ID inexistente: estado vacío con acción para consultar otro número.
- Pedido sin evidencia: explicación del estado pendiente, sin confirmación falsa.
- Usuario sin permiso: mensaje y retorno al recorrido permitido.
- Archivo inválido: rechazo del tipo o tamaño y conservación del pedido anterior.
- Resultado SafeSMS inexistente tras recarga: retorno al formulario.
- Texto sin señales o enlace acortado: incertidumbre visible, sin garantía de seguridad.

## Verificación

Las pruebas cubrirán creación con IDs únicos, asignación, permisos de perfiles locales, registro y corrección sin borrar eventos, evidencia, consulta del destinatario, señales de SMS, comparación, ausencia de navegación a URLs sospechosas e historial sin texto original.

Se ejecutará la suite completa y una compilación de producción. La revisión en navegador cubrirá el recorrido de exposición y el comportamiento móvil. La prueba local no se reportará como validación de las metas de carga, disponibilidad o eficacia antifraude.

## Fuera de este entregable

Backend, base de datos, autenticación de producción, integración con transportadoras, GPS, lectura automática de SMS, modelos entrenados, análisis remoto de URLs, correo real, piloto con comercios, certificación legal y publicación externa.

## Revisión del diseño

Se comprobó coherencia entre el alcance de demostración, los requisitos del documento y el flujo de la presentación. Los requisitos de producción quedan identificados como pendientes. No hay decisiones de tecnología o proveedor externo necesarias para construir esta demo.

Este directorio no es un repositorio Git utilizable, por lo que el diseño se guarda como archivo local sin commit.
