export const getImageWithFallback = (imageUrl) => {
    if (imageUrl?.includes("apple-touch-icon") || !imageUrl) {
        return "/placeholder.png";
    }
    return imageUrl;
};