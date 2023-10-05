import styles from "./queue-page.module.css";
import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setStepTimeout } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue";

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

  const queue = useMemo(() => new Queue<string>(QUEUE_ARR_LENGTH), []);

  const initialQueueElement: IQueueArrElement = {
    value: '',
    state: ElementStates.Default,
    head: false,
    tail: false
  };

  const renderInitial = () => {
    const initialQueue = [];

    for (let i = 0; i < QUEUE_ARR_LENGTH; i++) {
      initialQueue.push(initialQueueElement);
    };

    setQueueArr([...initialQueue]);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setValue(evt.target.value);
  };

  useEffect(() => {
    renderInitial();
  }, []);

  const onEnqueue = async () => {
    setIsAddLoading(true);

    if (value !== '' && queue.getTail().index !== QUEUE_ARR_LENGTH - 1) {
      queue.enqueue(value);

      const head = queue.getHead();
      const tail = queue.getTail();
        
      queueArr[head.index] = {
        ...initialQueueElement,
        head: true,
        value: head.value
      };

      if (tail.index) {
        queueArr[tail.index - 1].tail = false;
      };

      queueArr[tail.index] = {
        ...queueArr[tail.index],
        tail: true,
        value: tail.value,
        state: ElementStates.Changing
      };

      setValue('');
      setQueueArr([...queueArr]);

      await setStepTimeout(SHORT_DELAY_IN_MS);

      queueArr[tail.index] = {
        ...queueArr[tail.index],
        state: ElementStates.Default
      };
      setQueueArr([...queueArr]);
    };
    
    setIsAddLoading(false);
  };

  const onClear = () => {
    queue.clear();
    renderInitial();
  };

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
            onClick={onEnqueue}
          />

          <Button 
            text="Удалить"
            isLoader={isRemoveLoading}
            disabled={queue.getLength() === 0}
          />
        </div>

        <Button 
          text="Очистить"
          disabled={queue.getLength() === 0}
          onClick={onClear}
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
