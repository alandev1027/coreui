import React, { FC, forwardRef, Ref, useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';

import Label from '../Label/Label';
import styles from './Checkbox.module.scss';

interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label to be displayed alongside with toggle input
   */
  label?: string;

  /**
   * Default value of toggle input, does not make the input controlled
   */
  value?: boolean;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (newChecked: boolean) => void;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: FC<Props> = forwardRef((props, ref) => {
  const { label, value, disabled, onChange, ...otherProps } = props;

  const [isChecked, setChecked] = useState(!!value);

  const toggle = useCallback(
    () => {
      console.log(isChecked);
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange],
  );

  useEffect(()=>{
    setChecked(!!value);
  }, [value]);

  return (
    <Label title={label || ''} disabled={disabled} position='right'>
      <span
        className={classNames(styles.checkbox, {
          [styles.checked]: isChecked,
          [styles.disabled]: disabled,
        })}
      />
      <input
        type='checkbox'
        className={styles.input}
        ref={ref}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        {...otherProps}
      />
    </Label>
  );
});

export default Checkbox;
