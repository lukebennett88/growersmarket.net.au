import { BagIcon, DeliveryIcon } from '@components/vectors';
import { TSetState, useCartContext } from '@lib/cart-provider';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Link from 'next/link';
import * as React from 'react';

function Delivery(): React.ReactElement {
  const nextStep = () => setState((prevState) => ({ ...prevState, step: 4 }));

  const { state, setState } = useCartContext();

  return (
    <div className="grid gap-8 mt-8">
      <DeliveryOrPickup
        active={state.deliveryMethod}
        setActive={setState}
        property="deliveryMethod"
      />
      <DeliveryZone
        active={state.deliveryZone}
        setActive={setState}
        property="deliveryZone"
      />
      <PickupDay
        active={state.deliveryDate}
        setActive={setState}
        deliveryZone={state.deliveryZone}
        property="deliveryDate"
      />

      <PickupTime
        active={state.pickupTime}
        setActive={setState}
        property="pickupTime"
      />

      <div className="flex justify-between mt-16">
        <Link href="/">
          <a className="inline-flex items-center space-x-2 cta text-green-dark bg-yellow">
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 -ml-3"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Continue Shopping
          </a>
        </Link>

        {((state.deliveryMethod === 'Pickup' && state.pickupTime !== '') ||
          state.deliveryMethod === 'Delivery') &&
          // eslint-disable-next-line sonarjs/no-duplicate-string
          (state.deliveryZone === 'Port Macquarie' ||
            state.deliveryZone === 'Wauchope' ||
            state.deliveryZone === 'Laurieton' ||
            state.deliveryZone === 'Kempsey' ||
            // eslint-disable-next-line sonarjs/no-duplicate-string
            state.deliveryZone === 'Lord Howe Island') &&
          // Would be good if we can check if the pickup day is valid here
          state.deliveryDate !== '' && (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center space-x-2 cta text-green-dark bg-yellow"
            >
              Next Step
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 -mr-3"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
      </div>
    </div>
  );
}

interface IButton {
  children: React.ReactNode;
  isActive: boolean;
  setActive: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isDisabled?: boolean;
}

function Button({
  children,
  isActive,
  setActive,
  isDisabled,
}: IButton): React.ReactElement {
  return (
    <button
      type="button"
      onClick={setActive}
      disabled={isDisabled}
      className={`p-4 border rounded transition duration-150 ease-in-out${
        isActive
          ? ' bg-green-dark text-white'
          : ' bg-white hover:border-green-dark'
      }${isDisabled ? ' opacity-75' : ''}`}
    >
      {children}
    </button>
  );
}

interface ISection {
  heading: string;
  children: React.ReactNode;
  colsClass?: string;
}

function Section({
  heading,
  children,
  colsClass = 'grid-cols-1',
}: ISection): React.ReactElement {
  return (
    <div className="bg-gray-light">
      <h2 className="py-4 font-bold text-center">{heading}</h2>
      <div
        className={`grid px-8 py-4 text-center border-t gap-y-4 gap-x-8 ${colsClass}`}
      >
        {children}
      </div>
    </div>
  );
}

interface ISectionWrapper {
  active: string;
  setActive: TSetState;
  property: string;
  // eslint-disable-next-line react/no-unused-prop-types
  deliveryZone?: string;
}

function DeliveryOrPickup({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Delivery or Pick Up?" colsClass="grid-cols-2">
      <Button
        isActive={active === 'Pickup'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'Pickup' }))
        }
      >
        <BagIcon className="h-12 mx-auto" />
        <h3 className="font-bold">Pick Up</h3>
        <p>($15 minimum spend)</p>
      </Button>
      <Button
        isActive={active === 'Delivery'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'Delivery' }))
        }
      >
        <DeliveryIcon className="h-12 mx-auto" />
        <h3 className="font-bold">Delivery</h3>
        <p>($40 minimum spend)</p>
      </Button>
    </Section>
  );
}

