import S from '@sanity/desk-tool/structure-builder';
import { BsGearFill, BsLink45Deg } from 'react-icons/bs';
import { IoMegaphoneOutline, IoIosNavigate } from 'react-icons/io5';

export default () =>
  S.list()
    .title('Content')
    .items([
      // Any spread in any pages we don't manually add here
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'navigation' &&
          item.getId() !== 'siteSettings' &&
          item.getId() !== 'carousel' &&
          item.getId() !== 'daysClosed'
      ),
      // CTA Carousel
      S.listItem()
        .title('Carousel Slider')
        .icon(IoMegaphoneOutline)
        .child(S.document().schemaType('carousel').documentId('carousel')),
      // Site navigation copy
      S.listItem()
        .title('Navigation')
        .icon(BsLink45Deg)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Days Closed')
        .icon(BsLink45Deg)
        .child(
          S.list()
            .title('Days Closed')
            .items([
              S.listItem()
                .title('Locations')
                .icon(IoIosNavigate)
                .schemaType('daysClosed')
                .child(
                  S.documentTypeList('daysClosed').title('Locations')
                ),
            ])
        ),
      // Site settings
      S.listItem()
        .title('Settings')
        .icon(BsGearFill)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
    ]);
