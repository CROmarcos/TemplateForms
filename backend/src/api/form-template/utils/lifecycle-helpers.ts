export async function validateUniqueTemplateCode(templateCode?: string, excludeId?: number): Promise<void> {
    strapi.log.info("template code validacija")
    if (!templateCode) return;

    const existing = await strapi.db.query('api::form-template.form-template').findOne({
        where: {
            templateCode,
            ...(excludeId ? { id: { $ne: excludeId } } : {}),
        },
        select: ['id'],
    });

    if (existing) {
        strapi.log.info("existing:", existing)
        throw new Error(`Template Code '${templateCode}' već postoji.`);
    }
}

export async function deactivateAllOtherTemplates(currentTemplateCode: string, excludeId?: number): Promise<void> {
    strapi.log.info("isActive validacija")
    await strapi.db.query('api::form-template.form-template').updateMany({
        where: {
            isActive: true,
            ...(excludeId ? { id: { $ne: excludeId } } : {}),
        },
        data: {
            isActive: false,
        },
    });
}
