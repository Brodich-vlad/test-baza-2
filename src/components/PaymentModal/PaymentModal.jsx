"use client";
import { useCallback, useState } from 'react';
import { useTranslations } from "next-intl";
import Modal from '../shared/Modal/Modal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import ThanksCard from './ThanksCard/ThanksCard';
import CloseBtn from '../shared/CloseBtn/CloseBtn';
import Loader from './loader/Loader';
import usePaymentHandler from './usePaymentHandler';
import { useParams } from 'next/navigation';

export default function PaymentModal() {
    // Мова сторінки.
    const { locale } = useParams();
  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const isLoader = stateModalPayment(state => state.isLoader);
  const isError = stateModalPayment(state => state.isError);
  const isThanks = stateModalPayment(state => state.isThanks);
  const close = stateModalPayment(state => state.close);
  
  const startLoader = stateModalPayment(state => state.startLoader);
	const stoptLoader = stateModalPayment(state => state.stoptLoader);
  const addError = stateModalPayment(state => state.addError);
	const addThanks = stateModalPayment(state => state.addThanks); 


  //handleSubmit
  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.;
  //const [thank, setThank] = useState(false);




  const handleClose = useCallback(() => {
    //setThank(false)
    close()
  },[])

  // const handleThank = useCallback(() => {
  //   setThank(true)
  // }, [thank]);

  const handleSubmit = (amount) => {
    usePaymentHandler(amount, locale, startLoader,stoptLoader,addError,addThanks)
    //close()
  }


  return <Modal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      {isLoader && <Loader/>}
      <div className={styles.card}>
        {isError | isThanks ?
        <ThanksCard handleClose={handleClose}/> :
        <FormPayment handleSubmit={handleSubmit}/>
        }

        <CloseBtn className={styles.close_btn}
          ariaLabel={ isThanks ? 
            t('ariaLabel_btn_close_2') : 
            t('ariaLabel_btn_close_1')
          }
          onClick={handleClose}/>
      </div>
    </div>
  </Modal>
}