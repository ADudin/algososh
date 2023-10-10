import styles from "./string.module.css";
import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";

interface IString {
  letter: string;
  state?: ElementStates;
};

const MAX_INPUT_SYMBOLS_LENGTH = 11;

export const StringComponent: React.FC = () => {
  
  const [stringValue, setStringValue] = useState<IString[]>([]);
  const [loader, setLoader] = useState(false);

  const { values, handleChange, setValues } = useForm({ strValue: '' });

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    
    evt.preventDefault();
    setLoader(true);
      
    const stringArray = values.strValue.split('').map(item => {
      return {
        letter: item,
        state: ElementStates.Default
      };
    });
      
    setStringValue(stringArray);

    let modifiedArray = [...stringArray];

    for (let i = 0; i < modifiedArray.length / 2; i++) {
      setTimeout(() => {
        let start = i;
        let end = modifiedArray.length - 1 - i;
        modifiedArray[start].state = ElementStates.Changing;
        modifiedArray[end].state = ElementStates.Changing;
        setStringValue([...modifiedArray]);

        setTimeout(() => {
          let temp = modifiedArray[start].letter;

          modifiedArray[start] = {
            letter: modifiedArray[end].letter, 
            state: ElementStates.Modified
          };

          modifiedArray[end] = {
            letter: temp,
            state: ElementStates.Modified
          };

          setStringValue([...modifiedArray]);
        }, DELAY_IN_MS);
      }, DELAY_IN_MS * i);

      setTimeout(() => {
        setValues({ ...values, strValue: '' });
        setLoader(false);
      }, DELAY_IN_MS * modifiedArray.length / 2);
    }  
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={styles.container}>

        <Input
          type='text'
          name="strValue"
          maxLength={MAX_INPUT_SYMBOLS_LENGTH}
          isLimitText={true}
          onChange={handleChange}
          value={values.strValue}
          disabled={loader}
        />

        <Button 
          text='Развернуть'
          type='submit'
          value={values.strValue}
          disabled={values.strValue.length < 2}
          isLoader={loader}
        />

      </form>

      <div className={styles.display}>
        {
          stringValue.length > 1 ?
          stringValue.map((item, i) => <Circle key={i} letter={item.letter} state={item.state}/>) :
          ''
        }
      </div>
    </SolutionLayout>
  );
};
