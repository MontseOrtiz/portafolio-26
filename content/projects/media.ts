// Imágenes de cada proyecto (public/images/projects/<slug>/). Los alt viven aquí, en ambos idiomas.
// Un proyecto sin entrada sigue mostrando el placeholder.
export type Shot = {
  src: string;
  alt: { en: string; es: string };
  // "cover" llena el marco; "contain" muestra la captura completa sobre el fondo del marco.
  fit: "cover" | "contain";
};

export type ProjectMedia = {
  card: Shot; // tarjeta del home (4:3)
  main: Shot; // media principal del caso de estudio
  secondary: Shot[]; // bucle de 6 o más capturas (8:9)
  wide?: Shot; // captura de escritorio a todo el ancho; opcional si no hay versión desktop
  mobile: Shot[]; // 4 pantallas móviles
};

const shot = (slug: string, name: string, en: string, es: string, fit: Shot["fit"] = "cover"): Shot => ({
  src: `/images/projects/${slug}/${slug}-${name}.webp`,
  alt: { en, es },
  fit,
});

const bd = (name: string, en: string, es: string, fit?: Shot["fit"]) => shot("book-diary", name, en, es, fit);
const dc = (name: string, en: string, es: string, fit?: Shot["fit"]) => shot("destino-china", name, en, es, fit);
const wt = (name: string, en: string, es: string, fit: Shot["fit"] = "contain") => shot("wod-tracker", name, en, es, fit);
const mb = (name: string, en: string, es: string, fit?: Shot["fit"]) => shot("mi-botiquin", name, en, es, fit);

const bdHome = bd(
  "home-hero-desktop",
  "Book Diary home: the app name over blossoming branches on a pink background.",
  "Inicio de Book Diary: el nombre de la app sobre ramas en flor con fondo rosa.",
);
const bdMobile = [
  bd(
    "home-hero-mobile",
    "Book Diary home on a phone, with the app name over blossoming branches.",
    "Inicio de Book Diary en el celular, con el nombre de la app sobre ramas en flor.",
    "contain",
  ),
  bd(
    "hero-navbar-mobile",
    "Book Diary on a phone with the navigation bar and the reading tree.",
    "Book Diary en el celular con la barra de navegación y el árbol de lectura.",
    "contain",
  ),
  bd(
    "years-and-goal-mobile",
    "Book Diary on a phone showing reading years and the yearly goal.",
    "Book Diary en el celular con los años de lectura y la meta anual.",
    "contain",
  ),
  bd(
    "shelves-mobile",
    "Book Diary on a phone: the tree shelves holding the books read.",
    "Book Diary en el celular: las repisas del árbol con los libros leídos.",
    "contain",
  ),
  bd(
    "branches-opening-mobile",
    "Book Diary on a phone as the branches open to reveal the bookstore.",
    "Book Diary en el celular mientras las ramas se abren y muestran la librería.",
    "contain",
  ),
  bd(
    "detail-bottom-sheet-mobile",
    "Book Diary on a phone with a book's details in a bottom sheet.",
    "Book Diary en el celular con el detalle de un libro en un panel inferior.",
    "contain",
  ),
];

const wtHome = wt(
  "home-mobile",
  "WOD Tracker home: a greeting asking how the workout went and a button to start a round.",
  "Inicio de WOD Tracker: un saludo que pregunta cómo va el día y un botón para empezar un round.",
);
const wtMobile = [
  wtHome,
  wt(
    "history-mobile",
    "WOD Tracker history: a list of past rounds with their dates, filtered by month and year.",
    "Historial de WOD Tracker: lista de rounds anteriores con fecha, filtrada por mes y año.",
  ),
  wt(
    "photo-mobile",
    "WOD Tracker photo step: take or pick a photo of the gym whiteboard.",
    "Paso de foto en WOD Tracker: tomar o elegir una foto del pizarrón del gimnasio.",
  ),
  wt(
    "saved-mobile",
    "WOD Tracker confirmation: the round was saved, with buttons to log another or see the history.",
    "Confirmación en WOD Tracker: el round se guardó, con botones para registrar otro o ver el historial.",
  ),
];

const dcHome = dc(
  "home-desktop",
  "Destino China home on desktop: a hero reading personalized trips to China, with a menu and a WhatsApp button.",
  "Inicio de Destino China en escritorio: un hero que dice viajes personalizados a China, con menú y botón de WhatsApp.",
);
const dcMobile = {
  home: dc(
    "home-mobile",
    "Destino China home on a phone, with the hero about personalized trips to China.",
    "Inicio de Destino China en el celular, con el hero de viajes personalizados a China.",
  ),
  about: dc(
    "about-mobile",
    "Destino China about page on a phone, with the story behind the agency.",
    "Página Nosotros de Destino China en el celular, con la historia de la agencia.",
  ),
  services: dc(
    "services-mobile",
    "Destino China services page on a phone: tailor-made trips to China, with a call to action.",
    "Página de servicios de Destino China en el celular: viajes a medida a China, con un botón de acción.",
  ),
  itineraries: dc(
    "itineraries-mobile",
    "Destino China itineraries page on a phone, with photos of a panda and the Chinese landscape.",
    "Página de itinerarios de Destino China en el celular, con fotos de un panda y paisajes de China.",
  ),
  contact: dc(
    "contact-mobile",
    "Destino China contact page on a phone, with the form to request a trip.",
    "Página de contacto de Destino China en el celular, con el formulario para pedir un viaje.",
  ),
};

