import styles from './CategoriesButton.module.css'
import { useState } from 'react'
import { Checkbox } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'

export const CategoriesButton = () => {
    const [isOpenCategories, setOpenCategories] = useState(true)
    const [showUniversity, setShowUniversity] = useState(true)
    const [showFontans, setShowFontans] = useState(true)
    const [showLaboratories, setShowLaboratories] = useState(true)

    const fontans = document.querySelectorAll('.fontans')
    const universities = document.querySelectorAll('.universities')
    const laboratories = document.querySelectorAll('.laboratories')

    const toggleCategories = () => {
        setOpenCategories(!isOpenCategories)
    }

    const toggleUniversity = () => {
        console.log(showUniversity)
        setShowUniversity(!showUniversity)
        console.log(showUniversity)
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
    }

    const toggleFontans = () => {
        setShowFontans(!showFontans)
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
    }

    const toggleLaboratories = () => {
        setShowLaboratories(!showLaboratories)
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
    }
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
                        onClick={toggleUniversity}
                    >
                        Университеты
                    </Checkbox>
                    <Checkbox
                        className={styles.oneCategory}
                        color="success"
                        shape="curve"
                        animation="pulse"
                        checked={showFontans}
                        onClick={toggleFontans}
                    >
                        Фонтаны
                    </Checkbox>
                    <Checkbox
                        className={styles.oneCategory}
                        color="success"
                        shape="curve"
                        animation="pulse"
                        checked={showLaboratories}
                        onClick={toggleLaboratories}
                    >
                        Лаборатории
                    </Checkbox>
                </div>
            )}
        </div>
    )
}
