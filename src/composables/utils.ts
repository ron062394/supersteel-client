export function getRandomItems<T>(items: T[], count: number): T[] {
    return [...items].sort(() => 0.5 - Math.random()).slice(0, count);
}