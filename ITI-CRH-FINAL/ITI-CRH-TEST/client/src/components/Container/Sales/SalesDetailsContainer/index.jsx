import React, { useState } from 'react'
import styles from './index.module.css'
import CollapseBtn from '../CollapseBtn';

const SalesDetailsContainer = ({ heading = "Sales", headerBtn, fields = [], data, visibleCount = 2, collapsible = false, className, style }) => {
    const [collapsed, setCollapsed] = useState(true);
    const customFields = data || [];
    const toggleCollapse = () => {
        if (collapsible) setCollapsed((prev) => !prev);
    };
    return (
        <div className={styles.container + " " + className} style={style}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>{heading}</div>
                {headerBtn && headerBtn}
            </div>
            <div>
                {fields.slice(0, collapsible && collapsed ? visibleCount : fields.length)
                    .map(({ name, icon }) => <DetailsItem
                        name={name}
                        icon={icon}
                        value={customFields.find((field) => field.name === name)?.value?.[0]?.name || ''}
                    />)}
                {collapsible && fields.length > visibleCount && (
                    <CollapseBtn onClick={toggleCollapse} collapsed={collapsed} />
                )}
            </div>
        </div>
    )
}

export default SalesDetailsContainer

const DetailsItem = ({ name, icon, value }) => {
    return (
        <div className={styles.detailRow} key={name}>
            <img src={icon} alt={name} className={styles.icon} />
            <span className={styles.label}>{name}</span>
            <span className={styles.value}>{value}</span>
        </div>
    )
}