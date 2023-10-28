import styles from "./string.module.css";
import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/string";
import { reverse } from "../../utils";

const MAX_INPUT_SYMBOLS_LENGTH = 11;

export const StringComponent: React.FC = () => {
  
  const [loader, setLoader] = useState(false);

  const { values, handleChange, setValues } = useForm({ strValue: '' });

  const [stringValue, setStringValue] = useState<TString[]>([]);

  const stringArray = values.strValue.split('').map(item => {
    return {
      letter: item,
      state: ElementStates.Default
    };
  });

  const onSubmit = async (evt: ChangeEvent<HTMLFormElement>) => {   
    evt.preventDefault();
    setLoader(true);
    await reverse(stringArray, setStringValue);
    setValues({ ...values, strValue: '' });
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={styles.container} data-testid='form'>

        <Input
          type='text'
          name="strValue"
          maxLength={MAX_INPUT_SYMBOLS_LENGTH}
          isLimitText={true}
          onChange={handleChange}
          value={values.strValue}
          disabled={loader}
          data-testid='input'
        />

        <Button 
          text='Развернуть'
          type='submit'
          value={values.strValue}
          disabled={values.strValue.length < 1}
          isLoader={loader}
          data-testid='submitButton'
        />

      </form>

      <div className={styles.display} data-testid='container'>
        {
          stringValue.map((item, i) => 
          <div key={i} data-testid='circle'>
            <Circle 
              letter={item.letter} 
              state={item.state}
            />
          </div>)
        }
      </div>
    </SolutionLayout>
  );
};
