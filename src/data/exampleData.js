export const exampleUser1 = {
  email: "leo@vinci.com",
  password: "p",
  name: "Leonardo da Vinci",
  street: "Altschauerberg 8",
  postalCode: "91448",
  city: "Emskirchen",
};

export const exampleUser2 = {
  email: "feser@gso.test",
  password: "1234",
  name: "feser",
  street: "westerwaldstraße 92",
  postalCode: "51105",
  city: "Köln",
};

export const exampleUsers = [exampleUser1, exampleUser2];

export const exampleArticles = [
  {
    id: 1,
    name: "Ford Fiesta (1976) – Prospekt (DE)",
    description: "Kompakter Ford Fiesta aus dem Jahr 1976 für den deutschen Markt. Der Prospekt bietet einen schnellen Überblick über Modell, Ausstattung und typische Highlights der Baureihe.",
    category: "Ford",
    tags: [ "Fiesta", "1976", "Prospekt", "Deutschland", "Kleinwagen", "Klassiker" ],
    filesize: "1.5 KB",
    downloadlink: "downloads/Ford-Fiesta-1976-GER.pdf",
    downloadfilename: "Ford-Fiesta-1976-GER.pdf"
  },
  {
    id: 2,
    name: "Ford Explorer (1993) – Prospekt (USA)",
    description: "Ford Explorer aus dem Modelljahr 1993 für den US-Markt. Enthält eine kurze Darstellung von Ausstattungsvarianten, Komfort- und Nutzwert-Themen sowie Modellpositionierung.",
    category: "Ford",
    tags: [ "Explorer", "1993", "Prospekt", "USA", "SUV", "90er" ],
    filesize: "2.1 KB",
    downloadlink: "downloads/Ford-Explorer-1993-USA.pdf",
    downloadfilename: "Ford-Explorer-1993-USA.pdf"
  },
  {
    id: 3,
    name: "Ford Capri (1970) – Prospekt",
    description: "Ford Capri aus dem Jahr 1970. Der Prospekt fasst das sportlich geprägte Konzept, Design und zentrale Ausstattungsmerkmale des Modells zusammen.",
    category: "Ford",
    tags: [ "Capri", "1970", "Prospekt", "Sportcoupé", "Klassiker" ],
    filesize: "1.3 KB",
    downloadlink: "downloads/Ford-Capri-1970.pdf",
    downloadfilename: "Ford-Capri-1970.pdf"
  },
  {
    id: 4,
    name: "Ford GT40 (1966) – Infodokument (INT)",
    description: "Dokument zum Ford GT40 aus dem Jahr 1966 mit internationalem Bezug. Fokus liegt typischerweise auf Motorsport-Historie, technischen Eckdaten und der Bedeutung des Modells.",
    category: "Ford",
    tags: [ "GT40", "1966", "Motorsport", "LeMans", "International", "Ikone" ],
    filesize: "3.4 KB",
    downloadlink: "downloads/Ford-GT40-1966-INT.pdf",
    downloadfilename: "Ford-GT40-1966-INT.pdf"
  },
  {
    id: 5,
    name: "Ford Mustang (1964) – Prospekt (USA)",
    description: "Früher Ford Mustang (1964) für den US-Markt. Der Prospekt gibt einen kompakten Überblick über das Modell, seine Positionierung und zentrale Ausstattungs-/Designmerkmale.",
    category: "Ford",
    tags: [ "Mustang", "1964", "Prospekt", "USA", "Muscle Car", "Klassiker" ],
    filesize: "2.7 KB",
    downloadlink: "downloads/Ford-Mustang-1964-USA.pdf",
    downloadfilename: "Ford-Mustang-1964-USA.pdf"
  },
  {
    id: 6,
    name: "Nach welchen konzeptionellen bzw. operativen Prinzipien ist Moritz K. verfahren?",
    description:
    "Geopolitische Dynamiken im Nahen Osten und ihre indirekte Relevanz für steigende Preise von Nuss-Nougat-Croissants.",
    category: "Backwarenproduktion",
    tags: ["Huthi-Angriffe", "Jemen", "Croissants", "Moritz K."],
    filesize: "2.4 KB",
    downloadlink: "downloads/nussnougat.pdf",
    downloadfilename: "nussnougat.pdf",
  },
];
