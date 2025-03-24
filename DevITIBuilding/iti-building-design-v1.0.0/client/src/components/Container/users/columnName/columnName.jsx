import React from "react";

import styles from "./columnName.module.css";


function ColumnName({ type="" , userLength=1}) {
    return (
        type &&
        <div className={styles.mainDiv} 
            // style={{
            //     display: userLength === 0 && 'none'
            // }}
        >
            <div className={styles.userDiv}>
                <span>
                    User
                </span>
            </div>
            <div className={styles.accountTypeDiv}>
                <span>
                    Account Type
                </span>
            </div>
            <div className={styles.roleDiv}
                style={{
                    display: type === "user" && 'none'
                }}
            >
                <span>
                    Role
                </span>
            </div>
            <div className={styles.permissionDiv}>
                <span>
                    Permissions
                </span>
            </div>
            <div className={styles.discountDiv}>
                <span>
                    Discount
                </span>
            </div>
            <div className={styles.paymentDiv} 
                style={{
                    display: type === "user" && 'none'
                }}
            >
                <span>
                    Payment
                </span>
            </div>
            <div className={styles.manageDiv}>
                <span>
                    Actions
                </span>
            </div>
        </div>
    )
}

export default ColumnName;