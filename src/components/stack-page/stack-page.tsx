import styles from "./stack-page.module.css";
import React, { useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setStepTimeout } from "../../utils";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

import { ElementStates } from "../../types/element-states";

interface IStackElement {
  value: string | null;
  state?: ElementStates;
};

const MAX_INPUT_SYMBOLS_LENGTH = 4;

export const StackPage: React.FC = () => {

  const stack = useMemo(() => new Stack<string>(), []);
  const { values, handleChange, setValues } = useForm({ stackValue: '' });
  
  const [stackArr, setStackArr] = useState<IStackElement[]>([]);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const addElement = async () => {
    setIsAddLoading(true);
    stack.push(values.stackValue);
    stackArr.push({
      value: values.stackValue,
      state: ElementStates.Changing
    });
    setStackArr([...stackArr]);
    setValues({ ...values, stackValue: '' });
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

          <Input 
            name="stackValue"
            maxLength={MAX_INPUT_SYMBOLS_LENGTH}
            extraClass={styles.input}
            value={values.stackValue}
            onChange={handleChange}
            isLimitText={true}
            disabled={isAddLoading || isRemoveLoading}
          />
          
          <Button 
            text="Добавить"
            disabled={values.stackValue === '' || isRemoveLoading}
            isLoader={isAddLoading}
            onClick={addElement}
            data-testid="addButton"
          />

          <Button 
            text="Удалить"
            disabled={stackArr.length === 0 || isAddLoading}
            isLoader={isRemoveLoading}
            onClick={removeElement}
            data-testid="removeButton"
          />
        </div>

        <Button 
          text="Очистить"
          disabled={stackArr.length === 0 || isAddLoading || isRemoveLoading}
          onClick={onReset}
          data-testid="resetButton"
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