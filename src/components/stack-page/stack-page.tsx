import styles from "./stack-page.module.css";
import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setStepTimeout } from "../../utils";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";

interface IStackElement {
  value: string | null;
  state?: ElementStates;
};

const MAX_INPUT_SYMBOLS_LENGTH = 4;

export const StackPage: React.FC = () => {

  const stack = new Stack<string>();
  
  const [value, setValue] = useState('');
  const [stackArr, setStackArr] = useState<IStackElement[]>([]);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setValue(evt.target.value);
  };

  const addElement = async () => {
    setIsAddLoading(true);
    stack.push(value);
    stackArr.push({
      value: value,
      state: ElementStates.Changing
    });
    setStackArr([...stackArr]);
    setValue('');
    await setStepTimeout(SHORT_DELAY_IN_MS);
    stackArr[stackArr.length - 1].state = ElementStates.Default;
    setStackArr([...stackArr]);
    setIsAddLoading(false);
  };

  const removeElement = async () => {
    setIsRemoveLoading(true);
    stackArr[stackArr.length - 1].state = ElementStates.Changing;
    setStackArr([...stackArr]);
    await setStepTimeout(SHORT_DELAY_IN_MS);
    stack.pop();
    stackArr.pop();
    setStackArr([...stackArr]);
    setIsRemoveLoading(false);
  };

  const onReset = async () => {
    stack.clear();
    setStackArr([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container}>
        <div className={styles.controls__container}>

          <div className={styles.input__container}>
            <Input 
              maxLength={MAX_INPUT_SYMBOLS_LENGTH}
              extraClass={styles.input}
              value={value}
              onChange={handleChange}
            />

            <p className={styles.input__paragraph}>{`Максимум — ${MAX_INPUT_SYMBOLS_LENGTH} символа`}</p>
          </div>
          
          <Button 
            text="Добавить"
            disabled={value === ''}
            isLoader={isAddLoading}
            onClick={addElement}
          />

          <Button 
            text="Удалить"
            disabled={stackArr.length === 0}
            isLoader={isRemoveLoading}
            onClick={removeElement}
          />
        </div>

        <Button 
          text="Очистить"
          disabled={stackArr.length === 0}
          onClick={onReset}
        />
      </form>

      <ul className={styles.display__list}>
        {
          stackArr.length ?
          stackArr.map((item, index) => 
          <li key={index}>
            <Circle
              letter={item.value || ''}
              state={item.state}
              index={index}
              head={stackArr.length - 1 === index ? 'top' : ''}
            />
          </li>) :
          ''
        }
      </ul>
    </SolutionLayout>
  );
};