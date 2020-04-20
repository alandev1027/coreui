import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

export default {
  component: Checkbox,
  title: 'Checkbox',
};

export const normal = () => (
  <Checkbox onChange={action('changed')} />
);

export const checked = () => (
  <Checkbox value onChange={action('changed')} />
);

export const withLabel = () => (
  <Checkbox label='Checkbox' onChange={action('changed')} />
);

export const checkedWithLabel = () => (
  <Checkbox value label='Checkbox' onChange={action('changed')} />
);

export const disabledNormal = () => (
  <Checkbox disabled />
);

export const disabledChecked = () => (
  <Checkbox value disabled />
);

export const disabledNormalWithLabel = () => (
  <Checkbox label='Checkbox' disabled />
);

export const disabledCheckedWithLabel = () => (
  <Checkbox label='Checkbox' value disabled />
);
