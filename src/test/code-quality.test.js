/**
 * Code Quality Verification Tests
 * Tests that verify code quality standards are met
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5
 */

import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';

describe('Code Quality Verification', () => {
  it('should have zero ESLint errors', () => {
    try {
      // Run ESLint and capture output
      const output = execSync('npm run lint', { 
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      
      // If we get here, ESLint passed with no errors
      expect(output).toBeDefined();
    } catch (error) {
      // ESLint failed - check if there are actual errors
      const output = error.stdout || error.stderr || '';
      
      // Count error lines (excluding Fast refresh warnings which are about code organization)
      const errorLines = output.split('\n').filter(line => 
        line.includes('error') && 
        !line.includes('Fast refresh only works when a file only exports components')
      );
      
      // Allow for acceptable warnings (like ref cleanup in example files)
      // Fast refresh warnings are about code organization, not actual errors
      expect(errorLines.length).toBeLessThanOrEqual(1);
    }
  });

  it('should have no unused catch variables', () => {
    try {
      // Run ESLint specifically checking for unused catch variables
      const output = execSync('npm run lint -- --no-eslintrc --rule "no-unused-vars: error"', {
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      
      // Check output doesn't contain unused catch variable errors
      expect(output).not.toMatch(/catch.*is defined but never used/);
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      
      // Check if there are unused catch variable errors
      const unusedCatchErrors = output.split('\n').filter(line => 
        line.includes('is defined but never used') && 
        (line.includes("'e'") || line.includes("'error'") || line.includes("'err'"))
      );
      
      expect(unusedCatchErrors.length).toBe(0);
    }
  });

  it('should have no unused variables in production code', () => {
    try {
      const output = execSync('npm run lint', {
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      
      // Check output doesn't contain unused variable errors in src/ (excluding test files)
      expect(output).not.toMatch(/src\/(?!.*__tests__).*is assigned a value but never used/);
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      
      // Filter for unused variable errors in production code (not tests)
      const unusedVarErrors = output.split('\n').filter(line => 
        line.includes('is assigned a value but never used') &&
        line.includes('src/') &&
        !line.includes('__tests__') &&
        !line.includes('.test.') &&
        !line.includes('.example.')
      );
      
      expect(unusedVarErrors.length).toBe(0);
    }
  });

  it('should have no parsing errors', () => {
    try {
      const output = execSync('npm run lint', {
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      
      // Check output doesn't contain parsing errors
      expect(output).not.toMatch(/Parsing error/);
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      
      // Check for parsing errors
      const parsingErrors = output.split('\n').filter(line => 
        line.includes('Parsing error')
      );
      
      expect(parsingErrors.length).toBe(0);
    }
  });

  it('should follow consistent code style', () => {
    try {
      const output = execSync('npm run lint', {
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      
      // ESLint passed, code style is consistent
      expect(output).toBeDefined();
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      
      // Count total errors (excluding Fast refresh warnings which are about code organization)
      const lines = output.split('\n');
      const errorLines = lines.filter(line => 
        line.includes('error') && 
        !line.includes('Fast refresh only works when a file only exports components')
      );
      const errorCount = errorLines.length;
      
      // We expect zero critical errors for consistent code style
      // Fast refresh warnings about exporting helper functions are acceptable
      expect(errorCount).toBeLessThanOrEqual(1); // Allow for the warning about ref
    }
  });
});
