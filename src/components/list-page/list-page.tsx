import styles from "./list-page.module.css";
import React, {useState, useEffect, useMemo} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { getRandomArr } from "../../utils";
import { setStepTimeout } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";

import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list";

interface IListArrayElement {
  value: string;
  state: ElementStates;
  head: string | React.ReactElement | null;
  tail: string | React.ReactElement | null;
};


const MAX_INPUT_SYMBOLS_LENGTH = 4;
const MIN_INITIAL_ARRAY_LENGTH = 2;
const MAX_INITIAL_ARRAY_LENGTH = 6;
const MIN_INPUT_VALUE = 0;
const MAX_INPUT_VALUE = 99;

const getInitialArray = ():IListArrayElement[] => {
  const array:number[] = getRandomArr(MIN_INITIAL_ARRAY_LENGTH, MAX_INITIAL_ARRAY_LENGTH, MIN_INPUT_VALUE, MAX_INPUT_VALUE);

  const result = array.map((item, index) => {
    return {
      value: item.toString(),
      state: ElementStates.Default,
      head: index === 0 ? 'head' : null,
      tail: index === array.length - 1 ? 'tail' : null
    }
  });
  
  return result;
};

export const ListPage: React.FC = () => {
  const [listArray, setListArray] = useState<IListArrayElement[]>([]);
  const [isHeadAddLoading, setIsHeadAddLoading] = useState(false);
  const [isTailAddLoading, setIsTailAddLoading] = useState(false);
  const [isHeadRemoveLoading, setIsHeadRemoveLoading] = useState(false);
  const [isTailRemoveLoading, setIsTailRemoveLoading] = useState(false);
  const [isAddByIndexLoading, setIsAddByIndexLoading] = useState(false);
  const [isRemoveByIndexLoading, setIsRemoveByIndexLoading] = useState(false);

  const { values, handleChange, setValues } = useForm({
    inputValue: '',
    indexValue: ''
  });

  const linkedList = useMemo(() => new LinkedList(getInitialArray()), []);

  useEffect(() => {
    setListArray([...linkedList.toArray()]);
  }, [linkedList]);

  const onHeadAdd = async () => {
    setIsHeadAddLoading(true);

    if (linkedList.head) {
      linkedList.head.value.head = <Circle letter={values.inputValue} state={ElementStates.Changing} isSmall={true} />;
    }

    setListArray([...linkedList.toArray()]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    const newArrayElement: IListArrayElement = {
      value: values.inputValue,
      state: ElementStates.Modified,
      head: 'head',
      tail: linkedList.head ? null : 'tail'
    };

    if (linkedList.head) {
      linkedList.head.value.head = null;
    }

    setListArray([newArrayElement, ...linkedList.toArray()]);

    await setStepTimeout(SHORT_DELAY_IN_MS);
    
    linkedList.prepend(newArrayElement);

    if (linkedList.head) {
      linkedList.head.value.state = ElementStates.Default;
    }

    setListArray([...linkedList.toArray()]);
    setValues({ ...values, inputValue: '' });
    setIsHeadAddLoading(false);
  };

  const onTailAdd = async () => {
    setIsTailAddLoading(true);

    if (linkedList.tail) {
      linkedList.tail.value.head = <Circle letter={values.inputValue} state={ElementStates.Changing} isSmall={true} />; 
    }

    setListArray([...linkedList.toArray()]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    const newArrayElement: IListArrayElement = {
      value: values.inputValue,
      state: ElementStates.Modified,
      head: linkedList.head ? null : 'head',
      tail: 'tail'
    };

    if (linkedList.tail) {
      linkedList.tail.value.tail === 'tail' ? linkedList.tail.value.tail = null : linkedList.tail.value.tail = 'tail';
      linkedList.tail.value.head = null;
    }

    if (linkedList.head) {
      linkedList.head.value.head = 'head';
    }
    
    setListArray([...linkedList.toArray(), newArrayElement]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    linkedList.append(newArrayElement);

    if (linkedList.tail) {
      linkedList.tail.value.state = ElementStates.Default;
    };

    setValues({ ...values, inputValue: '' });
    setIsTailAddLoading(false);
  };

  const onHeadRemove = async () => {
    setIsHeadRemoveLoading(true);

    if (linkedList.head) {
      linkedList.head.value.tail = <Circle letter={linkedList.head.value.value} state={ElementStates.Changing} isSmall={true} />;
      linkedList.head.value.value = '';
    }

    setListArray([...linkedList.toArray()]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    if (linkedList.head) {
      linkedList.deleteHead();
      if (linkedList.head) {
        linkedList.head.value.head = 'head';
        setListArray([...linkedList.toArray()]);
      } else {
        setListArray([]);
      }
    }

    setIsHeadRemoveLoading(false);
  };

  const onTailRemove = async () => {
    setIsTailRemoveLoading(true);

    if (linkedList.tail) {
      linkedList.tail.value.tail = <Circle letter={linkedList.tail.value.value} state={ElementStates.Changing} isSmall={true} />;
      linkedList.tail.value.value = '';
    }

    setListArray([...linkedList.toArray()]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    if (linkedList.tail) {
      linkedList.deleteTail();
      if (linkedList.tail) {
        linkedList.tail.value.tail = 'tail';
        setListArray([...linkedList.toArray()]);
      } else {
        linkedList.deleteHead();
        setListArray([]);
      }
    }

    setIsTailRemoveLoading(false);
  };

  const onAddByIndex = async () => {
    setIsAddByIndexLoading(true);

    const array = linkedList.toArray();
    const index = Number(values.indexValue);
    const newArrayElement: IListArrayElement = {
      value: values.inputValue,
      state: ElementStates.Default,
      head: linkedList.head ? null : 'head',
      tail: linkedList.tail ? null : 'tail'
    };

    linkedList.addByIndex(newArrayElement, index);

    for (let i = 0; i <= index; i++) {
      let tempHead = array[i].head;
      array[i] = {
        ...array[i],
        head: <Circle letter={values.inputValue} state={ElementStates.Changing} isSmall={true} />
      }

      if (i > 0) {
        array[0].head = 'head';

        array[i - 1] = {
          ...array[i - 1],
          state: ElementStates.Changing,
          head: tempHead
        }
      }

      setListArray([...array]);

      await setStepTimeout(SHORT_DELAY_IN_MS);
    }

    array[index].head = linkedList.head ? null : 'head';

    for (let i = 0; i < index; i++) {
      array[i].state = ElementStates.Default;
    }

    array.splice(index, 0, {
      value: values.inputValue,
      state: ElementStates.Modified,
      head: linkedList.head ? null : 'head',
      tail: linkedList.tail ? null : 'tail'
    });

    setListArray([...array]);

    await setStepTimeout(SHORT_DELAY_IN_MS);

    array[index].state = ElementStates.Default;
    array[0].head = 'head';

    setListArray([...array]);
    setIsAddByIndexLoading(false);
  };

  const onRemoveByIndex = async () => {
    setIsRemoveByIndexLoading(true);

    const array = linkedList.toArray();
    const index = Number(values.indexValue);

    linkedList.deleteByIndex(index);

    for (let i = 0; i <= index; i++) {
      array[i].state = ElementStates.Changing;

      setListArray([...array]);
      await setStepTimeout(SHORT_DELAY_IN_MS);
    }

    array[index] = {
      ...array[index],
      tail: <Circle letter={array[index].value} state={ElementStates.Changing} isSmall={true} />,
      value: '',
      state: ElementStates.Default
    }

    setListArray([...array]);
    await setStepTimeout(SHORT_DELAY_IN_MS);

    array.splice(index, 1);
    array.forEach((item) => item.state = ElementStates.Default);

    setListArray([...array]);
    setIsRemoveByIndexLoading(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.cotainer}>
        <div className={styles.controls__container}>
          <Input 
            extraClass={styles.input}
            name="inputValue"
            type="text"
            isLimitText={true}
            maxLength={MAX_INPUT_SYMBOLS_LENGTH}
            placeholder="Введите значение"
            value={values.inputValue}
            onChange={handleChange}
            disabled={
              isHeadAddLoading ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Добавить в head"
            linkedList="small"
            onClick={onHeadAdd}
            isLoader={isHeadAddLoading}
            disabled={
              values.inputValue === '' ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Добавить в tail"
            linkedList="small"
            onClick={onTailAdd}
            isLoader={isTailAddLoading}
            disabled={
              values.inputValue === '' ||
              isHeadAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Удалить из head"
            linkedList="small"
            onClick={onHeadRemove}
            isLoader={isHeadRemoveLoading}
            disabled={
              !listArray.length ||
              isHeadAddLoading ||
              isTailAddLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Удалить из tail"
            linkedList="small"
            onClick={onTailRemove}
            isLoader={isTailRemoveLoading}
            disabled={
              !listArray.length ||
              isHeadAddLoading ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />
        
          <Input 
            extraClass={styles.input}
            name="indexValue"
            type="number"
            placeholder="Введите индекс"
            value={values.indexValue}
            onChange={handleChange}
            disabled={
              isHeadAddLoading ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Добавить по индексу"
            linkedList="big"
            onClick={onAddByIndex}
            isLoader={isAddByIndexLoading}
            disabled={
              values.indexValue === '' || 
              values.inputValue === '' ||
              Number(values.indexValue) >= linkedList.getSize() ||
              Number(values.indexValue) < 0 ||
              isHeadAddLoading ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isRemoveByIndexLoading
            }
          />

          <Button 
            text="Удалить по индексу"
            linkedList="big"
            onClick={onRemoveByIndex}
            isLoader={isRemoveByIndexLoading}
            disabled={
              values.indexValue === '' || 
              Number(values.indexValue) > linkedList.getSize() - 1 ||
              Number(values.indexValue) < 0 ||
              isHeadAddLoading ||
              isTailAddLoading ||
              isHeadRemoveLoading ||
              isTailRemoveLoading ||
              isAddByIndexLoading
            }
          />
        </div>
      </form>

      <ul className={styles.display__list}>
        {
        listArray.map((item, index) => 
          <li key={index} className={styles.dispaly__listElement}>
            <Circle
              letter={item.value}
              state={item.state}
              index={index}
              head={item.head}
              tail={item.tail}
            />
            {
              index < listArray.length - 1 && <ArrowIcon />
            }
          </li>)
        }
      </ul>
    </SolutionLayout>
  );
};