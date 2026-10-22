import type { Meta, StoryObj } from '@storybook/react';
import {
  Footer,
  FooterContainer,
  FooterRow,
  FooterColumn,
  FooterTitle,
  FooterLink,
  FooterBottom,
} from '../src/components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Data Display/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `## Basic usage

\`\`\`tsx
import { Footer, FooterContainer, FooterRow, FooterColumn, FooterTitle, FooterLink, FooterBottom } from 'libreriacomponentes';

<Footer>
  <FooterContainer>
    <FooterRow cols={4}>
      <FooterColumn>
        <FooterTitle>Product</FooterTitle>
        <FooterLink href="#">Features</FooterLink>
        <FooterLink href="#">Pricing</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>Company</FooterTitle>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Blog</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>Resources</FooterTitle>
        <FooterLink href="#">Contact</FooterLink>
        <FooterLink href="#">Support</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>Legal</FooterTitle>
        <FooterLink href="#">Privacy</FooterLink>
        <FooterLink href="#">Terms</FooterLink>
      </FooterColumn>
    </FooterRow>
    <FooterBottom>
      <span>&copy; 2024 MyCompany. All rights reserved.</span>
    </FooterBottom>
  </FooterContainer>
</Footer>
\`\`\`

## Variants

\`\`\`tsx
// Muted style
<Footer className="bg-muted text-muted-foreground border-t border-border">
  <FooterContainer>
    <FooterRow cols={3}>...</FooterRow>
    <FooterBottom>&copy; 2024 Company</FooterBottom>
  </FooterContainer>
</Footer>

// Minimal style
<Footer className="border-t border-border">
  <FooterContainer>
    <FooterBottom>
      <span className="text-muted-foreground">&copy; 2024 MyCompany. All rights reserved.</span>
    </FooterBottom>
  </FooterContainer>
</Footer>
\`\`\`
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Playground: Story = {
  render: () => (
    <Footer>
      <FooterContainer>
        <FooterRow cols={4}>
          <FooterColumn>
            <FooterTitle>Product</FooterTitle>
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Documentation</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Company</FooterTitle>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Resources</FooterTitle>
            <FooterLink href="#">Community</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
            <FooterLink href="#">Support</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Legal</FooterTitle>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
          </FooterColumn>
        </FooterRow>
        <FooterBottom>
          <span>&copy; 2024 MyCompany. All rights reserved.</span>
        </FooterBottom>
      </FooterContainer>
    </Footer>
  ),
};
