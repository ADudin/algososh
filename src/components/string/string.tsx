import styles from "./string.module.css";
import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface IString {
  letter: string;
  state?: ElementStates;
};

const MAX_INPUT_SYMBOLS_LENGTH = 11;

export const StringComponent: React.FC = () => {
  
  const [value, setValue] = useState('');
  const [stringValue, setStringValue] = useState<IString[]>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setValue(evt.target.value);
  };

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    
    evt.preventDefault();
    setLoader(true);
      
    const stringArray = value.split('').map(item => {
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
        setValue('');
        setLoader(false);
      }, DELAY_IN_MS * modifiedArray.length / 2);
    }  
  };

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={onSubmit} className={styles.container}>

        <Input
          type='text'
          maxLength={MAX_INPUT_SYMBOLS_LENGTH}
          isLimitText={true}
          onChange={handleChange}
          value={value}
          disabled={loader}
        />

        <Button 
          text='Развернуть'
          type='submit'
          value={value}
          disabled={value.length < 2}
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
