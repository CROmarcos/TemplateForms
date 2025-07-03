import type { Schema, Struct } from '@strapi/strapi';

export interface SharedActivePeriod extends Struct.ComponentSchema {
  collectionName: 'components_shared_active_periods';
  info: {
    displayName: 'activePeriod';
  };
  attributes: {
    validFrom: Schema.Attribute.Date;
    validTo: Schema.Attribute.Date;
  };
}

export interface SharedAuthor extends Struct.ComponentSchema {
  collectionName: 'components_shared_authors';
  info: {
    displayName: 'author';
  };
  attributes: {
    createdAtTime: Schema.Attribute.DateTime;
    createdByPerson: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.active-period': SharedActivePeriod;
      'shared.author': SharedAuthor;
    }
  }
}
