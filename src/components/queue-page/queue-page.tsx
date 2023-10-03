import styles from "./queue-page.module.css";
import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setStepTimeout } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { ElementStates } from "../../types/element-states";

interface IQueueArrElement {
  value: string;
  state?: ElementStates;
  head?: boolean;
  tail?: boolean;
};

const MAX_INPUT_SYMBOLS_LENGTH = 4;
const QUEUE_ARR_LENGTH = 7; 

export const QueuePage: React.FC = () => {

  const [value, setValue] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [queueArr, setQueueArr] = useState<IQueueArrElement[]>([]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setValue(evt.target.value);
  };

  useEffect(() => {
    const initialQueue = [];

    for (let i = 0; i < QUEUE_ARR_LENGTH; i++) {
      const element: IQueueArrElement = {
        value: '',
        state: ElementStates.Default,
        head: false,
        tail: false
      };

      initialQueue.push(element);
    };

    setQueueArr([...initialQueue]);
  }, []);

  return (
    <SolutionLayout title="Очередь">
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
          />

          <Button 
            text="Удалить"
            isLoader={isRemoveLoading}
          />
        </div>

        <Button 
          text="Очистить"
        />
      </form>

      <ul className={styles.display__list}>
        {
          queueArr.map((item, index) => 
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.state}
              index={index}
              head={item.head ? 'head' : ''}
              tail={item.tail ? 'tail' : ''} 
            />
          </li>)
        }
      </ul>

    </SolutionLayout>
  );
};
