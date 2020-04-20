import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import '../../App/Root/Root.scss';
import FormInput from '../FormInput/FormInput';
import TwoColumnGrid from '../TwoColumnGrid/TwoColumnGrid';
import Label from '../Label/Label';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import Checkbox from '../Checkbox/Checkbox';
import Select from '../Select/Select';
import { OptionType } from '../Select/Select';

export default { title: 'Form' };

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

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  marketing: boolean;
  marketing2: boolean;
  weeklytips: boolean;
  newfeatures: boolean;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {

  const { register, handleSubmit, errors } = useForm();
  const mapSubmitHandler = useCallback((data) => onSubmit(data), [onSubmit]);
  const [singleSelectValue, setSingleSelectValue] = useState<OptionType>();
  const [multiSelectValue, setMultiSelectValue] = useState<OptionType[]>();

  return (
    <form onSubmit={handleSubmit(mapSubmitHandler)}>
      <TwoColumnGrid>
        <FormInput
          fillWidth
          label='Firstname *'
          name='firstname'
          ref={register({ required: true })}
          error={errors.firstname && 'First name is required.'}
        />
        <FormInput
          fillWidth
          label='Lastname *'
          name='lastname'
          ref={register({ required: true })}
          error={errors.lastname && 'Last name is required.'}
        />
        <Label title='Marketing 2'>
          <Toggle
            name='weeklytips'
            label='Send me weekly tips to help me improve the engagement on my store'
            ref={register({})}
          />
        </Label>
        <FormInput
          fillWidth
          label='Phone Number'
          name='phone'
          ref={register({})}
        />
        <FormInput
          fillWidth
          label='E-Mail *'
          name='email'
          type='email'
          ref={register({ required: true })}
          error={errors.email && 'E-Mail is required.'}
        />
        <Toggle
          name='newfeatures'
          label='I want to be the first to hear about new features'
          defaultValue
          ref={register({})}
        />                       
        <Select
          name='single'
          placeholder='Label'          
          options={singleOptions}
          value= {singleSelectValue}
          onChange={val => setSingleSelectValue(val as OptionType)}    
        />
        <Select
          name='multi'
          placeholder='Label'
          isMultiple={true}
          options={multiOptions}                
          value= {multiSelectValue}
          onChange={val => setMultiSelectValue(val as OptionType[])}    
        />
        <Checkbox
          name='customer_marketing'
          label='Customer Accepts Marketing'          
          ref={register({})}                    
        />
        <Button size='big' type='submit'>Submit</Button>
      </TwoColumnGrid>
    </form>
  );
};

export const normal = () => (
  <Form onSubmit={action('submit')} />
);
