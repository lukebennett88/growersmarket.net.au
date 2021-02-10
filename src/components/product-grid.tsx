import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

enum Colour {
  GRAY,
  WHITE,
}

interface IProductGrid {
  heading?: string;
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  colour?: Colour;
}

const COLUMNS_MAP = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

const COLOUR_MAP = {
  [Colour.GRAY]: 'bg-gray-light',
  [Colour.WHITE]: 'bg-white',
};

function ProductGrid({
  heading,
  children,
  columns = 4,
  colour = Colour.WHITE,
}: IProductGrid) {
  return (
    <article
      className={`${columns === 4 ? 'lg:col-span-2 ' : ''}${
        COLOUR_MAP[colour]
      }`}
    >
      <Container>
        <HorizontalPadding>
          <div className={`${columns !== 3 ? 'py-16 ' : ''}font-bold`}>
            {heading && <h2 className="text-2xl">{heading}</h2>}
            <ul
              className={`grid gap-12 mt-8 sm:grid-cols-2 ${COLUMNS_MAP[columns]}`}
            >
              {children}
            </ul>
          </div>
        </HorizontalPadding>
      </Container>
    </article>
  );
}

ProductGrid.colour = Colour;

export { ProductGrid };
