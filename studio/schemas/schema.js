/* eslint-disable import/no-unresolved */
// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

// We import object and document schemas
import address from './address';
import blockContent from './blockContent';
import bottomCta from './bottomCta';
import carousel from './carousel';
import closedDates from './closedDates';
import cta from './cta';
import deliveryDays from './deliveryDays';
import deliveryLocation from './deliveryLocation';
import deliverySchedule from './deliverySchedule';
import externalPage from './externalPage';
import footerNavSection from './footerNavSection';
import googleMaps from './googleMaps';
import imageWithAltText from './imageWithAltText';
import keyValuePair from './keyValuePair';
import link from './link';
import navigation from './navigation';
import navItem from './navItem';
import openHours from './openHours';
import page from './page';
import richText from './richText';
import route from './route';
import sanityPage from './sanityPage';
import siteSettings from './siteSettings';
import slide from './slide';
import socialLinks from './socialLinks';
import textWithImage from './textWithImage';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    address,
    blockContent,
    bottomCta,
    carousel,
    closedDates,
    cta,
    deliveryDays,
    deliveryLocation,
    deliverySchedule,
    externalPage,
    footerNavSection,
    googleMaps,
    imageWithAltText,
    keyValuePair,
    link,
    navItem,
    openHours,
    page,
    richText,
    route,
    sanityPage,
    slide,
    socialLinks,
    textWithImage,
    // Site metadata
    navigation,
    siteSettings,
  ]),
});
