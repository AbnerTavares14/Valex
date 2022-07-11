export function mapObjectToUpdateQuery({ object, offset = 1 }) {
    const objectColumns = Object.keys(object)
        .map((key, index) => `"${key}"=$${index + offset}`)
        .join(",");
    const objectValues: any = Object.values(object);

    return { objectColumns, objectValues };
}