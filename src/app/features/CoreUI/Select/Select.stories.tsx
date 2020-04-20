import React from 'react';
import { action } from '@storybook/addon-actions';

import Select from './Select';
import '../../App/Root/Root.scss';

export default {
  component: Select,
  title: 'Select',
};

const multiOptions = [
  {
    key: "label1",
    label: "Label1"
  },
  {
    key: "label2",
    label: "Label2"
  },
  {
    key: "label3",
    label: "Label3"
  }
];

const singleOptions = [
  {
    key: "duplicate",
    label: "Duplicate"
  },
  {
    key: "delete",
    label: "Delete",
    isDelete: true,
  },
];

export const singleOption = () => (
  <Select options={singleOptions} placeholder='Label' onChange={action('changed')} />
);

export const singleOptionWithValue = () => (
  <Select options={singleOptions} placeholder='Label' value={singleOptions[0]} onChange={action('changed')} />
);

export const multiOption = () => (
  <Select options={multiOptions} isMultiple={true} placeholder='Label' onChange={action('changed')} />
);

export const multiOptionWithValue = () => (
  <Select options={multiOptions} isMultiple={true} value={[multiOptions[0]]}  placeholder='Label' onChange={action('changed')} />
);
