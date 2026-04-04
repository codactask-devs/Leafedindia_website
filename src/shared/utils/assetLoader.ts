/**
 * Dynamic Asset Loader Utility
 * 
 * Uses Vite's glob import to discover all images in the assets folder.
 * This is evaluated at build time, so there's no runtime performance penalty
 * for "scanning" the directory.
 */

// We use eager: true to get the URLs immediately during the initial load.
// This creates a static mapping of file paths to their bundled URLs.
const allAssets = import.meta.glob<{ default: string }>("/src/assets/**/*.{webp,jpg,png,svg,jpeg}", {
    eager: true,
});

/**
 * Returns an array of image URLs found in a specific subfolder of src/assets.
 * @param folderName The name of the folder inside src/assets (e.g., "BURGER BOX")
 * @returns Array of resolved image URLs
 */
export const getImagesInFolder = (folderName: string): string[] => {
    // Normalize path to match the glob keys (which start with /src/assets/)
    const targetPathPrefix = `/src/assets/${folderName.trim()}/`.toLowerCase();
    
    return Object.keys(allAssets)
        .filter((path) => path.toLowerCase().startsWith(targetPathPrefix))
        .map((path) => allAssets[path].default);
};

/**
 * Checks if a specific image exists in the assets glob.
 */
export const assetExists = (path: string): boolean => {
    return !!allAssets[path];
};
