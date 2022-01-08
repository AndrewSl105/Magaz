export const getFuturedImageData = data => {
    const media = data['wp:featuredmedia'];
    return {
        url: media.map(img => img.source_url),
        alt: media.map(img => img.title),
        authorName: data.author.map(aut => aut.name),
        authorUrl: data.author.map(aut => aut.avatar_urls[0]),
    }
};
