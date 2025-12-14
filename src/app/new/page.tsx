// app/new/page.tsx

import React from 'react';

export default function NewPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        ✨ Page Nouveautés
      </h1>
      <p className="text-gray-600">
        Découvrez ici nos dernières collections et arrivages.
      </p>
    </div>
  );
}