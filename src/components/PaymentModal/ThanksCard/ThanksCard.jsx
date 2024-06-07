import { useTranslations } from 'next-intl';
import styles from './ThanksCard.module.scss';
import ButtonLink from '../../shared/ButtonLink/ButtonLink';
import stateModalPayment from '@/src/state/stateModalPayment';

export default function ThanksCard({handleClose}) {

  const t = useTranslations("Modal_support");

  const isThanks = stateModalPayment(state => state.isThanks);
  const isError = stateModalPayment(state => state.isError);
 
  return <div className={styles.thanks}>
    {isThanks && <h2>{t('thanks_support')}</h2>}
    {isError && <h2 className={styles.error}>Вибачте, сталася помилка <span>:(</span></h2>}
    <ButtonLink url='/' onClick={handleClose}>
      {t('btn_home')}
    </ButtonLink>
  </div>
}