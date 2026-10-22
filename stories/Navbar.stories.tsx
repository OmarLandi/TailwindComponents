import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarToggle,
  NavbarMenu,
} from '../src/components/Navbar';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A responsive navigation bar component with mobile menu support.

## Basic usage

\`\`\`tsx
import { Navbar, NavbarContainer, NavbarBrand, NavbarNav, NavbarItem, NavbarLink, NavbarActions, NavbarToggle, NavbarMenu } from 'libreriacomponentes';
import { Button } from 'libreriacomponentes';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar>
      <NavbarContainer>
        <NavbarBrand>My App</NavbarBrand>
        <NavbarNav className="hidden md:flex">
          <NavbarItem><NavbarLink href="#" isActive>Home</NavbarLink></NavbarItem>
          <NavbarItem><NavbarLink href="#">About</NavbarLink></NavbarItem>
        </NavbarNav>
        <NavbarActions>
          <NavbarToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} controls="mobile-menu" />
        </NavbarActions>
      </NavbarContainer>
      <NavbarMenu id="mobile-menu" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NavbarNav mobile>
          <NavbarItem><NavbarLink href="#" isActive>Home</NavbarLink></NavbarItem>
          <NavbarItem><NavbarLink href="#">About</NavbarLink></NavbarItem>
        </NavbarNav>
      </NavbarMenu>
    </Navbar>
  );
}
\`\`\`

## Variants

\`\`\`tsx
<Navbar variant="default">Standard navbar</Navbar>
<Navbar variant="floating">Floating card-style navbar</Navbar>
<Navbar variant="transparent">Transparent background</Navbar>
\`\`\``,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'floating', 'transparent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {
  args: {
    variant: 'default',
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Navbar variant={args.variant}>
        <NavbarContainer>
          <NavbarBrand>MyApp</NavbarBrand>
          <NavbarNav className="hidden md:flex">
            <NavbarItem>
              <NavbarLink href="#" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Services</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Contact</NavbarLink>
            </NavbarItem>
          </NavbarNav>
          <NavbarActions>
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
            <NavbarToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              controls="mobile-menu"
            />
          </NavbarActions>
        </NavbarContainer>
        <NavbarMenu id="mobile-menu" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <NavbarNav mobile>
            <NavbarItem>
              <NavbarLink href="#" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Services</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Contact</NavbarLink>
            </NavbarItem>
          </NavbarNav>
        </NavbarMenu>
      </Navbar>
    );
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>MyApp</NavbarBrand>
          <NavbarActions>
            <NavbarToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              controls="mobile-menu-story"
            />
          </NavbarActions>
        </NavbarContainer>
        <NavbarMenu id="mobile-menu-story" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <NavbarNav mobile>
            <NavbarItem>
              <NavbarLink href="#" isActive>
                Home
              </NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">About</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Services</NavbarLink>
            </NavbarItem>
            <NavbarItem>
              <NavbarLink href="#">Contact</NavbarLink>
            </NavbarItem>
          </NavbarNav>
        </NavbarMenu>
      </Navbar>
    );
  },
};
