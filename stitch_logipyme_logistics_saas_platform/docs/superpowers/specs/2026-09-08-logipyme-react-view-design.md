# Diseño de la demo React de LogiPyme

## Objetivo

Convertir las vistas HTML generadas por Stitch en una demo navegable de LogiPyme construida con React. La aplicación se ejecutará localmente con Node.js, conservará la identidad visual y permitirá recorrer y probar los flujos principales sin backend, autenticación real, base de datos ni integraciones externas.

## Alcance

La demo incluirá estas rutas:

- Acceso y registro.
- Dashboard principal.
- Gestión de pedidos.
- Creación de pedido.
- Detalle del pedido y prueba de entrega.
- Seguimiento en vivo y rutas.
- Operadores logísticos.
- Indicadores y KPI.
- Configuración y privacidad.
- Página para rutas desconocidas.

La vista duplicada `logipyme_logistics_platform` se tratará como referencia del dashboard y no como una ruta adicional. La pantalla aislada del logotipo tampoco será una ruta: el logotipo proporcionado por el usuario será un recurso compartido de la aplicación.

## Arquitectura

Se construirá una aplicación de página única con React y Vite. Node.js será el entorno para instalar dependencias, ejecutar el servidor de desarrollo, producir la compilación estática y previsualizarla. React Router resolverá la navegación del lado del cliente.

La demo no tendrá servidor de aplicación ni API. Todos los datos serán ficticios y estarán definidos en módulos locales. El estado temporal de filtros, formularios, pestañas y modales vivirá en React y se reiniciará al recargar la página.

## Componentes

`AppShell` concentrará la estructura compartida de las pantallas autenticadas:

- Barra lateral con logo, sucursal, rol y enlaces.
- Encabezado con buscador, saldo, notificaciones y perfil.
- Contenedor adaptable para el contenido de cada ruta.

La ruta de acceso usará un diseño independiente. Las páginas reutilizarán componentes visuales pequeños —botones, campos, tarjetas, etiquetas de estado, tablas, modales y mensajes— cuando exista repetición real entre las vistas. La conversión preservará la composición y el contenido de los HTML originales sin crear abstracciones innecesarias.

## Identidad y recursos

El logotipo entregado por el usuario se almacenará en `public/assets/logipyme-logo.png` y tendrá texto alternativo descriptivo. Sustituirá las imágenes remotas usadas actualmente como marca.

Los recursos visuales esenciales se servirán localmente siempre que estén disponibles. La implementación evitará depender de Tailwind vía CDN: los estilos se procesarán dentro del proyecto. Las fuentes remotas podrán conservarse como mejora progresiva, con familias de sistema como respaldo.

## Navegación e interacciones simuladas

- Un inicio de sesión válido redirigirá al dashboard sin autenticar contra un servicio.
- Los enlaces de la barra lateral, tarjetas y botones de detalle navegarán a rutas reales.
- Los formularios validarán campos requeridos en el navegador y mostrarán confirmaciones locales.
- Crear un pedido no persistirá información ni enviará solicitudes de red.
- Filtros, pestañas, selectores, copiado, menús y modales actualizarán únicamente la interfaz.
- Los enlaces explícitos de WhatsApp podrán mantenerse como enlaces externos; ninguna otra acción transmitirá datos.
- Las rutas inexistentes mostrarán una página 404 con retorno al dashboard o al acceso.

## Datos

Los pedidos, operadores, indicadores, estados logísticos, usuario y sucursal se agruparán en módulos de datos simulados. Las páginas consumirán esos módulos directamente. No se incluirán secretos, variables de entorno, almacenamiento persistente ni llamadas a servicios reales.

## Adaptación visual

La interfaz mantendrá el sistema visual descrito en `logipyme_direct_logistics/DESIGN.md`: paleta, tipografía, estados, radios y espaciado. En escritorio conservará la navegación lateral; en pantallas pequeñas esa navegación se transformará en un panel controlable, y las tablas o grupos densos se reorganizarán para evitar desbordamientos innecesarios.

## Manejo de errores

Los errores esperables de una demo se resolverán en la interfaz:

- Mensajes junto a campos incompletos o inválidos.
- Estado vacío cuando un filtro no tenga coincidencias.
- Alternativa textual o visual si un recurso de imagen no carga.
- Página 404 para rutas desconocidas.

No se simularán fallos de servidor porque no existe comunicación con backend.

## Verificación

La implementación se verificará mediante:

- Pruebas de componentes e interacciones críticas con Vitest y Testing Library.
- Pruebas de navegación para las rutas principales y la página 404.
- Comprobación de que los formularios no provocan solicitudes de red.
- Compilación de producción con Vite.
- Revisión en navegador de las rutas principales, la consola y el comportamiento adaptable.
- Comparación visual razonable con las capturas incluidas en el proyecto.

## Fuera de alcance

- Backend, API o base de datos.
- Autenticación, autorización o recuperación de contraseña reales.
- Integración con transportadoras, mapas, pagos, correo o mensajería.
- Persistencia de pedidos o preferencias.
- Publicación en un servicio externo.

## Criterios de aceptación

La tarea estará terminada cuando la aplicación pueda instalarse y ejecutarse con comandos npm documentados, todas las vistas acordadas sean accesibles por rutas, la navegación y las interacciones simuladas funcionen, el logo proporcionado esté integrado, no haya dependencia de un backend y la compilación y las pruebas finalicen correctamente.
