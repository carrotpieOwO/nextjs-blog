export const removeHtmlTags = (htmlString:string) => {
    return htmlString.replace(/<[^>]+>/g, '');
}