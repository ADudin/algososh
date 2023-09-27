import styles from "./sorting-page.module.css";
import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const mockAarray = [2, 34, 17, 100, 50];

  return (
    <SolutionLayout title="Сортировка массива">

      <form className={styles.controls__container}>

        <fieldset className={`${styles.controls__fieldset} ${styles.controls__radio}`}>
          <RadioInput label='Выбор' />
          <RadioInput label='Пузырёк' />
        </fieldset>

        <fieldset className={`${styles.controls__fieldset} ${styles.controls__launch}`}>
          <Button 
            text='По возрастанию' 
            sorting={Direction.Ascending}
            extraClass={styles.controls__button}
          />
          <Button 
            text='По убыванию' 
            sorting={Direction.Descending}
            extraClass={styles.controls__button}
          />
        </fieldset>

        <Button 
          text="Новый массив"
          extraClass={styles.controls__button}
        />

      </form>

      <div className={styles.display}>
        {
          mockAarray.map((item, i) => 
          <Column 
            key={i} 
            index={item}
          />)
        }
      </div>

    </SolutionLayout>
  );
};
