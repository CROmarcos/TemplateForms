import { FormTemplateData } from '../../types/form-template';
import { validateUniqueTemplateCode, deactivateAllOtherTemplates } from '../../utils/lifecycle-helpers';

export default {
  async beforeCreate(event) {
    const data = event.params.data as FormTemplateData;

    const existingDraft = await strapi.db.query('api::form-template.form-template').findOne({
      where: {
        templateCode: data.templateCode,
        publishedAt: null,
      },
      select: ['id'],
    });

    await validateUniqueTemplateCode(data.templateCode, existingDraft?.id);

    if (data.isActive) {
      await deactivateAllOtherTemplates(data.templateCode, existingDraft?.id);
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    const formData = data as FormTemplateData;

    const existing = await strapi.db.query('api::form-template.form-template').findOne({
      where: { id: where.id },
      select: ['templateCode'],
    });

    const templateCode = formData.templateCode || existing?.templateCode;

    if (formData.templateCode && formData.templateCode !== existing?.templateCode) {
      await validateUniqueTemplateCode(formData.templateCode, where.id);
    }

    if (formData.isActive) {
      await deactivateAllOtherTemplates(templateCode, where.id);
    }
  }
};