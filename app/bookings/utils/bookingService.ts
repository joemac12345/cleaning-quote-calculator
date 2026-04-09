import { supabase } from '@/app/utils/supabase';

export interface BookingData {
  estimate_id: string;
  customer_name: string;
  email: string;
  telephone: string;
  address: string;
}

export async function createBooking(bookingData: BookingData): Promise<{success: boolean; id?: string; error?: string}> {
  try {
    // Prepare booking data for database
    const dataToInsert = {
      estimate_id: bookingData.estimate_id,
      customer_name: bookingData.customer_name,
      email: bookingData.email,
      telephone: bookingData.telephone,
      address: bookingData.address,
      status: 'pending',
      confirmed_at: null,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([dataToInsert])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendBookingEmails(
  booking: BookingData & { id: string },
  estimateData: Record<string, any>
): Promise<{success: boolean; error?: string}> {
  try {
    // Placeholder function for sending emails
    // TODO: Integrate with Resend, SendGrid, or other email service
    
    // Admin email notification
    const adminEmailPayload = {
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com',
      subject: `New Booking Confirmation - ${booking.customer_name}`,
      body: `
        New booking received:
        
        Customer: ${booking.customer_name}
        Email: ${booking.email}
        Phone: ${booking.telephone}
        Address: ${booking.address}
        
        Booking ID: ${booking.id}
        
        Please arrange a date and time with the customer.
      `,
    };

    // Customer confirmation email
    const customerEmailPayload = {
      to: booking.email,
      subject: 'Booking Confirmation - Service Request Received',
      body: `
        Thank you for booking with us!
        
        We've received your booking request. Our team will contact you shortly to confirm a date and time for your cleaning service.
        
        Your Details:
        Name: ${booking.customer_name}
        Phone: ${booking.telephone}
        Address: ${booking.address}
        
        Booking Reference: ${booking.id}
      `,
    };

    // Log payloads for now (will be replaced with actual email service call)
    console.log('Admin email payload:', adminEmailPayload);
    console.log('Customer email payload:', customerEmailPayload);

    // TODO: Call actual email service
    // const adminEmailResult = await sendEmail(adminEmailPayload);
    // const customerEmailResult = await sendEmail(customerEmailPayload);

    return { success: true };
  } catch (error) {
    console.error('Error sending booking emails:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getBookingById(id: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase fetch error:', error);
      return { success: false, data: null, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getBookingsByEstimateId(estimateId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('estimate_id', estimateId);

    if (error) {
      console.error('Supabase fetch error:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
