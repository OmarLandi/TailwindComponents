import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../src/components/Carousel';
import { Card, CardContent } from '../src/components/Card';

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
  parameters: {
    docs: {
      description: {
        component: `A carousel component for cycling through items horizontally or vertically.

## Basic usage (horizontal)

\`\`\`tsx
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from 'libreriacomponentes';

<Carousel className="w-full max-w-sm mx-auto">
  <CarouselContent>
    {[1, 2, 3, 4, 5].map((id) => (
      <CarouselItem key={id}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{id}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
\`\`\`

## Vertical orientation

\`\`\`tsx
<Carousel orientation="vertical" className="w-full max-w-xs mx-auto h-[300px]">
  <CarouselContent>
    {['Item A', 'Item B', 'Item C'].map((title, i) => (
      <CarouselItem key={i}>
        <div className="p-1">
          <Card>
            <CardContent className="flex items-center justify-center p-6">
              <span className="text-xl font-semibold">{title}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => {
    const items = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
      <Carousel {...args} className="w-full max-w-sm mx-auto">
        <CarouselContent>
          {items.map(id => (
            <CarouselItem key={id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{id}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};
