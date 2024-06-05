import { useRef, useState } from 'react';
import { useTranslations } from "next-intl";
import { Icon } from "../../shared/Icon/Icon";
import { btnItems } from "../btnItems";
import { createKey } from "@/src/lib/utils/createKey";
import MainButton from "../../shared/MainButton/MainButton";
import styles from './FormPayment.module.scss';
import clsx from "clsx";
import usePaymentHandler from '../usePaymentHandler';
import { useParams } from 'next/navigation';

export default function FormPayment({handleThank}) {
  // Мова сторінки.
  const { locale } = useParams();
  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
  const [amount, setAmount] = useState('0');
  const [readOnly, setReadOnly] = useState(true);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  // Регулярки
  const regInput = /^[1-9]\d{0,3}$|^$/;
  const regError = /^[1-9]\d{0,4}$|^$/;

  const isDisabled =(amount)=>{
    return amount === ''|| amount === '0'
  };

  const onSubmit = (amount) => {
    if(isDisabled(amount)) {
      console.log('Не обрана сума')
      return
    }
    // Тимчасовий вивід результату в консоь.
    console.log(usePaymentHandler(amount, locale)) 
    handleThank()
  };
  // Перемикач Інша сума.
  const another = () => {
    if(readOnly){
      setReadOnly(false)
      setAmount('')
    }
    if(inputRef && inputRef.current){
      inputRef.current.focus()
    }
  }
  // Перемикач фіксована сума.
  const fixedAmount = (ev, id) => {
    const { value } = ev.target;
    if (isDisabled(value) && !id) {
      setReadOnly(true);
      setAmount('0');
    } else if (ev.target && id) {
      setReadOnly(true);
      setAmount(id);
    } else {
      ev.preventDefault();
    }
  };
  // Відображення помилок.
  const renderError=(value)=>{
    if(regError.test(value)){
      setError(t("error_message"))
    }else setError(`${value.at(-1)}!`)
    setTimeout(() => {
      setError(null)
    }, 1000);
  }
  // Валідація вхідних даних інпут.
  const isValidate = (value) => {
   if(regInput.test(value)){
    setAmount(value.trim())
   }else renderError(value)
  }
 // Перемикач стилів кнопок.
  const activeStyle = id => (readOnly && amount === id) || (!readOnly && id === 'another');

  return <form className={styles.form} 
    onSubmit={(e)=>{
      e.preventDefault()
      onSubmit(amount)
    }}>
    <p>{t('amount')} <Icon className={styles.icon} name='donate-modal-icon'/></p>

    <div className={styles.amount}>
      {/* <input 
        value={amount} 
        type = "text"
        //inputMode="numeric"
        className={styles.input}
        //ref={inputRef}
        size={4}
        //onInput={(e)=>{isValidate(e.target.value)}}
        //onBlur={(e)=>{fixedAmount(e)}}
        //readOnly={readOnly}
        readOnly={true}
        autoComplete="off"
      /> */}
          <p className={styles.input}
        >{amount} </p>
      
      <label className={styles.label}><span>{amount}</span><Icon name='currency'/></label>
      
      {error && <p
        className={clsx(styles.error, error?.length > 2 && styles._message)}>{error}</p>
      }
    </div>

    {/* <ul className={styles.btns}>
      {btnItems.map((el)=>{
        return <li key={createKey()}>
          <MainButton 
            className={clsx(styles.btn, activeStyle(el.id) && styles._active, el.id === '500' && styles._hide)}
            variant='modal' 
            onClick={(ev)=>{
              'another' === el.id ?
              ev.preventDefault():
              //another():
              fixedAmount(ev, el.id)
            }}>
              {el.text}{t(el.currency)}
              {'another' === el.id && 
              <input type='text' 
                value={amount} 
                className={styles.input_hide} 
                autoComplete="off" 
                ref={inputRef}
                onInput={(e)=>{isValidate(e.target.value)}}
                onClick={()=>{
                  another()
                  //fixedAmount(ev, el.id)
                }}
              />}
          </MainButton>
        </li>
      })}
    </ul> */}

    <ul className={styles.btns}>
      <li>
        <MainButton 
          variant='modal' 
          className={clsx(styles.btn, activeStyle('100') && styles._active, styles._hide)}
          onClick={(ev)=>{
            fixedAmount(ev, '100')
          }}>
            {`+100 ${t('UAH')}`}
        </MainButton>
      </li>
      <li>
        <MainButton 
          variant='modal' 
          className={clsx(styles.btn, activeStyle('200') && styles._active, styles._hide)}
          onClick={(ev)=>{
            fixedAmount(ev, '200')
          }}>
            {`+200 ${t('UAH')}`}
        </MainButton>
      </li>
      <li>
        <MainButton 
          variant='modal' 
          className={clsx(styles.btn, activeStyle('500') && styles._active, styles._hide)}
          onClick={(ev)=>{
            fixedAmount(ev, '500')
          }}>
            {`+500 ${t('UAH')}`}
        </MainButton>
      </li>
      <li>
        <MainButton 
          variant='modal' 
          className={clsx(styles.btn, activeStyle('another') && styles._active, styles._hide)}
          // onClick={()=>{
          //   another()
          // }}
          >
            {`+${t('another_amount')}`}
            <input type='text' 
                value={amount} 
                className={styles.input_hide} 
                autoComplete="off" 
                ref={inputRef}
                inputMode="numeric"
               // readOnly={readOnly}
                onInput={(e)=>{isValidate(e.target.value)}}
                onBlur={(e)=>{fixedAmount(e)}}
                onClick={()=>{
                  another()
                  //fixedAmount(ev, el.id)
                }}
              />

        </MainButton>
      </li>

      {/* {btnItems.map((el)=>{
        return <li key={createKey()}>
          <MainButton 
            className={clsx(styles.btn, activeStyle(el.id) && styles._active, el.id === '500' && styles._hide)}
            variant='modal' 
            onClick={(ev)=>{
              'another' === el.id ?
              ev.preventDefault():
              //another():
              fixedAmount(ev, el.id)
            }}>
              {el.text}{t(el.currency)}
              {'another' === el.id && 
              <input type='text' 
                value={amount} 
                className={styles.input_hide} 
                autoComplete="off" 
                ref={inputRef}
                onInput={(e)=>{isValidate(e.target.value)}}
                onClick={()=>{
                  another()
                  //fixedAmount(ev, el.id)
                }}
              />}
          </MainButton>
        </li>
      })} */}
    </ul>
    <MainButton className={styles.btn_submit} 
      type="submit" 
      disabled={isDisabled(amount)}>
        {t('btn_support')}
    </MainButton>
  </form>
}