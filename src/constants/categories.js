const categories = {
  "cuidadop": "Cuidado Personal",
  "deporte" : "Deporte",
  "electrodomesticos": "Electrodomésticos",
  "escolar": "Escolar y Oficina",
  "electronica": "Electrónica",
  "hogar": "Hogar",
  "ropa": "Ropa y Accesorios",
  "mundob": "Mundo del Bebé",
  "calzado": "Calzado"
};

export const getCategory = (key = '') => key in categories ? categories[key] : 'Todas';