export const projectMedia: Record<string, ProjectMedia> = {
  "book-diary": {
    card: bdHome,
    main: bdHome,
    secondary: bdMobile,
    wide: bd(
      "tree-shelves-with-books-desktop",
      "Book Diary on desktop: a tree whose shelves hold the books read, one per shelf.",
      "Book Diary en escritorio: un árbol cuyas repisas guardan los libros leídos.",
    ),
    mobile: [bdMobile[0], bdMobile[1], bdMobile[3], bdMobile[5]],
  },
  "wod-tracker": {
    card: wtHome,
    main: wtHome,
    secondary: [
      wtMobile[1],
      wt(
        "detail-mobile",
        "WOD Tracker round detail: warm-up, strength and the workout with its results.",
        "Detalle de un round en WOD Tracker: calentamiento, fuerza y el WOD con sus resultados.",
      ),
      wtMobile[2],
      wt(
        "rep-ladder-mobile",
        "WOD Tracker form to enter a rep ladder exercise, such as 2-4-6-8 repetitions.",
        "Formulario de WOD Tracker para capturar un ejercicio en escalera de repeticiones, como 2-4-6-8.",
      ),
      wtMobile[3],
      wtHome,
    ],
    mobile: wtMobile,
  },
  "destino-china": {
    card: dcHome,
    main: dcHome,
    secondary: [
      dcMobile.home,
      dcMobile.about,
      dcMobile.services,
      dcMobile.itineraries,
      dcMobile.contact,
      dc(
        "about-desktop",
        "Destino China about page on desktop, with the agency story next to a map of China.",
        "Página Nosotros de Destino China en escritorio, con la historia de la agencia junto a un mapa de China.",
        "contain",
      ),
    ],
    wide: dc(
      "itineraries-desktop",
      "Destino China itineraries page on desktop, with sample trips and photos of a panda and Chinese landscapes.",
      "Página de itinerarios de Destino China en escritorio, con viajes de ejemplo y fotos de un panda y paisajes de China.",
    ),
    mobile: [dcMobile.home, dcMobile.services, dcMobile.itineraries, dcMobile.contact],
  },
  "mi-botiquin": {
    card: mb(
      "hero-desktop",
      "Mi botiquín home on desktop: the burgundy brand name on a cream background.",
      "Inicio de Mi botiquín en escritorio: el nombre de la marca en burgundy sobre fondo crema.",
    ),
    main: mb(
      "hero-desktop",
      "Mi botiquín home on desktop: the burgundy brand name on a cream background.",
      "Inicio de Mi botiquín en escritorio: el nombre de la marca en burgundy sobre fondo crema.",
    ),
    secondary: [
      mb(
        "hero-mobile",
        "Mi botiquín home on a phone with the brand name and the explore link.",
        "Inicio de Mi botiquín en el celular con el nombre de la marca y el enlace para explorar.",
        "contain",
      ),
      mb(
        "medications-mobile",
        "Mi botiquín medication list on a phone: name, dose and quantity on each card.",
        "Lista de medicamentos de Mi botiquín en el celular: nombre, dosis y cantidad en cada tarjeta.",
        "contain",
      ),
      mb(
        "supplies-mobile",
        "Mi botiquín supplies tab on a phone: alcohol, cotton, bandages and syringes with their quantities.",
        "Pestaña de insumos de Mi botiquín en el celular: alcohol, algodón, curitas y jeringas con su cantidad.",
        "contain",
      ),
      mb(
        "empty-search-mobile",
        "Mi botiquín search with no results on a phone, with a button to clear the search.",
        "Búsqueda sin resultados en Mi botiquín en el celular, con un botón para limpiarla.",
        "contain",
      ),
      mb(
        "full-page-mobile",
        "Mi botiquín full page on a phone, from the header to the supplies list.",
        "Página completa de Mi botiquín en el celular, del encabezado a la lista de insumos.",
        "contain",
      ),
      mb(
        "medication-detail-desktop",
        "Mi botiquín on desktop with one medication expanded to show its form, expiry and notes.",
        "Mi botiquín en escritorio con un medicamento desplegado que muestra forma, vencimiento y notas.",
        "contain",
      ),
    ],
    wide: mb(
      "medications-desktop",
      "Mi botiquín medication list on desktop, with the search field and one card per medication.",
      "Lista de medicamentos de Mi botiquín en escritorio, con el campo de búsqueda y una tarjeta por medicamento.",
    ),
    mobile: [
      mb(
        "hero-mobile",
        "Mi botiquín home on a phone with the brand name and the explore link.",
        "Inicio de Mi botiquín en el celular con el nombre de la marca y el enlace para explorar.",
      ),
      mb(
        "medications-mobile",
        "Mi botiquín medication list on a phone: name, dose and quantity on each card.",
        "Lista de medicamentos de Mi botiquín en el celular: nombre, dosis y cantidad en cada tarjeta.",
      ),
      mb(
        "supplies-mobile",
        "Mi botiquín supplies tab on a phone: alcohol, cotton, bandages and syringes with their quantities.",
        "Pestaña de insumos de Mi botiquín en el celular: alcohol, algodón, curitas y jeringas con su cantidad.",
      ),
      mb(
        "empty-search-mobile",
        "Mi botiquín search with no results on a phone, with a button to clear the search.",
        "Búsqueda sin resultados en Mi botiquín en el celular, con un botón para limpiarla.",
      ),
    ],
  },
};
