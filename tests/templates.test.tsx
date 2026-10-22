import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import '@testing-library/jest-dom/vitest';
import type { ComponentType } from 'react';

import authMeta from '../stories/templates/Auth.stories';
import crudMeta from '../stories/templates/Crud.stories';
import dashboardMeta from '../stories/templates/Dashboard.stories';
import docsMeta from '../stories/templates/Docs.stories';
import ecommerceMeta from '../stories/templates/Ecommerce.stories';
import listDetailMeta from '../stories/templates/ListDetail.stories';
import marketingMeta from '../stories/templates/Marketing.stories';
import settingsMeta from '../stories/templates/Settings.stories';
import statesMeta from '../stories/templates/States.stories';

const templates: Array<[string, ComponentType]> = [
  ['Dashboard', dashboardMeta.component as ComponentType],
  ['Auth', authMeta.component as ComponentType],
  ['Settings', settingsMeta.component as ComponentType],
  ['Marketing', marketingMeta.component as ComponentType],
  ['Docs', docsMeta.component as ComponentType],
  ['Ecommerce', ecommerceMeta.component as ComponentType],
  ['CRUD', crudMeta.component as ComponentType],
  ['ListDetail', listDetailMeta.component as ComponentType],
  ['States', statesMeta.component as ComponentType],
];

afterEach(cleanup);

describe('page templates', () => {
  it.each(templates)(
    '%s renders one main, one h1 and no axe violations',
    async (_name, Template) => {
      render(<Template />);

      expect(document.querySelectorAll('main')).toHaveLength(1);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

      const results = await axe.run(document.body);
      expect(results.violations).toHaveLength(0);
    }
  );
});
