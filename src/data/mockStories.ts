export interface Creator {
  id: string;
  name: string;
  avatar: string;
}

export interface Story {
  id: string;
  title: string;
  creator: Creator;
  coverImage: string;
  description: string;
  audioUrl: string;
  textContent: string;
  duration: string;
  category: string;
  isLiked: boolean;
  isFavorite: boolean;
}

export const creators: Creator[] = [
  { id: '1', name: 'Dora', avatar: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '2', name: 'Mateo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '3', name: 'Elena', avatar: 'https://images.unsplash.com/photo-1552699611-e2c2a8e56044?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '4', name: 'Ricardo', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300' },
];

export const mockStoriesData: Story[] = [
  {
    id: 's1',
    title: 'El Aroma de la Albahaca',
    creator: creators[0],
    coverImage: 'https://images.unsplash.com/photo-1506806732259-39c2d4a78ae7?auto=format&fit=crop&q=80&w=800&h=1000',
    description: 'Una receta que salvó mi primer aniversario de bodas.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    textContent: `Recuerdo que aquel día el aire estaba cargado de humedad. Mi abuela siempre decía que la clave de un buen pesto no estaba en el mortero, sino en el amor con el que se recogían las hojas de albahaca antes del amanecer.

Aquel aniversario, todo parecía ir mal. Se me quemó el asado, el vino se había agriado y Mateo estaba por llegar. Entonces, recordé el aroma. Salí al patio, toqué la tierra mojada y supe qué hacer. No fue solo pasta; fue la memoria de tres generaciones en un plato.`,
    duration: '3:45',
    category: 'Recetas',
    isLiked: false,
    isFavorite: true,
  },
  {
    id: 's2',
    title: 'La Radio que Escuchaba el Viento',
    creator: creators[1],
    coverImage: 'https://images.unsplash.com/photo-1557165074-b49b392b4772?auto=format&fit=crop&q=80&w=800&h=1000',
    description: 'De cuando las noticias llegaban por ondas y no por pantallas.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    textContent: `En 1952, mi padre compró la primera radio Philco. Toda la aldea se reunía en nuestro porche para escuchar el radioteatro de las siete. El silencio era tan profundo que podías oír el crujir de las sillas de mimbre.

Hoy, todos miran hacia abajo. Yo prefiero cerrar los ojos y recordar cómo el locutor describía los colores de una ciudad que ninguno de nosotros había visitado jamás, pero que todos podíamos ver perfectamente.`,
    duration: '5:20',
    category: 'Memorias',
    isLiked: true,
    isFavorite: false,
  },
  {
    id: 's3',
    title: 'El Primer Vals en la Plaza',
    creator: creators[2],
    coverImage: 'https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&q=80&w=800&h=1000',
    description: 'Un baile bajo las estrellas antes de que todo cambiara.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    textContent: `Llevaba un vestido azul que mi madre había cosido con restos de seda. Mis zapatos apretaban, pero el sonido de la orquesta era tan potente que el dolor desapareció.

Esa noche, bajo las linternas amarillas de la plaza central, comprendí que la vida es una serie de momentos que solo existen si alguien los recuerda. Por eso cuento esto hoy.`,
    duration: '4:10',
    category: 'Amor',
    isLiked: false,
    isFavorite: false,
  }
];
