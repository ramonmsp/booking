export interface Place {
  id: string;
  location: string;
  description: string;
  imageUrl: string;
}

export const allPlaces = new Map<string, Place>([
  [
    '1',
    {
      id: '1',
      location: 'Salvador, Bahia',
      description: `Salvador, capital of Bahia, is one of the most intense destinations in Brazil. Full of history, culture, traditions, colors and flavors, the city is an invitation to enjoy every minute. It's impossible not to get involved in everything that Bahia's destination offers and even more difficult not to leave wanting to return.`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
  [
    '2',
    {
      id: '2',
      location: 'Washington, United States',
      description: `Welcome to your stylish rental in the heart of Washington, D.C.! This contemporary apartment is located in a vibrant neighborhood, offering a perfect blend of urban convenience and historical charm`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
  [
    '3',
    {
      id: '3',
      location: 'Tokyo, Japan',
      description: `This contemporary apartment seamlessly blends modern design with traditional Japanese aesthetics, offering a serene and comfortable retreat in this bustling metropolis. Step into a thoughtfully furnished living space adorned with shoji screens, providing a touch of authenticity to your Tokyo experience`,
      imageUrl: 'https://placehold.co/600x400',
    },
  ],
]);

export function getAll() {
  return Array.from(allPlaces.values());
}

export function getById(id: string) {
  return allPlaces.get(id);
}
