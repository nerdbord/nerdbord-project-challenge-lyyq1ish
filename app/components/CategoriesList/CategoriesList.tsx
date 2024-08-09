'use client'
import React, { useState, useEffect } from 'react'
import { createCategory, fetchCategories, updateCategory, deleteCategory } from '../../actions/categoryActions'
import CategoryModal from './CategoryModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Category, ICONS, IconName } from './iconTypes'

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [recentCategories, setRecentCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Category | null>(null)

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories()
      fetchedCategories.sort((a, b) => a.name.localeCompare(b.name))
      //@ts-ignore
      setCategories(fetchedCategories)
      const recent = fetchedCategories.slice(0, 3)
            //@ts-ignore
      setRecentCategories(recent)
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAddCategory = () => {
    setModalData(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setModalData(category)
    setIsModalOpen(true)
  }

  const handleSaveCategory = async (name: string, icon: IconName, color: string) => {
    try {
      if (modalData) {
        await updateCategory(modalData.id, name, icon, color)
      } else {
        await createCategory(name, icon, color)
      }
      await loadCategories()
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  const handleDeleteCategory = async () => {
    if (modalData) {
      try {
        await deleteCategory(modalData.id)
        await loadCategories()
        setIsModalOpen(false)
      } catch (error) {
        console.error('Failed to delete category:', error)
      }
    }
  }

  const groupedCategories: { [key: string]: Category[] } = categories.reduce((acc, category) => {
    const firstLetter = category.name.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(category)
    return acc
  }, {} as { [key: string]: Category[] })

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Kategorie</h1>
      <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Dodaj nową kategorię
      </button>

      {recentCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Ostatnio używane</h2>
          <ul className="flex flex-col justify-center gap-3 space-y-2">
            {recentCategories.map((category) => (
              <li
                key={category.id}
                className="flex cursor-pointer items-center justify-between space-x-3 rounded-xl bg-[#EEEBEB] p-3 text-lg"
                onClick={() => handleEditCategory(category)}
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={ICONS[category.icon]} color={category.color} />
                  <span>{category.name}</span>
                </div>
                <button className="text-blue-500">Edytuj</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-y-auto">
        {Object.entries(groupedCategories).map(([letter, categoryGroup]) => (
          <div key={letter}>
            <h2 className="mt-4 mb-2 text-lg font-semibold">{letter}</h2>
            <ul className="flex flex-col justify-center gap-3 space-y-2">
              {categoryGroup.map((category) => (
                <li
                  key={category.id}
                  className="flex cursor-pointer items-center justify-between space-x-3 rounded-xl bg-[#EEEBEB] p-3 text-lg"
                  onClick={() => handleEditCategory(category)}
                >
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={ICONS[category.icon]} color={category.color} />
                    <span>{category.name}</span>
                  </div>
                  <button className="text-blue-500">Edytuj</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory}
          initialData={modalData}
        />
      )}
    </div>
  )
}

export default CategoriesList