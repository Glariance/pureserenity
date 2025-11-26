export const PLACEHOLDER_TEXT_SHORT = 'Loading...';
export const PLACEHOLDER_TEXT_LONG = 'Loading content...';
export const PLACEHOLDER_HTML = `<p>${PLACEHOLDER_TEXT_LONG}</p>`;
export const PLACEHOLDER_IMAGE = 'assets/images/pureSerenity.png';

export const createPlaceholderList = (count: number, value: string = PLACEHOLDER_TEXT_SHORT): string[] =>
  Array.from({ length: count }, () => value);
