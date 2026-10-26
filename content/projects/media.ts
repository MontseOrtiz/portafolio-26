// Imágenes de cada proyecto (public/images/projects/<slug>/). Los alt viven aquí, en ambos idiomas.
export type Shot = {
  src: string;
  alt: { en: string; es: string };
  width: number;
  height: number;
};

export type ProjectMedia = {
  hero: Shot; // hero del proyecto: desktop si existe, si no móvil. Se usa en el home y en el caso de estudio
  carousel: Shot[]; // 6 capturas: desktop primero; si faltan se completan con móvil
  wide: Shot; // captura completa del home, sobre gingham
  mobile: Shot[]; // pantallas de la franja "Mobile screens", completas y sin recorte
};

// Tamaño real de cada imagen (ancho x alto): cada captura se muestra a todo el ancho con su propia altura.
const SIZES: Record<string, [number, number]> = {
  "book-diary/book-detail-desktop": [2880, 1620],
  "book-diary/branches-opening-desktop": [2880, 1620],
  "book-diary/branches-opening-mobile": [780, 1688],
  "book-diary/detail-bottom-sheet-mobile": [780, 1688],
  "book-diary/door-arrival-desktop": [2880, 1620],
  "book-diary/facade-closeup-desktop": [2880, 1620],
  "book-diary/hero-navbar-desktop": [2880, 1620],
  "book-diary/hero-navbar-mobile": [780, 1688],
  "book-diary/home-desktop-full": [2880, 6726],
  "book-diary/home-hero-desktop": [2880, 1620],
  "book-diary/home-hero-mobile": [780, 1688],
  "book-diary/shelves-mobile": [780, 1688],
  "book-diary/tree-currently-reading-desktop": [2880, 1620],
  "book-diary/tree-shelves-with-books-desktop": [2880, 1620],
  "book-diary/tree-trunk-and-base-desktop": [2880, 1620],
  "book-diary/years-and-goal-desktop": [2880, 1620],
  "book-diary/years-and-goal-mobile": [780, 1688],
  "destino-china/about-desktop": [2880, 1800],
  "destino-china/about-mobile": [1170, 1992],
  "destino-china/contact-desktop": [2880, 1800],
  "destino-china/contact-mobile": [1170, 1992],
  "destino-china/home-desktop": [2880, 1800],
  "destino-china/home-desktop-full": [2880, 8498],
  "destino-china/home-mobile": [1170, 1992],
  "destino-china/itineraries-desktop": [2880, 1800],
  "destino-china/itineraries-mobile": [1170, 1992],
  "destino-china/services-desktop": [2880, 1800],
  "destino-china/services-mobile": [1170, 1992],
  "mi-botiquin/empty-search-mobile": [702, 2204],
  "mi-botiquin/full-page-desktop": [1440, 1783],
  "mi-botiquin/hero-desktop": [1440, 900],
  "mi-botiquin/hero-mobile": [750, 1334],
  "mi-botiquin/medication-detail-desktop": [1248, 906],
  "mi-botiquin/medications-desktop": [1248, 819],
  "mi-botiquin/medications-mobile": [702, 1950],
  "mi-botiquin/supplies-desktop": [1248, 741],
  "mi-botiquin/supplies-mobile": [702, 1390],
  "wod-tracker/404-mobile": [780, 1688],
  "wod-tracker/access-mobile": [780, 1688],
  "wod-tracker/detail-mobile": [780, 1688],
  "wod-tracker/history-mobile": [780, 1688],
  "wod-tracker/home-desktop-full": [2880, 1800],
  "wod-tracker/home-mobile": [780, 1688],
  "wod-tracker/photo-mobile": [780, 1688],
  "wod-tracker/rep-ladder-mobile": [780, 2000],
  "wod-tracker/saved-mobile": [780, 1688],
  "wod-tracker/wod-mobile": [780, 1688],
};

const shot = (slug: string, name: string, en: string, es: string): Shot => {
  const size = SIZES[`${slug}/${name}`];
  if (!size) throw new Error(`Falta el tamaño de ${slug}/${name} en SIZES`);
  return { src: `/images/projects/${slug}/${slug}-${name}.webp`, alt: { en, es }, width: size[0], height: size[1] };
};

