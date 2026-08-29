'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis.';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide.';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message ne peut pas être vide.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erreur serveur');

      setSubmitStatus('success');
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <span className="text-5xl mb-4 block">✅</span>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Message envoyé !</h3>
        <p className="text-green-700">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-6 text-russia-red font-medium hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-charcoal mb-1">
          Nom complet <span className="text-russia-red">*</span>
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.nom ? 'border-red-500' : 'border-light-gray'
          } focus:outline-none focus:ring-2 focus:ring-russia-red focus:border-transparent transition`}
          placeholder="Ex: Jean Dupont"
        />
        {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Adresse email <span className="text-russia-red">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email ? 'border-red-500' : 'border-light-gray'
          } focus:outline-none focus:ring-2 focus:ring-russia-red focus:border-transparent transition`}
          placeholder="jean@exemple.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="sujet" className="block text-sm font-medium text-charcoal mb-1">
          Sujet
        </label>
        <input
          type="text"
          id="sujet"
          name="sujet"
          value={formData.sujet}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-light-gray focus:outline-none focus:ring-2 focus:ring-russia-red focus:border-transparent transition"
          placeholder="Proposition de partenariat, question..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
          Message <span className="text-russia-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message ? 'border-red-500' : 'border-light-gray'
          } focus:outline-none focus:ring-2 focus:ring-russia-red focus:border-transparent transition resize-none`}
          placeholder="Votre message..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          Une erreur est survenue. Veuillez réessayer plus tard.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : '📨 Envoyer le message'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Champs obligatoires. Vos informations restent confidentielles.
      </p>
    </form>
  );
}