import React from 'react';
import { Card } from '../ui/Card';

export function CategoryGuide() {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-accent mb-4">Guía de Categorías</h3>
        <div className="space-y-4 text-sm text-accent/70">
          <p>
            Organiza tus finanzas creando una estructura jerárquica de categorías:
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-medium text-accent">•</span>
              <p><span className="text-accent">Categorías Principales:</span> Crea categorías generales como "Comida", "Transporte" o "Ingresos Laborales".</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-accent">•</span>
              <p><span className="text-accent">Categorías Secundarias:</span> Añade subcategorías más específicas seleccionando una categoría principal, por ejemplo: "Comida" → "Restaurantes", "Supermercado", "Delivery".</p>
            </div>
          </div>
          <p className="text-xs text-accent/50 italic">
            Tip: Una buena estructura de categorías te ayudará a tener un mejor control y análisis de tus finanzas.
          </p>
        </div>
      </div>
    </Card>
  );
}