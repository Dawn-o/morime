export function extractYouTubeVideoId(url) {
  if (!url) return null;

  try {
    const patterns = [
      /(?:youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([^?&]+)/,
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?&]+)/,
      /(?:youtube\.com\/v\/)([^?&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("Error extracting YouTube video ID:", error);
    return null;
  }
}

export function getYouTubeThumbnail(videoIdOrUrl, quality = "maxresdefault") {
  if (!videoIdOrUrl) return null;

  const videoId =
    videoIdOrUrl.includes("youtube") || videoIdOrUrl.includes("youtu.be")
      ? extractYouTubeVideoId(videoIdOrUrl)
      : videoIdOrUrl;

  if (!videoId) return null;

  const qualityMap = {
    default: "default",
    mq: "mqdefault",
    hq: "hqdefault",
    sd: "sddefault",
    maxres: "maxresdefault",
  };

  const thumbnailQuality = qualityMap[quality] || quality;

  return `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;
}

export function setYouTubeAutoplay(embedUrl, autoplay = false) {
  if (!embedUrl) return null;

  try {
    const url = new URL(embedUrl);

    if (autoplay) {
      url.searchParams.set("autoplay", "1");
    } else {
      url.searchParams.set("autoplay", "0");
    }

    return url.toString();
  } catch (error) {
    console.error("Error setting YouTube autoplay:", error);
    return embedUrl;
  }
}

export function removeYouTubeAutoplay(embedUrl) {
  if (!embedUrl) return null;

  try {
    const url = new URL(embedUrl);
    url.searchParams.delete("autoplay");
    return url.toString();
  } catch (error) {
    console.error("Error removing YouTube autoplay:", error);
    return embedUrl;
  }
}

export function getYouTubeEmbedUrl(videoIdOrUrl, options = {}) {
  if (!videoIdOrUrl) return null;

  const videoId =
    videoIdOrUrl.includes("youtube") || videoIdOrUrl.includes("youtu.be")
      ? extractYouTubeVideoId(videoIdOrUrl)
      : videoIdOrUrl;

  if (!videoId) return null;

  const {
    autoplay = false,
    mute = false,
    controls = true,
    loop = false,
    enablejsapi = false,
    noCookie = true,
  } = options;

  const domain = noCookie ? "youtube-nocookie.com" : "youtube.com";
  const url = new URL(`https://www.${domain}/embed/${videoId}`);

  if (autoplay) url.searchParams.set("autoplay", "1");
  if (mute) url.searchParams.set("mute", "1");
  if (!controls) url.searchParams.set("controls", "0");
  if (loop) {
    url.searchParams.set("loop", "1");
    url.searchParams.set("playlist", videoId);
  }
  if (enablejsapi) url.searchParams.set("enablejsapi", "1");

  return url.toString();
}
