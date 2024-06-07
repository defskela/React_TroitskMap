import { useEffect } from 'react'

export const useCloseCard = (setOpen) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                // 27 - код клавиши Esc
                setOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Удаляем обработчик события при размонтировании компонента
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [setOpen])
}
