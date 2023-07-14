// coordinates.ts

export function getGliderGun(x: number, y: number): [number, number][] {
  const coordinates: [number, number][] = [];

  // First square
  coordinates.push([x + 4, y]);
  coordinates.push([x + 5, y]);
  coordinates.push([x + 4, y + 1]);
  coordinates.push([x + 5, y + 1]);

  //C
  coordinates.push([x + 4, y + 10]);
  coordinates.push([x + 5, y + 10]);
  coordinates.push([x + 6, y + 10]);
  coordinates.push([x + 3, y + 11]);
  coordinates.push([x + 2, y + 12]);
  coordinates.push([x + 2, y + 13]);
  coordinates.push([x + 7, y + 11]);
  coordinates.push([x + 8, y + 12]);
  coordinates.push([x + 8, y + 13]);

  //rocket
  coordinates.push([x + 5, y + 14]);

  coordinates.push([x + 3, y + 15]);
  coordinates.push([x + 4, y + 16]);
  coordinates.push([x + 5, y + 16]);
  coordinates.push([x + 6, y + 16]);
  coordinates.push([x + 5, y + 17]);
  coordinates.push([x + 7, y + 15]);

  //next rocket
  coordinates.push([x + 2, y + 20]);
  coordinates.push([x + 3, y + 20]);
  coordinates.push([x + 4, y + 20]);
  coordinates.push([x + 2, y + 21]);
  coordinates.push([x + 3, y + 21]);
  coordinates.push([x + 4, y + 21]);

  coordinates.push([x + 1, y + 22]);
  coordinates.push([x + 1, y + 24]);
  coordinates.push([x + 0, y + 24]);

  coordinates.push([x + 5, y + 22]);
  coordinates.push([x + 5, y + 24]);
  coordinates.push([x + 6, y + 24]);

  coordinates.push([x + 2, y + 34]);
  coordinates.push([x + 3, y + 34]);
  coordinates.push([x + 2, y + 35]);
  coordinates.push([x + 3, y + 35]);

  return coordinates;
}
