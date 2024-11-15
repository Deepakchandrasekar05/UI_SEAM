import React from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface AuthStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  message: string;
}

export const AuthStatus: React.FC<AuthStatusProps> = ({ status, message }) => {
  const statusConfig = {
    idle: { icon: null, bgColor: 'bg-gray-100', textColor: 'text-gray-600' },
    processing: { icon: Loader2, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    success: { icon: CheckCircle2, bgColor: 'bg-green-50', textColor: 'text-green-600' },
    error: { icon: XCircle, bgColor: 'bg-red-50', textColor: 'text-red-600' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg flex items-center gap-2 ${config.bgColor} ${config.textColor}`}>
      {Icon && <Icon className={`w-5 h-5 ${status === 'processing' ? 'animate-spin' : ''}`} />}
      <span className="font-medium">{message}</span>
    </div>
  );
};