export interface Temoignage {
  id: number;
  created_at: string;
  titre: string;
  video_url: string | null;
  citation_africain: string;
  citation_russe: string;
  categorie: string;
  nom_africain: string;
  nom_russe: string;
  portrait_africain?: string;
  portrait_russe?: string;
  tags?: string[];
}

export interface ContactFormData {
  nom: string;
  email: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}