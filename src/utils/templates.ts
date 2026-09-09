export * from '../constants/templatesData';
import {
  TEMPLATES_DATA,
  PhotoboothTemplate,
  getTemplateById as getById,
} from '../constants/templatesData';

// Re-export TEMPLATES as alias to TEMPLATES_DATA for backwards compatibility
export const TEMPLATES: PhotoboothTemplate[] = TEMPLATES_DATA;

export const getTemplateById = getById;
