export * from '../constants/templatesData';
import {
  TEMPLATES_DATA,
  PhotoboothTemplate,
  getTemplateById as getById,
} from '../constants/templatesData';
import {
  getActiveBuilderConfig,
  builderConfigToPhotoboothTemplate,
} from './customBuilder';

// Re-export TEMPLATES as alias to TEMPLATES_DATA for backwards compatibility
export const TEMPLATES: PhotoboothTemplate[] = TEMPLATES_DATA;

export function getTemplateById(id: string): PhotoboothTemplate {
  if (id === 'custom-builder') {
    return builderConfigToPhotoboothTemplate(getActiveBuilderConfig());
  }
  return getById(id);
}
