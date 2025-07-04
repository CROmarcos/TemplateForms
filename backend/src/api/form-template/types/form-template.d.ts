interface Period {
  validFrom?: Date | string;
  validTo?: Date | string;
}

export interface FormTemplateData {
  templateCode?: string;
  version?: number;
  isActive?: boolean;
  validFrom?: Date | string;
  validTo?: Date | string;
  period?: Period;
}