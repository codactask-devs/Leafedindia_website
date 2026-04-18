
export const stackImages = Object.values(
    import.meta.glob('./NavBarImages/*.{svg,webp,png,jpg,jpeg}', { eager: true, import: 'default' })
) as string[];

const allProductAssets = import.meta.glob('./Products/**/*.{svg,webp,png,jpg,jpeg}', { eager: true, import: 'default' });

interface ProductImages {
    main?: string;
    whychoose?: string;
    cta?: string;
    variants: string[];
    gallery: string[];
}

export const productAssets: Record<string, ProductImages> = {};

// Process the glob results
Object.entries(allProductAssets).forEach(([path, imported]) => {
    // Expected path format: ./Products/FolderName/[SubFolder/]FileName.ext
    const parts = path.split('/');
    if (parts.length < 4) return;

    const folderName = parts[2]; // e.g., "Cups"
    const fileNameWithExt = parts[parts.length - 1];
    const fileName = fileNameWithExt.split('.')[0].toLowerCase();
    const subFolder = parts.length > 4 ? parts[3].toLowerCase() : null;

    if (!productAssets[folderName]) {
        productAssets[folderName] = {
            variants: [],
            gallery: []
        };
    }

    const assetUrl = imported as string;

    if (subFolder === 'varients' || subFolder === 'variants') {
        productAssets[folderName].variants.push(assetUrl);
    } else if (subFolder === 'gallery') {
        productAssets[folderName].gallery.push(assetUrl);
    } else {
        // Top level images in the product folder
        if (fileName === 'main') {
            productAssets[folderName].main = assetUrl;
        } else if (fileName === 'whychoose') {
            productAssets[folderName].whychoose = assetUrl;
        } else if (fileName === 'cta') {
            productAssets[folderName].cta = assetUrl;
        } else {
            // If they don't match standard names, add to variants or gallery as fallback?
            // For now, let's just add them to variants if they aren't one of the big 3.
            productAssets[folderName].variants.push(assetUrl);
        }
    }
});

export const allGalleryImages = Object.values(productAssets).flatMap(p => p.gallery);
