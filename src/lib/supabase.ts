import { createClient } from '@supabase/supabase-js';

/* 
  INSTRUCCIONES:
  Reemplaza los valores de SUPABASE_URL y SUPABASE_ANON_KEY con tus propias credenciales.
  Puedes encontrarlas en la configuración de tu proyecto en el dashboard de Supabase (Settings > API).
*/

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'TU_SUPABASE_URL_AQUÍ';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_ANON_KEY_AQUÍ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
