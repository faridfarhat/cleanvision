const siteBasePath = process.env.NODE_ENV === 'development' ? '' : '/cleanvision';

export function assetPath(path: string) {
  return `${siteBasePath}${path}`;
}
