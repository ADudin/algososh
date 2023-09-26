import styles from "./fibonacci-page.module.css";
import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

const MAX_INPUT_VALUE = 19;

export const FibonacciPage: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState('');
  const [fibonacciChain, setFibonacciChain] = useState<number[]>([]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setValue(evt.target.value);
  };

  const onSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);

    const fibonacciArray: number[] = [];

    for (let i = 0; i <= Number(value); i++) {
      setTimeout(() => {

        if (i === 0 || i === 1) {
          fibonacciArray.push(1);
          setFibonacciChain([...fibonacciArray]);
        } else {
          fibonacciArray.push(fibonacciArray[i - 1] + fibonacciArray[i - 2]);
          setFibonacciChain([...fibonacciArray]);
        }

      }, 500 * i);

      setTimeout(() => {
        setLoader(false);
      }, 500 * (Number(value)));
    };
    
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form 
      className={styles.container}
      onSubmit={onSubmit}
     >

      <div className={styles.input__container}>
        <Input
          type='number'
          value={value}
          onChange={handleChange}
        />
        <p className={styles.input__paragraph}>{`Максимальное число — ${MAX_INPUT_VALUE}`}</p>
      </div>

      <Button 
        text='Рассчитать'
        type='submit'
        value={value}
        disabled={value === '' || Number(value) === 0 || Number(value) > MAX_INPUT_VALUE}
        isLoader={loader}
      />
     </form>

     <ul className={styles.display__list}>
        {
          fibonacciChain.length !== 0 ?
          fibonacciChain.map((item, i) => 
          <li key={i} className={styles.display__item}>
            <Circle 
              letter={item.toString()} 
              state={ElementStates.Default}
            />
            <span>{i}</span>
          </li>) :
          ''
        }
      </ul>
    </SolutionLayout>
  );
};