function DeliveryZone({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  const { state } = useCartContext();

  if (
    !(state.deliveryMethod === 'Pickup' || state.deliveryMethod === 'Delivery')
  ) {
    return null;
  }

  return (
    <Section heading="Your Address">
      <Button
        isActive={active === 'Port Macquarie'}
        setActive={() =>
          setActive((prevState) => ({
            ...prevState,
            [property]: 'Port Macquarie',
          }))
        }
      >
        <h3 className="font-bold">Port Macquarie</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'Wauchope'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'Wauchope' }))
        }
      >
        <h3 className="font-bold">Wauchope</h3>
        <p>Delivered on: Monday, Wednesday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'Laurieton'}
        setActive={() =>
          setActive((prevState) => ({
            ...prevState,
            [property]: 'Laurieton',
          }))
        }
      >
        <h3 className="font-bold">
          Laurieton / Lake Cathie / North Haven / Bonny Hills
        </h3>
        <p>Delivered on: Tuesday and Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'Kempsey'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'Kempsey' }))
        }
      >
        <h3 className="font-bold">Kempsey/Crescent Head</h3>
        <p>Delivered on: Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      {/* // TODO: Check if Lord Howe Island should be listed here */}
      <Button
        isActive={active === 'Lord Howe Island'}
        setActive={() =>
          setActive((prevState) => ({
            ...prevState,
            [property]: 'Lord Howe Island',
          }))
        }
      >
        <h3 className="font-bold">Lord Howe Island</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
    </Section>
  );
}

dayjs.extend(advancedFormat);

function PickupDay({
  active,
  setActive,
  property,
  deliveryZone,
}: ISectionWrapper): React.ReactElement {
  const { state } = useCartContext();

  if (!(state.deliveryMethod !== '' && state.deliveryZone !== '')) {
    return null;
  }

  return (
    <Section heading="Pickup Day">
      {Array.from({ length: 7 })
        .fill('')
        .map((_, index) => (
          <Day
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            active={active}
            setActive={setActive}
            property={property}
            deliveryZone={deliveryZone}
          />
        ))}
    </Section>
  );
}

interface IDay {
  active: string;
  deliveryZone: string;
  index: number;
  property: string;
  setActive: TSetState;
}

function Day({ active, deliveryZone, index, property, setActive }: IDay) {
  const date = dayjs()
    .add(index + 1, 'day')
    .toISOString();

  const dateRef = React.useRef(date);

  const dayOfWeek = dayjs(dateRef.current).format('dddd');

  const isWeekend = dayOfWeek.includes('Sat') || dayOfWeek.includes('Sun');

  if (isWeekend) {
    return null;
  }

  const dayWithOrdinal = dayjs(dateRef.current).format('Do');

  const month = dayjs(dateRef.current).format('MMMM');

  const IS_DISABLED = {
    'Port Macquarie': false,
    Wauchope: dayOfWeek === 'Tuesday' || dayOfWeek === 'Thursday',
    Laurieton:
      dayOfWeek === 'Monday' ||
      dayOfWeek === 'Wednesday' ||
      dayOfWeek === 'Thursday',
    Kempsey:
      dayOfWeek === 'Monday' ||
      dayOfWeek === 'Tuesday' ||
      dayOfWeek === 'Wednesday' ||
      dayOfWeek === 'Thursday',
    'Lord Howe Island': false,
  };

  return (
    <Button
      key={dateRef.current}
      isDisabled={IS_DISABLED[deliveryZone]}
      isActive={active === dateRef.current}
      setActive={() =>
        setActive((prevState) => ({
          ...prevState,
          [property]: dateRef.current,
        }))
      }
    >
      <h3 className="font-bold">{dayOfWeek}</h3>
      <p>
        {dayWithOrdinal} {month}
      </p>
    </Button>
  );
}

function PickupTime({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  const { state } = useCartContext();
  if (
    !(
      state.deliveryMethod === 'Pickup' &&
      state.deliveryZone !== '' &&
      state.deliveryDate !== ''
    )
  )
    return null;

  return (
    <Section heading="Pickup Day">
      <Button
        isActive={active === '9am – 11am'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: '9am – 11am' }))
        }
      >
        <h3 className="font-bold">9am – 11am</h3>
      </Button>
      <Button
        isActive={active === '11am – 2pm'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: '11am – 2pm' }))
        }
      >
        <h3 className="font-bold">11am – 2pm</h3>
      </Button>
      <Button
        isActive={active === '2pm – 6pm'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: '2pm – 6pm' }))
        }
      >
        <h3 className="font-bold">2pm – 6pm</h3>
      </Button>
    </Section>
  );
}

export { Delivery };
