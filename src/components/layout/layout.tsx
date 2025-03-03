import type { ReactNode } from 'react';
import styles from './layout.module.scss'
import { ItemPoint, Select, Share, Teamplate } from '../icons';

interface LayoutProps {
    children: ReactNode;
}

interface ProjectListItemProps {
    name: string;
    active?: boolean;
}

const ProjectListItem = ({name, active}:ProjectListItemProps) => {

    if ( !name ) return null;

    return (
        <li className={`${styles.project_list_item} ${active && styles.item__active}`}><ItemPoint/> <span>{name}</span></li>
    );
}


const Layout = ({children}:LayoutProps) => {
    return (
    <>
        <header className={styles.header}>
            <div className={styles.header_top}>
                <div className={styles.static_buttons_group}>
                    <button className={styles.button}><Teamplate/></button>
                    <button className={styles.button}><Share/></button>
                </div>
                <div className={styles.active_buttons}>
                    <button className={`${styles.button} ${styles.active_button}`}>Просмотр</button>
                    <button className={styles.button}>Управление</button>
                </div>
            </div>
            <div className={styles.header_bottom}>
                <div className={styles.project_custom_select}>
                    <div className={styles.custom_select__text}>
                        <span className={styles.text__project_text}>Название проекта</span>
                        <span className={styles.text__project_abbr}>Аббревиатура</span>
                    </div>
                    <div className={styles.custom_select}><Select/></div>
                </div>
                <div className={styles.project_list_active}>
                    <div className={styles.project_full_name_item}>
                        <span className={styles.project_full_name}>
                            Строительно-монтажные работы
                        </span>
                    </div>
                </div>
            </div>
        </header>
        <section className={styles.workspace}>
            <ul className={styles.project_list}>
                {new Array(5).fill(null).map((_, index) => (
                    <ProjectListItem name='Тестовые данные' key={index}/>
                ))}
                <ProjectListItem name='активно' active/>
                {new Array(5).fill(null).map((_, index) => (
                    <ProjectListItem name='Тестовые данные' key={index}/>
                ))}
            </ul>
            <div className={styles.children_box}>
                {children}
            </div>
        </section>
    </>);
}

export default Layout;