const bd = (name: string, en: string, es: string) => shot("book-diary", name, en, es);
const wt = (name: string, en: string, es: string) => shot("wod-tracker", name, en, es);
const dc = (name: string, en: string, es: string) => shot("destino-china", name, en, es);
const mb = (name: string, en: string, es: string) => shot("mi-botiquin", name, en, es);

// ---- Book Diary
const bdHero = bd(
  "hero-navbar-desktop",
  "Book Diary on desktop: the navigation bar over the blossoming bookstore facade.",
  "Book Diary en escritorio: la barra de navegación sobre la fachada florida de la librería.",
);

// ---- WOD Tracker
const wtHome = wt(
  "home-desktop-full",
  "WOD Tracker home: a greeting asking how the workout went and a button to start a round.",
  "Inicio de WOD Tracker: un saludo que pregunta cómo va el día y un botón para empezar un round.",
);

// ---- Destino China
const dcHero = dc(
  "home-desktop",
  "Destino China home on desktop: a hero reading personalized trips to China, with a menu and a WhatsApp button.",
  "Inicio de Destino China en escritorio: un hero que dice viajes personalizados a China, con menú y botón de WhatsApp.",
);

// ---- Mi botiquín
const mbHero = mb(
  "hero-desktop",
  "Mi botiquín home on desktop: the burgundy brand name on a cream background.",
  "Inicio de Mi botiquín en escritorio: el nombre de la marca en burgundy sobre fondo crema.",
);

