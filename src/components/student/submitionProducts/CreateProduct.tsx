'use client'

import React, { useState, useRef } from 'react'
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  X,
  Image as ImageIcon,
  Film
} from 'lucide-react'

export const Submit_CreateProductForm = () => {
  // ১. ফর্ম স্টেট ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    botName: '',
    country: '',
    amount: '',
    date: ''
  })
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // অনুমোদিত ফাইল টাইপ এবং সাইজ
  const allowedTypes = [
    'application/pdf', 
    'image/png', 
    'image/jpeg', 
    'image/jpg', 
    'image/webp', 
    'video/mp4', 
    'video/webm', 
    'video/ogg'
  ];
  const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes

  // ২. ইনপুট চেঞ্জ হ্যান্ডলার
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // ফাইল প্রসেস করার ফাংশন (ভ্যালিডেশন এবং প্রিভিউ)
  const processFile = (file: File) => {
    setFileError('') // আগের এরর ক্লিয়ার

    // টাইপ চেক
    if (!allowedTypes.includes(file.type)) {
      setFileError('Invalid file type. Please upload PDF, Image, or Video.')
      return
    }

    // সাইজ চেক
    if (file.size > maxFileSize) {
      setFileError('File size exceeds the 50MB limit.')
      return
    }

    setSelectedFile(file)
    
    // যদি ফাইলটি ইমেজ বা ভিডিও হয়, তবে প্রিভিউ URL তৈরি করবে
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(null) // PDF হলে প্রিভিউ দেখাবে না
    }
  }

  // ৩. ফাইল ড্র্যাগ এন্ড ড্রপ হ্যান্ডলার
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileError('')
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  // ৪. ফর্ম সাবমিশন হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setFileError('Please upload an asset (PDF, Image, or Video)')
      return
    }

    setIsSubmitting(true)

    const payload = new FormData()
    payload.append('botName', formData.botName)
    payload.append('country', formData.country)
    payload.append('amount', formData.amount)
    payload.append('date', formData.date)
    payload.append('assetFile', selectedFile)

    try {
      // --- ব্যাকএন্ড API কল এখানে করতে হবে ---
      console.log('Form Submitted Successfully!', Object.fromEntries(payload))
      alert('Product submitted successfully!')
      
      // সাবমিট হলে ফর্ম রিসেট
      setFormData({ botName: '', country: '', amount: '', date: '' })
      removeFile()

    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // সাইডবারের স্ট্যাটিক ডেটা
  const checkListItems = [
    'High-resolution thumbnails',
    'Course outline included',
    'Pricing structure defined',
    'Clear instructions provided'
  ]

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-[#ffff] px-6 py-4">
        <p className="text-[#2260e6] text-2xl font-semibold tracking-widest uppercase">Creator Portal</p>
        <h1 className="text-black text-2xl sm:text-3xl font-bold mt-1">Submit Product</h1>
        <p className="text-gray-600 mt-2">Ready to monetize your expertise? Fill in the details below to list your course material or digital asset on the marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">
          
          {/* বাম পাশ: ফর্ম ইনপুট */}
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bot Name */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Bot Name</label>
                <input
                  type="text"
                  name="botName"
                  value={formData.botName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[#111827]"
                  placeholder="e.g. TradeBot Pro"
                />
              </div>

              {/* Country Name / Code */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Country Name / Code</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[#111827]"
                  placeholder="e.g. US / United States"
                />
              </div>

              {/* Amount $ */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Amount $</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[#111827]"
                  placeholder="e.g. 49.99"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-[#111827] mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[#111827]"
                />
              </div>
            </div>

            {/* Upload Assets (Drag & Drop) */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">Upload Assets</label>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging ? 'border-[#1447E6] bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-[#F9FAFB]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="application/pdf, image/png, image/jpeg, image/jpg, image/webp, video/mp4, video/webm, video/ogg"
                  className="hidden"
                />
                
                <div className="flex flex-col items-center justify-center space-y-2">
                  <UploadCloud className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-600 font-medium">
                    <span className="text-[#1447E6] font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, Images (PNG, JPG), or Videos (MP4) (Max 50MB)</p>
                </div>
              </div>

              {/* এরর মেসেজ */}
              {fileError && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <X className="w-4 h-4" /> {fileError}
                </p>
              )}

              {/* ফাইল সিলেক্ট হলে প্রিভিউ দেখাবে */}
              {selectedFile && (
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 relative">
                  <button 
                    type="button" 
                    onClick={removeFile} 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col items-center gap-3">
                    {/* ইমেজ প্রিভিউ */}
                    {previewUrl && selectedFile.type.startsWith('image/') && (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-40 rounded-md object-contain"
                      />
                    )}

                    {/* ভিডিও প্রিভিউ */}
                    {previewUrl && selectedFile.type.startsWith('video/') && (
                      <video 
                        src={previewUrl} 
                        controls 
                        className="max-h-40 rounded-md"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {/* PDF ফাইল আইকন */}
                    {selectedFile.type === 'application/pdf' && (
                      <div className="flex items-center gap-2 text-red-500">
                        <FileText className="w-8 h-8" />
                      </div>
                    )}

                    {/* ফাইলের নাম এবং সাইজ */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-800 truncate max-w-[250px] sm:max-w-md">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ডান পাশ: সাইডবার ইনফো */}
          <div className="space-y-6">
            
            {/* Quality Checklist */}
            <div className="bg-[#F5F7FF] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#111827] mb-4">Quality Checklist</h3>
              <ul className="space-y-3">
                {checkListItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help? */}
            <div className="bg-[#393938] p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#CA8A04]" />
                <h3 className="text-lg font-bold text-[#ffffff]">Need help?</h3>
              </div>
              <p className="text-sm text-[#ffffff] mb-4 leading-relaxed">
                Our creator support team is available 24/7 to assist you with your submission process.
              </p>
              <button type="button" className="text-[#14e614] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Read Documentation <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Approval Rate */}
            <div className="bg-[#DCFCE7] p-6 rounded-2xl text-center">
              <h4 className="text-4xl font-bold text-[#16A34A]">98%</h4>
              <p className="text-sm font-semibold text-[#15803D] mt-1">Approval Rate</p>
              <p className="text-xs text-[#166534] mt-1 opacity-80">Based on last 30 days</p>
            </div>
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2 transition-all ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#1447E6] hover:bg-[#0f3bc2] shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}