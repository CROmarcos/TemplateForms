export async function validateUniqueTemplateCode(templateCode?: string, excludeId?: number): Promise<void> {
    if (!templateCode) return;

    const existing = await strapi.db.query('api::form-template.form-template').findOne({
        where: {
            templateCode,
            ...(excludeId ? { id: { $ne: excludeId } } : {}),
        },
        select: ['id'],
    });

    if (existing) {
        const { errors } = require('@strapi/utils')
        throw new errors.ApplicationError(`Template Code '${templateCode}' već postoji.`);
    }
}

export async function deactivateAllOtherTemplates(currentTemplateCode: string, excludeId?: number): Promise<void> {
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
