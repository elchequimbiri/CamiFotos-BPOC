/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    session?: {
      token: string;
      role: 'family' | 'admin';
      createdAt: number;
    };
  }
}