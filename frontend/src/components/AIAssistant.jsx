import React, { useState } from 'react';
import { Bot, Send, Check } from 'lucide-react';
import { useData } from '../data/DataLoaderContext';

const quickPrompts = [
  'Show pending complaints',
  'Which facility has highest energy usage?',
  'Generate maintenance report',
  'Predict upcoming issues',
  'Show facility-wise summary',
];

export default function AIAssistant() {
  const { chatMessages, sendChatMessage } = useData();
  const [input, setInput] = useState('');

  const handleSend = e => {
    e?.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput('');
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
        marginBottom: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bot size={18} color="#F59E0B" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>AI Assistant</div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>Facility Ops Agent</div>
          </div>
        </div>

        <span style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 99,
          background: 'rgba(52, 211, 153, 0.15)',
          color: '#34D399',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399' }} className="pulse" />
          Online
        </span>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
        gap: 10, paddingRight: 4, minHeight: 90
      }}>
        {chatMessages.length === 0 ? (
          <div style={{
            background: '#0D1117',
            border: '1px solid rgba(245, 158, 11, 0.15)',
            borderRadius: '12px 12px 12px 2px',
            padding: '10px 12px',
            fontSize: '11px',
            color: '#CBD5E1',
            lineHeight: 1.5
          }}>
            Hi! I'm your Facility AI Assistant. I can analyze your facility data and help you make smarter decisions.
          </div>
        ) : (
          chatMessages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                background: msg.role === 'user' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#0D1117',
                color: msg.role === 'user' ? '#000000' : '#CBD5E1',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(245, 158, 11, 0.15)',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                padding: '8px 12px',
                fontSize: '11px',
                fontWeight: msg.role === 'user' ? 700 : 400,
                maxWidth: '88%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                lineHeight: 1.4
              }}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Try asking / Quick Prompts */}
      <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(245, 158, 11, 0.1)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#F8FAFC', marginBottom: 6 }}>
          Try asking:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => sendChatMessage(p)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 10px',
                borderRadius: 8,
                background: '#0D1117',
                border: '1px solid rgba(245, 158, 11, 0.15)',
                color: '#CBD5E1',
                fontSize: 10,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.15)';
                e.currentTarget.style.background = '#0D1117';
              }}
            >
              <Check size={12} color="#F59E0B" />
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ marginTop: 10, position: 'relative' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          style={{
            width: '100%',
            background: '#0D1117',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '10px',
            padding: '8px 40px 8px 12px',
            fontSize: '11px',
            color: '#FFFFFF',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)',
            width: 28, height: 28, borderRadius: 8, border: 'none',
            cursor: input.trim() ? 'pointer' : 'default',
            background: input.trim() ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#12161F',
            color: input.trim() ? '#000' : '#64748B',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
