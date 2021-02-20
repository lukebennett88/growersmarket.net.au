import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Link from 'next/link';
import * as React from 'react';

type TState = {
  step: number;
  deliveryMethod: string;
  deliveryArea: string;
  deliveryDate: string;
};

type TSetState = React.Dispatch<React.SetStateAction<TState>>;

interface IDelivery {
  state: TState;
  setState: TSetState;
}

function Delivery({ state, setState }: IDelivery): React.ReactElement {
  const nextStep = () => setState((prevState) => ({ ...prevState, step: 4 }));

  return (
    <div className="grid gap-8">
      <DeliveryOrPickup
        active={state.deliveryMethod}
        setActive={setState}
        property="deliveryMethod"
      />
      <YourAddress
        active={state.deliveryArea}
        setActive={setState}
        property="deliveryArea"
      />
      {(state.deliveryMethod === 'PICKUP' ||
        state.deliveryMethod === 'DELIVERY') &&
        (state.deliveryArea === 'PORT_MACQUARIE' ||
          state.deliveryArea === 'WAUCHOPE' ||
          state.deliveryArea === 'LAURIETON' ||
          state.deliveryArea === 'KEMPSEY' ||
          state.deliveryArea === 'LORD_HOWE_ISLAND') && (
          <PickupDay
            active={state.deliveryDate}
            setActive={setState}
            deliveryArea={state.deliveryArea}
            property="deliveryDate"
          />
        )}
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

        {((state.deliveryMethod === 'PICKUP' &&
          state.deliveryArea !== '' &&
          state.deliveryDate !== '') ||
          (state.deliveryMethod === 'DELIVERY' &&
            state.deliveryArea !== '')) && (
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
      }${isDisabled ? ' opacity-50' : ''}`}
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
  deliveryArea?: string;
}

function DeliveryOrPickup({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Delivery or Pick Up?" colsClass="grid-cols-2">
      <Button
        isActive={active === 'PICKUP'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'PICKUP' }))
        }
      >
        <h3 className="font-bold">Pick Up</h3>
        <p>($15 minimum spend)</p>
      </Button>
      <Button
        isActive={active === 'DELIVERY'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'DELIVERY' }))
        }
      >
        <h3 className="font-bold">Delivery</h3>
        <p>($40 minimum spend)</p>
      </Button>
    </Section>
  );
}

function YourAddress({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Your Address">
      <Button
        isActive={active === 'PORT_MACQUARIE'}
        setActive={() =>
          setActive((prevState) => ({
            ...prevState,
            [property]: 'PORT_MACQUARIE',
          }))
        }
      >
        <h3 className="font-bold">Port Macquarie</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'WAUCHOPE'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'WAUCHOPE' }))
        }
      >
        <h3 className="font-bold">Wauchope</h3>
        <p>Delivered on: Monday, Wednesday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'LAURIETON'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'LAURIETON' }))
        }
      >
        <h3 className="font-bold">
          Laurieton / Lake Cathie / North Haven / Bonny Hills
        </h3>
        <p>Delivered on: Tuesday and Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'KEMPSEY'}
        setActive={() =>
          setActive((prevState) => ({ ...prevState, [property]: 'KEMPSEY' }))
        }
      >
        <h3 className="font-bold">Kempsey/Crescent Head</h3>
        <p>Delivered on: Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      {/* // TODO: Check if Lord Howe Island should be listed here */}
      <Button
        isActive={active === 'LORD_HOWE_ISLAND'}
        setActive={() =>
          setActive((prevState) => ({
            ...prevState,
            [property]: 'LORD_HOWE_ISLAND',
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

interface IDay {
  index: number;
  active: string;
  setActive: TSetState;
  property: string;
}

function Day({ index, active, setActive, property, deliveryArea }: IDay) {
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
    PORT_MACQUARIE: false,
    WAUCHOPE: dayOfWeek === 'Tuesday' || dayOfWeek === 'Thursday',
    LAURIETON:
      dayOfWeek === 'Monday' ||
      dayOfWeek === 'Wednesday' ||
      dayOfWeek === 'Thursday',
    KEMPSEY:
      dayOfWeek === 'Monday' ||
      dayOfWeek === 'Tuesday' ||
      dayOfWeek === 'Wednesday' ||
      dayOfWeek === 'Thursday',
    LORD_HOWE_ISLAND: false,
  };

  return (
    <Button
      key={dateRef.current}
      isDisabled={IS_DISABLED[deliveryArea]}
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

function PickupDay({
  active,
  setActive,
  property,
  deliveryArea,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Pickup Day">
      {Array.from({ length: 7 })
        .fill('')
        .map((_, i) => (
          <Day
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            index={i}
            active={active}
            setActive={setActive}
            property={property}
            deliveryArea={deliveryArea}
          />
        ))}
    </Section>
  );
}

export { Delivery };
