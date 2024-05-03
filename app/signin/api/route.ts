import { createClient } from '@/utils/supabase/server';

export async function POST() {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        return Response.json( {user: user}, {status: 201} )
      } catch (error) {
        console.error('Error fetching user data:', error);
        return Response.json( {user: undefined}, {status: 500} )
      }
  }