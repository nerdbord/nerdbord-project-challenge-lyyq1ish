import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ICONS,
  ICONS_MAP,
  CategoryName,
  IconName,
  Category,
  COLORS_MAP,
} from './iconTypes'

interface CategoryModalProps {
  onClose: () => void
  onSave: (name: string, icon: IconName, color: string) => void
  onDelete: () => void
  initialData?: Category | null
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || '')
  const [icon, setIcon] = useState<IconName>(initialData?.icon || 'faUtensils')
  const [color, setColor] = useState(
    initialData?.color || Object.values(COLORS_MAP)[0]
  )
  const [showColorDropdown, setShowColorDropdown] = useState(false)
  const [showIconDropdown, setShowIconDropdown] = useState(false)

  const handleColorClick = (value: string) => {
    setColor(value)
    setShowColorDropdown(false)
  }

  const handleIconClick = (value: IconName) => {
    setIcon(value)
    setShowIconDropdown(false)
  }

  const getColorName = (colorValue: string): string => {
    const entry = Object.entries(COLORS_MAP).find(
      ([, value]) => value === colorValue
    )
    return entry ? entry[0] : ''
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 rounded-lg bg-white p-8">
          <h2 className="mb-4 text-xl font-bold">
            {initialData ? 'Edytuj kategorię' : 'Dodaj nową kategorię'}
          </h2>

          <div className="mb-4">
            <label>Nazwa</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="relative mb-4">
            <label>Kolor</label>
            <div
              className="cursor-pointer rounded border p-2"
              onClick={() => setShowColorDropdown(!showColorDropdown)}
              style={{ backgroundColor: color }}
            >
              {getColorName(color)}
            </div>
            {showColorDropdown && (
              <div className="absolute z-10 mt-2 w-full rounded border bg-white">
                {Object.entries(COLORS_MAP).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex cursor-pointer items-center p-2"
                    onClick={() => handleColorClick(value)}
                  >
                    <div
                      className="mr-2 h-6 w-6 rounded-full"
                      style={{ backgroundColor: value }}
                    />
                    <span>{key}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative mb-4">
            <label>Wybierz ikonę</label>
            <div
              className="flex cursor-pointer justify-center rounded border p-2"
              onClick={() => setShowIconDropdown(!showIconDropdown)}
            >
              <FontAwesomeIcon icon={ICONS[icon]} size="lg" />
            </div>
            {showIconDropdown && (
              <div className="absolute z-10 mt-2 grid w-full grid-cols-3 gap-2 rounded border bg-white p-2">
                {(Object.entries(ICONS_MAP) as [CategoryName, IconName][]).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex cursor-pointer justify-center p-2"
                      onClick={() => handleIconClick(value)}
                    >
                      <FontAwesomeIcon icon={ICONS[value]} size="lg" />
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={onClose} className="rounded border px-4 py-2">
              Anuluj
            </button>
            <button
              onClick={() => onSave(name, icon, color)}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Zapisz
            </button>
            {initialData && (
              <button
                onClick={onDelete}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Usuń
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryModal
