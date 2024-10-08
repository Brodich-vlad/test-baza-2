import styles from './MessageCard.module.scss';
import { useTranslations } from 'next-intl';
import ButtonLink from '@/src/components/shared/ButtonLink/ButtonLink';

export default function MessageCard({handleClose, isError, isThanks}){
  const t = useTranslations("Modal_support");

  return <div className={styles.thanks}>
    {isThanks && <h2>{t('thanks_support')}</h2>}
    {isError && <h2 className={styles.error}>{t('error_message_pay')}</h2>}
    <ButtonLink url='/' onClick={handleClose}>
      {t('btn_home')}
    </ButtonLink>
  </div>
}