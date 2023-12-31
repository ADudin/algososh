import styles from "./queue-page.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setStepTimeout } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "./queue";
import { useForm } from "../../hooks/useForm";

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
  
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [queueArr, setQueueArr] = useState<IQueueArrElement[]>([]);

  const { values, handleChange, setValues } = useForm({ queueValue: '' });

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

  useEffect(() => {
    renderInitial();
  }, []);

  const onEnqueue = async () => {
    setIsAddLoading(true);

    if (values.queueValue !== '' && queue.getTail().index !== QUEUE_ARR_LENGTH - 1) {
      queue.enqueue(values.queueValue);

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

      setValues({ ...values, queueValue: ''});
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

  const onDequeue = async () => {
    setIsRemoveLoading(true);

    const head = queue.getHead();
    const tail = queue.getTail();

    if (head.index !== tail.index) {
      queue.dequeue();
      
      queueArr[queue.getHead().index - 1] = {
        ...queueArr[queue.getHead().index - 1],
        state: ElementStates.Changing
      };

      setQueueArr([...queueArr]);

      await setStepTimeout(SHORT_DELAY_IN_MS);

      queueArr[queue.getHead().index - 1] = initialQueueElement;
      queueArr[queue.getHead().index].head = true;

      setQueueArr([...queueArr]);
    } else {
      queue.clear();
      renderInitial();
    };

    setIsRemoveLoading(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container}>
        <div className={styles.controls__container}>

          <div className={styles.input__container}>
            <Input 
              name="queueValue"
              maxLength={MAX_INPUT_SYMBOLS_LENGTH}
              extraClass={styles.input}
              value={values.queueValue}
              onChange={handleChange}
              disabled={isAddLoading || isRemoveLoading}
            />

            <p className={styles.input__paragraph}>{`Максимум — ${MAX_INPUT_SYMBOLS_LENGTH} символа`}</p>
          </div>
          
          <Button 
            text="Добавить"
            disabled={values.queueValue === '' || isRemoveLoading}
            isLoader={isAddLoading}
            onClick={onEnqueue}
            data-testid="addButton"
          />

          <Button 
            text="Удалить"
            isLoader={isRemoveLoading}
            disabled={queue.getLength() === 0 || isAddLoading}
            onClick={onDequeue}
            data-testid="removeButton"
          />
        </div>

        <Button 
          text="Очистить"
          disabled={queue.getLength() === 0 || isAddLoading || isRemoveLoading}
          onClick={onClear}
          data-testid="resetButton"
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
