import React, { FC, forwardRef, useState, useEffect, createRef} from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';
import ArrowIcon from '../Icons/ArrowIcon';
import Checkbox from '../Checkbox/Checkbox';

export interface OptionType {
  key: string;
  label: string;
  isDelete?: boolean;
}

interface Props {
  /**
   * Label to be displayed alongside with toggle input
   */
  options?: OptionType[];

  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Placeholder to show when empty
   */
  placeholder?: string;

  /**
   * Register callback for change event
   */
  onChange?: (value: OptionType | OptionType[]) => void;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Read only mode. Default: false
   */
  isMultiple?: boolean;

  /**
   * Select className
   */
  className?: string;

  /**
   * Current value of Select
   */
  value?: OptionType[] | OptionType | undefined | null;
}

const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClick);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleClick);
      document.removeEventListener("click", handleClick);
    };
  });
};

const Select: FC<Props> = forwardRef((props) => {
  const { value, options, placeholder, isMultiple, onChange, className, ...otherProps } = props;
  const [isDropdown, setIsDropdown] = useState(false);
  const [currentValue, setCurrentValue] = useState<OptionType[] | OptionType | undefined | null>(value);
  const ref = createRef<HTMLDivElement>();

  useOutsideClick(ref, () => {
    setIsDropdown(false);
  });

  const onChangeAction = (option: OptionType, e: React.MouseEvent<HTMLLIElement, MouseEvent> | null) => {
    if ((e !== null) && (e.target !== e.currentTarget)) {
      return;
    }

    if (isMultiple) {
      let multipleValue: OptionType[] = [];
      if (!!currentValue) {
        multipleValue = (currentValue as OptionType[]).slice();
      }

      if (multipleValue.includes(option)) {
        const index = multipleValue.indexOf(option);
        multipleValue.splice(index, 1);
      }
      else {
        multipleValue.push(option);
      }

      if (onChange) {
        setCurrentValue(multipleValue);
        onChange(multipleValue);
      }
    }
    else {
      if (onChange) {
        setCurrentValue(option);
        onChange(option);
      }
      setIsDropdown(false);
    }
  }

  const getOptionClassName = (option: OptionType) => {
    if (isMultiple) {
      let multipleValue: OptionType[] = currentValue as OptionType[];
      if (!!multipleValue && multipleValue.includes(option)) {
        return classNames(styles.selected);
      }
    }
    else {
      if ((value as OptionType)?.key === option.key) {
        return classNames(styles.selected);
      }
    }
  }


  const getLabel = () => {
    if (isMultiple) {
      if (!!currentValue) {
        const multipleValue: OptionType[] = currentValue as OptionType[];
        if (multipleValue.length)
          return multipleValue.map(option => option.label).join(", ");
        else
          return placeholder;
      }
    }
    else {
      if (!!currentValue) {
        return (currentValue as OptionType).label
      }
    }
    return placeholder;
  }

  const getIsChecked = (option: OptionType) => {
    return (currentValue as OptionType[])?.includes(option);
  }

  const getIsValueExist = () => {
    if (isMultiple) {
      return !!currentValue && (isMultiple && (currentValue as OptionType[]).length);
    }
    else {
      return !!currentValue;
    }
  }

  return (
    <div className={classNames(styles.container, className)} ref={ref} {...otherProps}>
      <div className={classNames(styles.select)} onClick={() => setIsDropdown(!isDropdown)}>
        <span className={classNames(styles.placeholder, { [styles.value]: getIsValueExist() })}>{getLabel()}</span>
        <span className={classNames(styles.arrow, { [styles.rotate]: isDropdown })}><ArrowIcon /></span>
      </div>
      {isDropdown && !!options &&
        <ul>
          {options.map((option, index) =>
            <li className={getOptionClassName(option)} key={index} onClick={(e) => { onChangeAction(option, e); }}>
              {isMultiple ?
                <Checkbox label={`${option.label}`} value={getIsChecked(option)} onChange={() => onChangeAction(option, null)} />
                :
                <span className={classNames(styles.itemLabel, { [styles.del]: option.isDelete })}>{option.label}</span>
              }
            </li>)}
        </ul>}
    </div>

  );
});

export default Select;
