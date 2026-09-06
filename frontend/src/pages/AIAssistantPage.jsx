import React from 'react';
import { Bot } from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

export default function AIAssistantPage() {
  return (
    <div className="dashboard animate-in">
      <div style={{ marginBottom: '4px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot size={22} color="#F59E0B" />
          <span>Smart Facility AI Chat Assistant</span>
        </h2>
        <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
          Interactive conversational agent for facility queries and multi-agent recommendations
        </p>
      </div>

      <div style={{ maxWidth: '900px', width: '100%' }}>
        <AIAssistant />
      </div>
    </div>
  );
}
