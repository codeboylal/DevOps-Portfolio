import React from 'react'
import styles from './index.module.css'
import house from './house.png'
import CardDetails from '../cardDetails/'

const SalesCard = ({ id, img, title, address, userName, userContact, date, amount }) => {
  return (
    <div className={styles.cardDiv} key={id}>
      <img src={img || house} alt="card-img" className={styles.cardImg} />
      <CardDetails title={title} address={address} userName={userName} userContact={userContact} date={date} amount={amount} />
    </div>
  )
}

export default SalesCard