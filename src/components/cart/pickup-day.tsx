import { useCartContext } from '@lib/cart-context';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import * as React from 'react';

import siteSettings from '../../data/site-settings.json';
import { Button } from './button';
import { Section } from './section';

function PickupDay(): React.ReactElement {
  const { state } = useCartContext();

  if (
    state.deliveryMethod === '' ||
    (state.deliveryMethod === 'Delivery' && state.deliveryZone === '') ||
    state.deliveryZone === 'Lord Howe Island'
  ) {
    return null;
  }

  return (
    <Section heading={`${state.deliveryMethod} Day`}>
      {Array.from({ length: 7 })
        .fill('')
        .map((_, index) => (
          <Day
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
          />
        ))}
    </Section>
  );
}

dayjs.extend(advancedFormat);
interface IDay {
  index: number;
}

function isDayDisabled(location, dayOfWeek, date) {
  const index = siteSettings.deliverySchedule.deliveryLocations.findIndex(
    (e) => e.location === location
  );

  // Lord Howe Island
  if (index === -1) {
    return siteSettings.deliverySchedule.datesClosed.dates.includes(date);
  }

  if (
    siteSettings.deliverySchedule.deliveryLocations[
      index
    ].deliveryDays.findIndex((e) => e.day === dayOfWeek) !== -1
  ) {
    return siteSettings.deliverySchedule.datesClosed.dates.includes(date);
  }
  return true;
}

function Day({ index }: IDay) {
  const { state, setState } = useCartContext();

  const { deliveryZone } = state;

  const isAfterTen = dayjs().isAfter(dayjs().hour(10));

  const date = dayjs()
    .add(index + 1, 'day')
    .format('YYYY-MM-DD');
  const dayOfWeek = dayjs(date).format('dddd');
  const nextDayIndex = dayjs().day() + 1;
  const nextDay = dayjs().day(nextDayIndex).format('dddd');

  const isWeekend = dayOfWeek.includes('Sat') || dayOfWeek.includes('Sun');

  const IS_DISABLED = React.useMemo(
    () => ({
      'Port Macquarie': isDayDisabled('Port Macquarie', dayOfWeek, date),
      Wauchope: isDayDisabled('Wauchope', dayOfWeek, date),
      Laurieton: isDayDisabled('Laurieton', dayOfWeek, date),
      Kempsey: isDayDisabled('Kempsey', dayOfWeek, date),
      'Lord Howe Island': isDayDisabled('Lord Howe Island', dayOfWeek, date),
    }),
    [date, dayOfWeek]
  );

  const propertyName = 'deliveryDate';

  const isActive = state[propertyName] === date;

  // If the user goes back and changes the delivery zone after selecting a delivery day
  // and that day is not allowed for the newly selected delivery zone, reset the delivery day
  React.useEffect(() => {
    if (IS_DISABLED[deliveryZone]) {
      setState((prevState) => ({
        ...prevState,
        [propertyName]: '',
      }));
    }
  }, [IS_DISABLED, deliveryZone, setState]);

  // Don't load options for disabled days
  if (IS_DISABLED[deliveryZone]) {
    return null;
  }

  // Don't load weekends
  if (isWeekend) {
    return null;
  }

  // Don't load next day if time is pass 10am
  if (isAfterTen && nextDay === dayOfWeek) {
    return null;
  }

  // Get date and format with ordinals
  const dayWithOrdinal = dayjs(date).format('Do');

  // Get month and format
  const month = dayjs(date).format('MMMM');

  // Function to set delivery day
  const setActive = () =>
    setState((prevState) => ({
      ...prevState,
      [propertyName]: date,
    }));

  return (
    <Button
      key={date}
      isDisabled={IS_DISABLED[deliveryZone]}
      isActive={isActive}
      setActive={setActive}
    >
      <h3 className="font-bold">{dayOfWeek}</h3>
      <p>
        {dayWithOrdinal} {month}
      </p>
    </Button>
  );
}

export { PickupDay };
