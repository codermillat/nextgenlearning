/**
 * Property-Based Tests for Configuration Constants
 * Feature: sharda-university-rebranding
 * 
 * These tests verify that configuration constants are correctly set
 * and environment variables contain the updated contact information.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { 
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  SHARDA_APPLY_URL,
  UNIVERSITY_APPLY_URLS,
  getWhatsAppUrl 
} from '../constants.js';

describe('Configuration Constants - Property Tests', () => {
  /**
   * Property 22: Environment Variable Correctness
   * **Validates: Requirements 10.3**
   * 
   * For any environment variable file (.env, .env.example), 
   * if it contains VITE_WHATSAPP_NUMBER, the value should be "918800996151".
   */
  describe('Property 22: Environment Variable Correctness', () => {
    it('should have correct WhatsApp number in .env file', () => {
      const envPath = resolve(process.cwd(), '.env');
      const envContent = readFileSync(envPath, 'utf-8');
      
      // Check if VITE_WHATSAPP_NUMBER exists
      const whatsappLine = envContent
        .split('\n')
        .find(line => line.startsWith('VITE_WHATSAPP_NUMBER='));
      
      if (whatsappLine) {
        const value = whatsappLine.split('=')[1].trim();
        expect(value).toBe('918800996151');
      }
    });

    it('should have correct WhatsApp number in .env.example file', () => {
      const envExamplePath = resolve(process.cwd(), '.env.example');
      const envExampleContent = readFileSync(envExamplePath, 'utf-8');
      
      // Check if VITE_WHATSAPP_NUMBER exists
      const whatsappLine = envExampleContent
        .split('\n')
        .find(line => line.startsWith('VITE_WHATSAPP_NUMBER='));
      
      if (whatsappLine) {
        const value = whatsappLine.split('=')[1].trim();
        expect(value).toBe('918800996151');
      }
    });

    it('should not contain old WhatsApp number in .env file', () => {
      const envPath = resolve(process.cwd(), '.env');
      const envContent = readFileSync(envPath, 'utf-8');
      
      expect(envContent).not.toContain('8801611533385');
    });

    it('should not contain old WhatsApp number in .env.example file', () => {
      const envExamplePath = resolve(process.cwd(), '.env.example');
      const envExampleContent = readFileSync(envExamplePath, 'utf-8');
      
      expect(envExampleContent).not.toContain('8801611533385');
    });
  });

  /**
   * Additional tests for configuration constants
   */
  describe('Configuration Constants Values', () => {
    it('should have correct WhatsApp number constant', () => {
      expect(WHATSAPP_NUMBER).toBe('918800996151');
    });

    it('should have correct WhatsApp display format', () => {
      expect(WHATSAPP_DISPLAY).toBe('+918800996151');
    });

    it('should have correct Sharda apply URL', () => {
      expect(SHARDA_APPLY_URL).toBe('https://bit.ly/4pZTRTs');
    });

    it('should have Sharda University in apply URLs mapping', () => {
      expect(UNIVERSITY_APPLY_URLS).toHaveProperty('sharda');
      expect(UNIVERSITY_APPLY_URLS.sharda).toBe('https://bit.ly/4pZTRTs');
      expect(UNIVERSITY_APPLY_URLS['sharda-university']).toBe('https://bit.ly/4pZTRTs');
    });

    it('should generate correct WhatsApp URL', () => {
      const url = getWhatsAppUrl();
      expect(url).toBe('https://wa.me/918800996151');
    });

    it('should generate correct WhatsApp URL with custom number', () => {
      const customNumber = '919876543210';
      const url = getWhatsAppUrl(customNumber);
      expect(url).toBe('https://wa.me/919876543210');
    });

    it('should not contain old WhatsApp number in constants', () => {
      expect(WHATSAPP_NUMBER).not.toBe('8801611533385');
      expect(WHATSAPP_DISPLAY).not.toContain('8801611533385');
    });
  });
});
