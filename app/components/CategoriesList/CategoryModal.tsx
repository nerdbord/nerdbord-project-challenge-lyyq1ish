import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ICONS, ICONS_MAP, CategoryName, IconName, Category, COLORS_MAP } from './iconTypes'

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
  const [color, setColor] = useState(initialData?.color || Object.values(COLORS_MAP)[0])
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
    const entry = Object.entries(COLORS_MAP).find(([_, value]) => value === colorValue);
    return entry ? entry[0] : '';
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Edytuj kategorię' : 'Dodaj nową kategorię'}
        </h2>

        <div className="mb-4">
          <label>Nazwa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4 relative">
          <label>Kolor</label>
          <div
            className="p-2 border rounded cursor-pointer"
            onClick={() => setShowColorDropdown(!showColorDropdown)}
            style={{ backgroundColor: color }}
          >
            {getColorName(color)}
          </div>
          {showColorDropdown && (
            <div className="absolute z-10 w-full bg-white border rounded mt-2">
              {Object.entries(COLORS_MAP).map(([key, value]) => (
                <div
                  key={key}
                  className="p-2 cursor-pointer flex items-center"
                  onClick={() => handleColorClick(value)}
                >
                  <div
                    className="w-6 h-6 rounded-full mr-2"
                    style={{ backgroundColor: value }}
                  />
                  <span>{key}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4 relative">
          <label>Wybierz ikonę</label>
          <div
            className="p-2 border rounded cursor-pointer flex justify-center"
            onClick={() => setShowIconDropdown(!showIconDropdown)}
          >
            <FontAwesomeIcon icon={ICONS[icon]} size="lg" />
          </div>
          {showIconDropdown && (
            <div className="absolute z-10 w-full bg-white border rounded mt-2 grid grid-cols-3 gap-2 p-2">
              {(Object.entries(ICONS_MAP) as [CategoryName, IconName][]).map(([key, value]) => (
                <div
                  key={key}
                  className="p-2 cursor-pointer flex justify-center"
                  onClick={() => handleIconClick(value)}
                >
                  <FontAwesomeIcon icon={ICONS[value]} size="lg" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Anuluj
          </button>
          <button
            onClick={() => onSave(name, icon, color)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Zapisz
          </button>
          {initialData && (
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Usuń
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryModal