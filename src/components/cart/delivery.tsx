import Link from 'next/link';
import * as React from 'react';

function Delivery({ setStep }) {
  const nextStep = () => setStep(4);
  const [deliveryMethod, setDeliveryMethod] = React.useState('');
  const [deliveryArea, setDeliveryArea] = React.useState('');
  const [deliveryDate, setDeliveryDate] = React.useState('');
  return (
    <div className="grid gap-8">
      <DeliveryOrPickup active={deliveryMethod} setActive={setDeliveryMethod} />
      <YourAddress active={deliveryArea} setActive={setDeliveryArea} />
      {deliveryMethod === 'PICKUP' &&
        (deliveryArea === 'PORT_MACQUARIE' ||
          deliveryArea === 'WAUCHOPE' ||
          deliveryArea === 'LAURIETON' ||
          deliveryArea === 'KEMPSEY' ||
          deliveryArea === 'LORD_HOWE_ISLAND') && (
          <PickupDay active={deliveryDate} setActive={setDeliveryDate} />
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

        {((deliveryMethod === 'PICKUP' &&
          deliveryArea !== '' &&
          deliveryDate !== '') ||
          (deliveryMethod === 'DELIVERY' && deliveryArea !== '')) && (
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
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

function DeliveryOrPickup({
  active,
  setActive,
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Delivery or Pick Up?" colsClass="grid-cols-2">
      <Button
        isActive={active === 'PICKUP'}
        setActive={() => setActive('PICKUP')}
      >
        <h3 className="font-bold">Pick Up</h3>
        <p>($15 minimum spend)</p>
      </Button>
      <Button
        isActive={active === 'DELIVERY'}
        setActive={() => setActive('DELIVERY')}
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
}: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Your Address">
      <Button
        isActive={active === 'PORT_MACQUARIE'}
        setActive={() => setActive('PORT_MACQUARIE')}
      >
        <h3 className="font-bold">Port Macquarie</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'WAUCHOPE'}
        setActive={() => setActive('WAUCHOPE')}
      >
        <h3 className="font-bold">Wauchope</h3>
        <p>Delivered on: Monday, Wednesday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={active === 'LAURIETON'}
        setActive={() => setActive('LAURIETON')}
      >
        <h3 className="font-bold">
          Laurieton / Lake Cathie / North Haven / Bonny Hills
        </h3>
        <p>Delivered on: Tuesday and Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        setActive={() => setActive('KEMPSEY')}
        isActive={active === 'KEMPSEY'}
      >
        <h3 className="font-bold">Kempsey/Crescent Head</h3>
        <p>Delivered on: Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      {/* // TODO: Check if Lord Howe Island should be listed here */}
      <Button
        setActive={() => setActive('LORD_HOWE_ISLAND')}
        isActive={active === 'LORD_HOWE_ISLAND'}
      >
        <h3 className="font-bold">Lord Howe Island</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
    </Section>
  );
}

function PickupDay({ active, setActive }: ISectionWrapper): React.ReactElement {
  return (
    <Section heading="Pickup Day">
      <Button
        setActive={() => setActive('MONDAY')}
        isActive={active === 'MONDAY'}
      >
        <h3 className="font-bold">Monday</h3>
        <p>15th February</p>
      </Button>
      <Button
        setActive={() => setActive('TUESDAY')}
        isActive={active === 'TUESDAY'}
      >
        <h3 className="font-bold">Tuesday</h3>
        <p>16th February</p>
      </Button>
      <Button
        setActive={() => setActive('WEDNESDAY')}
        isActive={active === 'WEDNESDAY'}
      >
        <h3 className="font-bold">Wednesday</h3>
        <p>17th February</p>
      </Button>
      <Button
        setActive={() => setActive('THURSDAY')}
        isActive={active === 'THURSDAY'}
      >
        <h3 className="font-bold">Thursday</h3>
        <p>18th February</p>
      </Button>
      <Button
        setActive={() => setActive('FRIDAY')}
        isActive={active === 'FRIDAY'}
      >
        <h3 className="font-bold">Friday</h3>
        <p>19th February</p>
      </Button>
    </Section>
  );
}

export { Delivery };
