import dayjs from 'dayjs';
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
}

function Button({
  children,
  isActive,
  setActive,
}: IButton): React.ReactElement {
  return (
    <button
      type="button"
      onClick={setActive}
      className={`p-4 border rounded transition duration-150 ease-in-out ${
        isActive
          ? 'bg-green-dark text-white'
          : 'bg-white hover:border-green-dark'
      }`}
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

function dayAsString(dayIndex: number) {
  const weekdays = new Array(7);
  weekdays[0] = 'Sunday';
  weekdays[1] = 'Monday';
  weekdays[2] = 'Tuesday';
  weekdays[3] = 'Wednesday';
  weekdays[4] = 'Thursday';
  weekdays[5] = 'Friday';
  weekdays[6] = 'Saturday';

  return weekdays[dayIndex];
}

function getDates(startDate, daysToAdd) {
  const aryDates = [];

  for (let i = 0; i <= daysToAdd; i += 1) {
    const currentDate = new Date();
    currentDate.setDate((startDate.getDate() as number) + i);
    aryDates.push(
      `${
        dayAsString(currentDate.getDay()) as number
      }, ${currentDate.getDate()} ${
        monthAsString(currentDate.getMonth()) as number
      } ${currentDate.getFullYear()}`
    );
  }

  return aryDates;
}

function monthAsString(monthIndex) {
  const month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  return month[monthIndex];
}

const startDate = new Date();

const aryDates = getDates(startDate, 7);

function nth(d) {
  if (d > 3 && d < 21) return `${d as string}th`;
  switch (d % 10) {
    case 1:
      return `${d as string}st`;

    case 2:
      return `${d as string}nd`;

    case 3:
      return `${d as string}rd`;

    default:
      return `${d as string}th`;
  }
}

function PickupDay({
  active,
  setActive,
  property,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Pickup Day">
      {aryDates.map(
        (date) =>
          !date.includes('Sat') &&
          !date.includes('Sun') && (
            <Button
              key={date}
              isActive={active === date}
              setActive={() =>
                setActive((prevState) => ({ ...prevState, [property]: date }))
              }
            >
              <h3 className="font-bold">{dayjs(date).format('dddd')}</h3>
              <p>
                {nth(dayjs(date).format('D'))} {dayjs(date).format('MMMM')}
              </p>
            </Button>
          )
      )}
    </Section>
  );
}

export { Delivery };
