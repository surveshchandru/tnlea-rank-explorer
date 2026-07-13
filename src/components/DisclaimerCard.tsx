import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerCard() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
          <AlertTriangle className="text-amber-600" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-900 mb-2">
            Please Read Before Submitting
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
            <li>This website is <strong>NOT</strong> an official TNLEA website.</li>
            <li>Data is voluntarily submitted by students.</li>
            <li>Please submit only your <strong>actual</strong> TNLEA details.</li>
            <li>Do <strong>NOT</strong> enter sample or fake data.</li>
            <li>Do <strong>NOT</strong> enter someone else's details.</li>
            <li>False submissions reduce the usefulness of this platform for every TNLEA student.</li>
            <li>By submitting your details you agree to help future students understand TNLEA rankings better.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
