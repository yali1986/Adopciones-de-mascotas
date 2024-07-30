Veu Animal Web App
Descripción
Veu Animal Web App es una plataforma diseñada para la asociación protectora de animales Veu Animal radicada en Santa Coloma de Gramenet, Barcelona. 
Esta aplicación permite a los usuarios explorar detalles sobre los gatos disponibles para adopción, unirse como voluntarios, y obtener más información sobre cómo contribuir a la causa.

Características
Home: Página principal con información general.
Login Voluntarios: Autenticación para usuarios del equipo de voluntarios.
Formulario: Para socios, contacto, y voluntarios.
Detalles del Gato: Información y foto sobre cada gato disponible para adopción.
Voluntariado: Página exclusiva para voluntarios registrados donde se muestran las tareas donde se pueden apuntar, las actividades que hace cada uno y las que necesitan ser cubiertas, los eventos que se pueden apoyar.
Logout: Cerrar sesión para usuarios voluntarios.
Tecnologías Utilizadas
React
React Router
Firebase para autenticación
Bootstrap y CSS para diseño
Configuración del Proyecto
Pre-requisitos
Node.js (v14 o superior)
npm o yarn
Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/veu-animal-web-app.git
Navega al directorio del proyecto:

bash
Copiar código
cd veu-animal-web-app
Instala las dependencias:

bash
Copiar código
npm install
Configura Firebase:

Crea un proyecto en Firebase Console.
Obtén las credenciales de Firebase y guárdalas en un archivo credenciales.js en la raíz del proyecto:
javascript
Copiar código
const appFirebase = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
export default appFirebase;
Inicia el servidor de desarrollo:

bash
Copiar código
npm start
Estructura del Proyecto
bash
Copiar código
src/
│
├── assets/              # Imágenes y otros recursos estáticos
├── components/          # Componentes reutilizables
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ...
│
├── context/             # Contextos de React para el estado global
│   ├── AuthContext.js
│   ├── CatContext.js
│   ├── ...
│
├── Pages/               # Páginas principales de la aplicación
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Form.jsx
│   ├── CardDetail.jsx
│   ├── Voluntariado.jsx
│   ├── ...
│
├── App.jsx              # Componente principal de la aplicación
├── App.css              # Estilos globales
├── credenciales.js      # Configuración de Firebase
└── index.js             # Punto de entrada de la aplicación
Uso
Autenticación
Los usuarios voluntarios pueden iniciar sesión en la página de "Login Voluntarios".
Una vez autenticados, podrán acceder a la página de "Voluntariado".
Al hacer clic en "Logout", el usuario cerrará sesión y será redirigido a la página principal.
Navegación
La navegación principal se realiza a través del Header, que incluye enlaces a las diferentes secciones de la aplicación.
La página de detalles del gato (CardDetail) muestra información específica de cada gato y permite a los usuarios interesados obtener más detalles.
Notas Adicionales
Internacionalización: La aplicación utiliza react-i18next para la internacionalización. Se usan tres lenguajes: catalán, español e inglés.
Diseño Responsivo: La aplicación está diseñada para ser responsiva utilizando Bootstrap.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
