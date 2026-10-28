import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Filter, Search, ShoppingBag, Sparkles } from 'lucide-react';

import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../src/components/Card';
import { Checkbox } from '../../src/components/Checkbox';
import { Container } from '../../src/components/Container';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../src/components/Drawer';
import { Grid } from '../../src/components/Grid';
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContainer,
  NavbarItem,
  NavbarLink,
  NavbarMenu,
  NavbarNav,
  NavbarToggle,
} from '../../src/components/Navbar';
import { PageHeader } from '../../src/components/PageHeader';
import { SkipLink } from '../../src/components/SkipLink';
import { Slider } from '../../src/components/Slider';
import { Stack } from '../../src/components/Stack';
import { TemplateFooter } from './shared';

const products = [
  { name: 'Field notebook', category: 'Paper', price: '$18', badge: 'New', tone: 'bg-muted' },
  { name: 'Studio mug', category: 'Kitchen', price: '$24', badge: 'Bestseller', tone: 'bg-accent' },
  { name: 'Everyday tote', category: 'Bags', price: '$42', tone: 'bg-secondary' },
  { name: 'Desk lamp', category: 'Lighting', price: '$96', badge: 'New', tone: 'bg-muted' },
  { name: 'Linen apron', category: 'Kitchen', price: '$38', tone: 'bg-accent' },
  { name: 'Travel tumbler', category: 'Kitchen', price: '$32', tone: 'bg-secondary' },
  { name: 'Wool throw', category: 'Home', price: '$120', badge: 'Limited', tone: 'bg-muted' },
  { name: 'Pocket journal', category: 'Paper', price: '$14', tone: 'bg-accent' },
];

function FilterPanel({ idPrefix }: { idPrefix: string }) {
  return (
    <Stack gap="xl">
      <fieldset>
        <legend className="text-sm font-semibold">Category</legend>
        <div className="mt-3 space-y-3">
          {['Paper', 'Kitchen', 'Bags', 'Lighting', 'Home'].map(category => (
            <Checkbox
              key={category}
              id={`${idPrefix}-${category.toLowerCase()}`}
              label={category}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold">Price</legend>
        <div className="mt-5">
          <Slider
            id={`${idPrefix}-price`}
            label="Maximum price"
            defaultValue={[120]}
            min={10}
            max={200}
            step={5}
            showValue
            formatValue={value => `$${value}`}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold">Availability</legend>
        <div className="mt-3 space-y-3">
          <Checkbox id={`${idPrefix}-stock`} label="In stock only" defaultChecked />
          <Checkbox id={`${idPrefix}-sale`} label="On sale" />
        </div>
      </fieldset>
    </Stack>
  );
}

function EcommercePage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SkipLink />
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>
            <a href="#main" className="inline-flex min-h-11 items-center gap-2 rounded-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              Northstar Goods
            </a>
          </NavbarBrand>
          <NavbarNav className="hidden md:flex">
            <NavbarItem>
              <NavbarLink href="#main" isActive>
                Shop
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#collections">Collections</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#journal">Journal</NavbarLink>
            </NavbarItem>
          </NavbarNav>
          <NavbarActions>
            <Button variant="ghost" size="icon" aria-label="Search products">
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart, 2 items" className="relative">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              <span
                className="absolute -end-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                2
              </span>
            </Button>
            <NavbarToggle
              isOpen={menuOpen}
              onClick={() => setMenuOpen(value => !value)}
              controls="shop-mobile-nav"
            />
          </NavbarActions>
        </NavbarContainer>
      </Navbar>
      <NavbarMenu id="shop-mobile-nav" isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <NavbarNav mobile>
          {['Shop', 'Collections', 'Journal'].map((item, index) => (
            <NavbarItem key={item}>
              <NavbarLink
                href={index === 0 ? '#main' : `#${item.toLowerCase()}`}
                isActive={index === 0}
                onClick={() => setMenuOpen(false)}
                className="min-h-11 w-full"
              >
                {item}
              </NavbarLink>
            </NavbarItem>
          ))}
        </NavbarNav>
      </NavbarMenu>

      <main id="main">
        <Container size="wide" padding="lg" className="py-6 sm:py-8">
          <PageHeader
            title="New arrivals"
            description="Everyday objects made with durable materials and a quiet point of view."
            breadcrumb={
              <span>
                Shop <span aria-hidden="true">/</span> New arrivals
              </span>
            }
            actions={
              <>
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  <Filter className="h-4 w-4" aria-hidden="true" />
                  Filters
                </Button>
                <Button variant="outline">Sort: Newest</Button>
              </>
            }
          />

          <Grid columns={{ base: 1, lg: 12 }} gap="2xl" className="pt-8">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-4 text-card-foreground">
                <h2 className="text-sm font-semibold">Filter products</h2>
                <div className="mt-5">
                  <FilterPanel idPrefix="desktop" />
                </div>
                <Button variant="outline" fullWidth className="mt-6">
                  Clear filters
                </Button>
              </div>
            </aside>

            <section aria-labelledby="products-heading" className="min-w-0 lg:col-span-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="products-heading" className="text-lg font-semibold tracking-tight">
                  All products
                </h2>
                <p className="text-sm text-muted-foreground">48 results</p>
              </div>

              <Grid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap="lg" className="mt-5">
                {products.map(product => (
                  <Card key={product.name} className="flex min-w-0 flex-col">
                    <div
                      aria-hidden="true"
                      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-t-lg border-b border-border ${product.tone}`}
                    >
                      <div className="h-16 w-16 rounded-2xl border-2 border-foreground/10 bg-background/60" />
                      <div className="absolute bottom-3 end-3 h-8 w-8 rounded-full border border-foreground/10 bg-background/50" />
                    </div>
                    <CardHeader className="gap-1 p-4">
                      {product.badge && (
                        <Badge variant={product.badge === 'Limited' ? 'warning' : 'secondary'}>
                          {product.badge}
                        </Badge>
                      )}
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </CardHeader>
                    <CardContent className="mt-auto flex items-center justify-between p-4 pt-0">
                      <span className="font-semibold">{product.price}</span>
                      <Button variant="ghost" size="sm">
                        Add to cart
                      </Button>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" fullWidth>
                        View details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </Grid>
            </section>
          </Grid>
        </Container>
      </main>

      <TemplateFooter />

      <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DrawerContent
          direction="bottom"
          aria-describedby={undefined}
          className="max-h-[85dvh] p-0 lg:hidden"
        >
          <DrawerHeader>
            <DrawerTitle>Filter products</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <FilterPanel idPrefix="mobile" />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setFiltersOpen(false)}>
              Clear
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Apply filters</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const meta: Meta<typeof EcommercePage> = {
  title: 'Templates/Ecommerce',
  component: EcommercePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    docs: {
      description: {
        component:
          'Commerce catalog with top navigation, mobile menu, a sticky desktop filter sidebar, a bottom-sheet filter drawer on mobile and a product grid that grows from one to four columns. Product artwork is decorative so the card title and price remain the accessible content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EcommercePage>;

export const Default: Story = {};
