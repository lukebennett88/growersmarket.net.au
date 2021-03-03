import S from '@sanity/desk-tool/structure-builder';
import { BsGearFill, BsLink45Deg } from 'react-icons/bs';
import { HiOutlineTruck } from 'react-icons/hi';
import { IoMegaphoneOutline } from 'react-icons/io5';

export default () =>
  S.list()
    .title('Content')
    .items([
      // Any spread in any pages we don't manually add here
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'carousel' &&
          item.getId() !== 'bottomCta' &&
          item.getId() !== 'navigation' &&
          item.getId() !== 'siteSettings'
      ),
      // CTA Carousel
      S.listItem()
        .title('Carousel Slider')
        .icon(IoMegaphoneOutline)
        .child(S.document().schemaType('carousel').documentId('carousel')),
      // CTA At Delivery of Home Page
      S.listItem()
        .title('Delivery CTA')
        .icon(HiOutlineTruck)
        .child(S.document().schemaType('bottomCta').documentId('bottomCta')),
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
    ]);
