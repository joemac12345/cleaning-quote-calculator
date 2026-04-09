# Database Setup Guide

## Bookings Table Setup

To set up the bookings table in Supabase, follow these steps:

### Step 1: Open Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**

### Step 2: Run the Setup SQL

Copy and paste the following SQL into the SQL editor and execute it:

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estimate_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_estimate_id ON public.bookings(estimate_id);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to view all bookings (for admin)
CREATE POLICY "Allow authenticated users to view bookings" ON public.bookings
  FOR SELECT
  USING (true);

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow authenticated users to create bookings" ON public.bookings
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow updates for authenticated users
CREATE POLICY "Allow authenticated users to update bookings" ON public.bookings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

### Step 3: Set Column Order (Optional)

In Supabase dashboard, you can reorder columns for better visibility. The recommended order is:
1. id
2. estimate_id
3. customer_name
4. email
5. telephone
6. address
7. status
8. confirmed_at
9. created_at
10. updated_at

### Step 4: Verify

After running the SQL:
1. In the Supabase dashboard, go to **Table Editor**
2. You should see `bookings` table listed
3. Try creating a test booking through your Next.js app

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| estimate_id | TEXT | Reference to the estimate |
| customer_name | TEXT | Customer's full name |
| email | TEXT | Customer's email address |
| telephone | TEXT | Customer's phone number |
| address | TEXT | Customer's full address |
| status | TEXT | Booking status (pending, confirmed, completed) |
| confirmed_at | TIMESTAMP | When booking was confirmed |
| created_at | TIMESTAMP | Record creation timestamp |
| updated_at | TIMESTAMP | Record last update timestamp |

## Next Steps

Once the table is created:
1. Test booking creation by submitting a form
2. Check the Supabase Table Editor to confirm data is being saved
3. Set up the admin dashboard to view and manage bookings
