import styles from './CategoriesButton.module.css'
import { useState } from 'react'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'
import { useEffect } from 'react'

export const CategoriesButton = () => {
    // Состояния для открытия/закрытия категорий и отображения/скрытия категорий
    const [isOpenCategories, setOpenCategories] = useState(true)
    const [showUniversity, setShowUniversity] = useState(true)
    const [showFontans, setShowFontans] = useState(true)
    const [showLaboratories, setShowLaboratories] = useState(true)
    // Для доступа ко всем элементам категории через цикл
    const fontans = document.querySelectorAll('.fontans')
    const universities = document.querySelectorAll('.universities')
    const laboratories = document.querySelectorAll('.laboratories')

    const toggleCategories = () => {
        setOpenCategories(!isOpenCategories)
    }
    // Функции для открытия/закрытия категорий. Переменная show... не успеет обновить свое
    // состояние внутри функции из-за отложенного рендеринга в реакте, поэтому ниже используется useEffect
    const toggleUniversity = () => {
        setShowUniversity(!showUniversity)
    }

    const toggleFontans = () => {
        setShowFontans(!showFontans)
    }

    const toggleLaboratories = () => {
        setShowLaboratories(!showLaboratories)
    }
    // Когда переменная showUniversity обновится, useEffect сработает и изменит видимость элементов
    // Вторая зависимость в нашем случае ни на что не влияет, но в теории может пригодиться
    useEffect(() => {
        if (showUniversity) {
            universities.forEach((university) => {
                university.style.visibility = 'visible'
            })
        }
        if (!showUniversity) {
            universities.forEach((university) => {
                university.style.visibility = 'hidden'
            })
        }
    }, [showUniversity, universities])

    useEffect(() => {
        if (showFontans) {
            fontans.forEach((fontan) => {
                fontan.style.visibility = 'visible'
            })
        }
        if (!showFontans) {
            fontans.forEach((fontan) => {
                fontan.style.visibility = 'hidden'
            })
        }
    }, [showFontans, fontans])

    useEffect(() => {
        if (showLaboratories) {
            laboratories.forEach((laboratory) => {
                laboratory.style.visibility = 'visible'
            })
        }
        if (!showLaboratories) {
            laboratories.forEach((laboratory) => {
                laboratory.style.visibility = 'hidden'
            })
        }
    }, [showLaboratories, laboratories])

    return (
        <div className={styles.categories}>
            <button onClick={toggleCategories}>Категории</button>
            {isOpenCategories && (
                <div className={styles.categoriesList}>
                    <Checkbox
                        className={styles.oneCategory}
                        color="success"
                        shape="curve"
                        animation="pulse"
                        checked={showUniversity}
                        onChange={toggleUniversity}
                    >
                        Университеты
                    </Checkbox>
                    <Checkbox
                        className={styles.oneCategory}
                        color="success"
                        shape="curve"
                        animation="pulse"
                        checked={showFontans}
                        onChange={toggleFontans}
                    >
                        Фонтаны
                    </Checkbox>
                    <Checkbox
                        className={styles.oneCategory}
                        color="success"
                        shape="curve"
                        animation="pulse"
                        checked={showLaboratories}
                        onChange={toggleLaboratories}
                    >
                        Лаборатории
                    </Checkbox>
                </div>
            )}
        </div>
    )
}
