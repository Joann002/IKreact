'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'

interface Book {
  id: string
  title: string
  author: string
  type: 'book' | 'manga'
  status: 'reading' | 'to-read' | 'completed' | 'dropped'
  progress: number
  totalPages?: number
  currentPage?: number
  rating?: number
  genre: string
  coverImage?: string
  notes?: string
  startDate?: string
  finishDate?: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Atomic Habits',
      author: 'James Clear',
      type: 'book',
      status: 'completed',
      progress: 100,
      totalPages: 320,
      currentPage: 320,
      rating: 5,
      genre: 'Self-Help',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      notes: 'Excellent practical guide for building good habits',
      startDate: '2024-01-01',
      finishDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Attack on Titan',
      author: 'Hajime Isayama',
      type: 'manga',
      status: 'completed',
      progress: 100,
      totalPages: 139,
      currentPage: 139,
      rating: 5,
      genre: 'Action/Drama',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      notes: 'Incredible story with amazing plot twists',
      startDate: '2023-06-01',
      finishDate: '2023-12-15'
    },
    {
      id: '3',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      type: 'book',
      status: 'reading',
      progress: 65,
      totalPages: 256,
      currentPage: 166,
      genre: 'Finance',
      coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      notes: 'Great insights on financial behavior',
      startDate: '2024-01-20'
    },
    {
      id: '4',
      title: 'One Piece',
      author: 'Eiichiro Oda',
      type: 'manga',
      status: 'reading',
      progress: 45,
      totalPages: 1000,
      currentPage: 450,
      rating: 4,
      genre: 'Adventure/Comedy',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      notes: 'Epic adventure with great world-building',
      startDate: '2023-08-01'
    },
    {
      id: '5',
      title: 'Dune',
      author: 'Frank Herbert',
      type: 'book',
      status: 'to-read',
      progress: 0,
      totalPages: 688,
      genre: 'Sci-Fi',
      coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=400&fit=crop'
    }
  ])

  const handleUpdateBook = (bookId: string, updates: Partial<Book>) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, ...updates } : book
    ))
  }

  const groupedBooks = {
    reading: books.filter(book => book.status === 'reading'),
    'to-read': books.filter(book => book.status === 'to-read'),
    completed: books.filter(book => book.status === 'completed'),
    dropped: books.filter(book => book.status === 'dropped')
  }

  const BookCard = ({ book }: { book: Book }) => {
    const handleStatusChange = () => {
      const statusOrder: Book['status'][] = ['to-read', 'reading', 'completed', 'dropped']
      const currentIndex = statusOrder.indexOf(book.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      handleUpdateBook(book.id, { status: statusOrder[nextIndex] })
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'reading':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
        case 'completed':
          return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        case 'dropped':
          return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      }
    }

    const renderStars = (rating?: number) => {
      if (!rating) return null
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fas fa-star text-xs ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
      )
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* Cover */}
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className={`fas ${book.type === 'manga' ? 'fa-dragon' : 'fa-book'} text-4xl text-gray-400`}></i>
            </div>
          )}
          
          {/* Type Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
              <i className={`fas ${book.type === 'manga' ? 'fa-dragon' : 'fa-book'} mr-1`}></i>
              {book.type === 'manga' ? 'Manga' : 'Book'}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <button
              onClick={handleStatusChange}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${getStatusColor(book.status)}`}
            >
              {book.status === 'to-read' ? 'To Read' : 
               book.status === 'reading' ? 'Reading' :
               book.status === 'completed' ? 'Completed' : 'Dropped'}
            </button>
          </div>

          {/* Progress Bar */}
          {book.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <div className="w-full bg-gray-600 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${book.progress}%` }}
                ></div>
              </div>
              <p className="text-white text-xs mt-1">
                {book.currentPage}/{book.totalPages} pages ({book.progress}%)
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {book.title}
          </h4>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            by {book.author}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>{book.genre}</span>
            {book.totalPages && <span>{book.totalPages} pages</span>}
          </div>

          {/* Rating */}
          {book.rating && (
            <div className="flex items-center justify-between mb-2">
              {renderStars(book.rating)}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {book.rating}/5
              </span>
            </div>
          )}

          {/* Notes */}
          {book.notes && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
              {book.notes}
            </p>
          )}

          {/* Dates */}
          {(book.startDate || book.finishDate) && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {book.startDate && <div>Started: {new Date(book.startDate).toLocaleDateString()}</div>}
              {book.finishDate && <div>Finished: {new Date(book.finishDate).toLocaleDateString()}</div>}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm">
              Details
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Books & Manga</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your reading journey</p>
          </div>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 flex items-center gap-2">
            <i className="fas fa-plus"></i>
            Add Book
          </button>
        </div>

        {/* Reading Stats */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Reading Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{groupedBooks.reading.length}</div>
              <div className="text-yellow-100 text-sm">Currently Reading</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{groupedBooks.completed.length}</div>
              <div className="text-yellow-100 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{groupedBooks['to-read'].length}</div>
              <div className="text-yellow-100 text-sm">To Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {books.reduce((total, book) => total + (book.currentPage || 0), 0)}
              </div>
              <div className="text-yellow-100 text-sm">Pages Read</div>
            </div>
          </div>
        </div>

        {/* Book Sections */}
        <div className="space-y-8">
          {/* Currently Reading */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-book-open text-blue-500"></i>
                Currently Reading
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm px-2 py-1 rounded-full">
                {groupedBooks.reading.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedBooks.reading.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* To Read */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-list text-gray-500"></i>
                To Read
              </h3>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full">
                {groupedBooks['to-read'].length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedBooks['to-read'].map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* Completed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                Completed
              </h3>
              <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm px-2 py-1 rounded-full">
                {groupedBooks.completed.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupedBooks.completed.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
