import fs from 'fs';
import path from 'path';
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

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

const initialInquiries: Inquiry[] = [
  {
    id: 'inq-welcome-01',
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

  private init() {
    if (fs.existsSync(INQUIRIES_FILE)) {
      try {
        const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.inquiries = Array.isArray(parsed) ? parsed : [...initialInquiries];
      } catch {
        this.inquiries = [...initialInquiries];
        this.persistInquiries();
      }
    } else {
      this.inquiries = [...initialInquiries];
      this.persistInquiries();
    }

    // Attempt to sync from Supabase if table exists and has rows
    this.syncWithSupabaseAsync();
  }

  private persistInquiries() {
    try {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(this.inquiries, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist inquiries file:', err);
    }
  }

  private async syncWithSupabaseAsync() {
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('createdAt', { ascending: false }).limit(50);
      if (!error && data && data.length > 0) {
        // Merge Supabase entries with local entries
        const localMap = new Map(this.inquiries.map((i) => [i.id, i]));
        for (const item of data) {
          const id = item.id || `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
          localMap.set(id, {
            id,
            name: item.name || 'Anonymous',
            email: item.email || '',
            service: item.service || 'General Inquiry',
            message: item.message || '',
            status: item.status || 'new',
            createdAt: item.createdAt || item.created_at || new Date().toISOString(),
          });
        }
        this.inquiries = Array.from(localMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.persistInquiries();
      }
    } catch {
      // Supabase inquiries table may not exist yet; backend local storage operates smoothly
    }
  }

  public getInquiries(): Inquiry[] {
    return [...this.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getInquiryById(id: string): Inquiry | null {
    return this.inquiries.find((i) => i.id === id) || null;
  }

  public createInquiry(data: {
    name: string;
    email: string;
    service: string;
    message: string;
    status?: Inquiry['status'];
    createdAt?: string;
  }): Inquiry {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: data.name,
      email: data.email,
      service: data.service || 'General Inquiry',
      message: data.message,
      status: (data.status as Inquiry['status']) || 'new',
      createdAt: data.createdAt || new Date().toISOString(),
    };

    // Prepend to list
    this.inquiries.unshift(newInquiry);
    this.persistInquiries();

    // Async sync to Supabase if available
    void Promise.resolve(
      supabase.from('inquiries').insert([{
        id: newInquiry.id,
        name: newInquiry.name,
        email: newInquiry.email,
        service: newInquiry.service,
        message: newInquiry.message,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt,
      }])
    ).catch(() => {});

    return newInquiry;
  }

  public updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | null {
    const idx = this.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    this.inquiries[idx] = {
      ...this.inquiries[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.persistInquiries();

    // Async sync to Supabase
    void Promise.resolve(
      supabase.from('inquiries').update(this.inquiries[idx]).eq('id', id)
    ).catch(() => {});

    return this.inquiries[idx];
  }

  public deleteInquiry(id: string): boolean {
    const idx = this.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return false;

    this.inquiries.splice(idx, 1);
    this.persistInquiries();

    // Async sync to Supabase
    void Promise.resolve(supabase.from('inquiries').delete().eq('id', id)).catch(() => {});

    return true;
  }
}

export const inquiryService = new InquiryService();
