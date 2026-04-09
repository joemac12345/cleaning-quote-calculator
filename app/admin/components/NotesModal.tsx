'use client';

import { useState, useRef, useEffect } from 'react';
import { addNote, editNote, deleteNote, repairDuplicateNoteIds, EstimateNote } from '@/app/utils/estimateService';

interface NotesModalProps {
  isOpen: boolean;
  estimateId: string;
  customerName: string;
  notes: EstimateNote[] | string | null;
  onClose: () => void;
  onNotesUpdate: (updatedNotes: EstimateNote[]) => void;
}

export function NotesModal({ isOpen, estimateId, customerName, notes, onClose, onNotesUpdate }: NotesModalProps) {
  const [newNoteText, setNewNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [inputHeight, setInputHeight] = useState('44px');
  const [editHeight, setEditHeight] = useState('80px');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustInputHeight = () => {
    if (inputTextareaRef.current) {
      inputTextareaRef.current.style.height = '44px';
      const scrollHeight = inputTextareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 44), 200);
      setInputHeight(`${newHeight}px`);
      inputTextareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const adjustEditHeight = () => {
    if (editTextareaRef.current) {
      editTextareaRef.current.style.height = '80px';
      const scrollHeight = editTextareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 80), 200);
      setEditHeight(`${newHeight}px`);
      editTextareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const parseNotes = (): EstimateNote[] => {
    if (!notes) return [];

    // If already an array of note objects
    if (Array.isArray(notes) && notes.every(item => item && typeof item === 'object' && 'id' in item && 'text' in item)) {
      return notes;
    }

    // If it's a string, try parsing
    if (typeof notes === 'string') {
      let attemptedParse = notes;
      let depth = 0;

      while (typeof attemptedParse === 'string' && attemptedParse.trim().startsWith('[') && depth < 3) {
        try {
          attemptedParse = JSON.parse(attemptedParse);
          depth++;
        } catch (e) {
          break;
        }
      }

      if (Array.isArray(attemptedParse) && attemptedParse.every(item => item && typeof item === 'object' && 'id' in item && 'text' in item)) {
        return attemptedParse;
      }

      // Legacy string format
      if (notes.trim()) {
        return [{ id: '0', text: notes, timestamp: new Date().toISOString() }];
      }
    }

    return [];
  };

  const notesList = parseNotes();

  useEffect(() => {
    scrollToBottom();
  }, [notesList.length]);

  const formatNoteTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddNote = async () => {
    if (!newNoteText.trim()) return;

    setIsLoading(true);
    try {
      const result = await addNote(estimateId, newNoteText);
      if (result.success && result.data) {
        // Parse the notes in case they come back as JSON string
        let updatedNotes = result.data.notes;
        if (updatedNotes === null || updatedNotes === undefined) {
          updatedNotes = [];
        } else if (typeof updatedNotes === 'string') {
          try {
            updatedNotes = JSON.parse(updatedNotes);
            if (!Array.isArray(updatedNotes)) {
              updatedNotes = [];
            }
          } catch (e) {
            console.error('Failed to parse notes:', e);
            updatedNotes = [];
          }
        }
        if (Array.isArray(updatedNotes)) {
          onNotesUpdate(updatedNotes);
          setNewNoteText('');
          setInputHeight('44px');
        } else {
          alert('Error: Notes data is invalid');
        }
      } else {
        alert(`Error adding note: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error in handleAddNote:', error);
      alert('Failed to add note');
    }
    setIsLoading(false);
  };

  const handleEditNote = async (noteId: string) => {
    if (!editingNoteText.trim()) return;

    setIsLoading(true);
    try {
      const result = await editNote(estimateId, noteId, editingNoteText);
      if (result.success && result.data) {
        // Parse the notes in case they come back as JSON string
        let updatedNotes = result.data.notes;
        if (updatedNotes === null || updatedNotes === undefined) {
          updatedNotes = [];
        } else if (typeof updatedNotes === 'string') {
          try {
            updatedNotes = JSON.parse(updatedNotes);
            if (!Array.isArray(updatedNotes)) {
              updatedNotes = [];
            }
          } catch (e) {
            console.error('Failed to parse notes:', e);
            updatedNotes = [];
          }
        }
        if (Array.isArray(updatedNotes)) {
          onNotesUpdate(updatedNotes);
          setEditingNoteId(null);
          setEditingNoteText('');
          setEditHeight('80px');
        } else {
          alert('Error: Notes data is invalid');
        }
      } else {
        alert(`Error updating note: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error in handleEditNote:', error);
      alert('Failed to update note');
    }
    setIsLoading(false);
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Delete this note?')) return;

    setIsLoading(true);
    try {
      const result = await deleteNote(estimateId, noteId);
      if (result.success && result.data) {
        // Parse the notes in case they come back as JSON string
        let updatedNotes = result.data.notes;
        if (updatedNotes === null || updatedNotes === undefined) {
          updatedNotes = [];
        } else if (typeof updatedNotes === 'string') {
          try {
            updatedNotes = JSON.parse(updatedNotes);
            if (!Array.isArray(updatedNotes)) {
              updatedNotes = [];
            }
          } catch (e) {
            console.error('Failed to parse notes:', e);
            updatedNotes = [];
          }
        }
        if (Array.isArray(updatedNotes)) {
          onNotesUpdate(updatedNotes);
        } else {
          alert('Error: Notes data is invalid');
        }
      } else {
        alert(`Error deleting note: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error in handleDeleteNote:', error);
      alert('Failed to delete note');
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden rounded-lg border border-gray-300">
        {/* Header */}
        <div className="text-white px-4 sm:px-6 py-4 flex justify-between items-start sm:items-center gap-2 bg-primary">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-poppins font-semibold break-words">{customerName}</h2>
            <p className="text-xs sm:text-sm opacity-90 font-inter font-normal">Notes & Messages</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition hover:bg-white hover:bg-opacity-20 flex-shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto pt-6 px-4 pb-4 bg-gray-50 space-y-4">
          {notesList.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-lg font-poppins font-semibold">No notes yet</p>
                <p className="text-sm font-inter font-normal">Start the conversation by adding a note</p>
              </div>
            </div>
          ) : (
            notesList.map((note) => (
              <div key={note.id} className="message-container">
                {editingNoteId === note.id ? (
                  // Edit Mode
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <textarea
                      ref={editTextareaRef}
                      value={editingNoteText}
                      onChange={(e) => {
                        setEditingNoteText(e.target.value);
                        adjustEditHeight();
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-inter font-normal"
                      style={{ height: editHeight, maxHeight: '200px', minHeight: '80px' }}
                      disabled={isLoading}
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditNote(note.id)}
                        disabled={isLoading || !editingNoteText.trim()}
                        className="btn-primary px-4 py-1.5 hover:opacity-90 disabled:opacity-50 text-white text-sm font-poppins font-semibold rounded transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        disabled={isLoading}
                        className="px-4 py-1.5 bg-gray-300 hover:opacity-90 text-gray-900 text-sm font-poppins font-semibold rounded transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Message Display
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-primary">
                        N
                      </div>
                    </div>
                    {/* Message Bubble */}
                    <div className="flex-1 max-w-xl">
                      <div className="bg-white rounded-lg p-3 border border-gray-300 shadow-sm">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-inter font-normal">{note.text}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 px-2">
                        <p className="text-xs text-gray-500 font-inter font-normal">{formatNoteTime(note.timestamp)}</p>
                        <button
                          onClick={() => {
                            setEditingNoteId(note.id);
                            setEditingNoteText(note.text);
                          }}
                          disabled={isLoading}
                          className="text-xs text-blue-500 hover:text-blue-700 font-poppins font-semibold transition disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          disabled={isLoading}
                          className="text-xs text-red-500 hover:text-red-700 font-poppins font-semibold transition disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-300 bg-white p-3 sm:p-4">
          <div className="flex gap-2 items-flex-end">
            <textarea
              ref={inputTextareaRef}
              value={newNoteText}
              onChange={(e) => {
                setNewNoteText(e.target.value);
                adjustInputHeight();
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleAddNote();
                }
              }}
              placeholder="Add a note... (Ctrl+Enter to send)"
              className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-inter font-normal"
              style={{ height: inputHeight, maxHeight: '200px', minHeight: '44px' }}
              disabled={isLoading}
            />
            <button
              onClick={handleAddNote}
              disabled={isLoading || !newNoteText.trim()}
              className="btn-primary flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-white font-bold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send note"
            >
              {isLoading ? '...' : '➤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
