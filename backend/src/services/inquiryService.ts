import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { supabase } from '../config/supabase.js';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'spam';
  createdAt: string;
  updatedAt?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const TMP_INQUIRIES_FILE = path.join(os.tmpdir(), 'csa_inquiries.json');

// Ensure data directory exists if possible
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // Read-only filesystem in Vercel serverless environment
}

const initialInquiries: Inquiry[] = [
  {
    id: 'b1a2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Muhammad Aftab',
    email: 'creativestackagency513@gmail.com',
    service: 'Full Stack Web Development',
    message: 'Welcome to Creative Stack Agency inquiries portal. All user messages from the Contact section will appear here in real time.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

class InquiryService {
  private inquiries: Inquiry[] = [];

  constructor() {
    this.init();
  }

  private getActiveFilePath(): string {
    try {
      if (fs.existsSync(INQUIRIES_FILE)) return INQUIRIES_FILE;
    } catch {
      // ignore
    }
    return TMP_INQUIRIES_FILE;
  }

  private init() {
    const file = this.getActiveFilePath();
    if (fs.existsSync(file)) {
      try {
        const raw = fs.readFileSync(file, 'utf-8');
        const parsed = JSON.parse(raw);
        this.inquiries = Array.isArray(parsed) && parsed.length > 0 ? parsed : [...initialInquiries];
      } catch {
        this.inquiries = [...initialInquiries];
        this.persistInquiries();
      }
    } else {
      this.inquiries = [...initialInquiries];
      this.persistInquiries();
    }

    // Trigger initial sync with cloud database
    void this.syncWithSupabaseAsync();
  }

  private persistInquiries() {
    try {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(this.inquiries, null, 2), 'utf-8');
      return;
    } catch {
      // Fallback for Vercel Serverless environment
      try {
        fs.writeFileSync(TMP_INQUIRIES_FILE, JSON.stringify(this.inquiries, null, 2), 'utf-8');
      } catch (err) {
        console.error('Failed to persist inquiries to tmp file:', err);
      }
    }
  }

  public async syncWithSupabaseAsync(): Promise<void> {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(100);

      if (error) {
        console.warn('Supabase inquiries fetch info:', error.message);
        return;
      }

      if (data && data.length > 0) {
        const localMap = new Map(this.inquiries.map((i) => [i.id, i]));
        for (const item of data) {
          const id = item.id || crypto.randomUUID();
          localMap.set(id, {
            id,
            name: item.name || 'Anonymous',
            email: item.email || '',
            service: item.service || 'General Inquiry',
            message: item.message || '',
            status: item.status || 'new',
            createdAt: item.createdAt || new Date().toISOString(),
          });
        }

        this.inquiries = Array.from(localMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.persistInquiries();
      }
    } catch (err: any) {
      console.warn('Supabase inquiries sync error:', err.message);
    }
  }

  public async getInquiriesAsync(): Promise<Inquiry[]> {
    await this.syncWithSupabaseAsync();
    return this.getInquiries();
  }

  public getInquiries(): Inquiry[] {
    return [...this.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getInquiryById(id: string): Inquiry | null {
    return this.inquiries.find((i) => i.id === id) || null;
  }

  public async createInquiryAsync(data: {
    name: string;
    email: string;
    service: string;
    message: string;
    status?: Inquiry['status'];
    createdAt?: string;
  }): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      service: data.service || 'General Inquiry',
      message: data.message,
      status: (data.status as Inquiry['status']) || 'new',
      createdAt: data.createdAt || new Date().toISOString(),
    };

    // Prepend to local memory and persist
    this.inquiries.unshift(newInquiry);
    this.persistInquiries();

    // Persist to Supabase cloud database
    try {
      const { error } = await supabase.from('inquiries').insert([{
        id: newInquiry.id,
        name: newInquiry.name,
        email: newInquiry.email,
        service: newInquiry.service,
        message: newInquiry.message,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt,
      }]);

      if (error) {
        console.error('Supabase inquiry insert policy error:', error.message, error.code);
      } else {
        console.log('✓ Successfully saved inquiry to Supabase cloud database:', newInquiry.id);
      }
    } catch (err: any) {
      console.error('Supabase inquiry insert exception:', err.message);
    }

    return newInquiry;
  }

  public async updateInquiryAsync(id: string, updates: Partial<Inquiry>): Promise<Inquiry | null> {
    const idx = this.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    this.inquiries[idx] = {
      ...this.inquiries[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.persistInquiries();

    try {
      await supabase.from('inquiries').update(this.inquiries[idx]).eq('id', id);
    } catch {
      // ignore
    }

    return this.inquiries[idx];
  }

  public async deleteInquiryAsync(id: string): Promise<boolean> {
    const idx = this.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return false;

    this.inquiries.splice(idx, 1);
    this.persistInquiries();

    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch {
      // ignore
    }

    return true;
  }
}

export const inquiryService = new InquiryService();
