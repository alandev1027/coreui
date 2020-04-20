import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Select from './Select';
const dummyText = 'Label';

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

describe('Select', () => {
  afterEach(cleanup);

  it('display text', () => {
    const { getByText } = render(<Select placeholder={dummyText} />);
    const element = getByText(dummyText);
    expect(element).toBeInTheDocument();
  });

  it('displays with single value', () => {
    const { getByText } = render(
      <Select placeholder={dummyText} options={singleOptions} value={singleOptions[0]}/>,
    );
    const element = getByText(singleOptions[0].label);
    expect(element).toBeInTheDocument();
  });

  it('displays with multi value', () => {
    const { getByText } = render(
      <Select placeholder={dummyText} options={multiOptions} value={[multiOptions[0]]} isMultiple={true}/>,
    );
    const element = getByText(multiOptions[0].label);
    expect(element).toBeInTheDocument();
  });
});
