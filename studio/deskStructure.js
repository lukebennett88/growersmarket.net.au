import S from '@sanity/desk-tool/structure-builder';
import { BsGearFill, BsLink45Deg } from 'react-icons/bs';

export default () =>
  S.list()
    .title('Content')
    .items([
      // Any spread in any pages we don't manually add here
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'navigation' &&
          item.getId() !== 'siteSettings' &&
          item.getId() !== 'carousel'
      ),
      // Site settings
      // Site navigation copy
      S.listItem()
        .title('Navigation')
        .icon(BsLink45Deg)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      // Site settings
      S.listItem()
        .title('Settings')
        .icon(BsGearFill)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      // Carousel
      S.listItem()
        .title('Carousel Slider')
        .icon(BsGearFill)
        .child(S.document().schemaType('carousel').documentId('carousel')),
    ]);
