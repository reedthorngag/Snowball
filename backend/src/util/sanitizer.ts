import sanitizer from "sanitize-html";

export default function sanitize(input: string, allowLimited?: true): string {
    return sanitizer(input, {allowedTags: allowLimited ? ['b','i'] : [], allowedStyles: {}, disallowedTagsMode: 'escape'});
}

