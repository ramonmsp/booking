export interface Property {
  id: string;
  location: string;
  description: string;
  imageUrl: string;
}

export const allProperties = new Map<string, Property>([
  [
    '1',
    {
      id: '1',
      location: 'Salvador, Bahia, Brazil',
      description: `Salvador, capital of Bahia, is one of the most intense destinations in Brazil. Full of history, culture, traditions, colors and flavors, the city is an invitation to enjoy every minute. It's impossible not to get involved in everything that Bahia's destination offers and even more difficult not to leave wanting to return.`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
  [
    '2',
    {
      id: '2',
      location: 'Buenos Aires, Argentina',
      description: `Distinguished by the great diversity of landscapes offered by its territory, countryside, beaches, delta, mountains, lagoons, rivers, towns and cities, the Province of Buenos Aires offers tourist options to enjoy all year round.`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
  [
    '3',
    {
      id: '3',
      location: 'Marrakech, Morocco',
      description: `Marrakesh, also known as Marrakech, is one of the most fascinating and vibrant cities in Morocco, located inland at the foothills of the High Atlas Mountains.`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
]);

export function getAll() {
  return Array.from(allProperties.values());
}

export function getById(id: string) {
  return allProperties.get(id);
}