export const projectMedia: Record<string, ProjectMedia> = {
  "book-diary": {
    hero: bdHero,
    carousel: [
      bd(
        "home-hero-desktop",
        "Book Diary home on desktop: the app name over blossoming branches on a pink background.",
        "Inicio de Book Diary en escritorio: el nombre de la app sobre ramas en flor con fondo rosa.",
      ),
      bd(
        "branches-opening-desktop",
        "Book Diary on desktop as the branches open to reveal the bookstore.",
        "Book Diary en escritorio mientras las ramas se abren y muestran la librería.",
      ),
      bd(
        "door-arrival-desktop",
        "Book Diary on desktop: arriving at the bookstore door.",
        "Book Diary en escritorio: la llegada a la puerta de la librería.",
      ),
      bd(
        "years-and-goal-desktop",
        "Book Diary on desktop: the reading years and the yearly goal.",
        "Book Diary en escritorio: los años de lectura y la meta anual.",
      ),
      bd(
        "tree-currently-reading-desktop",
        "Book Diary on desktop: the reading tree with the book currently being read.",
        "Book Diary en escritorio: el árbol de lectura con el libro que se está leyendo.",
      ),
      bd(
        "tree-shelves-with-books-desktop",
        "Book Diary on desktop: a tree whose shelves hold the books read.",
        "Book Diary en escritorio: un árbol cuyas repisas guardan los libros leídos.",
      ),
      bd(
        "tree-trunk-and-base-desktop",
        "Book Diary on desktop: the trunk and base of the reading tree.",
        "Book Diary en escritorio: el tronco y la base del árbol de lectura.",
      ),
      bd(
        "book-detail-desktop",
        "Book Diary on desktop with the details of a book.",
        "Book Diary en escritorio con el detalle de un libro.",
      ),
    ],
    wide: bd(
      "home-desktop-full",
      "Book Diary full home page on desktop, from the blossoming hero down to the reading tree.",
      "Página de inicio completa de Book Diary en escritorio, del hero con ramas en flor al árbol de lectura.",
    ),
    mobile: [
      bd("home-hero-mobile", "Book Diary home on a phone, with the app name over blossoming branches.", "Inicio de Book Diary en el celular, con el nombre de la app sobre ramas en flor.",),
      bd("branches-opening-mobile", "Book Diary on a phone as the branches open to reveal the bookstore.", "Book Diary en el celular mientras las ramas se abren y muestran la librería.",),
      bd("hero-navbar-mobile", "Book Diary on a phone with the navigation bar and the reading tree.", "Book Diary en el celular con la barra de navegación y el árbol de lectura.",),
      bd("years-and-goal-mobile", "Book Diary on a phone showing reading years and the yearly goal.", "Book Diary en el celular con los años de lectura y la meta anual.",),
      bd("shelves-mobile", "Book Diary on a phone: the tree shelves holding the books read.", "Book Diary en el celular: las repisas del árbol con los libros leídos.",),
      bd("detail-bottom-sheet-mobile", "Book Diary on a phone with a book's details in a bottom sheet.", "Book Diary en el celular con el detalle de un libro en un panel inferior.",),
    ],
  },
  "wod-tracker": {
    hero: wtHome,
    // La app es solo móvil: el carrusel usa capturas móviles.
    carousel: [
      wt("history-mobile", "WOD Tracker history: a list of past rounds with their dates, filtered by month and year.", "Historial de WOD Tracker: lista de rounds anteriores con fecha, filtrada por mes y año."),
      wt("detail-mobile", "WOD Tracker round detail: warm-up, strength and the workout with its results.", "Detalle de un round en WOD Tracker: calentamiento, fuerza y el WOD con sus resultados."),
      wt("photo-mobile", "WOD Tracker photo step: take or pick a photo of the gym whiteboard.", "Paso de foto en WOD Tracker: tomar o elegir una foto del pizarrón del gimnasio."),
      wt("rep-ladder-mobile", "WOD Tracker form to enter an exercise with its rep ladder, such as 21-15-9 repetitions.", "Formulario de WOD Tracker para capturar un ejercicio con su escalera de repeticiones, como 21-15-9."),
      wt("saved-mobile", "WOD Tracker confirmation: the round was saved, with buttons to log another or see the history.", "Confirmación en WOD Tracker: el round se guardó, con botones para registrar otro o ver el historial."),
      wt("wod-mobile", "WOD Tracker form to enter the result and the exercises of the workout, with a save button.", "Formulario de WOD Tracker para capturar el resultado y los ejercicios del entrenamiento, con un botón para guardar."),
    ],
    wide: wtHome,
    mobile: [
      wt("home-mobile", "WOD Tracker home on a phone: a greeting and a button to start a round.", "Inicio de WOD Tracker en el celular: un saludo y un botón para empezar un round.",),
      wt("history-mobile", "WOD Tracker history on a phone: past rounds filtered by month and year.", "Historial de WOD Tracker en el celular: rounds anteriores filtrados por mes y año.",),
      wt("detail-mobile", "WOD Tracker round detail on a phone: warm-up, strength and the workout.", "Detalle de un round en WOD Tracker en el celular: calentamiento, fuerza y WOD.",),
      wt("access-mobile", "WOD Tracker owner access on a phone: a PIN field and a link to the history.", "Acceso del propietario en WOD Tracker en el celular: un campo de PIN y un enlace al historial.",),
      wt("photo-mobile", "WOD Tracker photo step on a phone: take or pick a photo of the whiteboard.", "Paso de foto en WOD Tracker en el celular: tomar o elegir una foto del pizarrón.",),
      wt("rep-ladder-mobile", "WOD Tracker rep ladder form on a phone, such as 21-15-9 repetitions.", "Formulario de escalera de repeticiones en WOD Tracker en el celular, como 21-15-9.",),
      wt("wod-mobile", "WOD Tracker form on a phone to enter the result and the exercises of the workout.", "Formulario de WOD Tracker en el celular para capturar el resultado y los ejercicios del entrenamiento.",),
      wt("saved-mobile", "WOD Tracker confirmation on a phone: the round was saved.", "Confirmación en WOD Tracker en el celular: el round se guardó.",),
      wt("404-mobile", "WOD Tracker 404 page on a phone, with a button back to the start.", "Página 404 de WOD Tracker en el celular, con un botón para volver al inicio.",),
    ],
  },
  "destino-china": {
    hero: dcHero,
    carousel: [
      dc("about-desktop", "Destino China about page on desktop, with the agency story next to a map of China.", "Página Nosotros de Destino China en escritorio, con la historia de la agencia junto a un mapa de China."),
      dc("services-desktop", "Destino China services page on desktop: tailor-made trips to China.", "Página de servicios de Destino China en escritorio: viajes a medida a China."),
      dc("itineraries-desktop", "Destino China itineraries page on desktop, with sample trips and photos of a panda and Chinese landscapes.", "Página de itinerarios de Destino China en escritorio, con viajes de ejemplo y fotos de un panda y paisajes de China."),
      dc("contact-desktop", "Destino China contact page on desktop, with the form to request a trip.", "Página de contacto de Destino China en escritorio, con el formulario para pedir un viaje."),
      dc("home-mobile", "Destino China home on a phone, with the hero about personalized trips to China.", "Inicio de Destino China en el celular, con el hero de viajes personalizados a China."),
      dc("itineraries-mobile", "Destino China itineraries page on a phone, with photos of a panda and the Chinese landscape.", "Página de itinerarios de Destino China en el celular, con fotos de un panda y paisajes de China."),
    ],
    wide: dc(
      "home-desktop-full",
      "Destino China full home page on desktop, from the hero to the footer.",
      "Página de inicio completa de Destino China en escritorio, del hero al pie de página.",
    ),
    mobile: [
      dc("home-mobile", "Destino China home on a phone, with the hero about personalized trips to China.", "Inicio de Destino China en el celular, con el hero de viajes personalizados a China.",),
      dc("about-mobile", "Destino China about page on a phone, with the story behind the agency.", "Página Nosotros de Destino China en el celular, con la historia de la agencia.",),
      dc("services-mobile", "Destino China services page on a phone: tailor-made trips to China, with a call to action.", "Página de servicios de Destino China en el celular: viajes a medida a China, con un botón de acción.",),
      dc("itineraries-mobile", "Destino China itineraries page on a phone, with photos of a panda and the Chinese landscape.", "Página de itinerarios de Destino China en el celular, con fotos de un panda y paisajes de China.",),
      dc("contact-mobile", "Destino China contact page on a phone, with the form to request a trip.", "Página de contacto de Destino China en el celular, con el formulario para pedir un viaje.",),
    ],
  },
  "mi-botiquin": {
    hero: mbHero,
    carousel: [
      mb("medications-desktop", "Mi botiquín medication list on desktop, with the search field and one card per medication.", "Lista de medicamentos de Mi botiquín en escritorio, con el campo de búsqueda y una tarjeta por medicamento."),
      mb("medication-detail-desktop", "Mi botiquín on desktop with one medication expanded to show its form, expiry and notes.", "Mi botiquín en escritorio con un medicamento desplegado que muestra forma, vencimiento y notas."),
      mb("supplies-desktop", "Mi botiquín supplies tab on desktop: alcohol, cotton, bandages and syringes with their quantities.", "Pestaña de insumos de Mi botiquín en escritorio: alcohol, algodón, curitas y jeringas con su cantidad."),
      mb("full-page-desktop", "Mi botiquín full page on desktop, from the header to the supplies list.", "Página completa de Mi botiquín en escritorio, del encabezado a la lista de insumos."),
      mb("hero-mobile", "Mi botiquín home on a phone with the brand name and the explore link.", "Inicio de Mi botiquín en el celular con el nombre de la marca y el enlace para explorar."),
      mb("empty-search-mobile", "Mi botiquín search with no results on a phone, with a button to clear the search.", "Búsqueda sin resultados en Mi botiquín en el celular, con un botón para limpiarla."),
    ],
    wide: mb(
      "full-page-desktop",
      "Mi botiquín full page on desktop, from the header to the supplies list.",
      "Página completa de Mi botiquín en escritorio, del encabezado a la lista de insumos.",
    ),
    mobile: [
      mb("hero-mobile", "Mi botiquín home on a phone with the brand name and the explore link.", "Inicio de Mi botiquín en el celular con el nombre de la marca y el enlace para explorar.",),
      mb("medications-mobile", "Mi botiquín medication list on a phone: name, dose and quantity on each card.", "Lista de medicamentos de Mi botiquín en el celular: nombre, dosis y cantidad en cada tarjeta.",),
      mb("supplies-mobile", "Mi botiquín supplies tab on a phone: alcohol, cotton, bandages and syringes with their quantities.", "Pestaña de insumos de Mi botiquín en el celular: alcohol, algodón, curitas y jeringas con su cantidad.",),
      mb("empty-search-mobile", "Mi botiquín search with no results on a phone, with a button to clear the search.", "Búsqueda sin resultados en Mi botiquín en el celular, con un botón para limpiarla.",),
    ],
  },
};
