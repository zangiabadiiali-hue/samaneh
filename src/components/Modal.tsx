import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-50 animate-fade-in shadow-2xl shadow-blue-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
