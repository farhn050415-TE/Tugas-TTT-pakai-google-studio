
import React from 'react';
import { Card } from './ui/Card';

export const Explanation: React.FC = () => {
  return (
    <Card title="Penjelasan & Rumus" className="text-sm text-slate-400">
      <div>
        <h4 className="font-semibold text-base text-slate-200 mb-2">Komponen Rangkaian</h4>
        <p className="mb-2">
          Generator impuls Marx menghasilkan tegangan tinggi dengan mengisi sejumlah kapasitor secara paralel, kemudian menyambungkannya secara seri untuk melepaskan muatan. Rangkaian ini adalah model ekivalen satu tingkat.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Kapasitor Generator (C):</strong> Merupakan kapasitansi total dari semua kapasitor tingkat. Menyimpan energi utama untuk impuls.
          </li>
          <li>
            <strong>Resistor Ekor (Ro):</strong> Terutama mengontrol laju peluruhan (bagian ekor) dari gelombang impuls. Nilai yang lebih besar akan memperpanjang waktu ekor (T2).
          </li>
          <li>
            <strong>Resistor Muka (Rs):</strong> Terutama mengontrol laju kenaikan (bagian muka) dari gelombang. Nilai yang lebih besar memperlambat kenaikan tegangan, sehingga memperpanjang waktu muka (T1).
          </li>
          <li>
            <strong>Benda Uji:</strong> Diwakili sebagai kapasitor beban. Mempengaruhi baik waktu muka maupun waktu ekor.
          </li>
        </ul>
      </div>
      <hr className="my-4 border-dark-border" />
      <div>
        <h4 className="font-semibold text-base text-slate-200 mb-2">Rumus Gelombang Impuls</h4>
        <p className="mb-2">
          Tegangan keluaran V(t) dari generator impuls dapat didekati dengan persamaan eksponensial ganda:
        </p>
        <div className="bg-dark-bg p-3 rounded-lg text-center font-mono text-base text-primary-400">
          V(t) = V₀ (e<sup>-βt</sup> - e<sup>-αt</sup>)
        </div>
        <p className="mt-2">
          Di mana <strong>α</strong> dan <strong>β</strong> adalah konstanta yang bergantung pada nilai R, L, dan C dalam rangkaian. Konstanta <strong>α</strong> berhubungan dengan waktu muka, dan <strong>β</strong> berhubungan dengan waktu ekor.
        </p>
      </div>
    </Card>
  );
};