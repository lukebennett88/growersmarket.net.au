import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

enum Variant {
  GRAY,
  WHITE,
}

interface ProductGrid {
  heading: string;
  children: React.ReactNode;
  columns?: 2 | 4;
  variant?: Variant;
}

const COLUMNS_MAPS = {
  [2]: 'lg:grid-cols-2',
  [4]: 'lg:grid-cols-4',
};

const VARIANT_MAPS = {
  [Variant.GRAY]: HorizontalPadding.variant.GRAY,
  [Variant.WHITE]: HorizontalPadding.variant.WHITE,
};

function ProductGrid({
  heading,
  children,
  columns = 4,
  variant = Variant.WHITE,
}: ProductGrid) {
  return (
    <article className={columns === 4 ? 'lg:col-span-2' : null}>
      <Container>
        <HorizontalPadding variant={VARIANT_MAPS[variant]}>
          <div className="py-16 font-bold">
            <h2 className="text-2xl">{heading}</h2>
            <ul
              className={`grid gap-12 mt-8 sm:grid-cols-2 ${COLUMNS_MAPS[columns]}`}
            >
              {children}
            </ul>
          </div>
        </HorizontalPadding>
      </Container>
    </article>
  );
}

ProductGrid.variant = Variant;

export { ProductGrid };
