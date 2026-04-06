import { supabase } from '@/app/utils/supabase';
import { calculateQuote } from '@/app/utils/quoteCalculation';

export interface EstimateData {
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
  property_type: string;
  service_type: string;
  frequency: string;
  form_data: Record<string, any>;
  first_clean_price: number;
  maintenance_price: number;
  first_clean_hours: number;
  first_clean_minutes: number;
  maintenance_hours: number;
  maintenance_minutes: number;
  created_at?: string;
}

export async function saveEstimateToDatabase(formData: Record<string, any>): Promise<{success: boolean; id?: string; error?: string}> {
  try {
    // Calculate quote
    const frequency = formData.frequency || 'one-off';
    const quoteStats = calculateQuote(formData, frequency);

    if (!quoteStats) {
      return { success: false, error: 'Failed to calculate quote' };
    }

    // Prepare estimate data
    const estimateData: EstimateData = {
      customer_name: formData.name || '',
      email: formData.email || '',
      telephone: formData.telephone || '',
      address: typeof formData.address === 'object' 
        ? `${formData.address?.street}, ${formData.address?.city} ${formData.address?.postcode || ''}`.trim()
        : formData.address || '',
      property_type: formData.property_type || '',
      service_type: formData.service_type || '',
      frequency: frequency,
      form_data: formData,
      first_clean_price: quoteStats.firstCleanPrice,
      maintenance_price: quoteStats.maintenancePrice,
      first_clean_hours: quoteStats.firstCleanHours,
      first_clean_minutes: quoteStats.firstCleanMinutes,
      maintenance_hours: quoteStats.maintenanceHours,
      maintenance_minutes: quoteStats.maintenanceMinutes,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('estimates')
      .insert([estimateData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Error saving estimate:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getEstimates(limit = 100, offset = 0) {
  try {
    const { data, error, count } = await supabase
      .from('estimates')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase fetch error:', error);
      return { success: false, data: [], count: 0, error: error.message };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching estimates:', error);
    return { success: false, data: [], count: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function searchEstimates(searchTerm: string, filters?: { frequency?: string; property_type?: string; status?: string }) {
  try {
    let query = supabase.from('estimates').select('*', { count: 'exact' });

    if (searchTerm) {
      query = query.or(
        `customer_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,telephone.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`
      );
    }

    if (filters?.frequency) {
      query = query.eq('frequency', filters.frequency);
    }

    if (filters?.property_type) {
      query = query.eq('property_type', filters.property_type);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error, count } = await query.order('created_at', { ascending: false });

    if (error) {
      return { success: false, data: [], count: 0, error: error.message };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error searching estimates:', error);
    return { success: false, data: [], count: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteEstimate(id: string) {
  try {
    const { error } = await supabase
      .from('estimates')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting estimate:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateEstimate(id: string, updates: Partial<EstimateData>) {
  try {
    const { data, error } = await supabase
      .from('estimates')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error updating estimate:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateEstimateStatus(id: string, status: 'new' | 'reviewed' | 'quoted' | 'accepted' | 'scheduled' | 'completed' | 'cancelled') {
  try {
    const { data, error } = await supabase
      .from('estimates')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error updating estimate status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export interface EstimateNote {
  id: string;
  text: string;
  timestamp: string;
}

function generateUniqueNoteId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function normalizeNotes(notes: any): EstimateNote[] {
  if (!notes) return [];
  
  // If already an array of objects, return it
  if (Array.isArray(notes) && notes.every(item => item && typeof item === 'object' && 'id' in item && 'text' in item)) {
    return notes;
  }
  
  // If it's a stringified JSON array - try parsing multiple times for deeply nested JSON
  if (typeof notes === 'string' && notes.trim().startsWith('[')) {
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
    
    // Check if we successfully parsed it into a valid notes array
    if (Array.isArray(attemptedParse) && attemptedParse.every(item => item && typeof item === 'object' && 'id' in item && 'text' in item)) {
      return attemptedParse;
    }
  }
  
  // If it's a legacy string note (but not JSON)
  if (typeof notes === 'string' && notes.trim() && !notes.trim().startsWith('[')) {
    return [{ id: generateUniqueNoteId(), text: notes, timestamp: new Date().toISOString() }];
  }
  
  // If array but contains unexpected format
  if (Array.isArray(notes)) {
    return [];
  }
  
  return [];
}

export async function addNote(id: string, noteText: string) {
  try {
    // Get current estimate to access existing notes
    const { data: currentData, error: fetchError } = await supabase
      .from('estimates')
      .select('notes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    // Parse and normalize existing notes
    let notesList = normalizeNotes(currentData?.notes);

    // Add new note
    const newNote: EstimateNote = {
      id: generateUniqueNoteId(),
      text: noteText,
      timestamp: new Date().toISOString(),
    };
    notesList.push(newNote);

    // Update database - store as JSON string for consistency
    const { data, error } = await supabase
      .from('estimates')
      .update({ notes: JSON.stringify(notesList) })
      .eq('id', id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function editNote(id: string, noteId: string, newText: string) {
  try {
    // Get current estimate
    const { data: currentData, error: fetchError } = await supabase
      .from('estimates')
      .select('notes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    let notesList = normalizeNotes(currentData?.notes);
    
    // Find and update the note
    const noteIndex = notesList.findIndex(n => n.id === noteId);
    if (noteIndex === -1) {
      return { success: false, error: 'Note not found' };
    }

    notesList[noteIndex].text = newText;

    // Update database - store as JSON string for consistency
    const { data, error } = await supabase
      .from('estimates')
      .update({ notes: JSON.stringify(notesList) })
      .eq('id', id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error editing note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteNote(id: string, noteId: string) {
  try {
    // Get current estimate
    const { data: currentData, error: fetchError } = await supabase
      .from('estimates')
      .select('notes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    let notesList = normalizeNotes(currentData?.notes);
    
    // Remove the note
    notesList = notesList.filter(n => n.id !== noteId);

    // Update database - store as JSON string for consistency
    const { data, error } = await supabase
      .from('estimates')
      .update({ notes: JSON.stringify(notesList) })
      .eq('id', id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error deleting note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateEstimateNotes(id: string, notes: string) {
  // Deprecated: use addNote() instead
  return addNote(id, notes);
}

export async function repairDuplicateNoteIds(id: string) {
  try {
    const { data: currentData, error: fetchError } = await supabase
      .from('estimates')
      .select('notes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    let notesList = normalizeNotes(currentData?.notes);

    // Check for duplicate IDs and fix them
    const seenIds = new Set<string>();
    const hasChanges = notesList.some(note => {
      if (seenIds.has(note.id)) {
        return true; // Has duplicates
      }
      seenIds.add(note.id);
      return false;
    });

    if (hasChanges) {
      // Regenerate IDs for duplicates
      seenIds.clear();
      notesList = notesList.map(note => {
        if (seenIds.has(note.id)) {
          return { ...note, id: generateUniqueNoteId() };
        }
        seenIds.add(note.id);
        return note;
      });

      // Save fixed notes - store as JSON string for consistency
      const { error } = await supabase
        .from('estimates')
        .update({ notes: JSON.stringify(notesList) })
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: true, data: notesList };
  } catch (error) {
    console.error('Error repairing duplicate note IDs:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function repairCorruptedNotes(id: string) {
  try {
    const { data: currentData, error: fetchError } = await supabase
      .from('estimates')
      .select('notes')
      .eq('id', id)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    let notesList = normalizeNotes(currentData?.notes);
    let hasCorruptedNotes = false;

    // Check for and fix corrupted notes (those with JSON in text field)
    const repairedNotes: EstimateNote[] = [];
    for (const note of notesList) {
      // Check if the text field contains JSON (starts with [ or {)
      if (typeof note.text === 'string' && (note.text.trim().startsWith('[') || note.text.trim().startsWith('{'))) {
        try {
          const parsed = JSON.parse(note.text);
          // If it parsed as an array of notes, flatten them
          if (Array.isArray(parsed) && parsed.every(item => item && typeof item === 'object' && 'id' in item)) {
            repairedNotes.push(...parsed);
            hasCorruptedNotes = true;
            continue;
          }
        } catch (e) {
          // Not valid JSON, keep as-is
        }
      }
      repairedNotes.push(note);
    }

    if (hasCorruptedNotes) {
      // Save repaired notes - store as JSON string
      const { error } = await supabase
        .from('estimates')
        .update({ notes: JSON.stringify(repairedNotes) })
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }
    }

    return { success: true, data: repairedNotes, repaired: hasCorruptedNotes };
  } catch (error) {
    console.error('Error repairing corrupted notes:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
