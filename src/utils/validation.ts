import { z } from 'zod';

// Base schemas
export const emailSchema = z
  .string()
  .email('Voer een geldig e-mailadres in')
  .min(1, 'E-mailadres is verplicht')
  .max(255, 'E-mailadres is te lang');

export const passwordSchema = z
  .string()
  .min(8, 'Wachtwoord moet minimaal 8 karakters bevatten')
  .max(128, 'Wachtwoord is te lang')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Wachtwoord moet minimaal 1 hoofdletter, 1 kleine letter en 1 cijfer bevatten');

export const nameSchema = z
  .string()
  .min(1, 'Naam is verplicht')
  .max(100, 'Naam is te lang')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Naam mag alleen letters, spaties, apostrofen en streepjes bevatten');

// User input schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Bevestig wachtwoord is verplicht'),
  fullName: nameSchema.optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Wachtwoorden komen niet overeen',
  path: ['confirmPassword'],
});

export const profileUpdateSchema = z.object({
  fullName: nameSchema.optional(),
  currentGoal: z.number().min(0).max(50).optional(),
  dailyGoal: z.number().min(0).max(10).optional(),
});

// Daily log schemas
export const dailyLogSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ongeldige datum format'),
  drinksCount: z.number().int().min(0).max(50, 'Aantal drankjes moet tussen 0 en 50 liggen'),
  notes: z.string().max(1000, 'Notities mogen maximaal 1000 karakters bevatten').optional(),
  mood: z.enum(['very_bad', 'bad', 'neutral', 'good', 'very_good']).optional(),
});

export const dailyLogUpdateSchema = dailyLogSchema.partial();

// Chat message schemas
export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Bericht mag niet leeg zijn')
    .max(2000, 'Bericht mag maximaal 2000 karakters bevatten')
    .refine((msg) => !/^\s*$/.test(msg), 'Bericht mag niet alleen uit spaties bestaan'),
});

// Voice journal schemas
export const voiceJournalSchema = z.object({
  notes: z.string().max(1000, 'Notities mogen maximaal 1000 karakters bevatten').optional(),
  audioUri: z.string().min(1, 'Audio opname is verplicht'),
});

// Motivation card schemas
export const motivationCardSchema = z.object({
  title: z
    .string()
    .min(1, 'Titel is verplicht')
    .max(200, 'Titel mag maximaal 200 karakters bevatten'),
  content: z
    .string()
    .min(1, 'Inhoud is verplicht')
    .max(2000, 'Inhoud mag maximaal 2000 karakters bevatten'),
  category: z.enum(['health', 'family', 'personal', 'financial', 'other']).optional(),
});

// Utility functions
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: (error as any).errors?.map((err: any) => err.message) || [],
      };
    }
    return {
      success: false,
      errors: ['Onbekende validatie fout'],
    };
  }
}

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const result = passwordSchema.safeParse(password);
  if (result.success) {
    return { valid: true, errors: [] };
  }
  return {
    valid: false,
    errors: (result.error as any).errors?.map((err: any) => err.message) || [],
  };
}

// Rate limiting validation
export function validateRateLimit(
  lastAttempt: number,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remainingTime: number } {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttempt;
  
  if (timeSinceLastAttempt < windowMs) {
    return {
      allowed: false,
      remainingTime: windowMs - timeSinceLastAttempt,
    };
  }
  
  return {
    allowed: true,
    remainingTime: 0,
  };
}

// File validation
export function validateAudioFile(file: File | Blob): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/webm'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Bestand is te groot (max 50MB)' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Ongeldig bestandstype. Alleen audio bestanden zijn toegestaan.' };
  }
  
  return { valid: true };
}

// Export types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type DailyLogInput = z.infer<typeof dailyLogSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type VoiceJournalInput = z.infer<typeof voiceJournalSchema>;
export type MotivationCardInput = z.infer<typeof motivationCardSchema>;
