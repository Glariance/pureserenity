export const PLACEHOLDER_TEXT_SHORT = 'Lorem ipsum dolor sit amet.';
export const PLACEHOLDER_TEXT_LONG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
export const PLACEHOLDER_HTML = `<p>${PLACEHOLDER_TEXT_LONG}</p>`;
export const PLACEHOLDER_IMAGE = 'assets/images/pureSerenity.png';

export const createPlaceholderList = (count: number, value: string = PLACEHOLDER_TEXT_SHORT): string[] =>
  Array.from({ length: count }, () => value);
